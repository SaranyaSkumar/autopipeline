# AutoPipeline

**An experimental, configuration-driven CI generator for GitHub Actions.** Instead of writing the same checks from scratch in every repository, AutoPipeline detects the project language, suggests checks and generates reviewable workflow YAML. It does **not** replace runners, handle production deployment in v0.1, or claim that existing CI templates are insufficient.

## Implemented
- Detects Node/npm, pnpm, Yarn, Python (`pyproject.toml`) and Java/Maven (`pom.xml`)
- Configurable lint, typecheck, unit test, build, E2E and limited dependency audit steps
- Deterministic GitHub Actions generation, CI-only with least-privilege token
- Custom command overrides with single-line input validation
- CLI `init`, `doctor`, `render`, `generate` and `check` for drift detection
- Automated core tests running in GitHub Actions

## Quick start

From a clone of this repo, in your **application** project:

```sh
node /path/to/autopipeline/bin/autopipeline.mjs init
node /path/to/autopipeline/bin/autopipeline.mjs doctor
node /path/to/autopipeline/bin/autopipeline.mjs generate
node /path/to/autopipeline/bin/autopipeline.mjs check
```

Or, after linking/installing the package locally, use `npx autopipeline` with the same commands. This package is **not published to npm** yet.

Example `autopipeline.json`:

```json
{
  "version": 1,
  "project": {"language": "node", "packageManager": "npm", "runtime": "22"},
  "ci": {
    "lint": true,
    "typecheck": true,
    "unit": true,
    "build": true,
    "e2e": false,
    "dependencyAudit": false
  },
  "deploy": {"enabled": false}
}
```

Any enabled check can use an explicit script with `ci.commands`. No deployment integration is implemented. The generated workflows must be reviewed before commit.

## Validation

- [AutoPipeline test PR #1](https://github.com/SaranyaSkumar/autopipeline/pull/1) tests the package through GitHub Actions.
- [FamilyOS pilot PR #111](https://github.com/SaranyaSkumar/familyos/pull/111) uses a **vendored snapshot of the same AutoPipeline core** to exercise a real Next.js project. It remains isolated from production deployment. Once this repo is public or the package is published, replace the snapshot with a normal package install.

## Limitations

- No complete security suite yet (SAST, secrets scan, SBOM and IaC scanning are planned).
- Node `npm audit` and Python `pip-audit` are optional and not substitutes for a comprehensive audit.
- E2E setup may require browser installation, services or custom commands.
- Python builds and Maven projects may require additional dependencies or wrappers.
- Detection is heuristic and initialised configs should always be reviewed.
- Versioned plugin architecture, multi-provider CI, organisation policies and deployments are roadmap items.

## Documentation

See [architecture and research](docs/architecture.md), [validation report](docs/validation.md) and [example configs](examples/README.md).

MIT licensed. Contributions welcome after the first pilot is validated.
