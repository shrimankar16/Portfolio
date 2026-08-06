import type { Metadata } from "next";
import SetupClient from "./SetupClient";

export const metadata: Metadata = {
  title: "Setup — Configure Portfolio",
  description:
    "One-time setup flow to configure your space-themed portfolio from your GitHub repos, profile README and pasted LinkedIn content.",
};

export const dynamic = "force-dynamic";

export default function SetupPage() {
  return <SetupClient />;
}
