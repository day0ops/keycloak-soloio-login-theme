import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function WebauthnError(props: PageProps<Extract<KcContext, { pageId: "webauthn-error.ftl" }>, I18n>) {
    const { kcContext, i18n, Template, classes } = props;
    const { url, isAppInitiatedAction, execution } = kcContext;
    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={false}
            classes={classes}
            displayMessage
            headerNode={msg("webauthn-error-title")}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <form id="kc-error-credential-form" action={url.loginAction} method="post">
                    <input type="hidden" id="executionValue" name="authenticationExecution" />
                    <input type="hidden" id="isSetRetry" name="isSetRetry" />
                </form>
                <input
                    tabIndex={4}
                    type="button"
                    name="try-again"
                    id="kc-try-again"
                    value={msgStr("doTryAgain")}
                    onClick={() => {
                        // @ts-expect-error: Trusted Keycloak's code
                        document.getElementById("isSetRetry").value = "retry";
                        // @ts-expect-error: Trusted Keycloak's code
                        document.getElementById("executionValue").value = execution;
                        // @ts-expect-error: Trusted Keycloak's code
                        document.getElementById("kc-error-credential-form").requestSubmit();
                    }}
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
                />
                {isAppInitiatedAction && (
                    <form action={url.loginAction} id="kc-webauthn-settings-form" method="post">
                        <button
                            type="submit"
                            id="cancelWebAuthnAIA"
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
                            {msgStr("doCancel")}
                        </button>
                    </form>
                )}
            </div>
        </Template>
    );
}
