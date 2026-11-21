/* Figuras originais do manual (imagens em alta resolução) com áreas clicáveis invisíveis.
   Nada é desenhado por cima do conteúdo: a área só ganha contorno ao passar o mouse, ao focar ou quando está ativa. */
import { html, raw } from "../core/dom.js";

export const FIG = {
  teoria: { src: "assets/img/fig1-teoria.webp", w: 1700, h: 856, alt: "Figura 1 do manual: diagrama do modelo teórico da Teoria de Enfermagem de Reabilitação para o Bem-Viver, com Enfermeira, Enfermagem de Reabilitação e Pessoa Cuidada no centro de um oval, atravessados por Ambiente e Tempo, sob o Bem-Viver." },
  explissit: { src: "assets/img/fig2-explissit-pt.webp", w: 881, h: 522, alt: "Figura 2 do manual: modelo EX-PLISSIT em português. Um círculo com o ciclo autoconsciência, reflexão, revisão, conhecimento e questionar pressupostos. No centro, a Permissão (P) com reflexão e revisão; ao redor, Terapia Intensiva (TI), Informação Limitada (IL) e Sugestões Específicas (SE), cada uma com reflexão e revisão." },
  fluxograma: { src: "assets/img/fig3-fluxograma-v2.webp", w: 1299, h: 1726, alt: "Figura 3 do manual: fluxograma do Programa, da consulta para admissão à Permissão, decisões sobre autorização, demandas específicas e suporte especializado, Informação Limitada, Sugestões Específicas, Terapia Intensiva e Avaliação, Revisão e Reflexão, com loop contínuo." },
  permissao: { src: "assets/img/fig4-permissao.webp", w: 1700, h: 1095, alt: "Figura 4 do manual: como aplicar a Permissão em cinco passos (prepare o ambiente, solicite permissão, respeite a escolha do indivíduo, inicie o diálogo, normalize e fortaleça) e dois exemplos para iniciar a discussão." },
  revisao: { src: "assets/img/fig5-revisao.webp", w: 1700, h: 945, alt: "Figura 5 do manual: Revisão em cinco passos (revisão contínua, monitoramento, avaliação, identificar, reorientar) e dois exemplos para iniciar a revisão." },
  rede: { src: "assets/img/fig6-rede.webp", w: 1700, h: 1456, alt: "Figura 6 do manual: rede de cuidados ao homem com estoma, com o homem ao centro como protagonista, ligado à Atenção Primária, serviços especializados, equipe multiprofissional, serviço de apoio e grupos de apoio, e os padrões intercolaborativos." }
};

/* Áreas clicáveis em % da imagem: [id, tipo, x, y, w, h] (elipse usa cx, cy, rx, ry) */
export const AREAS = {
  explissit: [
    ["revisao", "ellipse", 67.9, 50.1, 30.8, 50.5, "Ciclo de reflexão e revisão (círculo externo)"],
    ["terapia", "ellipse", 55.1, 39.8, 11.4, 14, "Terapia Intensiva (TI)"],
    ["informacao", "ellipse", 81.3, 41.7, 11.4, 14, "Informação Limitada (IL)"],
    ["sugestoes", "ellipse", 67.9, 69.8, 7.9, 16.8, "Sugestões Específicas (SE)"],
    ["permissao", "ellipse", 67.9, 51, 10.3, 12.6, "Permissão (P)"]
  ],
  fluxograma: [
    ["admissao", "rect", 35.5, 0.7, 28.2, 6.3, "Consulta para admissão no Programa"],
    ["permissao", "rect", 17.9, 9.3, 64.6, 6.4, "Permissão"],
    ["loop", "ellipse", 86.9, 12.4, 2.7, 2, "Loop"],
    ["d1", "diamond", 35.6, 17.5, 27.5, 7.6, "Usuário autoriza a discussão?"],
    ["nao1", "rect", 2.5, 19.8, 27.3, 5.1, "Não: continuidade do atendimento clínico geral"],
    ["informacao", "rect", 17.9, 26.5, 64.7, 8.1, "Informação Limitada"],
    ["d2", "diamond", 35.7, 36.3, 27.4, 7.6, "Demandas específicas?"],
    ["nao2", "rect", 2.5, 36.3, 27.3, 5.1, "Não: continuidade do acompanhamento"],
    ["sugestoes", "rect", 18.2, 45.8, 64, 8.4, "Sugestões Específicas"],
    ["d3", "diamond", 35.7, 57.2, 27.5, 7.6, "Necessita de suporte especializado?"],
    ["terapia", "rect", 67.6, 58.9, 26.4, 10.1, "Terapia Intensiva"],
    ["avaliacao", "rect", 18.2, 70, 64, 9.6, "Avaliação, Revisão e Reflexão"],
    ["loop", "ellipse", 49.1, 83.3, 2.7, 2, "Loop: processo contínuo"]
  ]
};

function shape([id, tipo, a, b, c, d, rotulo], ratio, attr) {
  const common = `class="hot" ${attr}="${id}" tabindex="0" role="button" aria-label="${rotulo}"`;
  if (tipo === "ellipse") return `<ellipse ${common} cx="${a}" cy="${b * ratio}" rx="${c}" ry="${d * ratio}"/>`;
  if (tipo === "diamond") { const cx = a + c / 2, cy = (b + d / 2) * ratio; return `<polygon ${common} points="${a},${cy} ${cx},${b * ratio} ${a + c},${cy} ${cx},${(b + d) * ratio}"/>`; }
  return `<rect ${common} x="${a}" y="${b * ratio}" width="${c}" height="${d * ratio}" rx="1.2"/>`;
}

/* Figura com áreas clicáveis. attr: data-comp (programa) ou data-node (fluxograma) */
export function figuraInterativa(nome, attr = "data-node", { destaque = null } = {}) {
  const f = FIG[nome], ratio = f.h / f.w;
  const areas = AREAS[nome].map((a) => shape(a, ratio, attr)).join("");
  const hl = destaque ? AREAS[nome].filter((a) => a[0] === destaque).map((a) => shape(a, ratio, "data-hl").replace('class="hot"', 'class="hl"').replace(/tabindex="0" role="button" /, "")).join("") : "";
  return raw(`<div class="fig-int" style="aspect-ratio:${f.w}/${f.h}">
    <img src="${f.src}" alt="${f.alt}" width="${f.w}" height="${f.h}" loading="lazy" decoding="async">
    <svg class="fig-int-svg" viewBox="0 0 100 ${(100 * ratio).toFixed(2)}" preserveAspectRatio="none" aria-label="Áreas selecionáveis da figura">${hl}${areas}</svg>
  </div>`);
}

/* Miniatura com uma etapa realçada (simulação clínica) */
export function figuraDestaque(nome, id) {
  const f = FIG[nome], ratio = f.h / f.w;
  const a = AREAS[nome].filter((x) => x[0] === id).map((x) => shape(x, ratio, "data-hl").replace('class="hot"', 'class="hl"').replace(/tabindex="0" role="button" /, "")).join("");
  return raw(`<div class="fig-int fig-mini" style="aspect-ratio:${f.w}/${f.h}"><img src="${f.src}" alt="Fluxograma do Programa com a etapa atual destacada" width="${f.w}" height="${f.h}" loading="lazy"><svg class="fig-int-svg" viewBox="0 0 100 ${(100 * ratio).toFixed(2)}" preserveAspectRatio="none" aria-hidden="true">${a}</svg></div>`);
}

export function figuraImg(nome, extra = "") {
  const f = FIG[nome];
  return html`<a class="fig-img ${extra}" href="${f.src}" target="_blank" rel="noopener" title="Abrir em tamanho original"><img src="${f.src}" alt="${f.alt}" width="${f.w}" height="${f.h}" loading="lazy" decoding="async"></a>`;
}
