import React from "react";
import LoadingIcon from "../../svg/LoadingIcon.tsx";
import * as S from "./loading.style.ts";

const Loading = () => {
  return (
    <S.Wrapper>
      <LoadingIcon />
      <S.Content>Loading...</S.Content>
    </S.Wrapper>
  );
};

export default Loading;
