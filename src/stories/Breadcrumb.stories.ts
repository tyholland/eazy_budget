import Breadcrumb from "../components/Breadcrumb/Breadcrumb.tsx";
import {
  withRouter,
  reactRouterParameters,
} from "storybook-addon-remix-react-router";

export default {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  decorators: [withRouter],
  parameters: {
    layout: "centered",
    reactRouter: reactRouterParameters({
      location: {
        pathParams: { type: "income", month: "january", year: "2025" },
      },
      routing: { path: "/create/:type/:month/:year" },
    }),
  },
  tags: ["autodocs"],
};

export const Primary = {
  args: {},
};
