document.getElementById("dataCompetencia").valueAsDate = new Date();

document.getElementById("btnStart").addEventListener("click", async () => {
  const dataRaw = document.getElementById("dataCompetencia").value;
  const [y, m, d] = dataRaw.split("-");
  const dataCompetencia = dataRaw ? `${d}/${m}/${y}` : "";
  const valorUSD = document.getElementById("valorUSD").value.trim();
  const valorBRL = document.getElementById("valorBRL").value.trim();

  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });

  try {
    await browser.tabs.sendMessage(tab.id, {
      action: "preencher",
      data: { dataCompetencia, valorUSD, valorBRL },
    });
  } catch (err) {
    console.error("NFS-e Auto:", err);
  }
});
