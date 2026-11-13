import "server-only";
import { NextResponse } from "next/server";
import { ValidationError, isUniqueViolation } from "@/server/errors";

export const denied = (status: 401 | 403) => NextResponse.json({ error: "Permission denied" }, { status });
export const notFound = (what: string) => NextResponse.json({ error: `${what} not found` }, { status: 404 });

/** 
 * Maps any error to a response:
 * bad input → 400 (with field issues), 
 * duplicate slug/id → 409,
 * anything else → 500 (logged).
 **/
export function errorResponse(error: unknown, fallback: string) {
  if (error instanceof ValidationError)
    return NextResponse.json({ error: error.message, issues: error.issues }, { status: 400 });

  if (isUniqueViolation(error))
    return NextResponse.json({ error: "This slug is already in use. Change the title." }, { status: 409 });

  console.error(fallback, error);
  return NextResponse.json({ error: fallback }, { status: 500 });
}
