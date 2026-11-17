/* Despachante de figuras: usado pelo leitor do manual e pela apresentação do workshop */
import { html } from "../core/dom.js";
import { explissit } from "./explissit.js";
import { fluxograma, fluxogramaLegenda } from "./fluxograma.js";
import { figPermissao, figRevisao, figTeoria, figRedeCompleta, figSintese, figPercurso } from "./outras.js";

let seq = 0;
export function figura(nome, opts = {}) {
  const id = `${nome}-${++seq}`;
  switch (nome) {
    case "explissit": return html`<div class="figure-box">${explissit({ lang: opts.lang || "pt", id })}</div>`;
    case "fluxograma": return html`<div class="figure-box figure-scroll">${fluxograma({ id })}</div>${opts.legenda === false ? "" : fluxogramaLegenda()}`;
    case "permissao": return figPermissao();
    case "revisao": return figRevisao();
    case "teoria": return html`<div class="figure-box">${figTeoria(opts)}</div>`;
    case "rede": return figRedeCompleta();
    case "sintese": return figSintese();
    case "percurso": return figPercurso();
    default: return "";
  }
}

export function figuraComLegenda(nome, legenda, fonte, opts) {
  return html`<figure class="figure">${figura(nome, opts)}<figcaption><strong>${legenda}</strong>${fonte ? html`<span class="src">${fonte}</span>` : ""}</figcaption></figure>`;
}
