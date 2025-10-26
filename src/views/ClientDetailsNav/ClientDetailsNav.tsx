import React from "react";
import * as S from "./clientDetailsNav.style.ts";
import Button from "../../components/Button/Button.tsx";
import { useNavigate } from "react-router-dom";

interface ClientDetailsNavProps {
  setSelectedOption: (val: string) => void;
  selectedOption?: string;
}

const ClientDetailsNav = ({
  setSelectedOption,
  selectedOption,
}: ClientDetailsNavProps) => {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);

  return (
    <S.NavWrapper>
      <S.NavItem className={selectedOption === "income" ? "open" : "close"}>
        <Button
          classType="text"
          handleClick={() => {
            setSelectedOption("income");
            navigate("?type=income");
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
            navigate("?type=expense");
          }}
        >
          Expense
        </Button>
      </S.NavItem>
      <S.NavItem className={selectedOption === "details" ? "open" : "close"}>
        <Button
          classType="text"
          handleClick={() => {
            setSelectedOption("details");
            navigate(`?type=${params.get("type")}&nav=details`);
          }}
        >
          Details
        </Button>
      </S.NavItem>
      <S.NavItem className={selectedOption === "goals" ? "open" : "close"}>
        <Button
          classType="text"
          handleClick={() => {
            setSelectedOption("goals");
            navigate(`?type=${params.get("type")}&nav=goals`);
          }}
        >
          Goals
        </Button>
      </S.NavItem>
    </S.NavWrapper>
  );
};

export default ClientDetailsNav;
