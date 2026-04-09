function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function setInputValue(el, value) {
  const nativeSetter = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    "value"
  ).set;
  nativeSetter.call(el, value);

  el.dispatchEvent(new Event("input", { bubbles: true }));
  el.dispatchEvent(new Event("change", { bubbles: true }));
  el.dispatchEvent(new Event("blur", { bubbles: true }));
}

function setRadioByName(name, value) {
  const radio = document.querySelector(
    `input[type="radio"][name="${name}"][value="${value}"]`
  );
  if (!radio) {
    log("WARN: radio não encontrado: " + name + " = " + value);
    return;
  }
  radio.checked = true;
  radio.dispatchEvent(new Event("change", { bubbles: true }));
  radio.dispatchEvent(new Event("click", { bubbles: true }));
  radio.click();
}

function fillInput(id, value, label) {
  if (!value) return;
  const el = document.getElementById(id);
  if (!el) {
    log("WARN: campo não encontrado: " + id);
    return;
  }
  setInputValue(el, value);
  log(label + ": " + value);
}

function setChosenSelect(selectId, value) {
  const select = document.getElementById(selectId);
  if (!select) {
    log("WARN: select não encontrado: " + selectId);
    return false;
  }

  select.value = value;

  try {
    const pageJQ = window.wrappedJSObject.jQuery;
    pageJQ("#" + selectId).trigger("chosen:updated").trigger("change");
  } catch (e) {
    select.dispatchEvent(new Event("chosen:updated"));
    select.dispatchEvent(new Event("change", { bubbles: true }));
  }
  return true;
}

async function searchSelect2(selectId, searchText, resultMatch) {
  const select = document.getElementById(selectId);
  if (!select) {
    log("WARN: select2 não encontrado: " + selectId);
    return false;
  }

  try {
    const pageJQ = window.wrappedJSObject.jQuery;
    pageJQ("#" + selectId).select2("open");
    log("Select2 aberto: " + selectId);
  } catch (e) {
    log("WARN: falha ao abrir select2: " + e.message);
    return false;
  }

  await sleep(1000);

  const searchInput = document.querySelector(
    ".select2-container--open .select2-search__field"
  );
  if (!searchInput) {
    log("WARN: select2 search input não encontrado");
    return false;
  }

  searchInput.value = searchText;
  searchInput.dispatchEvent(new Event("input", { bubbles: true }));
  log("Digitando: " + searchText);

  await sleep(1000);

  const results = document.querySelectorAll(
    ".select2-container--open .select2-results__option"
  );
  for (const item of results) {
    if (item.textContent.trim().includes(resultMatch || searchText)) {
      item.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
      log("Selecionado: " + item.textContent.trim());
      return true;
    }
  }

  log("WARN: nenhum resultado encontrado para: " + searchText);
  return false;
}

async function clickAvancar() {
  let btn = document.getElementById("btnAvancar");

  if (!btn) {
    // Fallback: find submit button with "Avançar" text
    const buttons = document.querySelectorAll('button[type="submit"]');
    for (const b of buttons) {
      if (b.textContent.trim().includes("Avançar")) {
        btn = b;
        break;
      }
    }
  }

  if (!btn) {
    log("ERRO: botão Avançar não encontrado");
    return;
  }

  btn.click();
  log("Botão Avançar clicado");
  await sleep(2000);
}
