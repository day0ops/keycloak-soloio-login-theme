import { useEffect } from "react";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import type { KcContext } from "../kc.gen";
import type { I18n } from "../i18n";
import backgroundImage from "./assets/background.png";
import faviconUrl from "./assets/favicon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldHalved, faCircleExclamation, faCircleCheck, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const { kcContext, i18n, children } = props;
    const { msgStr } = i18n;

    const { message, isAppInitiatedAction } = kcContext as KcContext & {
        message?: { type: string; summary: string };
        isAppInitiatedAction?: boolean;
    };

    useEffect(() => {
        document.title = msgStr("loginTitle", kcContext.realm.displayName ?? kcContext.realm.name);

        const favicon = document.createElement("link");
        favicon.rel = "icon";
        favicon.type = "image/png";
        favicon.href = faviconUrl;
        document.head.appendChild(favicon);

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap";
        document.head.appendChild(link);

        const style = document.createElement("style");
        style.textContent = `
            html, body { margin: 0 !important; padding: 0 !important; overflow-x: hidden !important; }
            *, *::before, *::after { font-family: 'Geist', 'Open Sans', sans-serif !important; box-sizing: border-box !important; }
            input[type="text"], input[type="email"], input[type="password"], input[type="tel"], input[type="number"] {
                background: #27242E !important;
                border: 1px solid #34343B !important;
                color: #ffffff !important;
                border-radius: 6px !important;
                padding: 10px 14px !important;
                width: 100% !important;
                box-sizing: border-box !important;
                font-size: 17px !important;
            }
            input.has-icon { padding-left: 40px !important; }
            input[type="text"]::placeholder, input[type="email"]::placeholder, input[type="password"]::placeholder {
                color: rgba(255,255,255,0.3) !important;
            }
            input:-webkit-autofill,
            input:-webkit-autofill:hover,
            input:-webkit-autofill:focus {
                -webkit-box-shadow: 0 0 0px 1000px #0E0E17 inset !important;
                -webkit-text-fill-color: #ffffff !important;
                transition: background-color 5000s ease-in-out 0s;
            }
            label { color: rgba(255,255,255,0.7) !important; font-size: 16px !important; margin-bottom: 6px !important; }
            div[class*="LabelWrapper"] { display: flex !important; flex-direction: row !important; align-items: center !important; gap: 4px !important; margin-bottom: 6px !important; }
            div[class*="LabelWrapper"] label { margin-bottom: 0 !important; display: inline !important; }
            .kc-form-group { margin-bottom: 16px; }
            .kc-label-wrapper { display: flex; flex-direction: row; align-items: center; gap: 4px; margin-bottom: 6px; }
            .kc-label-wrapper .kc-label { color: rgba(255,255,255,0.7); font-size: 16px; margin-bottom: 0; display: inline; }
            .kc-input-wrapper { width: 100%; }
            .kc-input-error { color: #ff6b7a !important; font-size: 15px !important; margin-top: 4px !important; display: block !important; }
            .kc-form-group:not(:has(input, select, textarea)) {
                margin-top: 24px;
                padding-top: 20px;
                border-top: 1px solid rgba(52,52,59,0.6);
                color: rgba(161,161,170,0.55);
                font-size: 15px;
                text-transform: uppercase;
                letter-spacing: 0.08em;
            }
            input[type="submit"], button[type="submit"], button.btn-primary, .btn-primary {
                -webkit-appearance: none !important;
                appearance: none !important;
                background: linear-gradient(117deg, #6844FF -23.54%, #1D283A 223.49%) !important;
                background-color: #6844FF !important;
                color: #ffffff !important;
                border: none !important;
                border-radius: 6px !important;
                padding: 11px !important;
                font-size: 17px !important;
                font-weight: 600 !important;
                cursor: pointer !important;
                width: 100% !important;
                margin-top: 8px !important;
            }
            a { color: #6366F1 !important; }
            a:hover { color: #818CF8 !important; }
            .kcInputErrorMessageClass, span[aria-live] { color: #ff6b7a !important; font-size: 15px !important; margin-top: 4px !important; display: block !important; }
        `;
        document.head.appendChild(style);
    }, []);

    return (
        <div style={{
            minHeight: "100vh",
            width: "100%",
            display: "flex",
        }}>
            <div style={{
                flex: "0 0 60%",
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "left center",
                backgroundRepeat: "no-repeat",
            }} />
            <div style={{
                flex: "0 0 40%",
                minHeight: "100vh",
                backgroundColor: "rgba(17, 19, 27, 0.96)",
                backdropFilter: "blur(12px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "48px 40px",
                boxSizing: "border-box",
            }}>
                <div style={{ marginBottom: "32px" }}>
                    <h1 style={{
                        color: "#ffffff",
                        fontSize: "26px",
                        fontWeight: 600,
                        margin: 0,
                        fontFamily: "'Geist', 'Open Sans', sans-serif",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                    }}>
                        <FontAwesomeIcon icon={faShieldHalved} style={{ color: "#6844FF", fontSize: "22px", flexShrink: 0 }} />
                        {kcContext.realm.displayName ?? kcContext.realm.name}
                    </h1>
                    <p style={{
                        color: "rgba(255,255,255,0.5)",
                        fontSize: "16px",
                        margin: "6px 0 0",
                        fontFamily: "'Geist', 'Open Sans', sans-serif",
                    }}>
                        Sign in to continue
                    </p>
                </div>

                {message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (() => {
                    const bannerIcon = message.type === "error"
                        ? faCircleExclamation
                        : message.type === "success"
                          ? faCircleCheck
                          : faTriangleExclamation;
                    const bannerColor = message.type === "error"
                        ? "#ff6b7a"
                        : message.type === "success"
                          ? "#6ee685"
                          : "#ffd966";
                    return (
                        <div style={{
                            padding: "12px 16px",
                            borderRadius: "6px",
                            marginBottom: "20px",
                            fontSize: "15px",
                            fontFamily: "'Geist', 'Open Sans', sans-serif",
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "10px",
                            backgroundColor: message.type === "error"
                                ? "rgba(220, 53, 69, 0.2)"
                                : message.type === "success"
                                  ? "rgba(40, 167, 69, 0.2)"
                                  : "rgba(255, 193, 7, 0.2)",
                            color: bannerColor,
                            border: `1px solid ${message.type === "error"
                                ? "rgba(220, 53, 69, 0.4)"
                                : message.type === "success"
                                  ? "rgba(40, 167, 69, 0.4)"
                                  : "rgba(255, 193, 7, 0.4)"}`,
                        }}>
                            <FontAwesomeIcon icon={bannerIcon} style={{ fontSize: "16px", marginTop: "1px", flexShrink: 0 }} />
                            <span dangerouslySetInnerHTML={{ __html: message.summary }} />
                        </div>
                    );
                })()}

                <div style={{ color: "#ffffff" }}>
                    {children}
                </div>
            </div>
        </div>
    );
}
