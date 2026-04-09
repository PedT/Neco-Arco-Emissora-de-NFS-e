/* global browser, log */

const config = {};

async function loadConfig() {
  // Try config.local.json first, fall back to config.json
  try {
    const localUrl = browser.runtime.getURL("config.local.json");
    const resp = await fetch(localUrl);
    if (resp.ok) {
      Object.assign(config, await resp.json());
      return;
    }
  } catch (e) {
    // config.local.json not found, fall back
  }

  try {
    const url = browser.runtime.getURL("config.json");
    const resp = await fetch(url);
    Object.assign(config, await resp.json());
  } catch (e) {
    log("WARN: falha ao carregar config: " + e.message);
  }
}
