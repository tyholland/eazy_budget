import React, { ChangeEvent, useState } from "react";
import Overview from "../../views/Overview/Overview.tsx";
import * as S from "./predict.style.ts";
import { useAtomValue } from "jotai";
import { budgetAtom } from "../../hook/BudgetAtom.ts";
import { getYearlyTotalAmount } from "../../functions/budget.ts";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../components/Input/Input.tsx";
import ErrorPage from "../../views/ErrorPage/ErrorPage.tsx";

const Predict = () => {
  const budget = useAtomValue(budgetAtom);
  const navigate = useNavigate();
  const { year } = useParams();
  const [predictOne, setPredictOne] = useState<string>("");
  const [predictTwo, setPredictTwo] = useState<string>("");
  const [predictThree, setPredictThree] = useState<string>("");

  if (!budget.length) {
    navigate("/");
  }

  if (!year || isNaN(Number(year))) {
    return <ErrorPage />;
  }

  const theYear = Number(year);

  const yearlyTotalIncome = getYearlyTotalAmount(budget, theYear, "income");
  const yearlyTotalExpense = getYearlyTotalAmount(budget, theYear, "expense");

  return (
    <S.PredictWrapper>
      <S.PredictInputs>
        <Input
          label="predictionOne"
          labelValue={`${theYear + 1} Predicted Income:`}
          placeHolder="Enter income"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPredictOne(e.target.value)
          }
        />
        <Input
          label="predictionTwo"
          labelValue={`${theYear + 2} Predicted Income:`}
          placeHolder="Enter income"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPredictTwo(e.target.value)
          }
        />
        <Input
          label="predictionThree"
          labelValue={`${theYear + 3} Predicted Income:`}
          placeHolder="Enter income"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPredictThree(e.target.value)
          }
        />
      </S.PredictInputs>
      <Overview
        label={`Current ${theYear} Budget`}
        incomeValue={yearlyTotalIncome}
        expenseValue={yearlyTotalExpense}
        hideViewIcon
      />
      <Overview
        label={`${theYear + 1} Budget Prediction`}
        incomeValue={Number(predictOne)}
        expenseValue={yearlyTotalExpense}
        hideViewIcon
      />
      <Overview
        label={`${theYear + 2} Budget Prediction`}
        incomeValue={Number(predictTwo)}
        expenseValue={yearlyTotalExpense}
        hideViewIcon
      />
      <Overview
        label={`${theYear + 3} Budget Prediction`}
        incomeValue={Number(predictThree)}
        expenseValue={yearlyTotalExpense}
        hideViewIcon
      />
    </S.PredictWrapper>
  );
};

export default Predict;
