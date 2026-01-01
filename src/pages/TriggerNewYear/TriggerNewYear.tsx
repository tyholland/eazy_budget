import React, { useEffect } from "react";
import Overview from "../../views/Overview/Overview.tsx";
import * as S from "./triggerNewYear.style.ts";
import { useAtomValue } from "jotai";
import { budgetAtom } from "../../hook/BudgetAtom.ts";
import { getYearlyTotalAmount } from "../../functions/budget.ts";
import { getDateInfo } from "../../functions/helper.ts";
import { BudgetData } from "../../types.ts";
import SadIcon from "../../svg/SadIcon.tsx";
import moment from "moment-business-days";
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
