/* Figuras 1, 4, 5 e 6, Apêndice A e percurso de construção, redesenhados a partir do manual */
import { html } from "../core/dom.js";
import { sintese as S } from "../data/quadros.js";
import { percurso as PERC } from "../data/programa.js";

/* ---------- Apêndice A: síntese ---------- */
const corDe = { P: "p", R: "r", LI: "li", SS: "ss", IT: "it" };
export function figSintese() {
  return html`<article class="sintese">
    <header class="sintese-head"><h2><em>H_Sex_Ostomy</em> na prática</h2><p>Síntese do que fazer em cada etapa do encontro terapêutico</p></header>
    <div class="sintese-body">
      <div class="sintese-pills"><span class="p1">PERMISSÃO · sustenta todas as etapas</span><span class="p2">REVISÃO · início e final de cada encontro</span></div>
      ${S.map((s, i) => html`<div class="sintese-item c-${corDe[s.id]}">
        <span class="sintese-num">${i + 1}</span>
        <div class="sintese-card"><header><h3>${s.nome}</h3><span class="tag">${s.rotulo}</span></header>
          <p>${s.texto}</p><p class="fala-mini">${s.fala.endsWith("?") ? `“${s.fala}”` : s.fala}</p></div>
      </div>`)}
    </div>
  </article>`;
}

/* ---------- Percurso de construção ---------- */
export function figPercurso() {
  return html`<ol class="percurso" style="--n:${PERC.length}">${PERC.map(([t, d], i) => html`<li><span class="dot">${i + 1}</span><strong>${t}</strong><span>${d}</span></li>`)}</ol>`;
}
