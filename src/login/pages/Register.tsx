import type { JSX } from "keycloakify/tools/JSX";
import { useState, useLayoutEffect } from "react";
import type { LazyOrNot } from "keycloakify/tools/LazyOrNot";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

type RegisterProps = PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n> & {
    UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps) => JSX.Element>;
    doMakeUserConfirmPassword: boolean;
};

export default function Register(props: RegisterProps) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes, UserProfileFormFields, doMakeUserConfirmPassword } = props;

    // Custom class overrides so UserProfileFormFields picks up the global CSS rules injected by Template
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes: {
            ...classes,
            kcFormGroupClass: "kc-form-group",
            kcLabelWrapperClass: "kc-label-wrapper",
            kcLabelClass: "kc-label",
            kcInputWrapperClass: "kc-input-wrapper",
            kcInputErrorMessageClass: "kc-input-error",
        }
    });

    const { messageHeader, url, messagesPerField, recaptchaRequired, recaptchaVisible, recaptchaSiteKey, recaptchaAction, termsAcceptanceRequired } =
        kcContext;

    const { msg, msgStr, advancedMsg } = i18n;

    const [isFormSubmittable, setIsFormSubmittable] = useState(false);
    const [areTermsAccepted, setAreTermsAccepted] = useState(false);

    useLayoutEffect(() => {
        (window as any)["onSubmitRecaptcha"] = () => {
            // @ts-expect-error
            document.getElementById("kc-register-form").requestSubmit();
        };

        return () => {
            delete (window as any)["onSubmitRecaptcha"];
        };
    }, []);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={messageHeader !== undefined ? advancedMsg(messageHeader) : msg("registerTitle")}
            displayMessage={messagesPerField.exists("global")}
        >
            <form id="kc-register-form" action={url.registrationAction} method="post">
                <UserProfileFormFields
                    kcContext={kcContext}
                    i18n={i18n}
                    kcClsx={kcClsx}
                    onIsFormSubmittableValueChange={setIsFormSubmittable}
                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                />
                {termsAcceptanceRequired && (
                    <TermsAcceptance
                        i18n={i18n}
                        messagesPerField={messagesPerField}
                        areTermsAccepted={areTermsAccepted}
                        onAreTermsAcceptedValueChange={setAreTermsAccepted}
                    />
                )}
                {recaptchaRequired && (recaptchaVisible || recaptchaAction === undefined) && (
                    <div style={{ marginBottom: "16px" }}>
                        <div className="g-recaptcha" data-size="compact" data-sitekey={recaptchaSiteKey} data-action={recaptchaAction} />
                    </div>
                )}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "8px" }}>
                    {recaptchaRequired && !recaptchaVisible && recaptchaAction !== undefined ? (
                        <button
                            className="g-recaptcha"
                            data-sitekey={recaptchaSiteKey}
                            data-callback="onSubmitRecaptcha"
                            data-action={recaptchaAction}
                            type="submit"
                            style={{
                                width: "100%",
                                padding: "11px",
                                background: "linear-gradient(117deg, #6844FF -23.54%, #1D283A 223.49%)",
                                color: "#ffffff",
                                border: "none",
                                borderRadius: "6px",
                                fontSize: "14px",
                                fontWeight: 600,
                                fontFamily: "'Geist', 'Open Sans', sans-serif",
                                cursor: "pointer",
                            }}
                        >
                            {msg("doRegister")}
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={!isFormSubmittable || (termsAcceptanceRequired && !areTermsAccepted)}
                            style={{
                                width: "100%",
                                padding: "11px",
                                background: "linear-gradient(117deg, #6844FF -23.54%, #1D283A 223.49%)",
                                color: "#ffffff",
                                border: "none",
                                borderRadius: "6px",
                                fontSize: "14px",
                                fontWeight: 600,
                                fontFamily: "'Geist', 'Open Sans', sans-serif",
                                cursor: (!isFormSubmittable || (termsAcceptanceRequired && !areTermsAccepted)) ? "not-allowed" : "pointer",
                                opacity: (!isFormSubmittable || (termsAcceptanceRequired && !areTermsAccepted)) ? 0.5 : 1,
                            }}
                        >
                            {msgStr("doRegister")}
                        </button>
                    )}
                    <p style={{ textAlign: "center", margin: 0, color: "rgba(255,255,255,0.45)", fontSize: "13px", fontFamily: "'Geist', 'Open Sans', sans-serif" }}>
                        <a href={url.loginUrl} style={{ color: "#6366F1", textDecoration: "none" }}>
                            {msg("backToLogin")}
                        </a>
                    </p>
                </div>
            </form>
        </Template>
    );
}

function TermsAcceptance(props: {
    i18n: I18n;
    messagesPerField: Pick<KcContext["messagesPerField"], "existsError" | "get">;
    areTermsAccepted: boolean;
    onAreTermsAcceptedValueChange: (areTermsAccepted: boolean) => void;
}) {
    const { i18n, messagesPerField, areTermsAccepted, onAreTermsAcceptedValueChange } = props;
    const { msg } = i18n;

    return (
        <div style={{ marginBottom: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <div>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", fontFamily: "'Geist', 'Open Sans', sans-serif", margin: "0 0 6px" }}>
                    {msg("termsTitle")}
                </p>
                <div
                    id="kc-registration-terms-text"
                    style={{
                        padding: "10px 14px",
                        backgroundColor: "#27242E",
                        border: "1px solid #34343B",
                        borderRadius: "6px",
                        color: "rgba(255,255,255,0.6)",
                        fontSize: "12px",
                        fontFamily: "'Geist', 'Open Sans', sans-serif",
                        maxHeight: "120px",
                        overflowY: "auto",
                    }}
                >
                    {msg("termsText")}
                </div>
            </div>
            <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer" }}>
                <input
                    type="checkbox"
                    id="termsAccepted"
                    name="termsAccepted"
                    style={{ marginTop: "2px", flexShrink: 0 }}
                    checked={areTermsAccepted}
                    onChange={e => onAreTermsAcceptedValueChange(e.target.checked)}
                    aria-invalid={messagesPerField.existsError("termsAccepted")}
                />
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", fontFamily: "'Geist', 'Open Sans', sans-serif" }}>
                    {msg("acceptTerms")}
                </span>
            </label>
            {messagesPerField.existsError("termsAccepted") && (
                <span
                    style={{ color: "#ff6b7a", fontSize: "12px", display: "block" }}
                    aria-live="polite"
                    dangerouslySetInnerHTML={{ __html: kcSanitize(messagesPerField.get("termsAccepted")) }}
                />
            )}
        </div>
    );
}
