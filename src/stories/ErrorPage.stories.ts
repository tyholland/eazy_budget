import ErrorPage from "../views/ErrorPage/ErrorPage.tsx";
import { withRouter } from "storybook-addon-remix-react-router";

const ErrorPageStory = {
  title: "Views/ErrorPage",
  component: ErrorPage,
  decorators: [withRouter],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const Primary = {
  args: {},
};

export default ErrorPageStory;
