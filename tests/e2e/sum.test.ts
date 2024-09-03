// sum.test.js
import { test, expect } from "@playwright/test";
import { sum } from "@/lib/sum.js";

test("adds 1 + 2 to equal 3", () => {
	expect(sum(1, 2)).toBe(3);
});
