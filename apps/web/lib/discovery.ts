export const registryVersion = "0.1.0";

export const smitheryServerCard = {
  serverInfo: {
    name: "SEAR",
    version: registryVersion,
  },
  authentication: {
    required: false,
  },
  tools: [
    {
      name: "sear_overview",
      description:
        "Show a concise summary of what SEAR ships and why it exists.",
      inputSchema: {
        type: "object",
        properties: {
          audience: {
            type: "string",
            enum: ["operator", "founder", "reviewer"],
            default: "operator",
          },
        },
      },
    },
    {
      name: "sear_benchmarks",
      description:
        "Show measured latency, throughput, and visibility artifact status for SEAR.",
      inputSchema: {
        type: "object",
        properties: {
          view: {
            type: "string",
            enum: ["summary", "full"],
            default: "summary",
          },
        },
      },
    },
    {
      name: "sear_cli_help",
      description:
        "Show the safe first commands for verifying or querying a SEAR deployment from the terminal.",
      inputSchema: {
        type: "object",
        properties: {},
      },
    },
  ],
  resources: [],
  prompts: [],
} as const;

export const glamaConnector = {
  $schema: "https://glama.ai/mcp/schemas/connector.json",
  maintainers: [
    {
      email: "igor@kovachenterprises.com",
    },
  ],
} as const;
