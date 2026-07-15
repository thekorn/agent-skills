# AGENTS.md

This repository packages reusable Agent Skills as a dependency-free Nix flake.

## Adding or changing skills

- Keep each skill in `skills/<name>/` with a required `SKILL.md`.
- Make the frontmatter `name` match the directory name and follow the Agent
  Skills naming rules: lowercase letters, numbers, and single hyphens only.
- Keep supporting scripts, references, and assets inside the skill directory.
- Register every public skill explicitly in `skills/catalog.nix`.
- Add skills to `profiles/default.nix` only when the grouping is intentional;
  every catalog skill must remain individually selectable.
- Keep skills portable and avoid assumptions about a consuming repository's
  layout unless those assumptions are fundamental to the skill.

## Nix design

- Keep the flake free of `nixpkgs` and other inputs unless strictly necessary.
- Follow the existing Home Manager module and attribute-set composition
  patterns; prefer small changes over new abstractions.

## Validation

Run `nix flake check "path:$PWD"` and `git diff --check`. Use the explicit
`path:` URL while files are untracked because Git-backed flakes omit them.
