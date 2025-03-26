import Header from "../components/Header/Header.tsx";
import { withRouter } from "storybook-addon-remix-react-router";

const HeaderStory = {
  title: "Components/Header",
  component: Header,
  decorators: [withRouter],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const Primary = {
  args: {},
};

export default HeaderStory;
