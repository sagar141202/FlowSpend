import type { SQLiteDatabase } from "expo-sqlite";

type CountRow = { count: number };

export function seedCategories(db: SQLiteDatabase) {
  const result = db.getAllSync(
    "SELECT COUNT(*) as count FROM categories",
  ) as CountRow[];
  const count = result[0]?.count ?? 0;

  if (count > 0) return;

  const categories = [
    { name: "Food", icon: "🍔", color: "#F59E0B" },
    { name: "Transport", icon: "🚗", color: "#3B82F6" },
    { name: "Shopping", icon: "🛍️", color: "#EC4899" },
    { name: "Bills", icon: "💡", color: "#EF4444" },
    { name: "Health", icon: "💊", color: "#10B981" },
    { name: "Entertainment", icon: "🎬", color: "#8B5CF6" },
    { name: "Salary", icon: "💰", color: "#22C55E" },
  ];

  for (const c of categories) {
    db.runSync("INSERT INTO categories (name, icon, color) VALUES (?, ?, ?)", [
      c.name,
      c.icon,
      c.color,
    ]);
  }
}
