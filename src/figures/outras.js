/* Figuras 1, 4, 5 e 6, Apêndice A e percurso de construção, redesenhados a partir do manual */
import { html, raw } from "../core/dom.js";
import { icon, ICONS } from "../core/ui.js";
import { permissao as P, revisao as R, rede as REDE, sintese as S } from "../data/quadros.js";
import { modeloTeorico as T, percurso as PERC } from "../data/programa.js";

/* ---------- Figuras 4 e 5: estratégias de aplicação ---------- */
const iconesP = ["users", "chat", "shield", "heart", "spark"];
const iconesR = ["clock", "chart", "target", "search", "flow"];

function estrategia(titulo, dados, icones, cor, exTitulo) {
  return html`<div class="strategy c-${cor}">
    <div class="strategy-head"><p class="strategy-title">${titulo}</p></div>
    <ol class="strategy-steps">
      ${dados.passos.map(([nome, desc], i) => html`<li>
        <span class="st-icon">${icon(icones[i])}</span>
        <span class="st-name"><span class="st-num">${i + 1}</span>${nome}</span>
        <span class="st-desc">${desc}</span>
      </li>`)}
    </ol>
    <p class="strategy-ex-title">${exTitulo}</p>
    <div class="grid grid-2">
      ${dados.exemplos.map((ex, i) => html`<figure class="fala c-${cor}">
        <div class="fala-head"><figcaption class="fala-label">Exemplo ${i + 1}</figcaption>
        <button type="button" class="copy-btn" data-copy="${ex}" aria-label="Copiar exemplo ${i + 1}">${icon("copy")}Copiar</button></div>
        <blockquote>${ex}</blockquote></figure>`)}
    </div>
  </div>`;
}
export const figPermissao = () => estrategia("COMO APLICAR A PERMISSÃO", P, iconesP, "p", "Exemplos para iniciar a discussão");
export const figRevisao = () => estrategia("REVISÃO", R, iconesR, "r", "Exemplos para iniciar a revisão");

/* ---------- Figura 1: modelo teórico ---------- */
const lista = (arr, clicavel) => html`<ul>${arr.map((c) => html`<li>${clicavel ? html`<button type="button" class="chip-btn" data-conceito="${c}">${c}</button>` : c}</li>`)}</ul>`;
export function figTeoria({ clicavel = false } = {}) {
  return html`<div class="theory" role="group" aria-label="Diagrama do modelo teórico da Teoria de Enfermagem de Reabilitação para o Bem-Viver">
    <div class="theory-oval">
      <div class="theory-top"><span class="theory-pill">BEM-VIVER</span><span class="theory-tags">${T.bemViver.join(" · ")}</span></div>
      <div class="theory-side left" aria-label="Ambiente">${"AMBIENTE".split("").map((l) => html`<span>${l}</span>`)}</div>
      <div class="theory-side right" aria-label="Tempo">${"TEMPO".split("").map((l) => html`<span>${l}</span>`)}</div>
      <div class="theory-cols">
        <div class="theory-box tb-enf"><h3 class="tb-h">ENFERMEIRA</h3>${lista(T.enfermeira, clicavel)}</div>
        <div class="theory-box tb-rea"><h3 class="tb-h">ENFERMAGEM DE REABILITAÇÃO</h3>${lista(T.enfermagem, clicavel)}</div>
        <div class="theory-box tb-pes"><h3 class="tb-h">PESSOA CUIDADA</h3>${lista(T.pessoa, clicavel)}</div>
      </div>
      <div class="theory-foot">
        <span class="theory-tags"><strong>Ambiente:</strong> ${T.ambiente.join(" · ")}</span>
        <span class="theory-tags"><strong>Tempo:</strong> ${T.tempo.join(" · ")}</span>
      </div>
    </div>
  </div>`;
}

/* ---------- Figura 6: rede de cuidados ---------- */
export function figRede({ id = "rede" } = {}) {
  const C = [320, 236];
  const nodes = [
    { id: "aps", x: 320, y: 78, ic: "shield", l: ["Atenção Primária", "à Saúde (APS)"], acima: true },
    { id: "especializados", x: 112, y: 118, ic: "clipboard", l: ["Serviços", "especializados"], sub: ["Psicologia, Urologia/Andrologia,", "Fisioterapia pélvica, Sexologia"] },
    { id: "multi", x: 528, y: 118, ic: "users", l: ["Equipe", "multiprofissional"] },
    { id: "grupos", x: 96, y: 330, ic: "chat", l: ["Grupos", "de apoio"] },
    { id: "social", x: 544, y: 330, ic: "heart", l: ["Serviço", "de apoio"], sub: ["Assistência social, Nutrição,", "Fisioterapia, Saúde mental"] }
  ];
  const ic = (name, x, y) => `<g transform="translate(${x - 15} ${y - 15}) scale(1.25)" fill="none" stroke="#203060" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</g>`;
  return raw(`<svg class="fig-rede" viewBox="0 0 640 470" role="img" aria-labelledby="${id}-t ${id}-d">
    <title id="${id}-t">Rede de cuidados ao homem com estoma</title>
    <desc id="${id}-d">No centro, o homem com estoma, protagonista do seu cuidado. Ao redor, conectados: Atenção Primária à Saúde, serviços especializados (psicologia, urologia e andrologia, fisioterapia pélvica, sexologia), equipe multiprofissional, grupos de apoio e serviço de apoio (assistência social, nutrição, fisioterapia, saúde mental).</desc>
    <defs><clipPath id="${id}-clip"><circle cx="${C[0]}" cy="${C[1]}" r="86"/></clipPath></defs>
    ${nodes.map((n) => `<line x1="${C[0]}" y1="${C[1]}" x2="${n.x}" y2="${n.y}" stroke="#203060" stroke-width="3" stroke-dasharray="2 8" stroke-linecap="round"/>`).join("")}
    <circle cx="${C[0]}" cy="${C[1]}" r="92" fill="#e6eaf4" stroke="#203060" stroke-width="4"/>
    <image href="assets/img/homem.webp" x="${C[0] - 62}" y="${C[1] - 92}" width="124" height="212" clip-path="url(#${id}-clip)" preserveAspectRatio="xMidYMin slice"/>
    <rect x="${C[0] - 104}" y="${C[1] + 86}" width="208" height="46" rx="10" fill="#203060"/>
    <text x="${C[0]}" y="${C[1] + 106}" text-anchor="middle" fill="#fff" style="font-family:var(--font-display);font-weight:800;font-size:16px">HOMEM COM ESTOMA</text>
    <text x="${C[0]}" y="${C[1] + 124}" text-anchor="middle" fill="#c7d0e6" style="font-family:var(--font-display);font-weight:600;font-size:13px">Protagonista do seu cuidado</text>
    ${nodes.map((n) => `<g>
      <circle cx="${n.x}" cy="${n.y}" r="34" fill="#fff" stroke="#203060" stroke-width="3"/>
      ${ic(n.ic, n.x, n.y)}
      <text x="${n.x}" y="${n.acima ? n.y - 58 : n.y + 52}" text-anchor="middle" fill="#203060" style="font-family:var(--font-display);font-weight:800;font-size:11.5px;letter-spacing:.02em">${n.l[0].toUpperCase()}</text>
      <text x="${n.x}" y="${n.acima ? n.y - 44 : n.y + 66}" text-anchor="middle" fill="#203060" style="font-family:var(--font-display);font-weight:800;font-size:11.5px;letter-spacing:.02em">${n.l[1].toUpperCase()}</text>
      ${(n.sub || []).map((s, i) => `<text x="${n.x}" y="${n.y + 84 + i * 14}" text-anchor="middle" fill="#33405a" style="font-family:var(--font-body);font-size:11px">${s}</text>`).join("")}
    </g>`).join("")}
  </svg>`);
}

export function figRedeCompleta() {
  const ics = ["users", "clipboard", "clock", "shield"];
  return html`<div class="rede-wrap">
    <div class="figure-box">${figRede()}</div>
    <div class="rede-padroes"><p class="rede-h">PADRÕES INTERCOLABORATIVOS</p>
      <ul>${REDE.padroes.map((p, i) => html`<li>${icon(ics[i])}${p}</li>`)}</ul></div>
  </div>`;
}

/* ---------- Apêndice A: síntese ---------- */
const corDe = { P: "p", R: "r", LI: "li", SS: "ss", IT: "it" };
export function figSintese() {
  return html`<article class="sintese">
    <header class="sintese-head"><h2><em>H_Sex_Ostomy</em> na prática</h2><p>Síntese do que fazer em cada etapa do encontro terapêutico</p></header>
    <div class="sintese-body">
      <div class="sintese-pills"><span class="p1">PERMISSÃO · sustenta todas as etapas</span><span class="p2">REVISÃO · início e final de cada encontro</span></div>
      ${S.map((s, i) => html`<div class="sintese-item c-${corDe[s.id]}">
        <span class="sintese-num">${i + 1}</span>
        <div class="sintese-card"><header><h3>${s.nome}</h3><span class="tag">${s.rotulo}</span></header>
          <p>${s.texto}</p><p class="fala-mini">${s.fala.endsWith("?") ? `“${s.fala}”` : s.fala}</p></div>
      </div>`)}
    </div>
  </article>`;
}

/* ---------- Percurso de construção ---------- */
export function figPercurso() {
  return html`<ol class="percurso">${PERC.map(([t, d], i) => html`<li><span class="dot">${i + 1}</span><strong>${t}</strong><span>${d}</span></li>`)}</ol>`;
}
