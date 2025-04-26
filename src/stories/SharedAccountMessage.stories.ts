import { fn } from "@storybook/test";
import SharedAccountMessage from "../components/SharedAccountMessage/SharedAccountMessage.tsx";

const SharedAccountMessageStory = {
  title: "Components/SharedAccountMessage",
  component: SharedAccountMessage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { setHasMessage: fn() },
};

export const Primary = {
  args: {},
};

export default SharedAccountMessageStory;
