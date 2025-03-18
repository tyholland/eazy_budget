import React, { ChangeEvent, useState } from "react";
import Overview from "../../views/Overview/Overview.tsx";
import * as S from "./predict.style.ts";
import { useAtomValue } from "jotai";
import { budgetAtom } from "../../hook/BudgetAtom.ts";
import { getYearlyTotalAmount } from "../../functions/budget.ts";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../components/Input/Input.tsx";
import ErrorPage from "../../views/ErrorPage/ErrorPage.tsx";
import { getDateInfo } from "../../functions/helper.ts";

const Predict = () => {
  const budget = useAtomValue(budgetAtom);
  const navigate = useNavigate();
  const { currentYear } = getDateInfo();
  const [predictOne, setPredictOne] = useState<string>("");
  const [predictTwo, setPredictTwo] = useState<string>("");
  const [predictThree, setPredictThree] = useState<string>("");

  if (!budget.length) {
    navigate("/overview");
  }

  const yearlyTotalIncome = getYearlyTotalAmount(budget, currentYear, "income");
  const yearlyTotalExpense = getYearlyTotalAmount(
    budget,
    currentYear,
    "expense",
  );

  return (
    <S.PredictWrapper>
      <S.PredictInputs>
        <Input
          label="predictionOne"
          labelValue={`${currentYear + 1} Predicted Income:`}
          placeHolder="Enter income"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPredictOne(e.target.value)
          }
        />
        <Input
          label="predictionTwo"
          labelValue={`${currentYear + 2} Predicted Income:`}
          placeHolder="Enter income"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPredictTwo(e.target.value)
          }
        />
        <Input
          label="predictionThree"
          labelValue={`${currentYear + 3} Predicted Income:`}
          placeHolder="Enter income"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPredictThree(e.target.value)
          }
        />
      </S.PredictInputs>
      <S.PredictBudgets>
        <Overview
          label={`Current ${currentYear} Budget`}
          incomeValue={yearlyTotalIncome}
          expenseValue={yearlyTotalExpense}
          hideViewIcon
        />
        <Overview
          label={`${currentYear + 1} Budget Prediction`}
          incomeValue={Number(predictOne)}
          expenseValue={yearlyTotalExpense}
          hideViewIcon
        />
        <Overview
          label={`${currentYear + 2} Budget Prediction`}
          incomeValue={Number(predictTwo)}
          expenseValue={yearlyTotalExpense}
          hideViewIcon
        />
        <Overview
          label={`${currentYear + 3} Budget Prediction`}
          incomeValue={Number(predictThree)}
          expenseValue={yearlyTotalExpense}
          hideViewIcon
        />
      </S.PredictBudgets>
    </S.PredictWrapper>
  );
};

export default Predict;
