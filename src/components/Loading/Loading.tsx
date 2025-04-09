import React from "react";
import * as S from "./loading.style.ts";
import { budgetQuotes } from "../../constants.ts";

const Loading = () => {
  const numQuotes = budgetQuotes.length;
  const randomNum = Math.floor(Math.random() * numQuotes);

  return (
    <S.Wrapper>
      <img src="/images/loading.jpg" width="500px" height="500px" />
      <S.Content>Loading...</S.Content>
      <S.Quote>{budgetQuotes[randomNum]}</S.Quote>
    </S.Wrapper>
  );
};

export default Loading;
