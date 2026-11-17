import { html, $, on } from "../core/dom.js";
import { pageHead, icon, callout, toast } from "../core/ui.js";
import { perguntas, iiefDominios, iiefFaixas, qsmFaixas } from "../data/instrumentos.js";
import { memory } from "../core/store.js";

const INFO = {
  iief: { nome: "IIEF-15", longo: "Índice Internacional de Função Erétil", fonte: "Anexo A, pp. 70–72. Rosen et al. (1997); validação brasileira: Gonzáles et al. (2013).", n: 15 },
  qsm: { nome: "QS-M", longo: "Quociente Sexual: Versão Masculina", fonte: "Anexo B, pp. 73–74. Abdo (2007).", n: 10 }
};
const estado = { iief: { r: Array(15).fill(null), i: 0 }, qsm: { r: Array(10).fill(null), i: 0 } };

export function calcIIEF(r) {
  const soma = (itens) => itens.reduce((a, k) => a + Number(r[k - 1] ?? 0), 0);
  const dominios = iiefDominios.map((d) => ({ ...d, valor: soma(d.itens) }));
  const fe = dominios[0].valor;
  const faixa = iiefFaixas.find(([a, b]) => fe >= a && fe <= b);
  const semAtividade = r.slice(0, 5).every((v) => Number(v) === 0);
  return { dominios, fe, faixa, semAtividade, temZero: r.slice(0, 10).some((v) => Number(v) === 0) };
}
export function calcQSM(r) {
  const total = r.reduce((a, b) => a + Number(b ?? 0), 0) * 2;
  const faixa = qsmFaixas.find(([a, b]) => total >= a && total <= b) || qsmFaixas.find(([a, b]) => total >= a - 1 && total <= b + 1);
  return { total, faixa };
}

function visaoGeral() {
  return html`<div class="page">
    ${pageHead({ kicker: "Ferramentas", title: "Calculadoras", lead: "Instrumentos validados para a população brasileira que apoiam a avaliação da função e da satisfação sexual masculina. São autoaplicáveis e podem ser usados por enfermeiros(as), inclusive de forma assistida.", crumbs: [[null, "Calculadoras"]] })}
    <div class="container">
      <div class="grid grid-2">
        ${["iief", "qsm"].map((k) => html`<article class="card calc-card">
          <span class="calc-tag">${INFO[k].nome}</span><h2 class="h3">${INFO[k].longo}</h2>
          ${k === "iief"
            ? html`<p>15 questões em cinco domínios: função erétil, função orgásmica, desejo sexual, satisfação com a relação sexual e satisfação geral. Classifica a função erétil de ausência de disfunção a disfunção grave.</p>`
            : html`<p>10 questões sobre desempenho e satisfação sexual, pontuadas de 0 a 5. O escore é a soma multiplicada por dois, de 0 a 100: quanto maior, maior a satisfação.</p>`}
          <p class="small muted">${INFO[k].fonte}</p>
          <a class="btn btn-primary" href="#${k}">Aplicar ${INFO[k].nome} ${icon("arrow")}</a>
        </article>`)}
      </div>
      <div class="grid grid-2" style="margin-top:var(--sp-5)">
        ${callout("info", "Antes de aplicar", html`<p>Explique a finalidade, peça Permissão, considere a privacidade e a compreensão da pessoa e respeite a decisão de não responder.</p>`)}
        ${callout("nota", "O que os escores não dizem sozinhos", html`<p>Não explicam o contexto da estomia, a relação com a parceria, os desejos individuais nem o impacto de uma eventual ausência de atividade sexual. Interprete junto ao histórico.</p>`)}
      </div>
    </div>
  </div>`;
}

function resultado(tipo) {
  const r = estado[tipo].r;
  if (tipo === "iief") {
    const x = calcIIEF(r);
    return html`<div class="result-box" role="region" aria-label="Resultado do IIEF-15">
      <p class="kicker">Resultado</p>
      <div class="result-main"><div><small>Domínio função erétil</small><strong>${x.fe}<span>/30</span></strong></div>
        ${x.semAtividade ? html`<span class="level level-media">Interpretação limitada</span>` : x.faixa ? html`<span class="level level-${x.faixa[3]}">${x.faixa[2]}</span>` : html`<span class="level level-media">Abaixo das faixas classificatórias</span>`}</div>
      <div class="dominios">${x.dominios.map((d) => html`<div class="dom"><div class="dom-top"><span>${d.nome}</span><strong>${d.valor}/${d.max}</strong></div><div class="progress"><span style="width:${Math.round((d.valor / d.max) * 100)}%"></span></div></div>`)}</div>
      ${x.temZero ? callout("nota", "Atenção às respostas zero", html`<p>Respostas “0” indicam ausência de atividade ou de tentativa. Considere o contexto antes de interpretar o domínio de função erétil.</p>`) : ""}
      <p class="small muted">Faixas do domínio função erétil (itens 1–5 e 15): 26–30 sem disfunção; 22–25 leve; 17–21 leve a moderada; 11–16 moderada; 6–10 grave.</p>
    </div>`;
  }
  const x = calcQSM(r);
  return html`<div class="result-box" role="region" aria-label="Resultado do QS-M">
    <p class="kicker">Resultado</p>
    <div class="result-main"><div><small>Escore QS-M</small><strong>${x.total}<span>/100</span></strong></div>${x.faixa ? html`<span class="level level-${x.faixa[4]}">${x.faixa[2]}</span>` : ""}</div>
    ${x.faixa ? html`<p class="result-quote">“${x.faixa[3]}”</p>` : ""}
    <div class="progress progress-lg"><span style="width:${x.total}%"></span></div>
    <p class="small muted">Faixas: 82–100 muito satisfeito; 62–80 parcialmente satisfeito; 42–60 médio; 22–40 insatisfeito; 0–20 muito insatisfeito.</p>
  </div>`;
}

function questionario(tipo) {
  const st = estado[tipo], qs = perguntas[tipo], q = qs[st.i];
  const feitas = st.r.filter((v) => v !== null).length, completo = feitas === qs.length;
  return html`<div class="page">
    ${pageHead({ kicker: "Ferramentas · Calculadoras", title: `${INFO[tipo].nome}: ${INFO[tipo].longo}`, lead: tipo === "iief" ? "Considere as últimas quatro semanas. Leia cada pergunta com a pessoa e marque a resposta escolhida." : "Responda pensando nas suas relações sexuais recentes. Marque a alternativa que melhor descreve sua experiência.", crumbs: [["calculadoras", "Calculadoras"], [null, INFO[tipo].nome]] })}
    <div class="container calc-layout">
      <section class="card calc-main">
        <div class="calc-head"><h2 class="h4" id="q-title">Pergunta ${st.i + 1} de ${qs.length}</h2><span class="tag tag-green">${feitas}/${qs.length} respondidas</span></div>
        <div class="progress" role="progressbar" aria-label="Progresso" aria-valuemin="0" aria-valuemax="${qs.length}" aria-valuenow="${feitas}"><span style="width:${(feitas / qs.length) * 100}%"></span></div>
        <fieldset class="calc-q" aria-labelledby="q-title q-text">
          <legend id="q-text">${q.q}</legend>
          <div class="calc-opts">${q.choices.map(([n, l]) => html`<label class="calc-opt ${st.r[st.i] === n ? "is-on" : ""}"><input type="radio" name="q${st.i}" value="${n}" ${st.r[st.i] === n ? "checked" : ""} data-resp="${n}"><span class="calc-n">${n}</span><span>${l}</span></label>`)}</div>
        </fieldset>
        <div class="calc-nav">
          <button type="button" class="btn" data-nav="-1" ${st.i === 0 ? "disabled" : ""}>${icon("back")}Anterior</button>
          <span class="small muted">Use as setas ou números do teclado</span>
          <button type="button" class="btn btn-primary" data-nav="1" ${st.i === qs.length - 1 ? "disabled" : ""}>Próxima${icon("arrow")}</button>
        </div>
        <div class="calc-markers" role="group" aria-label="Ir para a pergunta">${qs.map((_, k) => html`<button type="button" class="marker ${k === st.i ? "is-current" : ""} ${st.r[k] !== null ? "is-done" : ""}" data-jump="${k}" aria-label="Pergunta ${k + 1}${st.r[k] !== null ? ", respondida" : ""}">${k + 1}</button>`)}</div>
      </section>
      <aside class="calc-side" aria-live="polite">
        ${completo ? html`${resultado(tipo)}
          <div class="btn-row"><button class="btn btn-green" data-enviar>${icon("clipboard")}Levar ao Planejador</button><button class="btn" data-print>${icon("print")}Imprimir</button><button class="btn btn-ghost" data-limpar>${icon("trash")}Limpar</button></div>`
        : html`<div class="card card-tint"><p class="kicker">Resultado</p><p>Responda às ${qs.length} perguntas para calcular. Faltam <strong>${qs.length - feitas}</strong>.</p><p class="small muted">${INFO[tipo].fonte}</p></div>
          ${feitas ? html`<button class="btn btn-ghost" data-limpar>${icon("trash")}Limpar respostas</button>` : ""}`}
        <p class="small muted">As respostas ficam só nesta página e não são enviadas. Use dados fictícios em demonstrações.</p>
      </aside>
    </div>
  </div>`;
}

export default {
  title: (ctx) => (ctx.name === "calculadoras" ? "Calculadoras" : INFO[ctx.name].nome),
  render(ctx) { return ctx.name === "calculadoras" ? visaoGeral() : questionario(ctx.name); },
  mount(root, ctx) {
    if (ctx.name === "calculadoras") return null;
    const tipo = ctx.name, st = estado[tipo], qs = perguntas[tipo];
    const redraw = (focus) => {
      root.innerHTML = String(questionario(tipo));
      if (focus === "opt") root.querySelector(".calc-opt.is-on input, .calc-opt input")?.focus();
      if (focus === "res") root.querySelector(".result-box")?.scrollIntoView({ behavior: "smooth", block: "center" });
    };
    const offs = [
      on(root, "change", "[data-resp]", (ev, inp) => {
        st.r[st.i] = Number(inp.value);
        const completo = st.r.every((v) => v !== null);
        if (st.i < qs.length - 1 && !completo) st.i++;
        else if (st.i < qs.length - 1 && st.r[st.i + 1] === null) st.i++;
        redraw(completo ? "res" : "opt");
      }),
      on(root, "click", "[data-nav]", (ev, b) => { st.i = Math.min(qs.length - 1, Math.max(0, st.i + Number(b.dataset.nav))); redraw("opt"); }),
      on(root, "click", "[data-jump]", (ev, b) => { st.i = Number(b.dataset.jump); redraw("opt"); }),
      on(root, "click", "[data-limpar]", () => { st.r.fill(null); st.i = 0; redraw("opt"); toast("Respostas apagadas"); }),
      on(root, "click", "[data-enviar]", () => {
        const dados = tipo === "iief" ? (() => { const x = calcIIEF(st.r); return { resumo: `IIEF-15: função erétil ${x.fe}/30${x.faixa ? ` (${x.faixa[2].toLowerCase()})` : ""}`, valor: x.fe }; })()
          : (() => { const x = calcQSM(st.r); return { resumo: `QS-M: ${x.total}/100${x.faixa ? ` (${x.faixa[2].toLowerCase()})` : ""}`, valor: x.total }; })();
        memory.setScore(tipo, dados);
        toast("Escore enviado ao Planejador");
        location.hash = "#planejador";
      })
    ];
    const key = (ev) => {
      if (ev.target.closest("input[type=text], textarea")) return;
      if (/^[0-5]$/.test(ev.key)) {
        const inp = root.querySelector(`[data-resp="${ev.key}"]`);
        if (inp) { inp.checked = true; inp.dispatchEvent(new Event("change", { bubbles: true })); }
      }
      if (ev.key === "ArrowRight" && !ev.target.closest("[role=radiogroup], .calc-opts")) { st.i = Math.min(qs.length - 1, st.i + 1); redraw("opt"); }
      if (ev.key === "ArrowLeft" && !ev.target.closest(".calc-opts")) { st.i = Math.max(0, st.i - 1); redraw("opt"); }
    };
    document.addEventListener("keydown", key);
    return () => { offs.forEach((f) => f()); document.removeEventListener("keydown", key); };
  }
};
