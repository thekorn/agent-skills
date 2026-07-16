# agent-skills

Declarative, reusable [Agent Skills](https://agentskills.io/) packaged as a
Nix flake. The repository exposes a Home Manager module, a catalog of skill
paths, reusable profiles, and a small selection library. A consuming Nix
configuration decides which skills are installed on each machine.

## Integrated skills

| Skill | Purpose |
| --- | --- |
| [`bun-development`](skills/bun-development/) | Develop JavaScript and TypeScript applications with the Bun runtime and toolchain. |
| [`commit`](skills/commit/) | Create focused Git commits with concise Conventional Commits-style subjects. |
| [`design-md`](skills/design-md/) | Analyze Stitch projects and synthesize their design systems into `DESIGN.md`. |
| [`frontend-design`](skills/frontend-design/) | Design and implement distinctive, production-ready frontend interfaces. |
| [`gh-cli`](skills/gh-cli/) | Work with GitHub repositories, issues, pull requests, Actions, and releases through `gh`. |
| [`github-workflow`](skills/github-workflow/) | Run issue-driven development workflows with GitHub issues and pull requests. |
| [`gitlab-workflow`](skills/gitlab-workflow/) | Run issue-driven development workflows with GitLab issues and merge requests. |
| [`glab`](skills/glab/) | Work with GitLab issues, merge requests, CI/CD, and repositories through `glab`. |
| [`grill-me`](skills/grill-me/) | Sharpen a plan or design through a relentless interview. |
| [`grilling`](skills/grilling/) | Stress-test a plan, decision, or idea one question at a time. |
| [`html`](skills/html/) | Create self-contained HTML reports, explainers, comparisons, decks, and prototypes. |
| [`html-diagram`](skills/html-diagram/) | Create self-contained visual HTML architecture and stack diagrams. |
| [`html-plan`](skills/html-plan/) | Create pragmatic, visually organized plans as self-contained HTML. |
| [`hunk-review`](skills/hunk-review/) | Inspect and control live Hunk diff-review sessions from the command line. |
| [`sqlite3-cli`](skills/sqlite3-cli/) | Inspect SQLite databases with the `sqlite3` CLI and Markdown-formatted results. |
| [`stitch-loop`](skills/stitch-loop/) | Iteratively build websites with Stitch using a baton-passing workflow. |
| [`web-browser`](skills/web-browser/) | Control Chrome or Chromium through CDP with bundled Node.js scripts. |

## Public flake API

```nix
inputs.agent-skills.homeManagerModules.default
inputs.agent-skills.skills
inputs.agent-skills.profiles
inputs.agent-skills.lib.selectSkills
```

The flake intentionally has no inputs of its own. It exports paths and a Nix
module, so it does not need to introduce another `nixpkgs` revision.

## Repository layout

```text
.
├── flake.nix
├── lib/default.nix
├── modules/home-manager.nix
├── profiles/default.nix
└── skills/
    ├── catalog.nix
    └── <skill-name>/
        ├── SKILL.md
        ├── assets/       # optional
        ├── references/   # optional
        └── scripts/      # optional
```

## Add a skill

Create the skill directory:

```text
skills/code-review/SKILL.md
```

Then add it to the explicit catalog in `skills/catalog.nix`:

```nix
{ root }:

{
  code-review = root + "/skills/code-review";
}
```

The explicit catalog is the public API: renaming or removing an exported skill
causes a clear evaluation failure in consumers, and helper files under
`skills/` are never exported accidentally.

Optionally group catalog entries in `profiles/default.nix`:

```nix
{ skills }:

{
  common = {
    inherit (skills) code-review git-commit;
  };

  nix = {
    inherit (skills) nix-review;
  };
}
```

## Consume the flake

Add the input to the consuming repository:

```nix
{
  inputs.agent-skills.url = "github:thekorn/agent-skills";
}
```

Import the module into a standalone Home Manager configuration:

```nix
home-manager.lib.homeManagerConfiguration {
  inherit pkgs;

  extraSpecialArgs = { inherit inputs; };

  modules = [
    inputs.agent-skills.homeManagerModules.default
    ./home.nix
  ];
}
```

When Home Manager is embedded in nix-darwin, make it a shared module instead:

```nix
home-manager.sharedModules = [
  inputs.agent-skills.homeManagerModules.default
];
```

Select profiles or individual skills in a Home Manager module:

```nix
{ inputs, ... }:

{
  programs.agentSkills = {
    enable = true;

    targets = {
      generic = true;
      claude = true;
    };

    skills =
      inputs.agent-skills.profiles.common
      // inputs.agent-skills.lib.selectSkills [
        "nix-review"
      ];
  };
}
```

The generic target is enabled by default. The resulting links are:

```text
~/.agents/skills/<skill-name>
~/.claude/skills/<skill-name>  # when targets.claude = true
```

`programs.agentSkills.skills` is an attribute set and therefore composes across
Home Manager modules. A common module can provide a base profile while a
machine-specific module adds another profile without repeating the base set.

Local skills from the consuming Nix repository work too:

```nix
programs.agentSkills.skills.local-network = ./skills/local-network;
```

Each configured path must be a directory containing `SKILL.md`; the module
reports a Home Manager assertion error otherwise. Destination names follow the
Agent Skills naming rules: at most 64 lowercase letters, numbers, or single
hyphen-separated segments.

## Validate changes

Run the flake evaluation checks after editing the Nix API:

```console
nix flake check
nix eval --json .#skills
nix eval --json .#profiles
```

The module also exports `homeManagerModules.agent-skills` as a descriptive alias
of `homeManagerModules.default`.
