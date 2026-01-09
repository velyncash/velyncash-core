import type { CategoryKey } from "../types";
import type { CategoryRule } from "../entities/Category";
import { DEFAULT_CATEGORY_RULES } from "../entities/Category";

export function createCategoryService(rules: CategoryRule[] = DEFAULT_CATEGORY_RULES) {
  function textOf(value?: string): string {
    return (value ?? "").toLowerCase();
  }

  return {
    classify(params: { rail: string; counterparty?: string; referenceId?: string }): CategoryKey {
      const hay = `${textOf(params.counterparty)} ${textOf(params.referenceId)}`;

      for (const r of rules) {
        if (r.match.rail && r.match.rail !== params.rail) continue;
        if (r.match.contains && r.match.contains.some((w) => hay.includes(w.toLowerCase()))) {
          return r.key;
        }
      }

      return "other";
    }
  };
}
