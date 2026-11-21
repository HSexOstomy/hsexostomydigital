import { html, $, on } from "../core/dom.js";
import { icon, copyText } from "../core/ui.js";
import { casos } from "../data/aprendizagem.js";
import { discussao } from "../data/workshop.js";
import { novoMitos, viewMitos, bindMitos, novoFalas, viewFalas, bindFalas, listaCasos, viewCaso, bindCaso, novoCaso } from "./atividades.js";
import { session } from "../core/store.js";

const W = (window.HSO_CONFIG || {}).workshop || {};

const sm = novoMitos(), sf = novoFalas(), sc = {};
const reflexao = session.read("reflexao", {});

const topo = (titulo, voltar = true) => html`<header class="pt-head">
  ${voltar ? html`<a class="pt-back" href="#participar">${icon("back")}Atividades</a>` : html`<span class="wordmark">H<i>_</i><b>Sex</b><i>_</i>Ostomy</span>`}
  <h1 tabindex="-1">${titulo}</h1></header>`;

function hub() {
  const itens = [
    ["participar/mitos", "spark", "Mito ou fato?", "10 afirmações rápidas", "Quebra-gelo"],
    ["participar/falas", "chat", "Escolha a melhor fala", "3 situações de consulta", "Informação Limitada"],
    ["participar/casos", "cases", "Simulação clínica", "O caso muda com suas escolhas", "Em grupo"],
    ["participar/reflexao", "bulb", "Minha reflexão", "Para a discussão final", "Discussão"]
  ];
  return html`<div class="page pt">
    ${topo("Bem-vindo(a) ao workshop!", false)}
    <div class="pt-body">
      <p class="pt-lead">Aqui ficam as atividades do encontro. Abra cada uma quando a facilitadora indicar. Suas respostas não são enviadas nem registradas.</p>
      ${W.linkMural ? html`<a class="pt-item pt-mural" href="${W.linkMural}" target="_blank" rel="noopener"><span class="pt-ic">${icon("chat")}</span><span><strong>${W.muralTitulo}</strong><small>${W.muralTexto}</small></span><span class="tag tag-green">Ao vivo</span></a>` : ""}
      <ul class="pt-list">${itens.map(([href, ic, t, d, tag]) => html`<li><a class="pt-item" href="#${href}"><span class="pt-ic">${icon(ic)}</span><span><strong>${t}</strong><small>${d}</small></span><span class="tag">${tag}</span></a></li>`)}</ul>
      <div class="pt-more"><p class="small muted">Depois do encontro, explore a plataforma completa:</p>
        <div class="btn-row"><a class="btn btn-sm" href="#consulta">Na consulta</a><a class="btn btn-sm" href="#manual">Manual</a><a class="btn btn-sm" href="#capacitacao">Formação de Habilidades</a></div></div>
    </div>
  </div>`;
}

function textoReflexao() {
  return discussao.map((d) => (reflexao[d.eixo] || "").trim() ? `${d.eixo}: ${reflexao[d.eixo].trim()}` : "").filter(Boolean).join("\n");
}

function viewReflexao() {
  return html`<div class="page pt">${topo("Minha reflexão")}
    <div class="pt-body">
      <p class="pt-lead">Pense na sua prática. Escreva o que quiser compartilhar e use o botão para copiar e colar no chat do Meet.</p>
      ${discussao.map((d) => html`<div class="field pt-field"><label for="rf-${d.eixo}"><span class="tag tag-navy">${d.eixo}</span> ${d.pergunta}</label><textarea class="textarea" id="rf-${d.eixo}" data-rf="${d.eixo}" rows="3">${reflexao[d.eixo] || ""}</textarea></div>`)}
      <button class="btn btn-green btn-lg pt-copy" data-rf-copy>${icon("copy")}Copiar para o chat</button>
      <p class="small muted">O texto fica só neste aparelho e some ao fechar a página.</p>
    </div></div>`;
}

export default {
  title: (ctx) => ({ mitos: "Mito ou fato", falas: "Escolha a melhor fala", casos: "Casos clínicos", reflexao: "Minha reflexão" }[ctx.params[0]] || "Participe do workshop"),
  render(ctx) {
    const [a, id] = ctx.params;
    if (a === "mitos") return html`<div class="page pt">${topo("Mito ou fato?")}<div class="pt-body" id="pt-act">${viewMitos(sm)}</div></div>`;
    if (a === "falas") return html`<div class="page pt">${topo("Escolha a melhor fala")}<div class="pt-body" id="pt-act">${viewFalas(sf)}</div></div>`;
    if (a === "casos" && casos.some((c) => c.id === id)) { sc[id] = sc[id] || novoCaso(id); const c = casos.find((x) => x.id === id);
      return html`<div class="page pt">${topo(`${c.nome}, ${c.idade} anos`)}<div class="pt-body"><p class="pt-lead">${c.resumo}</p><div id="pt-act">${viewCaso(sc[id], "participar/casos")}</div></div></div>`; }
    if (a === "casos") return html`<div class="page pt">${topo("Casos clínicos")}<div class="pt-body"><h2 class="sr-only">Casos disponíveis</h2><p class="pt-lead">Escolham um caso em grupo. Cada decisão muda a história. Discutam antes de escolher e anotem a justificativa para compartilhar.</p>${listaCasos("participar/casos")}</div></div>`;
    if (a === "reflexao") return viewReflexao();
    return hub();
  },
  mount(root, ctx) {
    const [a, id] = ctx.params;
    const box = $("#pt-act", root);
    let offs = [];
    if (a === "mitos") offs = bindMitos(box, sm, () => { box.innerHTML = String(viewMitos(sm)); });
    if (a === "falas") offs = bindFalas(box, sf, () => { box.innerHTML = String(viewFalas(sf)); });
    if (a === "casos" && sc[id]) offs = bindCaso(box, sc[id], () => { box.innerHTML = String(viewCaso(sc[id], "participar/casos")); });
    if (a === "reflexao") offs = [
      on(root, "input", "[data-rf]", (ev, el) => { reflexao[el.dataset.rf] = el.value; session.write("reflexao", reflexao); }),
      on(root, "click", "[data-rf-copy]", () => { const t = textoReflexao(); copyText(t || "Ainda não escrevi minha reflexão."); })
    ];
    return () => offs.forEach((f) => f());
  }
};
