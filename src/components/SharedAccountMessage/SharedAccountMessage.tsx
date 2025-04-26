import React, { useState } from "react";
import * as S from "./sharedAccountMessage.style.ts";
import { useAtom } from "jotai";
import { userAtom } from "../../hook/UserAtom.ts";
import { useAuth0 } from "@auth0/auth0-react";
import { shareAccountDecision } from "../../requests/users.ts";
import Button from "../Button/Button.tsx";

const SharedAccountMessage = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [currentUser, setCurrentUser] = useAtom(userAtom);
  const [hasMessage, setHasMessage] = useState<boolean | undefined>(
    currentUser?.connected_message,
  );
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const handleConnectedAccount = async (decision: boolean) => {
    setIsDisabled(true);

    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.REACT_APP_AUDIENCE,
        },
      });

      await shareAccountDecision(accessToken, {
        decision,
        connected_id: currentUser?.connected_id,
      });

      setHasMessage(false);
      currentUser &&
        setCurrentUser({
          ...currentUser,
          connected_message: false,
        });
    } catch (err) {
      setIsDisabled(false);
      console.error(err);
    }
  };

  return (
    <>
      {hasMessage && (
        <S.SharedWrapper>
          User "{currentUser?.primary_request}" has invited you to connect to
          their account and view their budget.
          <S.SharedBtnWrapper>
            <Button
              buttonSize="small"
              handleClick={() => handleConnectedAccount(true)}
              disabled={isDisabled}
            >
              Accept
            </Button>
            <Button
              buttonSize="small"
              handleClick={() => handleConnectedAccount(false)}
              classType="exit"
              disabled={isDisabled}
            >
              Decline
            </Button>
          </S.SharedBtnWrapper>
        </S.SharedWrapper>
      )}
    </>
  );
};

export default SharedAccountMessage;
