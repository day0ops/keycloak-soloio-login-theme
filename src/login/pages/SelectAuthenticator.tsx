import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function SelectAuthenticator(
    props: PageProps<Extract<KcContext, { pageId: "select-authenticator.ftl" }>, I18n>
) {
    const { kcContext, i18n, Template, classes } = props;
    const { url, auth } = kcContext;
    const { msg, advancedMsg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={false}
            classes={classes}
            displayInfo={false}
            headerNode={msg("loginChooseAuthenticator")}
        >
            <form
                id="kc-select-credential-form"
                action={url.loginAction}
                method="post"
                style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
                {auth.authenticationSelections.map((sel, i) => (
                    <button
                        key={i}
                        type="submit"
                        name="authenticationExecution"
                        value={sel.authExecId}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "14px 16px",
                            backgroundColor: "#27242E",
                            border: "1px solid #34343B",
                            borderRadius: "8px",
                            cursor: "pointer",
                            textAlign: "left",
                            width: "100%",
                            transition: "border-color 0.15s",
                        }}
                    >
                        <div>
                            <div style={{ color: "#ffffff", fontSize: "15px", fontWeight: 500, fontFamily: "'Geist', 'Open Sans', sans-serif" }}>
                                {advancedMsg(sel.displayName)}
                            </div>
                            <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", marginTop: "3px", fontFamily: "'Geist', 'Open Sans', sans-serif" }}>
                                {advancedMsg(sel.helpText)}
                            </div>
                        </div>
                        <FontAwesomeIcon icon={faChevronRight} style={{ color: "rgba(255,255,255,0.3)", fontSize: "14px", marginLeft: "12px", flexShrink: 0 }} />
                    </button>
                ))}
            </form>
        </Template>
    );
}
