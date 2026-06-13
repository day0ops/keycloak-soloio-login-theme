import type { Meta, StoryObj } from "@storybook/react-vite";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login-oauth-grant.ftl" });

const meta = {
    title: "login/LoginOauthGrant",
    component: KcPageStory,
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithMultipleScopes: Story = {
    args: {
        kcContext: {
            oauth: {
                clientScopesRequested: [
                    { consentScreenText: "View your profile information", dynamicScopeParameter: undefined },
                    { consentScreenText: "View your email address", dynamicScopeParameter: undefined },
                    { consentScreenText: "Access your groups", dynamicScopeParameter: undefined }
                ]
            },
            client: {
                name: "Solo.io Dashboard",
                clientId: "solo-dashboard"
            }
        }
    }
};
