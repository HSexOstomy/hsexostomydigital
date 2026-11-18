/* Despachante de figuras: usa as figuras originais do manual em alta resolução */
import { html } from "../core/dom.js";
import { figuraImg } from "./imagem.js";
import { figSintese, figPercurso } from "./outras.js";

export function figura(nome) {
  switch (nome) {
    case "explissit": case "fluxograma": case "permissao": case "revisao": case "teoria": case "rede":
      return html`<div class="figure-box figure-orig">${figuraImg(nome)}</div>`;
    case "sintese": return figSintese();
    case "percurso": return figPercurso();
    default: return "";
  }
}

export function figuraComLegenda(nome, legenda, fonte) {
  return html`<figure class="figure">${figura(nome)}<figcaption><strong>${legenda}</strong>${fonte ? html`<span class="src">${fonte}</span>` : ""}<span class="src">Toque na figura para abrir em tamanho original.</span></figcaption></figure>`;
}
