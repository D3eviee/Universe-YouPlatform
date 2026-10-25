import "server-only";
import type { z } from "zod";

export type Issue = { path: string; message: string };

/** Thrown for bad client input. Routes turn it into a 400 response. */
export class ValidationError extends Error {
  constructor(public issues: Issue[], message = "Invalid data") {
    super(message);
    this.name = "ValidationError";
  }
}

export const toIssues = (error: z.ZodError): Issue[] =>
  error.issues.map((i) => ({ path: i.path.join("."), message: i.message }));

/** True for a Postgres UNIQUE violation, whether or not Drizzle wrapped the error. */
export function isUniqueViolation(error: unknown): boolean {
  const e = error as { code?: string; cause?: { code?: string } } | null;
  return e?.code === "23505" || e?.cause?.code === "23505";
}