import { html } from "../core/dom.js";
import { pageHead, icon } from "../core/ui.js";
import { identidade, apresentacao, fichaTecnica } from "../data/programa.js";
import { figPercurso } from "../figures/outras.js";
import { C, txt } from "../core/content.js";

const cfg = window.HSO_CONFIG || {};

function sobre() {
  return html`<div class="page">
    ${pageHead({ kicker: "Sobre", title: "O que é o H_Sex_Ostomy", lead: txt(C.sobre.lead), crumbs: [[null, "O projeto"]], art: "enfermeiros-dupla" })}
    <div class="container">
      <div class="about-grid">
        <div class="prose">
          <h2>Apresentação</h2>
          ${apresentacao.map((p) => html`<p>${p}</p>`)}
          <p class="small muted">Manual, pp. 8–9.</p>
        </div>
        <aside class="about-aside">
          <img src="assets/img/capa.webp" alt="Capa do manual H_Sex_Ostomy: Programa de Reabilitação da Sexualidade Masculina" width="900" height="1273" loading="lazy">
          <a class="btn btn-primary" href="#manual">${icon("book")}Ler o manual</a>
        </aside>
      </div>

      <section class="section"><p class="kicker">Percurso</p><h2>Da pesquisa à prática</h2>${figPercurso()}</section>

      <section class="section">
        <div class="grid grid-3 identity">
          <article class="card id-card"><p class="kicker">Finalidade</p><p>${identidade.finalidade}</p></article>
          <article class="card id-card"><p class="kicker">Missão</p><p>${identidade.missao}</p></article>
          <article class="card id-card"><p class="kicker">Visão</p><p>${identidade.visao}</p></article>
        </div>
      </section>

      <section class="section">
        <div class="section-head"><div><p class="kicker">Valores</p><h2>O que orienta cada encontro</h2></div></div>
        <div class="values">${identidade.valores.map(([t, d], i) => html`<article class="value"><span class="value-n">${String(i + 1).padStart(2, "0")}</span><h3>${t}</h3><p>${d}</p></article>`)}</div>
      </section>

      <section class="section">
        <div class="section-head"><div><p class="kicker">Público-alvo</p><h2>Para quem é o programa</h2></div></div>
        <div class="grid grid-2">${identidade.publico.map(([t, d], i) => html`<article class="card public-card"><span class="card-icon">${icon(i ? "heart" : "users")}</span><h3>${t}</h3><p>${d}</p></article>`)}</div>
      </section>
    </div>
  </div>`;
}

const inst = (i) => html`<div class="card inst">${i.logo ? html`<img src="${i.logo}" alt="" loading="lazy">` : html`<span class="inst-text">${i.nome.split(",")[0]}</span>`}<p>${i.url ? html`<a href="${i.url}" target="_blank" rel="noopener">${i.nome}</a>` : i.nome}</p></div>`;

/* Iniciais quando não há foto: primeiro e último nome */
function iniciais(nome) {
  const p = nome.split(" ").filter((x) => x.length > 2);
  const q = p.length ? p : nome.split(" ").filter(Boolean);
  return (q[0]?.[0] || "") + (q.length > 1 ? q[q.length - 1][0] : q[0]?.[0] || "");
}

/* Enquadramento da foto dentro do círculo (a foto é sempre recortada em círculo, de qualquer tamanho) */
const POS = { alto: "50% 15%", baixo: "50% 85%" };

const card = (a, nivel = 2) => html`<article class="card person">
          ${a.foto ? (POS[a.enquadramento] ? html`<img class="person-photo" src="${a.foto}" alt="Fotografia de ${a.nome}" loading="lazy" style="object-position:${POS[a.enquadramento]}">` : html`<img class="person-photo" src="${a.foto}" alt="Fotografia de ${a.nome}" loading="lazy">`) : html`<span class="person-initials" aria-hidden="true">${iniciais(a.nome)}</span>`}
          <div><p class="kicker">${a.papel}</p>${nivel === 3 ? html`<h3>${a.nome}</h3>` : html`<h2 class="h3">${a.nome}</h2>`}<p class="muted">${a.titulacao}</p><p>${a.bio}</p>${a.link ? html`<p class="small"><a href="${a.link}" target="_blank" rel="noopener">Currículo e contato</a></p>` : ""}</div>
        </article>`;

/* Bolsistas e colaboradores(as) só aparecem quando cadastrados no painel */
const grupo = (titulo, lista) => lista.length ? html`<section class="section">
        <h2>${titulo}</h2>
        <div class="grid grid-3 people">${lista.map((a) => card(a, 3))}</div>
      </section>` : "";

function equipe() {
  const autores = cfg.autores || [];
  return html`<div class="page">
    ${pageHead({ kicker: "Sobre", title: "Equipe e ficha técnica", lead: "Autoria, orientação e instituições envolvidas no desenvolvimento do H_Sex_Ostomy.", crumbs: [["sobre", "Sobre"], [null, "Equipe"]] })}
    <div class="container">
      <div class="grid grid-3 people">
        ${autores.map((a) => card(a))}
      </div>
      ${grupo("Bolsistas", cfg.bolsistas || [])}
      ${grupo("Colaboradores(as)", cfg.colaboradores || [])}

      <section class="section">
        <h2>Ficha técnica do manual</h2>
        <dl class="ficha">${fichaTecnica.map(([k, v]) => html`<div><dt>${k}</dt><dd>${v}</dd></div>`)}</dl>
      </section>

      <section class="section">
        <h2>Instituições</h2>
        <div class="inst-grid">${(cfg.instituicoes || []).map(inst)}</div>
      </section>
      <section class="section">
        <h2>Apoio</h2>
        <div class="inst-grid">${(cfg.apoio || []).map(inst)}</div>
        <p class="small muted">As marcas identificam vínculos acadêmicos e não implicam endosso institucional da plataforma.</p>
      </section>
    </div>
  </div>`;
}

function contato() {
  const email = cfg.contato?.email;
  return html`<div class="page">
    ${pageHead({ kicker: "Sobre", title: "Contato", lead: "Dúvidas, sugestões e propostas de parceria para implantação ou pesquisa.", crumbs: [["sobre", "Sobre"], [null, "Contato"]] })}
    <div class="container-narrow stack">
      ${email ? html`<article class="card contact-card"><span class="card-icon">${icon("chat")}</span><div><h2 class="h3">Fale com a pesquisadora</h2><p>Escreva para <a href="mailto:${email}">${email}</a>.</p></div></article>` : ""}
      <article class="card"><h2 class="h3">Questões éticas da pesquisa</h2><p>Comitê de Ética em Pesquisa da Escola de Enfermagem da UFBA (CEP/EEUFBA): ${cfg.contato?.cepTelefone}, <a href="mailto:${cfg.contato?.cepEmail}">${cfg.contato?.cepEmail}</a>.</p></article>
      <article class="card"><h2 class="h3">Sobre seus dados</h2><p>Este site não coleta nem envia informações. O que você digita nas ferramentas fica apenas no seu navegador e é apagado ao fechar a aba. Não registre dados que identifiquem pacientes.</p></article>
    </div>
  </div>`;
}

export default {
  render(ctx) { return ctx.name === "equipe" ? equipe() : ctx.name === "contato" ? contato() : sobre(); }
};
