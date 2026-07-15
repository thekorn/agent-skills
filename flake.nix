{
  description = "Declaratively managed Agent Skills";

  outputs = {...}: let
    rawSkills = import ./skills/catalog.nix {root = ./.;};
    invalidSkills = builtins.filter (
      name: !(builtins.pathExists "${rawSkills.${name}}/SKILL.md")
    ) (builtins.attrNames rawSkills);
    skills =
      if invalidSkills == []
      then rawSkills
      else throw "Catalog entries without SKILL.md: ${builtins.concatStringsSep ", " invalidSkills}";
    profiles = import ./profiles {inherit skills;};
    agentSkillsLib = import ./lib {inherit skills;};
    homeManagerModule = import ./modules/home-manager.nix;
  in {
    homeManagerModules = {
      agent-skills = homeManagerModule;
      default = homeManagerModule;
    };

    inherit skills profiles;

    lib = agentSkillsLib;
  };
}
