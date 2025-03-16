import React from "react";
import * as S from "./errorPage.style.ts";
import StopIcon from "../../svg/StopIcon.tsx";
import Link from "../../components/Link/Link.tsx";

const ErrorPage = () => {
  return (
    <S.Wrapper>
      <StopIcon />
      <div className="content">
        <span>The page you're looking for might not exist.</span>
        <span>Please return to the homepage</span>
        <Link url="/" label="Return Home" classType="button" linkSize="medium">
          Return Home
        </Link>
      </div>
    </S.Wrapper>
  );
};

export default ErrorPage;
