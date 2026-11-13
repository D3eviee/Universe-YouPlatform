export const USER_ROLES = ["user", "editor", "admin"] as const;
export const ARTICLE_STATUSES = ["public", "draft", "archived"] as const;
export const ARTICLE_PRIORITIES = ["normal", "hero1", "hero2", "hero3"] as const;
export const SUBSCRIPTION_STATUSES = ["inactive", "active", "past_due", "canceled"] as const;
export const CONTENT_STATUSES = ["draft", "public", "archived"] as const;
export const MATH_MODELS = ["linear", "square_root", "quadratic", "inverse_square"] as const;

export type UserRole = (typeof USER_ROLES)[number];
export type SubscriptionStatus = (typeof SUBSCRIPTION_STATUSES)[number];
export type ContentStatus = (typeof CONTENT_STATUSES)[number];
export type ArticlePriority = (typeof ARTICLE_PRIORITIES)[number];
export type MathModelType = (typeof MATH_MODELS)[number];

export const STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "public", label: "Public" },
  { value: "archived", label: "Archived" },
] as const satisfies readonly { value: ContentStatus; label: string }[];

export const PRIORITY_OPTIONS = [
  { value: "normal", label: "Normal" },
  { value: "hero1", label: "Hero 1" },
  { value: "hero2", label: "Hero 2" },
  { value: "hero3", label: "Hero 3" },
] as const satisfies readonly { value: ArticlePriority; label: string }[];