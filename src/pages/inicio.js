import { html } from "../core/dom.js";
import { icon, compBadge } from "../core/ui.js";
import { componentes } from "../data/programa.js";
import { figPercurso } from "../figures/outras.js";

const cfg = window.HSO_CONFIG || {};

function dataWorkshop() {
  const w = cfg.workshop || {};
  if (!w.data) return null;
  const d = new Date(`${w.data}T${w.horario || "19:00"}:00-03:00`);
  const fmt = d.toLocaleDateString("pt-BR", { day: "numeric", month: "long" });
  return { d, texto: `${fmt}, às ${w.horario || "19:00"} (horário de Brasília)`, futuro: d.getTime() + (w.duracaoMin || 180) * 60000 > Date.now() };
}

export default {
  render() {
    const ws = dataWorkshop();
    return html`<div class="page home">
      <section class="hero">
        <div class="container hero-grid">
          <div class="hero-copy">
            <p class="kicker">Escola de Enfermagem da UFBA · PPGENF</p>
            <h1 tabindex="-1">A sexualidade também faz parte da <span class="hl">reabilitação</span>.</h1>
            <p class="lead">O <span class="wordmark">H<i>_</i><b>Sex</b><i>_</i>Ostomy</span> apoia enfermeiros(as) na abordagem da sexualidade de homens com estomas de eliminação. Estude o programa, use as ferramentas na consulta e forme sua equipe.</p>
            <div class="btn-row">
              <a class="btn btn-primary btn-lg" href="#consulta">Usar na consulta <span class="arrow">${icon("arrow")}</span></a>
              <a class="btn btn-lg" href="#programa">Conhecer o programa</a>
            </div>
            <ul class="hero-facts">
              <li><strong>5</strong><span>componentes do EX-PLISSIT</span></li>
              <li><strong>9</strong><span>diagnósticos com NOC e NIC</span></li>
              <li><strong>17</strong><span>falas prontas para a consulta</span></li>
            </ul>
          </div>
          <div class="hero-art">
            <div class="hero-ring"><img src="assets/img/equipe-grupo.webp" alt="Ilustração do manual: uma enfermeira, um enfermeiro e três homens, um deles com bolsa de estomia." width="760" height="870"></div>
          </div>
        </div>
      </section>

      <section class="container section">
        <div class="quick-grid">
          ${[
            ["consulta", "chat", "Na consulta", "Roteiro passo a passo com falas prontas para pedir Permissão, informar e revisar."],
            ["planejador", "clipboard", "Planejador de cuidados", "Do histórico ao registro: NANDA-I, escala NOC, NIC e evolução pronta."],
            ["manual", "book", "Manual", "Todas as seções, quadros e figuras do manual, com busca."],
            ["aulas", "cap", "Aulas", "Nove unidades curtas com exercícios e feedback imediato."]
          ].map(([href, ic, t, d]) => html`<a class="card card-link quick" href="#${href}"><span class="card-icon">${icon(ic)}</span><h2 class="h3">${t}</h2><p>${d}</p><span class="go">Abrir ${icon("arrow")}</span></a>`)}
        </div>
      </section>

      <section class="container section">
        <div class="section-head"><div><p class="kicker">O programa</p><h2>Cinco componentes, um cuidado contínuo</h2>
          <p>Adaptados do modelo EX-PLISSIT e sustentados pela Teoria de Enfermagem de Reabilitação para o Bem-Viver. Permissão e Revisão acontecem em todo encontro.</p></div>
          <a class="btn" href="#fundamentos">Ver fundamentos</a></div>
        <ol class="comp-strip">
          ${componentes.map((c) => html`<li><a class="comp-tile c-${c.cor}" href="#programa/${c.id}">${compBadge(c)}<strong>${c.nome}</strong><span>${c.rotulo}</span></a></li>`)}
        </ol>
      </section>

      <section class="section band">
        <div class="container split">
          <div>
            <p class="kicker">Da pesquisa à prática</p>
            <h2>Construído com quem cuida</h2>
            <p>O programa nasceu de uma revisão de escopo, de observação participante em um serviço de reabilitação, de um estudo de métodos mistos com homens com estomas e de um processo de cocriação com enfermeiras da reabilitação.</p>
            ${figPercurso()}
          </div>
          <img class="band-art" src="assets/img/homem-enfermeira.webp" alt="Ilustração do manual: um homem com bolsa de estomia ao lado de uma enfermeira" width="760" height="676" loading="lazy">
        </div>
      </section>

      <section class="container section">
        <div class="grid grid-3 uses">
          <article class="card"><span class="card-icon">${icon("book")}</span><h3>Para estudar</h3><p>Leia o manual por seções, explore o fluxograma, os conceitos da teoria e faça as aulas no seu ritmo.</p><a href="#manual">Abrir o manual</a></article>
          <article class="card"><span class="card-icon">${icon("heart")}</span><h3>Para atender</h3><p>Use as falas sugeridas, aplique o IIEF-15 e o QS-M, monte o plano de cuidados e imprima orientações ao paciente.</p><a href="#consulta">Ir para a consulta</a></article>
          <article class="card"><span class="card-icon">${icon("users")}</span><h3>Para formar equipes</h3><p>Conduza oficinas com o roteiro do workshop e planeje a implantação com as diretrizes e indicadores do manual.</p><a href="#implantacao">Planejar a implantação</a></article>
        </div>
      </section>

      ${ws && ws.futuro ? html`<section class="container section">
        <div class="ws-banner">
          <div><p class="kicker kicker-light">Workshop participativo</p><h2>Encontro on-line em ${ws.texto}</h2><p>Fundamentos, demonstração das ferramentas, casos clínicos em grupo e discussão sobre a aplicabilidade do programa.</p></div>
          <a class="btn btn-green btn-lg" href="#workshop">Ver o workshop <span class="arrow">${icon("arrow")}</span></a>
        </div>
      </section>` : ""}
    </div>`;
  }
};
