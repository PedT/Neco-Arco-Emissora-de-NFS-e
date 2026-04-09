/* global log, sleep, setChosenSelect */

async function fillTributacaoFederal(trib) {
  if (!trib) {
    log("Tributação Federal não configurada no config.json");
    return;
  }

  log("Preenchendo Tributação Federal...");

  // Chosen: Situação Tributária do PIS/COFINS
  if (trib.situacaoTributaria) {
    const ok = setChosenSelect(
      "TributacaoFederal_PISCofins_SituacaoTributaria",
      trib.situacaoTributaria
    );
    log(ok
      ? "Situação Tributária PIS/COFINS definida"
      : "ERRO: Situação Tributária PIS/COFINS não encontrada"
    );
  }

  await sleep(500);

  // Chosen: Tipo de retenção do PIS/COFINS/CSLL
  if (trib.tipoRetencao) {
    const ok = setChosenSelect(
      "TributacaoFederal_PISCofins_TipoRetencao",
      trib.tipoRetencao
    );
    log(ok
      ? "Tipo retenção PIS/COFINS/CSLL definido"
      : "ERRO: Tipo retenção não encontrado"
    );
  }

  log("Tributação Federal preenchida");
}
