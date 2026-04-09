/* global log, sleep, setRadioByName, setChosenSelect, searchSelect2,
   setInputValue */

function fillTextarea(id, value, label) {
  if (!value) return;
  const el = document.getElementById(id);
  if (!el) {
    log("WARN: textarea não encontrado: " + id);
    return;
  }

  // Use native setter for textarea
  const nativeSetter = Object.getOwnPropertyDescriptor(
    HTMLTextAreaElement.prototype,
    "value"
  ).set;
  nativeSetter.call(el, value);

  el.dispatchEvent(new Event("input", { bubbles: true }));
  el.dispatchEvent(new Event("change", { bubbles: true }));
  el.dispatchEvent(new Event("blur", { bubbles: true }));
  log(label + ": " + value.substring(0, 50) + "...");
}

async function fillServicoPrestado(servico) {
  if (!servico) {
    log("Serviço Prestado não configurado no config.json");
    return;
  }

  log("Preenchendo Serviço Prestado...");

  // Select2: Código de Tributação Nacional
  if (servico.codigoTributacao) {
    const ok = await searchSelect2(
      "ServicoPrestado_CodigoTributacaoNacional",
      servico.codigoTributacao,
      servico.codigoTributacao
    );
    log(ok
      ? "Código Tributação Nacional selecionado"
      : "ERRO: Código Tributação Nacional não selecionado"
    );
  }

  await sleep(500);

  // Chosen: Código Complementar Municipal
  if (servico.codigoComplementarMunicipal) {
    const ok = setChosenSelect(
      "ServicoPrestado_CodigoComplementarMunicipal",
      servico.codigoComplementarMunicipal
    );
    log(ok
      ? "Código Complementar Municipal definido"
      : "ERRO: Código Complementar Municipal não encontrado"
    );
  }

  await sleep(500);

  // Radio: Exportação/Imunidade/Não incidência
  if (servico.exportacaoImunidade) {
    setRadioByName(
      "ServicoPrestado.HaExportacaoImunidadeNaoIncidencia",
      servico.exportacaoImunidade
    );
    log("Exportação/Imunidade: " + servico.exportacaoImunidade);
  }

  await sleep(500);

  // Chosen: Motivo da não tributação
  if (servico.motivoNaoTributacao) {
    const ok = setChosenSelect(
      "ServicoPrestado_MotivoNaoTributacao",
      servico.motivoNaoTributacao
    );
    log(ok
      ? "Motivo não tributação definido"
      : "ERRO: Motivo não tributação não encontrado"
    );
  }

  await sleep(500);

  // Chosen: País resultado do serviço
  if (servico.codigoPaisResultado) {
    const ok = setChosenSelect(
      "ServicoPrestado_CodigoPaisResultado",
      servico.codigoPaisResultado
    );
    log(ok
      ? "País resultado definido: " + servico.codigoPaisResultado
      : "ERRO: País resultado não encontrado"
    );
  }

  // Textarea: Descrição do Serviço
  fillTextarea(
    "ServicoPrestado_Descricao",
    servico.descricao,
    "Descrição do Serviço"
  );

  // Chosen: Item da NBS
  if (servico.codigoNBS) {
    const ok = setChosenSelect(
      "ServicoPrestado_CodigoNBS",
      servico.codigoNBS
    );
    log(ok
      ? "Código NBS definido: " + servico.codigoNBS
      : "ERRO: Código NBS não encontrado"
    );
  }

  log("Serviço Prestado preenchido");
}
