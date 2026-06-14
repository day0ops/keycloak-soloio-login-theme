import { useScript } from "keycloakify/login/pages/LoginRecoveryAuthnCodeConfig.useScript";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function LoginRecoveryAuthnCodeConfig(
    props: PageProps<Extract<KcContext, { pageId: "login-recovery-authn-code-config.ftl" }>, I18n>
) {
    const { kcContext, i18n, Template, classes } = props;
    const { recoveryAuthnCodesConfigBean, isAppInitiatedAction } = kcContext;
    const { msg, msgStr } = i18n;

    const olRecoveryCodesListId = "kc-recovery-codes-list";

    useScript({ olRecoveryCodesListId, i18n });

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={false}
            classes={classes}
            headerNode={msg("recovery-code-config-header")}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {/* Warning */}
                <div style={{
                    padding: "12px 16px",
                    backgroundColor: "rgba(255,193,7,0.1)",
                    border: "1px solid rgba(255,193,7,0.3)",
                    borderRadius: "6px",
                }}>
                    <p style={{ color: "#ffd966", fontSize: "14px", fontFamily: "'Geist', 'Open Sans', sans-serif", margin: "0 0 4px", fontWeight: 600 }}>
                        {msg("recovery-code-config-warning-title")}
                    </p>
                    <p style={{ color: "rgba(255,217,102,0.8)", fontSize: "13px", fontFamily: "'Geist', 'Open Sans', sans-serif", margin: 0 }}>
                        {msg("recovery-code-config-warning-message")}
                    </p>
                </div>

                {/* Recovery codes list */}
                <ol
                    id={olRecoveryCodesListId}
                    style={{
                        listStyle: "none",
                        padding: "16px",
                        margin: 0,
                        backgroundColor: "#27242E",
                        border: "1px solid #34343B",
                        borderRadius: "6px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                    }}
                >
                    {recoveryAuthnCodesConfigBean.generatedRecoveryAuthnCodesList.map((code, index) => (
                        <li key={index} style={{ color: "#ffffff", fontSize: "15px", fontFamily: "'Geist Mono', 'Courier New', monospace", display: "flex", gap: "12px" }}>
                            <span style={{ color: "rgba(255,255,255,0.3)", minWidth: "20px" }}>{index + 1}.</span>
                            <span style={{ letterSpacing: "0.1em" }}>{code.slice(0, 4)}-{code.slice(4, 8)}-{code.slice(8)}</span>
                        </li>
                    ))}
                </ol>

                {/* Actions */}
                <div style={{ display: "flex", gap: "8px" }}>
                    {[
                        { id: "printRecoveryCodes", label: msg("recovery-codes-print") },
                        { id: "downloadRecoveryCodes", label: msg("recovery-codes-download") },
                        { id: "copyRecoveryCodes", label: msg("recovery-codes-copy") },
                    ].map(({ id, label }) => (
                        <button
                            key={id}
                            id={id}
                            type="button"
                            style={{
                                flex: 1,
                                padding: "8px 10px",
                                background: "transparent",
                                color: "#6366F1",
                                border: "1px solid rgba(99,102,241,0.3)",
                                borderRadius: "6px",
                                fontSize: "13px",
                                fontFamily: "'Geist', 'Open Sans', sans-serif",
                                cursor: "pointer",
                            }}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* Confirmation checkbox */}
                <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer" }}>
                    <input
                        type="checkbox"
                        id="kcRecoveryCodesConfirmationCheck"
                        name="kcRecoveryCodesConfirmationCheck"
                        style={{ marginTop: "2px", flexShrink: 0 }}
                        onChange={event => {
                            //@ts-expect-error: This is inherited from the original code
                            document.getElementById("saveRecoveryAuthnCodesBtn").disabled = !event.target.checked;
                        }}
                    />
                    <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", fontFamily: "'Geist', 'Open Sans', sans-serif" }}>
                        {msg("recovery-codes-confirmation-message")}
                    </span>
                </label>

                <form action={kcContext.url.loginAction} id="kc-recovery-codes-settings-form" method="post" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <input type="hidden" name="generatedRecoveryAuthnCodes" value={recoveryAuthnCodesConfigBean.generatedRecoveryAuthnCodesAsString} />
                    <input type="hidden" name="generatedAt" value={recoveryAuthnCodesConfigBean.generatedAt} />
                    <input type="hidden" id="userLabel" name="userLabel" value={msgStr("recovery-codes-label-default")} />

                    {/* Logout other sessions */}
                    <label style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.6)", fontSize: "14px", fontFamily: "'Geist', 'Open Sans', sans-serif", cursor: "pointer" }}>
                        <input type="checkbox" id="logout-sessions" name="logout-sessions" value="on" defaultChecked={true} />
                        {msg("logoutOtherSessions")}
                    </label>

                    <button
                        type="submit"
                        id="saveRecoveryAuthnCodesBtn"
                        disabled
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
                            cursor: "not-allowed",
                            opacity: 0.5,
                        }}
                    >
                        {msgStr(isAppInitiatedAction ? "recovery-codes-action-complete" : "recovery-codes-action-complete")}
                    </button>

                    {isAppInitiatedAction && (
                        <button
                            type="submit"
                            id="cancelRecoveryAuthnCodesBtn"
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
                            {msg("recovery-codes-action-cancel")}
                        </button>
                    )}
                </form>
            </div>
        </Template>
    );
}
