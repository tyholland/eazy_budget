import { atom } from "jotai";
import { BudgetDataItem } from "../types";

export const incomeAtom = atom<BudgetDataItem[]>([]);
