import { html, $, on } from "../core/dom.js";
import { pageHead, icon, toast } from "../core/ui.js";
import { aulas } from "../data/aprendizagem.js";
import { secoes } from "../data/manual.js";
import { local } from "../core/store.js";

let feitas = new Set(local.read("aulas", []));
const respostas = {};
const salvar = () => local.write("aulas", [...feitas]);

function lista() {
  const pct = Math.round((feitas.size / aulas.length) * 100);
  const proxima = aulas.find((a) => !feitas.has(a.id)) || aulas[0];
  return html`<div class="page">
    ${pageHead({ kicker: "Aprenda", title: "Aulas", lead: "Nove unidades curtas, na ordem do manual. Faça em sequência ou vá direto ao tema que precisa. Cada aula tem o essencial, a leitura indicada e exercícios com feedback.", crumbs: [[null, "Aulas"]] })}
    <div class="container">
      <div class="course-bar card">
        <div><p class="kicker">Seu progresso</p><h2 class="h3">${feitas.size} de ${aulas.length} aulas concluídas</h2><div class="progress progress-lg"><span style="width:${pct}%"></span></div></div>
        <div class="btn-row"><a class="btn btn-primary" href="#aulas/${proxima.id}">${feitas.size ? "Continuar" : "Começar"}: ${proxima.titulo}${icon("arrow")}</a>${feitas.size ? html`<button class="btn btn-ghost" data-zerar>${icon("trash")}Zerar progresso</button>` : ""}</div>
      </div>
      <ol class="lessons">${aulas.map((a, i) => html`<li><a class="lesson ${feitas.has(a.id) ? "is-done" : ""}" href="#aulas/${a.id}">
        <span class="lesson-n">${feitas.has(a.id) ? icon("check") : String(i + 1).padStart(2, "0")}</span>
        <span class="lesson-body"><strong>${a.titulo}</strong><span>${a.objetivo}</span></span>
        <span class="lesson-meta"><span class="tag">${icon("clock")}${a.duracao} min</span><span class="tag">${a.pratique.length} ${a.pratique.length === 1 ? "exercício" : "exercícios"}</span></span>
      </a></li>`)}</ol>
      <p class="small muted">O progresso fica salvo apenas neste navegador e não vale como certificação.</p>
    </div>
  </div>`;
}

function aula(a) {
  const i = aulas.indexOf(a), r = (respostas[a.id] = respostas[a.id] || {});
  const secs = a.secoes.map((id) => secoes.find((s) => s.id === id)).filter(Boolean);
  return html`<div class="page">
    ${pageHead({ kicker: `Aula ${i + 1} de ${aulas.length}`, title: a.titulo, lead: a.objetivo, crumbs: [["aulas", "Aulas"], [null, `Aula ${i + 1}`]] })}
    <div class="container lesson-layout">
      <div class="stack-lg">
        <section class="card"><p class="kicker">O essencial</p><ul class="essencial">${a.essencial.map((e) => html`<li>${e}</li>`)}</ul></section>
        <section><p class="kicker">Pratique</p>
          ${a.pratique.map((q, k) => html`<div class="card practice" data-q="${k}"><p class="quiz-q">${q.pergunta}</p>
            ${q.opcoes.map((o, j) => html`<button type="button" class="option ${r[k] !== undefined && o.certo ? "is-right" : ""} ${r[k] === j && !o.certo ? "is-wrong" : ""}" data-resp="${k}|${j}" ${r[k] !== undefined ? "disabled" : ""}><span class="mark">${"AB"[j] || j + 1}</span><span>${o.t}</span></button>`)}
            ${r[k] !== undefined ? html`<div class="feedback ${q.opcoes[r[k]].certo ? "ok" : "no"}" role="status"><strong>${q.opcoes[r[k]].certo ? "Correto." : "Não é bem assim."}</strong>${q.opcoes[r[k]].feedback}</div>` : ""}
          </div>`)}
        </section>
        <div class="etapa-nav">
          ${i > 0 ? html`<a class="btn" href="#aulas/${aulas[i - 1].id}">${icon("back")}Anterior</a>` : html`<a class="btn" href="#aulas">${icon("list")}Todas as aulas</a>`}
          <button class="btn ${feitas.has(a.id) ? "" : "btn-green"}" data-concluir="${a.id}">${icon("check")}${feitas.has(a.id) ? "Concluída" : "Marcar como concluída"}</button>
          ${i < aulas.length - 1 ? html`<a class="btn btn-primary" href="#aulas/${aulas[i + 1].id}">Próxima${icon("arrow")}</a>` : html`<a class="btn btn-primary" href="#casos">Ir para os casos${icon("arrow")}</a>`}
        </div>
      </div>
      <aside class="lesson-side">
        <div class="card"><p class="kicker">Leia no manual</p><ul class="lesson-links">${secs.map((s) => html`<li><a href="#manual/${s.id}"><strong>${s.num || "•"}</strong><span>${s.titulo}</span></a></li>`)}</ul></div>
        <div class="card card-tint"><p class="small"><strong>${a.duracao} min</strong> de estudo estimado</p><p class="small muted">Aulas concluídas: ${feitas.size}/${aulas.length}</p></div>
      </aside>
    </div>
  </div>`;
}

export default {
  title: (ctx) => { const a = aulas.find((x) => x.id === ctx.params[0]); return a ? a.titulo : "Aulas"; },
  render(ctx) { const a = aulas.find((x) => x.id === ctx.params[0]); return a ? aula(a) : lista(); },
  mount(root, ctx) {
    const a = aulas.find((x) => x.id === ctx.params[0]);
    const redraw = () => { root.innerHTML = String(a ? aula(a) : lista()); };
    const offs = [
      on(root, "click", "[data-resp]", (ev, b) => { const [k, j] = b.dataset.resp.split("|").map(Number); respostas[a.id][k] = j; const y = window.scrollY; redraw(); window.scrollTo(0, y); }),
      on(root, "click", "[data-concluir]", (ev, b) => { feitas.has(b.dataset.concluir) ? feitas.delete(b.dataset.concluir) : feitas.add(b.dataset.concluir); salvar(); const y = window.scrollY; redraw(); window.scrollTo(0, y); if (feitas.has(a.id)) toast("Aula concluída"); }),
      on(root, "click", "[data-zerar]", () => { feitas = new Set(); salvar(); redraw(); })
    ];
    return () => offs.forEach((x) => x());
  }
};
