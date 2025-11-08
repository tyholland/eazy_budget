import React from "react";
import * as S from "./loading.style.ts";
import { budgetQuotes } from "../../constants.ts";

const Loading = () => {
  const numQuotes = budgetQuotes.length;
  const randomNum = Math.floor(Math.random() * numQuotes);

  return (
    <S.Wrapper>
      <S.Content>
        We're currently loading your budget data — this may take a few moments.
        In the meantime, enjoy a quote about budgeting.
      </S.Content>
      <S.Quote>{budgetQuotes[randomNum]}</S.Quote>
      <img
        src="https://www.sbudgeting.com/images/loading.gif"
        width="500px"
        height="500px"
        alt="loading piggy bank"
      />
      <S.Content>Loading...</S.Content>
    </S.Wrapper>
  );
};

export default Loading;
