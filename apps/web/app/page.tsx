import Link from "next/link";
import {
  benchmarkSummary,
  featureCards,
  launchChecklist,
  productName,
  productStats,
  productTagline,
  siteDescription,
} from "@/lib/site";

export default function Home() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: productName,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    description: siteDescription,
    featureList: featureCards.map((feature) => feature.title),
  };

  return (
    <main className="page-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <header className="site-header">
        <div>
          <p className="eyebrow">Main product</p>
          <h1 className="brand-mark">SEAR</h1>
        </div>
        <nav className="site-nav">
          <Link href="/benchmarks">Benchmarks</Link>
          <Link href="/docs">Docs</Link>
          <Link href="/privacy">Privacy</Link>
        </nav>
      </header>

      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">Shipping agent systems with proof, not vibes</p>
          <h2>{productTagline}</h2>
          <p className="hero-text">{siteDescription}</p>
          <div className="cta-row">
            <Link href="/benchmarks" className="primary-cta">
              View launch benchmarks
            </Link>
            <Link href="/docs" className="secondary-cta">
              Review operator docs
            </Link>
          </div>
        </div>
        <div className="hero-card">
          <p className="eyebrow">Release posture</p>
          <ul className="bullet-list">
            {launchChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="stat-grid">
        {productStats.map((stat) => (
          <article key={stat.label} className="stat-card">
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
            <p>{stat.detail}</p>
          </article>
        ))}
      </section>

      <section className="section-panel">
        <div className="section-heading">
          <p className="eyebrow">What ships</p>
          <h3>One product, three operator surfaces</h3>
        </div>
        <div className="feature-grid">
          {featureCards.map((feature) => (
            <article key={feature.title} className="feature-card">
              <h4>{feature.title}</h4>
              <p>{feature.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-panel split-panel">
        <div>
          <p className="eyebrow">Benchmark posture</p>
          <h3>Marketing can cite actual numbers.</h3>
          <p className="section-copy">
            SEAR publishes request latency, throughput, payload size, and visibility
            artifacts from the same codebase you deploy.
          </p>
        </div>
        <div className="metric-stack">
          <div className="metric-row">
            <span>Scenario</span>
            <strong>{benchmarkSummary.scenario}</strong>
          </div>
          <div className="metric-row">
            <span>Last refresh</span>
            <strong>{benchmarkSummary.generatedAt ?? "pending"}</strong>
          </div>
          <div className="metric-row">
            <span>Artifact coverage</span>
            <strong>
              {Object.values(benchmarkSummary.artifacts).filter(Boolean).length}/3
            </strong>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <p>SEAR is built for visible launches: benchmarks, SEO, ChatGPT app wiring, and CLI ops in one repo.</p>
        <div className="footer-links">
          <Link href="/benchmarks">Benchmarks</Link>
          <Link href="/docs">Docs</Link>
          <Link href="/llms.txt">llms.txt</Link>
        </div>
      </footer>
    </main>
  );
}
