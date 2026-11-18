import { html, $ } from "../core/dom.js";
import { pageHead, callout } from "../core/ui.js";
import { casos } from "../data/aprendizagem.js";
import { listaCasos, viewCaso, bindCaso, novoCaso } from "./atividades.js";

const estados = {};

export default {
  title: (ctx) => { const c = casos.find((x) => x.id === ctx.params[0]); return c ? `Simulação: ${c.nome}` : "Simulação clínica"; },
  render(ctx) {
    const c = casos.find((x) => x.id === ctx.params[0]);
    if (!c) return html`<div class="page">
      ${pageHead({ kicker: "Aprenda", title: "Simulação clínica", lead: "Casos fictícios que evoluem conforme as suas decisões. Cada escolha muda a história, o vínculo com a pessoa e o desfecho. O fluxograma ao lado mostra em que fase do programa você está.", crumbs: [[null, "Simulação clínica"]], art: "dupla-homens-fita" })}
      <div class="container"><h2 class="sr-only">Escolha um caso</h2>${listaCasos()}
        <div style="margin-top:var(--sp-5)">${callout("info", "Casos fictícios", html`<p>Personagens e situações foram criados para fins didáticos. Não há nota: o objetivo é ver como cada decisão repercute no cuidado. Refaça por caminhos diferentes.</p>`)}</div>
      </div></div>`;
    estados[c.id] = estados[c.id] || novoCaso(c.id);
    return html`<div class="page">
      ${pageHead({ kicker: "Aprenda · Simulação clínica", title: `${c.nome}, ${c.idade} anos`, lead: c.resumo, crumbs: [["casos", "Simulação clínica"], [null, c.nome]] })}
      <div class="container" id="caso">${viewCaso(estados[c.id])}</div>
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
