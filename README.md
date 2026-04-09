<p align="center">
  <img src="content/icon.png" alt="Neco-Arc icon" />
</p>

# Neco-Arc-Emissora-de-NFS-e
ⓛωⓛ Burunyuu

Emitir NFS-e pelo portal do governo é um SACO, não tem automação nenhuma pra pegar dados do que foi emitido no mês passado (até onde eu sei), e ficar lembrando de todos os detalhes é um porre.

Então cá está uma extensão de firefox pra facilitar o preenchimento.

## Como funciona

A extensão injeta content scripts no portal `nfse.gov.br` e preenche automaticamente os campos do formulário de emissão de NFS-e em três etapas:

1. **Aba 1 — Pessoas:** data de competência, regime de apuração e dados do tomador de serviço
2. **Aba 2 — Serviço:** local de prestação, serviço prestado e dados de comércio exterior
3. **Aba 3 — Valores:** valor do serviço e tributação federal

Ao clicar em "Preencher" no popup, a extensão navega pelas abas automaticamente, clicando em "Avançar" ao final de cada uma. O estado é salvo em `localStorage` entre as navegações para retomar o preenchimento caso a página recarregue.

## Configuração

Os dados fixos (tomador, códigos de tributação, comércio exterior, etc.) ficam no arquivo `config.json`. Para usar seus próprios dados sem alterar o original, crie um arquivo `config.local.json` na raiz da extensão — ele tem prioridade sobre o `config.json`.

Os únicos valores que mudam a cada emissão — data de competência, valor em USD e valor em BRL — são informados diretamente pelo popup.

## Instalação

1. Abra `about:debugging#/runtime/this-firefox` no Firefox
2. Clique em "Carregar extensão temporária..."
3. Selecione o arquivo `manifest.json` deste projeto
