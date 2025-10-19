import React from "react";
import ModalComponent from "../Modal/Modal.tsx";
import Button from "../Button/Button.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import * as S from "./sessionExpired.style.ts";

interface SessionExpiredProps {
  closeModal: (val: boolean) => void;
  isOpen: boolean;
}

const SessionExpired = ({ closeModal, isOpen }: SessionExpiredProps) => {
  const { logout, loginWithRedirect } = useAuth0();

  const signIn = () => {
    closeModal(true);
    loginWithRedirect();
  };

  const logOutAccount = () => {
    closeModal(true);
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <ModalComponent isOpen={isOpen} title={`Session Expired`}>
      <S.ModalWrapper>
        <span>Your session has expired. Please sign in again to continue.</span>
        <S.ModalBtn>
          <Button
            buttonSize="small"
            handleClick={logOutAccount}
            classType="register"
          >
            Stay Logged Out
          </Button>
          <Button buttonSize="small" handleClick={signIn}>
            Sign In
          </Button>
        </S.ModalBtn>
      </S.ModalWrapper>
    </ModalComponent>
  );
};

export default SessionExpired;
