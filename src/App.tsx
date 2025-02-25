import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import Monthly from "./pages/Monthly/Monthly.tsx";
import { BudgetData } from "./types.ts";
import { useSetAtom } from "jotai";
import { expenseAtom } from "./hook/ExpenseAtom.ts";

const App = () => {
  const monthlyExpense: BudgetData = {
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
  };
  const setMonthlyExpense = useSetAtom(expenseAtom);

  setMonthlyExpense(monthlyExpense);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/monthly/:type/:month" element={<Monthly />} />
      </Routes>
    </Router>
  );
};

export default App;
