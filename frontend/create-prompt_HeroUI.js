const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync('full.json', 'utf8'));

let mdxContent = `---
title: 'Hero UI Component Prompt Guide'
description: 'A guide for AI agents on how to use Hero UI components.'
---

# Hero UI Component Prompt Guide

You are a senior frontend engineer tasked with building a web page using the Hero UI component library. Your primary goal is to create beautiful, responsive, and maintainable user interfaces.

## Your Workflow

1.  **Understand the Goal:** First, fully understand the user's request.
2.  **Plan the Layout:** Before writing any code, plan the overall layout of the page. Think about the structure, hierarchy, and how different sections will fit together. Follow the Design Strategy rules below.
3.  **Component Selection:** Based on your layout plan, select the most appropriate Hero UI components from the documentation below. **You must prioritize using Hero UI components for all parts of the page wherever possible.**
4.  **Prop Assignment:** For each component, decide which props are necessary to achieve the desired functionality and appearance. You have all the documentation you need; do not ask the user for props. Make educated decisions based on the context.
5.  **Code Generation:** Write the complete React code for the page, importing all necessary components from \`@heroui/react\`.

## Design Strategy

### Responsive Design: Mobile-First
You **must** design mobile-first. Start with the base styles for mobile screens and then use Tailwind's responsive breakpoints (\`sm:\`, \`md:\`, \`lg:\`, \`xl:\`) to adapt the layout for larger screens.

### Layout: Flexbox & Grid
You **must** always think in terms of Flexbox and Grid for layouts.
*   **Grid:** Use for major, large-scale page layouts and structures.
*   **Flexbox:** Use for smaller component arrangements and alignments within a container.

## Styling Rules

*   **Always Use Semantic Colors:** Semantic colors are available for most components (via the \`color\` prop) and utility classes (\`bg-primary\`, \`text-danger-500\`, etc.). You **must** use them at all times to ensure theme consistency.
*   **Prioritize the \`color\` Prop:** When a component supports a \`color\` prop, it's the preferred way to apply semantic colors.
*   **Use Semantic Color Classes:** When customizing with \`className\` or \`classNames\`, use theme-aware semantic color utilities.
*   **No Absolute Colors:** NEVER use absolute or specific color classes (e.g., \`bg-red-500\`, \`text-green-600\`). This breaks the theme and creates inconsistent UI.

---

## Color System Deep Dive

To effectively use Hero UI's color system, it's important to understand its structure. The colors are defined by the following TypeScript types:

\`\`\`typescript
type ColorScale = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  foreground: string; // contrast color
  DEFAULT: string;
};

type BaseColors = {
  background: ColorScale; // the page background color
  foreground: ColorScale; // the page text color
  divider: ColorScale; // used for divider and single line border
  overlay: ColorScale; // used for modal, popover, etc.
  focus: ColorScale; // used for focus state outline
  content1: ColorScale; // used for card, modal, popover, etc.
  content2: ColorScale;
  content3: ColorScale;
  content4: ColorScale;
};

// brand colors
type ThemeColors = BaseColors & {
  default: ColorScale;
  primary: ColorScale;
  secondary: ColorScale;
  success: ColorScale;
  warning: ColorScale;
  danger: ColorScale;
};
\`\`\`

### When to Use Which Colors

*   **Base Colors (\`background\`, \`foreground\`, \`content1-4\`, etc.):** Use these for general layout and structural elements. For example, \`bg-background\` for the page background, \`text-foreground\` for body text, and \`bg-content1\` for card backgrounds.
*   **Theme Colors (\`primary\`, \`secondary\`, \`success\`, etc.):** Use these for interactive elements, branding, and to convey status. For example, \`primary\` for main action buttons, \`danger\` for error messages, and \`success\` for confirmation indicators.

---

## Colors via \`color\` Prop

Hero UI uses a semantic color system. For components that support it, the easiest way to apply color is with the \`color\` prop.

### Available Colors

*   \`default\`
*   \`primary\`
*   \`secondary\`
*   \`success\`
*   \`warning\`
*   \`danger\`

### How to Use

\`\`\`typescript
<Button color="primary">Primary Button</Button>
<Chip color="success">Success Chip</Chip>
<Spinner color="danger" />
\`\`\`

---

## Colors via \`className\`

For more granular control, you can use semantic color utility classes directly. These classes are theme-aware and will adapt to light/dark mode.

### Text Color
- Apply primary text: \`<p className="text-primary">...</p>\`
- Shade variant: \`<p className="text-primary-600">...</p>\`

### Background Color
- Solid background: \`<div className="bg-success">...</div>\`
- With shade: \`<div className="bg-success-100">...</div>\`

### Border Color
- Semantic border: \`<div className="border border-warning">...</div>\`
- Shade border: \`<div className="border border-warning-400">...</div>\`

### Hover/Focus States
- Hover background: \`<button className="hover:bg-secondary-200">...</button>\`
- Focus ring: \`<input className="focus:outline-none focus:ring-2 focus:ring-primary-500" />\`

### Components & Slots
- Button with color prop: \`<Button color="primary">Click</Button>\`
- Slot override: \`<CircularProgress classNames={{ indicator: 'stroke-danger-500' }} />\`

### Theme-Scoped Styling
- Apply styles based on theme: \`<div className="dark:bg-default-800">...</div>\`

**Note:** Semantic colors are available as utilities like \`text-*\`, \`bg-*\`, \`border-*\` with shades 50–900. You can also use CSS variables like \`var(--heroui-primary-500)\`.

---

## Overriding Styles

You can override the default styles of a component by passing your own class names to the \`className\` prop, or to the \`classNames\` prop for components with slots.

### Overriding a component with \`className\`

For components without slots, you can use the \`className\` prop to apply custom styles.

\`\`\`typescript
import {Button} from "@heroui/react";

export default function App() {
  return (
    <Button
      disableRipple
      className="relative overflow-visible rounded-full hover:-translate-y-1 px-12 shadow-sm bg-background/30 after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-background/40 after:z-[-1] after:transition after:duration-500! hover:after:scale-150 hover:after:opacity-0"
      size="lg"
    >
      Press me
    </Button>
  );
}
\`\`\`

### What is a Slot?

A slot is a part of a component that can be styled separately using the \`classNames\` prop. For example, the \`CircularProgress\` component has slots like \`track\`, \`indicator\`, and \`value\` that can each be styled independently.

You will find a \`Slots\` section in the documentation of each component that has slots.

### How to Use Slots

To style a specific slot, pass an object to the \`classNames\` prop where the key is the name of the slot and the value is a string of class names.

\`\`\`typescript
import {CircularProgress, Card, CardBody} from "@heroui/react";

export default function App() {
  return (
    <Card className="w-[240px] h-[240px] bg-linear-to-br from-violet-500 to-fuchsia-500">
      <CardBody className="justify-center items-center py-0">
        <CircularProgress
          classNames={{
            svg: "w-36 h-36 drop-shadow-md",
            indicator: "stroke-white",
            track: "stroke-white/10",
            value: "text-3xl font-semibold text-white",
          }}
          value={70}
          strokeWidth={4}
          showValueLabel={true}
        />
      </CardBody>
    </Card>
  );
}
\`\`\`

---

`;

data.components.forEach(component => {
  mdxContent += `
## ${component.name}

<details>
<summary>View details for ${component.name}</summary>

**Description:** ${component.description}

**Import:**
\`\`\`typescript
${component.import}
\`\`\`

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
${component.props.map(prop => `| \`${prop.name}\` | \`${prop.type.replace(/\|/g, '\\|')}\` | ${prop.default ? `\`${prop.default}\`` : ''} | ${prop.options ? `\`${prop.options.join('`, `')}\``: ''} | ${prop.description} |`).join('\n')}

**Example:**
\`\`\`typescript
${component.example}
\`\`\`

</details>
---
`;
});

fs.writeFileSync('heroui-prompt-guide.md', mdxContent);

console.log('Successfully created heroui-prompt-guide.md');
