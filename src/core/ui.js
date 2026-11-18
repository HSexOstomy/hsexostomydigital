/* Componentes de interface compartilhados */
import { html, raw, esc } from "./dom.js";

export const ICONS = {
  copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  back: '<path d="M19 12H5M11 18l-6-6 6-6"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  print: '<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="9" rx="2"/><path d="M6 14h12v7H6z"/>',
  book: '<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 21.5V4.5"/>',
  chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.4A8 8 0 1 1 21 12z"/>',
  calc: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h8"/>',
  clipboard: '<rect x="6" y="4" width="12" height="18" rx="2"/><path d="M9 4V2h6v2M9 10h6M9 14h6M9 18h4"/>',
  network: '<circle cx="12" cy="12" r="3"/><circle cx="4" cy="5" r="2"/><circle cx="20" cy="5" r="2"/><circle cx="4" cy="19" r="2"/><circle cx="20" cy="19" r="2"/><path d="m6 6 4 4M18 6l-4 4M6 18l4-4M18 18l-4-4"/>',
  chart: '<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/>',
  cap: '<path d="M22 9 12 4 2 9l10 5 10-5z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/>',
  cases: '<circle cx="12" cy="7" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  flow: '<rect x="8" y="2" width="8" height="5" rx="1"/><rect x="8" y="17" width="8" height="5" rx="1"/><path d="M12 7v3M12 14v3M7 12h10"/><path d="m12 10 2 2-2 2-2-2z"/>',
  spark: '<path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  alert: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
  bulb: '<path d="M9 18h6M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/>',
  users: '<circle cx="9" cy="7" r="4"/><path d="M2 21a7 7 0 0 1 14 0"/><path d="M16 3.1a4 4 0 0 1 0 7.8M22 21a7 7 0 0 0-5-6.7"/>',
  play: '<path d="M6 4l14 8-14 8z"/>',
  phone: '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  external: '<path d="M14 3h7v7M10 14 21 3M21 14v7H3V3h7"/>',
  trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>',
  download: '<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  expand: '<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>'
};

export function icon(name, cls = "") {
  return raw(`<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name] || ""}</svg>`);
}

let toastTimer;
export function toast(msg) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("is-on");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("is-on"), 2600);
}

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); } catch { /* sem suporte */ }
    ta.remove();
  }
  toast("Texto copiado");
}

/* Cabeçalho de página padrão */
export function pageHead({ kicker, title, lead, crumbs = [], actions = "", art = "" }) {
  return html`<header class="page-head ${art ? "has-art" : ""}">
    ${art ? html`<img class="head-art" src="assets/img/${art}.webp" alt="" loading="lazy" decoding="async">` : ""}
    <div class="container">
      ${crumbs.length ? html`<nav aria-label="Você está em"><ol class="breadcrumb"><li><a href="#inicio">Início</a></li>${crumbs.map(([href, label]) => href ? html`<li><a href="#${href}">${label}</a></li>` : html`<li aria-current="page">${label}</li>`)}</ol></nav>` : ""}
      ${kicker ? html`<p class="kicker">${kicker}</p>` : ""}
      <h1 tabindex="-1">${title}</h1>
      ${lead ? html`<p class="lead">${lead}</p>` : ""}
      ${actions ? html`<div class="head-actions">${actions}</div>` : ""}
    </div>
  </header>`;
}

export function callout(tipo, titulo, corpo) {
  const ic = { nota: "alert", teoria: "bulb", info: "info", alerta: "alert", ok: "check", manual: "book" }[tipo] || "info";
  return html`<div class="callout callout-${tipo}" role="note"><p class="callout-title">${icon(ic)}${titulo}</p>${corpo}</div>`;
}

export function fala(rotulo, texto, cor = "", nota = "") {
  return html`<figure class="fala ${cor ? "c-" + cor : ""}">
    <div class="fala-head"><figcaption class="fala-label">${rotulo}</figcaption>
      <button type="button" class="copy-btn" data-copy="${texto}" aria-label="Copiar fala: ${rotulo}">${icon("copy")}Copiar</button></div>
    <blockquote>${texto}</blockquote>
    ${nota ? html`<p class="fala-note">${nota}</p>` : ""}
  </figure>`;
}

export function compBadge(c) {
  return html`<span class="comp-badge c-${c.cor}" aria-hidden="true">${c.sigla}</span>`;
}

export function tagPage(p) { return html`<span class="tag tag-page">${p.includes("–") ? "pp." : "p."} ${p}</span>`; }

export const plural = (n, s, p) => `${n} ${n === 1 ? s : p}`;
export { esc };
