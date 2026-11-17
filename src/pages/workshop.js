import { html, raw, $, on } from "../core/dom.js";
import { pageHead, icon, callout } from "../core/ui.js";
import { agenda, checklist, discussao, slides } from "../data/workshop.js";
import { local } from "../core/store.js";

const cfg = window.HSO_CONFIG || {};
const W = cfg.workshop || {};

export function horarios() {
  const [h, m] = (W.horario || "19:00").split(":").map(Number);
  let t = h * 60 + m;
  return agenda.map((b) => { const ini = t; t += b.min; return { ...b, ini, fim: t }; });
}
export const hhmm = (min) => `${String(Math.floor(min / 60) % 24).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;
export function qrSvg(texto, size = 220) {
  try {
    const qr = window.qrcode(0, "M"); qr.addData(texto); qr.make();
    return raw(qr.createSvgTag({ cellSize: 6, margin: 2, scalable: true }).replace("<svg ", `<svg width="${size}" height="${size}" role="img" aria-label="QR code para ${texto}" `));
  } catch { return raw(`<p class="small">${texto}</p>`); }
}
export const urlPublica = (rota) => (W.enderecoSite || location.href.split("#")[0]).replace(/#.*$/, "") + "#" + rota;

const TIPO = { expositivo: ["Exposição", "tag-navy"], atividade: ["Atividade", "tag-green"], demonstracao: ["Demonstração", "tag-violet"], pausa: ["Pausa", ""], discussao: ["Discussão", "tag-warn"], encerramento: ["Encerramento", "tag-navy"] };

function contagem() {
  if (!W.data) return "";
  const d = new Date(`${W.data}T${W.horario || "19:00"}:00-03:00`), agora = Date.now();
  const diff = d.getTime() - agora, fim = d.getTime() + (W.duracaoMin || 180) * 60000;
  if (agora > fim) return "Realizado";
  if (diff <= 0) return "Acontecendo agora";
  const dias = Math.floor(diff / 864e5), horas = Math.floor((diff % 864e5) / 36e5);
  return dias > 0 ? `Faltam ${dias} ${dias === 1 ? "dia" : "dias"} e ${horas}h` : `Faltam ${horas}h${String(Math.floor((diff % 36e5) / 6e4)).padStart(2, "0")}`;
}

const linkOu = (url, rotulo) => url ? html`<a class="btn btn-sm" href="${url}" target="_blank" rel="noopener">${icon("external")}${rotulo}</a>` : html`<span class="tag tag-warn" title="Configure em site.config.js">${rotulo}: não configurado</span>`;

export default {
  render() {
    const blocos = horarios();
    const dataRaw = W.data ? new Date(`${W.data}T12:00:00-03:00`).toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : "";
    const dataTxt = dataRaw.charAt(0).toUpperCase() + dataRaw.slice(1);
    const feitos = new Set(local.read("ws-check", []));
    return html`<div class="page">
      <section class="ws-hero">
        <div class="container ws-hero-grid">
          <div>
            <p class="kicker kicker-light">Workshop participativo · Modo facilitador</p>
            <h1 tabindex="-1">Workshop Participativo do <span class="wordmark wordmark-light">H<i>_</i><b>Sex</b><i>_</i>Ostomy</span></h1>
            <ul class="ws-facts">
              ${dataTxt ? html`<li>${icon("clock")}<span><strong>${dataTxt}</strong>${W.horario} às ${hhmm(blocos.at(-1).fim)} (Brasília)</span></li>` : ""}
              <li>${icon("phone")}<span><strong>${W.modalidade || "On-line"}</strong>${Math.round((W.duracaoMin || 180) / 60)} horas · declaração de participação</span></li>
            </ul>
            <div class="btn-row">
              <a class="btn btn-green btn-lg" href="#apresentar">${icon("play")}Iniciar apresentação</a>
              <button class="btn btn-light btn-lg" data-qr>${icon("phone")}Mostrar QR dos participantes</button>
              <a class="btn btn-light" href="#participar">Ver modo participante</a>
            </div>
          </div>
          <div class="ws-count" aria-live="polite"><span>${contagem()}</span><small>${blocos.length} momentos · ${slides.length} telas</small></div>
        </div>
      </section>

      <div class="container">
        ${callout("alerta", "Cuidado com a linha de base do estudo", html`<p>${checklist.cuidado}</p>`)}

        <section class="section">
          <div class="section-head"><div><p class="kicker">Roteiro</p><h2>Três horas, onze momentos</h2><p>Horários calculados a partir de ${W.horario || "19:00"}. Clique em um momento para abrir a apresentação naquele ponto.</p></div>
            <button class="btn" data-print>${icon("print")}Imprimir roteiro</button></div>
          <ol class="agenda">${blocos.map((b, i) => {
            const primeiro = slides.findIndex((s) => s.bloco === b.id);
            const [rot, cls] = TIPO[b.tipo];
            return html`<li class="agenda-item agenda-${b.tipo}">
              <div class="agenda-time"><strong>${hhmm(b.ini)}</strong><span>${b.min} min</span></div>
              <div class="agenda-dot" aria-hidden="true"></div>
              <div class="agenda-card">
                <div class="agenda-top"><h3>${i + 1}. ${b.titulo}</h3><span class="tag ${cls}">${rot}</span></div>
                ${b.objetivo ? html`<p>${b.objetivo}</p>` : ""}
                <div class="btn-row">
                  ${primeiro >= 0 ? html`<a class="btn btn-sm btn-primary" href="#apresentar/${primeiro + 1}">${icon("play")}Apresentar</a>` : ""}
                  ${b.recursos.map(([href, t]) => html`<a class="btn btn-sm" href="#${href}">${t}</a>`)}
                </div>
              </div>
            </li>`;
          })}</ol>
        </section>

        <section class="section grid grid-2">
          <article class="card">
            <p class="kicker">Antes do encontro</p><h2 class="h3">Checklist da equipe</h2>
            <ul class="check-list">${checklist.antes.map((t, i) => html`<li><label class="check ${feitos.has(i) ? "is-on" : ""}"><input type="checkbox" data-wscheck="${i}" ${feitos.has(i) ? "checked" : ""}><span>${t}</span></label></li>`)}</ul>
          </article>
          <article class="card">
            <p class="kicker">Links do estudo</p><h2 class="h3">Pré-teste, Meet e pós-teste</h2>
            <p class="small muted">Edite os endereços em <code>site.config.js</code> (seção workshop).</p>
            <div class="ws-links">
              <div><strong>Inscrição e pré-teste</strong>${linkOu(W.linkPreTeste, "Formulário")}</div>
              <div><strong>Sala do encontro</strong>${linkOu(W.linkMeet, "Google Meet")}</div>
              <div><strong>Pós-teste e avaliação</strong>${linkOu(W.linkPosTeste, "Formulário")}</div>
            </div>
            <hr>
            <p class="kicker">Materiais para compartilhar</p>
            <div class="btn-row"><a class="btn btn-sm" href="#sintese">${icon("print")}Síntese de bolso</a><a class="btn btn-sm" href="#orientacoes">${icon("print")}Folheto ao paciente</a><a class="btn btn-sm" href="#fluxograma">${icon("flow")}Fluxograma</a></div>
          </article>
        </section>

        <section class="section">
          <div class="section-head"><div><p class="kicker">Momento 10</p><h2>Roteiro da discussão participativa</h2><p>Quatro eixos para conduzir a conversa. Peça exemplos concretos e convide os participantes a usar a área “Minha reflexão” do modo participante para registrar no chat.</p></div></div>
          <div class="grid grid-4 eixos">${discussao.map((d, i) => html`<article class="card eixo"><span class="eixo-n">${i + 1}</span><h3 class="h4">${d.eixo}</h3><p>${d.pergunta}</p><p class="small muted">${d.apoio}</p></article>`)}</div>
        </section>
      </div>

      <div class="qr-overlay" id="qr-overlay" hidden role="dialog" aria-modal="true" aria-labelledby="qr-t">
        <div class="qr-box"><button class="qr-close" data-qr-close aria-label="Fechar">${icon("x")}</button>
          <p class="kicker">Modo participante</p><h2 id="qr-t">Aponte a câmera do celular</h2>
          <div class="qr-img">${qrSvg(urlPublica("participar"), 320)}</div>
          <p class="qr-url">${urlPublica("participar").replace(/^https?:\/\//, "")}</p>
        </div>
      </div>
    </div>`;
  },
  mount(root) {
    const ov = $("#qr-overlay", root);
    const fechar = () => { ov.hidden = true; };
    const esc = (ev) => { if (ev.key === "Escape" && !ov.hidden) fechar(); };
    document.addEventListener("keydown", esc);
    const offs = [
      on(root, "click", "[data-qr]", () => { ov.hidden = false; $("[data-qr-close]", ov).focus(); }),
      on(root, "click", "[data-qr-close]", fechar),
      on(root, "click", "#qr-overlay", (ev) => { if (ev.target === ov) fechar(); }),
      on(root, "change", "[data-wscheck]", (ev, el) => {
        const s = new Set(local.read("ws-check", [])); const i = Number(el.dataset.wscheck);
        el.checked ? s.add(i) : s.delete(i); local.write("ws-check", [...s]); el.closest(".check").classList.toggle("is-on", el.checked);
      })
    ];
    return () => { offs.forEach((f) => f()); document.removeEventListener("keydown", esc); };
  }
};
