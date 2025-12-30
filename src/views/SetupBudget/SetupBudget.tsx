import React, { ChangeEvent, JSX } from "react";
import * as S from "./setupBudget.style.ts";
import Link from "../../components/Link/Link.tsx";
import { useAtomValue } from "jotai";
import Papa from "papaparse";
import { CreateBudgetItems } from "../../types.ts";
import { userAtom } from "../../hook/UserAtom.ts";
import { formatBudgetItem } from "../../functions/budget.ts";

interface SetupBudgetProps {
  children: JSX.Element;
  month: string;
  year: number;
  isDisabled: boolean;
}

const SetupBudget = ({ children, month, year }: SetupBudgetProps) => {
  const currentUser = useAtomValue(userAtom);

  const handleFileUpload = (
    event: ChangeEvent<HTMLInputElement>,
    budgetType: string,
  ) => {
    if (!event.target.files) {
      return;
    }

    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results: any) => {
        const resultsData = results.data;
        const budgetData: CreateBudgetItems[] = [];

        resultsData.forEach((item: any) => {
          if (item["Amount (Monthly)"] === "") {
            return;
          }

          budgetData.push({
            label: item["Item"],
            value: item["Amount (Monthly)"],
            checked: false,
            frequency: "Monthly",
            cadence: "Current Month",
            category_id: currentUser?.categories.filter(
              (category) => category.label === item["Category"],
            )[0]?.id,
          });
        });

        const budgetEntries = formatBudgetItem(budgetData, month, Number(year));
        if (budgetType === "income") {
          setBudgetIncome(budgetEntries);
          localStorage.setItem("budgetIncome", JSON.stringify(budgetEntries));
        } else {
          setBudgetExpense(budgetEntries);
          localStorage.setItem("budgetExpense", JSON.stringify(budgetEntries));
        }
      },
    });
  };

  return (
    <S.Wrapper>
      <S.ContentSection>
        <h2>Welcome to Simple Budgeting</h2>
        <span>
          Please download the income and expenses CSV files and complete them to
          the best of your ability. Once completed, upload each file using the
          corresponding upload buttons provided below.
        </span>
      </S.ContentSection>
      <S.UploadWrapper>
        <S.UploadSection>
          <Link
            url="/csv/simple-budgeting-template-income.csv"
            label="Download Income CSV"
            classType="button"
            target="_blank"
            download
          >
            Download Income CSV
          </Link>
          <label htmlFor="incomeCsv">Upload Income CSV:</label>
          <input
            type="file"
            accept=".csv"
            id="incomeCsv"
            onChange={(e) => handleFileUpload(e, "income")}
          />
        </S.UploadSection>
        <S.UploadSection>
          <Link
            url="/csv/simple-budgeting-template-expense.csv"
            label="Download Expense CSV"
            classType="button"
            target="_blank"
            download
          >
            Download Expense CSV
          </Link>
          <label htmlFor="expenseCsv">Upload Expense CSV:</label>
          <input
            type="file"
            accept=".csv"
            id="expenseCsv"
            onChange={(e) => handleFileUpload(e, "expense")}
          />
        </S.UploadSection>
      </S.UploadWrapper>
      {children}
    </S.Wrapper>
  );
};

export default SetupBudget;
