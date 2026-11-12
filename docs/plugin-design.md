# Proposed plugin system (not implemented yet)

The goal is one stable pipeline representation with adapters for languages, checks, CI providers and deployment providers. This document is a design proposal, not a description of v0.1 capabilities.

## Plugin contract

```ts
interface PipelinePlugin {
  id: string;
  version: string;
  kind: "language" | "check" | "provider" | "deploy";
  detect?(context: RepoContext): Promise<DetectionResult>;
  validate?(config: PipelineConfig, context: RepoContext): Diagnostic[];
  plan(config: PipelineConfig, context: RepoContext): Promise<PipelineStep[]>;
}
```

Each step should declare explicit dependencies, runtime requirements, artifacts, credentials, event type, and least-privilege permissions.

## Resolution phases

1. Detect repository technology and infer candidate checks.
2. Validate explicit user configuration and deny unsupported combinations.
3. Resolve tools and plugin versions to a lockfile, never floating defaults.
4. Build a typed dependency graph and check job permissions.
5. Render provider-specific YAML via deterministic templates.
6. Validate output and warn about manual edits or configuration drift.
7. Apply changes only on explicit command; never silently deploy.

## Additional check adapters

- Quality: lint, formatter check, type checking, complexity, license compatibility
- Testing: unit, integration, E2E, mutation, coverage, browser test fixtures
- Security: Gitleaks, Semgrep, Trivy, IaC policies, dependency audit, container scanning, SBOM
- Build: framework builds, container image build, artifact signing and publication
- Release: release notes, tags, provenance, publish approval, versioning
- Delivery: Vercel, AWS SAM, ECS, Kubernetes, Docker registry, custom targets
- Operations: notifications, SLO checks, smoke tests, rollback only where supported

## Provider-specific considerations

GitHub Actions v0.1 first. GitLab adapter would compile the same typed graph to .gitlab-ci.yml and explicitly reject unavailable GitHub-only features. Deployment plugins must never assume credentials can be copied from one platform to another.

## Plugin security

Third-party plugins are arbitrary code execution during pipeline generation; require explicit installation, trusted sourcing and version pinning. Separate generation permissions from runtime deployment permissions. Never let an unreviewed plugin inject unexpected deploy steps or widen GitHub token permissions.
