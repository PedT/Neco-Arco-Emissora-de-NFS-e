/* global log, setInputValue, setChosenSelect, config */

function fillDataCompetencia(dateStr) {
  const input = document.getElementById("DataCompetencia");
  if (!input) {
    log("WARN: campo DataCompetencia não encontrado");
    return;
  }

  setInputValue(input, dateStr);

  const btnCalendario = document.getElementById("btn_DataCompetencia");
  if (btnCalendario) {
    btnCalendario.click();

    setTimeout(() => {
      try {
        const pageJQ = window.wrappedJSObject.jQuery;
        const $input = pageJQ("#DataCompetencia");
        if ($input.datepicker) {
          $input.datepicker("setDate", dateStr);
          $input.datepicker("hide");
        }
      } catch (e) {
        setInputValue(input, dateStr);
        document.body.click();
      }
    }, 200);
  }
}

function fillRegimeApuracao() {
  if (!config.regimeApuracao) {
    log("Regime de Apuração não configurado no config.json");
    return;
  }

  const ok = setChosenSelect(
    "SimplesNacional_RegimeApuracaoTributosSN",
    config.regimeApuracao
  );
  log(ok
    ? "Regime de Apuração definido: opção " + config.regimeApuracao
    : "ERRO: Regime de Apuração não encontrado na página"
  );
}
