---
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
5.  **Code Generation:** Write the complete React code for the page, importing all necessary components from `@heroui/react`.

## Design Strategy

### Responsive Design: Mobile-First
You **must** design mobile-first. Start with the base styles for mobile screens and then use Tailwind's responsive breakpoints (`sm:`, `md:`, `lg:`, `xl:`) to adapt the layout for larger screens.

### Layout: Flexbox & Grid
You **must** always think in terms of Flexbox and Grid for layouts.
*   **Grid:** Use for major, large-scale page layouts and structures.
*   **Flexbox:** Use for smaller component arrangements and alignments within a container.

## Styling Rules

*   **Always Use Semantic Colors:** Semantic colors are available for most components (via the `color` prop) and utility classes (`bg-primary`, `text-danger-500`, etc.). You **must** use them at all times to ensure theme consistency.
*   **Prioritize the `color` Prop:** When a component supports a `color` prop, it's the preferred way to apply semantic colors.
*   **Use Semantic Color Classes:** When customizing with `className` or `classNames`, use theme-aware semantic color utilities.
*   **No Absolute Colors:** NEVER use absolute or specific color classes (e.g., `bg-red-500`, `text-green-600`). This breaks the theme and creates inconsistent UI.

---

## Color System Deep Dive

To effectively use Hero UI's color system, it's important to understand its structure. The colors are defined by the following TypeScript types:

```typescript
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
```

### When to Use Which Colors

*   **Base Colors (`background`, `foreground`, `content1-4`, etc.):** Use these for general layout and structural elements. For example, `bg-background` for the page background, `text-foreground` for body text, and `bg-content1` for card backgrounds.
*   **Theme Colors (`primary`, `secondary`, `success`, etc.):** Use these for interactive elements, branding, and to convey status. For example, `primary` for main action buttons, `danger` for error messages, and `success` for confirmation indicators.

---

## Colors via `color` Prop

Hero UI uses a semantic color system. For components that support it, the easiest way to apply color is with the `color` prop.

### Available Colors

*   `default`
*   `primary`
*   `secondary`
*   `success`
*   `warning`
*   `danger`

### How to Use

```typescript
<Button color="primary">Primary Button</Button>
<Chip color="success">Success Chip</Chip>
<Spinner color="danger" />
```

---

## Colors via `className`

For more granular control, you can use semantic color utility classes directly. These classes are theme-aware and will adapt to light/dark mode.

### Text Color
- Apply primary text: `<p className="text-primary">...</p>`
- Shade variant: `<p className="text-primary-600">...</p>`

### Background Color
- Solid background: `<div className="bg-success">...</div>`
- With shade: `<div className="bg-success-100">...</div>`

### Border Color
- Semantic border: `<div className="border border-warning">...</div>`
- Shade border: `<div className="border border-warning-400">...</div>`

### Hover/Focus States
- Hover background: `<button className="hover:bg-secondary-200">...</button>`
- Focus ring: `<input className="focus:outline-none focus:ring-2 focus:ring-primary-500" />`

### Components & Slots
- Button with color prop: `<Button color="primary">Click</Button>`
- Slot override: `<CircularProgress classNames={{ indicator: 'stroke-danger-500' }} />`

### Theme-Scoped Styling
- Apply styles based on theme: `<div className="dark:bg-default-800">...</div>`

**Note:** Semantic colors are available as utilities for most of the tailwind and heroUI components. So you must always use sematic colors. Never use tailwind native colors.

---

## Overriding Styles

You can override the default styles of a component by passing your own class names to the `className` prop, or to the `classNames` prop for components with slots.

### Overriding a component with `className`

For components without slots, you can use the `className` prop to apply custom styles.

```typescript
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
```

### What is a Slot?

A slot is a part of a component that can be styled separately using the `classNames` prop. For example, the `CircularProgress` component has slots like `track`, `indicator`, and `value` that can each be styled independently.

You will find a `Slots` section in the documentation of each component that has slots.

### How to Use Slots

To style a specific slot, pass an object to the `classNames` prop where the key is the name of the slot and the value is a string of class names.

```typescript
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
```

---


## Accordion

<details>
<summary>View details for Accordion</summary>

**Description:** Accordions display a list of high-level options that can expand/collapse to reveal more information.

**Import:**
```typescript
import { Accordion, AccordionItem } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode[]` |  |  | The accordion items. Usually AccordionItem components. |
| `variant` | `string` | `light` | `light`, `bordered`, `shadow`, `splitted` | The accordion appearance style. |
| `color` | `string` | `default` | `default`, `primary`, `secondary`, `success`, `warning`, `danger` | The accordion color theme. |
| `size` | `string` | `md` | `sm`, `md`, `lg` | The accordion size. |
| `fullWidth` | `boolean` | `true` |  | Whether the accordion should take the full width of its parent. |
| `selectionMode` | `string` | `single` | `single`, `multiple` | The selection mode of the accordion. |
| `isCompact` | `boolean` | `false` |  | Whether the accordion should be compact. |
| `isDisabled` | `boolean` | `false` |  | Whether the accordion is disabled. |
| `disableAnimation` | `boolean` | `false` |  | Whether the accordion should be animated. |
| `keepContentMounted` | `boolean` | `true` |  | Whether the accordion content should be kept mounted when collapsed. |
| `classNames` | `object` |  |  | Allows to set custom class names for the accordion slots. |

**Example:**
```typescript
export default function App() {
  return (
    <Accordion>
      <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
        <p>Content for Accordion 1</p>
      </AccordionItem>
      <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
        <p>Content for Accordion 2</p>
      </AccordionItem>
      <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
        <p>Content for Accordion 3</p>
      </AccordionItem>
    </Accordion>
  );
}
```

</details>
---

## AccordionItem

<details>
<summary>View details for AccordionItem</summary>

**Description:** An item within an Accordion component.

**Import:**
```typescript
import { AccordionItem } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` |  |  | The content to display when the accordion item is expanded. |
| `title` | `ReactNode` |  |  | The title of the accordion item. |
| `subtitle` | `ReactNode` |  |  | The subtitle of the accordion item. |
| `startContent` | `ReactNode` |  |  | The content to display before the title. |
| `indicator` | `ReactNode` |  |  | The indicator to display when the accordion item is expanded/collapsed. |
| `isDisabled` | `boolean` | `false` |  | Whether the accordion item is disabled. |
| `isCompact` | `boolean` | `false` |  | Whether the accordion item should be compact. |
| `hideIndicator` | `boolean` | `false` |  | Whether to hide the indicator. |
| `disableAnimation` | `boolean` | `false` |  | Whether the accordion item should be animated. |
| `keepContentMounted` | `boolean` | `true` |  | Whether the accordion item content should be kept mounted when collapsed. |
| `classNames` | `object` |  |  | Allows to set custom class names for the accordion item slots. |

**Example:**
```typescript
export default function App() {
  return (
    <Accordion>
      <AccordionItem
        key="1"
        aria-label="Custom Accordion"
        title="Custom Accordion"
        subtitle="With custom indicator"
        startContent={<Icon icon="lucide:star" className="text-primary" />}
        indicator={<Icon icon="lucide:chevron-down" />}
      >
        <p>Custom accordion content with icon indicators</p>
      </AccordionItem>
    </Accordion>
  );
}
```

</details>
---

## Alert

<details>
<summary>View details for Alert</summary>

**Description:** Alerts are temporary notifications that provide concise feedback about an action or event.

**Import:**
```typescript
import { Alert } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `title` | `ReactNode` |  |  | The alert title |
| `icon` | `ReactNode` |  |  | The alert icon - overrides the default icon |
| `description` | `ReactNode` |  |  | The alert description |
| `color` | `string` | `default` | `default`, `primary`, `secondary`, `success`, `warning`, `danger` | The alert color theme |
| `variant` | `string` | `flat` | `solid`, `bordered`, `flat`, `faded` | The alert variant |
| `radius` | `string` | `md` | `none`, `sm`, `md`, `lg`, `full` | The alert border radius |
| `startContent` | `ReactNode` |  |  | The alert start content |
| `endContent` | `ReactNode` |  |  | The alert end content |
| `isVisible` | `boolean` |  |  | Whether the alert is visible |
| `isClosable` | `boolean` | `false` |  | Whether the alert can be closed |
| `hideIcon` | `boolean` | `false` |  | Whether the icon is hidden |
| `hideIconWrapper` | `boolean` | `false` |  | Whether the icon wrapper is hidden |
| `closeButtonProps` | `ButtonProps` |  |  | Props for the close button |
| `onClose` | `() => void` |  |  | Handler called when the close button is clicked |
| `onVisibleChange` | `(isVisible: boolean) => void` |  |  | Handler called when the alert visibility changes |

**Example:**
```typescript
export default function App() {
  const title = "This is an alert";
  const description = "Thanks for subscribing to our newsletter!";

  return (
    <div className="flex items-center justify-center w-full">
      <Alert
        color="success"
        title={title}
        description={description}
        isClosable
        onClose={() => console.log("Alert closed")}
      />
    </div>
  );
}
```

</details>
---

## Autocomplete

<details>
<summary>View details for Autocomplete</summary>

**Description:** Autocomplete is a normal text input enhanced by a panel of suggested options.

**Import:**
```typescript
import { Autocomplete, AutocompleteItem } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode[]` |  |  | The autocomplete items. Usually AutocompleteItem components. |
| `defaultItems` | `T[]` |  |  | The default items to display in the autocomplete menu. |
| `items` | `T[]` |  |  | The controlled items to display in the autocomplete menu. |
| `label` | `ReactNode` |  |  | The content to display as the label. |
| `description` | `ReactNode` |  |  | A description for the autocomplete. |
| `errorMessage` | `ReactNode` |  |  | An error message for the autocomplete. |
| `placeholder` | `string` |  |  | The placeholder text to display in the input. |
| `variant` | `string` | `flat` | `flat`, `bordered`, `underlined`, `faded` | The variant of the autocomplete. |
| `color` | `string` | `default` | `default`, `primary`, `secondary`, `success`, `warning`, `danger` | The color of the autocomplete. |
| `size` | `string` | `md` | `sm`, `md`, `lg` | The size of the autocomplete. |
| `radius` | `string` | `md` | `none`, `sm`, `md`, `lg`, `full` | The border radius of the autocomplete. |
| `defaultSelectedKey` | `Key` |  |  | The key of the default selected item (uncontrolled). |
| `selectedKey` | `Key` |  |  | The key of the selected item (controlled). |
| `defaultInputValue` | `string` |  |  | The default value of the input (uncontrolled). |
| `inputValue` | `string` |  |  | The value of the input (controlled). |
| `isDisabled` | `boolean` | `false` |  | Whether the autocomplete is disabled. |
| `isRequired` | `boolean` | `false` |  | Whether the autocomplete is required. |
| `isReadOnly` | `boolean` | `false` |  | Whether the autocomplete is read-only. |
| `isInvalid` | `boolean` | `false` |  | Whether the autocomplete is invalid. |
| `disableAnimation` | `boolean` | `false` |  | Whether to disable the animation. |
| `disableSelectorIconRotation` | `boolean` | `false` |  | Whether to disable the rotation of the selector icon. |
| `classNames` | `object` |  |  | Allows to set custom class names for the autocomplete slots. |
| `onSelectionChange` | `(key: Key) => void` |  |  | Handler that is called when the selection changes. |
| `onInputChange` | `(value: string) => void` |  |  | Handler that is called when the input value changes. |
| `onOpenChange` | `(isOpen: boolean) => void` |  |  | Handler that is called when the open state changes. |

**Example:**
```typescript
export default function App() {
  const animals = [
    { label: "Cat", value: "cat" },
    { label: "Dog", value: "dog" },
    { label: "Elephant", value: "elephant" },
    { label: "Lion", value: "lion" },
    { label: "Tiger", value: "tiger" },
    { label: "Giraffe", value: "giraffe" },
    { label: "Dolphin", value: "dolphin" },
    { label: "Penguin", value: "penguin" },
    { label: "Zebra", value: "zebra" },
    { label: "Shark", value: "shark" },
  ];

  return (
    <Autocomplete
      label="Favorite Animal"
      placeholder="Search an animal"
      defaultItems={animals}
      className="max-w-xs"
    >
      {(animal) => <AutocompleteItem key={animal.value}>{animal.label}</AutocompleteItem>}
    </Autocomplete>
  );
}
```

</details>
---

## AutocompleteItem

<details>
<summary>View details for AutocompleteItem</summary>

**Description:** An item within an Autocomplete component.

**Import:**
```typescript
import { AutocompleteItem } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` |  |  | The content of the autocomplete item. |
| `key` | `Key` |  |  | A unique key for the item. |
| `textValue` | `string` |  |  | A string representation of the item's contents, used for filtering. |
| `isDisabled` | `boolean` | `false` |  | Whether the item is disabled. |
| `isReadOnly` | `boolean` | `false` |  | Whether the item is read-only. |
| `classNames` | `object` |  |  | Allows to set custom class names for the autocomplete item slots. |

**Example:**
```typescript
export default function App() {
  const animals = [
    { label: "Cat", value: "cat", description: "A small domesticated carnivorous mammal" },
    { label: "Dog", value: "dog", description: "A domesticated carnivorous mammal" },
    { label: "Elephant", value: "elephant", description: "A large herbivorous mammal with a trunk" }
  ];

  return (
    <Autocomplete
      label="Favorite Animal"
      placeholder="Search an animal"
      defaultItems={animals}
      className="max-w-xs"
    >
      {(animal) => (
        <AutocompleteItem key={animal.value} textValue={animal.label}>
          <div className="flex flex-col">
            <span>{animal.label}</span>
            <span className="text-tiny text-default-400">{animal.description}</span>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}
```

</details>
---

## AutocompleteSection

<details>
<summary>View details for AutocompleteSection</summary>

**Description:** A section within an Autocomplete component to group related items.

**Import:**
```typescript
import { AutocompleteSection, AutocompleteItem } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode[]` |  |  | The autocomplete items within this section. Usually AutocompleteItem components. |
| `title` | `ReactNode` |  |  | The title of the section. |
| `classNames` | `object` |  |  | Allows to set custom class names for the autocomplete section slots. |

**Example:**
```typescript
export default function App() {
  const fruits = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Orange", value: "orange" }
  ];

  const vegetables = [
    { label: "Carrot", value: "carrot" },
    { label: "Broccoli", value: "broccoli" },
    { label: "Spinach", value: "spinach" }
  ];

  return (
    <Autocomplete
      label="Favorite Food"
      placeholder="Search a food"
      className="max-w-xs"
    >
      <AutocompleteSection title="Fruits">
        {fruits.map((fruit) => (
          <AutocompleteItem key={fruit.value}>{fruit.label}</AutocompleteItem>
        ))}
      </AutocompleteSection>
      <AutocompleteSection title="Vegetables">
        {vegetables.map((vegetable) => (
          <AutocompleteItem key={vegetable.value}>{vegetable.label}</AutocompleteItem>
        ))}
      </AutocompleteSection>
    </Autocomplete>
  );
}
```

</details>
---

## Avatar

<details>
<summary>View details for Avatar</summary>

**Description:** Avatars are used to represent a user, and display the profile picture, initials or fallback icon.

**Import:**
```typescript
import { Avatar } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `name` | `string` |  |  | The name of the user. Used for the initials and aria-label. |
| `src` | `string` |  |  | The image source URL. |
| `icon` | `ReactNode` |  |  | The icon to display when no src or name is provided. |
| `alt` | `string` |  |  | The alt text for the avatar image. |
| `color` | `string` | `default` | `default`, `primary`, `secondary`, `success`, `warning`, `danger` | The color of the avatar. |
| `radius` | `string` | `full` | `none`, `sm`, `md`, `lg`, `full` | The border radius of the avatar. |
| `size` | `string` | `md` | `sm`, `md`, `lg` | The size of the avatar. |
| `isBordered` | `boolean` | `false` |  | Whether the avatar has a border. |
| `isDisabled` | `boolean` | `false` |  | Whether the avatar is disabled. |
| `isInGroup` | `boolean` | `false` |  | Whether the avatar is part of a group. |
| `isFocusable` | `boolean` | `false` |  | Whether the avatar can be focused. |
| `showFallback` | `boolean` | `false` |  | Whether to show the fallback icon even if the image is provided. |
| `fallback` | `ReactNode` |  |  | The fallback icon to display when no src or name is provided. |
| `imgProps` | `ImgHTMLAttributes<HTMLImageElement>` |  |  | Props to pass to the image element. |
| `classNames` | `object` |  |  | Allows to set custom class names for the avatar slots. |

**Example:**
```typescript
export default function App() {
  return (
    <div className="flex gap-4">
      <Avatar
        name="Jane Doe"
        src="https://img.heroui.chat/image/avatar?w=150&h=150&u=1"
        color="primary"
        isBordered
      />
      <Avatar
        name="John Smith"
        color="secondary"
        isBordered
      />
      <Avatar
        icon={<Icon icon="lucide:user" />}
        color="warning"
        isBordered
      />
    </div>
  );
}
```

</details>
---

## AvatarGroup

<details>
<summary>View details for AvatarGroup</summary>

**Description:** A wrapper component for Avatar to display a group of avatars.

**Import:**
```typescript
import { AvatarGroup, Avatar } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode[]` |  |  | The avatars to display. Usually Avatar components. |
| `max` | `number` |  |  | The maximum number of avatars to display. |
| `total` | `number` |  |  | The total number of avatars. |
| `size` | `string` | `md` | `sm`, `md`, `lg` | The size of the avatars. |
| `color` | `string` | `default` | `default`, `primary`, `secondary`, `success`, `warning`, `danger` | The color of the avatars. |
| `radius` | `string` | `full` | `none`, `sm`, `md`, `lg`, `full` | The border radius of the avatars. |
| `isBordered` | `boolean` | `false` |  | Whether the avatars have borders. |
| `isDisabled` | `boolean` | `false` |  | Whether the avatars are disabled. |
| `isGrid` | `boolean` | `false` |  | Whether the avatars are displayed in a grid. |
| `renderCount` | `(count: number) => ReactNode` |  |  | A function to render the count of additional avatars. |

**Example:**
```typescript
export default function App() {
  return (
    <AvatarGroup isBordered max={3} total={10}>
      <Avatar src="https://img.heroui.chat/image/avatar?w=150&h=150&u=1" />
      <Avatar src="https://img.heroui.chat/image/avatar?w=150&h=150&u=2" />
      <Avatar src="https://img.heroui.chat/image/avatar?w=150&h=150&u=3" />
      <Avatar src="https://img.heroui.chat/image/avatar?w=150&h=150&u=4" />
      <Avatar src="https://img.heroui.chat/image/avatar?w=150&h=150&u=5" />
    </AvatarGroup>
  );
}
```

</details>
---

## Badge

<details>
<summary>View details for Badge</summary>

**Description:** Badges are used to highlight an item's status for quick recognition.

**Import:**
```typescript
import { Badge } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` |  |  | The content of the badge. |
| `content` | `ReactNode` |  |  | The content of the badge when used as a wrapper. |
| `color` | `string` | `default` | `default`, `primary`, `secondary`, `success`, `warning`, `danger` | The color of the badge. |
| `variant` | `string` | `solid` | `solid`, `bordered`, `light`, `flat`, `faded`, `shadow` | The variant of the badge. |
| `size` | `string` | `md` | `sm`, `md`, `lg` | The size of the badge. |
| `radius` | `string` | `full` | `none`, `sm`, `md`, `lg`, `full` | The border radius of the badge. |
| `placement` | `string` | `top-right` | `top-right`, `top-left`, `bottom-right`, `bottom-left` | The placement of the badge when used as a wrapper. |
| `isDot` | `boolean` | `false` |  | Whether the badge is a dot. |
| `disableOutline` | `boolean` | `false` |  | Whether to disable the outline of the badge. |
| `disableAnimation` | `boolean` | `false` |  | Whether to disable the animation of the badge. |
| `isInvisible` | `boolean` | `false` |  | Whether the badge is invisible. |
| `showOutline` | `boolean` | `false` |  | Whether to show the outline of the badge. |
| `classNames` | `object` |  |  | Allows to set custom class names for the badge slots. |

**Example:**
```typescript
export default function App() {
  return (
    <div className="flex flex-col gap-4">
      <Badge content="5" color="primary">
        <Button>Notifications</Button>
      </Badge>

      <Badge content="New" color="danger" variant="flat">
        <Card>
          <CardBody>
            <p>This card has a badge</p>
          </CardBody>
        </Card>
      </Badge>

      <div className="flex gap-4">
        <Badge color="primary" variant="solid">Primary</Badge>
        <Badge color="secondary" variant="flat">Secondary</Badge>
        <Badge color="success" variant="bordered">Success</Badge>
        <Badge color="warning" variant="light">Warning</Badge>
        <Badge color="danger" isDot>Danger Dot</Badge>
      </div>
    </div>
  );
}
```

</details>
---

## BreadcrumbItem

<details>
<summary>View details for BreadcrumbItem</summary>

**Description:** An item within a Breadcrumbs component.

**Import:**
```typescript
import { BreadcrumbItem } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` |  |  | The content of the breadcrumb item. |
| `href` | `string` |  |  | The URL to navigate to when the breadcrumb item is clicked. |
| `startContent` | `ReactNode` |  |  | The content to display before the breadcrumb item's text. |
| `endContent` | `ReactNode` |  |  | The content to display after the breadcrumb item's text. |
| `isDisabled` | `boolean` | `false` |  | Whether the breadcrumb item is disabled. |
| `isCurrent` | `boolean` | `false` |  | Whether the breadcrumb item represents the current page. |
| `classNames` | `object` |  |  | Allows to set custom class names for the breadcrumb item slots. |

**Example:**
```typescript
export default function App() {
  return (
    <Breadcrumbs>
      <BreadcrumbItem
        href="#"
        startContent={<Icon icon="lucide:home" />}
      >
        Home
      </BreadcrumbItem>
      <BreadcrumbItem href="#">
        Products
      </BreadcrumbItem>
      <BreadcrumbItem
        href="#"
        startContent={<Icon icon="lucide:laptop" />}
      >
        Electronics
      </BreadcrumbItem>
      <BreadcrumbItem
        isCurrent
        startContent={<Icon icon="lucide:smartphone" />}
      >
        Smartphones
      </BreadcrumbItem>
    </Breadcrumbs>
  );
}
```

</details>
---

## Breadcrumbs

<details>
<summary>View details for Breadcrumbs</summary>

**Description:** Breadcrumbs display a hierarchy of links to the current page or resource in an application.

**Import:**
```typescript
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode[]` |  |  | The breadcrumb items. Usually BreadcrumbItem components. |
| `color` | `string` | `foreground` | `foreground`, `primary`, `secondary`, `success`, `warning`, `danger` | The color of the breadcrumbs. |
| `size` | `string` | `md` | `sm`, `md`, `lg` | The size of the breadcrumbs. |
| `radius` | `string` | `md` | `none`, `sm`, `md`, `lg`, `full` | The border radius of the breadcrumbs. |
| `variant` | `string` | `solid` | `solid`, `bordered`, `light` | The variant of the breadcrumbs. |
| `separator` | `ReactNode` |  |  | The separator between breadcrumb items. |
| `itemClasses` | `string` |  |  | The classes to apply to each breadcrumb item. |
| `isDisabled` | `boolean` | `false` |  | Whether the breadcrumbs are disabled. |
| `underline` | `string` | `none` | `none`, `hover`, `always`, `active`, `focus` | The underline style of the breadcrumb items. |
| `classNames` | `object` |  |  | Allows to set custom class names for the breadcrumbs slots. |

**Example:**
```typescript
export default function App() {
  return (
    <Breadcrumbs>
      <BreadcrumbItem href="#">Home</BreadcrumbItem>
      <BreadcrumbItem href="#">Products</BreadcrumbItem>
      <BreadcrumbItem href="#">Electronics</BreadcrumbItem>
      <BreadcrumbItem>Smartphones</BreadcrumbItem>
    </Breadcrumbs>
  );
}
```

</details>
---

## Button

<details>
<summary>View details for Button</summary>

**Description:** Buttons allow users to perform actions and choose with a single tap.

**Import:**
```typescript
import { Button } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` |  |  | The content of the button. |
| `color` | `string` | `default` | `default`, `primary`, `secondary`, `success`, `warning`, `danger` | The color of the button. |
| `variant` | `string` | `solid` | `solid`, `bordered`, `light`, `flat`, `faded`, `shadow`, `ghost` | The variant of the button. |
| `size` | `string` | `md` | `sm`, `md`, `lg` | The size of the button. |
| `radius` | `string` | `md` | `none`, `sm`, `md`, `lg`, `full` | The border radius of the button. |
| `startContent` | `ReactNode` |  |  | The content to display before the button's text. |
| `endContent` | `ReactNode` |  |  | The content to display after the button's text. |
| `spinner` | `ReactNode` |  |  | The spinner to display when the button is loading. |
| `spinnerPlacement` | `string` | `start` | `start`, `end` | The placement of the spinner. |
| `fullWidth` | `boolean` | `false` |  | Whether the button should take the full width of its parent. |
| `isLoading` | `boolean` | `false` |  | Whether the button is in a loading state. |
| `isIconOnly` | `boolean` | `false` |  | Whether the button only contains an icon. |
| `isDisabled` | `boolean` | `false` |  | Whether the button is disabled. |
| `disableRipple` | `boolean` | `false` |  | Whether to disable the ripple effect. |
| `disableAnimation` | `boolean` | `false` |  | Whether to disable the animation. |
| `onPress` | `(e: PressEvent) => void` |  |  | Handler called when the press is released over the target. |
| `onPressStart` | `(e: PressEvent) => void` |  |  | Handler called when a press interaction starts. |
| `onPressEnd` | `(e: PressEvent) => void` |  |  | Handler called when a press interaction ends. |
| `onPressChange` | `(isPressed: boolean) => void` |  |  | Handler called when the press state changes. |
| `onPressUp` | `(e: PressEvent) => void` |  |  | Handler called when a press is released over the target. |
| `onKeyDown` | `(e: KeyboardEvent) => void` |  |  | Handler called when a key is pressed. |
| `onKeyUp` | `(e: KeyboardEvent) => void` |  |  | Handler called when a key is released. |
| `classNames` | `object` |  |  | Allows to set custom class names for the button slots. |

**Example:**
```typescript
export default function App() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button color="primary">Primary</Button>
      <Button color="secondary" variant="bordered">Secondary</Button>
      <Button color="success" variant="flat">Success</Button>
      <Button color="warning" variant="light">Warning</Button>
      <Button color="danger" variant="shadow">Danger</Button>
      <Button
        color="primary"
        startContent={<Icon icon="lucide:mail" />}
        endContent={<Icon icon="lucide:arrow-right" />}
      >
        Send Email
      </Button>
      <Button
        isLoading
        color="secondary"
        spinner={<Spinner size="sm" color="current" />}
      >
        Loading
      </Button>
      <Button isIconOnly color="primary" aria-label="Like">
        <Icon icon="lucide:heart" />
      </Button>
    </div>
  );
}
```

</details>
---

## ButtonGroup

<details>
<summary>View details for ButtonGroup</summary>

**Description:** ButtonGroup is a wrapper component for Button to display a group of buttons.

**Import:**
```typescript
import { ButtonGroup, Button } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode[]` |  |  | The buttons to display. Usually Button components. |
| `variant` | `string` | `solid` | `solid`, `bordered`, `light`, `flat`, `faded`, `shadow`, `ghost` | The variant of the buttons. |
| `color` | `string` | `default` | `default`, `primary`, `secondary`, `success`, `warning`, `danger` | The color of the buttons. |
| `size` | `string` | `md` | `sm`, `md`, `lg` | The size of the buttons. |
| `radius` | `string` | `md` | `none`, `sm`, `md`, `lg`, `full` | The border radius of the buttons. |
| `isDisabled` | `boolean` | `false` |  | Whether the buttons are disabled. |
| `disableRipple` | `boolean` | `false` |  | Whether to disable the ripple effect. |
| `disableAnimation` | `boolean` | `false` |  | Whether to disable the animation. |
| `isIconOnly` | `boolean` | `false` |  | Whether the buttons only contain icons. |
| `fullWidth` | `boolean` | `false` |  | Whether the button group should take the full width of its parent. |

**Example:**
```typescript
export default function App() {
  return (
    <div className="flex flex-col gap-4">
      <ButtonGroup>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>

      <ButtonGroup variant="flat" color="secondary">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>

      <ButtonGroup isIconOnly variant="bordered">
        <Button aria-label="First page">
          <Icon icon="lucide:chevron-left" />
        </Button>
        <Button aria-label="Previous page">
          <Icon icon="lucide:chevron-left" />
        </Button>
        <Button aria-label="Next page">
          <Icon icon="lucide:chevron-right" />
        </Button>
        <Button aria-label="Last page">
          <Icon icon="lucide:chevron-right" />
        </Button>
      </ButtonGroup>
    </div>
  );
}
```

</details>
---

## Calendar

<details>
<summary>View details for Calendar</summary>

**Description:** Calendar allows users to select a date.

**Import:**
```typescript
import { Calendar } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `aria-label` | `string` |  |  | The accessible label for the calendar. |
| `value` | `CalendarDate` |  |  | The current value (controlled). |
| `defaultValue` | `CalendarDate` |  |  | The default value (uncontrolled). |
| `minValue` | `CalendarDate` |  |  | The minimum allowed date. |
| `maxValue` | `CalendarDate` |  |  | The maximum allowed date. |
| `isDisabled` | `boolean` | `false` |  | Whether the calendar is disabled. |
| `isReadOnly` | `boolean` | `false` |  | Whether the calendar is read-only. |
| `isDateUnavailable` | `(date: CalendarDate) => boolean` |  |  | Function that returns whether a date is unavailable. |
| `locale` | `string` |  |  | The locale to use for formatting dates. |
| `visibleMonths` | `number` | `1` |  | The number of months to display at once. |
| `pageBehavior` | `string` | `visible` | `visible`, `single` | The behavior when navigating between pages. |
| `fixedWeeks` | `boolean` | `false` |  | Whether to always display 6 weeks per month. |
| `calendarProps` | `object` |  |  | Additional props to pass to the calendar. |
| `classNames` | `object` |  |  | Allows to set custom class names for the calendar slots. |
| `onChange` | `(date: CalendarDate) => void` |  |  | Handler that is called when the value changes. |

**Example:**
```typescript
import { parseDate } from "@internationalized/date";

export default function App() {
  const [date, setDate] = React.useState(parseDate("2023-11-15"));

  return (
    <Calendar
      aria-label="Select a date"
      value={date}
      onChange={setDate}
      className="max-w-sm"
    />
  );
}
```

</details>
---

## Card

<details>
<summary>View details for Card</summary>

**Description:** Card is a container for text, photos, and actions in the context of a single subject.

**Import:**
```typescript
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode \| ReactNode[]` |  |  | Usually the Card parts, 'CardHeader', 'CardBody' and 'CardFooter'. |
| `shadow` | `string` | `md` | `none`, `sm`, `md`, `lg` | The card shadow. |
| `radius` | `string` | `lg` | `none`, `sm`, `md`, `lg` | The card border radius. |
| `fullWidth` | `boolean` | `false` |  | Whether the card should take the full width of its parent. |
| `isHoverable` | `boolean` | `false` |  | Whether the card should change the background on hover. |
| `isPressable` | `boolean` | `false` |  | Whether the card should allow to be pressed. |
| `isBlurred` | `boolean` | `false` |  | Whether the card background should be blurred. |
| `isFooterBlurred` | `boolean` | `false` |  | Whether the card footer background should be blurred. |
| `isDisabled` | `boolean` | `false` |  | Whether the card should be disabled. The press events will be ignored. |
| `disableAnimation` | `boolean` | `false` |  | Whether to disable the animation. |
| `disableRipple` | `boolean` | `false` |  | Whether to disable ripple effect. Only when 'isPressable' is true. |
| `allowTextSelectionOnPress` | `boolean` | `false` |  | Whether to allow text selection on pressing. Only when 'isPressable' is true. |
| `classNames` | `object` |  |  | Allows to set custom class names for the card slots. |
| `onPress` | `(e: PressEvent) => void` |  |  | Handler that is called when the press is released over the target. |
| `onPressStart` | `(e: PressEvent) => void` |  |  | Handler that is called when a press interaction starts. |
| `onPressEnd` | `(e: PressEvent) => void` |  |  | Handler that is called when a press interaction ends. |
| `onPressChange` | `(isPressed: boolean) => void` |  |  | Handler that is called when the press state changes. |
| `onPressUp` | `(e: PressEvent) => void` |  |  | Handler that is called when a press is released over the target. |

**Example:**
```typescript
export default function App() {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardBody>
          <p>A simple card with body content.</p>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h4 className="text-lg font-semibold">Card Title</h4>
        </CardHeader>
        <CardBody>
          <p>This card has a header, body, and footer.</p>
        </CardBody>
        <CardFooter>
          <p className="text-sm text-default-500">Footer content</p>
        </CardFooter>
      </Card>

      <Card isPressable isHoverable>
        <CardHeader>
          <h4 className="text-lg font-semibold">Interactive Card</h4>
        </CardHeader>
        <CardBody>
          <p>This card is pressable and hoverable.</p>
        </CardBody>
        <CardFooter>
          <Button size="sm">Action</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
```

</details>
---

## Checkbox

<details>
<summary>View details for Checkbox</summary>

**Description:** Checkboxes allow users to select multiple items from a list of individual items, or to mark one individual item as selected.

**Import:**
```typescript
import { Checkbox } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` |  |  | The label of the checkbox. |
| `icon` | `CheckboxIconProps` |  |  | The icon to be displayed when the checkbox is checked. |
| `value` | `string` |  |  | The value of the checkbox element, used when submitting an HTML form. |
| `name` | `string` |  |  | The name of the checkbox element, used when submitting an HTML form. |
| `size` | `string` | `md` | `sm`, `md`, `lg` | The size of the checkbox. |
| `color` | `string` | `primary` | `default`, `primary`, `secondary`, `success`, `warning`, `danger` | The color of the checkbox. |
| `radius` | `string` |  | `none`, `sm`, `md`, `lg`, `full` | The radius of the checkbox. |
| `lineThrough` | `boolean` | `false` |  | Whether the label should be crossed out. |
| `isSelected` | `boolean` |  |  | Whether the element should be selected (controlled). |
| `defaultSelected` | `boolean` |  |  | Whether the element should be selected (uncontrolled). |
| `isRequired` | `boolean` | `false` |  | Whether user checkbox is required on the checkbox before form submission. |
| `isReadOnly` | `boolean` |  |  | Whether the checkbox can be selected but not changed by the user. |
| `isDisabled` | `boolean` | `false` |  | Whether the checkbox is disabled. |
| `isIndeterminate` | `boolean` |  |  | Indeterminism is presentational only. The indeterminate visual representation remains regardless of user interaction. |
| `isInvalid` | `boolean` | `false` |  | Whether the checkbox is invalid. |
| `disableAnimation` | `boolean` | `false` |  | Whether the animation should be disabled. |
| `classNames` | `object` |  |  | Allows to set custom class names for the checkbox slots. |
| `onChange` | `React.ChangeEvent<HTMLInputElement>` |  |  | Handler that is called when the element's selection state changes. |
| `onValueChange` | `(isSelected: boolean) => void` |  |  | Handler that is called when the element's selection state changes. |

**Example:**
```typescript
export default function App() {
  const [isSelected, setIsSelected] = React.useState(false);
  const [groupSelected, setGroupSelected] = React.useState(["javascript"]);

  return (
    <div className="flex flex-col gap-4">
      <Checkbox isSelected={isSelected} onValueChange={setIsSelected}>
        Subscribe to newsletter
      </Checkbox>
      <p className="text-default-500">Selected: {isSelected ? "true" : "false"}</p>

      <div className="flex flex-col gap-2">
        <Checkbox
          color="primary"
          isSelected={groupSelected.includes("javascript")}
          onValueChange={() => {
            if (groupSelected.includes("javascript")) {
              setGroupSelected(groupSelected.filter(item => item !== "javascript"));
            } else {
              setGroupSelected([...groupSelected, "javascript"]);
            }
          }}
        >
          JavaScript
        </Checkbox>
        <Checkbox
          color="secondary"
          isSelected={groupSelected.includes("typescript")}
          onValueChange={() => {
            if (groupSelected.includes("typescript")) {
              setGroupSelected(groupSelected.filter(item => item !== "typescript"));
            } else {
              setGroupSelected([...groupSelected, "typescript"]);
            }
          }}
        >
          TypeScript
        </Checkbox>
        <Checkbox
          color="success"
          isSelected={groupSelected.includes("react")}
          onValueChange={() => {
            if (groupSelected.includes("react")) {
              setGroupSelected(groupSelected.filter(item => item !== "react"));
            } else {
              setGroupSelected([...groupSelected, "react"]);
            }
          }}
        >
          React
        </Checkbox>
      </div>
      <p className="text-default-500">Selected: {groupSelected.join(", ")}</p>
    </div>
  );
}
```

</details>
---

## CheckboxGroup

<details>
<summary>View details for CheckboxGroup</summary>

**Description:** CheckboxGroup is a wrapper component for Checkbox to display a group of checkboxes.

**Import:**
```typescript
import { CheckboxGroup, Checkbox } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode[]` |  |  | The checkboxes to display. Usually Checkbox components. |
| `label` | `ReactNode` |  |  | The content to display as the label. |
| `value` | `string[]` |  |  | The current selected values (controlled). |
| `defaultValue` | `string[]` |  |  | The default selected values (uncontrolled). |
| `name` | `string` |  |  | The name of the CheckboxGroup, used when submitting an HTML form. |
| `description` | `ReactNode` |  |  | A description for the checkbox group. |
| `errorMessage` | `ReactNode` |  |  | An error message for the checkbox group. |
| `orientation` | `string` | `vertical` | `horizontal`, `vertical` | The orientation of the checkbox group. |
| `color` | `string` | `primary` | `default`, `primary`, `secondary`, `success`, `warning`, `danger` | The color of the checkboxes. |
| `size` | `string` | `md` | `sm`, `md`, `lg` | The size of the checkboxes. |
| `radius` | `string` |  | `none`, `sm`, `md`, `lg`, `full` | The radius of the checkboxes. |
| `lineThrough` | `boolean` | `false` |  | Whether the label should be crossed out when the checkbox is checked. |
| `isRequired` | `boolean` | `false` |  | Whether at least one option must be selected. |
| `isReadOnly` | `boolean` | `false` |  | Whether the checkboxes can be selected but not changed by the user. |
| `isDisabled` | `boolean` | `false` |  | Whether the checkbox group is disabled. |
| `isInvalid` | `boolean` | `false` |  | Whether the checkbox group is invalid. |
| `disableAnimation` | `boolean` | `false` |  | Whether the animation should be disabled. |
| `classNames` | `object` |  |  | Allows to set custom class names for the checkbox group slots. |
| `onValueChange` | `(value: string[]) => void` |  |  | Handler that is called when the value changes. |

**Example:**
```typescript
export default function App() {
  const [selected, setSelected] = React.useState(["html"]);

  return (
    <div className="flex flex-col gap-3">
      <CheckboxGroup
        label="Select technologies"
        color="primary"
        value={selected}
        onValueChange={setSelected}
      >
        <Checkbox value="html">HTML</Checkbox>
        <Checkbox value="css">CSS</Checkbox>
        <Checkbox value="javascript">JavaScript</Checkbox>
        <Checkbox value="react">React</Checkbox>
        <Checkbox value="nextjs">Next.js</Checkbox>
      </CheckboxGroup>
      <p className="text-default-500">Selected: {selected.join(", ")}</p>

      <CheckboxGroup
        label="Orientation horizontal"
        orientation="horizontal"
        color="secondary"
      >
        <Checkbox value="1">Option 1</Checkbox>
        <Checkbox value="2">Option 2</Checkbox>
        <Checkbox value="3">Option 3</Checkbox>
      </CheckboxGroup>
    </div>
  );
}
```

</details>
---

## Chip

<details>
<summary>View details for Chip</summary>

**Description:** Chips are compact elements that represent an input, attribute, or action.

**Import:**
```typescript
import { Chip } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` |  |  | The content of the chip. |
| `variant` | `string` | `solid` | `solid`, `bordered`, `light`, `flat`, `faded`, `shadow`, `dot` | The variant of the chip. |
| `color` | `string` | `default` | `default`, `primary`, `secondary`, `success`, `warning`, `danger` | The color of the chip. |
| `size` | `string` | `md` | `sm`, `md`, `lg` | The size of the chip. |
| `radius` | `string` | `full` | `none`, `sm`, `md`, `lg`, `full` | The border radius of the chip. |
| `avatar` | `ReactNode` |  |  | The avatar to display before the chip's content. |
| `startContent` | `ReactNode` |  |  | The content to display before the chip's content. |
| `endContent` | `ReactNode` |  |  | The content to display after the chip's content. |
| `isDisabled` | `boolean` | `false` |  | Whether the chip is disabled. |
| `isCloseable` | `boolean` | `false` |  | Whether the chip can be closed. |
| `onClose` | `() => void` |  |  | Handler that is called when the close button is clicked. |
| `closeButton` | `ReactNode` |  |  | Custom close button to display. |
| `classNames` | `object` |  |  | Allows to set custom class names for the chip slots. |

**Example:**
```typescript
export default function App() {
  return (
    <div className="flex flex-wrap gap-4">
      <Chip>Default</Chip>
      <Chip color="primary">Primary</Chip>
      <Chip color="secondary" variant="flat">Secondary</Chip>
      <Chip color="success" variant="bordered">Success</Chip>
      <Chip color="warning" variant="light">Warning</Chip>
      <Chip color="danger" variant="dot">Danger</Chip>

      <Chip
        startContent={<Icon icon="lucide:check" />}
        variant="flat"
        color="success"
      >
        Completed
      </Chip>

      <Chip
        avatar={<Avatar name="JD" size="sm" />}
        variant="flat"
      >
        John Doe
      </Chip>

      <Chip
        onClose={() => console.log("Chip closed")}
        variant="flat"
        color="secondary"
        isCloseable
      >
        Closeable Chip
      </Chip>
    </div>
  );
}
```

</details>
---

## CircularProgress

<details>
<summary>View details for CircularProgress</summary>

**Description:** CircularProgress is used to indicate the loading state of a component or page.

**Import:**
```typescript
import { CircularProgress } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `aria-label` | `string` |  |  | The accessible label for the progress bar. |
| `classNames` | `object` |  |  | Allows to set custom class names for the progress slots. |
| `color` | `string` | `primary` | `default`, `primary`, `secondary`, `success`, `warning`, `danger` | The color of the progress bar. |
| `disableAnimation` | `boolean` | `false` |  | Whether to disable the animation. |
| `formatOptions` | `Intl.NumberFormatOptions` |  |  | The options to format the value. |
| `isIndeterminate` | `boolean` | `false` |  | Whether the progress bar is indeterminate. |
| `label` | `ReactNode` |  |  | The content to display as the label. |
| `max` | `number` | `100` |  | The maximum value of the progress bar. |
| `minValue` | `number` | `0` |  | The minimum value of the progress bar. |
| `radius` | `string` | `full` | `none`, `sm`, `md`, `lg`, `full` | The border radius of the progress bar. |
| `showValueLabel` | `boolean` | `false` |  | Whether to show the value label. |
| `size` | `string` | `md` | `sm`, `md`, `lg` | The size of the progress bar. |
| `strokeWidth` | `number` | `2` |  | The width of the progress bar stroke. |
| `value` | `number` | `0` |  | The current value of the progress bar. |
| `valueLabel` | `ReactNode` |  |  | The content to display as the value label. |

**Example:**
```typescript
export default function App() {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4">
        <CircularProgress aria-label="Loading..." />
        <CircularProgress color="secondary" aria-label="Loading..." />
        <CircularProgress color="success" aria-label="Loading..." />
        <CircularProgress color="warning" aria-label="Loading..." />
        <CircularProgress color="danger" aria-label="Loading..." />
      </div>

      <div className="flex gap-4">
        <CircularProgress
          aria-label="Loading..."
          size="lg"
          value={value}
          color="secondary"
          showValueLabel={true}
        />
        <CircularProgress
          aria-label="Loading..."
          size="lg"
          value={value}
          color="success"
          showValueLabel={true}
          valueLabel={`${value}%`}
        />
        <CircularProgress
          aria-label="Loading..."
          size="lg"
          value={value}
          color="warning"
          strokeWidth={4}
          showValueLabel={true}
        />
      </div>

      <div className="flex gap-4">
        <CircularProgress
          aria-label="Loading..."
          size="lg"
          value={value}
          color="primary"
          label="Loading..."
          showValueLabel={true}
        />
        <CircularProgress
          aria-label="Loading..."
          size="lg"
          value={value}
          color="secondary"
          label="Uploading..."
          showValueLabel={true}
          formatOptions={{ style: "unit", unit: "byte", unitDisplay: "narrow" }}
        />
      </div>
    </div>
  );
}
```

</details>
---

## Code

<details>
<summary>View details for Code</summary>

**Description:** Code is used to display inline code snippets.

**Import:**
```typescript
import { Code } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` |  |  | The content of the code snippet. |
| `color` | `string` | `default` | `default`, `primary`, `secondary`, `success`, `warning`, `danger` | The color of the code snippet. |
| `radius` | `string` | `md` | `none`, `sm`, `md`, `lg`, `full` | The border radius of the code snippet. |
| `size` | `string` | `md` | `sm`, `md`, `lg` | The size of the code snippet. |

**Example:**
```typescript
export default function App() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p>The <Code>Button</Code> component is used to trigger an action or event.</p>
      </div>

      <div className="flex flex-wrap gap-4">
        <Code color="default">npm install @heroui/react</Code>
        <Code color="primary">const [state, setState] = React.useState(false);</Code>
        <Code color="secondary">import { Button } from "@heroui/react";</Code>
        <Code color="success">git commit -m "feat: add new feature"</Code>
        <Code color="warning">console.warn("This is a warning");</Code>
        <Code color="danger">throw new Error("Something went wrong");</Code>
      </div>
    </div>
  );
}
```

</details>
---

## DateInput

<details>
<summary>View details for DateInput</summary>

**Description:** DateInput allows users to enter a date using a text field.

**Import:**
```typescript
import { DateInput } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `label` | `ReactNode` |  |  | The content to display as the label. |
| `description` | `ReactNode` |  |  | A description for the date input. |
| `errorMessage` | `ReactNode` |  |  | An error message for the date input. |
| `placeholder` | `string` |  |  | The placeholder text to display in the input. |
| `value` | `CalendarDate` |  |  | The current value (controlled). |
| `defaultValue` | `CalendarDate` |  |  | The default value (uncontrolled). |
| `minValue` | `CalendarDate` |  |  | The minimum allowed date. |
| `maxValue` | `CalendarDate` |  |  | The maximum allowed date. |
| `isDisabled` | `boolean` | `false` |  | Whether the date input is disabled. |
| `isReadOnly` | `boolean` | `false` |  | Whether the date input is read-only. |
| `isRequired` | `boolean` | `false` |  | Whether the date input is required. |
| `isInvalid` | `boolean` | `false` |  | Whether the date input is invalid. |
| `variant` | `string` | `flat` | `flat`, `bordered`, `underlined`, `faded` | The variant of the date input. |
| `color` | `string` | `default` | `default`, `primary`, `secondary`, `success`, `warning`, `danger` | The color of the date input. |
| `size` | `string` | `md` | `sm`, `md`, `lg` | The size of the date input. |
| `radius` | `string` | `md` | `none`, `sm`, `md`, `lg`, `full` | The border radius of the date input. |
| `classNames` | `object` |  |  | Allows to set custom class names for the date input slots. |
| `onChange` | `(date: CalendarDate) => void` |  |  | Handler that is called when the value changes. |

**Example:**
```typescript
import { parseDate } from "@internationalized/date";

export default function App() {
  const [date, setDate] = React.useState(parseDate("2023-11-15"));

  return (
    <DateInput
      label="Event Date"
      placeholder="Enter a date"
      value={date}
      onChange={setDate}
      className="max-w-xs"
    />
  );
}
```

</details>
---

## DatePicker

<details>
<summary>View details for DatePicker</summary>

**Description:** DatePicker combines a date input and a calendar popover to allow users to enter or select a date.

**Import:**
```typescript
import { DatePicker } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `label` | `ReactNode` |  |  | The content to display as the label. |
| `description` | `ReactNode` |  |  | A description for the date picker. |
| `errorMessage` | `ReactNode` |  |  | An error message for the date picker. |
| `placeholder` | `string` |  |  | The placeholder text to display in the input. |
| `value` | `CalendarDate` |  |  | The current value (controlled). |
| `defaultValue` | `CalendarDate` |  |  | The default value (uncontrolled). |
| `minValue` | `CalendarDate` |  |  | The minimum allowed date. |
| `maxValue` | `CalendarDate` |  |  | The maximum allowed date. |
| `isDisabled` | `boolean` | `false` |  | Whether the date picker is disabled. |
| `isReadOnly` | `boolean` | `false` |  | Whether the date picker is read-only. |
| `isRequired` | `boolean` | `false` |  | Whether the date picker is required. |
| `isInvalid` | `boolean` | `false` |  | Whether the date picker is invalid. |
| `variant` | `string` | `flat` | `flat`, `bordered`, `underlined`, `faded` | The variant of the date picker. |
| `color` | `string` | `default` | `default`, `primary`, `secondary`, `success`, `warning`, `danger` | The color of the date picker. |
| `size` | `string` | `md` | `sm`, `md`, `lg` | The size of the date picker. |
| `radius` | `string` | `md` | `none`, `sm`, `md`, `lg`, `full` | The border radius of the date picker. |
| `classNames` | `object` |  |  | Allows to set custom class names for the date picker slots. |
| `onChange` | `(date: CalendarDate) => void` |  |  | Handler that is called when the value changes. |

**Example:**
```typescript
import { parseDate } from "@internationalized/date";

export default function App() {
  const [date, setDate] = React.useState(parseDate("2023-11-15"));

  return (
    <DatePicker
      label="Event Date"
      placeholder="Select a date"
      value={date}
      onChange={setDate}
      className="max-w-xs"
    />
  );
}
```

</details>
---

## DateRangePicker

<details>
<summary>View details for DateRangePicker</summary>

**Description:** DateRangePicker allows users to select a range of dates.

**Import:**
```typescript
import { DateRangePicker } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `label` | `ReactNode` |  |  | The content to display as the label. |
| `description` | `ReactNode` |  |  | A description for the date range picker. |
| `errorMessage` | `ReactNode` |  |  | An error message for the date range picker. |
| `placeholder` | `string` |  |  | The placeholder text to display in the input. |
| `value` | `DateRange` |  |  | The current value (controlled). |
| `defaultValue` | `DateRange` |  |  | The default value (uncontrolled). |
| `minValue` | `CalendarDate` |  |  | The minimum allowed date. |
| `maxValue` | `CalendarDate` |  |  | The maximum allowed date. |
| `isDisabled` | `boolean` | `false` |  | Whether the date range picker is disabled. |
| `isReadOnly` | `boolean` | `false` |  | Whether the date range picker is read-only. |
| `isRequired` | `boolean` | `false` |  | Whether the date range picker is required. |
| `isInvalid` | `boolean` | `false` |  | Whether the date range picker is invalid. |
| `variant` | `string` | `flat` | `flat`, `bordered`, `underlined`, `faded` | The variant of the date range picker. |
| `color` | `string` | `default` | `default`, `primary`, `secondary`, `success`, `warning`, `danger` | The color of the date range picker. |
| `size` | `string` | `md` | `sm`, `md`, `lg` | The size of the date range picker. |
| `radius` | `string` | `md` | `none`, `sm`, `md`, `lg`, `full` | The border radius of the date range picker. |
| `classNames` | `object` |  |  | Allows to set custom class names for the date range picker slots. |
| `onChange` | `(range: DateRange) => void` |  |  | Handler that is called when the value changes. |

**Example:**
```typescript
import { parseDate, DateRange } from "@internationalized/date";

export default function App() {
  const [range, setRange] = React.useState({
    start: parseDate("2023-11-15"),
    end: parseDate("2023-11-20")
  });

  return (
    <DateRangePicker
      label="Trip Dates"
      placeholder="Select dates"
      value={range}
      onChange={setRange}
      className="max-w-sm"
    />
  );
}
```

</details>
---

## Divider

<details>
<summary>View details for Divider</summary>

**Description:** Dividers are used to visually separate content in a list or group.

**Import:**
```typescript
import { Divider } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `orientation` | `string` | `horizontal` | `horizontal`, `vertical` | The orientation of the divider. |
| `className` | `string` |  |  | The CSS class to apply to the divider. |

**Example:**
```typescript
export default function App() {
  return (
    <div className="max-w-md">
      <div className="space-y-1">
        <h4 className="text-medium font-medium">Main Content</h4>
        <p className="text-small text-default-400">
          This is the main content section. Dividers help separate different sections clearly.
        </p>
      </div>
      <Divider className="my-4" />
      <div className="space-y-1">
        <h4 className="text-medium font-medium">Related Information</h4>
        <p className="text-small text-default-400">
          This section contains related information to the main content.
        </p>
      </div>

      <div className="flex h-16 items-center gap-4 mt-8">
        <div>Item 1</div>
        <Divider orientation="vertical" />
        <div>Item 2</div>
        <Divider orientation="vertical" />
        <div>Item 3</div>
      </div>
    </div>
  );
}
```

</details>
---

## Drawer

<details>
<summary>View details for Drawer</summary>

**Description:** Drawer is a panel that slides out from the edge of the screen.

**Import:**
```typescript
import { Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` |  |  | The content of the drawer. Usually a DrawerContent component. |
| `isOpen` | `boolean` | `false` |  | Whether the drawer is open. |
| `placement` | `string` | `right` | `top`, `right`, `bottom`, `left` | The placement of the drawer. |
| `size` | `string` | `md` | `xs`, `sm`, `md`, `lg`, `xl`, `full` | The size of the drawer. |
| `backdrop` | `string \| boolean` | `opaque` | `transparent`, `opaque`, `blur`, `true`, `false` | The backdrop of the drawer. |
| `scrollBehavior` | `string` | `inside` | `inside`, `outside` | The scroll behavior of the drawer. |
| `hideCloseButton` | `boolean` | `false` |  | Whether to hide the close button. |
| `isDismissable` | `boolean` | `true` |  | Whether the drawer can be dismissed by clicking outside or pressing the escape key. |
| `isKeyboardDismissDisabled` | `boolean` | `false` |  | Whether the drawer can be dismissed by pressing the escape key. |
| `shouldBlockScroll` | `boolean` | `true` |  | Whether the drawer should block scrolling outside the drawer. |
| `motionProps` | `object` |  |  | Props for the motion component. |
| `classNames` | `object` |  |  | Allows to set custom class names for the drawer slots. |
| `onOpenChange` | `(isOpen: boolean) => void` |  |  | Handler that is called when the open state changes. |
| `onClose` | `() => void` |  |  | Handler that is called when the drawer is closed. |

**Example:**
```typescript
export default function App() {
  const [isOpen, setIsOpen] = React.useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <>
      <Button onPress={onOpen}>Open Drawer</Button>
      <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerContent>
          <DrawerHeader>
            <h4 className="text-xl font-semibold">Drawer Title</h4>
          </DrawerHeader>
          <DrawerBody>
            <p>
              This is the drawer content. You can put any content here, such as text, forms, lists, etc.
            </p>
          </DrawerBody>
          <DrawerFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button color="primary" onPress={onClose}>
              Action
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
```

</details>
---

## Dropdown

<details>
<summary>View details for Dropdown</summary>

**Description:** Displays a list of actions or options that a user can choose.

**Import:**
```typescript
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode[]` |  |  | The children to render. Usually a DropdownTrigger and DropdownMenu elements. |
| `type` | `string` | `menu` | `menu`, `listbox` | Type of overlay that is opened by the dropdown trigger. |
| `trigger` | `string` | `press` | `press`, `longPress` | How the dropdown menu is triggered. |
| `isDisabled` | `boolean` | `false` |  | Whether the dropdown trigger is disabled. |
| `closeOnSelect` | `boolean` | `true` |  | Whether the dropdown menu should be closed when an item is selected. |
| `shouldBlockScroll` | `boolean` | `true` |  | Whether the dropdown menu should block scrolling outside the menu. |
| `PopoverProps` | `PopoverProps` |  |  | Since the dropdown is an extension of the popover, it accepts all the props of the popover component. |
| `onOpenChange` | `(isOpen: boolean) => void` |  |  | Handler that is called when the dropdown's open state changes. |
| `shouldCloseOnInteractOutside` | `(e: HTMLElement) => void` |  |  | When user interacts with the argument element outside of the dropdown ref, return true if onClose should be called. |
| `onClose` | `() => void` |  |  | Handler that is called when the dropdown should close. |

**Example:**
```typescript
export default function App() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">Open Menu</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Actions">
        <DropdownItem key="new">New file</DropdownItem>
        <DropdownItem key="copy">Copy link</DropdownItem>
        <DropdownItem key="edit">Edit file</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
```

</details>
---

## DropdownItem

<details>
<summary>View details for DropdownItem</summary>

**Description:** An item within a DropdownMenu component.

**Import:**
```typescript
import { DropdownItem } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` |  |  | The content of the dropdown item. |
| `key` | `Key` |  |  | A unique key for the item. |
| `description` | `ReactNode` |  |  | A description for the dropdown item. |
| `startContent` | `ReactNode` |  |  | The content to display before the dropdown item's text. |
| `endContent` | `ReactNode` |  |  | The content to display after the dropdown item's text. |
| `shortcut` | `ReactNode` |  |  | The keyboard shortcut for the dropdown item. |
| `showDivider` | `boolean` | `false` |  | Whether to show a divider after the dropdown item. |
| `color` | `string` |  | `default`, `primary`, `secondary`, `success`, `warning`, `danger` | The color of the dropdown item. |
| `variant` | `string` |  | `solid`, `bordered`, `light`, `flat`, `faded`, `shadow` | The variant of the dropdown item. |
| `isDisabled` | `boolean` | `false` |  | Whether the dropdown item is disabled. |
| `isReadOnly` | `boolean` | `false` |  | Whether the dropdown item is read-only. |
| `isSelected` | `boolean` | `false` |  | Whether the dropdown item is selected. |
| `classNames` | `object` |  |  | Allows to set custom class names for the dropdown item slots. |

**Example:**
```typescript
export default function App() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">Open Menu</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Actions">
        <DropdownItem
          key="new"
          startContent={<Icon icon="lucide:file-plus" />}
        >
          New file
        </DropdownItem>
        <DropdownItem
          key="copy"
          startContent={<Icon icon="lucide:copy" />}
          shortcut="⌘C"
        >
          Copy link
        </DropdownItem>
        <DropdownItem
          key="edit"
          startContent={<Icon icon="lucide:edit" />}
          shortcut="⌘E"
          showDivider
        >
          Edit file
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          startContent={<Icon icon="lucide:trash" />}
          shortcut="⌘⇧D"
        >
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
```

</details>
---

## DropdownMenu

<details>
<summary>View details for DropdownMenu</summary>

**Description:** The menu that appears when the dropdown is open.

**Import:**
```typescript
import { DropdownMenu } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode[]` |  |  | The dropdown items. Usually DropdownItem components. |
| `aria-label` | `string` |  |  | The accessible label for the dropdown menu. |
| `color` | `string` | `default` | `default`, `primary`, `secondary`, `success`, `warning`, `danger` | The color of the dropdown menu items. |
| `variant` | `string` | `solid` | `solid`, `bordered`, `light`, `flat`, `faded`, `shadow` | The variant of the dropdown menu items. |
| `disallowEmptySelection` | `boolean` | `false` |  | Whether to disallow empty selection. |
| `selectionMode` | `string` | `none` | `none`, `single`, `multiple` | The selection mode of the dropdown menu. |
| `selectedKeys` | `Set<Key> \| Key[]` |  |  | The selected keys (controlled). |
| `defaultSelectedKeys` | `Set<Key> \| Key[]` |  |  | The default selected keys (uncontrolled). |
| `disabledKeys` | `Set<Key> \| Key[]` |  |  | The disabled keys. |
| `closeOnSelect` | `boolean` | `true` |  | Whether to close the dropdown menu when an item is selected. |
| `classNames` | `object` |  |  | Allows to set custom class names for the dropdown menu slots. |
| `onAction` | `(key: Key) => void` |  |  | Handler that is called when an item is selected. |
| `onSelectionChange` | `(keys: Selection) => void` |  |  | Handler that is called when the selection changes. |

**Example:**
```typescript
export default function App() {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">
          Selected: {selectedKeys.size ? Array.from(selectedKeys).join(", ") : "None"}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Actions"
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <DropdownItem key="text">Text</DropdownItem>
        <DropdownItem key="number">Number</DropdownItem>
        <DropdownItem key="date">Date</DropdownItem>
        <DropdownItem key="boolean">Boolean</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
```

</details>
---

## DropdownSection

<details>
<summary>View details for DropdownSection</summary>

**Description:** A section within a DropdownMenu component to group related items.

**Import:**
```typescript
import { DropdownSection, DropdownItem } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode[]` |  |  | The dropdown items within this section. Usually DropdownItem components. |
| `title` | `ReactNode` |  |  | The title of the section. |
| `showDivider` | `boolean` | `false` |  | Whether to show a divider after the section. |
| `classNames` | `object` |  |  | Allows to set custom class names for the dropdown section slots. |

**Example:**
```typescript
export default function App() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">Open Menu</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Actions">
        <DropdownSection title="Actions">
          <DropdownItem key="new">New file</DropdownItem>
          <DropdownItem key="copy">Copy link</DropdownItem>
          <DropdownItem key="edit">Edit file</DropdownItem>
        </DropdownSection>
        <DropdownSection title="Danger zone">
          <DropdownItem key="delete" className="text-danger" color="danger">
            Delete file
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
```

</details>
---

## DropdownTrigger

<details>
<summary>View details for DropdownTrigger</summary>

**Description:** The trigger element that opens the dropdown menu.

**Import:**
```typescript
import { DropdownTrigger } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` |  |  | The content of the dropdown trigger. |

**Example:**
```typescript
export default function App() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">
          Open Menu
          <Icon icon="lucide:chevron-down" className="ml-2" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Actions">
        <DropdownItem key="new">New file</DropdownItem>
        <DropdownItem key="copy">Copy link</DropdownItem>
        <DropdownItem key="edit">Edit file</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
```

</details>
---

## Image

<details>
<summary>View details for Image</summary>

**Description:** The Image component is used to display images with support for fallback.

**Import:**
```typescript
import { Image } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `src` | `string` |  |  | The image source URL. |
| `alt` | `string` |  |  | The alt text for the image. |
| `width` | `number` |  |  | The width of the image in pixels. |
| `height` | `number` |  |  | The height of the image in pixels. |
| `radius` | `string` | `none` | `none`, `sm`, `md`, `lg`, `full` | The border radius of the image. |
| `shadow` | `string` | `none` | `none`, `sm`, `md`, `lg` | The shadow of the image. |
| `isBlurred` | `boolean` | `false` |  | Whether the image should be blurred. |
| `isZoomed` | `boolean` | `false` |  | Whether the image should be zoomed on hover. |
| `fallbackSrc` | `string` |  |  | The fallback image source URL. |
| `loading` | `string` | `lazy` | `eager`, `lazy` | The loading attribute for the image. |
| `disableSkeleton` | `boolean` | `false` |  | Whether to disable the skeleton animation while the image is loading. |
| `removeWrapper` | `boolean` | `false` |  | Whether to remove the wrapper element. |
| `classNames` | `object` |  |  | Allows to set custom class names for the image slots. |
| `onLoad` | `() => void` |  |  | Handler that is called when the image is loaded. |
| `onError` | `() => void` |  |  | Handler that is called when the image fails to load. |

**Example:**
```typescript
export default function App() {
  return (
    <div className="flex flex-col gap-4">
      <Image
        width={300}
        height={200}
        src="https://img.heroui.chat/image/landscape?w=300&h=200&u=1"
        alt="Landscape"
        radius="lg"
      />

      <Image
        width={300}
        height={200}
        src="https://img.heroui.chat/image/landscape?w=300&h=200&u=2"
        alt="Landscape with shadow"
        radius="lg"
        shadow="md"
      />

      <Image
        width={300}
        height={200}
        src="https://img.heroui.chat/image/landscape?w=300&h=200&u=3"
        alt="Landscape with zoom effect"
        radius="lg"
        isZoomed
      />

      <Image
        width={300}
        height={200}
        src="https://invalid-image-url.jpg"
        fallbackSrc="https://img.heroui.chat/image/landscape?w=300&h=200&u=4"
        alt="Fallback image"
        radius="lg"
      />
    </div>
  );
}
```

</details>
---

## Input

<details>
<summary>View details for Input</summary>

**Description:** Input is a component that allows users to enter text.

**Import:**
```typescript
import { Input } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `label` | `ReactNode` |  |  | The content to display as the label. |
| `description` | `ReactNode` |  |  | A description for the input. |
| `errorMessage` | `ReactNode` |  |  | An error message for the input. |
| `placeholder` | `string` |  |  | The placeholder text to display in the input. |
| `value` | `string` |  |  | The current value (controlled). |
| `defaultValue` | `string` |  |  | The default value (uncontrolled). |
| `type` | `string` | `text` | `text`, `password`, `email`, `number`, `url`, `tel`, `search` | The type of the input. |
| `variant` | `string` | `flat` | `flat`, `bordered`, `underlined`, `faded` | The variant of the input. |
| `color` | `string` | `default` | `default`, `primary`, `secondary`, `success`, `warning`, `danger` | The color of the input. |
| `size` | `string` | `md` | `sm`, `md`, `lg` | The size of the input. |
| `radius` | `string` | `md` | `none`, `sm`, `md`, `lg`, `full` | The border radius of the input. |
| `labelPlacement` | `string` | `inside` | `inside`, `outside`, `outside-left` | The placement of the label. |
| `startContent` | `ReactNode` |  |  | The content to display before the input. |
| `endContent` | `ReactNode` |  |  | The content to display after the input. |
| `isDisabled` | `boolean` | `false` |  | Whether the input is disabled. |
| `isReadOnly` | `boolean` | `false` |  | Whether the input is read-only. |
| `isRequired` | `boolean` | `false` |  | Whether the input is required. |
| `isInvalid` | `boolean` | `false` |  | Whether the input is invalid. |
| `isClearable` | `boolean` | `false` |  | Whether the input can be cleared. |
| `disableAnimation` | `boolean` | `false` |  | Whether to disable the animation. |
| `classNames` | `object` |  |  | Allows to set custom class names for the input slots. |
| `onChange` | `(e: React.ChangeEvent<HTMLInputElement>) => void` |  |  | Handler that is called when the input value changes. |
| `onClear` | `() => void` |  |  | Handler that is called when the input is cleared. |
| `onValueChange` | `(value: string) => void` |  |  | Handler that is called when the input value changes. |

**Example:**
```typescript
export default function App() {
  const [value, setValue] = React.useState("");

  return (
    <div className="flex flex-col gap-4 max-w-md">
      <Input
        label="Email"
        placeholder="Enter your email"
        variant="bordered"
        type="email"
      />

      <Input
        label="Password"
        placeholder="Enter your password"
        type="password"
        variant="bordered"
        endContent={
          <button className="focus:outline-none">
            <Icon icon="lucide:eye" className="text-default-400" />
          </button>
        }
      />

      <Input
        label="Search"
        placeholder="Search..."
        startContent={<Icon icon="lucide:search" className="text-default-400" />}
        value={value}
        onValueChange={setValue}
        isClearable
      />

      <Input
        label="Website"
        placeholder="https://example.com"
        labelPlacement="outside"
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">https://</span>
          </div>
        }
      />

      <Input
        type="number"
        label="Price"
        placeholder="0.00"
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">$</span>
          </div>
        }
      />
    </div>
  );
}
```

</details>
---

## InputOtp

<details>
<summary>View details for InputOtp</summary>

**Description:** InputOtp is a component that allows users to enter a one-time password.

**Import:**
```typescript
import { InputOtp } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `label` | `ReactNode` |  |  | The content to display as the label. |
| `description` | `ReactNode` |  |  | A description for the input. |
| `errorMessage` | `ReactNode` |  |  | An error message for the input. |
| `value` | `string` |  |  | The current value (controlled). |
| `defaultValue` | `string` |  |  | The default value (uncontrolled). |
| `length` | `number` | `6` |  | The number of input fields. |
| `variant` | `string` | `flat` | `flat`, `bordered`, `underlined`, `faded` | The variant of the input. |
| `color` | `string` | `default` | `default`, `primary`, `secondary`, `success`, `warning`, `danger` | The color of the input. |
| `size` | `string` | `md` | `sm`, `md`, `lg` | The size of the input. |
| `radius` | `string` | `md` | `none`, `sm`, `md`, `lg`, `full` | The border radius of the input. |
| `isDisabled` | `boolean` | `false` |  | Whether the input is disabled. |
| `isReadOnly` | `boolean` | `false` |  | Whether the input is read-only. |
| `isRequired` | `boolean` | `false` |  | Whether the input is required. |
| `isInvalid` | `boolean` | `false` |  | Whether the input is invalid. |
| `disableAnimation` | `boolean` | `false` |  | Whether to disable the animation. |
| `classNames` | `object` |  |  | Allows to set custom class names for the input slots. |
| `onChange` | `(value: string) => void` |  |  | Handler that is called when the input value changes. |
| `onComplete` | `(value: string) => void` |  |  | Handler that is called when all input fields are filled. |

**Example:**
```typescript
export default function App() {
  const [value, setValue] = React.useState("");

  return (
    <div className="flex flex-col gap-4 max-w-md">
      <InputOtp
        label="Verification Code"
        length={6}
        value={value}
        onChange={setValue}
        onComplete={(value) => console.log("Completed:", value)}
      />

      <p className="text-default-500">
        {value ? `Entered: ${value}` : "No code entered"}
      </p>

      <Button
        color="primary"
        isDisabled={value.length < 6}
        onPress={() => console.log("Verify:", value)}
      >
        Verify Code
      </Button>
    </div>
  );
}
```

</details>
---

## Kbd

<details>
<summary>View details for Kbd</summary>

**Description:** Kbd is used to display keyboard shortcuts.

**Import:**
```typescript
import { Kbd } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` |  |  | The content of the keyboard shortcut. |
| `keys` | `string[]` |  |  | The keys to display. |
| `size` | `string` | `md` | `sm`, `md`, `lg` | The size of the keyboard shortcut. |
| `variant` | `string` | `solid` | `solid`, `bordered`, `flat` | The variant of the keyboard shortcut. |
| `radius` | `string` | `md` | `none`, `sm`, `md`, `lg`, `full` | The border radius of the keyboard shortcut. |
| `classNames` | `object` |  |  | Allows to set custom class names for the keyboard shortcut slots. |

**Example:**
```typescript
export default function App() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p>Press <Kbd>Shift</Kbd> + <Kbd>Tab</Kbd> to move backward</p>
      </div>

      <div>
        <p>Press <Kbd keys={["command", "shift", "p"]}>Command + Shift + P</Kbd> to open the command palette</p>
      </div>

      <div className="flex flex-wrap gap-4">
        <Kbd size="sm">Esc</Kbd>
        <Kbd size="md">Enter</Kbd>
        <Kbd size="lg">Tab</Kbd>
      </div>

      <div className="flex flex-wrap gap-4">
        <Kbd variant="solid">Ctrl</Kbd>
        <Kbd variant="bordered">Alt</Kbd>
        <Kbd variant="flat">Shift</Kbd>
      </div>
    </div>
  );
}
```

</details>
---

## Link

<details>
<summary>View details for Link</summary>

**Description:** Link is a component that allows users to navigate to another page.

**Import:**
```typescript
import { Link } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` |  |  | The content of the link. |
| `href` | `string` |  |  | The URL to navigate to when the link is clicked. |
| `color` | `string` | `primary` | `foreground`, `primary`, `secondary`, `success`, `warning`, `danger` | The color of the link. |
| `size` | `string` | `md` | `sm`, `md`, `lg` | The size of the link. |
| `underline` | `string` | `none` | `none`, `hover`, `always`, `active`, `focus` | The underline style of the link. |
| `isDisabled` | `boolean` | `false` |  | Whether the link is disabled. |
| `isExternal` | `boolean` | `false` |  | Whether the link should open in a new tab. |
| `showAnchorIcon` | `boolean` | `false` |  | Whether to show an anchor icon after the link. |
| `anchorIcon` | `ReactNode` |  |  | The anchor icon to display after the link. |
| `classNames` | `object` |  |  | Allows to set custom class names for the link slots. |

**Example:**
```typescript
export default function App() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p>
          This is a paragraph with a <Link href="#">link</Link> inside.
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        <Link href="#" color="primary">Primary</Link>
        <Link href="#" color="secondary">Secondary</Link>
        <Link href="#" color="success">Success</Link>
        <Link href="#" color="warning">Warning</Link>
        <Link href="#" color="danger">Danger</Link>
      </div>

      <div className="flex flex-wrap gap-4">
        <Link href="#" underline="none">No underline</Link>
        <Link href="#" underline="hover">Hover underline</Link>
        <Link href="#" underline="always">Always underline</Link>
        <Link href="#" underline="active">Active underline</Link>
        <Link href="#" underline="focus">Focus underline</Link>
      </div>

      <div>
        <Link href="https://example.com" isExternal showAnchorIcon>
          External link
        </Link>
      </div>
    </div>
  );
}
```

</details>
---

## Listbox

<details>
<summary>View details for Listbox</summary>

**Description:** Listbox is a component that allows users to select one or more items from a list.

**Import:**
```typescript
import { Listbox, ListboxItem } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode[]` |  |  | The listbox items. Usually ListboxItem components. |
| `aria-label` | `string` |  |  | The accessible label for the listbox. |
| `color` | `string` | `default` | `default`, `primary`, `secondary`, `success`, `warning`, `danger` | The color of the listbox items. |
| `variant` | `string` | `flat` | `flat`, `solid`, `bordered`, `faded`, `light`, `shadow` | The variant of the listbox items. |
| `disallowEmptySelection` | `boolean` | `false` |  | Whether to disallow empty selection. |
| `selectionMode` | `string` | `single` | `single`, `multiple` | The selection mode of the listbox. |
| `selectedKeys` | `Set<Key> \| Key[]` |  |  | The selected keys (controlled). |
| `defaultSelectedKeys` | `Set<Key> \| Key[]` |  |  | The default selected keys (uncontrolled). |
| `disabledKeys` | `Set<Key> \| Key[]` |  |  | The disabled keys. |
| `hideSelectedIcon` | `boolean` | `false` |  | Whether to hide the selected icon. |
| `itemClasses` | `object` |  |  | Classes to apply to the listbox items. |
| `classNames` | `object` |  |  | Allows to set custom class names for the listbox slots. |
| `onAction` | `(key: Key) => void` |  |  | Handler that is called when an item is selected. |
| `onSelectionChange` | `(keys: Selection) => void` |  |  | Handler that is called when the selection changes. |

**Example:**
```typescript
export default function App() {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["music"]));

  return (
    <div className="max-w-md">
      <Listbox
        aria-label="Actions"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        variant="flat"
        color="primary"
      >
        <ListboxItem key="text">Text</ListboxItem>
        <ListboxItem key="music">Music</ListboxItem>
        <ListboxItem key="image">Image</ListboxItem>
        <ListboxItem key="video">Video</ListboxItem>
      </Listbox>

      <p className="mt-4 text-default-500">
        Selected: {Array.from(selectedKeys).join(", ")}
      </p>
    </div>
  );
}
```

</details>
---

## ListboxItem

<details>
<summary>View details for ListboxItem</summary>

**Description:** An item within a Listbox component.

**Import:**
```typescript
import { ListboxItem } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` |  |  | The content of the listbox item. |
| `key` | `Key` |  |  | A unique key for the item. |
| `description` | `ReactNode` |  |  | A description for the listbox item. |
| `startContent` | `ReactNode` |  |  | The content to display before the listbox item's text. |
| `endContent` | `ReactNode` |  |  | The content to display after the listbox item's text. |
| `showDivider` | `boolean` | `false` |  | Whether to show a divider after the listbox item. |
| `isDisabled` | `boolean` | `false` |  | Whether the listbox item is disabled. |
| `isReadOnly` | `boolean` | `false` |  | Whether the listbox item is read-only. |
| `classNames` | `object` |  |  | Allows to set custom class names for the listbox item slots. |

**Example:**
```typescript
export default function App() {
  return (
    <div className="max-w-md">
      <Listbox aria-label="Actions" variant="flat">
        <ListboxItem
          key="edit"
          startContent={<Icon icon="lucide:edit" />}
        >
          Edit file
        </ListboxItem>
        <ListboxItem
          key="copy"
          startContent={<Icon icon="lucide:copy" />}
          endContent={<Kbd>⌘C</Kbd>}
        >
          Copy link
        </ListboxItem>
        <ListboxItem
          key="download"
          startContent={<Icon icon="lucide:download" />}
          showDivider
        >
          Download
        </ListboxItem>
        <ListboxItem
          key="delete"
          className="text-danger"
          color="danger"
          startContent={<Icon icon="lucide:trash" />}
        >
          Delete file
        </ListboxItem>
      </Listbox>
    </div>
  );
}
```

</details>
---

## ListboxSection

<details>
<summary>View details for ListboxSection</summary>

**Description:** A section within a Listbox component to group related items.

**Import:**
```typescript
import { ListboxSection, ListboxItem } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode[]` |  |  | The listbox items within this section. Usually ListboxItem components. |
| `title` | `ReactNode` |  |  | The title of the section. |
| `showDivider` | `boolean` | `false` |  | Whether to show a divider after the section. |
| `classNames` | `object` |  |  | Allows to set custom class names for the listbox section slots. |

**Example:**
```typescript
export default function App() {
  return (
    <div className="max-w-md">
      <Listbox aria-label="Actions" variant="flat">
        <ListboxSection title="Actions">
          <ListboxItem key="new">New file</ListboxItem>
          <ListboxItem key="copy">Copy link</ListboxItem>
          <ListboxItem key="edit">Edit file</ListboxItem>
        </ListboxSection>
        <ListboxSection title="Danger zone">
          <ListboxItem key="delete" className="text-danger" color="danger">
            Delete file
          </ListboxItem>
        </ListboxSection>
      </Listbox>
    </div>
  );
}
```

</details>
---

## Modal

<details>
<summary>View details for Modal</summary>

**Description:** Modal is a dialog that appears on top of the main content and requires user interaction.

**Import:**
```typescript
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` |  |  | The content of the modal. Usually a ModalContent component. |
| `isOpen` | `boolean` | `false` |  | Whether the modal is open. |
| `size` | `string` | `md` | `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`, `full` | The size of the modal. |
| `radius` | `string` | `lg` | `none`, `sm`, `md`, `lg` | The border radius of the modal. |
| `placement` | `string` | `center` | `center`, `top`, `bottom`, `auto` | The placement of the modal. |
| `backdrop` | `string \| boolean` | `opaque` | `transparent`, `opaque`, `blur`, `true`, `false` | The backdrop of the modal. |
| `scrollBehavior` | `string` | `inside` | `inside`, `outside` | The scroll behavior of the modal. |
| `hideCloseButton` | `boolean` | `false` |  | Whether to hide the close button. |
| `isDismissable` | `boolean` | `true` |  | Whether the modal can be dismissed by clicking outside or pressing the escape key. |
| `isKeyboardDismissDisabled` | `boolean` | `false` |  | Whether the modal can be dismissed by pressing the escape key. |
| `shouldBlockScroll` | `boolean` | `true` |  | Whether the modal should block scrolling outside the modal. |
| `motionProps` | `object` |  |  | Props for the motion component. |
| `classNames` | `object` |  |  | Allows to set custom class names for the modal slots. |
| `onOpenChange` | `(isOpen: boolean) => void` |  |  | Handler that is called when the open state changes. |
| `onClose` | `() => void` |  |  | Handler that is called when the modal is closed. |

**Example:**
```typescript
export default function App() {
  const [isOpen, setIsOpen] = React.useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>
            <h3 className="text-xl font-semibold">Modal Title</h3>
          </ModalHeader>
          <ModalBody>
            <p>
              This is the modal content. You can put any content here, such as text, forms, lists, etc.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button color="primary" onPress={onClose}>
              Action
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
```

</details>
---

## Navbar

<details>
<summary>View details for Navbar</summary>

**Description:** Navbar is a responsive navigation header that includes support for branding, links, and more.

**Import:**
```typescript
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode[]` |  |  | The content of the navbar. Usually NavbarBrand, NavbarContent, NavbarMenu components. |
| `position` | `string` | `static` | `static`, `sticky`, `floating` | The position of the navbar. |
| `maxWidth` | `string` | `lg` | `sm`, `md`, `lg`, `xl`, `2xl`, `full` | The maximum width of the navbar content. |
| `height` | `string \| number` | `4rem` |  | The height of the navbar. |
| `isBordered` | `boolean` | `false` |  | Whether the navbar has a border. |
| `isBlurred` | `boolean` | `false` |  | Whether the navbar has a blur effect. |
| `isMenuOpen` | `boolean` |  |  | Whether the navbar menu is open (controlled). |
| `defaultIsMenuOpen` | `boolean` | `false` |  | Whether the navbar menu is open by default (uncontrolled). |
| `shouldHideOnScroll` | `boolean` | `false` |  | Whether the navbar should hide when scrolling down. |
| `disableAnimation` | `boolean` | `false` |  | Whether to disable the animation. |
| `classNames` | `object` |  |  | Allows to set custom class names for the navbar slots. |
| `onMenuOpenChange` | `(isOpen: boolean) => void` |  |  | Handler that is called when the menu open state changes. |

**Example:**
```typescript
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem>
          <Link
            color="foreground"
            className="w-full"
            href="#"
            size="lg"
          >
            Features
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            color="foreground"
            className="w-full"
            href="#"
            size="lg"
          >
            Customers
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            color="foreground"
            className="w-full"
            href="#"
            size="lg"
          >
            Integrations
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
```

</details>
---

## NumberInput

<details>
<summary>View details for NumberInput</summary>

**Description:** NumberInput is a component that allows users to enter a number.

**Import:**
```typescript
import { NumberInput } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `label` | `ReactNode` |  |  | The content to display as the label. |
| `description` | `ReactNode` |  |  | A description for the input. |
| `errorMessage` | `ReactNode` |  |  | An error message for the input. |
| `placeholder` | `string` |  |  | The placeholder text to display in the input. |
| `value` | `number` |  |  | The current value (controlled). |
| `defaultValue` | `number` |  |  | The default value (uncontrolled). |
| `min` | `number` |  |  | The minimum allowed value. |
| `max` | `number` |  |  | The maximum allowed value. |
| `step` | `number` | `1` |  | The step value. |
| `variant` | `string` | `flat` | `flat`, `bordered`, `underlined`, `faded` | The variant of the input. |
| `color` | `string` | `default` | `default`, `primary`, `secondary`, `success`, `warning`, `danger` | The color of the input. |
| `size` | `string` | `md` | `sm`, `md`, `lg` | The size of the input. |
| `radius` | `string` | `md` | `none`, `sm`, `md`, `lg`, `full` | The border radius of the input. |
| `labelPlacement` | `string` | `inside` | `inside`, `outside`, `outside-left` | The placement of the label. |
| `startContent` | `ReactNode` |  |  | The content to display before the input. |
| `endContent` | `ReactNode` |  |  | The content to display after the input. |
| `isDisabled` | `boolean` | `false` |  | Whether the input is disabled. |
| `isReadOnly` | `boolean` | `false` |  | Whether the input is read-only. |
| `isRequired` | `boolean` | `false` |  | Whether the input is required. |
| `isInvalid` | `boolean` | `false` |  | Whether the input is invalid. |
| `disableAnimation` | `boolean` | `false` |  | Whether to disable the animation. |
| `hideControls` | `boolean` | `false` |  | Whether to hide the increment and decrement buttons. |
| `classNames` | `object` |  |  | Allows to set custom class names for the input slots. |
| `onChange` | `(e: React.ChangeEvent<HTMLInputElement>) => void` |  |  | Handler that is called when the input value changes. |
| `onValueChange` | `(value: number) => void` |  |  | Handler that is called when the input value changes. |

**Example:**
```typescript
export default function App() {
  const [value, setValue] = React.useState(0);

  return (
    <div className="flex flex-col gap-4 max-w-md">
      <NumberInput
        label="Quantity"
        placeholder="0"
        min={0}
        max={10}
        value={value}
        onValueChange={setValue}
      />

      <NumberInput
        label="Price"
        placeholder="0.00"
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">$</span>
          </div>
        }
        endContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">USD</span>
          </div>
        }
      />

      <NumberInput
        label="Percentage"
        placeholder="0"
        min={0}
        max={100}
        step={5}
        endContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">%</span>
          </div>
        }
      />
    </div>
  );
}
```

</details>
---

## Pagination

<details>
<summary>View details for Pagination</summary>

**Description:** Pagination is used to navigate between pages of content.

**Import:**
```typescript
import { Pagination } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `total` | `number` |  |  | The total number of pages. |
| `initialPage` | `number` | `1` |  | The initial page (uncontrolled). |
| `page` | `number` |  |  | The current page (controlled). |
| `siblings` | `number` | `1` |  | The number of siblings to show on each side of the current page. |
| `boundaries` | `number` | `1` |  | The number of pages to show at the beginning and end. |
| `color` | `string` | `primary` | `default`, `primary`, `secondary`, `success`, `warning`, `danger` | The color of the pagination. |
| `size` | `string` | `md` | `sm`, `md`, `lg` | The size of the pagination. |
| `radius` | `string` | `md` | `none`, `sm`, `md`, `lg`, `full` | The border radius of the pagination. |
| `variant` | `string` | `flat` | `flat`, `bordered`, `light` | The variant of the pagination. |
| `showControls` | `boolean` | `true` |  | Whether to show the previous and next buttons. |
| `showShadow` | `boolean` | `false` |  | Whether to show a shadow on the pagination. |
| `isDisabled` | `boolean` | `false` |  | Whether the pagination is disabled. |
| `isCompact` | `boolean` | `false` |  | Whether the pagination is compact. |
| `disableCursorAnimation` | `boolean` | `false` |  | Whether to disable the cursor animation. |
| `disableAnimation` | `boolean` | `false` |  | Whether to disable the animation. |
| `loop` | `boolean` | `false` |  | Whether to loop through the pages. |
| `dotsJump` | `number` | `5` |  | The number of pages to jump when clicking on the dots. |
| `classNames` | `object` |  |  | Allows to set custom class names for the pagination slots. |
| `onChange` | `(page: number) => void` |  |  | Handler that is called when the page changes. |

**Example:**
```typescript
export default function App() {
  const [currentPage, setCurrentPage] = React.useState(1);

  return (
    <div className="flex flex-col gap-4">
      <Pagination
        total={10}
        page={currentPage}
        onChange={setCurrentPage}
      />

      <div className="flex gap-4">
        <Pagination
          total={10}
          color="primary"
          radius="full"
          size="sm"
        />
        <Pagination
          total={10}
          color="secondary"
          radius="lg"
          size="md"
        />
        <Pagination
          total={10}
          color="success"
          radius="sm"
          size="lg"
        />
      </div>

      <div className="flex gap-4">
        <Pagination
          total={10}
          variant="flat"
          color="primary"
        />
        <Pagination
          total={10}
          variant="bordered"
          color="secondary"
        />
        <Pagination
          total={10}
          variant="light"
          color="success"
        />
      </div>

      <Pagination
        total={10}
        showControls={false}
        initialPage={5}
      />

      <Pagination
        total={10}
        isCompact
        showShadow
      />
    </div>
  );
}
```

</details>
---

## Popover

<details>
<summary>View details for Popover</summary>

**Description:** Popover is a non-modal dialog that floats around its disclosure.

**Import:**
```typescript
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode[]` |  |  | The content of the popover. Usually a PopoverTrigger and PopoverContent components. |
| `isOpen` | `boolean` |  |  | Whether the popover is open (controlled). |
| `defaultOpen` | `boolean` | `false` |  | Whether the popover is open by default (uncontrolled). |
| `placement` | `string` | `bottom` | `top`, `right`, `bottom`, `left`, `top-start`, `top-end`, `right-start`, `right-end`, `bottom-start`, `bottom-end`, `left-start`, `left-end` | The placement of the popover. |
| `offset` | `number` | `7` |  | The distance between the popover and the trigger. |
| `crossOffset` | `number` | `0` |  | The offset along the cross axis of the popover. |
| `showArrow` | `boolean` | `false` |  | Whether to show an arrow pointing to the trigger. |
| `backdrop` | `string \| boolean` | `transparent` | `transparent`, `opaque`, `blur`, `true`, `false` | The backdrop of the popover. |
| `triggerType` | `string` | `press` | `press`, `hover` | The type of interaction that triggers the popover. |
| `isKeyboardDismissDisabled` | `boolean` | `false` |  | Whether the popover can be dismissed by pressing the escape key. |
| `shouldFlip` | `boolean` | `true` |  | Whether the popover should flip its placement when it would overflow its boundary. |
| `shouldBlockScroll` | `boolean` | `false` |  | Whether the popover should block scrolling outside the popover. |
| `motionProps` | `object` |  |  | Props for the motion component. |
| `classNames` | `object` |  |  | Allows to set custom class names for the popover slots. |
| `onOpenChange` | `(isOpen: boolean) => void` |  |  | Handler that is called when the open state changes. |
| `onClose` | `() => void` |  |  | Handler that is called when the popover is closed. |

**Example:**
```typescript
export default function App() {
  return (
    <div className="flex flex-wrap gap-4">
      <Popover placement="top">
        <PopoverTrigger>
          <Button>Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="px-1 py-2">
            <div className="text-small font-bold">Popover Content</div>
            <div className="text-tiny">This is the popover content</div>
          </div>
        </PopoverContent>
      </Popover>

      <Popover placement="right" showArrow>
        <PopoverTrigger>
          <Button>With Arrow</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="px-1 py-2">
            <div className="text-small font-bold">Popover with Arrow</div>
            <div className="text-tiny">This popover has an arrow pointing to the trigger</div>
          </div>
        </PopoverContent>
      </Popover>

      <Popover triggerType="hover">
        <PopoverTrigger>
          <Button>Hover Me</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="px-1 py-2">
            <div className="text-small font-bold">Hover Popover</div>
            <div className="text-tiny">This popover appears on hover</div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
```

</details>
---

## Progress

<details>
<summary>View details for Progress</summary>

**Description:** Progress is used to display the progress of a task or to show a data visualization.

**Import:**
```typescript
import { Progress } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `aria-label` | `string` |  |  | The accessible label for the progress bar. |
| `value` | `number` | `0` |  | The current value of the progress bar. |
| `color` | `string` | `primary` | `default`, `primary`, `secondary`, `success`, `warning`, `danger` | The color of the progress bar. |
| `size` | `string` | `md` | `sm`, `md`, `lg` | The size of the progress bar. |
| `radius` | `string` | `md` | `none`, `sm`, `md`, `lg`, `full` | The border radius of the progress bar. |
| `isIndeterminate` | `boolean` | `false` |  | Whether the progress bar is indeterminate. |
| `isStriped` | `boolean` | `false` |  | Whether the progress bar has stripes. |
| `disableAnimation` | `boolean` | `false` |  | Whether to disable the animation. |
| `label` | `ReactNode` |  |  | The content to display as the label. |
| `showValueLabel` | `boolean` | `false` |  | Whether to show the value label. |
| `valueLabel` | `ReactNode` |  |  | The content to display as the value label. |
| `formatOptions` | `Intl.NumberFormatOptions` |  |  | The options to format the value. |
| `minValue` | `number` | `0` |  | The minimum value of the progress bar. |
| `maxValue` | `number` | `100` |  | The maximum value of the progress bar. |
| `classNames` | `object` |  |  | Allows to set custom class names for the progress bar slots. |

**Example:**
```typescript
export default function App() {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-6 max-w-md">
      <Progress
        aria-label="Loading..."
        value={value}
        color="primary"
      />

      <Progress
        aria-label="Loading..."
        value={value}
        color="secondary"
        showValueLabel={true}
      />

      <Progress
        aria-label="Loading..."
        value={value}
        color="success"
        showValueLabel={true}
        valueLabel={`${value}%`}
      />

      <Progress
        aria-label="Loading..."
        value={value}
        color="warning"
        size="sm"
        isStriped
      />

      <Progress
        aria-label="Loading..."
        value={value}
        color="danger"
        size="lg"
        radius="none"
      />

      <Progress
        aria-label="Loading..."
        isIndeterminate
        color="secondary"
        label="Processing..."
      />
    </div>
  );
}
```

</details>
---

## Radio

<details>
<summary>View details for Radio</summary>

**Description:** Radio buttons allow users to select a single option from a list of options.

**Import:**
```typescript
import { Radio } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` |  |  | The label of the radio. |
| `value` | `string` |  |  | The value of the radio element, used when submitting an HTML form. |
| `name` | `string` |  |  | The name of the radio element, used when submitting an HTML form. |
| `size` | `string` | `md` | `sm`, `md`, `lg` | The size of the radio. |
| `color` | `string` | `primary` | `default`, `primary`, `secondary`, `success`, `warning`, `danger` | The color of the radio. |
| `isSelected` | `boolean` |  |  | Whether the element should be selected (controlled). |
| `defaultSelected` | `boolean` |  |  | Whether the element should be selected (uncontrolled). |
| `isRequired` | `boolean` | `false` |  | Whether user input is required on the radio before form submission. |
| `isReadOnly` | `boolean` | `false` |  | Whether the radio can be selected but not changed by the user. |
| `isDisabled` | `boolean` | `false` |  | Whether the radio is disabled. |
| `isInvalid` | `boolean` | `false` |  | Whether the radio is invalid. |
| `disableAnimation` | `boolean` | `false` |  | Whether the animation should be disabled. |
| `classNames` | `object` |  |  | Allows to set custom class names for the radio slots. |
| `onChange` | `React.ChangeEvent<HTMLInputElement>` |  |  | Handler that is called when the element's selection state changes. |
| `onValueChange` | `(isSelected: boolean) => void` |  |  | Handler that is called when the element's selection state changes. |

**Example:**
```typescript
export default function App() {
  const [selected, setSelected] = React.useState("a");

  return (
    <div className="flex flex-col gap-3">
      <Radio
        value="a"
        isSelected={selected === "a"}
        onValueChange={() => setSelected("a")}
      >
        Option A
      </Radio>
      <Radio
        value="b"
        isSelected={selected === "b"}
        onValueChange={() => setSelected("b")}
      >
        Option B
      </Radio>
      <Radio
        value="c"
        isSelected={selected === "c"}
        onValueChange={() => setSelected("c")}
      >
        Option C
      </Radio>

      <p className="text-default-500">Selected: {selected}</p>
    </div>
  );
}
```

</details>
---

## RadioGroup

<details>
<summary>View details for RadioGroup</summary>

**Description:** RadioGroup is a wrapper component for Radio to display a group of radio buttons.

**Import:**
```typescript
import { RadioGroup, Radio } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode[]` |  |  | The radio buttons to display. Usually Radio components. |
| `label` | `ReactNode` |  |  | The content to display as the label. |
| `value` | `string` |  |  | The current selected value (controlled). |
| `defaultValue` | `string` |  |  | The default selected value (uncontrolled). |
| `name` | `string` |  |  | The name of the RadioGroup, used when submitting an HTML form. |
| `description` | `ReactNode` |  |  | A description for the radio group. |
| `errorMessage` | `ReactNode` |  |  | An error message for the radio group. |
| `orientation` | `string` | `vertical` | `horizontal`, `vertical` | The orientation of the radio group. |
| `color` | `string` | `primary` | `default`, `primary`, `secondary`, `success`, `warning`, `danger` | The color of the radio buttons. |
| `size` | `string` | `md` | `sm`, `md`, `lg` | The size of the radio buttons. |
| `isRequired` | `boolean` | `false` |  | Whether at least one option must be selected. |
| `isReadOnly` | `boolean` | `false` |  | Whether the radio buttons can be selected but not changed by the user. |
| `isDisabled` | `boolean` | `false` |  | Whether the radio group is disabled. |
| `isInvalid` | `boolean` | `false` |  | Whether the radio group is invalid. |
| `disableAnimation` | `boolean` | `false` |  | Whether the animation should be disabled. |
| `classNames` | `object` |  |  | Allows to set custom class names for the radio group slots. |
| `onValueChange` | `(value: string) => void` |  |  | Handler that is called when the value changes. |

**Example:**
```typescript
export default function App() {
  const [selected, setSelected] = React.useState("london");

  return (
    <div className="flex flex-col gap-3">
      <RadioGroup
        label="Select your favorite city"
        value={selected}
        onValueChange={setSelected}
      >
        <Radio value="buenos-aires">Buenos Aires</Radio>
        <Radio value="sydney">Sydney</Radio>
        <Radio value="london">London</Radio>
        <Radio value="tokyo">Tokyo</Radio>
      </RadioGroup>

      <p className="text-default-500">Selected: {selected}</p>

      <RadioGroup
        label="Orientation horizontal"
        orientation="horizontal"
        color="secondary"
      >
        <Radio value="1">Option 1</Radio>
        <Radio value="2">Option 2</Radio>
        <Radio value="3">Option 3</Radio>
      </RadioGroup>
    </div>
  );
}
```

</details>
---

## RangeCalendar

<details>
<summary>View details for RangeCalendar</summary>

**Description:** RangeCalendar allows users to select a range of dates.

**Import:**
```typescript
import { RangeCalendar } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `aria-label` | `string` |  |  | The accessible label for the calendar. |
| `value` | `DateRange` |  |  | The current value (controlled). |
| `defaultValue` | `DateRange` |  |  | The default value (uncontrolled). |
| `minValue` | `CalendarDate` |  |  | The minimum allowed date. |
| `maxValue` | `CalendarDate` |  |  | The maximum allowed date. |
| `isDisabled` | `boolean` | `false` |  | Whether the calendar is disabled. |
| `isReadOnly` | `boolean` | `false` |  | Whether the calendar is read-only. |
| `isDateUnavailable` | `(date: CalendarDate) => boolean` |  |  | Function that returns whether a date is unavailable. |
| `locale` | `string` |  |  | The locale to use for formatting dates. |
| `visibleMonths` | `number` | `1` |  | The number of months to display at once. |
| `pageBehavior` | `string` | `visible` | `visible`, `single` | The behavior when navigating between pages. |
| `fixedWeeks` | `boolean` | `false` |  | Whether to always display 6 weeks per month. |
| `calendarProps` | `object` |  |  | Additional props to pass to the calendar. |
| `classNames` | `object` |  |  | Allows to set custom class names for the calendar slots. |
| `onChange` | `(range: DateRange) => void` |  |  | Handler that is called when the value changes. |

**Example:**
```typescript
import { parseDate, DateRange } from "@internationalized/date";

export default function App() {
  const [range, setRange] = React.useState({
    start: parseDate("2023-11-15"),
    end: parseDate("2023-11-20")
  });

  return (
    <RangeCalendar
      aria-label="Select dates"
      value={range}
      onChange={setRange}
      className="max-w-md"
    />
  );
}
```

</details>
---

## ScrollShadow

<details>
<summary>View details for ScrollShadow</summary>

**Description:** ScrollShadow is a container that shows a shadow when the content is scrollable.

**Import:**
```typescript
import { ScrollShadow } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` |  |  | The content of the scroll shadow container. |
| `hideScrollBar` | `boolean` | `false` |  | Whether to hide the scrollbar. |
| `orientation` | `string` | `vertical` | `horizontal`, `vertical`, `both` | The orientation of the scroll shadow. |
| `offset` | `number` | `0` |  | The offset of the scroll shadow. |
| `size` | `number` | `40` |  | The size of the scroll shadow. |
| `visibility` | `string` | `auto` | `auto`, `always`, `never` | The visibility of the scroll shadow. |
| `isEnabled` | `boolean` | `true` |  | Whether the scroll shadow is enabled. |
| `className` | `string` |  |  | The CSS class to apply to the scroll shadow container. |

**Example:**
```typescript
export default function App() {
  return (
    <div className="flex flex-col gap-8 max-w-md">
      <ScrollShadow className="h-[200px] w-full">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
        </p>
        <p>
          Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
        </p>
      </ScrollShadow>

      <ScrollShadow orientation="horizontal" className="w-full max-w-md">
        <div className="flex gap-4 py-2 w-[800px]">
          {Array.from({length: 10}).map((_, i) => (
            <Card key={i} className="w-[200px] h-[100px] flex items-center justify-center">
              <p>Card {i + 1}</p>
            </Card>
          ))}
        </div>
      </ScrollShadow>
    </div>
  );
}
```

</details>
---

## Select

<details>
<summary>View details for Select</summary>

**Description:** Select allows users to select a value from a list of options.

**Import:**
```typescript
import { Select, SelectItem } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode[]` |  |  | The select items. Usually SelectItem components. |
| `label` | `ReactNode` |  |  | The content to display as the label. |
| `description` | `ReactNode` |  |  | A description for the select. |
| `errorMessage` | `ReactNode` |  |  | An error message for the select. |
| `placeholder` | `string` |  |  | The placeholder text to display in the select. |
| `variant` | `string` | `flat` | `flat`, `bordered`, `underlined`, `faded` | The variant of the select. |
| `color` | `string` | `default` | `default`, `primary`, `secondary`, `success`, `warning`, `danger` | The color of the select. |
| `size` | `string` | `md` | `sm`, `md`, `lg` | The size of the select. |
| `radius` | `string` | `md` | `none`, `sm`, `md`, `lg`, `full` | The border radius of the select. |
| `labelPlacement` | `string` | `inside` | `inside`, `outside`, `outside-left` | The placement of the label. |
| `startContent` | `ReactNode` |  |  | The content to display before the select. |
| `endContent` | `ReactNode` |  |  | The content to display after the select. |
| `defaultItems` | `T[]` |  |  | The default items to display in the select menu. |
| `items` | `T[]` |  |  | The controlled items to display in the select menu. |
| `defaultSelectedKeys` | `Set<Key> \| Key[]` |  |  | The default selected keys (uncontrolled). |
| `selectedKeys` | `Set<Key> \| Key[]` |  |  | The selected keys (controlled). |
| `disabledKeys` | `Set<Key> \| Key[]` |  |  | The disabled keys. |
| `selectionMode` | `string` | `single` | `single`, `multiple` | The selection mode of the select. |
| `isDisabled` | `boolean` | `false` |  | Whether the select is disabled. |
| `isRequired` | `boolean` | `false` |  | Whether the select is required. |
| `isReadOnly` | `boolean` | `false` |  | Whether the select is read-only. |
| `isInvalid` | `boolean` | `false` |  | Whether the select is invalid. |
| `disableAnimation` | `boolean` | `false` |  | Whether to disable the animation. |
| `classNames` | `object` |  |  | Allows to set custom class names for the select slots. |
| `onSelectionChange` | `(keys: Selection) => void` |  |  | Handler that is called when the selection changes. |
| `onOpenChange` | `(isOpen: boolean) => void` |  |  | Handler that is called when the open state changes. |

**Example:**
```typescript
export default function App() {
  const [value, setValue] = React.useState(new Set(["cat"]));

  const animals = [
    { label: "Cat", value: "cat" },
    { label: "Dog", value: "dog" },
    { label: "Elephant", value: "elephant" },
    { label: "Lion", value: "lion" },
    { label: "Tiger", value: "tiger" },
    { label: "Giraffe", value: "giraffe" }
  ];

  return (
    <div className="flex flex-col gap-4 max-w-md">
      <Select
        label="Favorite Animal"
        placeholder="Select an animal"
        selectedKeys={value}
        onSelectionChange={setValue}
        className="max-w-xs"
      >
        {animals.map((animal) => (
          <SelectItem key={animal.value} value={animal.value}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>

      <p className="text-default-500">
        Selected: {Array.from(value).join(", ")}
      </p>

      <Select
        label="Multiple selection"
        placeholder="Select multiple animals"
        selectionMode="multiple"
        className="max-w-xs"
      >
        {animals.map((animal) => (
          <SelectItem key={animal.value} value={animal.value}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
```

</details>
---

## Skeleton

<details>
<summary>View details for Skeleton</summary>

**Description:** Skeleton is used to display a placeholder preview of content before the data gets loaded.

**Import:**
```typescript
import { Skeleton } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` |  |  | The content to render when the skeleton is not loading. |
| `isLoaded` | `boolean` | `false` |  | Whether the content is loaded. |
| `disableAnimation` | `boolean` | `false` |  | Whether to disable the animation. |
| `className` | `string` |  |  | The CSS class to apply to the skeleton. |

**Example:**
```typescript
export default function App() {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-md space-y-4">
      <div className="space-y-3">
        <Skeleton isLoaded={isLoaded} className="rounded-lg">
          <div className="h-24 rounded-lg bg-default-300"></div>
        </Skeleton>
        <div className="space-y-3">
          <Skeleton isLoaded={isLoaded} className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-300"></div>
          </Skeleton>
          <Skeleton isLoaded={isLoaded} className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-300"></div>
          </Skeleton>
          <Skeleton isLoaded={isLoaded} className="w-2/5 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
          </Skeleton>
        </div>
      </div>

      <div className="flex gap-3">
        <div>
          <Skeleton isLoaded={isLoaded} className="flex rounded-full w-12 h-12">
            <Avatar src="https://img.heroui.chat/image/avatar?w=150&h=150&u=1" />
          </Skeleton>
        </div>
        <div className="w-full space-y-2">
          <Skeleton isLoaded={isLoaded} className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-300"></div>
          </Skeleton>
          <Skeleton isLoaded={isLoaded} className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-300"></div>
          </Skeleton>
          <Skeleton isLoaded={isLoaded} className="w-2/5 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
          </Skeleton>
        </div>
      </div>
    </div>
  );
}
```

</details>
---

## Slider

<details>
<summary>View details for Slider</summary>

**Description:** Slider allows users to select a value from a range.

**Import:**
```typescript
import { Slider } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `label` | `ReactNode` |  |  | The content to display as the label. |
| `value` | `number \| number[]` |  |  | The current value (controlled). |
| `defaultValue` | `number \| number[]` |  |  | The default value (uncontrolled). |
| `color` | `string` | `primary` | `default`, `primary`, `secondary`, `success`, `warning`, `danger` | The color of the slider. |
| `size` | `string` | `md` | `sm`, `md`, `lg` | The size of the slider. |
| `radius` | `string` | `full` | `none`, `sm`, `md`, `lg`, `full` | The border radius of the slider. |
| `step` | `number` | `1` |  | The step value. |
| `minValue` | `number` | `0` |  | The minimum allowed value. |
| `maxValue` | `number` | `100` |  | The maximum allowed value. |
| `formatOptions` | `Intl.NumberFormatOptions` |  |  | The options to format the value. |
| `showSteps` | `boolean` | `false` |  | Whether to show the steps. |
| `showTooltip` | `boolean` | `false` |  | Whether to show the tooltip. |
| `showOutline` | `boolean` | `false` |  | Whether to show the outline. |
| `isDisabled` | `boolean` | `false` |  | Whether the slider is disabled. |
| `isReadOnly` | `boolean` | `false` |  | Whether the slider is read-only. |
| `hideValue` | `boolean` | `false` |  | Whether to hide the value. |
| `hideThumb` | `boolean` | `false` |  | Whether to hide the thumb. |
| `disableAnimation` | `boolean` | `false` |  | Whether to disable the animation. |
| `startContent` | `ReactNode` |  |  | The content to display before the slider. |
| `endContent` | `ReactNode` |  |  | The content to display after the slider. |
| `tooltipProps` | `TooltipProps` |  |  | Props for the tooltip. |
| `classNames` | `object` |  |  | Allows to set custom class names for the slider slots. |
| `onChange` | `(value: number \| number[]) => void` |  |  | Handler that is called when the value changes. |
| `onChangeEnd` | `(value: number \| number[]) => void` |  |  | Handler that is called when the user stops dragging the slider. |

**Example:**
```typescript
export default function App() {
  const [value, setValue] = React.useState(25);
  const [rangeValue, setRangeValue] = React.useState([25, 75]);

  return (
    <div className="flex flex-col gap-6 max-w-md">
      <Slider
        label="Volume"
        value={value}
        onChange={setValue}
        step={1}
        maxValue={100}
        minValue={0}
        className="max-w-md"
      />

      <Slider
        label="Price Range"
        step={10}
        minValue={0}
        maxValue={1000}
        defaultValue={[100, 500]}
        formatOptions={{ style: "currency", currency: "USD" }}
        className="max-w-md"
        showTooltip={true}
      />

      <Slider
        label="Temperature"
        step={1}
        color="danger"
        showOutline={true}
        showSteps={true}
        minValue={0}
        maxValue={50}
        defaultValue={25}
        className="max-w-md"
        startContent={<Icon icon="lucide:thermometer" />}
        endContent={<Icon icon="lucide:flame" />}
      />

      <Slider
        label="Range Selection"
        step={1}
        value={rangeValue}
        onChange={setRangeValue}
        className="max-w-md"
      />
    </div>
  );
}
```

</details>
---

## Snippet

<details>
<summary>View details for Snippet</summary>

**Description:** Snippet is used to display code snippets with syntax highlighting.

**Import:**
```typescript
import { Snippet } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `children` | `string` |  |  | The code to display in the snippet. |
| `variant` | `string` | `flat` | `flat`, `bordered`, `shadow` | The variant of the snippet. |
| `color` | `string` | `default` | `default`, `primary`, `secondary`, `success`, `warning`, `danger` | The color of the snippet. |
| `size` | `string` | `md` | `sm`, `md`, `lg` | The size of the snippet. |
| `radius` | `string` | `md` | `none`, `sm`, `md`, `lg`, `full` | The border radius of the snippet. |
| `hideSymbol` | `boolean` | `false` |  | Whether to hide the symbol. |
| `symbol` | `ReactNode` |  |  | The symbol to display before the code. |
| `tooltipProps` | `TooltipProps` |  |  | Props for the tooltip. |
| `classNames` | `object` |  |  | Allows to set custom class names for the snippet slots. |
| `onCopy` | `() => void` |  |  | Handler that is called when the code is copied. |

**Example:**
```typescript
export default function App() {
  return (
    <div className="flex flex-col gap-4 max-w-md">
      <Snippet>
        npm install @heroui/react
      </Snippet>

      <Snippet variant="bordered" color="primary">
        yarn add @heroui/react
      </Snippet>

      <Snippet variant="shadow" color="secondary">
        pnpm add @heroui/react
      </Snippet>

      <Snippet
        hideSymbol
        variant="flat"
        color="success"
      >
        git clone https://github.com/example/repo.git
      </Snippet>

      <Snippet
        symbol="$"
        variant="flat"
        color="warning"
      >
        sudo apt-get update && sudo apt-get upgrade
      </Snippet>
    </div>
  );
}
```

</details>
---

## Spacer

<details>
<summary>View details for Spacer</summary>

**Description:** Spacer is used to add space between components.

**Import:**
```typescript
import { Spacer } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `x` | `number` |  |  | The horizontal space in units. |
| `y` | `number` |  |  | The vertical space in units. |
| `className` | `string` |  |  | The CSS class to apply to the spacer. |

**Example:**
```typescript
export default function App() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <Button size="sm">Button 1</Button>
        <Spacer x={4} />
        <Button size="sm">Button 2</Button>
        <Spacer x={8} />
        <Button size="sm">Button 3</Button>
      </div>

      <div>
        <p>First paragraph</p>
        <Spacer y={4} />
        <p>Second paragraph with more space between</p>
      </div>

      <div className="flex flex-col">
        <Card>
          <CardBody>
            <p>First card</p>
          </CardBody>
        </Card>
        <Spacer y={8} />
        <Card>
          <CardBody>
            <p>Second card with more space between</p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
```

</details>
---

## Spinner

<details>
<summary>View details for Spinner</summary>

**Description:** Spinner is used to indicate the loading state of a component or page.

**Import:**
```typescript
import { Spinner } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `color` | `string` | `primary` | `default`, `primary`, `secondary`, `success`, `warning`, `danger`, `current` | The color of the spinner. |
| `size` | `string` | `md` | `sm`, `md`, `lg` | The size of the spinner. |
| `labelColor` | `string` | `foreground` | `foreground`, `primary`, `secondary`, `success`, `warning`, `danger` | The color of the label. |
| `label` | `ReactNode` |  |  | The content to display as the label. |
| `labelPlacement` | `string` | `bottom` | `top`, `right`, `bottom`, `left` | The placement of the label. |
| `classNames` | `object` |  |  | Allows to set custom class names for the spinner slots. |

**Example:**
```typescript
export default function App() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-4">
        <Spinner color="default" />
        <Spinner color="primary" />
        <Spinner color="secondary" />
        <Spinner color="success" />
        <Spinner color="warning" />
        <Spinner color="danger" />
      </div>

      <div className="flex gap-4">
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
      </div>

      <div className="flex gap-4">
        <Spinner label="Loading..." />
        <Spinner label="Loading..." labelColor="primary" />
        <Spinner label="Loading..." labelColor="secondary" />
      </div>

      <div className="flex gap-4">
        <Spinner label="Loading..." labelPlacement="top" />
        <Spinner label="Loading..." labelPlacement="right" />
        <Spinner label="Loading..." labelPlacement="bottom" />
        <Spinner label="Loading..." labelPlacement="left" />
      </div>
    </div>
  );
}
```

</details>
---

## Switch

<details>
<summary>View details for Switch</summary>

**Description:** Switch is used to toggle between two states.

**Import:**
```typescript
import { Switch } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` |  |  | The label of the switch. |
| `color` | `string` | `primary` | `default`, `primary`, `secondary`, `success`, `warning`, `danger` | The color of the switch. |
| `size` | `string` | `md` | `sm`, `md`, `lg` | The size of the switch. |
| `isSelected` | `boolean` |  |  | Whether the element should be selected (controlled). |
| `defaultSelected` | `boolean` |  |  | Whether the element should be selected (uncontrolled). |
| `isRequired` | `boolean` | `false` |  | Whether user input is required on the switch before form submission. |
| `isReadOnly` | `boolean` | `false` |  | Whether the switch can be selected but not changed by the user. |
| `isDisabled` | `boolean` | `false` |  | Whether the switch is disabled. |
| `isInvalid` | `boolean` | `false` |  | Whether the switch is invalid. |
| `disableAnimation` | `boolean` | `false` |  | Whether the animation should be disabled. |
| `startContent` | `ReactNode` |  |  | The content to display before the switch. |
| `endContent` | `ReactNode` |  |  | The content to display after the switch. |
| `thumbIcon` | `ReactNode` |  |  | The icon to display in the thumb. |
| `classNames` | `object` |  |  | Allows to set custom class names for the switch slots. |
| `onChange` | `React.ChangeEvent<HTMLInputElement>` |  |  | Handler that is called when the element's selection state changes. |
| `onValueChange` | `(isSelected: boolean) => void` |  |  | Handler that is called when the element's selection state changes. |

**Example:**
```typescript
export default function App() {
  const [isSelected, setIsSelected] = React.useState(false);

  return (
    <div className="flex flex-col gap-4">
      <Switch
        isSelected={isSelected}
        onValueChange={setIsSelected}
      >
        Airplane Mode
      </Switch>
      <p className="text-default-500">
        Airplane mode is {isSelected ? "on" : "off"}
      </p>

      <div className="flex flex-col gap-2">
        <Switch size="sm">Small</Switch>
        <Switch size="md">Medium</Switch>
        <Switch size="lg">Large</Switch>
      </div>

      <div className="flex flex-col gap-2">
        <Switch color="default">Default</Switch>
        <Switch color="primary">Primary</Switch>
        <Switch color="secondary">Secondary</Switch>
        <Switch color="success">Success</Switch>
        <Switch color="warning">Warning</Switch>
        <Switch color="danger">Danger</Switch>
      </div>

      <div className="flex flex-col gap-2">
        <Switch
          startContent={<Icon icon="lucide:sun" />}
          endContent={<Icon icon="lucide:moon" />}
        >
          Dark Mode
        </Switch>
        <Switch
          thumbIcon={({ isSelected }) =>
            isSelected ? (
              <Icon icon="lucide:check" className="text-success" />
            ) : (
              <Icon icon="lucide:x" className="text-danger" />
            )
          }
        >
          With thumb icon
        </Switch>
      </div>
    </div>
  );
}
```

</details>
---

## Table

<details>
<summary>View details for Table</summary>

**Description:** Table is used to display data in a tabular format.

**Import:**
```typescript
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode[]` |  |  | The content of the table. Usually TableHeader and TableBody components. |
| `aria-label` | `string` |  |  | The accessible label for the table. |
| `color` | `string` | `default` | `default`, `primary`, `secondary`, `success`, `warning`, `danger` | The color of the table. |
| `layout` | `string` | `auto` | `auto`, `fixed` | The layout of the table. |
| `radius` | `string` | `md` | `none`, `sm`, `md`, `lg` | The border radius of the table. |
| `shadow` | `string` | `none` | `none`, `sm`, `md`, `lg` | The shadow of the table. |
| `selectionMode` | `string` | `none` | `none`, `single`, `multiple` | The selection mode of the table. |
| `selectionBehavior` | `string` | `toggle` | `toggle`, `replace` | The selection behavior of the table. |
| `isHeaderSticky` | `boolean` | `false` |  | Whether the header is sticky. |
| `isStriped` | `boolean` | `false` |  | Whether the table has striped rows. |
| `isCompact` | `boolean` | `false` |  | Whether the table is compact. |
| `hideHeader` | `boolean` | `false` |  | Whether to hide the header. |
| `disallowEmptySelection` | `boolean` | `false` |  | Whether to disallow empty selection. |
| `removeWrapper` | `boolean` | `false` |  | Whether to remove the wrapper element. |
| `topContent` | `ReactNode` |  |  | The content to display above the table. |
| `topContentPlacement` | `string` | `inside` | `inside`, `outside` | The placement of the top content. |
| `bottomContent` | `ReactNode` |  |  | The content to display below the table. |
| `bottomContentPlacement` | `string` | `inside` | `inside`, `outside` | The placement of the bottom content. |
| `sortDescriptor` | `SortDescriptor` |  |  | The sort descriptor (controlled). |
| `defaultSortDescriptor` | `SortDescriptor` |  |  | The default sort descriptor (uncontrolled). |
| `selectedKeys` | `Set<Key> \| Key[]` |  |  | The selected keys (controlled). |
| `defaultSelectedKeys` | `Set<Key> \| Key[]` |  |  | The default selected keys (uncontrolled). |
| `classNames` | `object` |  |  | Allows to set custom class names for the table slots. |
| `onSelectionChange` | `(keys: Selection) => void` |  |  | Handler that is called when the selection changes. |
| `onSortChange` | `(descriptor: SortDescriptor) => void` |  |  | Handler that is called when the sort changes. |
| `onRowAction` | `(key: Key) => void` |  |  | Handler that is called when a row is activated. |

**Example:**
```typescript
export default function App() {
  const columns = [
    { key: "name", label: "NAME" },
    { key: "role", label: "ROLE" },
    { key: "status", label: "STATUS" },
  ];

  const rows = [
    { key: "1", name: "Tony Stark", role: "CEO", status: "Active" },
    { key: "2", name: "Steve Rogers", role: "CTO", status: "Vacation" },
    { key: "3", name: "Bruce Banner", role: "Scientist", status: "Active" },
    { key: "4", name: "Natasha Romanoff", role: "Security", status: "Active" },
    { key: "5", name: "Thor Odinson", role: "Consultant", status: "Vacation" },
  ];

  const statusColorMap = {
    Active: "success",
    Vacation: "warning",
    Inactive: "danger",
  };

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        )}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.role}</TableCell>
            <TableCell>
              <Chip
                className="capitalize"
                color={statusColorMap[item.status]}
                size="sm"
                variant="flat"
              >
                {item.status}
              </Chip>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
```

</details>
---

## Tabs

<details>
<summary>View details for Tabs</summary>

**Description:** Tabs organize content into multiple sections and allow users to navigate between them.

**Import:**
```typescript
import { Tabs, Tab } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode[]` |  |  | The content of the tabs. Usually Tab components. |
| `aria-label` | `string` |  |  | The accessible label for the tabs. |
| `color` | `string` | `primary` | `default`, `primary`, `secondary`, `success`, `warning`, `danger` | The color of the tabs. |
| `variant` | `string` | `solid` | `solid`, `bordered`, `light`, `underlined` | The variant of the tabs. |
| `size` | `string` | `md` | `sm`, `md`, `lg` | The size of the tabs. |
| `radius` | `string` | `md` | `none`, `sm`, `md`, `lg`, `full` | The border radius of the tabs. |
| `selectedKey` | `Key` |  |  | The key of the selected tab (controlled). |
| `defaultSelectedKey` | `Key` |  |  | The key of the default selected tab (uncontrolled). |
| `disabledKeys` | `Set<Key> \| Key[]` |  |  | The keys of the disabled tabs. |
| `isDisabled` | `boolean` | `false` |  | Whether the tabs are disabled. |
| `fullWidth` | `boolean` | `false` |  | Whether the tabs should take the full width of their container. |
| `disableCursorAnimation` | `boolean` | `false` |  | Whether to disable the cursor animation. |
| `disableAnimation` | `boolean` | `false` |  | Whether to disable the animation. |
| `classNames` | `object` |  |  | Allows to set custom class names for the tabs slots. |
| `onSelectionChange` | `(key: Key) => void` |  |  | Handler that is called when the selected tab changes. |

**Example:**
```typescript
export default function App() {
  return (
    <div className="flex flex-col gap-8">
      <Tabs aria-label="Options">
        <Tab key="photos" title="Photos">
          <div className="p-4">
            <p>Photos content</p>
          </div>
        </Tab>
        <Tab key="music" title="Music">
          <div className="p-4">
            <p>Music content</p>
          </div>
        </Tab>
        <Tab key="videos" title="Videos">
          <div className="p-4">
            <p>Videos content</p>
          </div>
        </Tab>
      </Tabs>

      <Tabs
        aria-label="Options"
        color="primary"
        variant="underlined"
      >
        <Tab
          key="photos"
          title={
            <div className="flex items-center space-x-2">
              <Icon icon="lucide:image" />
              <span>Photos</span>
            </div>
          }
        >
          <div className="p-4">
            <p>Photos content</p>
          </div>
        </Tab>
        <Tab
          key="music"
          title={
            <div className="flex items-center space-x-2">
              <Icon icon="lucide:music" />
              <span>Music</span>
            </div>
          }
        >
          <div className="p-4">
            <p>Music content</p>
          </div>
        </Tab>
        <Tab
          key="videos"
          title={
            <div className="flex items-center space-x-2">
              <Icon icon="lucide:video" />
              <span>Videos</span>
            </div>
          }
        >
          <div className="p-4">
            <p>Videos content</p>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
```

</details>
---

## Textarea

<details>
<summary>View details for Textarea</summary>

**Description:** Textarea is a component that allows users to enter multiple lines of text.

**Import:**
```typescript
import { Textarea } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `label` | `ReactNode` |  |  | The content to display as the label. |
| `description` | `ReactNode` |  |  | A description for the textarea. |
| `errorMessage` | `ReactNode` |  |  | An error message for the textarea. |
| `placeholder` | `string` |  |  | The placeholder text to display in the textarea. |
| `value` | `string` |  |  | The current value (controlled). |
| `defaultValue` | `string` |  |  | The default value (uncontrolled). |
| `variant` | `string` | `flat` | `flat`, `bordered`, `underlined`, `faded` | The variant of the textarea. |
| `color` | `string` | `default` | `default`, `primary`, `secondary`, `success`, `warning`, `danger` | The color of the textarea. |
| `size` | `string` | `md` | `sm`, `md`, `lg` | The size of the textarea. |
| `radius` | `string` | `md` | `none`, `sm`, `md`, `lg`, `full` | The border radius of the textarea. |
| `labelPlacement` | `string` | `inside` | `inside`, `outside`, `outside-left` | The placement of the label. |
| `minRows` | `number` | `3` |  | The minimum number of rows to display. |
| `maxRows` | `number` |  |  | The maximum number of rows to display. |
| `isDisabled` | `boolean` | `false` |  | Whether the textarea is disabled. |
| `isReadOnly` | `boolean` | `false` |  | Whether the textarea is read-only. |
| `isRequired` | `boolean` | `false` |  | Whether the textarea is required. |
| `isInvalid` | `boolean` | `false` |  | Whether the textarea is invalid. |
| `disableAutosize` | `boolean` | `false` |  | Whether to disable the autosize feature. |
| `disableAnimation` | `boolean` | `false` |  | Whether to disable the animation. |
| `classNames` | `object` |  |  | Allows to set custom class names for the textarea slots. |
| `onChange` | `(e: React.ChangeEvent<HTMLTextAreaElement>) => void` |  |  | Handler that is called when the textarea value changes. |
| `onValueChange` | `(value: string) => void` |  |  | Handler that is called when the textarea value changes. |

**Example:**
```typescript
export default function App() {
  const [value, setValue] = React.useState("");

  return (
    <div className="flex flex-col gap-4 max-w-md">
      <Textarea
        label="Description"
        placeholder="Enter your description"
        value={value}
        onValueChange={setValue}
      />

      <p className="text-default-500">
        Character Count: {value.length}
      </p>

      <Textarea
        label="Comment"
        placeholder="Enter your comment"
        variant="bordered"
      />

      <Textarea
        label="Bio"
        placeholder="Enter your bio"
        variant="underlined"
      />

      <Textarea
        label="Feedback"
        placeholder="Enter your feedback"
        variant="faded"
        disableAnimation
        disableAutosize
        minRows={5}
        maxRows={10}
      />
    </div>
  );
}
```

</details>
---

## TimeInput

<details>
<summary>View details for TimeInput</summary>

**Description:** TimeInput allows users to enter a time using a text field.

**Import:**
```typescript
import { TimeInput } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `label` | `ReactNode` |  |  | The content to display as the label. |
| `description` | `ReactNode` |  |  | A description for the time input. |
| `errorMessage` | `ReactNode` |  |  | An error message for the time input. |
| `placeholder` | `string` |  |  | The placeholder text to display in the input. |
| `value` | `Time` |  |  | The current value (controlled). |
| `defaultValue` | `Time` |  |  | The default value (uncontrolled). |
| `variant` | `string` | `flat` | `flat`, `bordered`, `underlined`, `faded` | The variant of the time input. |
| `color` | `string` | `default` | `default`, `primary`, `secondary`, `success`, `warning`, `danger` | The color of the time input. |
| `size` | `string` | `md` | `sm`, `md`, `lg` | The size of the time input. |
| `radius` | `string` | `md` | `none`, `sm`, `md`, `lg`, `full` | The border radius of the time input. |
| `labelPlacement` | `string` | `inside` | `inside`, `outside`, `outside-left` | The placement of the label. |
| `isDisabled` | `boolean` | `false` |  | Whether the time input is disabled. |
| `isReadOnly` | `boolean` | `false` |  | Whether the time input is read-only. |
| `isRequired` | `boolean` | `false` |  | Whether the time input is required. |
| `isInvalid` | `boolean` | `false` |  | Whether the time input is invalid. |
| `disableAnimation` | `boolean` | `false` |  | Whether to disable the animation. |
| `classNames` | `object` |  |  | Allows to set custom class names for the time input slots. |
| `onChange` | `(time: Time) => void` |  |  | Handler that is called when the value changes. |

**Example:**
```typescript
import { parseTime } from "@internationalized/date";

export default function App() {
  const [time, setTime] = React.useState(parseTime("12:30"));

  return (
    <div className="flex flex-col gap-4 max-w-md">
      <TimeInput
        label="Appointment Time"
        placeholder="Enter a time"
        value={time}
        onChange={setTime}
      />

      <p className="text-default-500">
        Selected time: {time.toString()}
      </p>
    </div>
  );
}
```

</details>
---

## Tooltip

<details>
<summary>View details for Tooltip</summary>

**Description:** Tooltip displays informative text when users hover over, focus on, or tap an element.

**Import:**
```typescript
import { Tooltip } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` |  |  | The element that triggers the tooltip. |
| `content` | `ReactNode` |  |  | The content of the tooltip. |
| `color` | `string` | `default` | `default`, `primary`, `secondary`, `success`, `warning`, `danger`, `foreground` | The color of the tooltip. |
| `size` | `string` | `md` | `sm`, `md`, `lg` | The size of the tooltip. |
| `radius` | `string` | `md` | `none`, `sm`, `md`, `lg`, `full` | The border radius of the tooltip. |
| `placement` | `string` | `top` | `top`, `right`, `bottom`, `left`, `top-start`, `top-end`, `right-start`, `right-end`, `bottom-start`, `bottom-end`, `left-start`, `left-end` | The placement of the tooltip. |
| `delay` | `number` | `0` |  | The delay before showing the tooltip. |
| `closeDelay` | `number` | `0` |  | The delay before hiding the tooltip. |
| `offset` | `number` | `7` |  | The distance between the tooltip and the trigger. |
| `isOpen` | `boolean` |  |  | Whether the tooltip is open (controlled). |
| `defaultOpen` | `boolean` | `false` |  | Whether the tooltip is open by default (uncontrolled). |
| `isDisabled` | `boolean` | `false` |  | Whether the tooltip is disabled. |
| `showArrow` | `boolean` | `false` |  | Whether to show an arrow pointing to the trigger. |
| `motionProps` | `object` |  |  | Props for the motion component. |
| `classNames` | `object` |  |  | Allows to set custom class names for the tooltip slots. |
| `onOpenChange` | `(isOpen: boolean) => void` |  |  | Handler that is called when the open state changes. |

**Example:**
```typescript
export default function App() {
  return (
    <div className="flex flex-wrap gap-4">
      <Tooltip content="This is a tooltip">
        <Button>Hover me</Button>
      </Tooltip>

      <Tooltip
        content="This tooltip has an arrow"
        placement="right"
        showArrow
      >
        <Button>With Arrow</Button>
      </Tooltip>

      <div className="flex gap-4">
        <Tooltip content="Default tooltip" color="default">
          <Button color="default">Default</Button>
        </Tooltip>
        <Tooltip content="Primary tooltip" color="primary">
          <Button color="primary">Primary</Button>
        </Tooltip>
        <Tooltip content="Secondary tooltip" color="secondary">
          <Button color="secondary">Secondary</Button>
        </Tooltip>
        <Tooltip content="Success tooltip" color="success">
          <Button color="success">Success</Button>
        </Tooltip>
        <Tooltip content="Warning tooltip" color="warning">
          <Button color="warning">Warning</Button>
        </Tooltip>
        <Tooltip content="Danger tooltip" color="danger">
          <Button color="danger">Danger</Button>
        </Tooltip>
      </div>
    </div>
  );
}
```

</details>
---

## User

<details>
<summary>View details for User</summary>

**Description:** User is used to display a user's avatar, name, and description.

**Import:**
```typescript
import { User } from "@heroui/react";
```

**Props:**

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| `name` | `string` |  |  | The name of the user. |
| `description` | `ReactNode` |  |  | A description for the user. |
| `avatarProps` | `AvatarProps` |  |  | Props for the avatar component. |
| `classNames` | `object` |  |  | Allows to set custom class names for the user slots. |

**Example:**
```typescript
export default function App() {
  return (
    <div className="flex flex-col gap-4">
      <User
        name="Jane Doe"
        description="Product Designer"
        avatarProps={{
          src: "https://img.heroui.chat/image/avatar?w=150&h=150&u=1"
        }}
      />

      <User
        name="John Smith"
        description={<Link href="#">@johnsmith</Link>}
        avatarProps={{
          src: "https://img.heroui.chat/image/avatar?w=150&h=150&u=2"
        }}
      />

      <User
        name="Alice Johnson"
        description="Developer"
        avatarProps={{
          name: "Alice Johnson",
          color: "primary"
        }}
      />

      <User
        name="Bob Brown"
        description="UI/UX Designer"
        avatarProps={{
          icon: <Icon icon="lucide:user" />
        }}
      />
    </div>
  );
}
```

</details>
---
