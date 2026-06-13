import type { Meta, StoryObj } from "@storybook/react-vite";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "register.ftl" });

const meta = {
    title: "login/Register",
    component: KcPageStory,
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithErrors: Story = {
    args: {
        kcContext: {
            messagesPerField: {
                existsError: (fieldName: string) => ["firstName", "email", "password"].includes(fieldName),
                get: (fieldName: string) => {
                    if (fieldName === "email") return "Email already in use.";
                    if (fieldName === "password") return "Password must be at least 8 characters.";
                    return "This field is required.";
                },
                exists: () => false,
                printIfExists: () => ""
            }
        }
    }
};
