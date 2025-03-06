import { atom } from "jotai";
import { BudgetDataItem } from "../types";

export const expenseAtom = atom<BudgetDataItem[]>([]);
