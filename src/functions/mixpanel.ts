import mixpanel from "mixpanel-browser";

mixpanel.init(process.env.REACT_APP_MIXPANEL_TOKEN || "", {
  debug: true,
  track_pageview: true,
  persistence: "localStorage",
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
