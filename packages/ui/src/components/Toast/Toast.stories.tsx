import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Toast,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
} from "./Toast.web";

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  render: () => (
    <ToastProvider>
      <Toast open>
        <ToastTitle>Notification</ToastTitle>
        <ToastDescription>
          Your changes have been saved successfully.
        </ToastDescription>
      </Toast>
      <ToastViewport />
    </ToastProvider>
  ),
};
