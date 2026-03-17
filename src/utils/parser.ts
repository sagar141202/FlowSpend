export type ParsedReceipt = {
  amount: number | null;
  date: string | null;
  merchant: string | null;
};

export function parseReceipt(text: string): ParsedReceipt {
  const amountMatch = text.match(/(?:₹|\$|Rs\.?)\s?(\d+[.,]?\d*)/i);
  const amount = amountMatch
    ? parseFloat(amountMatch[1].replace(",", ""))
    : null;

  const dateMatch = text.match(/\b(\d{1,2}[/-]\d{1,2}[/-]\d{2,4})\b/);
  const date = dateMatch ? dateMatch[1] : null;

  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const merchant = lines.length > 0 ? lines[0] : null;

  return { amount, date, merchant };
}
