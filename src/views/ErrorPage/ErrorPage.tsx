import React from "react";
import * as S from "./errorPage.style.ts";
import StopIcon from "../../svg/StopIcon.tsx";
import Link from "../../components/Link/Link.tsx";
import { useAtomValue } from "jotai";
import { userAtom } from "../../hook/UserAtom.ts";
import { loggedInHomepage } from "../../functions/helper.ts";

const ErrorPage = () => {
  const currentUser = useAtomValue(userAtom);

  return (
    <S.Wrapper>
      <StopIcon />
      <div className="content">
        <span>The page you're looking for may not exist.</span>
        <span>Please return to the homepage</span>
        <Link
          url={currentUser ? loggedInHomepage() : "/"}
          label="Return Home"
          classType="button"
          linkSize="medium"
        >
          Return Home
        </Link>
      </div>
    </S.Wrapper>
  );
};

export default ErrorPage;
