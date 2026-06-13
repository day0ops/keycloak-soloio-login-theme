import type { Meta, StoryObj } from "@storybook/react-vite";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "link-idp-action.ftl" });

const meta = {
    title: "login/LinkIdpAction",
    component: KcPageStory,
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithGoogle: Story = {
    args: {
        kcContext: {
            idpDisplayName: "Google"
        }
    }
};
