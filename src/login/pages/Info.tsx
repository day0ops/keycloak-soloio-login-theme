import type { PageProps } from "keycloakify/login/pages/PageProps";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

const linkStyle: React.CSSProperties = {
    color: "#6366F1",
    textDecoration: "none",
    fontSize: "15px",
    fontFamily: "'Geist', 'Open Sans', sans-serif",
};

export default function Info(props: PageProps<Extract<KcContext, { pageId: "info.ftl" }>, I18n>) {
    const { kcContext, i18n, Template, classes } = props;
    const { advancedMsgStr, msg } = i18n;
    const { messageHeader, message, requiredActions, skipLink, pageRedirectUri, actionUri, client } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={false}
            classes={classes}
            displayMessage={false}
            headerNode={
                <span
                    dangerouslySetInnerHTML={{
                        __html: kcSanitize(messageHeader ? advancedMsgStr(messageHeader) : message.summary)
                    }}
                />
            }
        >
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <p
                    style={{
                        color: "rgba(255,255,255,0.7)",
                        fontSize: "15px",
                        fontFamily: "'Geist', 'Open Sans', sans-serif",
                        margin: 0,
                        lineHeight: 1.6,
                    }}
                    dangerouslySetInnerHTML={{
                        __html: kcSanitize(
                            (() => {
                                let html = message.summary?.trim();

                                if (requiredActions) {
                                    html += " <b>";
                                    html += requiredActions
                                        .map(action => advancedMsgStr(`requiredAction.${action}`))
                                        .join(", ");
                                    html += "</b>";
                                }

                                return html;
                            })()
                        )
                    }}
                />

                {!skipLink && (() => {
                    if (pageRedirectUri) {
                        return (
                            <p style={{ margin: 0 }}>
                                <a href={pageRedirectUri} style={linkStyle}>
                                    {msg("backToApplication")}
                                </a>
                            </p>
                        );
                    }
                    if (actionUri) {
                        return (
                            <p style={{ margin: 0 }}>
                                <a href={actionUri} style={linkStyle}>
                                    {msg("proceedWithAction")}
                                </a>
                            </p>
                        );
                    }
                    if (client.baseUrl) {
                        return (
                            <p style={{ margin: 0 }}>
                                <a href={client.baseUrl} style={linkStyle}>
                                    {msg("backToApplication")}
                                </a>
                            </p>
                        );
                    }
                })()}
            </div>
        </Template>
    );
}
