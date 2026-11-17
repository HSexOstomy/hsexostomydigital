import { html, $, on } from "../core/dom.js";
import { pageHead, icon, callout, fala } from "../core/ui.js";
import { permissao, revisao, quadro5 } from "../data/quadros.js";
import { historico } from "../data/cuidado.js";
import { figPermissao, figRevisao } from "../figures/outras.js";
import { objetivoMeta, quadro2Tabs, terapia, ligarAbas } from "./blocos.js";

const ETAPAS = [
  { id: "preparar", nome: "Preparar", cor: "", sub: "Ambiente e postura" },
  { id: "permissao", nome: "Permissão", cor: "p", sub: "Abrir a conversa" },
  { id: "revisao", nome: "Revisão", cor: "r", sub: "Retomar e acompanhar" },
  { id: "informacao", nome: "Informação Limitada", cor: "li", sub: "Temas e falas" },
  { id: "sugestoes", nome: "Sugestões Específicas", cor: "ss", sub: "Avaliar e planejar" },
  { id: "terapia", nome: "Terapia Intensiva", cor: "it", sub: "Encaminhar" }
];

const registroRecusa = "Ofertada abordagem sobre sexualidade e saúde sexual, conforme programa H_Sex_Ostomy. Usuário optou por não conversar sobre o tema neste momento. Decisão acolhida sem julgamento; seguido o atendimento clínico. Orientado sobre a disponibilidade da equipe para retomar o tema em consultas futuras.";

const preparo = [
  "Ambiente privativo, acolhedor e acessível, com privacidade visual e auditiva",
  "Se houver acompanhante, perguntar ao homem se deseja que permaneça",
  "No teleatendimento: plataforma segura e local reservado para ambos",
  "Instrumentos à mão, se pertinentes: IIEF-15 e QS-M",
  "Revisar registros anteriores: o que já foi conversado e combinado"
];
const singularidades = [
  "Respeitar vontade, autonomia, intimidade, limites e tempo da pessoa",
  "Observar sinais verbais e não verbais de abertura, desconforto ou sofrimento",
  "Ajustar a profundidade conforme abertura e interesse, com permissão contínua",
  "Não presumir orientação sexual, monogamia ou um único modelo de masculinidade",
  "Lembrar que a pessoa pode aprofundar, interromper e retomar quando quiser"
];

const checklist = (itens, id) => html`<ul class="check-list">${itens.map((t, i) => html`<li><label class="check"><input type="checkbox" data-check="${id}-${i}"><span>${t}</span></label></li>`)}</ul>`;

function conteudo(id) {
  switch (id) {
    case "preparar": return html`
      <div class="grid grid-2">
        <section class="card"><h3>${icon("shield")}Antes de começar</h3>${checklist(preparo, "prep")}</section>
        <section class="card"><h3>${icon("heart")}Singularidades (7.4)</h3>${checklist(singularidades, "sing")}</section>
      </div>
      <div class="grid grid-2" style="margin-top:var(--sp-5)">
        ${callout("info", "Quando abordar", html`<p>Introduza o tema de forma gradual já na <strong>primeira consulta</strong> após a admissão e mantenha-o como componente longitudinal, <strong>no mínimo a cada três meses</strong>. Teleatendimentos intermediários podem ser ofertados quando você ou o homem identificarem necessidade.</p>`)}
        ${callout("nota", "Demandas tardias são esperadas", html`<p>Muitas questões surgem só quando o homem retoma a vida afetiva e sexual. Prioridades cirúrgicas, medo pela sobrevivência, letramento em saúde sexual e saúde mental podem adiar a conversa.</p>`)}
      </div>`;
    case "permissao": return html`
      ${objetivoMeta("permissao")}
      ${figPermissao()}
      <section class="section-sm"><h3>Fala para Sugestões Específicas (Quadro 5)</h3>${fala("Pedir permissão para aprofundar", quadro5.fala, "ss")}<p class="small muted">${quadro5.nota}</p></section>
      <section class="section-sm"><h3>Se ele não quiser conversar</h3>
        ${callout("nota", "Acolha e registre", html`<p>${permissao.recusa}</p>`)}
        <div style="margin-top:var(--sp-3)">${fala("Modelo de registro em prontuário", registroRecusa, "p")}</div>
      </section>`;
    case "revisao": return html`
      ${objetivoMeta("revisao")}
      ${figRevisao()}
      <section class="section-sm"><h3>Perguntas de acompanhamento (p. 58)</h3>
        <div class="grid grid-3">${["Houve mudança? Por quê?", "Persistem dúvidas? Por quê?", "Novas preocupações? Por quê?"].map((t) => html`<div class="card card-tint"><p style="margin:0;font-weight:600">${t}</p></div>`)}</div>
        <p class="small muted" style="margin-top:.6rem">Use os resultados NOC registrados no Planejador para evidenciar a evolução entre as consultas.</p>
      </section>`;
    case "informacao": return html`
      ${objetivoMeta("informacao")}
      ${callout("nota", "Selecione, não despeje", html`<p>Em uma mesma consulta não é preciso abordar todos os temas. Escolha o que faz sentido para a pessoa naquele momento. Considere mitos, tabus, linguagem e letramento. Na dúvida, cuidadosamente pergunte!</p>`)}
      <div style="margin-top:var(--sp-5)">${quadro2Tabs("cq2")}</div>
      <div class="btn-row" style="margin-top:var(--sp-4)"><a class="btn btn-primary" href="#orientacoes">${icon("print")}Orientações para entregar ao paciente</a><a class="btn" href="#orientacoes/disfuncoes">Disfunções por tipo de cirurgia</a></div>`;
    case "sugestoes": return html`
      ${objetivoMeta("sugestoes")}
      <div class="grid grid-2">
        <section class="card"><h3>${icon("clipboard")}Histórico clínico</h3><ul class="small">${historico.clinico.map((h) => html`<li>${h.rotulo}</li>`)}</ul>
          ${callout("alerta", "Medicações", html`<p class="small">Verifique anti-hipertensivos, antidepressivos e opioides como possíveis causas iatrogênicas de disfunção sexual.</p>`)}</section>
        <section class="card"><h3>${icon("chat")}Histórico sexual</h3><ul class="small">${historico.sexual.map((h) => html`<li>${h.rotulo}</li>`)}</ul></section>
      </div>
      <div class="next-tools">
        <a class="card card-link" href="#iief"><span class="card-icon">${icon("calc")}</span><h3>IIEF-15</h3><p class="small">Função erétil, orgasmo, desejo e satisfação.</p><span class="go">Aplicar ${icon("arrow")}</span></a>
        <a class="card card-link" href="#qsm"><span class="card-icon">${icon("calc")}</span><h3>QS-M</h3><p class="small">Satisfação e desempenho sexual (0 a 100).</p><span class="go">Aplicar ${icon("arrow")}</span></a>
        <a class="card card-link card-strong" href="#planejador"><span class="card-icon">${icon("clipboard")}</span><h3>Planejador de cuidados</h3><p class="small">Histórico, diagnósticos, NOC, NIC e evolução pronta.</p><span class="go">Montar o plano ${icon("arrow")}</span></a>
      </div>`;
    case "terapia": return html`
      ${objetivoMeta("terapia")}
      ${terapia()}
      <div class="btn-row" style="margin-top:var(--sp-4)"><a class="btn btn-primary" href="#encaminhamento">${icon("network")}Gerar texto de encaminhamento</a></div>`;
  }
  return "";
}

export default {
  keepScroll: false,
  title: (ctx) => { const e = ETAPAS.find((x) => x.id === ctx.params[0]); return e ? `${e.nome} · Na consulta` : "Na consulta"; },
  render(ctx) {
    const atual = ETAPAS.find((e) => e.id === ctx.params[0]) || ETAPAS[0];
    const i = ETAPAS.indexOf(atual);
    return html`<div class="page">
      ${pageHead({ kicker: "Ferramentas", title: "Na consulta", lead: "Um roteiro para conduzir a abordagem da sexualidade, etapa por etapa, com as falas sugeridas pelo manual prontas para copiar. Não é um roteiro rígido: avance, volte ou pule conforme a pessoa.", crumbs: [[null, "Na consulta"]] })}
      <div class="container">
        <ol class="stepper consulta-steps" aria-label="Etapas da consulta">
          ${ETAPAS.map((e, k) => html`<li><a class="step-btn ${e.cor ? "c-" + e.cor : ""} ${k < i ? "is-done" : ""}" href="#consulta/${e.id}" aria-current="${e.id === atual.id ? "step" : "false"}"><span class="n">${k + 1}</span><span><span class="step-name">${e.nome}</span><small>${e.sub}</small></span></a></li>`)}
        </ol>
        <section class="consulta-body ${atual.cor ? "c-" + atual.cor : ""}" aria-labelledby="etapa-titulo">
          <header class="etapa-head"><p class="kicker">Etapa ${i + 1} de ${ETAPAS.length}</p><h2 id="etapa-titulo">${atual.nome}</h2></header>
          ${conteudo(atual.id)}
        </section>
        <nav class="etapa-nav" aria-label="Etapas">
          ${i > 0 ? html`<a class="btn" href="#consulta/${ETAPAS[i - 1].id}">${icon("back")}${ETAPAS[i - 1].nome}</a>` : html`<span></span>`}
          ${i < ETAPAS.length - 1 ? html`<a class="btn btn-primary" href="#consulta/${ETAPAS[i + 1].id}">${ETAPAS[i + 1].nome}${icon("arrow")}</a>` : html`<a class="btn btn-primary" href="#planejador">Ir para o Planejador${icon("arrow")}</a>`}
        </nav>
      </div>
    </div>`;
  },
  mount(root) {
    ligarAbas(root);
    return on(root, "change", "[data-check]", (ev, el) => el.closest(".check").classList.toggle("is-on", el.checked));
  }
};
