import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function LogoutConfirm(props: PageProps<Extract<KcContext, { pageId: "logout-confirm.ftl" }>, I18n>) {
    const { kcContext, i18n, Template, classes } = props;
    const { url, client, logoutConfirm } = kcContext;
    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={false}
            classes={classes}
            headerNode={msg("logoutConfirmTitle")}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "15px", fontFamily: "'Geist', 'Open Sans', sans-serif", margin: 0 }}>
                    {msg("logoutConfirmHeader")}
                </p>
                <form action={url.logoutConfirmAction} method="POST">
                    <input type="hidden" name="session_code" value={logoutConfirm.code} />
                    <button
                        tabIndex={4}
                        name="confirmLogout"
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
                        {msgStr("doLogout")}
                    </button>
                </form>
                {!logoutConfirm.skipLink && client.baseUrl && (
                    <p style={{ textAlign: "center", margin: 0 }}>
                        <a href={client.baseUrl} style={{ color: "#6366F1", textDecoration: "none", fontSize: "14px", fontFamily: "'Geist', 'Open Sans', sans-serif" }}>
                            {msg("backToApplication")}
                        </a>
                    </p>
                )}
            </div>
        </Template>
    );
}
