/* global log, searchSelect2 */

async function fillLocalPrestacao(localPrestacao) {
  if (!localPrestacao) {
    log("Local Prestação não configurado no config.json");
    return;
  }

  if (localPrestacao.municipio) {
    const ok = await searchSelect2(
      "LocalPrestacao_CodigoMunicipioPrestacao",
      localPrestacao.municipio,
      localPrestacao.municipio
    );
    log(ok
      ? "Município selecionado"
      : "ERRO: Município não selecionado"
    );
  } else {
    log("WARN: municipio não configurado");
  }
}
