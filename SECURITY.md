# Security Policy

AutoPipeline is pre-release software and has not undergone an independent security audit. Use generated workflows only after code review.

## Reporting a vulnerability

Please use GitHub's private vulnerability reporting feature on this repository if enabled, or contact the repository maintainer privately. Do not publish exploit details in a public issue before a fix is available.

## Trust boundaries

AutoPipeline emits CI instructions that will execute source code on a GitHub runner. Do not run untrusted pull-request code with production secrets or privileged tokens. Project-specific custom commands are deliberately powerful and should be reviewed like source code. Do not treat dependency-audit success as a guarantee of security.

## Supported versions

Only the latest main branch receives best-effort fixes until the first tagged release.
