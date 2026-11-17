import { html } from "../core/dom.js";
import { pageHead, icon, callout } from "../core/ui.js";
import { quadro3, quadro4 } from "./blocos.js";

export default {
  render(ctx) {
    const disf = ctx.params[0] === "disfuncoes";
    return html`<div class="page">
      ${pageHead({ kicker: "Ferramentas", title: "Orientações ao paciente", lead: "Dicas práticas para mais conforto, segurança e bem-estar na intimidade (Quadro 3), prontas para conversar e imprimir. Inclui o quadro de disfunções sexuais por tipo de cirurgia para consulta do(a) profissional.", crumbs: [[null, "Orientações"]],
        actions: html`<button class="btn btn-primary" data-print>${icon("print")}Imprimir folheto</button><a class="btn" href="#consulta/informacao">Falas por tema</a>` })}
      <div class="container">
        <article class="folheto print-area" aria-labelledby="folheto-t">
          <header class="folheto-head">
            <div><span class="wordmark wordmark-light">H<i>_</i><b>Sex</b><i>_</i>Ostomy</span>
            <h2 id="folheto-t">Intimidade com mais conforto e segurança</h2>
            <p>Orientações para homens com estoma. Use o que fizer sentido para você: são sugestões, não regras.</p></div>
            <img src="assets/img/rostos-linha.webp" alt="" width="640" height="160">
          </header>
          <div class="folheto-body">${quadro3({ imprimir: true })}
            <p class="folheto-foot">Ter um estoma não significa o fim da vida sexual. Mudanças na ereção, no desejo ou na confiança podem ser conversadas com a equipe de enfermagem: existem possibilidades de cuidado e tratamento.</p>
          </div>
        </article>

        <section class="section print-hide" id="disfuncoes" data-autofocus="${disf ? 1 : 0}">
          <div class="section-head"><div><p class="kicker">Para o(a) profissional · 7.9.3.1</p><h2>Disfunções sexuais possíveis por tipo de cirurgia</h2><p>A disfunção não depende só da técnica cirúrgica: idade, comorbidades, radioterapia, medicamentos, saúde mental e relacionamento também influenciam.</p></div></div>
          ${quadro4()}
          <div class="grid grid-2" style="margin-top:var(--sp-5)">
            ${callout("teoria", "Orgasmo, ereção e ejaculação", html`<p>São funções reguladas por vias nervosas distintas. Alguns homens têm ejaculação retrógrada, redução da intensidade orgástica ou orgasmo seco e ainda assim experienciam o orgasmo.</p>`)}
            ${callout("info", "Nervos e funções", html`<p>Lesões em fibras <strong>simpáticas</strong> tendem a comprometer a ejaculação (ex.: ejaculação retrógrada); lesões <strong>parassimpáticas</strong> tendem a resultar em disfunção erétil.</p>`)}
          </div>
        </section>
      </div>
    </div>`;
  },
  mount(root) {
    const el = root.querySelector('[data-autofocus="1"]');
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 50);
  }
};
