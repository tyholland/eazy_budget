import React, { useEffect, useState } from "react";
import * as S from "./downloadCsv.style.ts";
import { useAtomValue } from "jotai";
import { budgetAtom } from "../../hook/BudgetAtom.ts";
import { BudgetData, DownloadTypes, ProfitLoss, User } from "../../types.ts";
import {
  getMonthlyCSV,
  getMontlyProfitLossCSV,
  getYearlyCSV,
  getYearlyProfitLossCSV,
} from "../../functions/budget.ts";
import { useParams } from "react-router-dom";
import { getBudgetRule, getDateInfo } from "../../functions/helper.ts";
import { trackEvent } from "../../functions/mixpanel.ts";
import { userAtom } from "../../hook/UserAtom.ts";
import Loading from "../Loading/Loading.tsx";

interface DownloadCsvProps {
  type: DownloadTypes;
  currentClient?: User;
  clientBudget?: BudgetData[];
}

const DownloadCsv = ({
  type,
  currentClient,
  clientBudget,
}: DownloadCsvProps) => {
  const params = useParams();
  let budget = useAtomValue(budgetAtom);
  let currentUser = useAtomValue(userAtom);

  if (!!currentClient && !!clientBudget) {
    budget = clientBudget;
    currentUser = currentClient;
  }

  const { currentYear: theYear, currentMonth: theMonth } = getDateInfo();
  const [currentMonthProfitLoss, setCurrentMonthProfitLoss] = useState<
    ProfitLoss[]
  >([]);
  const [currentYearProfitLoss, setCurrentYearProfitLoss] = useState<
    ProfitLoss[]
  >([]);
  const currentMonth = params.month || theMonth;
  const currentYear = Number(params.year) || theYear;
  const currentBudget = budget.filter(
    (bud: BudgetData) => bud.month === currentMonth,
  )[0];
  const { currentExpense, currentIncome } = getMonthlyCSV(currentBudget);
  const { yearlyIncome, yearlyExpense } = getYearlyCSV(budget, currentYear);

  const getAllProfitLoss = async () => {
    const monthProfitLoss = await getMontlyProfitLossCSV(
      currentIncome,
      currentExpense,
      currentUser,
    );

    const yearProfitLoss = await getYearlyProfitLossCSV(
      yearlyIncome,
      yearlyExpense,
      currentUser,
    );

    setCurrentMonthProfitLoss(monthProfitLoss);
    setCurrentYearProfitLoss(yearProfitLoss);
  };

  useEffect(() => {
    getAllProfitLoss();
  }, []);

  if (
    currentMonthProfitLoss.length === 0 ||
    currentYearProfitLoss.length === 0
  ) {
    return <Loading />;
  }

  const profitLossBtn = document.querySelector(".profitLossBtn");
  const profitLossYearBtn = document.querySelector(".profitLossYearBtn");

  profitLossBtn?.addEventListener(
    "click",
    () => {
      trackEvent(`Download ${currentMonth} Profit & Loss Simplified CSV`);
    },
    { once: true },
  );

  profitLossYearBtn?.addEventListener(
    "click",
    () => {
      trackEvent(`Download ${currentYear} Profit & Loss Simplified CSV`);
    },
    { once: true },
  );

  const monthlyCsv: Object[] = [];
  const yearlyCsv: Object[] = [];

  currentMonthProfitLoss.forEach((item) => {
    monthlyCsv.push({
      label: item.label,
      value: item.value,
      percent: item.percent,
    });
  });

  currentYearProfitLoss.forEach((item) => {
    yearlyCsv.push({
      label: item.label,
      value: item.value,
      percent: item.percent,
    });
  });

  const monthDiscretionary = currentMonthProfitLoss.filter(
    (item) => item.label === "Total Non-Discretionary",
  )[0];

  const monthSavings = currentMonthProfitLoss.filter(
    (item) => item.label === "Total Savings",
  )[0];

  const monthFun = currentMonthProfitLoss.filter(
    (item) => item.label === "Total Fun Money",
  )[0];

  const hasValidMonthBudget =
    monthDiscretionary?.percent === "60.00%" &&
    monthSavings?.percent === "20.00%" &&
    monthFun?.percent === "20.00%";

  return (
    <>
      <S.Title>
        {type === "monthly" ? currentMonth : currentYear} Profit & Loss
        Simplified
      </S.Title>
      {hasValidMonthBudget ? (
        <S.BudgetRuleContent>
          Your{" "}
          <span className="month">
            {type === "monthly" ? currentMonth : currentYear}
          </span>{" "}
          financial summary reflects a{" "}
          <strong>
            {getBudgetRule(
              monthDiscretionary.percent,
              monthSavings.percent,
              monthFun.percent,
            )}
          </strong>{" "}
          budget distribution, based on your recorded income and expenses.
        </S.BudgetRuleContent>
      ) : (
        <S.BudgetRuleContent>
          Your{" "}
          <span className="month">
            {type === "monthly" ? currentMonth : currentYear}
          </span>{" "}
          financial summary does not reflect a <strong>60/20/20</strong> budget
          distribution, based on your recorded income and expenses.
        </S.BudgetRuleContent>
      )}
      {!hasValidMonthBudget && (
        <S.BudgetRuleContent>
          We recommend following the <strong>60/20/20</strong> budgeting rule,
          where 60% of your income is allocated to Non-Discretionary expenses,
          20% to Savings, and the remaining 20% to Fun Money. Consider adjusting
          your expenses to align more closely with this balanced financial
          framework.
        </S.BudgetRuleContent>
      )}
      <S.ContentWrapper>
        {type === "yearly" && (
          <>
            <S.BudgetBreakdown>
              <S.BudgetLineItem className="header">
                <div className="capital">Item</div>
                <div>Amount</div>
                <div>% of Income</div>
              </S.BudgetLineItem>
              {currentYearProfitLoss.map((item, index) => {
                return (
                  <S.BudgetLineItem key={index} className={item.type}>
                    <div className="capital">{item.label}</div>
                    <div>{item.value}</div>
                    <div>{item.percent}</div>
                  </S.BudgetLineItem>
                );
              })}
            </S.BudgetBreakdown>
            <S.CsvBtn
              data={yearlyCsv}
              headers={["Item", "Amount", "% of Income"]}
              filename={`${currentYear}_p_and_l`}
              className="profitLossYearBtn"
            >
              Download {currentYear} Profit & Loss Simplified CSV
            </S.CsvBtn>
          </>
        )}
        {type === "monthly" && (
          <>
            <S.BudgetBreakdown>
              <S.BudgetLineItem className="header">
                <div className="capital">Item</div>
                <div>Amount</div>
                <div>% of Income</div>
              </S.BudgetLineItem>
              {currentMonthProfitLoss.map((item, index) => {
                return (
                  <S.BudgetLineItem key={index} className={item.type}>
                    <div className="capital">{item.label}</div>
                    <div>{item.value}</div>
                    <div>{item.percent}</div>
                  </S.BudgetLineItem>
                );
              })}
            </S.BudgetBreakdown>
            <S.CsvBtn
              data={monthlyCsv}
              headers={["Item", "Amount", "% of Income"]}
              filename={`${currentMonth}_p_and_l`}
              className="profitLossBtn"
            >
              Download {currentMonth} Profit & Loss Simplified CSV
            </S.CsvBtn>
          </>
        )}
      </S.ContentWrapper>
    </>
  );
};

export default DownloadCsv;
