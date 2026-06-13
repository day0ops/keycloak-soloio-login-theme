import type { Meta, StoryObj } from "@storybook/react-vite";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login-username.ftl" });

const meta = {
    title: "login/LoginUsername",
    component: KcPageStory,
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
    args: {
        kcContext: {
            messagesPerField: {
                existsError: (fields: string[]) => fields.includes("username"),
                getFirstError: () => "User not found."
            }
        }
    }
};

export const WithSocialProviders: Story = {
    args: {
        kcContext: {
            social: {
                displayInfo: true,
                providers: [
                    { alias: "google", displayName: "Google", loginUrl: "#", iconClasses: "" },
                    { alias: "github", displayName: "GitHub", loginUrl: "#", iconClasses: "" }
                ]
            }
        }
    }
};
