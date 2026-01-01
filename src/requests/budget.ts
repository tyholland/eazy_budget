import { BudgetBodyInfo, BudgetDataItem } from "../types";

const api = process.env.REACT_APP_API;

export const getBudget = async (accessToken: string) => {
  try {
    const budgetResponse = await fetch(`${api}/budget`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
    });

    return await budgetResponse.json();
  } catch (err) {
    throw new Error(`Failed to get budget info`);
  }
};

export const createBudget = async (
  accessToken: string,
  budgetData: BudgetBodyInfo[],
) => {
  try {
    const budgetResponse = await fetch(`${api}/budget/create`, {
      method: "POST",
      body: JSON.stringify({ budgetData }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
    });

    return await budgetResponse.json();
  } catch (err) {
    throw new Error(`Failed to create budget`);
  }
};

export const updateBudgetItem = async (
  accessToken: string,
  budgetItem: BudgetDataItem,
) => {
  try {
    const budgetResponse = await fetch(`${api}/budget/update`, {
      method: "PUT",
      body: JSON.stringify({ ...budgetItem }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
    });

    return await budgetResponse.json();
  } catch (err) {
    throw new Error("Failed to update budget item");
  }
};

export const addBudgetItem = async (
  accessToken: string,
  budgetItem: BudgetDataItem,
) => {
  try {
    const budgetResponse = await fetch(`${api}/budget/add`, {
      method: "POST",
      body: JSON.stringify({ ...budgetItem }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
    });

    return await budgetResponse.json();
  } catch (err) {
    throw new Error("Failed to add budget item");
  }
};

export const deleteBudgetItem = async (
  accessToken: string,
  budgetItemId: number | null,
) => {
  try {
    const budgetResponse = await fetch(`${api}/budget/remove`, {
      method: "DELETE",
      body: JSON.stringify({ budget_id: budgetItemId }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
    });

    return await budgetResponse.json();
  } catch (err) {
    throw new Error("Failed to delete budget item");
  }
};

export const convertCurrency = async (from: string, to: string) => {
  try {
    const url = `https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`;
    const currencyResponse = await fetch(url, {
      method: "GET",
    });

    return await currencyResponse.json();
  } catch (err) {
    throw new Error("Failed to get currency rates");
  }
};
