# Contributing

AutoPipeline is experimental. Before adding a check adapter or provider, describe the existing tools it would wrap, the problem it solves, failure handling, permissions and fixture tests.

## Developer workflow

1. Fork or create a feature branch from main.
2. Run `npm test` with Node.js 22.
3. Update docs and add deterministic rendering tests.
4. Avoid breaking configuration format `version: 1`.
5. Open a PR with example input, expected workflow output and the security impact.

No generated workflow should include user secrets, unrestricted write tokens or production deployment steps by default.

The v0.1 CLI currently has no published npm release. Please don't depend on its API being stable.
