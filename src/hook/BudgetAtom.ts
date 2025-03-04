import { atom } from "jotai";
import { BudgetData } from "../types";

export const budgetAtom = atom<BudgetData[]>([]);
