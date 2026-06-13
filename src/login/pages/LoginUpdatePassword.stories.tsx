import type { Meta, StoryObj } from "@storybook/react-vite";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login-update-password.ftl" });

const meta = {
    title: "login/LoginUpdatePassword",
    component: KcPageStory,
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithErrors: Story = {
    args: {
        kcContext: {
            messagesPerField: {
                existsError: (fields: string[]) => fields.some(f => ["password", "password-confirm"].includes(f)),
                get: (field: string) => field === "password-confirm" ? "Passwords do not match." : "Password too weak."
            }
        }
    }
};

export const AppInitiatedAction: Story = {
    args: {
        kcContext: {
            isAppInitiatedAction: true
        }
    }
};
