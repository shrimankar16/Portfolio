import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  // Skip database check if DATABASE_URL is not configured
  // This allows the site to build without a database
  if (!process.env.DATABASE_URL) {
    return Response.json({ 
      ok: true, 
      message: "Database not configured" 
    });
  }

  try {
    // Lazy import to avoid loading db module during build
    const { db } = await import("@/db");
    
    if (!db) {
      return Response.json({ 
        ok: false, 
        error: "Database not initialized" 
      }, { status: 500 });
    }
    
    await db.execute(sql`select 1`);
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ 
      ok: false, 
      error: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 });
  }
}
