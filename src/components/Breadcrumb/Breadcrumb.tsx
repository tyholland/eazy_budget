import React from "react";
import * as S from "./breadcrumb.style.ts";
import Link from "../Link/Link.tsx";
import { useLocation } from "react-router-dom";
import { getCurrentPageName } from "../../functions/helper.ts";

const Breadcrumb = () => {
  const { pathname } = useLocation();
  const page = pathname.split("/");
  const pageName = getCurrentPageName(`/${page[1]}/${page[2]}`);

  if (pathname === "/") {
    return <></>;
  }

  return (
    <S.Wrapper>
      <S.GreyedOut>
        <Link url="/" label="Overview">
          Overview
        </Link>
      </S.GreyedOut>
      <S.GreyedOut>&gt;</S.GreyedOut>
      <div>{pageName}</div>
    </S.Wrapper>
  );
};

export default Breadcrumb;
