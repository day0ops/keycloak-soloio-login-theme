import type { Meta, StoryObj } from "@storybook/react-vite";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "webauthn-authenticate.ftl" });

const meta = {
    title: "login/WebauthnAuthenticate",
    component: KcPageStory,
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAuthenticators: Story = {
    args: {
        kcContext: {
            shouldDisplayAuthenticators: true,
            authenticators: {
                authenticators: [
                    {
                        credentialId: "cred-1",
                        label: "Touch ID",
                        createdAt: "2024-01-15",
                        transports: {
                            iconClass: "kcWebAuthnDefaultIcon",
                            displayNameProperties: ["webauthn.transport.internal"]
                        }
                    },
                    {
                        credentialId: "cred-2",
                        label: "YubiKey 5",
                        createdAt: "2024-03-01",
                        transports: {
                            iconClass: "kcWebAuthnDefaultIcon",
                            displayNameProperties: ["webauthn.transport.usb"]
                        }
                    }
                ]
            }
        }
    }
};
