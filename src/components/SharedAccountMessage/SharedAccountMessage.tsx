import React, { useState } from "react";
import * as S from "./sharedAccountMessage.style.ts";
import { useAtom } from "jotai";
import { userAtom } from "../../hook/UserAtom.ts";
import { useAuth0 } from "@auth0/auth0-react";
import { shareAccountDecision } from "../../requests/users.ts";
import Button from "../Button/Button.tsx";
import { trackError } from "../../functions/mixpanel.ts";
import SessionExpired from "../SessionExpired/SessionExpired.tsx";

interface SharedAccountMessageProps {
  setHasMessage: (val: boolean) => void;
}

const SharedAccountMessage = ({ setHasMessage }: SharedAccountMessageProps) => {
  const { getAccessTokenSilently } = useAuth0();
  const [currentUser, setCurrentUser] = useAtom(userAtom);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isSessionExpired, setIsSessionExpired] = useState<boolean>(false);

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
      window.location.reload();
    } catch (err) {
      setIsDisabled(false);
      trackError("SharedAccountMessage - handleConnectedAccount:", {
        result: err,
      });

      if (
        err.error === "login_required" ||
        err.error === "consent_required" ||
        err.error === "invalid_grant"
      ) {
        setIsSessionExpired(true);
      }
    }
  };

  return (
    <S.SharedWrapper>
      User "{currentUser?.primary_request}" has invited you to connect to their
      account and view their budget.
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
      <SessionExpired
        isOpen={isSessionExpired}
        closeModal={setIsSessionExpired}
      />
    </S.SharedWrapper>
  );
};

export default SharedAccountMessage;
