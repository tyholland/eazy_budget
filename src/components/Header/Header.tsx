import React, { useEffect } from "react";
import * as S from "./header.style.ts";
import UserIcon from "../../svg/UserIcon.tsx";
import Link from "../Link/Link.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../Button/Button.tsx";
import { useLocation } from "react-router-dom";
import { trackPage } from "../../functions/mixpanel.ts";

const Header = () => {
  const { user, loginWithRedirect } = useAuth0();
  const location = useLocation();

  useEffect(() => {
    trackPage(location.pathname);
  }, [location]);

  return (
    <S.HeaderWrapper>
      <S.Title>
        <Link label="Simple Budgeting" url={user?.picture ? "/overview" : "/"}>
          Simple Budgeting
        </Link>
      </S.Title>
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
    </S.HeaderWrapper>
  );
};

export default Header;
