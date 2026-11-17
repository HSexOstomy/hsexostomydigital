import { html } from "../core/dom.js";
import { pageHead, icon } from "../core/ui.js";
import { identidade, apresentacao, fichaTecnica } from "../data/programa.js";
import { figPercurso } from "../figures/outras.js";

const cfg = window.HSO_CONFIG || {};

function sobre() {
  return html`<div class="page">
    ${pageHead({ kicker: "Sobre", title: "O que é o H_Sex_Ostomy", lead: "Um programa de saúde para apoiar enfermeiros(as) na abordagem da sexualidade e no cuidado à saúde sexual de homens com estomas de eliminação, ao longo da reabilitação.", crumbs: [[null, "O projeto"]] })}
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

function equipe() {
  const autores = cfg.autores || [];
  return html`<div class="page">
    ${pageHead({ kicker: "Sobre", title: "Equipe e ficha técnica", lead: "Autoria, orientação e instituições envolvidas no desenvolvimento do H_Sex_Ostomy.", crumbs: [["sobre", "Sobre"], [null, "Equipe"]] })}
    <div class="container">
      <div class="grid grid-2">
        ${autores.map((a) => html`<article class="card person">
          ${a.foto ? html`<img class="person-photo" src="${a.foto}" alt="Fotografia de ${a.nome}" loading="lazy">` : html`<span class="person-initials" aria-hidden="true">${a.nome.split(" ").filter((p) => p.length > 2).slice(0, 2).map((p) => p[0]).join("")}</span>`}
          <div><p class="kicker">${a.papel}</p><h2 class="h3">${a.nome}</h2><p class="muted">${a.titulacao}</p><p>${a.bio}</p></div>
        </article>`)}
      </div>

      <section class="section">
        <h2>Ficha técnica do manual</h2>
        <dl class="ficha">${fichaTecnica.map(([k, v]) => html`<div><dt>${k}</dt><dd>${v}</dd></div>`)}</dl>
      </section>

      <section class="section">
        <h2>Instituições</h2>
        <div class="inst-grid">${(cfg.instituicoes || []).map((i) => html`<div class="card inst"><img src="${i.logo}" alt="" loading="lazy"><p>${i.url ? html`<a href="${i.url}" target="_blank" rel="noopener">${i.nome}</a>` : i.nome}</p></div>`)}</div>
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
      <article class="card"><h2 class="h3">Questões éticas da pesquisa</h2><p>Comitê de Ética em Pesquisa da Escola de Enfermagem da UFBA (CEP/EEUFBA): (71) 3283-7615, <a href="mailto:cepee.ufba@ufba.br">cepee.ufba@ufba.br</a>.</p></article>
      <article class="card"><h2 class="h3">Sobre seus dados</h2><p>Este site não coleta nem envia informações. O que você digita nas ferramentas fica apenas no seu navegador e é apagado ao fechar a aba. Não registre dados que identifiquem pacientes.</p></article>
    </div>
  </div>`;
}

export default {
  render(ctx) { return ctx.name === "equipe" ? equipe() : ctx.name === "contato" ? contato() : sobre(); }
};
