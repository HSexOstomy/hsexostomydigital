/* Renderizadores dos quadros e blocos do manual, compartilhados entre páginas */
import { html } from "../core/dom.js";
import { icon, callout, fala, compBadge, tagPage } from "../core/ui.js";
import * as Q from "../data/quadros.js";
import { conceitos, identidade, apresentacao, componentes } from "../data/programa.js";
import { diagnosticos, historico, exemploRegistro, referenciasQuadro6 } from "../data/cuidado.js";
import { perguntas } from "../data/instrumentos.js";
import { referencias } from "../data/manual.js";
import { figuraComLegenda, figura } from "../figures/index.js";

const corTema = { reabilitacao: "p", imagem: "r", funcao: "r", odor: "ss", parceria: "p", mitos: "r" };
const objMeta = { permissao: Q.permissao, revisao: Q.revisao, informacao: Q.informacaoLimitada, sugestoes: Q.sugestoes, terapia: Q.terapiaIntensiva };

export function objetivoMeta(ref) {
  const m = objMeta[ref];
  return html`<dl class="obj-meta obj-meta-inline">
    <div><dt>${icon("target")}Objetivo</dt><dd>${m.objetivo}</dd></div>
    <div><dt>${icon("check")}Meta</dt><dd>${m.meta}</dd></div>
  </dl>`;
}

/* Quadro 2: um tema */
export function tema(t, { compacto = false } = {}) {
  return html`<article class="tema" id="tema-${t.id}">
    <header class="tema-head"><h3>${t.tema}</h3>${tagPage(String(t.pagina))}</header>
    <p class="tema-fin"><strong>Finalidade:</strong> ${t.finalidade}</p>
    <div class="grid grid-2 tema-cols">
      <div class="tema-col"><h4>${icon("chat")}O que informar</h4><ul>${t.informar.map((x) => html`<li>${x}</li>`)}</ul></div>
      <div class="tema-col"><h4>${icon("heart")}Atribuição do(a) enfermeiro(a)</h4><ul>${t.atribuicao.map((x) => html`<li>${x}</li>`)}</ul></div>
    </div>
    ${compacto ? "" : callout("teoria", "Trazendo a teoria para a prática", html`<p>${t.teoria}</p>`)}
    <h4 class="falas-title">Exemplos de abordagem</h4>
    <div class="stack">${t.falas.map(([r, x]) => fala(r, x, "li"))}</div>
  </article>`;
}

export function quadro2Tabs(prefix = "q2") {
  return html`<div class="tema-tabs" data-tabs="${prefix}">
    <div class="tabs" role="tablist" aria-label="Temas da Informação Limitada">
      ${Q.quadro2.map((t, i) => html`<button type="button" class="tab" role="tab" id="${prefix}-tab-${t.id}" aria-controls="${prefix}-panel-${t.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-tab="${t.id}">${t.curto}</button>`)}
    </div>
    ${Q.quadro2.map((t, i) => html`<div class="tab-panel" role="tabpanel" id="${prefix}-panel-${t.id}" aria-labelledby="${prefix}-tab-${t.id}" ${i ? "hidden" : ""}>${tema(t)}</div>`)}
    <p class="small muted">${Q.notaInferencias}</p>
  </div>`;
}

export function quadro3({ imprimir = false } = {}) {
  return html`<div class="dicas ${imprimir ? "dicas-print" : ""}">
    ${Q.quadro3.map((d, i) => html`<article class="dica"><span class="dica-n">${i + 1}</span><div><h3 class="dica-t">${d.titulo}</h3><p>${d.texto}</p></div></article>`)}
  </div>
  <div class="dica-destaque" role="note">${icon("alert")}<div><h3 class="dica-t">${Q.quadro3Destaque.titulo}</h3>${Q.quadro3Destaque.texto.map((p) => html`<p>${p}</p>`)}</div></div>`;
}

export function quadro4() {
  return html`<div class="table-wrap"><table class="table">
    <thead><tr><th scope="col">Tipo de cirurgia</th><th scope="col">Disfunções sexuais possíveis</th></tr></thead>
    <tbody>${Q.quadro4.map(([a, b]) => html`<tr><td><strong>${a}</strong></td><td>${b}</td></tr>`)}</tbody>
  </table></div>`;
}

export function quadro1() {
  return html`<div class="table-wrap"><table class="table table-concepts">
    <thead><tr><th scope="col">Conceito da teoria</th><th scope="col">Aplicação prática no H_Sex_Ostomy</th></tr></thead>
    <tbody>${conceitos.map(([c, d]) => html`<tr><td><strong>${c}</strong></td><td>${d}</td></tr>`)}</tbody>
  </table></div>`;
}

export function quadro6() {
  return html`<div class="q6">
    <div class="card card-tint q6-hist">
      <h3 class="h4">Histórico clínico e sexual</h3>
      <div class="grid grid-2">
        <ul class="small">${historico.clinico.map((h) => html`<li>${h.rotulo}${h.ajuda && h.id === "medicacoes" ? html` <em>(verificar anti-hipertensivos, antidepressivos e opioides como possíveis causas iatrogênicas de disfunção sexual)</em>` : ""}</li>`)}</ul>
        <ul class="small">${historico.sexual.map((h) => html`<li>${h.rotulo}</li>`)}<li>Instrumentos de rastreio: IIEF-15 e QS-M</li></ul>
      </div>
    </div>
    ${diagnosticos.map((d) => html`<details class="acc q6-dx">
      <summary><span><span class="tag tag-violet">${d.codigo}</span> ${d.nome}</span><span class="tag tag-page">pp. ${d.paginas}</span></summary>
      <div class="acc-body">
        <p><strong>Definição:</strong> ${d.definicao}</p>
        <div class="grid grid-2">
          <div><h4 class="q6-h">NOC: ${d.noc.nome} (${d.noc.codigo})</h4><p class="small muted">${d.noc.definicao}</p><ul class="small">${d.noc.indicadores.map((x) => html`<li>${x}</li>`)}</ul>${d.noc.obs ? html`<p class="small"><em>${d.noc.obs}</em></p>` : ""}</div>
          <div><h4 class="q6-h">NIC: ${d.nic.nome} (${d.nic.codigo})</h4><p class="small muted">${d.nic.definicao}</p><ul class="small">${d.nic.atividades.map((x) => html`<li>${x}</li>`)}</ul>${d.nic.obs ? html`<p class="small"><em>${d.nic.obs}</em></p>` : ""}</div>
        </div>
        ${callout("info", "Pontos de atenção para a prática clínica com o homem com estoma", html`<ul>${d.pontos.map((x) => html`<li>${x}</li>`)}</ul>`)}
      </div>
    </details>`)}
    <p class="small muted">Referências do Quadro 6: ${referenciasQuadro6}</p>
  </div>`;
}

export function quadro7() {
  const grupos = ["Estrutura", "Processo", "Resultado"];
  return html`<div class="table-wrap"><table class="table">
    <thead><tr><th scope="col">Indicador</th><th scope="col">Fórmula</th><th scope="col">Linha de base</th><th scope="col">Meta</th><th scope="col">Periodicidade</th></tr></thead>
    <tbody>${grupos.map((g) => html`<tr class="group-row"><td colspan="5">Indicadores de ${g.toLowerCase()}</td></tr>
      ${Q.quadro7.filter((i) => i.grupo === g).map((i) => html`<tr><td><strong>${i.indicador}</strong></td><td>${i.formula}</td><td>${i.base || "–"}</td><td>${i.meta}</td><td>${i.periodo}</td></tr>`)}`)}</tbody>
  </table></div>
  <p class="table-caption">Referência para elaboração dos indicadores: Distrito Federal (2026); Bahia (2021).</p>`;
}

export function terapia() {
  return html`<div class="grid grid-3 ti-grid">
    <div class="card"><h4>${icon("list")}O que o(a) enfermeiro(a) deve fazer</h4><ol class="small">${Q.terapiaIntensiva.fazer.map((x) => html`<li>${x}</li>`)}</ol></div>
    <div class="card"><h4>${icon("alert")}Situações que podem indicar encaminhamento</h4><ul class="small">${Q.terapiaIntensiva.situacoes.map((x) => html`<li>${x}</li>`)}</ul></div>
    <div class="card"><h4>${icon("users")}Profissionais para encaminhamento</h4><ul class="small">${Q.terapiaIntensiva.profissionais.map((x) => html`<li>${x}</li>`)}</ul></div>
  </div>
  ${callout("alerta", "O encaminhamento não encerra o cuidado", html`<p>${Q.terapiaIntensiva.lembrete}</p>`)}`;
}

export function instrumento(ref) {
  const qs = perguntas[ref];
  return html`<ol class="instr-list">${qs.map((q) => html`<li><p><strong>${q.q}</strong></p><ul class="instr-opts">${q.choices.map(([n, l]) => html`<li><span class="instr-n">${n}</span>${l}</li>`)}</ul></li>`)}</ol>`;
}

export function registroExemplo() {
  return html`<div class="registro"><p class="registro-head">${icon("clipboard")}Exemplo prático, elaborado para fins didáticos (p. 59)</p><p>${exemploRegistro}</p><p class="registro-sign">Enfermeiro(a), COREN nº [XXXXX] · __/__/____</p></div>`;
}

/* Renderiza um bloco do manual */
export function bloco(b) {
  switch (b.t) {
    case "p": return html`<p>${b.x}</p>`;
    case "h": return html`<h3>${b.x}</h3>`;
    case "lista": return html`<ul class="prose-list">${b.itens.map((i) => html`<li>${i}</li>`)}</ul>`;
    case "nota": return callout("nota", "Nota de atenção", html`<p>${b.ref === "recusa" ? Q.permissao.recusa : b.x}</p>`);
    case "citacao": return html`<blockquote class="quote"><p>${b.x}</p><cite>${b.fonte}</cite></blockquote>`;
    case "figura": return figuraComLegenda(b.fig, b.legenda, b.fonte);
    case "objetivoMeta": return objetivoMeta(b.ref);
    case "falas":
      if (b.ref === "quadro5") return html`<figure class="figure"><p class="fig-label"><strong>Quadro 5.</strong> Exemplo de solicitação de permissão para abordar a sexualidade em Sugestões Específicas.</p>${fala("Permissão: como abordar o tema?", Q.quadro5.fala, "ss")}<p class="small muted" style="margin-top:.5rem">${Q.quadro5.nota}</p></figure>`;
      return "";
    case "apresentacao": return html`${apresentacao.map((p) => html`<p>${p}</p>`)}`;
    case "identidade": return html`<dl class="ident-list">
      <div><dt>1. Finalidade</dt><dd>${identidade.finalidade}</dd></div>
      <div><dt>2. Missão</dt><dd>${identidade.missao}</dd></div>
      <div><dt>3. Visão</dt><dd>${identidade.visao}</dd></div>
      <div><dt>4. Valores</dt><dd><ul>${identidade.valores.map(([t, d]) => html`<li><strong>${t}:</strong> ${d}</li>`)}</ul></dd></div>
      <div><dt>5. Público-alvo</dt><dd><ul>${identidade.publico.map(([t, d]) => html`<li><strong>${t}:</strong> ${d}</li>`)}</ul></dd></div></dl>`;
    case "componentes": return html`<div class="grid grid-auto">${componentes.map((c) => html`<a class="card card-link comp-card c-${c.cor}" href="#manual/${c.secao}"><div class="comp-card-head">${compBadge(c)}<span class="tag">${c.rotulo}</span></div><h4>${c.nome}</h4><p class="small">${c.resumo}</p></a>`)}</div>`;
    case "quadro": {
      const corpo = { quadro1: quadro1, quadro2: () => quadro2Tabs("mq2"), quadro3: () => quadro3(), quadro4: quadro4, quadro6: quadro6, quadro7: quadro7 }[b.q];
      return html`<figure class="figure figure-quadro"><p class="fig-label">${b.legenda}</p>${corpo ? corpo() : ""}</figure>`;
    }
    case "registro": return registroExemplo();
    case "terapia": return terapia();
    case "diretrizes": return html`<ol class="diretrizes">${Q.diretrizesImplantacao.map((d) => html`<li>${d}</li>`)}</ol>`;
    case "referencias": return html`<ol class="refs">${referencias.map((r) => html`<li>${r}</li>`)}</ol>`;
    case "instrumento": return instrumento(b.ref);
    case "sintese": return figura("sintese");
    default: return "";
  }
}

/* Texto plano de uma seção, para busca */
export function textoBusca(s) {
  const parts = [s.titulo, s.resumo];
  for (const b of s.blocos) {
    if (b.x) parts.push(b.x);
    if (b.itens) parts.push(...b.itens);
    if (b.legenda) parts.push(b.legenda);
    if (b.q === "quadro2") Q.quadro2.forEach((t) => parts.push(t.tema, ...t.informar, ...t.atribuicao, ...t.falas.map((f) => f[1])));
    if (b.q === "quadro3") Q.quadro3.forEach((d) => parts.push(d.titulo, d.texto));
    if (b.q === "quadro4") Q.quadro4.forEach((r) => parts.push(...r));
    if (b.q === "quadro1") conceitos.forEach((c) => parts.push(c[0], c[1]));
    if (b.q === "quadro6") diagnosticos.forEach((d) => parts.push(d.nome, d.definicao, d.noc.nome, d.nic.nome, ...d.pontos));
    if (b.t === "terapia") parts.push(...Q.terapiaIntensiva.situacoes, ...Q.terapiaIntensiva.profissionais);
    if (b.t === "apresentacao") parts.push(...apresentacao);
  }
  return parts.join(" \n ");
}

/* Ativa abas acessíveis dentro de um container */
export function ligarAbas(root) {
  root.addEventListener("click", (ev) => {
    const tab = ev.target.closest("[data-tab]");
    if (!tab) return;
    ativar(tab);
  });
  root.addEventListener("keydown", (ev) => {
    const tab = ev.target.closest("[role=tab]");
    if (!tab || !["ArrowRight", "ArrowLeft", "Home", "End"].includes(ev.key)) return;
    const tabs = [...tab.parentElement.querySelectorAll("[role=tab]")];
    let i = tabs.indexOf(tab);
    i = ev.key === "ArrowRight" ? (i + 1) % tabs.length : ev.key === "ArrowLeft" ? (i - 1 + tabs.length) % tabs.length : ev.key === "Home" ? 0 : tabs.length - 1;
    ev.preventDefault(); ativar(tabs[i]); tabs[i].focus();
  });
  function ativar(tab) {
    const list = tab.parentElement;
    [...list.querySelectorAll("[role=tab]")].forEach((t) => {
      const on = t === tab;
      t.setAttribute("aria-selected", String(on)); t.tabIndex = on ? 0 : -1;
      const p = document.getElementById(t.getAttribute("aria-controls"));
      if (p) p.hidden = !on;
    });
  }
}
