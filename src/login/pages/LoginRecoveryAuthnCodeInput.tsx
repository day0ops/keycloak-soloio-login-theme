import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldHalved } from "@fortawesome/free-solid-svg-icons";
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
    fontSize: "15px",
    fontFamily: "'Geist', 'Open Sans', sans-serif",
    outline: "none",
    boxSizing: "border-box",
    letterSpacing: "0.12em",
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

export default function LoginRecoveryAuthnCodeInput(
    props: PageProps<Extract<KcContext, { pageId: "login-recovery-authn-code-input.ftl" }>, I18n>
) {
    const { kcContext, i18n, Template, classes } = props;
    const { url, messagesPerField, recoveryAuthnCodesInputBean } = kcContext;
    const { msg, msgStr } = i18n;

    const hasError = messagesPerField.existsError("recoveryCodeInput");

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={false}
            classes={classes}
            headerNode={msg("auth-recovery-code-header")}
            displayMessage={!hasError}
        >
            <form
                id="kc-recovery-code-login-form"
                action={url.loginAction}
                method="post"
                style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
                <div>
                    <label htmlFor="recoveryCodeInput" style={labelStyle}>
                        {msg("auth-recovery-code-prompt", `${recoveryAuthnCodesInputBean.codeNumber}`)}
                    </label>
                    <div style={{ position: "relative" }}>
                        <FontAwesomeIcon icon={faShieldHalved} style={iconStyle} />
                        <input
                            tabIndex={1}
                            id="recoveryCodeInput"
                            name="recoveryCodeInput"
                            autoComplete="off"
                            type="text"
                            autoFocus
                            aria-invalid={hasError}
                            style={hasError ? { ...inputStyle, border: "1px solid rgba(220,53,69,0.6)", paddingLeft: "40px" } : { ...inputStyle, paddingLeft: "40px" }}
                        />
                    </div>
                    {hasError && (
                        <span
                            style={{ color: "#ff6b7a", fontSize: "13px", marginTop: "4px", display: "block" }}
                            aria-live="polite"
                            dangerouslySetInnerHTML={{ __html: kcSanitize(messagesPerField.get("recoveryCodeInput")) }}
                        />
                    )}
                </div>
                <button
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
                        cursor: "pointer",
                    }}
                >
                    {msgStr("doLogIn")}
                </button>
            </form>
        </Template>
    );
}
