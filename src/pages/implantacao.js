import { html, $, on } from "../core/dom.js";
import { pageHead, icon, callout } from "../core/ui.js";
import { diretrizesImplantacao, quadro7 } from "../data/quadros.js";
import { quadro7 as tabela7 } from "./blocos.js";

const calc = quadro7.map((q, i) => ({ ...q, i })).filter((q) => q.calc);

export default {
  render() {
    return html`<div class="page">
      ${pageHead({ kicker: "Ferramentas · Capítulo 9", title: "Implantação e indicadores", lead: "Diretrizes norteadoras para incorporar o H_Sex_Ostomy ao serviço e indicadores de estrutura, processo e resultado para acompanhar sua execução. Adapte à realidade local, preservando os fundamentos do programa.", crumbs: [[null, "Implantação"]] })}
      <div class="container">
        <section class="section">
          <div class="section-head"><div><p class="kicker">9.1</p><h2>Diretrizes para implantação</h2><p>Marque o que seu serviço já tem. Serve como checklist de prontidão.</p></div><span class="tag tag-green" id="pront">0 de ${diretrizesImplantacao.length}</span></div>
          <ul class="check-list impl-list">${diretrizesImplantacao.map((d, i) => html`<li><label class="check"><input type="checkbox" data-dir="${i}"><span><strong>${i + 1}.</strong> ${d}</span></label></li>`)}</ul>
        </section>

        <section class="section">
          <div class="section-head"><div><p class="kicker">9.2</p><h2>Calcule seus indicadores</h2><p>Informe numerador e denominador. A meta do Quadro 7 aparece ao lado.</p></div></div>
          <div class="grid grid-2">${calc.map((q) => html`<article class="card ind-card" data-ind-card="${q.i}">
            <span class="tag tag-navy">${q.grupo}</span><h3 class="h4">${q.indicador}</h3>
            <div class="form-grid">
              <div class="field"><label for="n-${q.i}">${q.calc.num}</label><input class="input" type="number" min="0" id="n-${q.i}" data-num="${q.i}"></div>
              <div class="field"><label for="d-${q.i}">${q.calc.den}</label><input class="input" type="number" min="0" id="d-${q.i}" data-den="${q.i}"></div>
            </div>
            <div class="ind-out" id="out-${q.i}" aria-live="polite"><strong>–</strong><span>${q.calc.alvo ? `Meta: ${q.calc.alvo}%` : "Indicador descritivo, sem meta predefinida"}</span></div>
          </article>`)}</div>
        </section>

        <section class="section">
          <div class="section-head"><div><p class="kicker">Quadro 7</p><h2>Todos os indicadores sugeridos</h2></div><button class="btn" data-print>${icon("print")}Imprimir</button></div>
          ${tabela7()}
          ${callout("info", "Ponto de partida, não regra", html`<p>Selecione os indicadores factíveis no seu contexto e acrescente outros que fizerem sentido, mantendo a coerência com os objetivos do programa.</p>`)}
        </section>
      </div>
    </div>`;
  },
  mount(root) {
    const recalcula = (i) => {
      const n = Number($(`[data-num="${i}"]`, root).value), d = Number($(`[data-den="${i}"]`, root).value);
      const q = quadro7[i], out = $(`#out-${i}`, root);
      if (!d) { out.innerHTML = String(html`<strong>–</strong><span>${q.calc.alvo ? `Meta: ${q.calc.alvo}%` : "Indicador descritivo"}</span>`); out.className = "ind-out"; return; }
      const p = Math.round((n / d) * 1000) / 10;
      const ok = q.calc.alvo ? p >= q.calc.alvo : null;
      out.className = "ind-out " + (ok === null ? "" : ok ? "is-ok" : "is-low");
      out.innerHTML = String(html`<strong>${p.toLocaleString("pt-BR")}%</strong><span>${q.calc.alvo ? (ok ? `Meta de ${q.calc.alvo}% atingida` : `Abaixo da meta de ${q.calc.alvo}%`) : "Acompanhe a série histórica"}</span>`);
    };
    const offs = [
      on(root, "input", "[data-num], [data-den]", (ev, el) => recalcula(el.dataset.num ?? el.dataset.den)),
      on(root, "change", "[data-dir]", (ev, el) => {
        el.closest(".check").classList.toggle("is-on", el.checked);
        const n = root.querySelectorAll("[data-dir]:checked").length;
        $("#pront", root).textContent = `${n} de ${diretrizesImplantacao.length}`;
      })
    ];
    return () => offs.forEach((f) => f());
  }
};
