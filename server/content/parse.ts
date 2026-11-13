import "server-only";
import type { z } from "zod";
import { ValidationError, toIssues } from "@/server/errors";

/** Reads a JSON request body and validates it. Throws ValidationError on bad input. */
export async function parseJsonBody<S extends z.ZodType>(req: Request, schema: S): Promise<z.output<S>> {
  let body: unknown;
  try { body = await req.json(); } 
  catch { throw new ValidationError([{ path: "", message: "Request body must be valid JSON" }]); }

  const parsed = schema.safeParse(body);
  if (!parsed.success) throw new ValidationError(toIssues(parsed.error));
  return parsed.data as z.output<S>;
}
