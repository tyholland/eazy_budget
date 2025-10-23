import React from "react";
import * as S from "./bannerBtn.style.ts";
import Link from "../Link/Link.tsx";

interface BannerBtnProps {
  type?: string;
}

const BannerBtn = ({ type }: BannerBtnProps) => {
  return (
    <S.Section className={`link ${type}`}>
      <Link
        url="/referral"
        classType="button"
        linkSize="large"
        label="Play Simple Budgeting's Referral Game this October!"
      >
        Play Simple Budgeting's Referral Game this October!
      </Link>
    </S.Section>
  );
};

export default BannerBtn;
