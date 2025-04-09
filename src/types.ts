export type ElementSize = "small" | "medium" | "large";

export type InputType = "number" | "text" | "email" | "password";

export type InputOption = "default" | "expense" | "income";

export type ButtonType = "submit" | "button";

export type ButtonClassType =
  | "default"
  | "register"
  | "exit"
  | "image"
  | "text";

export type LinkClassType = "button" | "text";

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
  borderColor?: string;
}

export interface BudgetDataItem {
  label: string;
  value: number;
  budget_id: number | null;
  budget_date_id: number | null;
  paid?: boolean;
  type?: string;
}

export interface BudgetData {
  year: number;
  month: string;
  income: BudgetDataItem[];
  expense: BudgetDataItem[];
}

export interface BudgetBodyInfo {
  year: number;
  month: string;
  type: string;
  label: string;
  amount: number;
  paid?: boolean;
}

export interface UserRequest {
  email: string;
}

export interface UserResponse {
  action: string;
  hasBudget: boolean;
  subscription_id: number;
}

export interface User {
  hasBudget: boolean;
  subscription_id: number;
  email?: string;
  email_verified?: boolean;
  name?: string;
  nickname?: string;
  picture?: string;
  sub?: string;
  updated_at?: string;
}

export interface BudgetInsertIds {
  budget_id: number;
  budget_date_id: number;
}
