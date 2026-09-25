import type { Meta, StoryObj } from "@storybook/react";

function PublicPage() {
  return (
    <main className="page-demo">
      <nav className="page-nav">
        <strong>Northstar</strong>
        <span>Documentation preview</span>
      </nav>
      <section className="page-hero">
        <div className="page-copy">
          <span>Page composition</span>
          <h1>From visual language to complete routes.</h1>
          <p>
            A page story combines real global elements, sections and states. It
            complements component stories; it never replaces them.
          </p>
          <div className="feature-actions">
            <button className="primary" type="button">
              Explore system
            </button>
          </div>
        </div>
        <div className="page-art" aria-label="Abstract gradient artwork" />
      </section>
    </main>
  );
}

const meta = {
  title: "Pages/Public Page",
  component: PublicPage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof PublicPage>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Desktop: Story = {};
export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile" } },
};
