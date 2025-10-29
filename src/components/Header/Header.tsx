import React, { useEffect, useState } from "react";
import * as S from "./header.style.ts";
import UserIcon from "../../svg/UserIcon.tsx";
import Link from "../Link/Link.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../Button/Button.tsx";
import { useLocation } from "react-router-dom";
import { trackPage } from "../../functions/mixpanel.ts";
import { useAtom, useSetAtom } from "jotai";
import { userAtom } from "../../hook/UserAtom.ts";
import { budgetAtom } from "../../hook/BudgetAtom.ts";
import { addUser, getBudgetInfo } from "../../functions/user.ts";
import { nonPrivatePages } from "../../constants.ts";
import { loggedInHomepage } from "../../functions/helper.ts";

const Header = () => {
  const auth = useAuth0();
  const { user, loginWithRedirect } = auth;
  const location = useLocation();
  const setBudget = useSetAtom(budgetAtom);
  const [currentUser, setCurrentUser] = useAtom(userAtom);
  const [hasBudget, setHasBudget] = useState<boolean>(false);

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
    <S.HeaderWrapper>
      <S.Title>
        <Link
          label="Simple Budgeting"
          url={user?.picture ? loggedInHomepage() : "/"}
        >
          Simple Budgeting
        </Link>
      </S.Title>
      <S.HeaderLinks>
        <Link url={"/partner"} label={"Partner with Us"} classType="partner">
          Partner with Us
        </Link>
        {user?.picture ? (
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
        ) : (
          <Button classType="text" handleClick={loginWithRedirect}>
            <>
              <UserIcon />
              Sign In
            </>
          </Button>
        )}
      </S.HeaderLinks>
    </S.HeaderWrapper>
  );
};

export default Header;
