import React from "react";
import * as S from "./breadcrumb.style.ts";
import { Link } from "react-router-dom";

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
        <Link to="/" aria-label="Overview">
          Overview
        </Link>
      </S.GreyedOut>
      <S.GreyedOut>&gt;</S.GreyedOut>
      <div>{path}</div>
    </S.Wrapper>
  );
};

export default Breadcrumb;
