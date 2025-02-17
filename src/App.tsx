import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import Monthly from "./pages/Monthly/Monthly.tsx";
import { BudgetData } from "./types.ts";
import { useSetAtom } from "jotai";
import { monthlyExpenseAtom } from "./hook/ExpenseAtom.ts";

const App = () => {
  const monthlyExpense: BudgetData[] = [
    {
      label: "Netflix",
      value: 30.57,
      year: 2025,
      month: "February",
    },
    {
      label: "Hulu",
      value: 19.99,
      year: 2025,
      month: "February",
    },
    {
      label: "Amazon Prime",
      value: 10.0,
      year: 2025,
      month: "February",
    },
  ];

  const setMonthlyExpense = useSetAtom(monthlyExpenseAtom);

  setMonthlyExpense(monthlyExpense);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/monthly/:type" element={<Monthly />} />
      </Routes>
    </Router>
  );
};

export default App;
