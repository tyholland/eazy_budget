import React from "react";
import * as S from "./header.style.ts";
import UserIcon from "../../svg/UserIcon.tsx";
import Link from "../Link/Link.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../Button/Button.tsx";

const Header = () => {
  const { user, loginWithRedirect } = useAuth0();

  return (
    <S.HeaderWrapper>
      <S.Title>Simple Budgeting</S.Title>
      {user?.picture ? (
        <Link url={"/account"} label={"Account"}>
          <img
            src={user?.picture}
            alt="logged in user"
            title="Logged in user"
            aria-label="Logged in user"
          />
        </Link>
      ) : (
        <Button classType="text" handleClick={loginWithRedirect}>
          <UserIcon />
        </Button>
      )}
    </S.HeaderWrapper>
  );
};

export default Header;
