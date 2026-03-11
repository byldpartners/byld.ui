import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./Form.web";

const meta = {
  title: "Components/Form",
  component: Form,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Form style={{ width: 350 }}>
      <FormField name="username">
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <input
              type="text"
              placeholder="Enter your username"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </FormControl>
          <FormDescription>
            This is your public display name.
          </FormDescription>
        </FormItem>
      </FormField>

      <FormField name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </FormControl>
          <FormDescription>
            We will never share your email.
          </FormDescription>
        </FormItem>
      </FormField>
    </Form>
  ),
};

export const WithError: Story = {
  render: () => (
    <Form style={{ width: 350 }}>
      <FormField name="username">
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <input
              type="text"
              placeholder="Enter your username"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </FormControl>
          <FormDescription>
            This is your public display name.
          </FormDescription>
          <FormMessage>Username must be at least 3 characters.</FormMessage>
        </FormItem>
      </FormField>
    </Form>
  ),
};
