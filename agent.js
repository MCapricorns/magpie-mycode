// magpie agent plugin for MYCode.
//
// magpie writes three things into `~/.mycode/settings.json`:
//   magpie.enabled  true while magpie serves the model
//   magpie.baseUrl  the gateway, ending in /v1
//   magpie.apiKey   the key magpie made for MYCode (counts under "mycode")
//
// `agent.model` names the key magpie writes the picked model to; `connect`
// returns the rest. MYCode reads the gateway's /v1/models list itself, so no
// model catalog is written here.
//
// The Library block lets magpie own the rest of MYCode's context:
//   instructions -> ~/.mycode/AGENTS.md
//   mcp          -> ~/.mycode/mcp.json   ({"mcpServers": {...}})
//   skills       -> ~/.mycode/skills     (<name>/SKILL.md folders)
//
// Docs: https://usemagpie.ai/docs/plugins#agents

export const agent = {
  id: "mycode",
  name: "MYCode",
  // MYCode's mark (docs/images/logo.svg of its repository), inlined as a data
  // URI so magpie shows it without fetching anything. `icon.svg` beside this
  // file is the same picture, and package.json's magpie.icon carries it for
  // the plugin's own card.
  icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjU2IDI1NiIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJNWUNvZGUiPgogIDxyZWN0IHg9IjgiIHk9IjgiIHdpZHRoPSIyNDAiIGhlaWdodD0iMjQwIiByeD0iNTgiIGZpbGw9IiNmZmZmZmYiLz4KICA8cGF0aCBkPSJNNzYgMTgyVjgybDUyIDU2IDUyLTU2djEwMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==",
  bin: "mycode",
  dir: "~/.mycode",
  config: "~/.mycode/settings.json",
  format: "json",
  model: "magpie.model",
  ua: ["mycode-agent"],
  notice:
    "MYCode reads settings when a session starts: start a new session to use the new model.",
  library: {
    instructions: "~/.mycode/AGENTS.md",
    mcp: "~/.mycode/mcp.json",
    mcpFormat: "claude",
    skills: "~/.mycode/skills",
  },
};

// Called by magpie whenever the model changes and whenever its model list
// changes. Every returned key is set in place; comment and key order survive,
// and picking the agent's own model again restores what was there.
export function connect({ gateway } = {}) {
  // magpie calls connect once at load to validate the plugin, before a
  // gateway exists; there is nothing to write in that pass.
  if (!gateway || !gateway.v1) {
    return {};
  }
  return {
    "magpie.enabled": true,
    "magpie.baseUrl": gateway.v1,
    "magpie.apiKey": gateway.key,
  };
}
