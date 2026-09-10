{skills}: let
  common = {
    inherit (skills) commit html html-plan html-diagram hunk-review web-browser;
  };
in {
  inherit common;

  nix = {};

  work = common // {
    inherit (skills) burda-html burda-html-diagram burda-html-plan ctf-sandbox-status glab;
  };

  private = common // {
    inherit (skills) grill-me grilling;
  };
}
