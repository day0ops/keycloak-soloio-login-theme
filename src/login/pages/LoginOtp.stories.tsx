import type { Meta, StoryObj } from "@storybook/react-vite";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login-otp.ftl" });

const meta = {
    title: "login/LoginOtp",
    component: KcPageStory,
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithMultipleCredentials: Story = {
    args: {
        kcContext: {
            otpLogin: {
                userOtpCredentials: [
                    { id: "cred-1", userLabel: "Authenticator App" },
                    { id: "cred-2", userLabel: "Hardware Token" }
                ],
                selectedCredentialId: "cred-1"
            }
        }
    }
};

export const WithError: Story = {
    args: {
        kcContext: {
            messagesPerField: {
                existsError: (fields: string[]) => fields.includes("totp"),
                get: () => "Invalid one-time code. Please try again."
            }
        }
    }
};
