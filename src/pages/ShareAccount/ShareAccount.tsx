import React, { ChangeEvent, useEffect, useState } from "react";
import Input from "../../components/Input/Input.tsx";
import * as S from "./shareAccount.style.ts";
import Button from "../../components/Button/Button.tsx";
import {
  checkIsExpiredSession,
  getSubscriptionStatus,
  loggedInHomepage,
} from "../../functions/helper.ts";
import { useAtomValue } from "jotai";
import { userAtom } from "../../hook/UserAtom.ts";
import { useNavigate } from "react-router-dom";
import { shareAccount } from "../../requests/users.ts";
import { useAuth0 } from "@auth0/auth0-react";
import SaveIcon from "../../svg/SaveIcon.tsx";
import { trackError, trackEvent } from "../../functions/mixpanel.ts";
import SessionExpired from "../../components/SessionExpired/SessionExpired.tsx";

const ShareAccount = () => {
  const currentUser = useAtomValue(userAtom);
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const [userEmail, setUserEmail] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [showComplete, setShowComplete] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isSessionExpired, setIsSessionExpired] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
    setHasError(false);
  };

  const submitEmail = async () => {
    setIsDisabled(true);

    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.REACT_APP_AUDIENCE,
        },
      });

      const results = await shareAccount(accessToken, { email: userEmail });

      if (results.success) {
        setShowComplete(true);
        trackEvent("Shared Account with Another");
      } else {
        setIsDisabled(false);
        setHasError(true);
      }
    } catch (err) {
      setIsDisabled(false);
      setHasError(true);
      trackError("ShareAccount - submitEmail:", { result: err });

      if (checkIsExpiredSession(err)) {
        setIsSessionExpired(true);
      }
    }
  };

  useEffect(() => {
    if (
      currentUser &&
      !getSubscriptionStatus("Pro", currentUser?.subscription_id)
    ) {
      navigate(loggedInHomepage());
    }
  }, []);

  useEffect(() => {
    setIsDisabled(!userEmail);
  }, [userEmail]);

  return (
    <S.Wrapper>
      <S.Content>
        <S.Header>
          You may grant access to your budgeting information to one active
          account.
        </S.Header>
        <span>
          Once the access request is sent and accepted by the recipient, both
          users will have the ability to view and edit the same budgeting
          information.
        </span>
        <span>
          <strong>Please note:</strong> This access only allows the other user
          to view and manage your budget. It does not provide you with access to
          their budgeting information.
        </span>
      </S.Content>
      <S.ShareWrapper>
        {!showComplete && (
          <>
            <Input
              label="email"
              labelValue="User's Email:"
              onChange={handleChange}
              placeHolder="Enter user's email"
              inputType="text"
            />
            {hasError && (
              <S.ErrorMsg>
                The email address you have entered doesn't exist on this
                platform.
                <br />
                Please try again
              </S.ErrorMsg>
            )}
            <Button
              buttonSize="medium"
              handleClick={submitEmail}
              disabled={isDisabled}
            >
              Share Account
            </Button>
          </>
        )}
        {showComplete && (
          <S.Confirmed>
            <SaveIcon /> Your request has been sent to {userEmail}.<br />
            Please wait for them to accept your request.
          </S.Confirmed>
        )}
      </S.ShareWrapper>
      <SessionExpired
        isOpen={isSessionExpired}
        closeModal={setIsSessionExpired}
      />
    </S.Wrapper>
  );
};

export default ShareAccount;
