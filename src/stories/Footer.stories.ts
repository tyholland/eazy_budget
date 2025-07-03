import Footer from "../views/Footer/Footer.tsx";
import { withRouter } from "storybook-addon-remix-react-router";

const FooterStory = {
  title: "Views/Footer",
  component: Footer,
  decorators: [withRouter],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const Primary = {
  args: {},
};

export default FooterStory;
