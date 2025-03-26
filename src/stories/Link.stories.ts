import Link from "../components/Link/Link.tsx";
import { withRouter } from "storybook-addon-remix-react-router";

const LinkStory = {
  title: "Components/Link",
  component: Link,
  decorators: [withRouter],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const Primary = {
  args: {
    url: "/",
    label: "Overview",
    children: "Overview",
  },
};

export default LinkStory;
