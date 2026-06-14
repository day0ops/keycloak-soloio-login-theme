import { MouseEvent, useRef, useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function SelectOrganization(
    props: PageProps<Extract<KcContext, { pageId: "select-organization.ftl" }>, I18n>
) {
    const { kcContext, i18n, Template, classes } = props;
    const { url, user } = kcContext;
    const { msg } = i18n;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const organizationInputRef = useRef<HTMLInputElement>(null);

    const onOrganizationClick = (organizationAlias: string) => (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (!organizationInputRef.current || !formRef.current) {
            return;
        }

        organizationInputRef.current.value = organizationAlias;
        setIsSubmitting(true);

        if (typeof formRef.current.requestSubmit === "function") {
            formRef.current.requestSubmit();
            return;
        }

        formRef.current.submit();
    };

    const organizations = user.organizations ?? [];
    const shouldDisplayGrid = organizations.length > 3;

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={false} classes={classes} headerNode={null}>
            <form ref={formRef} action={url.loginAction} method="post">
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <h2 style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", fontFamily: "'Geist', 'Open Sans', sans-serif", margin: 0, fontWeight: 400 }}>
                        {msg("organization.select")}
                    </h2>
                    <div style={{
                        display: shouldDisplayGrid ? "grid" : "flex",
                        gridTemplateColumns: shouldDisplayGrid ? "repeat(2, 1fr)" : undefined,
                        flexDirection: shouldDisplayGrid ? undefined : "column",
                        gap: "10px",
                    }}>
                        {organizations.map(({ alias, name }) => (
                            <button
                                key={alias}
                                id={`organization-${alias}`}
                                type="button"
                                onClick={onOrganizationClick(alias)}
                                disabled={isSubmitting}
                                style={{
                                    padding: "12px 16px",
                                    backgroundColor: "#27242E",
                                    border: "1px solid #34343B",
                                    borderRadius: "6px",
                                    color: "#ffffff",
                                    fontSize: "15px",
                                    fontFamily: "'Geist', 'Open Sans', sans-serif",
                                    cursor: isSubmitting ? "not-allowed" : "pointer",
                                    opacity: isSubmitting ? 0.6 : 1,
                                    textAlign: "center",
                                }}
                            >
                                {name ?? alias}
                            </button>
                        ))}
                    </div>
                </div>
                <input ref={organizationInputRef} type="hidden" name="kc.org" />
            </form>
        </Template>
    );
}
