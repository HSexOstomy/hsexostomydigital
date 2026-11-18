import { html, $, on } from "../core/dom.js";
import { pageHead, icon, callout, copyText } from "../core/ui.js";
import { terapiaIntensiva as TI } from "../data/quadros.js";
import { figura } from "../figures/index.js";

const st = { para: [], motivos: [], resumo: "", objetivo: "", contra: true };
const low = (s) => s.charAt(0).toLowerCase() + s.slice(1);

function texto() {
  const para = st.para.length ? st.para.join(", ") : "[serviço ou profissional]";
  const mot = st.motivos.length ? st.motivos.map(low).join("; ") : "[motivo do encaminhamento]";
  return [
    `Encaminho homem com estoma de eliminação, em acompanhamento de enfermagem no programa H_Sex_Ostomy, para avaliação e acompanhamento em ${para}.`,
    `Motivo: ${mot}.`,
    st.resumo.trim() ? `Resumo clínico: ${st.resumo.trim()}` : "Resumo clínico: [histórico pertinente, instrumentos aplicados e intervenções já realizadas].",
    st.objetivo.trim() ? `Objetivo do encaminhamento: ${st.objetivo.trim()}` : "",
    "O encaminhamento foi discutido e pactuado com o usuário.",
    st.contra ? "Solicito contrarreferência para continuidade do cuidado. O acompanhamento de enfermagem será mantido, com revisão nas próximas consultas." : "",
    "Enfermeiro(a): ______________________ COREN nº ________"
  ].filter(Boolean).join("\n");
}

export default {
  render() {
    return html`<div class="page">
      ${pageHead({ kicker: "Ferramentas · Terapia Intensiva", title: "Encaminhamento e rede", lead: "Quando a demanda excede o escopo de atuação autônoma do(a) enfermeiro(a), o encaminhamento qualificado garante acesso a cuidado especializado, sem encerrar o acompanhamento.", crumbs: [[null, "Encaminhamento"]], art: "homem-negro-fita" })}
      <div class="container">
        <section class="section">
          <h2 class="sr-only">Quando, como e para quem encaminhar</h2>
          <div class="grid grid-3 ti-grid">
            <div class="card"><h3 class="h4">${icon("alert")}Quando encaminhar</h3><ul class="small">${TI.situacoes.map((s) => html`<li>${s}</li>`)}</ul></div>
            <div class="card"><h3 class="h4">${icon("list")}Como encaminhar</h3><ol class="small">${TI.fazer.map((s) => html`<li>${s}</li>`)}</ol></div>
            <div class="card"><h3 class="h4">${icon("users")}Para quem</h3><ul class="small">${TI.profissionais.map((s) => html`<li>${s}</li>`)}</ul></div>
          </div>
          ${callout("alerta", "O encaminhamento não encerra o cuidado", html`<p>${TI.lembrete}</p>`)}
        </section>

        <section class="section">
          <div class="section-head"><div><p class="kicker">Gerador</p><h2>Texto de encaminhamento</h2><p>Monte um texto-base para a guia de referência. Revise e complete antes de usar.</p></div></div>
          <div class="enc-layout">
            <div class="card stack">
              <fieldset class="field"><legend class="label">Encaminhar para</legend><div class="choice-grid">${TI.profissionais.map((p) => html`<label class="choice"><input type="checkbox" data-para value="${p}"><span>${p}</span></label>`)}</div></fieldset>
              <fieldset class="field"><legend class="label">Motivo</legend><div class="choice-grid">${TI.situacoes.map((p) => html`<label class="choice"><input type="checkbox" data-mot value="${p}"><span>${p}</span></label>`)}</div></fieldset>
              <div class="field"><label for="enc-resumo">Resumo clínico</label><textarea class="textarea" id="enc-resumo" data-campo="resumo" placeholder="Ex.: colostomia há 8 meses; IIEF-15 com função erétil 14/30; orientações de Informação Limitada realizadas; uso de anti-hipertensivo."></textarea></div>
              <div class="field"><label for="enc-obj">Objetivo do encaminhamento</label><input class="input" id="enc-obj" data-campo="objetivo" placeholder="Ex.: avaliação de componente orgânico da disfunção erétil"></div>
              <label class="check"><input type="checkbox" data-contra checked><span>Solicitar contrarreferência</span></label>
            </div>
            <div class="card enc-out">
              <div class="registro-top"><h3 class="h4">${icon("clipboard")}Texto gerado</h3><div class="btn-row"><button class="btn btn-sm btn-primary" data-copiar>${icon("copy")}Copiar</button><button class="btn btn-sm" data-print>${icon("print")}Imprimir</button></div></div>
              <pre class="enc-text" id="enc-text" aria-live="polite">${texto()}</pre>
            </div>
          </div>
        </section>

        <section class="section">
          <div class="section-head"><div><p class="kicker">Capítulo 8 · Figura 6</p><h2>A rede de cuidados</h2><p>Identifique a rede mínima de suporte: familiares, parceria, cuidadores, atenção primária, serviços especializados, grupos de apoio e recursos comunitários.</p></div></div>
          ${figura("rede")}
        </section>
      </div>
    </div>`;
  },
  mount(root) {
    const upd = () => { $("#enc-text", root).textContent = texto(); };
    const tog = (arr, v) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
    const offs = [
      on(root, "change", "[data-para]", (ev, el) => { st.para = tog(st.para, el.value); upd(); }),
      on(root, "change", "[data-mot]", (ev, el) => { st.motivos = tog(st.motivos, el.value); upd(); }),
      on(root, "input", "[data-campo]", (ev, el) => { st[el.dataset.campo] = el.value; upd(); }),
      on(root, "change", "[data-contra]", (ev, el) => { st.contra = el.checked; upd(); }),
      on(root, "click", "[data-copiar]", () => copyText(texto()))
    ];
    root.querySelectorAll("[data-para]").forEach((el) => { el.checked = st.para.includes(el.value); });
    root.querySelectorAll("[data-mot]").forEach((el) => { el.checked = st.motivos.includes(el.value); });
    $("#enc-resumo", root).value = st.resumo; $("#enc-obj", root).value = st.objetivo; $("[data-contra]", root).checked = st.contra;
    upd();
    return () => offs.forEach((f) => f());
  }
};
