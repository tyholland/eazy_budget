import mixpanel from "mixpanel-browser";
import { getCurrentPageName } from "./helper.ts";

mixpanel.init(process.env.REACT_APP_MIXPANEL_TOKEN || "", {
  debug: true,
  track_pageview: false,
  persistence: "localStorage",
  autocapture: false,
});

export const trackIdentity = (
  sub_id: number,
  auth_id?: string,
  email?: string,
) => {
  if (process.env.NODE_ENV === "development") {
    console.log("trackIdentity", {
      identify: auth_id,
      people: {
        $email: email,
        subscription: sub_id,
      },
    });

    return null;
  }

  mixpanel.identify(auth_id);

  mixpanel.people.set({
    $email: email,
    subscription: sub_id,
  });
};

export const trackEvent = (eventName: string, eventProperties?: Object) => {
  if (process.env.NODE_ENV === "development") {
    console.log("trackEvent", {
      eventName,
      eventProperties,
    });

    return null;
  }

  mixpanel.track(eventName, eventProperties);
};

export const trackPage = (path: string) => {
  const pageTitle = getCurrentPageName(path).pageName;

  if (process.env.NODE_ENV === "development") {
    console.log("trackPage", {
      eventName: "Page View",
      eventProperties: { title: pageTitle },
    });

    return null;
  }

  mixpanel.track("Page View", { title: pageTitle });
};
