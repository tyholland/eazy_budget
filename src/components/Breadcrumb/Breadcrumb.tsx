import React from "react";
import * as S from "./breadcrumb.style.ts";
import Link from "../Link/Link.tsx";
import { useLocation } from "react-router-dom";
import { getCurrentPageName } from "../../functions/helper.ts";

const Breadcrumb = () => {
  const { pathname } = useLocation();
  const page = pathname.split("/");
  const { pageName, page2Name } = getCurrentPageName(pathname);
  const isMonthly = pathname.includes("monthly");
  const isAccount = pathname.includes("/account/");
  const noBreadCrumbList = [
    "/",
    "/overview",
    "/pricing",
    "/about",
    "/privacy",
    "/contact",
  ];

  if (noBreadCrumbList.includes(pathname)) {
    return <></>;
  }

  return (
    <S.Wrapper>
      <S.GreyedOut>
        <Link url="/overview" label="Overview">
          Overview
        </Link>
      </S.GreyedOut>
      <S.GreyedOut>&gt;</S.GreyedOut>
      {isMonthly && (
        <>
          <S.GreyedOut>
            <Link url={`/yearly/${page[2]}/${page[4]}`} label={page2Name}>
              {page2Name}
            </Link>
          </S.GreyedOut>
          <S.GreyedOut>&gt;</S.GreyedOut>
        </>
      )}
      {isAccount && (
        <>
          <S.GreyedOut>
            <Link url={`/account`} label={page2Name}>
              {page2Name}
            </Link>
          </S.GreyedOut>
          <S.GreyedOut>&gt;</S.GreyedOut>
        </>
      )}
      <div>{pageName}</div>
    </S.Wrapper>
  );
};

export default Breadcrumb;
