import { useAtomValue } from "jotai";
import React, { useEffect } from "react";
import { userAtom } from "../../hook/UserAtom.ts";
import { useAuth0 } from "@auth0/auth0-react";

const Ad = () => {
  const currentUser = useAtomValue(userAtom);
  const auth = useAuth0();
  const { isLoading, user } = auth;

  const addBannerScript = () => {
    const adScript = document.createElement("script");

    adScript.setAttribute("id", "banner-ads");
    adScript.append(
      `(s=>{s.dataset.zone=9806059,s.src='https://vemtoutcheeg.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`,
    );

    document.head.appendChild(adScript);
  };

  /**
   * Bring this back when the site becomes more popular
   */
  // const addPageScript = () => {
  //   const adScript = document.createElement("script");

  //   adScript.setAttribute("id", "page-ads");
  //   adScript.append(
  //     `(s=>{s.dataset.zone=9806162,s.src='https://gizokraijaw.net/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`,
  //   );

  //   document.head.appendChild(adScript);
  // };

  useEffect(() => {
    if (!isLoading && process.env.NODE_ENV !== "development") {
      if ((currentUser && currentUser.subscription_id === 2) || !user) {
        addBannerScript();
      }
    }
  }, [isLoading, currentUser]);

  return <></>;
};

export default Ad;
