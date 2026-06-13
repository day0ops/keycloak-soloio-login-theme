import type { Meta, StoryObj } from "@storybook/react-vite";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login-password.ftl" });

const meta = {
    title: "login/LoginPassword",
    component: KcPageStory,
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
    args: {
        kcContext: {
            messagesPerField: {
                existsError: (fields: string[]) => fields.includes("password"),
                get: () => "Invalid password."
            }
        }
    }
};

export const WithForgotPassword: Story = {
    args: {
        kcContext: {
            realm: {
                resetPasswordAllowed: true
            }
        }
    }
};
