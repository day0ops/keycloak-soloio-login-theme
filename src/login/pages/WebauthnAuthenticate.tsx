import { Fragment } from "react";
import { useScript } from "keycloakify/login/pages/WebauthnAuthenticate.useScript";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function WebauthnAuthenticate(
    props: PageProps<Extract<KcContext, { pageId: "webauthn-authenticate.ftl" }>, I18n>
) {
    const { kcContext, i18n, Template, classes } = props;
    const { url, realm, registrationDisabled, authenticators, shouldDisplayAuthenticators } = kcContext;
    const { msg, msgStr, advancedMsg } = i18n;

    const authButtonId = "authenticateWebAuthnButton";

    useScript({ authButtonId, kcContext, i18n });

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={false}
            classes={classes}
            headerNode={msg("webauthn-login-title")}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <form id="webauth" action={url.loginAction} method="post">
                    <input type="hidden" id="clientDataJSON" name="clientDataJSON" />
                    <input type="hidden" id="authenticatorData" name="authenticatorData" />
                    <input type="hidden" id="signature" name="signature" />
                    <input type="hidden" id="credentialId" name="credentialId" />
                    <input type="hidden" id="userHandle" name="userHandle" />
                    <input type="hidden" id="error" name="error" />
                </form>

                {authenticators && (
                    <>
                        <form id="authn_select">
                            {authenticators.authenticators.map(authenticator => (
                                <input key={authenticator.credentialId} type="hidden" name="authn_use_chk" value={authenticator.credentialId} />
                            ))}
                        </form>

                        {shouldDisplayAuthenticators && authenticators.authenticators.length > 0 && (
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                {authenticators.authenticators.length > 1 && (
                                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", fontFamily: "'Geist', 'Open Sans', sans-serif", margin: 0, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                                        {msg("webauthn-available-authenticators")}
                                    </p>
                                )}
                                {authenticators.authenticators.map((authenticator, i) => (
                                    <div
                                        key={i}
                                        id={`kc-webauthn-authenticator-item-${i}`}
                                        style={{
                                            padding: "12px 14px",
                                            backgroundColor: "#27242E",
                                            border: "1px solid #34343B",
                                            borderRadius: "6px",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "4px",
                                        }}
                                    >
                                        <div id={`kc-webauthn-authenticator-label-${i}`} style={{ color: "#ffffff", fontSize: "14px", fontWeight: 500, fontFamily: "'Geist', 'Open Sans', sans-serif" }}>
                                            {advancedMsg(authenticator.label)}
                                        </div>
                                        {authenticator.transports.displayNameProperties?.length ? (
                                            <div id={`kc-webauthn-authenticator-transport-${i}`} style={{ color: "rgba(255,255,255,0.45)", fontSize: "12px", fontFamily: "'Geist', 'Open Sans', sans-serif" }}>
                                                {authenticator.transports.displayNameProperties
                                                    .map((prop, j, arr) => ({ prop, hasNext: j !== arr.length - 1 }))
                                                    .map(({ prop, hasNext }) => (
                                                        <Fragment key={prop}>
                                                            {advancedMsg(prop)}
                                                            {hasNext && <span>, </span>}
                                                        </Fragment>
                                                    ))}
                                            </div>
                                        ) : null}
                                        <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", fontFamily: "'Geist', 'Open Sans', sans-serif" }}>
                                            <span id={`kc-webauthn-authenticator-createdlabel-${i}`}>{msg("webauthn-createdAt-label")}</span>
                                            <span id={`kc-webauthn-authenticator-created-${i}`}>{authenticator.createdAt}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}

                <input
                    id={authButtonId}
                    type="button"
                    autoFocus
                    value={msgStr("webauthn-doAuthenticate")}
                    style={{
                        width: "100%",
                        padding: "11px",
                        background: "linear-gradient(117deg, #6844FF -23.54%, #1D283A 223.49%)",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "6px",
                        fontSize: "14px",
                        fontWeight: 600,
                        fontFamily: "'Geist', 'Open Sans', sans-serif",
                        cursor: "pointer",
                    }}
                />

                {realm.registrationAllowed && !registrationDisabled && (
                    <p style={{ textAlign: "center", margin: 0, color: "rgba(255,255,255,0.45)", fontSize: "13px", fontFamily: "'Geist', 'Open Sans', sans-serif" }}>
                        {msg("noAccount")}{" "}
                        <a tabIndex={6} href={url.registrationUrl} style={{ color: "#6366F1", textDecoration: "none" }}>
                            {msg("doRegister")}
                        </a>
                    </p>
                )}
            </div>
        </Template>
    );
}
