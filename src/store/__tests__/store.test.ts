import { describe, expect, it } from "vitest";
import { useStore } from "../useStore";

describe("Store", () => {
  it("should add transaction optimistically", () => {
    const store = useStore.getState();

    store.addTransaction({
      amount: 100,
      type: "expense",
      category_id: 1,
      note: "test",
    });

    const state = useStore.getState();

    expect(state.transactions.length).toBeGreaterThan(0);
    expect(state.transactions[0].amount).toBe(100);
  });

  it("should set categories", () => {
    const store = useStore.getState();

    store.setCategories([{ id: 1, name: "Food" }]);

    const state = useStore.getState();

    expect(state.categories.length).toBe(1);
    expect(state.categories[0].name).toBe("Food");
  });
});
