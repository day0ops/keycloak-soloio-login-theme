import type { Meta, StoryObj } from "@storybook/react-vite";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "logout-confirm.ftl" });

const meta = {
    title: "login/LogoutConfirm",
    component: KcPageStory,
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithBackLink: Story = {
    args: {
        kcContext: {
            logoutConfirm: {
                skipLink: false
            },
            client: {
                baseUrl: "https://app.example.com"
            }
        }
    }
};
