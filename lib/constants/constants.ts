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


