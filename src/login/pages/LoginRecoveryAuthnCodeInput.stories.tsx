import type { Meta, StoryObj } from "@storybook/react-vite";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login-recovery-authn-code-input.ftl" });

const meta = {
    title: "login/LoginRecoveryAuthnCodeInput",
    component: KcPageStory,
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
    args: {
        kcContext: {
            messagesPerField: {
                existsError: (fields: string[]) => fields.includes("recoveryCodeInput"),
                get: () => "Invalid recovery code. Please try another."
            }
        }
    }
};
