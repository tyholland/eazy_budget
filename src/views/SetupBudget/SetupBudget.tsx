import React, { ChangeEvent, JSX, useState } from "react";
import * as S from "./setupBudget.style.ts";
import Link from "../../components/Link/Link.tsx";
import DisabledSaveIcon from "../../svg/DisabledSaveIcon.tsx";
import SaveIcon from "../../svg/SaveIcon.tsx";
import { useAtomValue } from "jotai";
import { incomeAtom } from "../../hook/IncomeAtom.ts";
import { expenseAtom } from "../../hook/ExpenseAtom.ts";
import Papa from "papaparse";
import Button from "../../components/Button/Button.tsx";
import { CreateBudgetItems } from "../../types.ts";
import { userAtom } from "../../hook/UserAtom.ts";

interface SetupBudgetProps {
  children: JSX.Element;
  month: string;
  year: number;
  isDisabled: boolean;
}

const SetupBudget = ({
  children,
  month,
  year,
  isDisabled,
}: SetupBudgetProps) => {
  const budgetIncome = useAtomValue(incomeAtom);
  const budgetExpense = useAtomValue(expenseAtom);
  const currentUser = useAtomValue(userAtom);
  const [inputOption, setInputOption] = useState<string>("manual");

  console.log(currentUser);

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
            )[0].id,
          });
        });

        console.log(budgetData);
      },
    });
  };

  return (
    <S.Wrapper>
      <S.ContentSection>
        <h2>Welcome to Simple Budgeting</h2>
        <span>
          Manually enter your income and expenses for one month to automatically
          generate a comprehensive 12-month budget — or upload your income and
          expense data via CSV to create it instantly.
        </span>
      </S.ContentSection>
      {inputOption === "manual" && (
        <>
          <S.SelectionWrapper>
            <img
              src="/images/create-account.jpg"
              width="350px"
              height="auto"
              alt="account settings and details"
            />
            <S.SectionWrapper>
              <S.Section>
                <Link
                  url={`/add/income/${month}/${year}`}
                  linkSize="medium"
                  classType="button"
                  label="Add income for one month"
                  isDisabled={isDisabled}
                >
                  Add income for one month
                </Link>{" "}
                {!budgetIncome.length ? <DisabledSaveIcon /> : <SaveIcon />}
              </S.Section>
              <S.Section>
                <Link
                  url={`/add/expense/${month}/${year}`}
                  linkSize="medium"
                  classType="button"
                  label="Add expenses for one month"
                  isDisabled={isDisabled}
                >
                  Add expenses for one month
                </Link>{" "}
                {!budgetExpense.length ? <DisabledSaveIcon /> : <SaveIcon />}
              </S.Section>
              {children}
            </S.SectionWrapper>
          </S.SelectionWrapper>
          <S.ChangeOption>
            <S.OrLine>
              <hr />
              or
              <hr />
            </S.OrLine>
            <Button
              handleClick={() => setInputOption("csv")}
              buttonSize="large"
              classType="exit"
            >
              Upload data from a CSV
            </Button>
          </S.ChangeOption>
        </>
      )}
      {inputOption === "csv" && (
        <>
          <S.UploadContent>
            Please download the income and expenses CSV files and complete them
            to the best of your ability. Once completed, upload each file using
            the corresponding upload buttons provided below.
          </S.UploadContent>
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
          <S.ChangeOption>
            <S.OrLine>
              <hr />
              or
              <hr />
            </S.OrLine>
            <Button
              handleClick={() => setInputOption("manual")}
              buttonSize="large"
              classType="exit"
            >
              Upload data Manually
            </Button>
          </S.ChangeOption>
        </>
      )}
    </S.Wrapper>
  );
};

export default SetupBudget;
