import { html } from "../core/dom.js";
export default {
  render() {
    return html`<div class="page"><div class="container" style="padding:5rem 0">
      <p class="kicker">Erro 404</p><h1 tabindex="-1">Página não encontrada</h1>
      <p class="lead">O endereço pode ter mudado. Use o menu ou volte ao início.</p>
      <div class="btn-row"><a class="btn btn-primary" href="#inicio">Ir para o início</a><a class="btn" href="#manual">Abrir o manual</a></div>
    </div></div>`;
  }
};
