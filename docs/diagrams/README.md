# Diagram Generator using Mermaid js


This module parses all mermaid config files in [configs](./config/) folder and produces their respective SVGs in [svgs](./svgs/) folder.

## Module Overview

**1) *configs* folder**
You need to place all your MermaidJS configuration files with valid syntaxt in `configs` folder.

**2) *svgs* folder**
All the output diagrams will be generated in `svg` folder

**3) *main.js* Script**
`main.js` is the main js file that imports `mermaid-cli` and `fs` to read `puppeteer configuration`, and run command to convert MMD files to SVGs.

**4) *Dockerfile*, *compose.yml*, *.dockerignore* and *puppeteer-config* files**

`Dockerfile` is used to containerize the app including node dependencies, chromimum for puppetter.
`compose.yml` builds the image and mounts the required volumes to generate SVGs in respective host folder from configs folder in host folder
`puppeteer-config.json` allows the mermaid-cli to run chromium through puppeteer for image generation

## Steps to generate images

### Pre-requisite
1- Install Docker
2- Clone Repo
3- Open the `diagrams` project in terminal

### Steps
1- Copy your mermaid's configuration file in `configs` folder.
2- Update `main.js` to include `run` functional call for `svg` generation from `.mmd`
3- Run `docker compose up --build -d`
4- Verify your SVG


## TODOs
- Update Dockerfile and Compose to include user context for optimized ownership and permission of generated svgs
- Update main.js to incorporate mermaid config verification before svg generation
- update main.js to incorporate dynamic image generation based on new/updated svgs.
- Modularize and make the code testable
- Modularize and potentially incorporate support for other similar tools for graphical content generation
- Potentially isolate the module for better deployment
