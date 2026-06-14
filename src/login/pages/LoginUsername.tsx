import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { useScript } from "keycloakify/login/pages/LoginUsername.useScript";

const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    backgroundColor: "#27242E",
    border: "1px solid #34343B",
    borderRadius: "6px",
    color: "#ffffff",
    fontSize: "15px",
    fontFamily: "'Geist', 'Open Sans', sans-serif",
    outline: "none",
    boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
    display: "block",
    color: "rgba(255,255,255,0.7)",
    fontSize: "14px",
    marginBottom: "6px",
    fontFamily: "'Geist', 'Open Sans', sans-serif",
};

const iconStyle = {
    position: "absolute",
    left: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "rgba(255,255,255,0.35)",
    fontSize: "14px",
    pointerEvents: "none",
} as const satisfies React.CSSProperties;

export default function LoginUsername(
    props: PageProps<Extract<KcContext, { pageId: "login-username.ftl" }>, I18n>
) {
    const { kcContext, i18n, Template, classes } = props;
    const { social, realm, url, usernameHidden, login, registrationDisabled, messagesPerField, enableWebAuthnConditionalUI, authenticators } = kcContext;
    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const webAuthnButtonId = "authenticateWebAuthnButton";
    useScript({ webAuthnButtonId, kcContext, i18n });

    const hasError = messagesPerField.existsError("username");

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={false}
            classes={classes}
            displayMessage={!hasError}
            headerNode={msg("doLogIn")}
        >
            {realm.password && (
                <form
                    id="kc-form-login"
                    onSubmit={() => { setIsLoginButtonDisabled(true); return true; }}
                    action={url.loginAction}
                    method="post"
                    style={{ display: "flex", flexDirection: "column", gap: "20px" }}
                >
                    {!usernameHidden && (
                        <div>
                            <label htmlFor="username" style={labelStyle}>
                                {!realm.loginWithEmailAllowed
                                    ? msg("username")
                                    : !realm.registrationEmailAsUsername
                                      ? msg("usernameOrEmail")
                                      : msg("email")}
                            </label>
                            <div style={{ position: "relative" }}>
                                <FontAwesomeIcon icon={faUser} style={iconStyle} />
                                <input
                                    tabIndex={2}
                                    id="username"
                                    name="username"
                                    defaultValue={login.username ?? ""}
                                    type="text"
                                    autoFocus
                                    autoComplete={enableWebAuthnConditionalUI ? "username webauthn" : "username"}
                                    aria-invalid={hasError}
                                    className="has-icon"
                                    style={hasError ? { ...inputStyle, border: "1px solid rgba(220,53,69,0.6)" } : inputStyle}
                                />
                            </div>
                            {hasError && (
                                <span
                                    style={{ color: "#ff6b7a", fontSize: "13px", marginTop: "4px", display: "block" }}
                                    aria-live="polite"
                                >
                                    {messagesPerField.getFirstError("username")}
                                </span>
                            )}
                        </div>
                    )}

                    {realm.rememberMe && !usernameHidden && (
                        <label style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.6)", fontSize: "14px", fontFamily: "'Geist', 'Open Sans', sans-serif", cursor: "pointer" }}>
                            <input
                                tabIndex={3}
                                id="rememberMe"
                                name="rememberMe"
                                type="checkbox"
                                defaultChecked={!!login.rememberMe}
                            />
                            {msg("rememberMe")}
                        </label>
                    )}

                    <button
                        tabIndex={4}
                        disabled={isLoginButtonDisabled}
                        name="login"
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
                            cursor: isLoginButtonDisabled ? "not-allowed" : "pointer",
                            opacity: isLoginButtonDisabled ? 0.6 : 1,
                        }}
                    >
                        {msgStr("doLogIn")}
                    </button>

                    {realm.password && realm.registrationAllowed && !registrationDisabled && (
                        <p style={{ textAlign: "center", margin: 0, color: "rgba(255,255,255,0.45)", fontSize: "14px", fontFamily: "'Geist', 'Open Sans', sans-serif" }}>
                            {msg("noAccount")}{" "}
                            <a tabIndex={6} href={url.registrationUrl} style={{ color: "#6366F1", textDecoration: "none" }}>
                                {msg("doRegister")}
                            </a>
                        </p>
                    )}
                </form>
            )}

            {realm.password && social?.providers !== undefined && social.providers.length !== 0 && (
                <div style={{ marginTop: "24px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                        <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(52,52,59,0.6)" }} />
                        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px", fontFamily: "'Geist', 'Open Sans', sans-serif", whiteSpace: "nowrap" }}>
                            {msg("identity-provider-login-label")}
                        </span>
                        <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(52,52,59,0.6)" }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        {social.providers.map(p => (
                            <a
                                key={p.alias}
                                id={`social-${p.alias}`}
                                href={p.loginUrl}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "8px",
                                    padding: "10px 16px",
                                    backgroundColor: "#27242E",
                                    border: "1px solid #34343B",
                                    borderRadius: "6px",
                                    color: "#ffffff",
                                    fontSize: "15px",
                                    fontFamily: "'Geist', 'Open Sans', sans-serif",
                                    textDecoration: "none",
                                }}
                            >
                                {p.displayName}
                            </a>
                        ))}
                    </div>
                </div>
            )}

            {enableWebAuthnConditionalUI && (
                <>
                    <form id="webauth" action={url.loginAction} method="post">
                        <input type="hidden" id="clientDataJSON" name="clientDataJSON" />
                        <input type="hidden" id="authenticatorData" name="authenticatorData" />
                        <input type="hidden" id="signature" name="signature" />
                        <input type="hidden" id="credentialId" name="credentialId" />
                        <input type="hidden" id="userHandle" name="userHandle" />
                        <input type="hidden" id="error" name="error" />
                    </form>
                    {authenticators !== undefined && authenticators.authenticators.length !== 0 && (
                        <form id="authn_select">
                            {authenticators.authenticators.map((authenticator, i) => (
                                <input key={i} type="hidden" name="authn_use_chk" readOnly value={authenticator.credentialId} />
                            ))}
                        </form>
                    )}
                    <input
                        id={webAuthnButtonId}
                        type="button"
                        value={msgStr("passkey-doAuthenticate")}
                        style={{
                            marginTop: "10px",
                            width: "100%",
                            padding: "11px",
                            background: "transparent",
                            color: "rgba(255,255,255,0.6)",
                            border: "1px solid rgba(255,255,255,0.15)",
                            borderRadius: "6px",
                            fontSize: "15px",
                            fontFamily: "'Geist', 'Open Sans', sans-serif",
                            cursor: "pointer",
                        }}
                    />
                </>
            )}
        </Template>
    );
}
