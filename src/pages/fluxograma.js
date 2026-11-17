import { html, $, $$, on } from "../core/dom.js";
import { pageHead, icon } from "../core/ui.js";
import { fluxograma, fluxogramaLista, fluxogramaLegenda, nos } from "../figures/fluxograma.js";

const TIPO = { inicio: "Início", processo: "Processo-ação", decisao: "Ponto de decisão", alternativo: "Caminho alternativo", loop: "Processo contínuo" };
const visitados = new Set(["admissao"]);
let atual = "admissao";

function inspector() {
  const n = nos[atual];
  const total = Object.keys(nos).length;
  return html`<span class="tag ${n.cor ? "" : "tag-navy"} ${n.cor ? "c-" + n.cor : ""}" style="${n.cor ? "background:var(--c-bg);color:var(--c);border-color:var(--c-line)" : ""}">${TIPO[n.tipo]}</span>
    <h2 tabindex="-1" id="insp-title">${n.titulo}</h2>
    <p>${n.texto}</p>
    <h3 class="h4">${n.tipo === "decisao" ? "Qual é a resposta?" : "Próximo passo"}</h3>
    <div class="next-list">${n.proximo.map(([rot, id]) => html`<button type="button" class="next-btn ${rot.startsWith("Não") ? "is-no" : ""}" data-go-node="${id}"><span>${rot}</span>${icon("arrow")}</button>`)}</div>
    ${n.secao || n.ferramenta ? html`<div class="btn-row insp-links">
      ${n.ferramenta ? html`<a class="btn btn-sm btn-primary" href="#${n.ferramenta[0]}">${n.ferramenta[1]}</a>` : ""}
      ${n.secao ? html`<a class="btn btn-sm" href="#manual/${n.secao}">${icon("book")}No manual</a>` : ""}
    </div>` : ""}
    <div class="insp-foot"><div class="progress" aria-hidden="true"><span style="width:${Math.round((visitados.size / total) * 100)}%"></span></div>
      <p class="small muted">${visitados.size} de ${total} etapas exploradas · <button type="button" class="link-btn" data-reset>Recomeçar</button></p></div>`;
}

export default {
  render() {
    return html`<div class="page">
      ${pageHead({ kicker: "O Programa · Figura 3", title: "Fluxograma do cuidado", lead: "O acompanhamento longitudinal do homem com estoma, com pontos de decisão, caminhos alternativos e o loop contínuo. Selecione qualquer etapa para entender o que fazer e para onde seguir.", crumbs: [["programa", "O Programa"], [null, "Fluxograma"]],
        actions: html`<button class="btn" data-print>${icon("print")}Imprimir fluxograma</button>` })}
      <div class="container">
        <div class="flow-layout">
          <div class="flow-canvas">
            <div class="flow-svg figure-box">${fluxograma({ id: "fx" })}</div>
            <div class="flow-mobile">${fluxogramaLista()}</div>
          </div>
          <aside class="flow-inspector card" id="inspector" aria-live="polite">${inspector()}</aside>
        </div>
        ${fluxogramaLegenda()}
        <p class="small muted" style="margin-top:1rem">Fonte: manual H_Sex_Ostomy, Figura 3, p. 28 (elaboração própria, 2026). Use como orientação geral: o julgamento clínico adapta o processo às singularidades de cada pessoa.</p>
      </div>
    </div>`;
  },
  mount(root) {
    const ir = (id, foco = false) => {
      atual = id; visitados.add(id);
      $("#inspector", root).innerHTML = String(inspector());
      $$("[data-node]", root).forEach((g) => g.classList.toggle("is-active", g.dataset.node === id));
      if (foco) $("#insp-title", root)?.focus({ preventScroll: true });
      if (window.innerWidth < 960) $("#inspector", root).scrollIntoView({ behavior: "smooth", block: "nearest" });
    };
    ir(atual);
    const offs = [
      on(root, "click", "[data-node]", (ev, el) => ir(el.dataset.node)),
      on(root, "keydown", ".fig-hot", (ev, el) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); ir(el.dataset.node, true); } }),
      on(root, "click", "[data-go-node]", (ev, b) => ir(b.dataset.goNode, true)),
      on(root, "click", "[data-reset]", () => { visitados.clear(); visitados.add("admissao"); ir("admissao", true); })
    ];
    return () => offs.forEach((f) => f());
  }
};
