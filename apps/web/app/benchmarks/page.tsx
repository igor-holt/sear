import { benchmarkSummary } from "@/lib/site";

export const metadata = {
  title: "Benchmarks",
  description: "Measured local preview benchmarks for the SEAR launch surface.",
};

export default function BenchmarksPage() {
  return (
    <main className="page-shell bench-shell">
      <p className="eyebrow">Measured launch proof</p>
      <h1>Benchmarks</h1>
      <p className="section-copy">
        These numbers are generated from the local benchmark harness in
        `apps/web/scripts/run-benchmarks.mjs`. Re-run `pnpm bench` after changes
        to refresh the published snapshot.
      </p>

      <section className="bench-table">
        <table>
          <thead>
            <tr>
              <th>Target</th>
              <th>Path</th>
              <th>Tail latency</th>
              <th>Req/sec</th>
              <th>KB/sec</th>
              <th>Bytes</th>
            </tr>
          </thead>
          <tbody>
            {benchmarkSummary.results.length === 0 ? (
              <tr>
                <td colSpan={6}>No benchmark snapshot yet. Run `pnpm bench`.</td>
              </tr>
            ) : (
              benchmarkSummary.results.map((result) => (
                <tr key={result.path}>
                  <td>{result.label}</td>
                  <td>{result.path}</td>
                  <td>{result.latencyTailMs} ms</td>
                  <td>{result.requestsPerSec}</td>
                  <td>{result.throughputKbPerSec}</td>
                  <td>{result.transferredBytes}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}
