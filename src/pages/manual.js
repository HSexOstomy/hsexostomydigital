import { html, $, on, norm, esc, raw } from "../core/dom.js";
import { pageHead, icon, tagPage } from "../core/ui.js";
import { partes, secoes } from "../data/manual.js";
import { bloco, textoBusca, ligarAbas } from "./blocos.js";

const cfg = window.HSO_CONFIG || {};
const indice = secoes.map((s) => ({ s, txt: textoBusca(s), n: norm(textoBusca(s)) }));

const conteudoDe = (s) => {
  const tipos = new Set();
  for (const b of s.blocos) {
    if (b.t === "figura") tipos.add(b.legenda.split(".")[0]);
    if (b.t === "quadro") tipos.add(b.legenda.split(".")[0]);
    if (b.t === "falas" || (b.t === "quadro" && b.q === "quadro2")) tipos.add("Falas prontas");
  }
  return [...tipos];
};
const minutos = (s) => Math.max(1, Math.round(indice.find((i) => i.s === s).txt.split(/\s+/).length / 200));

function toc(atual) {
  return html`<nav class="toc" aria-label="Sumário do manual">
    <label class="search toc-search"><span class="sr-only">Buscar no manual</span>${icon("search")}<input class="input" type="search" data-busca placeholder="Buscar no manual"></label>
    <a class="toc-home ${!atual ? "is-on" : ""}" href="#manual">${icon("list")}Visão geral do manual</a>
    ${partes.map((p) => html`<div class="toc-part"><p class="toc-part-title">${p.titulo}</p>
      <ul>${secoes.filter((s) => s.parte === p.id).map((s) => html`<li><a href="#manual/${s.id}" class="${s.cor ? "c-" + s.cor : ""} ${atual === s.id ? "is-on" : ""}" ${atual === s.id ? raw('aria-current="page"') : ""}>
        ${s.num ? html`<span class="toc-num">${s.num}</span>` : ""}<span>${s.titulo}</span></a></li>`)}</ul></div>`)}
  </nav>`;
}

function visaoGeral() {
  return html`<div class="manual-overview">
    <div class="manual-intro card">
      <img src="${cfg.manual?.capa || "assets/img/capa.webp"}" alt="Capa do manual" width="900" height="1273" loading="lazy">
      <div>
        <p class="kicker">${cfg.manual?.edicao}</p>
        <h2>${cfg.manual?.titulo}</h2>
        <p class="muted">${cfg.manual?.autoria}</p>
        <p>O manual está organizado em seis partes. Cada seção abaixo mostra do que trata, o que contém (quadros, figuras, falas) e o tempo estimado de leitura. Os quadros estão completos e interativos.</p>
        <div class="btn-row">
          <a class="btn btn-primary" href="#manual/apresentacao">Começar a leitura ${icon("arrow")}</a>
          <a class="btn" href="#sintese">${icon("print")}Síntese de bolso</a>
          ${cfg.manualPdf ? html`<a class="btn" href="${cfg.manualPdf}" target="_blank" rel="noopener">${icon("download")}Baixar PDF</a>` : ""}
          ${(cfg.materiais || []).map((m) => html`<a class="btn" href="${m.url}" target="_blank" rel="noopener">${icon("download")}${m.titulo}</a>`)}
        </div>
      </div>
    </div>
    ${partes.map((p, i) => html`<section class="manual-part">
      <header><span class="part-n">${i + 1}</span><h2>${p.titulo}</h2></header>
      <div class="sec-grid">${secoes.filter((s) => s.parte === p.id).map((s) => html`<a class="sec-card ${s.cor ? "c-" + s.cor : ""}" href="#manual/${s.id}">
        <div class="sec-top"><span class="sec-num">${s.num || "•"}</span>${tagPage(s.paginas)}</div>
        <h3>${s.titulo}</h3><p>${s.resumo}</p>
        <div class="sec-meta">${conteudoDe(s).map((t) => html`<span class="tag">${t}</span>`)}<span class="tag">${icon("clock")}${minutos(s)} min</span></div>
      </a>`)}</div>
    </section>`)}
  </div>`;
}

function leitura(s) {
  const i = secoes.indexOf(s);
  const ant = secoes[i - 1], prox = secoes[i + 1];
  const parte = partes.find((p) => p.id === s.parte);
  return html`<article class="reader ${s.cor ? "c-" + s.cor : ""}">
    <header class="reader-head">
      <p class="reader-part">${parte.titulo}</p>
      <h2 class="reader-title" tabindex="-1">${s.num ? html`<span class="reader-num">${s.num}</span>` : ""}${s.titulo}</h2>
      <div class="tags">${tagPage(s.paginas)}<span class="tag">${icon("clock")}${minutos(s)} min de leitura</span></div>
      <p class="lead">${s.resumo}</p>
    </header>
    <div class="reader-body prose">${s.blocos.map(bloco)}</div>
    ${s.ferramentas?.length ? html`<aside class="reader-tools"><p class="kicker">Na prática</p><div class="btn-row">${s.ferramentas.map(([href, t], k) => html`<a class="btn ${k ? "" : "btn-primary"}" href="#${href}">${t} ${icon("arrow")}</a>`)}</div></aside>` : ""}
    <nav class="reader-nav" aria-label="Navegação entre seções">
      ${ant ? html`<a class="reader-prev" href="#manual/${ant.id}"><small>${icon("back")}Anterior</small><span>${ant.num ? ant.num + " · " : ""}${ant.titulo}</span></a>` : html`<span></span>`}
      ${prox ? html`<a class="reader-next" href="#manual/${prox.id}"><small>Próxima${icon("arrow")}</small><span>${prox.num ? prox.num + " · " : ""}${prox.titulo}</span></a>` : ""}
    </nav>
  </article>`;
}

function resultados(q) {
  const n = norm(q).trim();
  if (n.length < 2) return "";
  const hits = indice.filter((i) => i.n.includes(n));
  if (!hits.length) return html`<p class="empty">Nada encontrado para “${q}”.</p>`;
  return html`<p class="small muted">${hits.length} ${hits.length === 1 ? "seção encontrada" : "seções encontradas"} para “${q}”</p>
    <ul class="search-results">${hits.map(({ s, txt, n: nt }) => {
      const pos = nt.indexOf(n);
      const ini = Math.max(0, pos - 70);
      const trecho = txt.slice(ini, pos + n.length + 90).replace(/\s+/g, " ");
      const a = pos - ini;
      const marcado = raw(esc(trecho.slice(0, a)) + "<mark>" + esc(trecho.slice(a, a + n.length)) + "</mark>" + esc(trecho.slice(a + n.length)));
      return html`<li><a href="#manual/${s.id}"><strong>${s.num ? s.num + " · " : ""}${s.titulo}</strong><span>…${marcado}…</span></a></li>`;
    })}</ul>`;
}

export default {
  title: (ctx) => { const s = secoes.find((x) => x.id === ctx.params[0]); return s ? `${s.num ? s.num + " " : ""}${s.titulo} · Manual` : "Manual"; },
  render(ctx) {
    const s = secoes.find((x) => x.id === ctx.params[0]);
    return html`<div class="page">
      ${pageHead({ kicker: "O Programa", title: s ? "Manual H_Sex_Ostomy" : "Manual do Programa", lead: s ? "" : "Leia o manual por seções, com os quadros completos, as figuras redesenhadas e atalhos para usar cada conteúdo na prática.", crumbs: s ? [["manual", "Manual"], [null, s.num || s.titulo]] : [[null, "Manual"]] })}
      <div class="container with-sidebar manual-layout">
        <aside class="sidebar">${toc(s?.id)}</aside>
        <div class="manual-main">
          <div id="busca-resultados" aria-live="polite"></div>
          <div id="manual-conteudo">${s ? leitura(s) : visaoGeral()}</div>
        </div>
      </div>
    </div>`;
  },
  mount(root) {
    ligarAbas(root);
    const ativo = root.querySelector(".toc a.is-on");
    const side = root.querySelector(".sidebar");
    if (ativo && side) side.scrollTop = Math.max(0, ativo.offsetTop - side.clientHeight / 3);
    const res = $("#busca-resultados", root), cont = $("#manual-conteudo", root);
    const off = on(root, "input", "[data-busca]", (ev, inp) => {
      const q = inp.value;
      res.innerHTML = String(resultados(q));
      cont.hidden = norm(q).trim().length >= 2;
    });
    return off;
  }
};
