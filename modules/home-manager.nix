{
  config,
  lib,
  ...
}: let
  cfg = config.programs.agentSkills;

  inherit
    (lib)
    mkEnableOption
    mkIf
    mkOption
    types
    ;

  mkSkillFiles = targetRoot:
    lib.mapAttrs' (
      name: source:
        lib.nameValuePair "${targetRoot}/${name}" {
          inherit source;
        }
    )
    cfg.skills;

  enabledTargetFiles = lib.mkMerge [
    (lib.optionalAttrs cfg.targets.generic (mkSkillFiles ".agents/skills"))
    (lib.optionalAttrs cfg.targets.claude (mkSkillFiles ".claude/skills"))
  ];

  invalidSkills =
    lib.filterAttrs (
      _name: source: !(builtins.pathExists "${source}/SKILL.md")
    )
    cfg.skills;

  invalidNames =
    lib.filterAttrs (
      name: _source:
        builtins.stringLength name
        > 64
        || builtins.match "^[a-z0-9]+(-[a-z0-9]+)*$" name == null
    )
    cfg.skills;
in {
  options.programs.agentSkills = {
    enable = mkEnableOption "declaratively managed Agent Skills";

    skills = mkOption {
      type = types.attrsOf types.path;
      default = {};
      description = ''
        Agent skill directories to install, indexed by their destination name.
        Every directory must contain a SKILL.md file.
      '';
      example = lib.literalExpression ''
        {
          code-review = inputs.agent-skills.skills.code-review;
          local-project = ./skills/local-project;
        }
      '';
    };

    targets = {
      generic = mkOption {
        type = types.bool;
        default = true;
        description = "Install skills into ~/.agents/skills.";
      };

      claude = mkOption {
        type = types.bool;
        default = false;
        description = "Install skills into ~/.claude/skills.";
      };
    };
  };

  config = mkIf cfg.enable {
    assertions = [
      {
        assertion = invalidSkills == {};
        message = ''
          programs.agentSkills.skills contains directories without SKILL.md: ${
            lib.concatStringsSep ", " (lib.attrNames invalidSkills)
          }
        '';
      }
      {
        assertion = invalidNames == {};
        message = ''
          programs.agentSkills.skills has invalid names: ${
            lib.concatStringsSep ", " (lib.attrNames invalidNames)
          }. Names must be at most 64 characters and contain only lowercase
          letters, numbers, and single hyphens.
        '';
      }
    ];

    home.file = enabledTargetFiles;
  };
}
