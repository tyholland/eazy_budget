import React from "react";
import * as S from "./breadcrumb.style.ts";
import Link from "../Link/Link.tsx";
import { useLocation } from "react-router-dom";
import { getCurrentPageName } from "../../functions/helper.ts";

const Breadcrumb = () => {
  const { pathname } = useLocation();
  const page = pathname.split("/");
  const pageName = getCurrentPageName(`/${page[1]}/${page[2]}`);
  const isMonthly = pathname.includes("monthly");
  const page2Name = isMonthly ? getCurrentPageName(`/yearly/${page[2]}`) : "";

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
      <div>{pageName}</div>
    </S.Wrapper>
  );
};

export default Breadcrumb;
