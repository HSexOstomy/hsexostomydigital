import { html, $ } from "../core/dom.js";
import { pageHead } from "../core/ui.js";
import { novoMitos, viewMitos, bindMitos, novoFalas, viewFalas, bindFalas } from "./atividades.js";

const st = novoMitos(), sf = novoFalas();

export default {
  render() {
    return html`<div class="page">
      ${pageHead({ kicker: "Aprenda", title: "Mito ou fato?", lead: "Dez afirmações sobre sexualidade e estoma, com a explicação baseada no manual. Depois, treine a escolha das falas.", crumbs: [[null, "Mito ou fato"]] })}
      <div class="container-narrow stack-lg">
        <div id="mitos">${viewMitos(st)}</div>
        <section><p class="kicker">Treino</p><h2>Escolha a melhor fala</h2><div id="falas">${viewFalas(sf)}</div></section>
      </div>
    </div>`;
  },
  mount(root) {
    const m = $("#mitos", root), f = $("#falas", root);
    const offs = [
      ...bindMitos(m, st, () => { m.innerHTML = String(viewMitos(st)); }),
      ...bindFalas(f, sf, () => { f.innerHTML = String(viewFalas(sf)); })
    ];
    return () => offs.forEach((x) => x());
  }
};
