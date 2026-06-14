import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function LinkIdpAction(props: PageProps<Extract<KcContext, { pageId: "link-idp-action.ftl" }>, I18n>) {
    const { kcContext, i18n, Template, classes } = props;
    const { idpDisplayName, url } = kcContext;
    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={false}
            classes={classes}
            displayMessage={false}
            headerNode={msg("linkIdpActionTitle", idpDisplayName)}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "15px", fontFamily: "'Geist', 'Open Sans', sans-serif", margin: 0 }}>
                    {msg("linkIdpActionMessage", idpDisplayName)}
                </p>
                <form action={url.loginAction} method="post" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <button
                        name="continue"
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
                        {msgStr("doContinue")}
                    </button>
                    <button
                        name="cancel-aia"
                        value="true"
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
                        {msgStr("doCancel")}
                    </button>
                </form>
            </div>
        </Template>
    );
}
