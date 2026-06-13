import type { Meta, StoryObj } from "@storybook/react-vite";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "info.ftl" });

const meta = {
    title: "login/Info",
    component: KcPageStory,
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithBackLink: Story = {
    args: {
        kcContext: {
            pageRedirectUri: "https://app.example.com/dashboard"
        }
    }
};

export const WithActionLink: Story = {
    args: {
        kcContext: {
            actionUri: "https://app.example.com/proceed"
        }
    }
};
