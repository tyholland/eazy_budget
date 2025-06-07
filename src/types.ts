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
  frequency?: string;
  cadence?: string;
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
  frequency?: string;
}

export interface UserRequest {
  email: string;
}

export interface ConnectedDecisionRequest {
  decision: boolean;
  connected_id?: number;
}

export interface UserResponse {
  action: string;
  hasBudget: boolean;
  subscription_id: number;
  connected_message: boolean;
  is_connected: boolean;
  connected_id?: number;
  primary_request?: string;
}

export interface User {
  hasBudget: boolean;
  subscription_id: number;
  connected_message: boolean;
  is_connected: boolean;
  connected_id?: number;
  primary_request?: string;
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

export interface NewBudgetIds {
  budget_id: number | number[];
}

export interface CreateBudgetItems {
  label: string;
  value: string;
  checked: boolean;
  frequency: string;
  cadence: string;
}
