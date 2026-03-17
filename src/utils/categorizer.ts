export function categorize(merchant: string | null): string {
  if (!merchant) return "Others";

  const m = merchant.toLowerCase();

  if (m.includes("uber") || m.includes("ola")) return "Transport";
  if (m.includes("zomato") || m.includes("swiggy") || m.includes("restaurant"))
    return "Food";
  if (m.includes("amazon") || m.includes("flipkart")) return "Shopping";
  if (m.includes("petrol") || m.includes("fuel")) return "Fuel";
  if (m.includes("netflix") || m.includes("spotify")) return "Entertainment";

  return "Others";
}
