# Security Policy

Zanrei runs with administrator rights and changes Windows settings, so we take security reports seriously.

## Reporting a vulnerability

Please **do not open a public issue** for security problems. Use GitHub's private reporting instead:

**Security → Report a vulnerability** (`https://github.com/sleax-dev/zanrei/security/advisories/new`)

Include:
- What the problem is and its impact
- How to reproduce it (Zanrei version, Windows version, steps)
- A suggested fix, if you have one

## What matters most

- Misuse of administrator rights (command injection, path traversal)
- A corrupted restore journal, or an undo that changes the system in unexpected ways
- Any system change made without the user's knowledge

## Updates

Update packages are signed and the app verifies the signature against a public key built into it before installing. Reports about weaknesses in this chain are in scope.

## Supported versions

Only the latest release receives fixes.
