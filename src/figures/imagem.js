/* Figuras originais do manual (imagens em alta resolução) com áreas clicáveis invisíveis.
   Nada é desenhado por cima do conteúdo: a área só ganha contorno ao passar o mouse, ao focar ou quando está ativa. */
import { html, raw } from "../core/dom.js";

export const FIG = {
  teoria: { src: "assets/img/fig1-teoria.webp", w: 1700, h: 856, alt: "Figura 1 do manual: diagrama do modelo teórico da Teoria de Enfermagem de Reabilitação para o Bem-Viver, com Enfermeira, Enfermagem de Reabilitação e Pessoa Cuidada no centro de um oval, atravessados por Ambiente e Tempo, sob o Bem-Viver." },
  explissit: { src: "assets/img/fig2-explissit.webp", w: 1395, h: 783, alt: "Figura 2 do manual: modelo EX-PLISSIT. Um círculo com o ciclo autoconsciência, refletir, revisar, conhecimento e desafiar suposições. No centro, a Permissão (P) com refletir e revisar; ao redor, as pétalas Terapia Intensiva (IT), Informação Limitada (LI) e Sugestões Específicas (SS), cada uma com refletir e revisar." },
  fluxograma: { src: "assets/img/fig3-fluxograma.webp", w: 1700, h: 2097, alt: "Figura 3 do manual: fluxograma do programa, da admissão à Permissão, decisões sobre autorização, demandas específicas e suporte especializado, Informação Limitada, Sugestões Específicas, Terapia Intensiva e Avaliação, Revisão e Reflexão, com loop contínuo." },
  permissao: { src: "assets/img/fig4-permissao.webp", w: 1700, h: 1095, alt: "Figura 4 do manual: como aplicar a Permissão em cinco passos (prepare o ambiente, solicite permissão, respeite a escolha do indivíduo, inicie o diálogo, normalize e fortaleça) e dois exemplos para iniciar a discussão." },
  revisao: { src: "assets/img/fig5-revisao.webp", w: 1700, h: 945, alt: "Figura 5 do manual: Revisão em cinco passos (revisão contínua, monitoramento, avaliação, identificar, reorientar) e dois exemplos para iniciar a revisão." },
  rede: { src: "assets/img/fig6-rede.webp", w: 1700, h: 1456, alt: "Figura 6 do manual: rede de cuidados ao homem com estoma, com o homem ao centro como protagonista, ligado à Atenção Primária, serviços especializados, equipe multiprofissional, serviço de apoio e grupos de apoio, e os padrões intercolaborativos." }
};

/* Áreas clicáveis em % da imagem: [id, tipo, x, y, w, h] (elipse usa cx, cy, rx, ry) */
export const AREAS = {
  explissit: [
    ["revisao", "ellipse", 68.4, 52, 31.2, 54, "Ciclo de reflexão e revisão (círculo externo)"],
    ["terapia", "ellipse", 55.5, 41, 11.5, 15, "Terapia Intensiva (IT)"],
    ["informacao", "ellipse", 82, 43, 11.5, 15, "Informação Limitada (LI)"],
    ["sugestoes", "ellipse", 68.4, 73, 8, 18, "Sugestões Específicas (SS)"],
    ["permissao", "ellipse", 68.4, 53, 10.4, 13.5, "Permissão (P)"]
  ],
  fluxograma: [
    ["admissao", "rect", 38.5, 8.2, 25, 6.2, "Admissão no programa"],
    ["permissao", "rect", 23.5, 16.1, 56, 6.3, "Permissão"],
    ["loop", "ellipse", 83, 19.2, 2.6, 2.3, "Loop"],
    ["d1", "diamond", 39, 23.8, 24, 6.8, "Usuário autoriza a discussão?"],
    ["nao1", "rect", 10.2, 25.8, 23.9, 5, "Não: continuidade do atendimento clínico geral"],
    ["informacao", "rect", 23.5, 32.2, 56, 7.8, "Informação Limitada"],
    ["d2", "diamond", 39, 41.3, 24, 7.6, "Demandas específicas?"],
    ["nao2", "rect", 10.2, 42.6, 23.9, 3.7, "Não: continuidade do acompanhamento"],
    ["sugestoes", "rect", 23.8, 50, 55.5, 8, "Sugestões Específicas"],
    ["d3", "diamond", 39, 60.5, 24, 7.5, "Necessita de suporte especializado?"],
    ["terapia", "rect", 66.3, 62.1, 23, 9.7, "Terapia Intensiva"],
    ["avaliacao", "rect", 23.8, 72.5, 55.5, 9.1, "Avaliação, Revisão e Reflexão"],
    ["loop", "ellipse", 50.5, 84.8, 2.6, 2.3, "Loop: processo contínuo"]
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
  return raw(`<div class="fig-int fig-mini" style="aspect-ratio:${f.w}/${f.h}"><img src="${f.src}" alt="Fluxograma do programa com a etapa atual destacada" width="${f.w}" height="${f.h}" loading="lazy"><svg class="fig-int-svg" viewBox="0 0 100 ${(100 * ratio).toFixed(2)}" preserveAspectRatio="none" aria-hidden="true">${a}</svg></div>`);
}

export function figuraImg(nome, extra = "") {
  const f = FIG[nome];
  return html`<a class="fig-img ${extra}" href="${f.src}" target="_blank" rel="noopener" title="Abrir em tamanho original"><img src="${f.src}" alt="${f.alt}" width="${f.w}" height="${f.h}" loading="lazy" decoding="async"></a>`;
}
