import Breadcrumb from "../components/Breadcrumb/Breadcrumb.tsx";
import {
  withRouter,
  reactRouterParameters,
} from "storybook-addon-remix-react-router";

const BreadcrumbStory = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  decorators: [withRouter],
  parameters: {
    layout: "centered",
    reactRouter: reactRouterParameters({
      location: {
        pathParams: { type: "income", month: "january", year: "2025" },
      },
      routing: { path: "/add/:type/:month/:year" },
    }),
  },
  tags: ["autodocs"],
};

export const Primary = {
  args: {},
};

export default BreadcrumbStory;
