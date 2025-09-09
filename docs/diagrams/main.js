import { run } from "@mermaid-js/mermaid-cli"
import fs from 'fs'

let puppeteerConfigFile = process.env.PUPPETEER_CONFIG_FILE || "./puppeteer-config.json"
let puppeteerConfig = {}

puppeteerConfig = Object.assign(puppeteerConfig, JSON.parse(fs.readFileSync(puppeteerConfigFile, 'utf-8')))

await run(
  "configs/app_architecture.mmd", "svgs/app_architecture.svg", {
    puppeteerConfig
  }
)