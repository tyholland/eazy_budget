import React from "react";
import * as S from "./breadcrumb.style.ts";
import Link from "../Link/Link.tsx";
import { useLocation } from "react-router-dom";
import { getCurrentPageName } from "../../functions/helper.ts";
import { noBreadCrumbList } from "../../constants.ts";
import BannerBtn from "../BannerBtn/BannerBtn.tsx";
import { useAtomValue } from "jotai";
import { userAtom } from "../../hook/UserAtom.ts";

const Breadcrumb = () => {
  const currentUser = useAtomValue(userAtom);
  const { pathname } = useLocation();
  const page = pathname.split("/");
  const { pageName, page2Name } = getCurrentPageName(pathname);
  const isMonthly = pathname.includes("monthly");
  const isAccount = pathname.includes("/account/");

  if (noBreadCrumbList.includes(pathname)) {
    return <></>;
  }

  return (
    <>
      <S.Wrapper>
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
      {((currentUser && !currentUser.hasBudget) || isAccount) && (
        <BannerBtn url="/setup" label="Add your Budget info!!!" />
      )}
    </>
  );
};

export default Breadcrumb;
