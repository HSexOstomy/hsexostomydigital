import { html, $ } from "../core/dom.js";
import { pageHead, callout } from "../core/ui.js";
import { casos } from "../data/aprendizagem.js";
import { listaCasos, viewCaso, bindCaso, novoCaso } from "./atividades.js";

const estados = {};

export default {
  title: (ctx) => { const c = casos.find((x) => x.id === ctx.params[0]); return c ? `Caso ${c.nome}` : "Casos clínicos"; },
  render(ctx) {
    const c = casos.find((x) => x.id === ctx.params[0]);
    if (!c) return html`<div class="page">
      ${pageHead({ kicker: "Aprenda", title: "Casos clínicos", lead: "Situações fictícias para decidir condutas e receber feedback baseado no manual. Cada caso percorre encontros diferentes, como no acompanhamento longitudinal.", crumbs: [[null, "Casos clínicos"]] })}
      <div class="container"><h2 class="sr-only">Escolha um caso</h2>${listaCasos()}
        <div style="margin-top:var(--sp-5)">${callout("info", "Casos fictícios", html`<p>Personagens e situações foram criados para fins didáticos. As decisões não são avaliadas como prova: o objetivo é exercitar o raciocínio com o programa.</p>`)}</div>
      </div></div>`;
    estados[c.id] = estados[c.id] || novoCaso(c.id);
    return html`<div class="page">
      ${pageHead({ kicker: "Aprenda · Caso clínico", title: `${c.nome}, ${c.idade} anos`, lead: c.resumo, crumbs: [["casos", "Casos clínicos"], [null, c.nome]] })}
      <div class="container-narrow" id="caso">${viewCaso(estados[c.id])}</div>
    </div>`;
  },
  mount(root, ctx) {
    const c = casos.find((x) => x.id === ctx.params[0]);
    if (!c) return null;
    const box = $("#caso", root), st = estados[c.id];
    const offs = bindCaso(box, st, () => { box.innerHTML = String(viewCaso(st)); });
    return () => offs.forEach((x) => x());
  }
};
