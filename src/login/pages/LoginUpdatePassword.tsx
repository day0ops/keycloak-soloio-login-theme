import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { useIsPasswordRevealed } from "keycloakify/tools/useIsPasswordRevealed";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

const inputStyle: React.CSSProperties = {
    width: "100%",
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingLeft: "14px",
    paddingRight: "42px",
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

function EyeIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}

function EyeOffIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
            <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
    );
}

function PasswordWrapper(props: { i18n: I18n; passwordInputId: string; leadingIcon?: React.ReactNode; children: React.ReactElement }) {
    const { i18n, passwordInputId, leadingIcon, children } = props;
    const { msgStr } = i18n;
    const { isPasswordRevealed, toggleIsPasswordRevealed } = useIsPasswordRevealed({ passwordInputId });

    return (
        <div style={{ position: "relative" }}>
            {leadingIcon}
            {children}
            <button
                type="button"
                style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "rgba(255,255,255,0.4)",
                    padding: "4px",
                    display: "flex",
                    alignItems: "center",
                    lineHeight: 0,
                }}
                aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
                aria-controls={passwordInputId}
                onClick={toggleIsPasswordRevealed}
            >
                {isPasswordRevealed ? <EyeOffIcon /> : <EyeIcon />}
            </button>
        </div>
    );
}

export default function LoginUpdatePassword(
    props: PageProps<Extract<KcContext, { pageId: "login-update-password.ftl" }>, I18n>
) {
    const { kcContext, i18n, Template, classes } = props;
    const { url, messagesPerField, isAppInitiatedAction } = kcContext;
    const { msg, msgStr } = i18n;

    const hasPasswordError = messagesPerField.existsError("password");
    const hasConfirmError = messagesPerField.existsError("password-confirm");

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={false}
            classes={classes}
            displayMessage={!messagesPerField.existsError("password", "password-confirm")}
            headerNode={msg("updatePasswordTitle")}
        >
            <form
                id="kc-passwd-update-form"
                action={url.loginAction}
                method="post"
                style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
                <div>
                    <label htmlFor="password-new" style={labelStyle}>
                        {msg("passwordNew")}
                    </label>
                    <PasswordWrapper i18n={i18n} passwordInputId="password-new" leadingIcon={<FontAwesomeIcon icon={faKey} style={iconStyle} />}>
                        <input
                            type="password"
                            id="password-new"
                            name="password-new"
                            autoFocus
                            autoComplete="new-password"
                            aria-invalid={messagesPerField.existsError("password", "password-confirm")}
                            className="has-icon"
                            style={hasPasswordError ? { ...inputStyle, border: "1px solid rgba(220,53,69,0.6)" } : inputStyle}
                        />
                    </PasswordWrapper>
                    {hasPasswordError && (
                        <span
                            style={{ color: "#ff6b7a", fontSize: "13px", marginTop: "4px", display: "block" }}
                            aria-live="polite"
                            dangerouslySetInnerHTML={{ __html: kcSanitize(messagesPerField.get("password")) }}
                        />
                    )}
                </div>

                <div>
                    <label htmlFor="password-confirm" style={labelStyle}>
                        {msg("passwordConfirm")}
                    </label>
                    <PasswordWrapper i18n={i18n} passwordInputId="password-confirm" leadingIcon={<FontAwesomeIcon icon={faKey} style={iconStyle} />}>
                        <input
                            type="password"
                            id="password-confirm"
                            name="password-confirm"
                            autoComplete="new-password"
                            aria-invalid={messagesPerField.existsError("password", "password-confirm")}
                            className="has-icon"
                            style={hasConfirmError ? { ...inputStyle, border: "1px solid rgba(220,53,69,0.6)" } : inputStyle}
                        />
                    </PasswordWrapper>
                    {hasConfirmError && (
                        <span
                            style={{ color: "#ff6b7a", fontSize: "13px", marginTop: "4px", display: "block" }}
                            aria-live="polite"
                            dangerouslySetInnerHTML={{ __html: kcSanitize(messagesPerField.get("password-confirm")) }}
                        />
                    )}
                </div>

                <label style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.6)", fontSize: "14px", fontFamily: "'Geist', 'Open Sans', sans-serif", cursor: "pointer" }}>
                    <input type="checkbox" id="logout-sessions" name="logout-sessions" value="on" defaultChecked={true} />
                    {msg("logoutOtherSessions")}
                </label>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <button
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
                        {msgStr("doSubmit")}
                    </button>
                    {isAppInitiatedAction && (
                        <button
                            type="submit"
                            name="cancel-aia"
                            value="true"
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
                            {msg("doCancel")}
                        </button>
                    )}
                </div>
            </form>
        </Template>
    );
}
