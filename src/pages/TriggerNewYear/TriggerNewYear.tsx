import React, { useEffect } from "react";
import * as S from "./triggerNewYear.style.ts";
import { getDateInfo } from "../../functions/helper.ts";
import { useAuth0 } from "@auth0/auth0-react";
import { getTriggerNewYear } from "../../requests/budget.ts";
import { trackError } from "../../functions/mixpanel.ts";

const TriggerNewYear = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { currentMonth } = getDateInfo();
  const isDecember = currentMonth === "december";

  const setNewYear = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.REACT_APP_AUDIENCE,
        },
      });

      await getTriggerNewYear(accessToken);
    } catch (err) {
      trackError("TriggerNewYear - setNewYear:", { result: err });
    }
  };

  useEffect(() => {
    if (!isDecember) {
      setNewYear();
    }
  }, []);

  return (
    <S.Wrapper>
      {isDecember ? (
        <div>Trigger has been sent</div>
      ) : (
        <div>Nothing to see here</div>
      )}
    </S.Wrapper>
  );
};

export default TriggerNewYear;
