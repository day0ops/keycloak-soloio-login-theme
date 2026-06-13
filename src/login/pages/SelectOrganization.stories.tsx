import type { Meta, StoryObj } from "@storybook/react-vite";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "select-organization.ftl" });

const meta = {
    title: "login/SelectOrganization",
    component: KcPageStory,
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FewOrganizations: Story = {
    args: {
        kcContext: {
            user: {
                organizations: [
                    { alias: "solo-io", name: "Solo.io" },
                    { alias: "acme-corp", name: "Acme Corp" }
                ]
            }
        }
    }
};

export const ManyOrganizations: Story = {
    args: {
        kcContext: {
            user: {
                organizations: [
                    { alias: "solo-io", name: "Solo.io" },
                    { alias: "acme-corp", name: "Acme Corp" },
                    { alias: "globex", name: "Globex" },
                    { alias: "initech", name: "Initech" },
                    { alias: "umbrella", name: "Umbrella Corp" },
                    { alias: "wayne-enterprises", name: "Wayne Enterprises" }
                ]
            }
        }
    }
};
