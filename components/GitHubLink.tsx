import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import IconButton from "@mui/material/IconButton";

function GitHubLink() {
  return (
    <IconButton
      size="large"
      edge="end"
      color="inherit"
      href="https://github.com/ViktorBachmanov/Next-Chess"
      target="_blank"
      rel="noreferrer"
    >
      <GitHubIcon />
    </IconButton>
  );
}

export default GitHubLink;
