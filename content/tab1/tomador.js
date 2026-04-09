/* global log, sleep, setInputValue, setChosenSelect, setRadioByName,
   fillInput */

async function fillTomador(tomador) {
  if (!tomador) {
    log("Tomador não configurado no config.json");
    return;
  }

  setRadioByName("Tomador.LocalDomicilio", tomador.localDomicilio);
  log("Local Domicílio definido: " + tomador.localDomicilio);

  await sleep(500);

  setRadioByName("Tomador.NIFInformado", tomador.nifInformado);
  log("NIF Informado definido: " + tomador.nifInformado);

  await sleep(500);

  fillInput("Tomador_NIF", tomador.nif, "NIF");
  fillInput("Tomador_Nome", tomador.nome, "Nome/Razão Social");
  fillInput("Tomador_Telefone", tomador.telefone, "Telefone");
  fillInput("Tomador_Email", tomador.email, "E-mail");

  const end = tomador.endereco || {};
  fillInput("Tomador_EnderecoExterior_Logradouro", end.logradouro, "Logradouro");
  fillInput("Tomador_EnderecoExterior_Numero", end.numero, "Número");
  fillInput("Tomador_EnderecoExterior_Complemento", end.complemento, "Complemento");
  fillInput("Tomador_EnderecoExterior_Bairro", end.bairro, "Bairro");
  fillInput("Tomador_EnderecoExterior_Cidade", end.cidade, "Cidade");
  fillInput(
    "Tomador_EnderecoExterior_CodigoEnderecamentoPostal",
    end.cep,
    "CEP"
  );
  fillInput(
    "Tomador_EnderecoExterior_EstadoProvinciaRegiao",
    end.estado,
    "Estado/Província"
  );

  if (end.codigoPais) {
    const ok = setChosenSelect(
      "Tomador_EnderecoExterior_CodigoPais",
      end.codigoPais
    );
    log(ok
      ? "País definido: " + end.codigoPais
      : "ERRO: País não encontrado na página"
    );
  }

  log("Tomador do Serviço preenchido");
}
