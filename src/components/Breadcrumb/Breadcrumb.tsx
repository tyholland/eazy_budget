import React from "react";
import { getCurrentPageName } from "../../functions/helper.ts";
import * as S from "./breadcrumb.style.ts";

interface BreadcrumbProps {
  path: string;
}

const Breadcrumb = ({ path }: BreadcrumbProps) => {
  if (path === "") {
    return <></>;
  }

  return (
    <S.Wrapper>
      <S.GreyedOut>
        <a href="/" aria-label="Overview">
          Overview
        </a>
      </S.GreyedOut>
      <S.GreyedOut>&gt;</S.GreyedOut>
      <div>{path}</div>
    </S.Wrapper>
  );
};

export default Breadcrumb;
