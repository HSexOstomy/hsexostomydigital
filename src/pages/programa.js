import { html, $, $$, on } from "../core/dom.js";
import { pageHead, icon, compBadge, tagPage, callout } from "../core/ui.js";
import { componentes } from "../data/programa.js";
import { permissao, revisao, informacaoLimitada, sugestoes, terapiaIntensiva } from "../data/quadros.js";
import { explissit } from "../figures/explissit.js";

const metas = { permissao, revisao, informacao: informacaoLimitada, sugestoes, terapia: terapiaIntensiva };
let lang = "pt";

function detalhe(id) {
  const c = componentes.find((x) => x.id === id) || componentes[0];
  const m = metas[c.id];
  return html`<div class="comp-detail c-${c.cor}" aria-live="polite">
    <div class="comp-detail-head">${compBadge(c)}<div><h2>${c.nome}</h2><span class="tag">${c.rotulo}</span> ${tagPage(c.paginas)}</div></div>
    <p class="comp-resumo">${c.resumo}</p>
    <dl class="obj-meta">
      <div><dt>${icon("target")}Objetivo</dt><dd>${m.objetivo}</dd></div>
      <div><dt>${icon("check")}Meta</dt><dd>${m.meta}</dd></div>
    </dl>
    <p class="comp-acao"><strong>Na prática:</strong> ${c.acao}</p>
    <div class="btn-row">
      <a class="btn btn-primary" href="#consulta/${c.id}">${icon("chat")}Usar na consulta</a>
      <a class="btn" href="#manual/${c.secao}">${icon("book")}Ler no manual</a>
    </div>
  </div>`;
}

export default {
  keepScroll: true,
  render(ctx) {
    const sel = componentes.some((c) => c.id === ctx.params[0]) ? ctx.params[0] : "permissao";
    return html`<div class="page">
      ${pageHead({ kicker: "O Programa", title: "Cinco componentes, um cuidado contínuo", lead: "O H_Sex_Ostomy adapta o modelo EX-PLISSIT à reabilitação sexual do homem com estoma. Selecione um componente na figura para ver objetivo, meta e como aplicar.", crumbs: [[null, "Componentes"]] })}
      <div class="container">
        <div class="explorer">
          <figure class="explorer-fig">
            <div class="fig-toolbar">
              <span class="small muted">Figura 2 do manual, redesenhada</span>
              <div class="pills" role="group" aria-label="Idioma dos rótulos">
                <button type="button" class="pill-btn" data-lang="pt" aria-pressed="${lang === "pt"}">Português</button>
                <button type="button" class="pill-btn" data-lang="en" aria-pressed="${lang === "en"}">Original (inglês)</button>
              </div>
            </div>
            <div class="figure-box" id="exp-holder">${explissit({ lang, id: "prog" })}</div>
            <figcaption class="small muted">Modelo EX-PLISSIT. Adaptado de Taylor e Davis (2007).</figcaption>
          </figure>
          <div id="comp-detail">${detalhe(sel)}</div>
        </div>

        <section class="section">
          <div class="section-head"><div><p class="kicker">Visão geral</p><h2>Os componentes lado a lado</h2></div><a class="btn" href="#sintese">${icon("print")}Síntese para imprimir</a></div>
          <div class="grid grid-auto">
            ${componentes.map((c) => html`<a class="card card-link comp-card c-${c.cor}" href="#programa/${c.id}" data-pick="${c.id}">
              <div class="comp-card-head">${compBadge(c)}<span class="tag">${c.rotulo}</span></div>
              <h3>${c.nome}</h3><p>${c.resumo}</p><span class="go">Ver detalhes ${icon("arrow")}</span></a>`)}
          </div>
        </section>

        <section class="section">
          ${callout("teoria", "Um processo não linear", html`<p>A progressão entre as fases não é rígida. A cada encontro, o(a) enfermeiro(a) avalia em que nível a pessoa se encontra e qual abordagem responde melhor às demandas daquele momento, respeitando autonomia, tempo e singularidade. As fases se retroalimentam e podem ser retomadas a qualquer momento.</p>`)}
        </section>
      </div>
    </div>`;
  },
  mount(root, ctx) {
    const select = (id, push = true) => {
      $("#comp-detail", root).innerHTML = String(detalhe(id));
      $$(".fig-hot", root).forEach((g) => g.classList.toggle("is-active", g.dataset.comp === id));
      if (push) history.replaceState(null, "", `#programa/${id}`);
    };
    const current = componentes.some((c) => c.id === ctx.params[0]) ? ctx.params[0] : "permissao";
    $$(".fig-hot", root).forEach((g) => g.classList.toggle("is-active", g.dataset.comp === current));

    const offs = [
      on(root, "click", ".fig-hot", (ev, g) => { select(g.dataset.comp); if (window.innerWidth < 900) $("#comp-detail", root).scrollIntoView({ behavior: "smooth" }); }),
      on(root, "keydown", ".fig-hot", (ev, g) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); select(g.dataset.comp); } }),
      on(root, "click", "[data-pick]", (ev, a) => { ev.preventDefault(); select(a.dataset.pick); $(".explorer", root).scrollIntoView({ behavior: "smooth" }); }),
      on(root, "click", "[data-lang]", (ev, b) => {
        lang = b.dataset.lang;
        $$("[data-lang]", root).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
        $("#exp-holder", root).innerHTML = String(explissit({ lang, id: "prog" }));
        const active = (location.hash.split("/")[1]) || "permissao";
        $$(".fig-hot", root).forEach((g) => g.classList.toggle("is-active", g.dataset.comp === active));
      })
    ];
    return () => offs.forEach((f) => f());
  }
};
