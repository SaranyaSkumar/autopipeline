# Configurable installation

Some repositories require project-specific dependency resolution, such as existing peer dependency conflicts or custom registries. AutoPipeline supports a one-line install command override:

```json
{
  "ci": {
    "commands": {
      "install": "npm ci --legacy-peer-deps"
    }
  }
}
```

This replaces only the generated Install step. Prefer fixing incompatible dependency versions over using `--legacy-peer-deps` permanently. Overrides run as shell commands in CI and must be reviewed. Multi-line commands are rejected. AutoPipeline does not automatically weaken npm dependency checks.
