import React from "react";
import LoadingIcon from "../../svg/LoadingIcon.tsx";
import * as S from "./loading.style.ts";
import { budgetQuotes } from "../../constants.ts";

const Loading = () => {
  const numQuotes = budgetQuotes.length;
  const randomNum = Math.floor(Math.random() * numQuotes);

  return (
    <S.Wrapper>
      <LoadingIcon />
      <S.Content>Loading...</S.Content>
      <div>{budgetQuotes[randomNum]}</div>
    </S.Wrapper>
  );
};

export default Loading;
