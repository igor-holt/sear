const VERSION = "0.1.0";
const DEFAULT_BASE_URL = "https://sear.genesisconductor.io";

export function resolveBaseUrl(baseUrl?: string) {
  return (baseUrl || process.env.SEAR_BASE_URL || DEFAULT_BASE_URL).replace(
    /\/$/,
    "",
  );
}

async function fetchPath(path: string, baseUrl?: string) {
  const origin = resolveBaseUrl(baseUrl);
  const response = await fetch(`${origin}${path}`);
  const contentType = response.headers.get("content-type") ?? "text/plain";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    throw new Error(
      typeof payload === "string"
        ? payload
        : JSON.stringify(payload),
    );
  }

  return {
    baseUrl: origin,
    contentType,
    payload,
  };
}

export async function doctor(baseUrl?: string) {
  const origin = resolveBaseUrl(baseUrl);

  try {
    await fetchPath("/api/overview", origin);

    return {
      tool: "sear",
      version: VERSION,
      baseUrl: origin,
      reachable: true,
      auth: {
        required: false,
        source: "none",
      },
    };
  } catch (error) {
    return {
      tool: "sear",
      version: VERSION,
      baseUrl: origin,
      reachable: false,
      auth: {
        required: false,
        source: "none",
      },
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export async function overview(baseUrl?: string) {
  return fetchPath("/api/overview", baseUrl);
}

export async function benchmarks(baseUrl?: string) {
  return fetchPath("/api/benchmark", baseUrl);
}

export async function sitemap(baseUrl?: string) {
  return fetchPath("/sitemap.txt", baseUrl);
}

export async function rawGet(path: string, baseUrl?: string) {
  return fetchPath(path.startsWith("/") ? path : `/${path}`, baseUrl);
}

export function toHuman(label: string, value: unknown) {
  if (typeof value === "string") {
    return `${label}\n${value}`;
  }

  return `${label}\n${JSON.stringify(value, null, 2)}`;
}
