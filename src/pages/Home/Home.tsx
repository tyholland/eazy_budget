import React from "react";
import Overview from "../../views/Overview/Overview.tsx";
import * as S from "./home.style.ts";

const Home = () => {
  return (
    <S.HomeWrapper>
      <Overview label="Yearly" incomeValue={50} expenseValue={20} />
      <Overview label="Monthly" incomeValue={90} expenseValue={40} />
    </S.HomeWrapper>
  );
};

export default Home;
