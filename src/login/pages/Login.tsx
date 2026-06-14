import { useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../../kc.gen";
import type { I18n } from "../../i18n";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    backgroundColor: "#27242E",
    border: "1px solid #34343B",
    borderRadius: "6px",
    color: "#ffffff",
    fontSize: "17px",
    fontFamily: "'Geist', 'Open Sans', sans-serif",
    outline: "none",
    boxSizing: "border-box",
};

const inputErrorStyle: React.CSSProperties = {
    ...inputStyle,
    border: "1px solid rgba(220,53,69,0.6)",
};

const iconStyle: React.CSSProperties = {
    position: "absolute",
    left: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "rgba(255,255,255,0.35)",
    fontSize: "14px",
    pointerEvents: "none",
};

const labelStyle: React.CSSProperties = {
    display: "block",
    color: "rgba(255,255,255,0.7)",
    fontSize: "16px",
    marginBottom: "6px",
    fontFamily: "'Geist', 'Open Sans', sans-serif",
};

export default function Login(
    props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>
) {
    const { kcContext, i18n, Template, classes } = props;
    const { msg, msgStr } = i18n;
    const { realm, url, usernameHidden, login, registrationDisabled, messagesPerField } = kcContext;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={false}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username", "password")}
            headerNode={msg("loginAccountTitle")}
        >
            <form
                onSubmit={() => setIsLoginButtonDisabled(true)}
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
                            <FontAwesomeIcon icon={faUser} style={iconStyle as any} />
                            <input
                                tabIndex={2}
                                id="username"
                                name="username"
                                defaultValue={login.username ?? ""}
                                type="text"
                                autoFocus
                                autoComplete="username"
                                aria-invalid={messagesPerField.existsError("username", "password")}
                                style={messagesPerField.existsError("username", "password")
                                    ? { ...inputErrorStyle, paddingLeft: "40px" }
                                    : { ...inputStyle, paddingLeft: "40px" }}
                            />
                        </div>
                        {messagesPerField.existsError("username", "password") && (
                            <span
                                style={{ color: "#ff6b7a", fontSize: "15px", marginTop: "4px", display: "block" }}
                                aria-live="polite"
                                dangerouslySetInnerHTML={{ __html: messagesPerField.getFirstError("username", "password") }}
                            />
                        )}
                    </div>
                )}

                <div>
                    <label htmlFor="password" style={labelStyle}>
                        {msg("password")}
                    </label>
                    <div style={{ position: "relative" }}>
                        <FontAwesomeIcon icon={faLock} style={iconStyle as any} />
                        <input
                            tabIndex={3}
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            aria-invalid={messagesPerField.existsError("username", "password")}
                            style={messagesPerField.existsError("username", "password")
                                ? { ...inputErrorStyle, paddingLeft: "40px" }
                                : { ...inputStyle, paddingLeft: "40px" }}
                        />
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    {realm.rememberMe && !usernameHidden && (
                        <label style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.6)", fontSize: "16px", fontFamily: "'Geist', 'Open Sans', sans-serif", cursor: "pointer" }}>
                            <input
                                tabIndex={5}
                                id="rememberMe"
                                name="rememberMe"
                                type="checkbox"
                                defaultChecked={!!login.rememberMe}
                            />
                            {msg("rememberMe")}
                        </label>
                    )}
                    {realm.resetPasswordAllowed && (
                        <a
                            tabIndex={6}
                            href={url.loginResetCredentialsUrl}
                            style={{ color: "#6366F1", fontSize: "16px", textDecoration: "none", fontFamily: "'Geist', 'Open Sans', sans-serif" }}
                        >
                            {msg("doForgotPassword")}
                        </a>
                    )}
                </div>

                <button
                    tabIndex={7}
                    disabled={isLoginButtonDisabled}
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "11px",
                        background: "linear-gradient(117deg, #6844FF -23.54%, #1D283A 223.49%)",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "6px",
                        fontSize: "17px",
                        fontWeight: 600,
                        fontFamily: "'Geist', 'Open Sans', sans-serif",
                        cursor: isLoginButtonDisabled ? "not-allowed" : "pointer",
                        opacity: isLoginButtonDisabled ? 0.6 : 1,
                        marginTop: "4px",
                    }}
                >
                    {msgStr("doLogIn")}
                </button>
            </form>

            {realm.password && realm.registrationAllowed && !registrationDisabled && (
                <p style={{ textAlign: "center", marginTop: "24px", color: "rgba(255,255,255,0.45)", fontSize: "16px", fontFamily: "'Geist', 'Open Sans', sans-serif" }}>
                    {msg("noAccount")}{" "}
                    <a tabIndex={8} href={url.registrationUrl} style={{ color: "#6366F1", textDecoration: "none" }}>
                        {msg("doRegister")}
                    </a>
                </p>
            )}
        </Template>
    );
}
