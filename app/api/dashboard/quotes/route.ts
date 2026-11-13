import { NextResponse } from "next/server";
import { z } from "zod";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/server/db";
import { quotes } from "@/server/schema";
import { requireAdmin } from "@/lib/auth";
import { parseJsonBody } from "@/server/content/parse";
import { denied, errorResponse, notFound } from "@/server/http";

const quoteFields = {
  quote: z.string().trim().min(1, "Quote is required").max(350),
  author: z.string().trim().min(1, "Author is required").max(70),
  source: z.string().trim().max(70).default(""),
};

const createSchema = z.object(quoteFields);
const updateSchema = z.object({ id: z.uuid(), ...quoteFields });
const deleteSchema = z.object({ id: z.uuid() });

// The homepage shows the daily quote, so refresh it after every change
const refreshHomepage = () => revalidatePath("/");


// Get all quotes in dashboard
export async function GET() {
  const auth = await requireAdmin();
  if (!auth.ok) return denied(auth.status);

  try {
    const all = await db.query.quotes.findMany({ orderBy: [desc(quotes.createdAt)] });
    return NextResponse.json(all);
  } catch (error) {
    return errorResponse(error, "Error while getting quotes");
  }
}

// Send new quote to db
export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return denied(auth.status);

  try {
    const values = await parseJsonBody(req, createSchema);
    const [saved] = await db.insert(quotes).values(values).returning();
    refreshHomepage();
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    return errorResponse(error, "Error while saving quote");
  }
}

// Upadate existing quote in db
export async function PUT(req: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return denied(auth.status);

  try {
    const { id, ...changes } = await parseJsonBody(req, updateSchema);
    const [saved] = await db.update(quotes).set(changes).where(eq(quotes.id, id)).returning();
    if (!saved) return notFound("Quote");

    refreshHomepage();
    return NextResponse.json(saved);
  } catch (error) {
    return errorResponse(error, "Error while updating quote");
  }
}

export async function DELETE(req: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return denied(auth.status);

  try {
    const { id } = await parseJsonBody(req, deleteSchema);
    const [deleted] = await db.delete(quotes).where(eq(quotes.id, id)).returning({ id: quotes.id });
    if (!deleted) return notFound("Quote");

    refreshHomepage();
    return NextResponse.json({ id: deleted.id });
  } catch (error) {
    return errorResponse(error, "Error while deleting quote");
  }
}