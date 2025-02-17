import { atom } from "jotai";
import { BudgetData } from "../types";

export const monthlyExpenseAtom = atom<BudgetData[] | null>(null);

export const yearlyExpenseAtom = atom("");
