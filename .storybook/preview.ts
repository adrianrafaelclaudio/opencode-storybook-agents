import type { Preview } from "@storybook/react";
import "../playground/styles.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: { expanded: true },
    backgrounds: {
      default: "Canvas",
      values: [
        { name: "Canvas", value: "#f4f0e8" },
        { name: "Night", value: "#101827" },
      ],
    },
    viewport: {
      viewports: {
        mobile: {
          name: "Mobile 390",
          styles: { width: "390px", height: "844px" },
          type: "mobile",
        },
        desktop: {
          name: "Desktop 1440",
          styles: { width: "1440px", height: "900px" },
          type: "desktop",
        },
      },
    },
    options: {
      storySort: { order: ["Foundations", "Components", "Pages"] },
    },
  },
};

export default preview;
