import "server-only";
import { z } from "zod";
import { incomingBlockSchema } from "@/lib/schemas/blocks";
import { ValidationError, toIssues } from "@/server/errors";

// --- SMALL HELPERS ---
export const isFile = (v: FormDataEntryValue | null): v is File => v instanceof File && v.size > 0;

/** Reads a text field. Missing fields and file fields become undefined, so zod defaults apply. */
const textField = (formData: FormData, key: string) => {
  const v = formData.get(key);
  return typeof v === "string" ? v : undefined;
};

/** Reads exactly the fields a schema defines from the form and validates them. */
export function parseFields<S extends z.ZodObject<any>>(formData: FormData, schema: S): z.output<S> {
  const raw = Object.fromEntries(Object.keys(schema.shape).map((k) => [k, textField(formData, k)]));
  const parsed = schema.safeParse(raw);
  if (!parsed.success) throw new ValidationError(toIssues(parsed.error));
  // TypeScript can't follow a generic schema through safeParse, so state the result type
  return parsed.data as z.output<S>;
}

// --- BLOCKS FIELD ---
/** The "blocks" form field: a JSON string → validated blocks. */
export const blocksField = z
  .string()
  .default("[]")
  .transform((s, ctx) => {
    try {
      return JSON.parse(s) as unknown;
    } catch {
      ctx.addIssue({ code: "custom", message: "blocks is not valid JSON" });
      return z.NEVER;
    }
  })
  .pipe(z.array(incomingBlockSchema).max(500));