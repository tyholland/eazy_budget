import { atom } from "jotai";
import { BudgetData } from "../types";

export const expenseAtom = atom<BudgetData | null>(null);
