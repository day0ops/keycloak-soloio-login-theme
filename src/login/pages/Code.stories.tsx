import type { Meta, StoryObj } from "@storybook/react-vite";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "code.ftl" });

const meta = {
    title: "login/Code",
    component: KcPageStory,
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Success: Story = {
    args: {
        kcContext: {
            code: {
                success: true,
                code: "AUTH-CODE-1234-ABCD"
            }
        }
    }
};

export const Error: Story = {
    args: {
        kcContext: {
            code: {
                success: false,
                error: "Authorization code has expired. Please try again."
            }
        }
    }
};
