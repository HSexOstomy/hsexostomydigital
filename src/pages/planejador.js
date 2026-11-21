import { html, $, $$, on } from "../core/dom.js";
import { pageHead, icon, callout, toast, copyText } from "../core/ui.js";
import { historico, diagnosticos, escalas, sugestaoPlano, passosPlano } from "../data/cuidado.js";
import { terapiaIntensiva } from "../data/quadros.js";
import { session, memory } from "../core/store.js";

const PASSOS = passosPlano.map((p) => p[0]);
const novo = () => ({ passo: 0, id: "", data: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10), h: {}, med: [], com: [], sx: {}, sxNota: {}, dx: [], car: {}, fat: {}, ind: {}, prazo: {}, ativ: {}, pts: {}, auto: {}, enc: [], encOutro: "", obs: "", retorno: "", rev: {}, texto: "", textoEditado: false });
let S = Object.assign(novo(), session.read("plano", {}));
const salvar = () => session.write("plano", S);
const dxDe = (cod) => diagnosticos.find((d) => d.codigo === cod);

/* Sugestões a partir das respostas (nunca seleciona sozinho) */
function sugeridos() {
  const s = new Set(), sim = (k) => S.sx[k] === "Sim", nao = (k) => S.sx[k] === "Não";
  const sc = memory.scores;
  if (sim("funcao") || (sc.iief && sc.iief.valor < 26) || (sc.qsm && sc.qsm.valor < 62)) s.add("00386");
  if ((S.sxNota.corpo || "").trim() || sim("intimidade")) { s.add("00497"); s.add("00481"); }
  if (sim("inseguranca")) { s.add("00390"); s.add("00435"); }
  if (sim("sofrimento")) { s.add("00400"); s.add("00055"); }
  if (nao("parceria") || sim("intimidade")) s.add("00449");
  if (sim("mudancas")) s.add("00435");
  return s;
}

/* Aplica o plano inicial sugerido a um diagnóstico */
function aplicarSugestao(cod, forcar = false) {
  if (S.auto[cod] && !forcar) return;
  const sg = sugestaoPlano[cod]; if (!sg) return;
  S.ind[cod] = {}; sg.ind.forEach((i) => { S.ind[cod][i] = { a: "", m: "" }; });
  S.ativ[cod] = [...sg.ativ]; S.pts[cod] = [...sg.pts];
  S.prazo[cod] = S.prazo[cod] ?? 90; S.auto[cod] = true;
}

/* Encaminhamentos sugeridos a partir dos dados (Terapia Intensiva, 7.9.5) */
function encSugeridos() {
  const out = new Map(), sc = memory.scores;
  if (sc.iief && sc.iief.valor <= 16) out.set("Urologia", "função erétil ≤ 16 no IIEF-15");
  if (S.sx.sofrimento === "Sim") out.set("Psicologia", "mudanças geram sofrimento ou preocupação");
  if (S.dx.includes("00400") || S.dx.includes("00390")) out.set("Psicologia", "ansiedade ou medo excessivos");
  if (S.dx.includes("00449")) out.set("Terapia de casal ou familiar", "conflito relacional com a parceria");
  if (S.dx.includes("00494")) out.set("Sexologia", "identidade conturbada ligada à sexualidade");
  if (S.med.some((m) => ["Anti-hipertensivos", "Antidepressivos", "Opioides"].includes(m)) && S.sx.funcao === "Sim") out.set("Urologia", "possível causa iatrogênica a revisar com a equipe médica");
  return [...out].filter(([p]) => !S.enc.includes(p));
}

/* ---------- Passo 1: avaliação ---------- */
function campo(f) {
  const v = S.h[f.id] ?? "";
  if (f.tipo === "multi") {
    const arr = f.id === "medicacoes" ? S.med : S.com;
    return html`<fieldset class="field field-wide"><legend class="label">${f.rotulo}</legend>
      <div class="choice-grid">${f.opcoes.map((o) => html`<label class="choice"><input type="checkbox" data-multi="${f.id}" value="${o}" ${arr.includes(o) ? "checked" : ""}><span>${o}</span></label>`)}</div>
      ${f.ajuda ? html`<p class="hint">${f.ajuda}</p>` : ""}</fieldset>`;
  }
  if (f.tipo === "opcao") return html`<div class="field"><label for="h-${f.id}">${f.rotulo}</label><select class="select" id="h-${f.id}" data-h="${f.id}"><option value="">Selecione</option>${f.opcoes.map((o) => html`<option ${v === o ? "selected" : ""}>${o}</option>`)}</select></div>`;
  return html`<div class="field"><label for="h-${f.id}">${f.rotulo}</label><input class="input" id="h-${f.id}" data-h="${f.id}" type="${f.tipo === "numero" ? "number" : "text"}" inputmode="${f.tipo === "numero" ? "numeric" : "text"}" value="${v}" placeholder="${f.tipo === "texto" ? f.ajuda || "" : ""}">${f.ajuda && f.tipo !== "texto" ? html`<p class="hint">${f.ajuda}</p>` : ""}</div>`;
}

function passoAvaliacao() {
  const sc = memory.scores;
  return html`<div class="stack-lg">
    <section class="card"><h3>${icon("clipboard")}Identificação do registro</h3>
      <div class="form-grid">
        <div class="field"><label for="p-id">Nome do caso (fictício)</label><input class="input" id="p-id" data-s="id" value="${S.id}" placeholder="Ex.: Caso Bruno"><p class="hint">Não use nome real, prontuário ou documento.</p></div>
        <div class="field"><label for="p-data">Data da consulta</label><input class="input" type="date" id="p-data" data-s="data" value="${S.data}"></div>
      </div></section>
    <section class="card"><h3>${icon("list")}Histórico clínico</h3><div class="form-grid">${historico.clinico.map(campo)}</div>
      ${S.med.some((m) => ["Anti-hipertensivos", "Antidepressivos", "Opioides"].includes(m)) ? callout("alerta", "Possível causa iatrogênica", html`<p>Anti-hipertensivos, antidepressivos e opioides podem contribuir para disfunção sexual. Considere discutir com a equipe médica.</p>`) : ""}</section>
    <section class="card"><h3>${icon("chat")}Histórico sexual</h3><p class="small muted">Peça Permissão antes. Comece pelos tópicos menos sensíveis.</p>
      <div class="sx-list">${historico.sexual.map((q) => html`<div class="sx-row">
        <p class="sx-q">${q.rotulo}</p>
        ${q.aberta ? html`<textarea class="textarea textarea-sm" data-sxnota="${q.id}" aria-label="${q.rotulo}" placeholder="Registre com as palavras da pessoa">${S.sxNota[q.id] || ""}</textarea>`
          : html`<div class="choice-grid" role="radiogroup" aria-label="${q.rotulo}">${["Sim", "Não", "Não quis responder"].map((o) => html`<label class="choice"><input type="radio" name="sx-${q.id}" data-sx="${q.id}" value="${o}" ${S.sx[q.id] === o ? "checked" : ""}><span>${o}</span></label>`)}</div>`}
      </div>`)}</div></section>
    <section class="card"><h3>${icon("calc")}Instrumentos de rastreio</h3>
      <div class="grid grid-2">${["iief", "qsm"].map((k) => html`<div class="score-chip ${sc[k] ? "is-on" : ""}"><strong>${k === "iief" ? "IIEF-15" : "QS-M"}</strong><span>${sc[k] ? sc[k].resumo : "Não aplicado nesta sessão"}</span><a class="btn btn-sm" href="#${k}">${sc[k] ? "Reaplicar" : "Aplicar"}</a></div>`)}</div></section>
  </div>`;
}

/* ---------- Passo 2: diagnósticos ---------- */
function passoDiagnosticos() {
  const sug = sugeridos();
  return html`<div class="stack-lg">
    ${sug.size ? html`<div class="sug-bar"><p>${icon("spark")}<span><strong>${sug.size} ${sug.size === 1 ? "diagnóstico sugerido" : "diagnósticos sugeridos"}</strong> a partir da avaliação: ${[...sug].map((c) => dxDe(c).nome).join(", ")}.</span></p><button class="btn btn-sm btn-primary" data-aplicar-dx>Aplicar sugestões</button></div>` : callout("info", "Sem sugestões ainda", html`<p>Preencha o histórico sexual na etapa 1 para receber sugestões. Você pode escolher livremente abaixo.</p>`)}
    <div class="dx-grid">${diagnosticos.map((d) => {
      const on = S.dx.includes(d.codigo);
      return html`<article class="dx-card ${on ? "is-on" : ""}">
        <label class="dx-head"><input type="checkbox" data-dx="${d.codigo}" ${on ? "checked" : ""}><span><span class="dx-code">${d.codigo}</span><strong>${d.nome}</strong></span>${sug.has(d.codigo) ? html`<span class="tag tag-warn">Sugerido</span>` : ""}</label>
        <p class="small">${d.definicao}</p>
        <p class="xs muted">NOC ${d.noc.codigo} ${d.noc.nome} · NIC ${d.nic.codigo} ${d.nic.nome} · pp. ${d.paginas}</p>
        ${on ? html`<div class="form-grid dx-fields">
          <div class="field"><label for="car-${d.codigo}">Características definidoras observadas</label><textarea class="textarea textarea-sm" id="car-${d.codigo}" data-car="${d.codigo}" placeholder="Ex.: comportamentos sexuais alterados; escore inadequado no IIEF-15">${S.car[d.codigo] || ""}</textarea></div>
          <div class="field"><label for="fat-${d.codigo}">Fatores relacionados</label><textarea class="textarea textarea-sm" id="fat-${d.codigo}" data-fat="${d.codigo}" placeholder="Ex.: medo da intimidade; não aceitação da condição">${S.fat[d.codigo] || ""}</textarea></div>
        </div>` : ""}
      </article>`;
    })}</div>
  </div>`;
}

/* ---------- Passo 3: NOC e NIC ---------- */
function opcoesEscala(esc, val) {
  return html`<option value="">–</option>${escalas[esc].map((l, i) => html`<option value="${i + 1}" ${String(val) === String(i + 1) ? "selected" : ""}>${i + 1}. ${l}</option>`)}`;
}
function passoResultados() {
  if (!S.dx.length) return html`<div class="empty">${icon("info")}<p>Selecione ao menos um diagnóstico na etapa anterior.</p><button class="btn" data-ir="1">Voltar aos diagnósticos</button></div>`;
  return html`<div class="stack-lg">${S.dx.map((cod) => {
    const d = dxDe(cod), ind = S.ind[cod] || {}, at = S.ativ[cod] || [], pt = S.pts[cod] || [];
    return html`<section class="card plan-dx">
      <header class="plan-dx-head"><span class="dx-code">${d.codigo}</span><h3>${d.nome}</h3>${S.auto[cod] ? html`<span class="tag tag-warn">${icon("spark")}Plano sugerido, revise</span>` : ""}<button class="btn btn-sm btn-ghost" data-resugerir="${cod}">Restaurar sugestão</button></header>
      <div class="plan-cols">
        <div>
          <h4>Resultado NOC: ${d.noc.nome} (${d.noc.codigo})</h4>
          <p class="xs muted">Escala: 1. ${escalas[d.noc.escala][0]} a 5. ${escalas[d.noc.escala][4]}. Confirme na edição vigente da NOC.</p>
          <div class="field prazo"><label for="prazo-${cod}">Prazo para reavaliar (dias)</label><input class="input" type="number" min="7" step="1" id="prazo-${cod}" data-prazo="${cod}" value="${S.prazo[cod] ?? 90}"></div>
          <ul class="ind-list">${d.noc.indicadores.map((nome, i) => {
            const v = ind[i];
            return html`<li class="${v ? "is-on" : ""}"><label class="check"><input type="checkbox" data-ind="${cod}|${i}" ${v ? "checked" : ""}><span>${nome}</span></label>
              ${v ? html`<div class="ind-scale"><label>Atual <select class="select select-sm" data-indv="${cod}|${i}|a">${opcoesEscala(d.noc.escala, v.a)}</select></label><label>Meta <select class="select select-sm" data-indv="${cod}|${i}|m">${opcoesEscala(d.noc.escala, v.m)}</select></label></div>` : ""}</li>`;
          })}</ul>
        </div>
        <div>
          <h4>Intervenção NIC: ${d.nic.nome} (${d.nic.codigo})</h4>
          <ul class="check-list">${d.nic.atividades.map((a, i) => html`<li><label class="check ${at.includes(i) ? "is-on" : ""}"><input type="checkbox" data-ativ="${cod}|${i}" ${at.includes(i) ? "checked" : ""}><span>${a}</span></label></li>`)}</ul>
          <h4 class="pts-title">${icon("heart")}Pontos de atenção para o homem com estoma</h4>
          <ul class="check-list">${d.pontos.map((a, i) => html`<li><label class="check ${pt.includes(i) ? "is-on" : ""}"><input type="checkbox" data-pt="${cod}|${i}" ${pt.includes(i) ? "checked" : ""}><span>${a}</span></label></li>`)}</ul>
        </div>
      </div>
    </section>`;
  })}</div>`;
}

/* ---------- Passo 4: registro ---------- */
const low = (s) => s.charAt(0).toLowerCase() + s.slice(1);
export function gerarTexto() {
  const linhas = [];
  const dataBr = S.data ? S.data.split("-").reverse().join("/") : "__/__/____";
  linhas.push(`Consulta de enfermagem, Programa H_Sex_Ostomy, em ${dataBr}.`);
  const h = S.h, partes = [];
  if (h.idade) partes.push(`${h.idade} anos`);
  if (h.tipoEstoma) partes.push(low(h.tipoEstoma) + (h.tempo ? ` há ${h.tempo}` : ""));
  if (h.cirurgia) partes.push(`cirurgia: ${low(h.cirurgia)}`);
  if (h.conjugal) partes.push(`situação conjugal: ${low(h.conjugal)}`);
  if (h.orientacao) partes.push(`orientação sexual autodeclarada: ${h.orientacao}`);
  if (h.religiao) partes.push(`religião: ${h.religiao}`);
  if (h.condicao) partes.push(`condição clínica do estoma: ${h.condicao}`);
  if (partes.length) linhas.push(`Histórico: homem, ${partes.join("; ")}.`);
  if (S.com.length) linhas.push(`Comorbidades: ${S.com.map(low).join(", ")}.`);
  if (S.med.length) linhas.push(`Medicações em uso: ${S.med.map(low).join(", ")}${S.med.some((m) => ["Anti-hipertensivos", "Antidepressivos", "Opioides"].includes(m)) ? " (possível contribuição iatrogênica para disfunção sexual)" : ""}.`);
  const sx = historico.sexual.filter((q) => S.sx[q.id] || (S.sxNota[q.id] || "").trim()).map((q) => `${low(q.rotulo.replace(/\?$/, ""))}: ${q.aberta ? `“${S.sxNota[q.id].trim()}”` : low(S.sx[q.id])}`);
  if (sx.length) linhas.push(`Histórico sexual, com permissão: ${sx.join("; ")}.`);
  const sc = memory.scores;
  const inst = [sc.iief?.resumo, sc.qsm?.resumo].filter(Boolean);
  if (inst.length) linhas.push(`Instrumentos: ${inst.join("; ")}.`);
  S.dx.forEach((cod) => {
    const d = dxDe(cod);
    let t = `Diagnóstico de enfermagem: ${d.nome} (NANDA-I ${d.codigo})`;
    if ((S.car[cod] || "").trim()) t += ` caracterizado por ${S.car[cod].trim()}`;
    if ((S.fat[cod] || "").trim()) t += `, relacionado a ${S.fat[cod].trim()}`;
    linhas.push(t + ".");
    const ind = S.ind[cod] || {}, esc = escalas[d.noc.escala], prazo = S.prazo[cod] ?? 90;
    const res = Object.entries(ind).filter(([, v]) => v).map(([i, v]) => {
      const n = low(d.noc.indicadores[i]);
      return v.a && v.m ? `${n}, evoluindo de ${low(esc[v.a - 1])} para ${low(esc[v.m - 1])} em ${prazo} dias` : n;
    });
    if (res.length) linhas.push(`Resultado esperado: ${d.noc.nome} (NOC ${d.noc.codigo}): ${res.join("; ")}.`);
    const at = (S.ativ[cod] || []).map((i) => low(d.nic.atividades[i]));
    const pt = (S.pts[cod] || []).map((i) => low(d.pontos[i]));
    if (at.length || pt.length) linhas.push(`Intervenções: ${d.nic.nome} (NIC ${d.nic.codigo}): ${[...at, ...pt].join("; ")}.`);
  });
  const enc = [...S.enc, ...(S.encOutro.trim() ? [S.encOutro.trim()] : [])];
  if (enc.length) linhas.push(`Encaminhamentos: ${enc.join(", ")}. Mantido acompanhamento de enfermagem com Revisão nas próximas consultas.`);
  if (S.obs.trim()) linhas.push(`Observações clínicas: ${S.obs.trim()}`);
  const rev = [["mudanca", "Houve mudança"], ["duvidas", "Persistem dúvidas"], ["novas", "Novas preocupações"]].filter(([k]) => S.rev[k]).map(([k, t]) => `${t.toLowerCase()}: ${low(S.rev[k])}${(S.rev[k + "Por"] || "").trim() ? ` (${S.rev[k + "Por"].trim()})` : ""}`);
  if (rev.length) linhas.push(`Revisão: ${rev.join("; ")}.`);
  if (S.retorno.trim()) linhas.push(`Retorno: ${S.retorno.trim()}.`);
  linhas.push("Enfermeiro(a): ______________________ COREN nº ________");
  return linhas.join("\n");
}

function passoRegistro() {
  if (!S.retorno) S.retorno = "em até 3 meses (mínimo trimestral), com teleatendimento intermediário se necessário";
  if (!S.textoEditado) S.texto = gerarTexto();
  const sugEnc = encSugeridos();
  return html`<div class="stack-lg">
    ${sugEnc.length ? html`<div class="sug-bar"><p>${icon("spark")}<span><strong>Encaminhamentos sugeridos:</strong> ${sugEnc.map(([p, m]) => `${p} (${m})`).join("; ")}.</span></p><button class="btn btn-sm btn-primary" data-aplicar-enc>Aplicar</button></div>` : ""}
    <section class="card"><h3>${icon("network")}Observações e encaminhamentos</h3>
      <fieldset class="field"><legend class="label">Encaminhamentos realizados</legend><div class="choice-grid">${terapiaIntensiva.profissionais.map((p) => html`<label class="choice"><input type="checkbox" data-enc value="${p}" ${S.enc.includes(p) ? "checked" : ""}><span>${p}</span></label>`)}</div></fieldset>
      <div class="form-grid" style="margin-top:var(--sp-4)">
        <div class="field"><label for="enc-outro">Outro encaminhamento</label><input class="input" id="enc-outro" data-s="encOutro" value="${S.encOutro}"></div>
        <div class="field"><label for="retorno">Revisão / retorno</label><input class="input" id="retorno" data-s="retorno" value="${S.retorno}" placeholder="Ex.: em 30 dias, com teleatendimento intermediário se necessário"></div>
        <div class="field field-wide"><label for="obs">Observações clínicas</label><textarea class="textarea" id="obs" data-s="obs">${S.obs}</textarea></div>
      </div>
      <h4 style="margin-top:var(--sp-5)">Revisão em consultas de retorno</h4>
      <div class="rev-grid">${[["mudanca", "Houve mudança?"], ["duvidas", "Persistem dúvidas?"], ["novas", "Novas preocupações?"]].map(([k, t]) => html`<div class="rev-item"><p class="sx-q">${t}</p>
        <div class="choice-grid">${["Sim", "Não"].map((o) => html`<label class="choice"><input type="radio" name="rev-${k}" data-rev="${k}" value="${o}" ${S.rev[k] === o ? "checked" : ""}><span>${o}</span></label>`)}</div>
        <input class="input input-sm" data-revpor="${k}" value="${S.rev[k + "Por"] || ""}" placeholder="Por quê?" aria-label="${t} Por quê?"></div>`)}</div>
    </section>
    <section class="card registro-card">
      <div class="registro-top"><h3>${icon("clipboard")}Texto para o prontuário</h3>
        <div class="btn-row"><button class="btn btn-sm" data-regerar>${icon("spark")}Gerar de novo</button><button class="btn btn-sm btn-primary" data-copiar>${icon("copy")}Copiar</button><button class="btn btn-sm" data-print>${icon("print")}Imprimir</button></div></div>
      <label class="sr-only" for="texto-final">Texto da evolução</label>
      <textarea class="textarea registro-text" id="texto-final" data-texto rows="16">${S.texto}</textarea>
      <p class="small muted">Revise e complete antes de usar. O registro deve conter data, hora e identificação do profissional, conforme as normas profissionais e institucionais.</p>
    </section>
    <div class="print-only plan-print"><h2>Plano de cuidados · H_Sex_Ostomy</h2><pre>${S.texto}</pre></div>
  </div>`;
}

const PASSO_FN = [passoAvaliacao, passoDiagnosticos, passoResultados, passoRegistro];

function corpo() {
  return html`<ol class="stepper" aria-label="Etapas do plano">${PASSOS.map((p, i) => html`<li><button type="button" class="step-btn ${i < S.passo ? "is-done" : ""}" data-ir="${i}" aria-current="${i === S.passo ? "step" : "false"}"><span class="n">${String(i + 1).padStart(2, "0")}</span>${p}</button></li>`)}</ol>
    <div class="passo-intro"><span class="passo-n">${String(S.passo + 1).padStart(2, "0")}</span><div><h2 class="h4">${PASSOS[S.passo]}</h2><p>${passosPlano[S.passo][1]}</p></div></div>
    <div id="passo">${PASSO_FN[S.passo]()}</div>
    <div class="etapa-nav">
      ${S.passo > 0 ? html`<button class="btn" data-ir="${S.passo - 1}">${icon("back")}${PASSOS[S.passo - 1]}</button>` : html`<button class="btn btn-ghost" data-novo>${icon("trash")}Começar novo plano</button>`}
      <span class="small muted">${S.dx.length} ${S.dx.length === 1 ? "diagnóstico selecionado" : "diagnósticos selecionados"}</span>
      ${S.passo < 3 ? html`<button class="btn btn-primary" data-ir="${S.passo + 1}">${PASSOS[S.passo + 1]}${icon("arrow")}</button>` : html`<button class="btn btn-ghost" data-novo>${icon("trash")}Novo plano</button>`}
    </div>`;
}

export default {
  render() {
    return html`<div class="page">
      ${pageHead({ kicker: "Ferramentas · Sugestões Específicas", title: "Planejador de cuidados", lead: "Do histórico ao registro: organize avaliação, diagnósticos NANDA-I, resultados NOC com escala e prazo, intervenções NIC e pontos de atenção do Quadro 6, e gere o texto da evolução.", crumbs: [[null, "Planejador"]], art: "enfermeiro-fita" })}
      <div class="container">
        ${callout("alerta", "Privacidade", html`<p>Use apenas casos fictícios ou dados não identificáveis. O plano fica somente nesta aba do navegador e é apagado ao fechá-la. Nada é enviado.</p>`)}
        <div class="planner" id="planner">${corpo()}</div>
      </div>
    </div>`;
  },
  mount(root) {
    const box = $("#planner", root);
    const redesenhar = (foco) => {
      const ativo = foco || document.activeElement?.dataset;
      const chave = ativo && Object.entries(ativo).map(([k, v]) => `[data-${k.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())}="${v}"]`)[0];
      box.innerHTML = String(corpo());
      if (chave) { try { box.querySelector(chave)?.focus({ preventScroll: true }); } catch { /* seletor inválido */ } }
    };
    const set = (fn, redraw = false) => { fn(); S.textoEditado = S.textoEditado && S.passo === 3; salvar(); if (redraw) redesenhar(); };
    const par = (v) => v.split("|");
    const toggle = (arr, v) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

    const offs = [
      on(box, "click", "[data-ir]", (ev, b) => { S.passo = Number(b.dataset.ir); salvar(); redesenhar(); box.scrollIntoView({ behavior: "smooth", block: "start" }); }),
      on(box, "click", "[data-novo]", () => { if (confirm("Apagar o plano atual e começar outro?")) { S = novo(); memory.clearScores(); salvar(); redesenhar(); toast("Plano apagado"); } }),
      on(box, "input", "[data-s]", (ev, el) => set(() => { S[el.dataset.s] = el.value; })),
      on(box, "input", "[data-h]", (ev, el) => set(() => { S.h[el.dataset.h] = el.value; })),
      on(box, "change", "[data-h]", (ev, el) => set(() => { S.h[el.dataset.h] = el.value; })),
      on(box, "change", "[data-multi]", (ev, el) => set(() => { const k = el.dataset.multi === "medicacoes" ? "med" : "com"; S[k] = toggle(S[k], el.value); }, el.dataset.multi === "medicacoes")),
      on(box, "change", "[data-sx]", (ev, el) => set(() => { S.sx[el.dataset.sx] = el.value; })),
      on(box, "input", "[data-sxnota]", (ev, el) => set(() => { S.sxNota[el.dataset.sxnota] = el.value; })),
      on(box, "click", "[data-aplicar-dx]", () => set(() => { sugeridos().forEach((c) => { if (!S.dx.includes(c)) S.dx.push(c); }); S.dx.sort((a, b) => diagnosticos.findIndex((d) => d.codigo === a) - diagnosticos.findIndex((d) => d.codigo === b)); S.dx.forEach((c) => aplicarSugestao(c)); toast("Diagnósticos sugeridos aplicados"); }, true)),
      on(box, "click", "[data-resugerir]", (ev, b) => set(() => { aplicarSugestao(b.dataset.resugerir, true); toast("Sugestão restaurada"); }, true)),
      on(box, "click", "[data-aplicar-enc]", () => set(() => { encSugeridos().forEach(([p]) => S.enc.push(p)); S.textoEditado = false; toast("Encaminhamentos aplicados"); }, true)),
      on(box, "change", "[data-dx]", (ev, el) => set(() => { S.dx = toggle(S.dx, el.dataset.dx); if (S.dx.includes(el.dataset.dx)) aplicarSugestao(el.dataset.dx); S.dx.sort((a, b) => diagnosticos.findIndex((d) => d.codigo === a) - diagnosticos.findIndex((d) => d.codigo === b)); }, true)),
      on(box, "input", "[data-car]", (ev, el) => set(() => { S.car[el.dataset.car] = el.value; })),
      on(box, "input", "[data-fat]", (ev, el) => set(() => { S.fat[el.dataset.fat] = el.value; })),
      on(box, "input", "[data-prazo]", (ev, el) => set(() => { S.prazo[el.dataset.prazo] = el.value; })),
      on(box, "change", "[data-ind]", (ev, el) => set(() => { const [c, i] = par(el.dataset.ind); S.ind[c] = S.ind[c] || {}; if (S.ind[c][i]) delete S.ind[c][i]; else S.ind[c][i] = { a: "", m: "" }; }, true)),
      on(box, "change", "[data-indv]", (ev, el) => set(() => { const [c, i, k] = par(el.dataset.indv); S.ind[c][i][k] = el.value; if (k === "a" && el.value && !S.ind[c][i].m) S.ind[c][i].m = String(Math.min(5, Number(el.value) + 2)); }, true)),
      on(box, "change", "[data-ativ]", (ev, el) => set(() => { const [c, i] = par(el.dataset.ativ); S.ativ[c] = toggle(S.ativ[c] || [], Number(i)); el.closest(".check").classList.toggle("is-on", el.checked); })),
      on(box, "change", "[data-pt]", (ev, el) => set(() => { const [c, i] = par(el.dataset.pt); S.pts[c] = toggle(S.pts[c] || [], Number(i)); el.closest(".check").classList.toggle("is-on", el.checked); })),
      on(box, "change", "[data-enc]", (ev, el) => set(() => { S.enc = toggle(S.enc, el.value); }, true)),
      on(box, "change", "[data-rev]", (ev, el) => set(() => { S.rev[el.dataset.rev] = el.value; }, true)),
      on(box, "input", "[data-revpor]", (ev, el) => set(() => { S.rev[el.dataset.revpor + "Por"] = el.value; })),
      on(box, "change", "[data-s='obs'], [data-s='retorno'], [data-s='encOutro']", () => { if (S.passo === 3 && !S.textoEditado) redesenhar(); }),
      on(box, "input", "[data-texto]", (ev, el) => { S.texto = el.value; S.textoEditado = true; salvar(); }),
      on(box, "click", "[data-regerar]", () => { S.textoEditado = false; salvar(); redesenhar(); toast("Texto atualizado"); }),
      on(box, "click", "[data-copiar]", () => copyText($("[data-texto]", box).value))
    ];
    return () => offs.forEach((f) => f());
  }
};
