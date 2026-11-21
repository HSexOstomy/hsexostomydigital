import { html, $, on } from "../core/dom.js";
import { icon, compBadge } from "../core/ui.js";
import { slides, agenda, discussao } from "../data/workshop.js";
import { componentes } from "../data/programa.js";
import { quadro2 } from "../data/quadros.js";
import { figura } from "../figures/index.js";
import { figPercurso } from "../figures/outras.js";
import { horarios, hhmm, qrSvg, urlPublica } from "./workshop.js";
import { session } from "../core/store.js";

const cfg = window.HSO_CONFIG || {};
const W = cfg.workshop || {};
let notas = session.read("ws-notas", true);
let timer = null;

function slide(s, n) {
  const k = s.kicker ? html`<p class="sl-kicker">${s.kicker}</p>` : "";
  switch (s.tipo) {
    case "capa": return html`<div class="sl sl-capa">
      <div><p class="sl-kicker">${s.kicker}</p><h1 class="sl-word"><span class="wordmark">H<i>_</i><b>Sex</b><i>_</i>Ostomy</span></h1><p class="sl-sub">${s.sub}</p>
      <p class="sl-meta">${W.data ? new Date(`${W.data}T12:00:00-03:00`).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" }) : ""} · ${W.modalidade || ""}</p>
      <div class="sl-logos">${(cfg.instituicoes || []).map((i) => html`<img src="${i.logo}" alt="${i.nome}">`)}</div></div>
      <img class="sl-art" src="assets/img/equipe-grupo.webp" alt=""></div>`;
    case "pontos": return html`<div class="sl sl-pontos">${k}<h2>${s.titulo}</h2><ul>${s.pontos.map((p) => html`<li>${p}</li>`)}</ul>${s.rota ? html`<a class="sl-demo" href="#${s.rota}" target="_blank" rel="noopener">${icon("external")}Demonstrar no site</a>` : ""}</div>`;
    case "percurso": return html`<div class="sl sl-percurso">${k}<h2>${s.titulo}</h2>${figPercurso()}${s.texto ? html`<p class="sl-note">${s.texto}</p>` : ""}</div>`;
    case "citacao": return html`<div class="sl sl-citacao">${k}<blockquote><p>${s.titulo}</p><cite>${s.fonte}</cite></blockquote></div>`;
    case "figura": return html`<div class="sl sl-figura sl-fig-${s.fig}">${k}<h2>${s.titulo}</h2><div class="sl-figbox">${figura(s.fig, { legenda: false, lang: "pt" })}</div>${s.rota ? html`<a class="sl-demo" href="#${s.rota}" target="_blank" rel="noopener">${icon("external")}Abrir interativo</a>` : ""}</div>`;
    case "componentes": return html`<div class="sl sl-comp">${k}<h2>${s.titulo}</h2><div class="sl-comp-grid">${componentes.map((c) => html`<div class="sl-comp-card c-${c.cor}">${compBadge(c)}<h3>${c.nome}</h3><span>${c.rotulo}</span><p>${c.acao}</p></div>`)}</div></div>`;
    case "temas": return html`<div class="sl sl-temas">${k}<h2>${s.titulo}</h2><div class="sl-temas-grid">${quadro2.map((t, i) => html`<div class="sl-tema"><span>${i + 1}</span><h3>${t.tema}</h3><p>“${t.falas[0][1].length > 150 ? t.falas[0][1].slice(0, 148).replace(/\s\S*$/, "") + "…" : t.falas[0][1]}”</p></div>`)}</div></div>`;
    case "qr": return html`<div class="sl sl-qr"><div>${k}<h2>${s.titulo}</h2><p class="sl-texto">${s.texto}</p><p class="sl-url">${urlPublica(s.rota).replace(/^https?:\/\//, "")}</p></div><div class="sl-qrimg">${qrSvg(urlPublica(s.rota), 360)}</div></div>`;
    case "pausa": return html`<div class="sl sl-pausa"><h2>${s.titulo}</h2><p class="sl-texto">${s.texto}</p><div class="sl-countdown" data-countdown="600">10:00</div><button class="btn btn-light" data-start-count>${icon("play")}Iniciar contagem</button></div>`;
    case "discussao": return html`<div class="sl sl-disc">${k}<h2>${s.titulo}</h2><div class="sl-disc-grid">${discussao.map((d, i) => html`<div class="sl-eixo"><span>${i + 1}</span><h3>${d.eixo}</h3><p>${d.pergunta}</p></div>`)}</div></div>`;
    case "encerramento": return html`<div class="sl sl-fim"><div><h2>${s.titulo}</h2><p class="sl-texto">${s.texto}</p>${W.linkPosTeste ? "" : html`<p class="sl-note">O link do pós-teste será enviado no chat.</p>`}<p class="sl-note">Contato: ${cfg.contato?.email || ""}</p></div>${W.linkPosTeste ? html`<div class="sl-qrimg">${qrSvg(W.linkPosTeste, 320)}<p class="sl-url">Pós-teste</p></div>` : html`<img class="sl-art" src="assets/img/homem-enfermeira.webp" alt="">`}</div>`;
  }
  return "";
}

function tela(n) {
  const s = slides[n - 1], blocos = horarios(), b = blocos.find((x) => x.id === s.bloco) || blocos[0] || { titulo: "", ini: 0, min: 0 }, bi = blocos.indexOf(b);
  return html`<div class="present"><h1 class="sr-only">Apresentação do workshop, slide ${n} de ${slides.length}: ${s.titulo || ""}</h1>
    <header class="pr-bar">
      <a class="pr-exit" href="#workshop" aria-label="Sair da apresentação">${icon("x")}</a>
      <span class="pr-block"><strong>${bi + 1}. ${b.titulo}</strong><span>${hhmm(b.ini)} · ${b.min} min</span></span>
      <button class="pr-timer" data-pr-reset title="Clique para zerar o cronômetro"><span id="pr-elapsed">00:00</span><small>decorrido</small></button>
      <span class="pr-count">${n} / ${slides.length}</span>
      <button class="pr-btn" data-pr-notes aria-pressed="${notas}" title="Notas do apresentador (N)">${icon("list")}<span>Notas</span></button>
      <button class="pr-btn" data-pr-full title="Tela cheia (F)">${icon("expand")}<span>Tela cheia</span></button>
    </header>
    <div class="pr-stage"><section class="pr-slide" aria-roledescription="slide" aria-label="Slide ${n} de ${slides.length}">${slide(s, n)}</section></div>
    <div class="pr-progress" aria-hidden="true">${agenda.map((a) => html`<span class="${a.id === s.bloco ? "is-on" : ""}" style="flex:${a.min}" title="${a.titulo}"></span>`)}</div>
    <footer class="pr-foot">
      <a class="pr-nav" href="#apresentar/${Math.max(1, n - 1)}" aria-disabled="${n === 1}">${icon("back")}Anterior</a>
      <div class="pr-notes" ${notas ? "" : "hidden"}><strong>Notas:</strong> ${s.notas || "—"}</div>
      <a class="pr-nav pr-next" href="#apresentar/${Math.min(slides.length, n + 1)}" aria-disabled="${n === slides.length}">Próximo${icon("arrow")}</a>
    </footer>
  </div>`;
}

export default {
  title: (ctx) => `Apresentação ${ctx.params[0] || 1}`,
  render(ctx) {
    const n = Math.min(slides.length, Math.max(1, Number(ctx.params[0]) || 1));
    return tela(n);
  },
  mount(root, ctx) {
    const n = Math.min(slides.length, Math.max(1, Number(ctx.params[0]) || 1));
    let inicio = session.read("ws-inicio", null);
    if (!inicio) { inicio = Date.now(); session.write("ws-inicio", inicio); }
    const fmt = (s) => { const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = s % 60; const p = (v) => String(v).padStart(2, "0"); return h ? `${h}:${p(m)}:${p(x)}` : `${p(m)}:${p(x)}`; };
    const tick = () => { const el = $("#pr-elapsed", root); if (el) el.textContent = fmt(Math.floor((Date.now() - inicio) / 1000)); };
    tick(); clearInterval(timer); timer = setInterval(tick, 1000);
    let count = null;
    const go = (d) => { const m = Math.min(slides.length, Math.max(1, n + d)); if (m !== n) location.hash = `#apresentar/${m}`; };
    const key = (ev) => {
      if (ev.target.closest("input, textarea, select")) return;
      if (["ArrowRight", "PageDown", " "].includes(ev.key)) { ev.preventDefault(); go(1); }
      else if (["ArrowLeft", "PageUp"].includes(ev.key)) { ev.preventDefault(); go(-1); }
      else if (ev.key === "Home") location.hash = "#apresentar/1";
      else if (ev.key === "End") location.hash = `#apresentar/${slides.length}`;
      else if (ev.key.toLowerCase() === "n") toggleNotas();
      else if (ev.key.toLowerCase() === "f") full();
      else if (ev.key === "Escape" && !document.fullscreenElement) location.hash = "#workshop";
    };
    const toggleNotas = () => { notas = !notas; session.write("ws-notas", notas); $(".pr-notes", root).hidden = !notas; $("[data-pr-notes]", root).setAttribute("aria-pressed", String(notas)); };
    const full = () => { if (!document.fullscreenElement) document.documentElement.requestFullscreen?.(); else document.exitFullscreen?.(); };
    document.addEventListener("keydown", key);
    const offs = [
      on(root, "click", "[data-pr-notes]", toggleNotas),
      on(root, "click", "[data-pr-full]", full),
      on(root, "click", "[data-pr-reset]", () => { if (confirm("Zerar o cronômetro do workshop?")) { inicio = Date.now(); session.write("ws-inicio", inicio); tick(); } }),
      on(root, "click", "[data-start-count]", (ev, b) => {
        const el = $("[data-countdown]", root); let left = Number(el.dataset.countdown); b.disabled = true;
        clearInterval(count); count = setInterval(() => { left--; el.textContent = `${String(Math.floor(left / 60)).padStart(2, "0")}:${String(left % 60).padStart(2, "0")}`; if (left <= 0) { clearInterval(count); el.classList.add("is-done"); } }, 1000);
      }),
      on(root, "click", ".pr-stage", (ev) => { if (!ev.target.closest("a, button, .fig-hot")) go(ev.clientX > window.innerWidth * 0.5 ? 1 : -1); })
    ];
    return () => { document.removeEventListener("keydown", key); offs.forEach((f) => f()); clearInterval(timer); clearInterval(count); };
  }
};
