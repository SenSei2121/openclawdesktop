# Model Context Protocol (MCP): The Complete Guide

**Target keyword:** model context protocol mcp
**Secondary:** mcp server tutorial, mcp tools integrations
**Word count:** ~1,800

---

Model Context Protocol (MCP) is an open standard that lets AI assistants connect to external tools, data sources, and services through a unified interface. Instead of building custom integrations for each tool, MCP provides a single protocol that any AI agent can use to access any compatible server.

## Quick Answer

MCP is a communication standard between AI assistants and tools. An AI assistant (like OpenClaw) connects to MCP servers, each providing specific capabilities — file access, database queries, API calls, browser control. Think of MCP as USB for AI: one standard connector, many devices.

## Why MCP Matters

Before MCP, every AI tool needed custom integration code for each service it connected to. LangChain had its own tool format. OpenClaw had its own. Auto-GPT had its own. This meant duplication of effort and incompatibility between ecosystems.

MCP standardizes this. A tool provider builds one MCP server, and any MCP-compatible AI assistant can use it immediately.

**The impact:**
- **Tool providers** build once, work everywhere
- **AI frameworks** get access to a growing tool ecosystem
- **Users** get more capable AI without waiting for custom integrations

## Architecture

```
AI Assistant (OpenClaw, Claude, etc.)
    │
    ├── MCP Server: File System
    ├── MCP Server: Database
    ├── MCP Server: Web Search
    ├── MCP Server: Email
    └── MCP Server: Custom Tool
```

Each MCP server exposes:
- **Tools**: Functions the AI can call (e.g., `search_web`, `send_email`)
- **Resources**: Data the AI can read (e.g., file contents, database records)
- **Prompts**: Pre-built interaction patterns

## Setting Up MCP Servers

### With OpenClaw Desktop Manager

OpenClaw Manager provides a visual MCP management interface:
1. Open OpenClaw Manager
2. Navigate to the MCP tab
3. Add servers via the UI (StdIo or SSE)
4. Changes automatically sync to your MCP configuration

### With Command Line

```json
// ~/.mcporter/mcporter.json
{
  "servers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/directory"]
    },
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "your-key"
      }
    }
  }
}
```

## Popular MCP Servers

| Server | Capability | Use Case |
|--------|-----------|----------|
| Filesystem | Read/write files | Document management |
| Brave Search | Web search | Research and fact-checking |
| GitHub | Repository operations | Code management |
| PostgreSQL/SQLite | Database queries | Data analysis |
| Slack | Messaging | Team communication |
| Google Drive | Cloud file access | Document collaboration |
| Puppeteer | Browser automation | Web scraping, testing |

## Building a Custom MCP Server

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server(
  { name: "my-tool", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler("tools/list", async () => ({
  tools: [{
    name: "my_function",
    description: "Does something useful",
    inputSchema: {
      type: "object",
      properties: {
        input: { type: "string", description: "The input" }
      }
    }
  }]
}));

server.setRequestHandler("tools/call", async (request) => {
  if (request.params.name === "my_function") {
    const result = await doSomething(request.params.arguments.input);
    return { content: [{ type: "text", text: result }] };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
```

## MCP in the Ecosystem

| AI Assistant | MCP Support |
|-------------|-------------|
| OpenClaw | Full support via mcporter |
| Claude Desktop | Full support |
| Cursor | Full support |
| LangChain | Via adapter |
| Others | Growing adoption |

## FAQ

**Is MCP an Anthropic standard?**
MCP was introduced by Anthropic and is open source. It is adopted beyond Anthropic's products — OpenClaw, Cursor, and other tools support it.

**Do I need MCP to use OpenClaw?**
No. OpenClaw has built-in capabilities (browser, files, shell, messaging) that work without MCP. MCP extends capabilities with additional tools.

**How is MCP different from function calling?**
Function calling is a model-level feature (the LLM decides to call a function). MCP is a transport-level protocol (how the assistant communicates with external tools). MCP can use function calling under the hood.

**Is there a directory of MCP servers?**
Yes. The MCP GitHub organization maintains a list of official servers. Community servers are listed in various directories. OpenClaw Manager includes a built-in MCP server browser.
