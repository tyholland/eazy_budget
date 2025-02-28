import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import Monthly from "./pages/Monthly/Monthly.tsx";
import Yearly from "./pages/Yearly/Yearly.tsx";
import { BudgetData } from "./types.ts";
import { useSetAtom } from "jotai";
import { budgetAtom } from "./hook/BudgetAtom.ts";
import Breadcrumb from "./components/Breadcrumb/Breadcrumb.tsx";
import { getCurrentPageName } from "./functions/helper.ts";
import Create from "./pages/Create/Create.tsx";

const App = () => {
  const monthlyExpense: BudgetData[] = [
    {
      year: 2025,
      month: "February",
      income: [
        {
          label: "husband",
          value: 50000,
        },
        {
          label: "wife",
          value: 30000,
        },
      ],
      expense: [
        {
          label: "Netflix",
          value: 30.57,
        },
        {
          label: "Hulu",
          value: 19.99,
        },
        {
          label: "Amazon Prime",
          value: 10.0,
        },
      ],
    },
    {
      year: 2024,
      month: "January",
      income: [
        {
          label: "husband",
          value: 40000,
        },
        {
          label: "wife",
          value: 60000,
        },
      ],
      expense: [
        {
          label: "AT&T",
          value: 30.57,
        },
        {
          label: "Internet",
          value: 19.99,
        },
        {
          label: "Cable",
          value: 10.0,
        },
      ],
    },
    {
      year: 2025,
      month: "March",
      income: [
        {
          label: "husband",
          value: 70000,
        },
        {
          label: "wife",
          value: 50000,
        },
      ],
      expense: [
        {
          label: "401K",
          value: 30.57,
        },
        {
          label: "Savings",
          value: 19.99,
        },
        {
          label: "Car note",
          value: 10.0,
        },
      ],
    },
  ];
  const setMonthlyExpense = useSetAtom(budgetAtom);

  setMonthlyExpense(monthlyExpense);

  const pathname = window.location.pathname;
  const page = pathname.split("/");
  const currentPage = getCurrentPageName(`/${page[1]}/${page[2]}`);

  return (
    <Router>
      <Breadcrumb path={currentPage} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/monthly/:type/:month/:year" element={<Monthly />} />
        <Route path="/yearly/:type/:year" element={<Yearly />} />
        <Route path="/create/:type/:month/:year" element={<Create />} />
      </Routes>
    </Router>
  );
};

export default App;
