export type ElementSize = "small" | "medium" | "large";

export type InputType = "number" | "text" | "email" | "password";

export type InputOption = "default" | "expense" | "income";

export type ButtonType = "submit" | "button";

export type ButtonClassType = "default" | "register" | "exit" | "image";

export type LinkClassType = "default" | "text";

export type GraphType = "doughnut" | "pie" | "bar";

export type OverviewLabel = "default" | "Yearly" | "Monthly";

export interface SelectOptions {
  id: number;
  label: string;
  link?: string;
}

export interface GraphDataSet {
  data: string[] | number[];
  backgroundColor: string[];
  borderWidth: number;
  label?: string;
}

export interface BudgetDataItem {
  label: string;
  value: number;
  paid?: boolean;
}

export interface BudgetData {
  year: number;
  month: string;
  income: BudgetDataItem[];
  expense: BudgetDataItem[];
}
