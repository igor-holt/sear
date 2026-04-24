import { docsSections } from "@/lib/site";

export const metadata = {
  title: "Docs",
  description: "Operator docs for the SEAR site, MCP endpoint, and CLI.",
};

export default function DocsPage() {
  return (
    <main className="page-shell docs-shell">
      <p className="eyebrow">Operator path</p>
      <h1>Docs</h1>
      <p>
        SEAR ships as a Next.js marketing surface, a read-only remote MCP server for
        ChatGPT developer mode, and an installable `sear` CLI for future Codex
        threads.
      </p>

      <div className="stack-list">
        {docsSections.map((section) => (
          <article key={section.heading}>
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </article>
        ))}
      </div>

      <pre className="code-block">
{`pnpm install
pnpm build
pnpm test
pnpm bench
pnpm install:cli
sear --json doctor`}
      </pre>
    </main>
  );
}
