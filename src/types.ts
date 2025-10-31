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

export type LinkClassType = "button" | "text" | "partner";

export type GraphType = "doughnut" | "pie" | "bar";

export type OverviewLabel = "default" | "Yearly" | "Monthly";

export type DownloadTypes = "yearly" | "monthly";

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
  category_id?: number;
  item_name?: string[];
  item_value?: number[];
  item_categories?: string[];
  temp?: boolean;
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
  category_id?: number;
}

export interface UserRequest {
  email: string;
  referral_code?: string;
  plan?: string;
}

export interface ConnectedDecisionRequest {
  decision: boolean;
  connected_id?: number;
}

export interface ExpenseCategory {
  id: number;
  label: string;
}

export interface ClientReferrals {
  email: number;
  id: number;
  first_name?: string;
  last_name?: string;
}

export interface MedalGame {
  total_medal_points: number;
  shared_account: boolean;
  expenses_in_category_1: boolean;
  expenses_in_category_2: boolean;
  expenses_in_category_3: boolean;
  edit_expense_in_month: boolean;
  add_expense_in_month: boolean;
  edit_income_in_month: boolean;
  add_income_in_month: boolean;
  add_category_in_month: boolean;
}

export interface UserResponse {
  action: string;
  hasBudget: boolean;
  subscription_id: number;
  connected_message: boolean;
  is_connected: boolean;
  categories: ExpenseCategory[];
  paid_sub: boolean;
  subscribed_at: string;
  referral_code: string;
  all_referrals: ClientReferrals[];
  currency: string;
  medal_game: MedalGame;
  paypal_sub_id?: string | null;
  connected_id?: number;
  primary_request?: string;
  shared_account_email?: string;
}

export interface User extends Omit<UserResponse, "action"> {
  email?: string;
  email_verified?: boolean;
  name?: string;
  nickname?: string;
  picture?: string;
  sub?: string;
  updated_at?: string;
  selectedCategory?: string;
  selectedSort?: string;
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
  category_id?: number;
}

export interface ProfitLoss {
  label: string;
  value: string;
  percent: string;
  type: string;
}
