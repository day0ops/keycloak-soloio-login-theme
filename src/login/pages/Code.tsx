import type { PageProps } from "keycloakify/login/pages/PageProps";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function Code(props: PageProps<Extract<KcContext, { pageId: "code.ftl" }>, I18n>) {
    const { kcContext, i18n, Template, classes } = props;
    const { code } = kcContext;
    const { msg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={false}
            classes={classes}
            headerNode={code.success ? msg("codeSuccessTitle") : msg("codeErrorTitle", code.error)}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {code.success ? (
                    <>
                        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "15px", fontFamily: "'Geist', 'Open Sans', sans-serif", margin: 0 }}>
                            {msg("copyCodeInstruction")}
                        </p>
                        <input
                            id="code"
                            readOnly
                            defaultValue={code.code}
                            style={{
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
                                letterSpacing: "0.1em",
                            }}
                        />
                    </>
                ) : (
                    code.error && (
                        <p
                            style={{ color: "#ff6b7a", fontSize: "15px", fontFamily: "'Geist', 'Open Sans', sans-serif", margin: 0 }}
                            dangerouslySetInnerHTML={{ __html: kcSanitize(code.error) }}
                        />
                    )
                )}
            </div>
        </Template>
    );
}
