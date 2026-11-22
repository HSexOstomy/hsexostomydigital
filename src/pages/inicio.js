import { html, raw, esc } from "../core/dom.js";
import { icon, compBadge } from "../core/ui.js";
import { componentes } from "../data/programa.js";
import { figPercurso } from "../figures/outras.js";
import { C, arr, txt } from "../core/content.js";

const cfg = window.HSO_CONFIG || {};

function dataWorkshop() {
  const w = cfg.workshop || {};
  if (!w.data) return null;
  const d = new Date(`${w.data}T${w.horario || "19:00"}:00-03:00`);
  const fmt = d.toLocaleDateString("pt-BR", { day: "numeric", month: "long" });
  return { d, texto: `${fmt}, às ${w.horario || "19:00"} (horário de Brasília)`, futuro: d.getTime() + (w.duracaoMin || 180) * 60000 > Date.now() };
}

/* Textos editáveis em conteudo/inicio.json */
const T = C.inicio || {};
const g = (o, k) => txt(o?.[k]);
/* *palavra* vira destaque; o nome do Programa vira a marca */
const destaque = (s) => raw(esc(s).replace(/\*([^*]+)\*/g, '<span class="hl">$1</span>'));
const marca = (s) => raw(esc(s).replace(/H_Sex_Ostomy/g, '<span class="wordmark">H<i>_</i><b>Sex</b><i>_</i>Ostomy</span>'));

export default {
  render() {
    const ws = dataWorkshop();
    const H = T.hero || {}, A = T.atalhos || {}, PG = T.programa || {}, PQ = T.pesquisa || {}, U = T.usos || {}, WS = T.workshop || {}, AV = T.aviso || {};
    return html`<div class="page home">
      <section class="hero">
        <div class="container hero-grid">
          <div class="hero-copy">
            <p class="kicker">${g(H, "kicker")}</p>
            <h1 tabindex="-1">${destaque(g(H, "titulo"))}</h1>
            <p class="lead">${marca(g(H, "texto"))}</p>
            <div class="btn-row">
              <a class="btn btn-primary btn-lg" href="#consulta">Usar na consulta <span class="arrow">${icon("arrow")}</span></a>
              <a class="btn btn-lg" href="#programa">Conhecer o Programa</a>
            </div>
            <ul class="hero-facts">
              ${arr(H.numeros).filter((n) => n && (n.numero || n.rotulo)).map((n) => html`<li><strong>${txt(n.numero)}</strong><span>${txt(n.rotulo)}</span></li>
              `)}
            </ul>
          </div>
          <div class="hero-art">
            <div class="hero-ring"><img src="assets/img/equipe-grupo.webp" alt="Ilustração do manual: uma enfermeira, um enfermeiro e três homens, um deles com bolsa de estomia." width="1100" height="1255"></div>
          </div>
        </div>
      </section>

      ${g(AV, "titulo") ? html`<section class="container section">
        <div class="ws-banner">
          <div>${g(AV, "kicker") ? html`<p class="kicker kicker-light">${g(AV, "kicker")}</p>` : ""}<h2>${g(AV, "titulo")}</h2>${g(AV, "texto") ? html`<p>${g(AV, "texto")}</p>` : ""}</div>
          ${g(AV, "botaoTexto") && g(AV, "botaoLink") ? (/^https?:/.test(g(AV, "botaoLink").trim())
            ? html`<a class="btn btn-green btn-lg" href="${g(AV, "botaoLink").trim()}" target="_blank" rel="noopener">${g(AV, "botaoTexto")} <span class="arrow">${icon("arrow")}</span></a>`
            : html`<a class="btn btn-green btn-lg" href="${g(AV, "botaoLink").trim()}">${g(AV, "botaoTexto")} <span class="arrow">${icon("arrow")}</span></a>`) : ""}
        </div>
      </section>` : ""}

      <section class="container section">
        <div class="quick-grid">
          ${[
            ["consulta", "chat"], ["planejador", "clipboard"], ["manual", "book"], ["capacitacao", "cap"]
          ].map(([href, ic]) => [href, ic, g(A[href], "titulo"), g(A[href], "texto")]).map(([href, ic, t, d]) => html`<a class="card card-link quick" href="#${href}"><span class="card-icon">${icon(ic)}</span><h2 class="h3">${t}</h2><p>${d}</p><span class="go">Abrir ${icon("arrow")}</span></a>`)}
        </div>
      </section>

      <section class="container section">
        <div class="section-head"><div><p class="kicker">${g(PG, "kicker")}</p><h2>${g(PG, "titulo")}</h2>
          <p>${g(PG, "texto")}</p></div>
          <a class="btn" href="#fundamentos">Ver fundamentos</a></div>
        <ol class="comp-strip">
          ${componentes.map((c) => html`<li><a class="comp-tile c-${c.cor}" href="#programa/${c.id}">${compBadge(c)}<strong>${c.nome}</strong><span>${c.rotulo}</span></a></li>`)}
        </ol>
      </section>

      <section class="section band">
        <div class="container">
          <div class="split band-top">
            <div>
              <p class="kicker">${g(PQ, "kicker")}</p>
              <h2>${g(PQ, "titulo")}</h2>
              <p>${g(PQ, "texto")}</p>
            </div>
            <img class="band-art" src="assets/img/homem-enfermeira.webp" alt="Ilustração do manual: um homem com bolsa de estomia ao lado de uma enfermeira" width="1200" height="1066" loading="lazy">
          </div>
          ${figPercurso()}
        </div>
      </section>

      <section class="container section">
        <div class="grid grid-3 uses">
          <article class="card"><span class="card-icon">${icon("book")}</span><h3>${g(U.estudar, "titulo")}</h3><p>${g(U.estudar, "texto")}</p><a href="#manual">${g(U.estudar, "link")}</a></article>
          <article class="card"><span class="card-icon">${icon("heart")}</span><h3>${g(U.atender, "titulo")}</h3><p>${g(U.atender, "texto")}</p><a href="#consulta">${g(U.atender, "link")}</a></article>
          <article class="card"><span class="card-icon">${icon("users")}</span><h3>${g(U.formar, "titulo")}</h3><p>${g(U.formar, "texto")}</p><a href="#implantacao">${g(U.formar, "link")}</a></article>
        </div>
      </section>

      ${ws && ws.futuro ? html`<section class="container section">
        <div class="ws-banner">
          <div><p class="kicker kicker-light">${g(WS, "kicker")}</p><h2>Encontro on-line em ${ws.texto}</h2><p>${g(WS, "texto")}</p></div>
          <a class="btn btn-green btn-lg" href="#workshop">Ver o workshop <span class="arrow">${icon("arrow")}</span></a>
        </div>
      </section>` : ""}
    </div>`;
  }
};
