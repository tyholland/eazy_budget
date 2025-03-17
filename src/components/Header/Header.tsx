import React from "react";
import * as S from "./header.style.ts";
import UserIcon from "../../svg/UserIcon.tsx";
import { useAtomValue } from "jotai";
import { userAtom } from "../../hook/UserAtom.ts";

const Header = () => {
  const user = useAtomValue(userAtom);

  return (
    <S.HeaderWrapper>
      <S.Title>Eazy Budgeting</S.Title>
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
    </S.HeaderWrapper>
  );
};

export default Header;
