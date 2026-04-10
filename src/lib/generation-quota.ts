import { countGenerationsSince, utcMonthStart } from "@/db/generations";

import type { SessionAuthObject } from "@clerk/backend";

// Generation Quota Snapshot Type
export type GenerationQuotaSnapshot = {
  limit: number;
  used: number;
  remaining: number;
};

// Billing Plan Keys
export const BILLING_PLAN_KEYS = {
  free: "free",
  pro: "pro",
  studio: "studio",
} as const;

// Monthly Generation Limit
export const MONTHLY_GENERATION_LIMIT = {
  free: 3,
  pro: 75,
  studio: 175,
} as const;

// Get Monthly Generation Limit
export function getMonthlyGenerationLimit(
  has: SessionAuthObject["has"],
): number {
  if (has({ plan: BILLING_PLAN_KEYS.studio })) {
    return MONTHLY_GENERATION_LIMIT.studio;
  }

  if (has({ plan: BILLING_PLAN_KEYS.pro })) {
    return MONTHLY_GENERATION_LIMIT.pro;
  }

  return MONTHLY_GENERATION_LIMIT.free;
}

// Get Generation Quota Snapshot
export async function getGenerationQuotaSnapshot(
  has: SessionAuthObject["has"],
  clerkUserId: string,
) {
  const limit = getMonthlyGenerationLimit(has);
  const used = await countGenerationsSince(clerkUserId, utcMonthStart());
  return {
    limit,
    used,
    remaining: Math.max(0, limit - used),
  };
}
