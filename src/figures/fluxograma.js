/* Figura 3 do manual: fluxograma sintetizado do H_Sex_Ostomy, redesenhado em SVG.
   Cada nó é inteiro clicável (data-node). Nada é sobreposto ao texto. */
import { raw } from "../core/dom.js";

export const nos = {
  admissao: { titulo: "Admissão no programa", tipo: "inicio", texto: "Início do acompanhamento do homem com estoma no serviço. A temática pode ser introduzida de forma gradual já na primeira consulta de enfermagem.", proximo: [["Seguir para Permissão", "permissao"]], secao: "7-3" },
  permissao: { titulo: "Permissão", tipo: "processo", cor: "p", texto: "Solicitar permissão, em ambiente seguro, acolhedor e livre de julgamentos. Respeitar autonomia, intimidade e limites individuais. A Permissão é renovada a cada encontro.", proximo: [["Usuário autoriza a discussão?", "d1"]], secao: "7-9-1", ferramenta: ["consulta/permissao", "Falas para pedir Permissão"] },
  d1: { titulo: "Usuário autoriza a discussão?", tipo: "decisao", texto: "Ponto de decisão. A resposta da pessoa orienta o caminho, e qualquer resposta gera cuidado.", proximo: [["Sim: Informação Limitada", "informacao"], ["Não: continuidade do atendimento", "nao1"]] },
  nao1: { titulo: "Continuidade do atendimento clínico geral", tipo: "alternativo", texto: "Respeitar a decisão sem julgamento, seguir com o atendimento clínico e informar disponibilidade para conversas futuras. Documentar a oferta da abordagem e a decisão do usuário.", proximo: [["Seguir para Avaliação, Revisão e Reflexão", "avaliacao"]], secao: "7-9-1" },
  informacao: { titulo: "Informação Limitada", tipo: "processo", cor: "li", texto: "Oferecer informações gerais sobre imagem corporal, intimidade e adaptação ao estoma, disfunções sexuais possíveis e mitos e crenças sobre o tema.", proximo: [["Há demandas específicas?", "d2"]], secao: "7-9-3", ferramenta: ["consulta/informacao", "Falas por tema"] },
  d2: { titulo: "Demandas específicas?", tipo: "decisao", texto: "Avaliar se surgiram demandas concretas que pedem avaliação clínica e plano individual.", proximo: [["Sim: Sugestões Específicas", "sugestoes"], ["Não: continuidade do acompanhamento", "nao2"]] },
  nao2: { titulo: "Continuidade do acompanhamento", tipo: "alternativo", texto: "Manter o acompanhamento e informar disponibilidade futura. Demandas podem surgir tardiamente, à medida que o homem retoma a vida afetiva e sexual.", proximo: [["Seguir para Avaliação, Revisão e Reflexão", "avaliacao"]], secao: "7-5" },
  sugestoes: { titulo: "Sugestões Específicas", tipo: "processo", cor: "ss", texto: "Avaliação clínica e histórico sexual e identificação de demandas específicas. Intervenções de enfermagem individualizadas, com NANDA-I, NOC e NIC.", proximo: [["Necessita de suporte especializado?", "d3"]], secao: "7-9-4", ferramenta: ["planejador", "Abrir o Planejador"] },
  d3: { titulo: "Necessita de suporte especializado?", tipo: "decisao", texto: "Verificar se a demanda excede o escopo de atuação autônoma do(a) enfermeiro(a).", proximo: [["Sim: Terapia Intensiva", "terapia"], ["Não: Avaliação, Revisão e Reflexão", "avaliacao"]] },
  terapia: { titulo: "Terapia Intensiva", tipo: "processo", cor: "it", texto: "Encaminhamento para psicologia, urologia, fisioterapia, terapia sexual ou outros. O encaminhamento não encerra o cuidado: mantém-se a Revisão e a contrarreferência.", proximo: [["Seguir com Avaliação, Revisão e Reflexão", "avaliacao"]], secao: "7-9-5", ferramenta: ["encaminhamento", "Gerar encaminhamento"] },
  avaliacao: { titulo: "Avaliação, Revisão e Reflexão", tipo: "processo", cor: "r", texto: "Monitoramento de mudanças, identificação de novas demandas e efetividade das intervenções. Intervalo entre consultas: mínimo trimestral, ajustável conforme necessidades individuais.", proximo: [["Retornar à Permissão (loop contínuo)", "loop"]], secao: "7-9-2", ferramenta: ["consulta/revisao", "Falas de Revisão"] },
  loop: { titulo: "Loop: processo contínuo", tipo: "loop", texto: "O acompanhamento é longitudinal e contínuo, com a permissão renovada a cada encontro, respeitando a autonomia da pessoa cuidada. O processo é não linear: o usuário pode retornar a qualquer fase, conforme a necessidade. Os intervalos podem ser ajustados, com teleatendimentos intermediários sempre que necessário.", proximo: [["Nova consulta: Permissão", "permissao"]] }
};

const box = (id, x, y, w, h, fill, title, lines, aria) => `
  <g class="fig-hot" data-node="${id}" tabindex="0" role="button" aria-label="${aria || title}">
    <rect class="hot-shape" x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${fill}" stroke="#1e1e1e" stroke-width="2"/>
    <text x="${x + w / 2}" y="${y + 30}" class="flow-title" text-anchor="middle">${title}</text>
    <line x1="${x + 24}" y1="${y + 42}" x2="${x + w - 24}" y2="${y + 42}" stroke="#1e1e1e" stroke-width="1.2"/>
    ${lines.map((l, i) => `<text x="${x + w / 2}" y="${y + 64 + i * 21}" class="flow-body" text-anchor="middle" style="font-size:14.5px">${l}</text>`).join("")}
  </g>`;

const diamond = (id, cx, cy, hw, hh, lines) => `
  <g class="fig-hot" data-node="${id}" tabindex="0" role="button" aria-label="Ponto de decisão: ${lines.join(" ")}">
    <polygon class="hot-shape" points="${cx - hw},${cy} ${cx},${cy - hh} ${cx + hw},${cy} ${cx},${cy + hh}" fill="#fcd59a" stroke="#d9a54f" stroke-width="2"/>
    ${lines.map((l, i) => `<text x="${cx}" y="${cy + (i - (lines.length - 1) / 2) * 21 + 6}" class="flow-dec" text-anchor="middle">${l}</text>`).join("")}
  </g>`;

const alt = (id, x, y, w, h, lines) => `
  <g class="fig-hot" data-node="${id}" tabindex="0" role="button" aria-label="${lines.join(" ")}">
    <rect class="hot-shape" x="${x}" y="${y}" width="${w}" height="${h}" fill="#d9d9d9" stroke="#3a3a3a" stroke-width="2" stroke-dasharray="7 5"/>
    ${lines.map((l, i) => `<text x="${x + w / 2}" y="${y + 26 + i * 19}" class="flow-small" text-anchor="middle">${l}</text>`).join("")}
  </g>`;

const loopCircle = (cx, cy) => `
  <g class="fig-hot" data-node="loop" tabindex="0" role="button" aria-label="Loop: processo contínuo">
    <circle class="hot-shape" cx="${cx}" cy="${cy}" r="28" fill="#1ec07f" stroke="#1e1e1e" stroke-width="2"/>
    <text x="${cx}" y="${cy + 6}" class="flow-label" text-anchor="middle" style="font-size:17px">Loop</text>
  </g>`;

export function fluxograma({ id = "flx" } = {}) {
  const m = `url(#${id}-ah)`, mg = `url(#${id}-ahg)`, mgr = `url(#${id}-ahgr)`;
  const svg = `
<svg class="fig-flow" viewBox="0 0 900 1120" role="group" aria-labelledby="${id}-t ${id}-d">
  <title id="${id}-t">Fluxograma do H_Sex_Ostomy</title>
  <desc id="${id}-d">Fluxo do programa: Admissão, Permissão, decisão sobre autorização, Informação Limitada, decisão sobre demandas específicas, Sugestões Específicas, decisão sobre suporte especializado com Terapia Intensiva, e Avaliação, Revisão e Reflexão, com retorno contínuo (loop) à Permissão. Respostas negativas levam à continuidade do atendimento. Selecione uma etapa para ver detalhes.</desc>
  <defs>
    <marker id="${id}-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="#1e1e1e"/></marker>
    <marker id="${id}-ahgr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="#3a3a3a"/></marker>
    <marker id="${id}-ahg" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="#22b04a"/></marker>
  </defs>

  <g stroke="#1e1e1e" stroke-width="2" fill="none">
    <path d="M450 96 V128" marker-end="${m}"/>
    <path d="M450 224 V250" marker-end="${m}"/>
    <path d="M280 306 H246" marker-end="${m}"/>
    <path d="M450 362 V392" marker-end="${m}"/>
    <path d="M450 490 V514" marker-end="${m}"/>
    <path d="M290 568 H246" marker-end="${m}"/>
    <path d="M450 620 V648" marker-end="${m}"/>
    <path d="M450 746 V774" marker-end="${m}"/>
    <path d="M626 832 H660" marker-end="${m}"/>
    <path d="M450 888 V918" marker-end="${m}"/>
    <path d="M450 1036 V1052"/>
  </g>
  <g stroke="#3a3a3a" stroke-width="2" fill="none" stroke-dasharray="6 5">
    <path d="M30 306 H16 V978 H176" marker-end="${mgr}"/>
    <path d="M134 608 V626 H16"/>
  </g>
  <path d="M790 178 H890 V1080 H484" fill="none" stroke="#22b04a" stroke-width="2.5" stroke-dasharray="7 6" marker-end="${mg}"/>

  <g class="flow-label">
    <text x="262" y="296" text-anchor="middle">NÃO</text>
    <text x="468" y="384">SIM</text>
    <text x="266" y="558" text-anchor="middle">NÃO</text>
    <text x="468" y="640">SIM</text>
    <text x="642" y="820" text-anchor="middle">SIM</text>
    <text x="468" y="910">NÃO</text>
  </g>

  <g class="fig-hot" data-node="admissao" tabindex="0" role="button" aria-label="Admissão no Programa H_Sex_Ostomy">
    <ellipse class="hot-shape" cx="450" cy="54" rx="160" ry="42" fill="#4cc4f5" stroke="#1e1e1e" stroke-width="2"/>
    <text x="450" y="50" class="flow-title" text-anchor="middle" style="font-size:19px">Admissão no Programa</text>
    <text x="450" y="74" class="flow-title" text-anchor="middle" style="font-size:19px">H_Sex_Ostomy</text>
  </g>

  ${box("permissao", 180, 130, 540, 94, "#1ec07f", "Permissão", ["Solicitar permissão, em ambiente seguro, acolhedor e livre de julgamentos.", "Respeitar autonomia, intimidade e limites individuais."])}
  ${loopCircle(762, 178)}
  ${diamond("d1", 450, 306, 170, 56, ["Usuário autoriza", "a discussão?"])}
  ${alt("nao1", 30, 266, 210, 82, ["Continuidade do atendimento", "clínico geral. Informar", "disponibilidade futura"])}
  ${box("informacao", 200, 394, 500, 96, "#fff2c4", "Informação Limitada", ["Informações gerais sobre imagem corporal, intimidade e adaptação", "ao estoma, disfunções sexuais possíveis, mitos e crenças."])}
  ${diamond("d2", 450, 568, 160, 52, ["Demandas", "específicas?"])}
  ${alt("nao2", 30, 528, 210, 80, ["Continuidade do", "acompanhamento. Informar", "disponibilidade futura"])}
  ${box("sugestoes", 200, 650, 500, 96, "#e2a8f0", "Sugestões Específicas", ["Avaliação clínica, histórico sexual e identificação de demandas.", "Intervenções de enfermagem individualizadas."])}
  ${diamond("d3", 450, 832, 176, 56, ["Necessita de suporte", "especializado?"])}
  <g class="fig-hot" data-node="terapia" tabindex="0" role="button" aria-label="Terapia Intensiva: encaminhamento para psicologia, urologia, fisioterapia, terapia sexual ou outros">
    <rect class="hot-shape" x="660" y="772" width="218" height="120" rx="14" fill="#e2a8f0" stroke="#1e1e1e" stroke-width="2"/>
    <text x="769" y="802" class="flow-title" text-anchor="middle">Terapia Intensiva</text>
    <line x1="680" y1="814" x2="858" y2="814" stroke="#1e1e1e" stroke-width="1.2"/>
    <text x="769" y="837" class="flow-body" text-anchor="middle" style="font-size:14.5px">Encaminhamento para</text>
    <text x="769" y="857" class="flow-body" text-anchor="middle" style="font-size:14.5px">psicologia, urologia, fisioterapia,</text>
    <text x="769" y="877" class="flow-body" text-anchor="middle" style="font-size:14.5px">terapia sexual e outros</text>
  </g>
  <g class="fig-hot" data-node="avaliacao" tabindex="0" role="button" aria-label="Avaliação, Revisão e Reflexão">
    <rect class="hot-shape" x="180" y="920" width="540" height="116" rx="14" fill="#1ec07f" stroke="#1e1e1e" stroke-width="2"/>
    <text x="450" y="950" class="flow-title" text-anchor="middle">Avaliação / Revisão / Reflexão</text>
    <line x1="204" y1="962" x2="696" y2="962" stroke="#1e1e1e" stroke-width="1.2"/>
    <text x="450" y="984" class="flow-body" text-anchor="middle" style="font-size:14.5px">Monitoramento de mudanças e identificação de novas demandas.</text>
    <text x="450" y="1004" class="flow-body" text-anchor="middle" style="font-size:14.5px">Efetividade das intervenções.</text>
    <text x="450" y="1024" class="flow-body" text-anchor="middle" style="font-size:14.5px">Intervalo entre consultas: mínimo trimestral, ajustável às necessidades.</text>
  </g>
  ${loopCircle(450, 1080)}
</svg>`;
  return raw(svg);
}

/* Versão em lista para telas estreitas (mesma interação) */
export function fluxogramaLista() {
  const n = (id, cls, t, s = "") => `<li><button type="button" class="fl-node ${cls}" data-node="${id}"><strong>${t}</strong>${s ? `<span>${s}</span>` : ""}</button></li>`;
  return raw(`<ol class="flow-list" aria-label="Etapas do fluxograma">
    ${n("admissao", "fl-start", "Admissão no programa")}
    ${n("permissao", "fl-green", "Permissão", "Ambiente seguro; respeitar autonomia e limites")}
    ${n("d1", "fl-dec", "Usuário autoriza a discussão?")}
    <li class="fl-branch">${n("nao1", "fl-gray", "Não: continuidade do atendimento clínico geral", "Informar disponibilidade futura")}</li>
    ${n("informacao", "fl-yellow", "Sim: Informação Limitada", "Imagem corporal, intimidade, disfunções, mitos")}
    ${n("d2", "fl-dec", "Demandas específicas?")}
    <li class="fl-branch">${n("nao2", "fl-gray", "Não: continuidade do acompanhamento", "Informar disponibilidade futura")}</li>
    ${n("sugestoes", "fl-lilac", "Sim: Sugestões Específicas", "Avaliação clínica, histórico sexual, plano individual")}
    ${n("d3", "fl-dec", "Necessita de suporte especializado?")}
    <li class="fl-branch">${n("terapia", "fl-lilac", "Sim: Terapia Intensiva", "Encaminhamento para psicologia, urologia, fisioterapia, terapia sexual")}</li>
    ${n("avaliacao", "fl-green", "Avaliação, Revisão e Reflexão", "Mínimo trimestral, ajustável")}
    ${n("loop", "fl-green", "Loop: processo contínuo", "Permissão renovada a cada encontro")}
  </ol>`);
}

export function fluxogramaLegenda() {
  return raw(`<div class="flow-legend">
    <div class="box"><h4>Legenda</h4><div><ul class="legend-list">
      <li><span class="lg lg-ini"></span>Início</li><li><span class="lg lg-loop"></span>Loop: processo contínuo</li>
      <li><span class="lg lg-proc"></span>Processo-ação</li><li><span class="lg lg-line"></span>Fluxo sugerido</li>
      <li><span class="lg lg-dec"></span>Ponto de decisão</li><li><span class="lg lg-gray"></span>Caminho alternativo</li>
      <li></li><li><span class="lg lg-green"></span>Loop, processo contínuo</li>
    </ul></div></div>
    <div class="box"><h4>Observações</h4><div><p style="margin:0">O acompanhamento é longitudinal e contínuo, com a permissão renovada a cada encontro, respeitando a autonomia da pessoa cuidada. O processo é não linear: o usuário pode retornar a qualquer fase, conforme necessidade. Os intervalos sugeridos podem ser ajustados conforme as demandas clínicas e individuais, com teleatendimentos intermediários sempre que necessário.</p></div></div>
  </div>`);
}
