export type Category = {
  id: number;
  name: string;
  icon?: string;
  color?: string;
};

export type Transaction = {
  id: number;
  amount: number;
  type: "income" | "expense";
  category_id?: number;
  note?: string;
  created_at: string;
};

export type Budget = {
  id: number;
  category_id?: number;
  limit_amount: number;
  period: "daily" | "weekly" | "monthly";
  created_at: string;
};
