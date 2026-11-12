# Four example project setups

These are illustrative. Only supported checks work in v0.1; deployments must remain disabled.

## 1. Next.js with npm

```json
{"version":1,"project":{"language":"node","packageManager":"npm","runtime":"22"},"ci":{"lint":true,"typecheck":true,"unit":true,"build":true,"e2e":false,"dependencyAudit":true},"deploy":{"enabled":false}}
```

Requires package.json scripts `lint`, `typecheck`, `test`, `build` and package-lock.json. Toggle build off if env-dependent.

## 2. Python / FastAPI

```json
{"version":1,"project":{"language":"python","runtime":"3.12"},"ci":{"lint":true,"unit":true,"build":false,"dependencyAudit":false},"deploy":{"enabled":false}}
```

Uses ruff and pytest; install command assumes editable installation works. For alternate projects customise generated jobs, with installer adapter planned.

## 3. Java / Maven

```json
{"version":1,"project":{"language":"java","runtime":"21"},"ci":{"unit":true,"build":true,"dependencyAudit":false},"deploy":{"enabled":false}}
```

Assumes executable Maven wrapper `./mvnw`. If missing, add it before using the generated workflow.

## 4. AWS SAM (planned adapter)

Expected detection: `template.yaml`, `samconfig.toml`; checks: `sam validate`, tests, IaC scanning, build. Optional deployment will require AWS OIDC role, protected environments, explicit region/account and scoped permissions. Not yet supported in v0.1.

All real applications have additional concerns: private registries, environment variables, test services, package lockfiles, source path structure, permissions and budgets. AutoPipeline should fail with actionable messages rather than silently pretending to run checks.
