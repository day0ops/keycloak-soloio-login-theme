package io.solo.keycloak.spi;

import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import org.keycloak.OAuthErrorException;
import org.keycloak.jose.jws.JWSInput;
import org.keycloak.jose.jws.JWSInputException;
import org.keycloak.models.ClientModel;
import org.keycloak.models.ClientScopeModel;
import org.keycloak.models.KeycloakSession;
import org.keycloak.protocol.oidc.JWTAuthorizationGrantValidationContext;
import org.keycloak.protocol.oidc.TokenManager;
import org.keycloak.representations.AccessToken;
import org.keycloak.services.clientpolicy.ClientPolicyContext;
import org.keycloak.services.clientpolicy.ClientPolicyEvent;
import org.keycloak.services.clientpolicy.ClientPolicyException;
import org.keycloak.services.clientpolicy.context.JWTAuthorizationGrantContext;
import org.keycloak.services.clientpolicy.executor.ClientPolicyExecutorProvider;

/**
 * Downscopes a JWT Authorization Grant (RFC 7523) exchange to the roles carried by the
 * original assertion's "roles" claim (Microsoft Entra app-role assignments), instead of
 * Keycloak's built-in downscope-assertion-grant-enforcer, which hardcodes reading a "scope"
 * claim -- a claim Entra cannot emit for app-role assignments.
 */
public class DownscopeRoleEnforcerExecutor implements ClientPolicyExecutorProvider {

    private static final String ROLES_CLAIM = "roles";

    private final KeycloakSession session;

    public DownscopeRoleEnforcerExecutor(KeycloakSession session) {
        this.session = session;
    }

    @Override
    public String getProviderId() {
        return DownscopeRoleEnforcerExecutorFactory.PROVIDER_ID;
    }

    @Override
    public void executeOnEvent(ClientPolicyContext context) throws ClientPolicyException {
        if (context.getEvent() == ClientPolicyEvent.JWT_AUTHORIZATION_GRANT) {
            JWTAuthorizationGrantContext jwtAuthnGrantContext = (JWTAuthorizationGrantContext) context;
            JWTAuthorizationGrantValidationContext jwtContext = jwtAuthnGrantContext.getAuthorizationGrantContext();
            Set<String> restrictedScopes = checkDownscope(session.getContext().getClient(),
                    getAccessTokenFromAssertion(jwtContext.getAssertion()),
                    jwtContext.getScopeParam());
            jwtContext.setRestrictedScopes(restrictedScopes);
        }
    }

    private AccessToken getAccessTokenFromAssertion(String assertion) throws ClientPolicyException {
        try {
            return new JWSInput(assertion).readJsonContent(AccessToken.class);
        } catch (JWSInputException e) {
            throw new ClientPolicyException(OAuthErrorException.INVALID_REQUEST, "Assertion contains an invalid access token");
        }
    }

    private Set<String> checkDownscope(ClientModel client, AccessToken token, String scopeParam) throws ClientPolicyException {
        Set<String> tokenScopes = extractRoleScopes(token);

        if (scopeParam != null) {
            // the caller requested specific scopes, check they are allowed
            Set<String> requestedScopes = TokenManager.parseScopeParameter(scopeParam).collect(Collectors.toSet());
            // check all requested scopes are inside the assertion's roles
            requestedScopes.removeAll(tokenScopes);
            if (!requestedScopes.isEmpty()) {
                throw new ClientPolicyException(OAuthErrorException.INVALID_SCOPE,
                        String.format("Scopes %s not present in the assertion's roles claim %s", requestedScopes, tokenScopes));
            }
        }

        // always add as allowed restricted scopes the ones that are default and not included in token
        Set<String> restrictedScopes = client.getClientScopes(true).values().stream()
                .filter(Predicate.not(ClientScopeModel::isIncludeInTokenScope))
                .map(ClientScopeModel::getName)
                .collect(Collectors.toSet());
        restrictedScopes.addAll(tokenScopes);
        return restrictedScopes;
    }

    private Set<String> extractRoleScopes(AccessToken token) {
        Object rolesClaim = token.getOtherClaims().get(ROLES_CLAIM);
        if (!(rolesClaim instanceof Collection<?> roles)) {
            return Collections.emptySet();
        }
        Set<String> tokenScopes = new HashSet<>();
        for (Object role : roles) {
            if (role != null) {
                tokenScopes.add(role.toString());
            }
        }
        return tokenScopes;
    }
}
