/* global log, sleep, setRadioByName, setChosenSelect, fillInput */

async function fillComercioExterior(comex, valorUSD) {
  if (!comex) {
    log("Comércio Exterior não configurado no config.json");
    return;
  }

  log("Preenchendo Comércio Exterior...");

  // Chosen: Modo de Prestação
  if (comex.modoPrestacao) {
    const ok = setChosenSelect(
      "ComercioExterior_ModoPrestacao",
      comex.modoPrestacao
    );
    log(ok
      ? "Modo Prestação definido"
      : "ERRO: Modo Prestação não encontrado"
    );
  }

  await sleep(500);

  // Chosen: Vínculo entre as partes
  if (comex.vinculoPrestacao) {
    const ok = setChosenSelect(
      "ComercioExterior_VinculoPrestacao",
      comex.vinculoPrestacao
    );
    log(ok
      ? "Vínculo Prestação definido"
      : "ERRO: Vínculo Prestação não encontrado"
    );
  }

  await sleep(500);

  // Input: Moeda (3-digit code)
  fillInput(
    "ComercioExterior_TipoMoeda",
    comex.tipoMoeda,
    "Moeda"
  );

  // Input: Valor do serviço em moeda estrangeira (from popup)
  fillInput(
    "ComercioExterior_ValorServicoMoedaEstrangeira",
    valorUSD,
    "Valor serviço moeda estrangeira"
  );

  await sleep(500);

  // Chosen: Mecanismo apoio prestador
  if (comex.mecanismoApoioPrestador) {
    const ok = setChosenSelect(
      "ComercioExterior_MecanismoApoioPrestador",
      comex.mecanismoApoioPrestador
    );
    log(ok
      ? "Mecanismo apoio prestador definido"
      : "ERRO: Mecanismo apoio prestador não encontrado"
    );
  }

  await sleep(500);

  // Chosen: Mecanismo apoio tomador
  if (comex.mecanismoApoioTomador) {
    const ok = setChosenSelect(
      "ComercioExterior_MecanismoApoioTomador",
      comex.mecanismoApoioTomador
    );
    log(ok
      ? "Mecanismo apoio tomador definido"
      : "ERRO: Mecanismo apoio tomador não encontrado"
    );
  }

  await sleep(500);

  // Chosen: Movimentação temporária de bens
  if (comex.movimentacaoTempBens) {
    const ok = setChosenSelect(
      "ComercioExterior_MovimentacaoTempBens",
      comex.movimentacaoTempBens
    );
    log(ok
      ? "Movimentação temp. bens definida"
      : "ERRO: Movimentação temp. bens não encontrada"
    );
  }

  await sleep(500);

  // Radio: Compartilhar com MDIC
  if (comex.compartilharComMDIC) {
    setRadioByName(
      "ComercioExterior.CompartilharComMDIC",
      comex.compartilharComMDIC
    );
    log("Compartilhar com MDIC: " + comex.compartilharComMDIC);
  }

  log("Comércio Exterior preenchido");
}
