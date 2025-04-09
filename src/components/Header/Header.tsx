import React from "react";
import * as S from "./header.style.ts";
import UserIcon from "../../svg/UserIcon.tsx";
import Link from "../Link/Link.tsx";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { user } = useAuth0();

  return (
    <S.HeaderWrapper>
      <S.Title>Easy Budgeting</S.Title>
      <Link url={user ? "/account" : "/"} label={user ? "Account" : "Login"}>
        {user?.picture ? (
          <img
            src={user?.picture}
            alt="Logged in user"
            title="Logged in user"
            aria-label="Logged in user"
          />
        ) : (
          <UserIcon />
        )}
      </Link>
    </S.HeaderWrapper>
  );
};

export default Header;
