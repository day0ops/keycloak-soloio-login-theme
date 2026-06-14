import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

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

const labelStyle: React.CSSProperties = {
    display: "block",
    color: "rgba(255,255,255,0.7)",
    fontSize: "16px",
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

export default function LoginResetPassword(props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>) {
    const { kcContext, i18n, Template, classes } = props;
    const { url, realm, auth, messagesPerField } = kcContext;
    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={false}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username")}
            headerNode={msg("emailForgotTitle")}
        >
            <form
                action={url.loginAction}
                method="post"
                style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
                <div>
                    <label htmlFor="username" style={labelStyle}>
                        {!realm.loginWithEmailAllowed
                            ? msg("username")
                            : !realm.registrationEmailAsUsername
                              ? msg("usernameOrEmail")
                              : msg("email")}
                    </label>
                    <div style={{ position: "relative" }}>
                        <FontAwesomeIcon icon={faEnvelope} style={iconStyle} />
                        <input
                            type="text"
                            id="username"
                            name="username"
                            autoFocus
                            defaultValue={auth.attemptedUsername ?? ""}
                            aria-invalid={messagesPerField.existsError("username")}
                            className="has-icon"
                            style={messagesPerField.existsError("username")
                                ? { ...inputStyle, border: "1px solid rgba(220,53,69,0.6)" }
                                : inputStyle}
                        />
                    </div>
                    {messagesPerField.existsError("username") && (
                        <span
                            style={{ color: "#ff6b7a", fontSize: "15px", marginTop: "4px", display: "block" }}
                            aria-live="polite"
                            dangerouslySetInnerHTML={{ __html: kcSanitize(messagesPerField.get("username")) }}
                        />
                    )}
                </div>

                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "16px", margin: 0, fontFamily: "'Geist', 'Open Sans', sans-serif" }}>
                    {realm.duplicateEmailsAllowed ? msg("emailInstructionUsername") : msg("emailInstruction")}
                </p>

                <button
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
                        cursor: "pointer",
                        marginTop: "4px",
                    }}
                >
                    {msgStr("doSubmit")}
                </button>

                <p style={{ textAlign: "center", margin: 0, color: "rgba(255,255,255,0.45)", fontSize: "14px", fontFamily: "'Geist', 'Open Sans', sans-serif" }}>
                    <a href={url.loginUrl} style={{ color: "#6366F1", textDecoration: "none" }}>
                        {msg("backToLogin")}
                    </a>
                </p>
            </form>
        </Template>
    );
}
