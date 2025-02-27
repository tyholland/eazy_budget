import React from "react";
import { useLocation } from "react-router-dom";
import { getCurrentPageName } from "../../functions/helper.ts";
import * as S from "./breadcrumb.style.ts";

const Breadcrumb = () => {
  const { pathname } = useLocation();

  if (pathname === "/") {
    return <></>;
  }

  const page = pathname.split("/");
  const currentPage = getCurrentPageName(`/${page[1]}/${page[2]}`);

  return (
    <S.Wrapper>
      <S.GreyedOut>
        <a href="/" aria-label="Overview">
          Overview
        </a>
      </S.GreyedOut>
      <S.GreyedOut>&gt;</S.GreyedOut>
      <div>{currentPage}</div>
    </S.Wrapper>
  );
};

export default Breadcrumb;
