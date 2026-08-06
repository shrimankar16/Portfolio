import { NextResponse } from "next/server";
import { loadConfig, saveConfig, type SiteConfig } from "@/lib/config";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(loadConfig());
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as SiteConfig;
    if (!body || !body.profile || !Array.isArray(body.projects)) {
      return NextResponse.json({ error: "Invalid config payload" }, { status: 400 });
    }
    body.meta = body.meta ?? { githubUsername: "" };
    body.meta.generatedAt = new Date().toISOString();
    body.meta.lastSetupRun = new Date().toISOString();
    saveConfig(body);
    return NextResponse.json({ ok: true, config: loadConfig() });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message ?? "Failed to save config" },
      { status: 500 }
    );
  }
}
