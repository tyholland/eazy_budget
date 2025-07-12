import mixpanel from "mixpanel-browser";

mixpanel.init(process.env.REACT_APP_MIXPANEL_TOKEN || "", {
  debug: true,
  track_pageview: true,
  persistence: "localStorage",
  autocapture: true,
});

export const trackIdentity = (
  sub_id: number,
  auth_id?: string,
  email?: string,
) => {
  mixpanel.identify(auth_id);

  mixpanel.people.set({
    $email: email,
    subscription: sub_id,
  });
};

export const trackEvent = (eventName: string, eventProperties?: Object) => {
  mixpanel.track(eventName, eventProperties);
};
