// magpie agent plugin for MCode.
//
// magpie writes three things into `~/.mycode/settings.json`:
//   magpie.enabled  true while magpie serves the model
//   magpie.baseUrl  the gateway, ending in /v1
//   magpie.apiKey   the key magpie made for MCode (counts under "mycode")
//
// `agent.model` names the key magpie writes the picked model to; `connect`
// returns the rest. MCode reads the gateway's /v1/models list itself, so no
// model catalog is written here.
//
// The Library block lets magpie own the rest of MCode's context:
//   instructions -> ~/.mycode/AGENTS.md
//   mcp          -> ~/.mycode/mcp.json   ({"mcpServers": {...}})
//   skills       -> ~/.mycode/skills     (<name>/SKILL.md folders)
//
// Docs: https://usemagpie.ai/docs/plugins#agents

export const agent = {
  id: "mycode",
  name: "MCode",
  bin: "mycode",
  dir: "~/.mycode",
  config: "~/.mycode/settings.json",
  format: "json",
  model: "magpie.model",
  ua: ["mycode-agent"],
  notice:
    "MCode reads settings when a session starts: start a new session to use the new model.",
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
