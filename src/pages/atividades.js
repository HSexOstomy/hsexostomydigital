/* Atividades interativas compartilhadas: mito ou fato, escolha a melhor fala e casos clínicos */
import { html, on } from "../core/dom.js";
import { icon } from "../core/ui.js";
import { mitos, falasTreino, casos } from "../data/aprendizagem.js";

const LETRAS = "ABCDE";

/* ---------- Mito ou fato ---------- */
export const novoMitos = () => ({ i: 0, resp: Array(mitos.length).fill(null) });

export function viewMitos(st) {
  const fim = st.i >= mitos.length;
  if (fim) {
    const acertos = st.resp.filter((r, k) => r === mitos[k].fato).length;
    return html`<div class="act-card act-end">
      <p class="kicker">Resultado</p><h2>${acertos} de ${mitos.length} acertos</h2>
      <p>${acertos >= 8 ? "Excelente! Você domina os principais pontos do manual." : acertos >= 5 ? "Bom caminho. Revise as explicações das que errou." : "Vale revisar a Informação Limitada e as disfunções possíveis no manual."}</p>
      <ol class="act-review">${mitos.map((m, k) => html`<li class="${st.resp[k] === m.fato ? "ok" : "no"}"><strong>${m.fato ? "Fato" : "Mito"}:</strong> ${m.frase}</li>`)}</ol>
      <div class="btn-row"><button class="btn btn-primary" data-mitos-reset>${icon("spark")}Fazer de novo</button><a class="btn" href="#manual/7-9-3">Revisar no manual</a></div>
    </div>`;
  }
  const m = mitos[st.i], r = st.resp[st.i], respondeu = r !== null, certo = r === m.fato;
  return html`<div class="act-card">
    <div class="act-top"><span class="tag tag-navy">Afirmação ${st.i + 1} de ${mitos.length}</span><div class="progress act-prog"><span style="width:${(st.i / mitos.length) * 100}%"></span></div></div>
    <p class="act-frase">“${m.frase}”</p>
    <div class="mf-btns" role="group" aria-label="Mito ou fato?">
      <button type="button" class="mf-btn mf-mito ${respondeu && !m.fato ? "is-right" : ""} ${respondeu && r === false && m.fato ? "is-wrong" : ""}" data-mf="false" ${respondeu ? "disabled" : ""}>Mito</button>
      <button type="button" class="mf-btn mf-fato ${respondeu && m.fato ? "is-right" : ""} ${respondeu && r === true && !m.fato ? "is-wrong" : ""}" data-mf="true" ${respondeu ? "disabled" : ""}>Fato</button>
    </div>
    ${respondeu ? html`<div class="feedback ${certo ? "ok" : "no"}" role="status"><strong>${certo ? "Isso mesmo!" : "Não exatamente."} É ${m.fato ? "fato" : "mito"}.</strong>${m.explica}</div>
      <div class="act-next"><button type="button" class="btn btn-primary" data-mitos-next>${st.i === mitos.length - 1 ? "Ver resultado" : "Próxima"}${icon("arrow")}</button></div>` : ""}
  </div>`;
}

export function bindMitos(root, st, redraw) {
  return [
    on(root, "click", "[data-mf]", (ev, b) => { st.resp[st.i] = b.dataset.mf === "true"; redraw(); root.querySelector("[data-mitos-next]")?.focus(); }),
    on(root, "click", "[data-mitos-next]", () => { st.i++; redraw(); root.querySelector(".act-card button, .act-card h2")?.focus(); }),
    on(root, "click", "[data-mitos-reset]", () => { Object.assign(st, novoMitos()); redraw(); })
  ];
}

/* ---------- Escolha a melhor fala ---------- */
export const novoFalas = () => ({ i: 0, resp: Array(falasTreino.length).fill(null) });

export function viewFalas(st) {
  if (st.i >= falasTreino.length) {
    const acertos = st.resp.filter((r, k) => falasTreino[k].opcoes[r]?.certo).length;
    return html`<div class="act-card act-end"><p class="kicker">Resultado</p><h2>${acertos} de ${falasTreino.length} falas adequadas</h2>
      <p>As falas do manual normalizam o tema, pedem Permissão e acolhem sem minimizar.</p>
      <div class="btn-row"><button class="btn btn-primary" data-falas-reset>${icon("spark")}Refazer</button><a class="btn" href="#consulta/informacao">Ver todas as falas</a></div></div>`;
  }
  const f = falasTreino[st.i], r = st.resp[st.i];
  return html`<div class="act-card">
    <div class="act-top"><span class="tag tag-navy">Situação ${st.i + 1} de ${falasTreino.length}</span><div class="progress act-prog"><span style="width:${(st.i / falasTreino.length) * 100}%"></span></div></div>
    <p class="act-situacao">${f.situacao}</p>
    <p class="quiz-q">Qual fala você usaria?</p>
    <div>${f.opcoes.map((o, k) => html`<button type="button" class="option ${r !== null && o.certo ? "is-right" : ""} ${r === k && !o.certo ? "is-wrong" : ""}" data-fala="${k}" ${r !== null ? "disabled" : ""}><span class="mark">${LETRAS[k]}</span><span>${o.t}</span></button>`)}</div>
    ${r !== null ? html`<div class="feedback ${f.opcoes[r].certo ? "ok" : "no"}" role="status"><strong>${f.opcoes[r].certo ? "Boa escolha!" : "Repense."}</strong>${f.opcoes[r].feedback}${f.opcoes[r].certo ? "" : html` <br><em>Melhor opção: ${LETRAS[f.opcoes.findIndex((o) => o.certo)]}. ${f.opcoes.find((o) => o.certo).feedback}</em>`}</div>
      <div class="act-next"><button type="button" class="btn btn-primary" data-falas-next>${st.i === falasTreino.length - 1 ? "Ver resultado" : "Próxima situação"}${icon("arrow")}</button></div>` : ""}
  </div>`;
}

export function bindFalas(root, st, redraw) {
  return [
    on(root, "click", "[data-fala]", (ev, b) => { st.resp[st.i] = Number(b.dataset.fala); redraw(); root.querySelector("[data-falas-next]")?.focus(); }),
    on(root, "click", "[data-falas-next]", () => { st.i++; redraw(); }),
    on(root, "click", "[data-falas-reset]", () => { Object.assign(st, novoFalas()); redraw(); })
  ];
}

/* ---------- Casos clínicos ---------- */
const FASE = { permissao: ["P", "p", "Permissão"], informacao: ["LI", "li", "Informação Limitada"], sugestoes: ["SS", "ss", "Sugestões Específicas"], terapia: ["IT", "it", "Terapia Intensiva"] };
export const novoCaso = (id) => ({ id, e: 0, resp: {} });

export function listaCasos(base = "casos") {
  return html`<div class="grid grid-3">${casos.map((c) => html`<a class="card card-link case-card" href="#${base}/${c.id}">
    <span class="case-avatar" aria-hidden="true">${c.nome.replace("Seu ", "")[0]}</span>
    <h3>${c.nome}, ${c.idade} anos</h3><p class="small">${c.resumo}</p>
    <div class="tags">${c.tags.map((t) => html`<span class="tag">${t}</span>`)}<span class="tag">${c.encontros.length} encontros</span></div>
    <span class="go">Começar ${icon("arrow")}</span></a>`)}</div>`;
}

export function viewCaso(st, base = "casos") {
  const c = casos.find((x) => x.id === st.id);
  const fim = st.e >= c.encontros.length;
  const timeline = html`<ol class="case-timeline" aria-label="Encontros">${c.encontros.map((en, k) => html`<li class="${k === st.e ? "is-current" : ""} ${st.resp[k] !== undefined ? "is-done" : ""}"><button type="button" data-enc="${k}" ${k > Object.keys(st.resp).length ? "disabled" : ""}><span class="n">${k + 1}</span><span>${en.titulo}</span></button></li>`)}</ol>`;
  if (fim) {
    const ok = c.encontros.filter((en, k) => en.opcoes[st.resp[k]]?.certo).length;
    return html`<div class="case-wrap">${timeline}<div class="act-card act-end"><p class="kicker">Fim do caso</p><h2>${c.nome}: ${ok} de ${c.encontros.length} condutas alinhadas ao programa</h2>
      <p>Repare como Permissão e Revisão aparecem em todos os encontros e como as demandas evoluem ao longo do tempo.</p>
      <div class="btn-row"><button class="btn btn-primary" data-caso-reset>${icon("spark")}Refazer o caso</button><a class="btn" href="#${base}">Escolher outro caso</a></div></div></div>`;
  }
  const en = c.encontros[st.e], r = st.resp[st.e], [sig, cor, nomeFase] = FASE[en.fase];
  return html`<div class="case-wrap">
    ${timeline}
    <article class="act-card case-scene c-${cor}">
      <div class="act-top"><span class="tag">Encontro ${st.e + 1} · ${en.titulo}</span><span class="comp-badge c-${cor}" title="${nomeFase}" style="min-width:34px;height:34px;font-size:.85rem">${sig}</span></div>
      <p class="case-story">${en.cena}</p>
      <p class="quiz-q">${en.pergunta}</p>
      <div>${en.opcoes.map((o, k) => html`<button type="button" class="option ${r !== undefined && o.certo ? "is-right" : ""} ${r === k && !o.certo ? "is-wrong" : ""}" data-caso-op="${k}" ${r !== undefined ? "disabled" : ""}><span class="mark">${LETRAS[k]}</span><span>${o.t}</span></button>`)}</div>
      ${r !== undefined ? html`<div class="feedback ${en.opcoes[r].certo ? "ok" : "no"}" role="status"><strong>${en.opcoes[r].certo ? "Conduta coerente com o programa." : "Vale repensar."}</strong>${en.opcoes[r].feedback}</div>
        <div class="act-next">${!en.opcoes[r].certo ? html`<button type="button" class="btn" data-caso-retry>Tentar de novo</button>` : ""}<button type="button" class="btn btn-primary" data-caso-next>${st.e === c.encontros.length - 1 ? "Concluir caso" : "Próximo encontro"}${icon("arrow")}</button></div>` : ""}
    </article>
  </div>`;
}

export function bindCaso(root, st, redraw) {
  return [
    on(root, "click", "[data-caso-op]", (ev, b) => { st.resp[st.e] = Number(b.dataset.casoOp); redraw(); root.querySelector("[data-caso-next]")?.focus(); }),
    on(root, "click", "[data-caso-next]", () => { st.e++; redraw(); root.querySelector(".case-story")?.scrollIntoView({ behavior: "smooth", block: "center" }); }),
    on(root, "click", "[data-caso-retry]", () => { delete st.resp[st.e]; redraw(); }),
    on(root, "click", "[data-enc]", (ev, b) => { st.e = Number(b.dataset.enc); redraw(); }),
    on(root, "click", "[data-caso-reset]", () => { st.e = 0; st.resp = {}; redraw(); })
  ];
}
