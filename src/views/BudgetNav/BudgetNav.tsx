import React from "react";
import * as S from "./budgetNav.style.ts";
import Button from "../../components/Button/Button.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { trackEvent } from "../../functions/mixpanel.ts";
import { getSubscriptionStatus } from "../../functions/helper.ts";
import { useAtomValue } from "jotai";
import { userAtom } from "../../hook/UserAtom.ts";

interface BudgetNavProps {
  setSelectedOption: (val: string) => void;
  incomeUrl: string;
  expenseUrl: string;
  selectedOption?: string;
}

const BudgetNav = ({
  setSelectedOption,
  incomeUrl,
  expenseUrl,
  selectedOption,
}: BudgetNavProps) => {
  const navigate = useNavigate();
  const params = useParams();
  const currentUser = useAtomValue(userAtom);
  const isPro = getSubscriptionStatus("Pro", currentUser?.subscription_id);

  window.onclick = (event: PointerEvent) => {
    const target = event.target;

    if (target instanceof Element && !target?.matches(".text")) {
      const dropdowns = document.getElementsByClassName("dropdownContent");

      for (let i = 0; i < dropdowns.length; i++) {
        const openDropdown = dropdowns[i];

        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
  };

  return (
    <S.NavWrapper>
      <S.NavItem className={selectedOption === "income" ? "open" : "close"}>
        <Button
          classType="text"
          handleClick={() => {
            setSelectedOption("income");
            trackEvent("Viewed Income", {
              month: params.month,
              year: params.year,
            });
            navigate(incomeUrl);
          }}
        >
          Income
        </Button>
      </S.NavItem>
      <S.NavItem className={selectedOption === "expense" ? "open" : "close"}>
        <Button
          classType="text"
          handleClick={() => {
            setSelectedOption("expense");
            trackEvent("Viewed Expense", {
              month: params.month,
              year: params.year,
            });
            navigate(expenseUrl);
          }}
        >
          Expense
        </Button>
      </S.NavItem>
      {isPro && (
        <S.NavItem
          className={`hideOnMobile ${selectedOption === "details" ? "open" : "close"}`}
        >
          <Button
            classType="text"
            handleClick={() => {
              setSelectedOption("details");
              trackEvent("Viewed Details", {
                month: params.month,
                year: params.year,
              });
            }}
          >
            Details
          </Button>
        </S.NavItem>
      )}
      <S.NavItem
        className={`hideOnMobile ${selectedOption === "goals" ? "open" : "close"}`}
      >
        <Button
          classType="text"
          handleClick={() => {
            setSelectedOption("goals");
            trackEvent("Viewed Goals", {
              month: params.month,
              year: params.year,
            });
          }}
        >
          Goals
        </Button>
      </S.NavItem>
      <S.NavItem
        className={`hideOnMobile ${selectedOption === "insights" ? "open" : "close"}`}
      >
        <Button
          classType="text"
          handleClick={() => {
            setSelectedOption("insights");
            trackEvent("Viewed Charts", {
              month: params.month,
              year: params.year,
            });
          }}
        >
          Insights
        </Button>
      </S.NavItem>
      <S.NavItem className="hideOnDesktop">
        <Button
          classType="text"
          handleClick={() => {
            document
              .querySelector(`#myDropdownContent`)
              ?.classList.toggle("show");
          }}
        >
          ...
        </Button>
        <div className="dropdownContent" id="myDropdownContent">
          {isPro && (
            <button
              onClick={() => {
                setSelectedOption("details");
                trackEvent("Viewed Details", {
                  month: params.month,
                  year: params.year,
                });
              }}
            >
              Details
            </button>
          )}
          <button
            onClick={() => {
              setSelectedOption("goals");
              trackEvent("Viewed Goals", {
                month: params.month,
                year: params.year,
              });
            }}
          >
            Goals
          </button>
          <button
            onClick={() => {
              setSelectedOption("insights");
              trackEvent("Viewed Charts", {
                month: params.month,
                year: params.year,
              });
            }}
          >
            Insights
          </button>
        </div>
      </S.NavItem>
    </S.NavWrapper>
  );
};

export default BudgetNav;
