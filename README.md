# magpie-agent-mycode

A [magpie](https://usemagpie.ai) **agent plugin** for
[MCode](https://github.com/MCapricorns/mycode). It adds MCode to magpie's
Agents page and writes the gateway binding into `~/.mycode/settings.json`, so
MCode runs every turn through magpie.

## Install

```sh
magpie plugin add github:MCapricorns/magpie-mycode
```

Or open **Plugins → Add a plugin** in the magpie app and paste the same
`github:MCapricorns/magpie-mycode` value.

Then open **Agents**, pick **MCode**, and pick a model. MCode reads the binding
when a session starts, so start a new session after switching.

Remove it with `magpie plugin rm magpie-agent-mycode`; that disconnects MCode
and restores the keys it had before.

## What magpie writes

| Key | Value |
| --- | --- |
| `magpie.enabled` | `true` while magpie serves the model |
| `magpie.baseUrl` | the gateway, ending in `/v1` (`http://127.0.0.1:3425/v1`) |
| `magpie.apiKey` | the key magpie made for MCode (`magpie-mycode`) |
| `magpie.model` | the model picked in magpie (`provider/model`) |

Nothing else in `settings.json` is touched. Picking MCode's own model again (or
switching the row off) restores the three keys and removes `magpie.model`.

## What magpie's Library writes

Because the plugin declares `library`, MCode also accepts magpie's Library:

| Library item | File |
| --- | --- |
| Instructions / rules | `~/.mycode/AGENTS.md` |
| MCP servers | `~/.mycode/mcp.json` (`{"mcpServers": {…}}`) |
| Skills | `~/.mycode/skills/<name>/SKILL.md` |

That is how web search reaches the model: magpie adds its `anysearch` MCP
server, and MCode has no built-in search of its own.

## Requirements

- MCode on `PATH` as `mycode`, or `~/.mycode` present.
- magpie running: the app, `magpie tray`, or `magpie serve`.

## Layout

```text
agent.js        the agent declaration and connect()
package.json    "magpie": { "agent": "./agent.js" }
LICENSE         Apache-2.0
```

## License

Apache-2.0. See [LICENSE](LICENSE).
