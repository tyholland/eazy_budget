import React, { useEffect, useState } from "react";
import * as S from "./header.style.ts";
import UserIcon from "../../svg/UserIcon.tsx";
import Link from "../Link/Link.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../Button/Button.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { trackPage } from "../../functions/mixpanel.ts";
import { useAtom, useSetAtom } from "jotai";
import { userAtom } from "../../hook/UserAtom.ts";
import { budgetAtom } from "../../hook/BudgetAtom.ts";
import { addUser, getBudgetInfo } from "../../functions/user.ts";
import { nonPrivatePages } from "../../constants.ts";
import { loggedInHomepage } from "../../functions/helper.ts";
import ModalComponent from "../Modal/Modal.tsx";
import MedalProgress from "../MedalProgress/MedalProgress.tsx";

const Header = () => {
  const auth = useAuth0();
  const { user, loginWithRedirect } = auth;
  const location = useLocation();
  const navigate = useNavigate();
  const setBudget = useSetAtom(budgetAtom);
  const [currentUser, setCurrentUser] = useAtom(userAtom);
  const [hasBudget, setHasBudget] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!currentUser && nonPrivatePages.includes(location.pathname)) {
      user && addUser(auth, setCurrentUser, setHasBudget);
    }
  }, [user]);

  useEffect(() => {
    if (hasBudget) {
      getBudgetInfo(setBudget, auth);
    }
  }, [hasBudget]);

  useEffect(() => {
    trackPage(location.pathname);
  }, [location]);

  return (
    <>
      <S.HeaderWrapper>
        <S.Title>
          <Link
            label="Simple Budgeting"
            url={user?.picture ? loggedInHomepage(currentUser) : "/"}
          >
            Simple Budgeting
          </Link>
        </S.Title>
        <S.HeaderLinks>
          {user?.picture ? (
            <>
              <Button classType="text" handleClick={() => setIsOpen(true)}>
                Budget Progress
              </Button>
              <Link url={"/account"} label={"Account"}>
                <>
                  <img
                    src={user?.picture}
                    alt="logged in user"
                    title="Logged in user"
                    aria-label="Logged in user"
                  />
                  Account
                </>
              </Link>
            </>
          ) : (
            <>
              <Link
                url={"/partner"}
                label={"Partner with Us"}
                classType="partner"
              >
                Partner with Us
              </Link>
              <Button classType="text" handleClick={loginWithRedirect}>
                <>
                  <UserIcon />
                  Sign In
                </>
              </Button>
            </>
          )}
        </S.HeaderLinks>
      </S.HeaderWrapper>
      <ModalComponent isOpen={isOpen} title="Budget Progress" size="medium">
        <S.ModalWrapper>
          <MedalProgress />
          <S.ModalBtn>
            <Button
              buttonSize="small"
              handleClick={() => {
                setIsOpen(false);
                navigate("/account");
              }}
            >
              Learn more
            </Button>
            <Button
              buttonSize="small"
              handleClick={() => setIsOpen(false)}
              classType="exit"
            >
              Close
            </Button>
          </S.ModalBtn>
        </S.ModalWrapper>
      </ModalComponent>
    </>
  );
};

export default Header;
