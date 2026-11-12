# npm beta release

Proposed package: `@saranyaskumar/autopipeline@0.1.0-beta.1`.

## Before publishing

1. Confirm you can sign in to [npm](https://www.npmjs.com/~saranyaskumar) as the owner of the `saranyaskumar` scope.
2. Merge this PR after its **npm package validation** check passes.
3. Clone the repository and run `npm test`, `npm pack --dry-run`, and `npm pack`.
4. Perform the **first** publish from a trusted local machine with npm authentication and 2FA: `npm publish --access public --tag beta`. Do not post tokens or OTP values in chat.
5. Verify the package page and install it in a disposable test project:
   `npx --package=@saranyaskumar/autopipeline@beta autopipeline init`
   followed by `generate` and `check`.
6. Once the package exists, configure npm Trusted Publishing under package settings, using GitHub user `SaranyaSkumar`, repository `autopipeline`, and a dedicated publication workflow filename. Use GitHub-hosted runners, Node 24, npm 11.5.1+ and `id-token: write` only in the publication job.
7. Prefer a guarded manual workflow or protected release environment to avoid accidental publishing; enable automatic releases only after validating trusted publishing. Publish version bumps with an explicit beta dist-tag, never `latest` until stable.

## Limits

The release is experimental. The package handles configurable CI workflow generation, not deployment. Security integrations and fully tested multi-language support are future work. It does not automatically author tests or prove coverage. GitHub workflows must be reviewed before committing, especially when dealing with secrets and untrusted pull requests.

## Versioning

An npm package version is immutable once published. Use `0.1.0-beta.2` for subsequent changes. Do not republish a modified tarball at the same version.
