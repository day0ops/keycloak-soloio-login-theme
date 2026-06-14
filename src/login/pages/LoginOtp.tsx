import { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
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
    letterSpacing: "0.2em",
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

export default function LoginOtp(props: PageProps<Extract<KcContext, { pageId: "login-otp.ftl" }>, I18n>) {
    const { kcContext, i18n, Template, classes } = props;
    const { otpLogin, url, messagesPerField } = kcContext;
    const { msg, msgStr } = i18n;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const hasError = messagesPerField.existsError("totp");

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={false}
            classes={classes}
            displayMessage={!hasError}
            headerNode={msg("doLogIn")}
        >
            <form
                id="kc-otp-login-form"
                action={url.loginAction}
                onSubmit={() => { setIsSubmitting(true); return true; }}
                method="post"
                style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
                {otpLogin.userOtpCredentials.length > 1 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        {otpLogin.userOtpCredentials.map((otpCredential, index) => (
                            <Fragment key={index}>
                                <input
                                    id={`kc-otp-credential-${index}`}
                                    type="radio"
                                    name="selectedCredentialId"
                                    value={otpCredential.id}
                                    defaultChecked={otpCredential.id === otpLogin.selectedCredentialId}
                                    style={{ display: "none" }}
                                />
                                <label
                                    htmlFor={`kc-otp-credential-${index}`}
                                    tabIndex={index}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        padding: "10px 14px",
                                        backgroundColor: otpCredential.id === otpLogin.selectedCredentialId ? "rgba(104,68,255,0.15)" : "#27242E",
                                        border: otpCredential.id === otpLogin.selectedCredentialId ? "1px solid rgba(104,68,255,0.5)" : "1px solid #34343B",
                                        borderRadius: "6px",
                                        cursor: "pointer",
                                        color: "#ffffff",
                                        fontSize: "15px",
                                        fontFamily: "'Geist', 'Open Sans', sans-serif",
                                    }}
                                >
                                    {otpCredential.userLabel}
                                </label>
                            </Fragment>
                        ))}
                    </div>
                )}

                <div>
                    <label htmlFor="otp" style={labelStyle}>
                        {msg("loginOtpOneTime")}
                    </label>
                    <div style={{ position: "relative" }}>
                        <FontAwesomeIcon icon={faKey} style={iconStyle} />
                        <input
                            id="otp"
                            name="otp"
                            autoComplete="off"
                            type="text"
                            autoFocus
                            aria-invalid={hasError}
                            className="has-icon"
                            style={hasError ? { ...inputStyle, border: "1px solid rgba(220,53,69,0.6)" } : inputStyle}
                        />
                    </div>
                    {hasError && (
                        <span
                            style={{ color: "#ff6b7a", fontSize: "13px", marginTop: "4px", display: "block" }}
                            aria-live="polite"
                            dangerouslySetInnerHTML={{ __html: kcSanitize(messagesPerField.get("totp")) }}
                        />
                    )}
                </div>

                <button
                    name="login"
                    type="submit"
                    disabled={isSubmitting}
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
                        cursor: isSubmitting ? "not-allowed" : "pointer",
                        opacity: isSubmitting ? 0.6 : 1,
                    }}
                >
                    {msgStr("doLogIn")}
                </button>
            </form>
        </Template>
    );
}
