/* global log, fillInput */

function fillValorServico(valorBRL) {
  if (!valorBRL) {
    log("Valor BRL não informado no popup");
    return;
  }

  log("Preenchendo Valores do Serviço Prestado...");

  fillInput(
    "Valores_ValorServico",
    valorBRL,
    "Valor do serviço prestado"
  );

  log("Valores preenchido");
}
