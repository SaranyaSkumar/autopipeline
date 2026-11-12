# Architecture and research notes

AutoPipeline provides configuration-driven, reviewable GitHub Actions workflows. It does not replace GitHub Actions, implement its own runners or claim that CI templates are novel.

## Existing products to learn from
- [GitHub reusable workflows](https://docs.github.com/en/actions/how-tos/reuse-automations/reuse-workflows): shared workflows and templates
- [Dagger](https://dagger.io/): programmable portable pipelines
- [Nx](https://nx.dev/): task caching and affected-project detection
- [Renovate](https://docs.renovatebot.com/modules/manager/github-actions/): action version maintenance
- [actionlint](https://github.com/rhysd/actionlint) and [zizmor](https://github.com/woodruffw/zizmor): validation and security analysis

## Four target real-world workflows
1. Next.js (npm): lint, typecheck, Vitest, optional build and Playwright; deployment through existing Vercel integration or opt-in future adapter.
2. Python FastAPI: Ruff, pytest, build, pip-audit; production deployment is future work.
3. Java Maven: tests, compilation, optional Checkstyle, package; production deployment is future work.
4. AWS SAM: template validation, unit tests, IaC checks, build; eventual AWS deployment must use constrained OIDC role and protected environment.

## Release roadmap
- v0.1: Node/npm, Python/pip, Java/Maven detection, configurable basic checks, no-CD GitHub Actions output, CLI init/generate/check/doctor, tests.
- v0.2: robust package manager support, security scanning adapters (secrets, SAST, IaC), E2E provisioning, report outputs, GitHub workflow validators.
- v0.3: GitHub reusable workflow presets, monorepo support, organisation policies, configuration upgrades and drift checks.
- v0.4: opt-in Vercel, AWS and Docker deployment adapters, approval integration, security integration tests.
- v1.0: stable plugin contract, documentation and tested fixtures for all advertised environments.

## Security defaults
- CI only; production deployment and credentials are not generated.
- Read-only GitHub token, no pull_request_target, pinned external action SHAs.
- Generated YAML must be reviewed before commit.
- Don't pass production secrets to untrusted PR code.
- Shell overrides execute arbitrary commands: only trust repo configs and contributors with write permission.
- Node/Python/Java checks require actual project commands and dependencies; missing commands must fail instead of pretending to run.
- Required environment variables, test services and private registries are repository-specific.

## Success criteria
- Deterministic generated workflows
- Drift detection and actionable errors
- Unit tests passing for detectors, validation and renderer
- Actual GitHub Actions CI pass on a sample repository
- Later a separate non-deployment FamilyOS pull request demonstrates adoption
- Compare setup time against existing templates and collect feedback before claiming developer value

## Additional open-source ideas
1. Pipeline Doctor: inspect existing GitHub Actions workflows, explain risks and propose minimal fixes.
2. Release Readiness: consolidate quality/security checks and evidence into a verifiable release checklist.
3. Deploy Contract Tester: validate OIDC, protected environments and artifact settings without deploying.
4. CI Test Matrix Optimiser: suggest the cheapest representative job matrix from supported runtimes, with explicit constraints and evidence.
