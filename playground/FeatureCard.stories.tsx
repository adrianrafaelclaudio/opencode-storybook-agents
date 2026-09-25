import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { FeatureCard } from "./FeatureCard";

const meta = {
  title: "Components/Cards/Feature Card",
  component: FeatureCard,
  tags: ["autodocs"],
  args: {
    eyebrow: "Design system",
    title: "A documented component is easier to trust.",
    description:
      "Use Controls to exercise real content boundaries and Actions to observe intent without leaving the catalog.",
    primaryLabel: "Primary action",
    secondaryLabel: "Learn more",
    onPrimary: fn(),
    onSecondary: fn(),
  },
  parameters: {
    docs: {
      description: {
        component:
          "Editorial card used as a neutral example of typed content, observable callbacks and responsive review.",
      },
    },
  },
} satisfies Meta<typeof FeatureCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile" } },
};
export const LongContent: Story = {
  args: {
    title: "Long content reveals whether the visual contract is resilient.",
    description:
      "This variation intentionally uses a longer paragraph so spacing, wrapping and action placement can be reviewed before the component reaches a page.",
  },
};
