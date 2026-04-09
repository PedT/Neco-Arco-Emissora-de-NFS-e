/* global browser, config, loadConfig, log, sleep, fillDataCompetencia,
   fillRegimeApuracao, fillLocalPrestacao, fillServicoPrestado,
   fillComercioExterior, fillValorServico, fillTributacaoFederal,
   fillTomador,
   clickAvancar, saveState, loadState, clearState */

loadConfig();

async function runTab1(data) {
  const { dataCompetencia } = data;

  log("--- Tab 1: Pessoas ---");

  if (dataCompetencia) {
    fillDataCompetencia(dataCompetencia);
    log("Data de Competência: " + dataCompetencia);
  }

  await sleep(2000);

  fillRegimeApuracao();

  await sleep(500);

  await fillTomador(config.tomador);

  await sleep(500);

  saveState("tab2", data);
  log("Estado salvo, avançando para tab 2...");
  await clickAvancar();
}

async function runTab2(data) {
  const { valorUSD } = data;

  log("--- Tab 2: Serviço ---");
  await sleep(1000);

  await fillLocalPrestacao(config.localPrestacao);

  await sleep(500);

  await fillServicoPrestado(config.servicoPrestado);

  await sleep(500);

  await fillComercioExterior(config.comercioExterior, valorUSD);

  await sleep(500);

  saveState("tab3", data);
  log("Estado salvo, avançando para tab 3...");
  await clickAvancar();
}

async function runTab3(data) {
  const { valorBRL } = data;

  log("--- Tab 3: Valores ---");
  await sleep(1000);

  fillValorServico(valorBRL);

  await sleep(500);

  await fillTributacaoFederal(config.tributacaoFederal);

  await sleep(500);

  saveState("tab4", data);
  log("Estado salvo, avançando para tab 4...");
  await clickAvancar();
}

// --- Resume from saved state on page load ---
(async () => {
  await sleep(500);

  const saved = loadState();
  if (!saved) return;

  if (saved.phase === "tab2") {
    log("Retomando preenchimento do tab 2...");
    await runTab2(saved.data);
  } else if (saved.phase === "tab3") {
    log("Retomando preenchimento do tab 3...");
    await runTab3(saved.data);
  } else if (saved.phase === "tab4") {
    log("Tab 4 carregado");
    clearState();
    log("--- Preenchimento concluído ---");
  }
})();

// --- Listen for new fill requests from popup ---
browser.runtime.onMessage.addListener((msg) => {
  if (msg.action !== "preencher") return;

  clearState();
  (async () => {
    await runTab1(msg.data);
  })();

  return Promise.resolve({ success: true });
});
