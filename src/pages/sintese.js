import { html } from "../core/dom.js";
import { pageHead, icon } from "../core/ui.js";
import { figura } from "../figures/index.js";

export default {
  render() {
    return html`<div class="page">
      ${pageHead({ kicker: "O Programa · Apêndice A", title: "Síntese de bolso", lead: "O que fazer em cada etapa do encontro terapêutico, em uma página. Imprima e deixe no consultório.", crumbs: [["programa", "O Programa"], [null, "Síntese"]],
        actions: html`<button class="btn btn-primary" data-print>${icon("print")}Imprimir síntese</button><a class="btn" href="#fluxograma">Ver o fluxograma</a>` })}
      <div class="container-narrow print-area">${figura("sintese")}
        <p class="small muted print-hide" style="margin-top:1rem">Fonte: manual H_Sex_Ostomy, Apêndice A, p. 75.</p>
        <p class="print-only small">H_Sex_Ostomy: Programa de Reabilitação da Sexualidade Masculina (Rabelo; Sousa, 2026). Apêndice A.</p>
      </div>
    </div>`;
  }
};
