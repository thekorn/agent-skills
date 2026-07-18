---
name: commit
description: 'Read this skill before making git commits'
---

Create a git commit for the current changes using a concise Conventional Commits-style subject.

## Format

```text
<type>(<scope>): <summary>

<optional body>

<optional footer>
```

- `type` REQUIRED. Use `feat` for new features, `fix` for bug fixes. Other common types: `docs`, `refactor`, `chore`, `test`, `perf`.
- `scope` OPTIONAL. Short noun in parentheses for the affected area (e.g., `api`, `parser`, `ui`).
- `summary` REQUIRED. Short, imperative, <= 72 chars, no trailing period.

## Notes

- Body is OPTIONAL for small, self-explanatory changes. For substantial changes,
  especially multiple related changes or changes whose rationale is not apparent
  from the summary, add a body explaining why the change was made and its
  important behavior. Use separate short paragraphs for distinct points.
- Do NOT include breaking-change markers.
- Footer is OPTIONAL unless the change addresses an issue or ticket, in which
  case it is REQUIRED and must reference the issue or ticket number.
- Do NOT add sign-offs (no `Signed-off-by`).
- Only commit; do NOT push.
- If it is unclear whether a file should be included, ask the user which files to commit.
- Treat any caller-provided arguments as additional commit guidance. Common patterns:
  - Freeform instructions should influence scope, summary, and body.
  - File paths or globs should limit which files to commit. If files are specified, only stage/commit those unless the user explicitly asks otherwise.
  - If arguments combine files and instructions, honor both.
- If the change is addressing an issue, include the issue number in the footer line.
  - `Fixes <issue>` closes an issue when merged.
  - `Refs <issue>` links an issue without closing it.

## Steps

1. Infer from the prompt if the user provided specific file paths/globs and/or additional instructions.
2. Review `git status`, `git diff --no-ext-diff`, and `git diff --cached --no-ext-diff` to understand the current changes (limit to argument-specified files if provided).
3. (Optional) Run `git log -n 50 --pretty=format:%s` to see commonly used scopes.
4. If there are ambiguous extra files, ask the user for clarification before committing.
5. Stage only the intended files (all changes if no files specified).
6. Run `git commit -m "<summary>"` (and `-m "<body>"` if needed) (and `-m "<footer>"` if needed).

## Creating the Commit

Use separate `-m` arguments for paragraphs and footers. Never put literal
`\n` sequences in a commit message or open an interactive editor.

```bash
git commit -m "fix(api): Handle null response in user endpoint" \
  -m "Return 404 when the user API finds a deleted account." \
  -m "Fixes XXX-12345"
```
