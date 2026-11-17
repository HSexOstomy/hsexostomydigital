import { html, $, $$, on, norm } from "../core/dom.js";
import { pageHead, icon, callout } from "../core/ui.js";
import { conceitos, parcimonia } from "../data/programa.js";
import { figTeoria } from "../figures/outras.js";

const find = (nome) => conceitos.find(([c]) => norm(c) === norm(nome) || norm(c) === norm(nome).replace(/s$/, ""));

function cards(filtro = "") {
  const f = norm(filtro);
  const lista = conceitos.filter(([c, d]) => !f || norm(c).includes(f) || norm(d).includes(f));
  if (!lista.length) return html`<p class="empty">Nenhum conceito encontrado para “${filtro}”.</p>`;
  return html`${lista.map(([c, d]) => html`<article class="concept" id="conceito-${norm(c).replace(/\W+/g, "-")}">
    <h3>${c}</h3><p>${d}</p></article>`)}`;
}

export default {
  render() {
    return html`<div class="page">
      ${pageHead({ kicker: "O Programa", title: "Fundamentos do programa", lead: "O H_Sex_Ostomy articula a Teoria de Enfermagem de Reabilitação para o Bem-Viver, que sustenta o cuidado na relação intersubjetiva, e o modelo EX-PLISSIT, que orienta uma abordagem clínica progressiva e contínua.", crumbs: [[null, "Fundamentos"]] })}
      <div class="container">
        <section class="section">
          <div class="split split-top">
            <div class="prose">
              <p class="kicker">Teoria de Enfermagem de Reabilitação para o Bem-Viver</p>
              <h2>Reabilitar é reconstruir a própria vida</h2>
              <p>Desenvolvida por Soraia Dornelles Schoeller, Caroline Porcelis Vargas, Maria Manuela Martins e Milena Zuchetto, a teoria entende a reabilitação como um processo de reconstrução da identidade em busca de uma vida plena. Aos conceitos de pessoa, ambiente, saúde e enfermagem, acrescenta o <strong>tempo</strong>.</p>
              <div class="grid grid-2 found">
                <article class="card card-tint"><h3>Teoria do Reconhecimento</h3><p class="small">Axel Honneth. A identidade se forma em relações de reconhecimento: Amor, Direito e Solidariedade, que favorecem <strong>autoconfiança</strong>, <strong>autorrespeito</strong> e <strong>autoestima</strong>.</p></article>
                <article class="card card-tint"><h3>Princípio da Esperança</h3><p class="small">Ernst Bloch. O cuidado como movimento antecipador. O <strong>Esperançar</strong> transforma a angústia do presente em um futuro possível e tangível.</p></article>
              </div>
            </div>
            <blockquote class="quote quote-xl"><p>${parcimonia}</p><cite>Parcimônia da teoria (Schoeller, 2025)</cite></blockquote>
          </div>
        </section>

        <section class="section">
          <div class="section-head"><div><p class="kicker">Figura 1</p><h2>Os conceitos do modelo teórico</h2><p>Toque em um conceito para ver como ele se aplica no H_Sex_Ostomy (Quadro 1).</p></div></div>
          <div class="theory-layout">
            <div>${figTeoria({ clicavel: true })}<p class="small muted">Redesenho da Figura 1 do manual (p. 12). Fonte original: Zuchetto.</p></div>
            <aside class="concept-panel" id="concept-panel" aria-live="polite">
              <p class="kicker">Conceito</p><h3>Selecione um conceito</h3><p class="muted">A explicação aparece aqui.</p>
            </aside>
          </div>
        </section>

        <section class="section" id="glossario">
          <div class="section-head"><div><p class="kicker">Quadro 1</p><h2>Como cada conceito vira prática</h2><p>Operacionalização dos ${conceitos.length} conceitos da teoria no H_Sex_Ostomy, adaptado de Zuchetto (2023). As sugestões não esgotam o arcabouço da teoria.</p></div>
            <label class="search" style="min-width:min(100%,320px)"><span class="sr-only">Buscar conceito</span>${icon("search")}<input class="input" type="search" id="busca-conceito" placeholder="Buscar conceito ou palavra"></label></div>
          <div class="concepts" id="concepts">${cards()}</div>
        </section>

        <section class="section">
          <div class="split">
            <div>
              <p class="kicker">Modelo EX-PLISSIT</p>
              <h2>Permissão no centro, revisão em todos os níveis</h2>
              <p>Proposto por Taylor e Davis (2007) para o bem-estar sexual de pessoas com deficiência adquirida ou doença crônica, o modelo amplia o PLISSIT de Annon (1976). Todas as intervenções começam com a permissão do indivíduo, e um ciclo de reflexão (foco no paciente) e revisão (foco no profissional) atravessa todos os níveis.</p>
              <div class="btn-row"><a class="btn btn-primary" href="#programa">Explorar o modelo ${icon("arrow")}</a><a class="btn" href="#manual/6-2">Ler a seção 6.2</a></div>
            </div>
            ${callout("nota", "Direcionamento, não roteiro rígido", html`<p>O programa não se configura como um roteiro rígido de condutas. O julgamento clínico do(a) enfermeiro(a) é condição indispensável: o que se adequa a um homem em determinado contexto regional, cultural e socioeconômico pode não corresponder às necessidades de outro.</p>`)}
          </div>
        </section>
      </div>
    </div>`;
  },
  mount(root) {
    const panel = $("#concept-panel", root);
    const offs = [
      on(root, "click", "[data-conceito]", (ev, b) => {
        const nome = b.dataset.conceito;
        const c = find(nome) || find(nome.replace(/s$/, ""));
        $$("[data-conceito]", root).forEach((x) => x.classList.toggle("is-on", x.dataset.conceito === nome));
        panel.innerHTML = String(c
          ? html`<p class="kicker">Conceito</p><h3>${c[0]}</h3><p>${c[1]}</p><p class="small muted">Quadro 1, manual pp. 13–18.</p>`
          : html`<p class="kicker">Conceito</p><h3>${nome}</h3><p class="muted">Conceito da figura sem operacionalização própria no Quadro 1.</p>`);
        if (window.innerWidth < 980) panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }),
      on(root, "input", "#busca-conceito", (ev, inp) => { $("#concepts", root).innerHTML = String(cards(inp.value)); })
    ];
    return () => offs.forEach((f) => f());
  }
};
