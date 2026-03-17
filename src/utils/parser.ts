export type ParsedReceipt = {
  amount: number | null;
  date: string | null;
  merchant: string | null;
  confidence: number;
};

export function parseReceipt(text: string): ParsedReceipt {
  let confidence = 0;

  const amountMatch = text.match(/(?:₹|\$|Rs\.?)\s?(\d+[.,]?\d*)/i);
  const amount = amountMatch
    ? parseFloat(amountMatch[1].replace(",", ""))
    : null;
  if (amount) confidence += 0.4;

  const dateMatch = text.match(/\b(\d{1,2}[/-]\d{1,2}[/-]\d{2,4})\b/);
  const date = dateMatch ? dateMatch[1] : null;
  if (date) confidence += 0.3;

  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const merchant = lines.length > 0 ? lines[0] : null;
  if (merchant) confidence += 0.3;

  return { amount, date, merchant, confidence };
}
