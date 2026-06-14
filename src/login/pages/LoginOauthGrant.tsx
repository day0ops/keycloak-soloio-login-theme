import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

export default function LoginOauthGrant(
    props: PageProps<Extract<KcContext, { pageId: "login-oauth-grant.ftl" }>, I18n>
) {
    const { kcContext, i18n, Template, classes } = props;
    const { url, oauth, client } = kcContext;
    const { msg, msgStr, advancedMsg, advancedMsgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={false}
            classes={classes}
            headerNode={
                <span style={{ fontFamily: "'Geist', 'Open Sans', sans-serif" }}>
                    {client.name ? msg("oauthGrantTitle", advancedMsgStr(client.name)) : msg("oauthGrantTitle", client.clientId)}
                </span>
            }
        >
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {client.attributes.logoUri && (
                    <img src={client.attributes.logoUri} alt={client.name ?? client.clientId} style={{ maxHeight: "48px", objectFit: "contain" }} />
                )}

                <div>
                    <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", fontFamily: "'Geist', 'Open Sans', sans-serif", margin: "0 0 10px" }}>
                        {msg("oauthGrantRequest")}
                    </p>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
                        {oauth.clientScopesRequested.map(clientScope => (
                            <li
                                key={clientScope.consentScreenText}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    color: "rgba(255,255,255,0.8)",
                                    fontSize: "16px",
                                    fontFamily: "'Geist', 'Open Sans', sans-serif",
                                    padding: "8px 12px",
                                    backgroundColor: "rgba(255,255,255,0.04)",
                                    borderRadius: "4px",
                                }}
                            >
                                <FontAwesomeIcon icon={faLock} style={{ color: "#F97316", fontSize: "14px", flexShrink: 0 }} />
                                <span>
                                    {advancedMsg(clientScope.consentScreenText)}
                                    {clientScope.dynamicScopeParameter && (
                                        <>: <b>{clientScope.dynamicScopeParameter}</b></>
                                    )}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {(client.attributes.policyUri || client.attributes.tosUri) && (
                    <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", fontFamily: "'Geist', 'Open Sans', sans-serif", margin: 0 }}>
                        {client.name ? msg("oauthGrantInformation", advancedMsgStr(client.name)) : msg("oauthGrantInformation", client.clientId)}
                        {client.attributes.tosUri && (
                            <>
                                {" "}{msg("oauthGrantReview")}{" "}
                                <a href={client.attributes.tosUri} target="_blank" style={{ color: "#6366F1", textDecoration: "none" }}>
                                    {msg("oauthGrantTos")}
                                </a>
                            </>
                        )}
                        {client.attributes.policyUri && (
                            <>
                                {" "}{msg("oauthGrantReview")}{" "}
                                <a href={client.attributes.policyUri} target="_blank" style={{ color: "#6366F1", textDecoration: "none" }}>
                                    {msg("oauthGrantPolicy")}
                                </a>
                            </>
                        )}
                    </p>
                )}

                <form action={url.oauthAction} method="POST" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <input type="hidden" name="code" value={oauth.code} />
                    <button
                        name="accept"
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "11px",
                            background: "linear-gradient(117deg, #6844FF -23.54%, #1D283A 223.49%)",
                            color: "#ffffff",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "15px",
                            fontWeight: 600,
                            fontFamily: "'Geist', 'Open Sans', sans-serif",
                            cursor: "pointer",
                        }}
                    >
                        {msgStr("doYes")}
                    </button>
                    <button
                        name="cancel"
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "11px",
                            background: "transparent",
                            color: "rgba(255,255,255,0.6)",
                            border: "1px solid rgba(255,255,255,0.15)",
                            borderRadius: "6px",
                            fontSize: "15px",
                            fontWeight: 500,
                            fontFamily: "'Geist', 'Open Sans', sans-serif",
                            cursor: "pointer",
                        }}
                    >
                        {msgStr("doNo")}
                    </button>
                </form>
            </div>
        </Template>
    );
}
