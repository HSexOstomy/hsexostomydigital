/* Ponto de entrada da plataforma H_Sex_Ostomy Digital */
import { navigate, closeMenus } from "./core/router.js";
import { $, $$, on, html } from "./core/dom.js";
import { copyText } from "./core/ui.js";

const cfg = window.HSO_CONFIG || {};

/* ---------- Navegação principal (desktop e celular) ---------- */
function setupNav() {
  const nav = $(".main-nav");
  const toggle = $("#menu-toggle");

  on(document, "click", "[data-menu]", (ev, btn) => {
    ev.stopPropagation();
    const open = btn.getAttribute("aria-expanded") === "true";
    $$("[data-menu]").forEach((b) => { if (b !== btn) b.setAttribute("aria-expanded", "false"); });
    btn.setAttribute("aria-expanded", String(!open));
  });

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("is-open", !open);
    document.body.classList.toggle("nav-open", !open);
  });

  document.addEventListener("click", (ev) => {
    if (!ev.target.closest(".main-nav") && !ev.target.closest("#menu-toggle")) {
      $$("[data-menu]").forEach((b) => b.setAttribute("aria-expanded", "false"));
    }
  });

  document.addEventListener("keydown", (ev) => {
    if (ev.key !== "Escape") return;
    const openBtn = $$("[data-menu]").find((b) => b.getAttribute("aria-expanded") === "true");
    if (openBtn) { openBtn.setAttribute("aria-expanded", "false"); openBtn.focus(); return; }
    if (nav.classList.contains("is-open")) { closeMenus(); toggle.focus(); }
  });

  /* Setas dentro dos submenus */
  nav.addEventListener("keydown", (ev) => {
    if (!["ArrowDown", "ArrowUp"].includes(ev.key)) return;
    const menu = ev.target.closest(".nav-item")?.querySelector(".nav-menu");
    if (!menu) return;
    const trigger = ev.target.closest(".nav-item").querySelector("[data-menu]");
    const links = $$("a", menu);
    if (ev.target === trigger) { trigger.setAttribute("aria-expanded", "true"); links[0]?.focus(); ev.preventDefault(); return; }
    const i = links.indexOf(ev.target);
    if (i < 0) return;
    ev.preventDefault();
    const next = ev.key === "ArrowDown" ? links[i + 1] || links[0] : links[i - 1] || trigger;
    next.focus();
  });
}

/* ---------- Ações globais ---------- */
function setupGlobal() {
  on(document, "click", "[data-copy]", (ev, el) => { ev.preventDefault(); copyText(el.dataset.copy); });
  on(document, "click", "[data-print]", (ev) => { ev.preventDefault(); window.print(); });
  on(document, "click", ".main-nav a", () => closeMenus());
  /* O link "pular para o conteúdo" não pode alterar o hash, que é usado pelo roteador */
  on(document, "click", ".skip-link", (ev) => {
    ev.preventDefault();
    const target = $("#app h1") || $("#conteudo");
    target.setAttribute("tabindex", "-1");
    target.focus();
  });
  /* Rolagem para âncoras internas sem alterar a rota */
  on(document, "click", "[data-scroll]", (ev, el) => {
    ev.preventDefault();
    const t = document.getElementById(el.dataset.scroll);
    if (t) { t.scrollIntoView({ behavior: "smooth", block: "start" }); t.setAttribute("tabindex", "-1"); t.focus({ preventScroll: true }); }
  });
}

/* ---------- Rodapé a partir da configuração ---------- */
function setupFooter() {
  const logos = $("#footer-logos");
  if (logos && Array.isArray(cfg.instituicoes)) {
    logos.innerHTML = String(html`${cfg.instituicoes.map((i) => i.url
      ? html`<a href="${i.url}" target="_blank" rel="noopener" title="${i.nome}"><img src="${i.logo}" alt="${i.nome}" loading="lazy"></a>`
      : html`<span title="${i.nome}"><img src="${i.logo}" alt="${i.nome}" loading="lazy"></span>`)}`);
  }
  const v = $("#footer-version");
  if (v && cfg.versao) v.textContent = "Versão " + cfg.versao;
}

setupNav();
setupGlobal();
setupFooter();
window.addEventListener("hashchange", navigate);
navigate();

