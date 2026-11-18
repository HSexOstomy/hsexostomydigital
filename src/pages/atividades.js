/* Atividades interativas compartilhadas: mito ou fato, escolha a melhor fala e casos clínicos */
import { html, on } from "../core/dom.js";
import { icon } from "../core/ui.js";
import { mitos, falasTreino, casos, finais } from "../data/aprendizagem.js";
import { figuraDestaque } from "../figures/imagem.js";

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

/* ---------- Simulação clínica ramificada ---------- */
const NOME_FASE = { admissao: "Admissão", permissao: "Permissão", nao1: "Continuidade do atendimento", d2: "Demandas específicas?", nao2: "Continuidade do acompanhamento", informacao: "Informação Limitada", sugestoes: "Sugestões Específicas", d3: "Suporte especializado?", terapia: "Terapia Intensiva", avaliacao: "Avaliação, Revisão e Reflexão", loop: "Loop" };
export const novoCaso = (id) => { const c = casos.find((x) => x.id === id); return { id, no: c.inicio, hist: [], escolha: null, vinculo: 0 }; };

export function listaCasos(base = "casos") {
  return html`<div class="grid grid-3">${casos.map((c) => html`<a class="card card-link case-card" href="#${base}/${c.id}">
    <span class="case-avatar" aria-hidden="true">${c.nome.replace("Seu ", "")[0]}</span>
    <h3>${c.nome}, ${c.idade} anos</h3><p class="small">${c.resumo}</p>
    <div class="tags">${c.tags.map((t) => html`<span class="tag">${t}</span>`)}</div>
    <span class="go">Começar ${icon("arrow")}</span></a>`)}</div>`;
}

function vinculoMeter(v) {
  const n = Math.max(-3, Math.min(5, v)), pct = ((n + 3) / 8) * 100;
  const rot = v >= 3 ? "Vínculo forte" : v >= 1 ? "Vínculo em construção" : v === 0 ? "Vínculo neutro" : "Vínculo fragilizado";
  return html`<div class="vinculo"><div class="vinculo-top"><span>${icon("heart")}Vínculo com a pessoa</span><strong>${rot}</strong></div><div class="vinculo-bar"><span style="width:${pct}%" class="${v < 0 ? "neg" : ""}"></span></div></div>`;
}

export function viewCaso(st, base = "casos") {
  const c = casos.find((x) => x.id === st.id);
  const fim = finais[st.no];
  const no = fim ? null : c.nos[st.no];
  const fase = fim ? (st.no === "fim_bom" ? "loop" : "avaliacao") : no.fase;
  const lado = html`<aside class="sim-side">
    <div class="card sim-map"><p class="kicker">Onde estamos</p><p class="sim-fase">${NOME_FASE[fase] || ""}</p>${figuraDestaque("fluxograma", fase)}</div>
    ${vinculoMeter(st.vinculo)}
    ${st.hist.length ? html`<div class="card sim-hist"><p class="kicker">Suas decisões</p><ol>${st.hist.map((h) => html`<li class="${h.efeito > 0 ? "pos" : h.efeito < 0 ? "neg" : ""}"><strong>${h.titulo}</strong><span>${h.t}</span></li>`)}</ol></div>` : ""}
  </aside>`;
  if (fim) {
    return html`<div class="sim">${lado}<article class="act-card sim-end sim-${fim.tipo}"><p class="kicker">Desfecho</p><h2>${fim.titulo}</h2><p>${fim.texto}</p>
      <p class="small muted">${st.hist.filter((h) => h.efeito > 0).length} de ${st.hist.length} decisões fortaleceram o cuidado.</p>
      <div class="btn-row"><button class="btn btn-primary" data-caso-reset>${icon("spark")}Refazer por outro caminho</button><a class="btn" href="#${base}">Escolher outro caso</a></div></article></div>`;
  }
  const e = st.escolha !== null ? no.opcoes[st.escolha] : null;
  return html`<div class="sim">${lado}
    <article class="act-card case-scene">
      <div class="act-top"><span class="tag">${no.titulo}</span><span class="small muted">Passo ${st.hist.length + 1}</span></div>
      <p class="case-story">${no.cena}</p>
      <p class="quiz-q">${no.pergunta}</p>
      <div>${no.opcoes.map((o, k) => html`<button type="button" class="option ${e && k === st.escolha ? (o.efeito > 0 ? "is-right" : o.efeito < 0 ? "is-wrong" : "is-neutral") : ""}" data-caso-op="${k}" ${e ? "disabled" : ""}><span class="mark">${LETRAS[k]}</span><span>${o.t}</span></button>`)}</div>
      ${e ? html`<div class="consequencia" role="status">
          <p class="resposta">${e.resposta}</p>
          <div class="feedback ${e.efeito > 0 ? "ok" : e.efeito < 0 ? "no" : "neutral"}"><strong>${e.efeito > 0 ? "O vínculo se fortaleceu." : e.efeito < 0 ? "O vínculo se fragilizou." : "Sem ganho de vínculo."}</strong>${e.feedback}</div>
        </div>
        <div class="act-next"><button type="button" class="btn btn-primary" data-caso-next>${finais[e.next] ? "Ver desfecho" : "Continuar a história"}${icon("arrow")}</button></div>` : ""}
    </article>
  </div>`;
}

export function bindCaso(root, st, redraw) {
  return [
    on(root, "click", "[data-caso-op]", (ev, b) => { st.escolha = Number(b.dataset.casoOp); redraw(); root.querySelector("[data-caso-next]")?.focus({ preventScroll: true }); root.querySelector(".consequencia")?.scrollIntoView({ behavior: "smooth", block: "nearest" }); }),
    on(root, "click", "[data-caso-next]", () => {
      const c = casos.find((x) => x.id === st.id), no = c.nos[st.no], o = no.opcoes[st.escolha];
      st.hist.push({ titulo: no.titulo, t: o.t, efeito: o.efeito }); st.vinculo += o.efeito; st.no = o.next; st.escolha = null;
      redraw(); root.querySelector(".act-card")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }),
    on(root, "click", "[data-caso-reset]", () => { Object.assign(st, novoCaso(st.id)); redraw(); })
  ];
}
