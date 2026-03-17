import { create } from "zustand";
import type { Budget, Category, Transaction } from "./types";

type Store = {
  categories: Category[];
  transactions: Transaction[];
  budgets: Budget[];

  setCategories: (c: Category[]) => void;
  setTransactions: (t: Transaction[]) => void;
  setBudgets: (b: Budget[]) => void;
};

export const useStore = create<Store>((set) => ({
  categories: [],
  transactions: [],
  budgets: [],

  setCategories: (categories) => set({ categories }),
  setTransactions: (transactions) => set({ transactions }),
  setBudgets: (budgets) => set({ budgets }),
}));
