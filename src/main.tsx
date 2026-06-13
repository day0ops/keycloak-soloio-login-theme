import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { KcPage, type KcContext } from "./kc.gen";

const kcContext = (window as unknown as Record<string, unknown>).kcContext as KcContext | undefined;

if (kcContext === undefined) {
    throw new Error(
        "This app is a Keycloak theme.\n" +
        "It isn't meant to be used standalone.\n" +
        "Use 'bun run storybook' for development."
    );
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <KcPage kcContext={kcContext} />
    </StrictMode>
);
