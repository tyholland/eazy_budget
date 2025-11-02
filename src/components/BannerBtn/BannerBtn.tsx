import React from "react";
import * as S from "./bannerBtn.style.ts";
import Link from "../Link/Link.tsx";

interface BannerBtnProps {
  url: string;
  label: string;
  type?: string;
}

const BannerBtn = ({ type, url, label }: BannerBtnProps) => {
  return (
    <S.Section className={`link ${type}`}>
      <Link url={url} classType="button" linkSize="medium" label={label}>
        {label}
      </Link>
    </S.Section>
  );
};

export default BannerBtn;
