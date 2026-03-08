import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { quotes } from "@/server/schema";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  try {
    const allQuotes = await db.query.quotes.findMany({
      orderBy: [desc(quotes.createdAt)]
    });
    return NextResponse.json(allQuotes, { status: 200 });
  } catch (error) {
    console.error("Error fetching quotes:", error);
    return NextResponse.json(
      { error: "Failed to fetch quotes" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { quote, author, source } = body;

    console.log(quote, author, source)
    const result = await db.insert(quotes)
    .values({ quote, author, source })
    .returning();

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error creating quote:", error);
    return NextResponse.json(
      { error: "Failed to create quote" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, quote, author, source } = body;

    const result = await db.update(quotes)
      .set({ quote, author, source })
      .where(eq(quotes.id, id))
      .returning()
      
    if(result[0]) return NextResponse.json({ status: 200 });
  }catch (error) {
    console.error("Error updating quote:", error);
    return NextResponse.json(
      { error: "Failed to update quote" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    await db.delete(quotes).where(eq(quotes.id, id));

    return NextResponse.json(
      { message: "Quote deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting quote:", error);
    return NextResponse.json(
      { error: "Failed to delete quote" },
      { status: 500 }
    );
  }
}
