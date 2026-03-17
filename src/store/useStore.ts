import * as SQLite from "expo-sqlite";
import { create } from "zustand";
import type { Budget, Category, Transaction } from "./types";

const db = SQLite.openDatabaseSync("flowspend.db");

type Store = {
  categories: Category[];
  transactions: Transaction[];
  budgets: Budget[];

  setCategories: (c: Category[]) => void;
  setTransactions: (t: Transaction[]) => void;
  setBudgets: (b: Budget[]) => void;

  addTransaction: (t: Omit<Transaction, "id" | "created_at">) => void;
};

export const useStore = create<Store>((set, get) => ({
  categories: [],
  transactions: [],
  budgets: [],

  setCategories: (categories) => set({ categories }),
  setTransactions: (transactions) => set({ transactions }),
  setBudgets: (budgets) => set({ budgets }),

  addTransaction: (t) => {
    const temp: Transaction = {
      id: Date.now(),
      created_at: new Date().toISOString(),
      ...t,
    };

    set({ transactions: [temp, ...get().transactions] });

    try {
      db.runSync(
        "INSERT INTO transactions (amount, type, category_id, note) VALUES (?, ?, ?, ?)",
        [t.amount, t.type, t.category_id ?? null, t.note ?? null],
      );
    } catch (e) {
      console.log("DB insert failed", e);
    }
  },
}));
