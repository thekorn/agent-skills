{skills}: {
  # Select a catalog subset while preserving its attribute names. Unknown names
  # fail during evaluation instead of being silently ignored.
  selectSkills = names:
    builtins.listToAttrs (
      map (name: {
        inherit name;
        value = skills.${name} or throw "Unknown agent skill: ${name}";
      })
      names
    );
}
