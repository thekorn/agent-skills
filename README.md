# agent-skills

Declarative, reusable [Agent Skills](https://agentskills.io/) packaged as a
Nix flake. The repository exposes a Home Manager module, a catalog of skill
paths, reusable profiles, and a small selection library. A consuming Nix
configuration decides which skills are installed on each machine.

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
      codex = true;
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

The default target is Codex only. The resulting links are:

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
