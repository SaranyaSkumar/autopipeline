# Validation report

**Date:** 13 November 2026 (NZ). **Scope:** AutoPipeline v0.1 CLI and FamilyOS Next.js CI pilot. This documents what has actually been executed, not intended capabilities.

## Standalone package

- Source: `SaranyaSkumar/autopipeline`, main branch.
- Integration test: [PR #1](https://github.com/SaranyaSkumar/autopipeline/pull/1).
- GitHub Actions run ID: `43213027439`; **success**.
- Job `Test AutoPipeline`: checkout, Node 22 setup and `npm test` all succeeded.
- Automated test coverage currently includes Node detection, configuration generation, deterministic generation and drift checking, rejection of missing scripts and deployment, minimum token permissions and Python/Maven render smoke tests.
- The CLI is not yet published to npm, and the GitHub repository is private. Neither should be presented as a publicly available package.

## FamilyOS real-world pilot

- PR: [FamilyOS #111](https://github.com/SaranyaSkumar/familyos/pull/111), branch `feat/autopipeline-pilot`.
- GitHub Actions run ID: `43213208176`; **success**.
- Successful steps: checkout, setup Node, `npm ci`, `npm run lint`, `npm run typecheck`, `npm run test` plus AutoPipeline tests, `npm run build`, and `npm audit --audit-level=high`.
- Does not deploy FamilyOS. Existing Vercel integration and main branch are unchanged.
- Integration currently uses a **vendored snapshot of the same AutoPipeline core** because the source repository is private and the package is not published. Converting this to a normal external dependency remains a separate, necessary release step.
- Follow-up run ID `43213703436` **passed all steps**, including `autopipeline check` (workflow/configuration drift gate), lint, typecheck, application and generator unit tests, Next.js build, and high-severity npm dependency audit.

## What was not validated

- No independent Python application or Java application was executed under a GitHub Actions job yet. Their generated output is smoke-tested only.
- No live Vercel, AWS, container registry or production deployment integration.
- No SAST, secrets scan, IaC scan, SBOM, licence compliance, release versioning, deployment approvals or rollback.
- No public npm publication, package signing/provenance, or cross-repository installation test.
- No monorepo, pnpm and Yarn real-world validation.
- No performance comparison versus standard GitHub templates.

## Release gates before announcing v0.1 publicly

1. Confirm the newest FamilyOS CI run passed with drift checking enabled.
2. Add real fixture CI for Python and Maven or explicitly label them experimental.
3. Validate generated YAML with actionlint and security checks with zizmor.
4. Create a tagged release and test install from that tag in a clean repository.
5. Decide whether to make AutoPipeline public; do not expose FamilyOS secrets or files.
6. Publish to npm only after package ownership, naming and provenance are set up.
7. Add contribution and security policies, changelog and a simple quickstart demo.

## Next open-source project ideas

These are candidate ideas, not established market gaps. Validate competition before committing development time.

### 1. Pipeline Doctor
Checks existing CI files for risky permissions, outdated actions, ineffective cache configuration, missing tests and redundant steps. Produces a human-readable diagnosis and safe diff. Compare against actionlint and zizmor.

### 2. Deploy Contract Tester
Verifies CI deployment prerequisites such as OIDC trust, account/region constraints, protected production environments and artifact integrity without making a real deployment. Useful for AWS and Vercel workflows; needs careful threat modelling.

### 3. Release Readiness CLI
Combines test evidence, scanner outputs, versioning, release notes, SBOMs and human approvals into an auditable release checklist. Compare to release-please, semantic-release and existing supply-chain tooling.

### 4. CI Matrix Optimizer
Estimates which runtime versions, packages and services need separate jobs and how to parallelise work, with clear evidence of which checks are skipped. Compare Nx and existing matrix generators; avoid unproven cost-saving claims.

## Why this is a valid portfolio project

The meaningful engineering contribution is deterministic configuration-to-workflow compilation, repository/language detection, validation, drift checking, secure defaults and future plugin design. Mere YAML template reuse is not novel; user feedback and comparative measurements will determine whether AutoPipeline is genuinely valuable.
