export const metadata = {
  title: "Privacy",
  description: "Privacy posture for the SEAR web app, CLI, and ChatGPT app surface.",
};

export default function PrivacyPage() {
  return (
    <main className="page-shell privacy-shell">
      <p className="eyebrow">Submission-ready baseline</p>
      <h1>Privacy</h1>
      <p>
        SEAR is designed to minimize data collection. The public site serves static
        product content. The CLI uses explicit operator commands. The ChatGPT app
        tools are read-only and return only benchmark and product metadata needed to
        answer the user’s request.
      </p>

      <h2>What SEAR stores</h2>
      <ul className="bullet-list">
        <li>No user accounts or session databases are required for the public site.</li>
        <li>No analytics SDK is embedded by default.</li>
        <li>No personally identifiable inputs are required by the MCP tool schemas.</li>
      </ul>

      <h2>What operators control</h2>
      <p>
        Deployment URLs, telemetry providers, and any future write-capable tools are
        controlled by environment configuration. Until those are added, SEAR remains
        a read-only launch surface.
      </p>
    </main>
  );
}
