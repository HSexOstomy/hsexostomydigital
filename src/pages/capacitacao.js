import { html, on } from "../core/dom.js";
import { pageHead, icon, toast, callout } from "../core/ui.js";
import { modulos, TIPO_ALERTA } from "../data/capacitacao.js";
import { secoes } from "../data/manual.js";
import { local } from "../core/store.js";

let feitos = new Set(local.read("modulos", []));
const respostas = {};
const salvar = () => local.write("modulos", [...feitos]);
const totalMin = modulos.reduce((a, m) => a + m.min, 0);

function lista() {
  const pct = Math.round((feitos.size / modulos.length) * 100);
  const prox = modulos.find((m) => !feitos.has(m.id)) || modulos[0];
  return html`<div class="page">
    ${pageHead({ kicker: "Aprenda", title: "Formação de Habilidades", lead: `Nove módulos com o conteúdo clínico do manual, alertas de segurança, erros comuns na prática e questões de raciocínio a partir de situações reais. Cerca de ${Math.round(totalMin / 60 * 10) / 10} horas no total.`, crumbs: [[null, "Capacitação"]], art: "enfermeiros-dupla" })}
    <div class="container">
      <div class="course-bar card">
        <div><p class="kicker">Seu progresso</p><h2 class="h3">${feitos.size} de ${modulos.length} módulos concluídos</h2><div class="progress progress-lg"><span style="width:${pct}%"></span></div></div>
        <div class="btn-row"><a class="btn btn-primary" href="#capacitacao/${prox.id}">${feitos.size ? "Continuar" : "Começar"}: ${prox.titulo}${icon("arrow")}</a>${feitos.size ? html`<button class="btn btn-ghost" data-zerar>${icon("trash")}Zerar progresso</button>` : ""}</div>
      </div>
      <ol class="lessons">${modulos.map((m, i) => html`<li><a class="lesson ${feitos.has(m.id) ? "is-done" : ""}" href="#capacitacao/${m.id}">
        <span class="lesson-n">${feitos.has(m.id) ? icon("check") : String(i + 1).padStart(2, "0")}</span>
        <span class="lesson-body"><strong>${m.titulo}</strong><span>${m.objetivo}</span></span>
        <span class="lesson-meta"><span class="tag">${icon("clock")}${m.min} min</span><span class="tag tag-warn">${m.alertas.length} alertas</span><span class="tag">${m.pratique.length} questões</span></span>
      </a></li>`)}</ol>
      <p class="small muted">O progresso fica salvo apenas neste navegador e não substitui certificação.</p>
    </div>
  </div>`;
}

function modulo(m) {
  const i = modulos.indexOf(m), r = (respostas[m.id] = respostas[m.id] || {});
  const secs = m.secoes.map((id) => secoes.find((s) => s.id === id)).filter(Boolean);
  const acertos = m.pratique.filter((q, k) => r[k] !== undefined && q.opcoes[r[k]].certo).length, feitas = Object.keys(r).length;
  return html`<div class="page">
    ${pageHead({ kicker: `Módulo ${i + 1} de ${modulos.length} · ${m.min} min`, title: m.titulo, lead: m.objetivo, crumbs: [["capacitacao", "Formação de Habilidades"], [null, `Módulo ${i + 1}`]] })}
    <div class="container lesson-layout">
      <article class="stack-lg">
        ${m.blocos.map((b, k) => html`<section class="mod-block"><h2 class="h3"><span class="mod-n">${i + 1}.${k + 1}</span>${b.titulo}</h2>${b.texto.map((t) => html`<p>${t}</p>`)}</section>`)}
        <section class="mod-alertas" aria-label="Alertas">${m.alertas.map(([tipo, texto]) => callout(TIPO_ALERTA[tipo][1], TIPO_ALERTA[tipo][0], html`<p>${texto}</p>`))}</section>
        <section class="card mod-vinheta"><p class="kicker">Situação para análise</p><p class="vinheta">${m.vinheta}</p>
          ${m.pratique.map((q, k) => html`<div class="practice" data-q="${k}"><p class="quiz-q">${k + 1}. ${q.pergunta}</p>
            ${q.opcoes.map((o, j) => html`<button type="button" class="option ${r[k] !== undefined && o.certo ? "is-right" : ""} ${r[k] === j && !o.certo ? "is-wrong" : ""}" data-resp="${k}|${j}" ${r[k] !== undefined ? "disabled" : ""}><span class="mark">${"ABC"[j]}</span><span>${o.t}</span></button>`)}
            ${r[k] !== undefined ? html`<div class="feedback ${q.opcoes[r[k]].certo ? "ok" : "no"}" role="status"><strong>${q.opcoes[r[k]].certo ? "Correto." : "Não é bem assim."}</strong>${q.opcoes[r[k]].feedback}${q.opcoes[r[k]].certo ? "" : html`<br><em>Resposta esperada: ${q.opcoes.find((x) => x.certo).t}</em>`}</div>` : ""}
          </div>`)}
          ${feitas === m.pratique.length ? html`<p class="mod-score">${acertos} de ${m.pratique.length} respostas alinhadas ao programa.</p>` : ""}
        </section>
        <div class="etapa-nav">
          ${i > 0 ? html`<a class="btn" href="#capacitacao/${modulos[i - 1].id}">${icon("back")}Anterior</a>` : html`<a class="btn" href="#capacitacao">${icon("list")}Todos os módulos</a>`}
          <button class="btn ${feitos.has(m.id) ? "" : "btn-green"}" data-concluir="${m.id}">${icon("check")}${feitos.has(m.id) ? "Concluído" : "Marcar como concluído"}</button>
          ${i < modulos.length - 1 ? html`<a class="btn btn-primary" href="#capacitacao/${modulos[i + 1].id}">Próximo${icon("arrow")}</a>` : html`<a class="btn btn-primary" href="#casos">Ir para a simulação${icon("arrow")}</a>`}
        </div>
      </article>
      <aside class="lesson-side">
        <div class="card"><p class="kicker">Neste módulo</p><ol class="mod-toc">${m.blocos.map((b) => html`<li>${b.titulo}</li>`)}<li>Alertas</li><li>Situação para análise</li></ol></div>
        <div class="card"><p class="kicker">Leia no manual</p><ul class="lesson-links">${secs.map((s) => html`<li><a href="#manual/${s.id}"><strong>${s.num || "•"}</strong><span>${s.titulo}</span></a></li>`)}</ul></div>
      </aside>
    </div>
  </div>`;
}

export default {
  title: (ctx) => { const m = modulos.find((x) => x.id === ctx.params[0]); return m ? m.titulo : "Formação de Habilidades"; },
  render(ctx) { const m = modulos.find((x) => x.id === ctx.params[0]); return m ? modulo(m) : lista(); },
  mount(root, ctx) {
    const m = modulos.find((x) => x.id === ctx.params[0]);
    const redraw = () => { const y = window.scrollY; root.innerHTML = String(m ? modulo(m) : lista()); window.scrollTo(0, y); };
    const offs = [
      on(root, "click", "[data-resp]", (ev, b) => { const [k, j] = b.dataset.resp.split("|").map(Number); respostas[m.id][k] = j; redraw(); }),
      on(root, "click", "[data-concluir]", (ev, b) => { const id = b.dataset.concluir; feitos.has(id) ? feitos.delete(id) : feitos.add(id); salvar(); redraw(); if (feitos.has(id)) toast("Módulo concluído"); }),
      on(root, "click", "[data-zerar]", () => { feitos = new Set(); salvar(); redraw(); })
    ];
    return () => offs.forEach((x) => x());
  }
};
