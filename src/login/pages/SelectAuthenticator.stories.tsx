import type { Meta, StoryObj } from "@storybook/react-vite";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "select-authenticator.ftl" });

const meta = {
    title: "login/SelectAuthenticator",
    component: KcPageStory,
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithMultipleOptions: Story = {
    args: {
        kcContext: {
            auth: {
                authenticationSelections: [
                    {
                        authExecId: "exec-1",
                        displayName: "Password",
                        helpText: "Sign in with your username and password",
                        iconCssClass: "kcAuthenticatorPasswordClass"
                    },
                    {
                        authExecId: "exec-2",
                        displayName: "Security Key",
                        helpText: "Sign in with a FIDO2 security key",
                        iconCssClass: "kcAuthenticatorWebAuthnClass"
                    },
                    {
                        authExecId: "exec-3",
                        displayName: "One-Time Password",
                        helpText: "Sign in with a time-based one-time password",
                        iconCssClass: "kcAuthenticatorOTPClass"
                    }
                ]
            }
        }
    }
};
