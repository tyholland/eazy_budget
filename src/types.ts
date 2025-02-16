export type ElementSize = "small" | "medium" | "large";

export type InputType = "number" | "text" | "email" | "password";

export type InputOption = "default" | "expense" | "income";

export type ButtonType = "default" | "register" | "exit";

export type GraphType = "doughnut" | "pie" | "bar";

export type OverviewLabel = "default" | "Yearly" | "Monthly";

export interface AutoCompleteOptions {
  id: number;
  label: string;
}

export interface GraphDataSet {
  data: string[] | number[];
  backgroundColor: string[];
  borderWidth: number;
  label?: string;
}
