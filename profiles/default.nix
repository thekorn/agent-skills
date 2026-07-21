{skills}: let
  common = {
    inherit (skills) commit html html-plan html-diagram hunk-review web-browser;
  };
in {
  inherit common;

  nix = {};

  work = common // {
    inherit (skills) ctf-sandbox-status gitlab-workflow glab;
  };

  private = common // {
    inherit (skills) grill-me grilling;
  };
}
