import React, { ChangeEvent, useEffect, useState } from "react";
import Input from "../../components/Input/Input.tsx";
import * as S from "./shareAccount.style.ts";
import Button from "../../components/Button/Button.tsx";
import { getSubscriptionStatus } from "../../functions/helper.ts";
import { useAtomValue } from "jotai";
import { userAtom } from "../../hook/UserAtom.ts";
import { useNavigate } from "react-router-dom";
import { shareAccount } from "../../requests/users.ts";
import { useAuth0 } from "@auth0/auth0-react";

const ShareAccount = () => {
  const currentUser = useAtomValue(userAtom);
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const [userEmail, setUserEmail] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
  };

  const submitEmail = async () => {
    setIsDisabled(true);

    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.REACT_APP_AUDIENCE,
        },
      });

      await shareAccount(accessToken, { email: userEmail });
    } catch (err) {
      setIsDisabled(false);
      console.error("ShareAccount - submitEmail:", err);
    }
  };

  useEffect(() => {
    if (
      currentUser &&
      !getSubscriptionStatus("Pro", currentUser?.subscription_id)
    ) {
      navigate("/overview");
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
        <Input
          label="email"
          labelValue="User's Email:"
          onChange={handleChange}
          placeHolder="Enter user's email"
          inputType="text"
        />
        <Button
          buttonSize="medium"
          handleClick={submitEmail}
          disabled={isDisabled}
        >
          Share Account
        </Button>
      </S.ShareWrapper>
    </S.Wrapper>
  );
};

export default ShareAccount;
