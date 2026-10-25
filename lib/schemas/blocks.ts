import { z } from "zod";

// One shape, three variants
// A block looks the same everywhere except for `imageFile`:
//   - stored in the DB          → always a string (S3 key, or "" if none)
//   - arriving from the editor  → string, or {} (a File that JSON.stringify emptied)
//   - in the editor's state     → string, or a File not uploaded yet
// So the schema is built by a factory that takes the imageFile schema as a parameter.

function makeBlockSchema<F extends z.ZodType>(imageFile: F) {
  const image = z.object({
    imageDescription: z.string().max(250),
    imageAlt: z.string().max(50),
    imageSource: z.string().max(250),
    imageFile,
  });

  const text = z.string().max(50_000);
  const withId = <T extends z.ZodRawShape>(shape: T) => z.object({ id: z.string().min(1).max(100), ...shape });

  return z.discriminatedUnion("type", [
    withId({ type: z.literal("heading"), data: z.object({ text }) }),
    withId({ type: z.literal("paragraph"), data: z.object({ text }) }),
    withId({ type: z.literal("highlight"), data: z.object({ text }) }),
    withId({ type: z.literal("image"), data: image }),
    withId({ type: z.literal("gallery"), data: z.object({ images: z.array(image).max(50) }) }),
    withId({ type: z.literal("quote"), data: z.object({ quote: text, quoteAuthor: z.string(), authorRole: z.string() }),}),
    withId({ type: z.literal("equation"), data: z.object({ equationExpression: z.string().max(5000), equationCaption: z.string() }), }),
    withId({ type: z.literal("sources"), data: z.object({ sources: z.array(z.string().max(1000)).max(200) }) }),
    withId({ type: z.literal("lab-predefined"), data: z.object({ moduleName: z.string().max(100) }) }),
  ]);
}

// This stops a client from pointing a block at an arbitrary URL or someone else's path.
// The extension is optional because images uploaded by the old code have none.
const s3Key = z
  .string()
  .regex(/^((articles|books)\/[0-9a-f-]{36}\/[0-9a-f-]{36}(\.[a-z0-9]+)?)?$/, "Invalid image key");

/** --- Blocks as stored in the DB. imageFile always as a string. --- */
export const storedBlockSchema = makeBlockSchema(s3Key);

/** Blocks as the editor sends them. A not-yet-uploaded File arrives as {} and becomes "". */
export const incomingBlockSchema = makeBlockSchema(
  z.union([s3Key, z.object({}).strict()]).transform((v) => (typeof v === "string" ? v : "")),
);

/** Blocks in the editor's state. imageFile may still be a File. Used for types only. */
const editorBlockSchema = makeBlockSchema(z.union([s3Key, z.instanceof(File)]));

// Types generated from the schemas above
export type StoredBlock = z.infer<typeof storedBlockSchema>;
export type EditorBlock = z.infer<typeof editorBlockSchema>;
export type BlockType = StoredBlock["type"];

type DataOf<B, T extends string> = Extract<B, { type: T }> extends { data: infer D } ? D : never;

export type StoredImage = DataOf<StoredBlock, "image">;
export type EditorImage = DataOf<EditorBlock, "image">;