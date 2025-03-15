import React from "react";
import * as S from "./header.style.ts";
import UserIcon from "../../svg/UserIcon.tsx";

const Header = () => {
  return (
    <S.HeaderWrapper>
      <S.Title>Eazy Budgeting</S.Title>
      <UserIcon />
    </S.HeaderWrapper>
  );
};

export default Header;
