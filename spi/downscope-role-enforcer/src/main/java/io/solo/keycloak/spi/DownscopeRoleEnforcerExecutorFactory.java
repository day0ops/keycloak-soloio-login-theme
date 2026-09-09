package io.solo.keycloak.spi;

import java.util.Collections;
import java.util.List;

import org.keycloak.Config.Scope;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.KeycloakSessionFactory;
import org.keycloak.provider.ProviderConfigProperty;
import org.keycloak.services.clientpolicy.executor.ClientPolicyExecutorProvider;
import org.keycloak.services.clientpolicy.executor.ClientPolicyExecutorProviderFactory;

/**
 * Factory for {@link DownscopeRoleEnforcerExecutor}. Mirrors Keycloak's own
 * DownscopeAssertionGrantEnforcerExecutorFactory structure exactly, substituting the
 * provider id and help text.
 */
public class DownscopeRoleEnforcerExecutorFactory implements ClientPolicyExecutorProviderFactory {

    public static final String PROVIDER_ID = "downscope-role-enforcer";

    @Override
    public ClientPolicyExecutorProvider create(KeycloakSession session) {
        return new DownscopeRoleEnforcerExecutor(session);
    }

    @Override
    public void init(Scope config) {
    }

    @Override
    public void postInit(KeycloakSessionFactory factory) {
    }

    @Override
    public void close() {
    }

    @Override
    public String getId() {
        return PROVIDER_ID;
    }

    @Override
    public String getHelpText() {
        return """
               Downscopes a JWT Authorization Grant exchange to the roles present in the
               original assertion's "roles" claim (Microsoft Entra app-role assignments),
               rejecting the exchange if a broader scope is requested than the assertion
               carries.
               """;
    }

    @Override
    public List<ProviderConfigProperty> getConfigProperties() {
        return Collections.emptyList();
    }
}
