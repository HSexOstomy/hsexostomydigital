/* Figura 2 do manual: Modelo EX-PLISSIT (Taylor; Davis, 2007), redesenhado em SVG.
   Pétalas e centro são interativos (data-comp). Rótulos em inglês (original) ou português. */
import { raw } from "../core/dom.js";

const L = {
  en: { self: "Self-awareness", reflect: "Reflect", review: "Review", knowledge: "Knowledge", challenge: "Challenge assumptions" },
  pt: { self: "Autoconsciência", reflect: "Refletir", review: "Revisar", knowledge: "Conhecimento", challenge: "Desafiar suposições" }
};

const CX = 548, CY = 318, R = 284;
const rad = (d) => (d * Math.PI) / 180;
const pt = (deg, r = R) => [CX + r * Math.cos(rad(deg)), CY + r * Math.sin(rad(deg))];
const f = (n) => n.toFixed(1);

function arcPath(a0, a1, r) {
  const [x0, y0] = pt(a0, r), [x1, y1] = pt(a1, r);
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  return `M${f(x0)} ${f(y0)} A${r} ${r} 0 ${large} 1 ${f(x1)} ${f(y1)}`;
}

function chevron(deg, r, color) {
  const [x, y] = pt(deg, r);
  const rot = deg + 90;
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)})"><path d="M-14 -9 L4 -9 L4 -16 L18 0 L4 16 L4 9 L-14 9 Z" fill="${color}" opacity=".9"/></g>`;
}

export function explissit({ lang = "pt", id = "exp" } = {}) {
  const t = L[lang] || L.pt;
  const rText = 252;
  const arc = arcPath(165, 418, rText);
  const len = (rText * Math.PI * (418 - 165)) / 180;
  const at = (px) => 165 + (px / len) * (418 - 165);
  const words = lang === "pt"
    ? [[t.self, 12], [t.reflect, 250], [t.review, 382], [t.knowledge, 506], [t.challenge, 706]]
    : [[t.self, 22], [t.reflect, 240], [t.review, 370], [t.knowledge, 500], [t.challenge, 660]];
  const arrows = lang === "pt" ? [218, 352, 474, 676] : [208, 338, 468, 628];
  const teal = "#5fc0c4";

  const petal = (cfg) => `
    <g class="fig-hot" data-comp="${cfg.comp}" tabindex="0" role="button" aria-label="${cfg.aria}">
      <ellipse class="hot-shape" cx="${cfg.x}" cy="${cfg.y}" rx="${cfg.rx}" ry="${cfg.ry}" transform="rotate(${cfg.rot} ${cfg.x} ${cfg.y})" fill="${cfg.fill}" stroke="${cfg.stroke}" stroke-width="5"/>
      <ellipse cx="${cfg.ix}" cy="${cfg.iy}" rx="${cfg.irx}" ry="${cfg.iry}" transform="rotate(${cfg.rot} ${cfg.ix} ${cfg.iy})" fill="none" stroke="${cfg.color}" stroke-width="3"/>
      <text x="${cfg.lx}" y="${cfg.ly}" class="exp-letter" fill="${cfg.color}" text-anchor="middle" style="font-size:44px">${cfg.label}</text>
      ${cfg.extra}
    </g>`;

  const tagText = (x, y, rot, txt, color = "#1a1a1a", size = 21) =>
    `<text x="${x}" y="${y}" transform="rotate(${rot} ${x} ${y})" class="exp-small" style="font-size:${size}px" fill="${color}" text-anchor="middle">${txt}</text>`;
  const miniArrow = (x, y, rot, color) =>
    `<g transform="translate(${x} ${y}) rotate(${rot})"><path d="M-16 -5 L4 -5 L4 -11 L16 0 L4 11 L4 5 L-16 5 Z" fill="${color}" stroke="#222" stroke-width="1"/></g>`;

  const svg = `
<svg class="fig-explissit" viewBox="0 0 848 640" role="group" aria-labelledby="${id}-t ${id}-d">
  <title id="${id}-t">Modelo EX-PLISSIT</title>
  <desc id="${id}-d">Círculo externo com o ciclo autoconsciência, reflexão, revisão, conhecimento e desafio de suposições. No centro, a Permissão, com reflexão e revisão. Ao redor, três pétalas: Terapia Intensiva, Informação Limitada e Sugestões Específicas, cada uma com reflexão e revisão. Selecione um componente para ver detalhes.</desc>
  <defs>
    <linearGradient id="${id}-ret" x1="1" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".95"/>
      <stop offset="1" stop-color="${teal}"/>
    </linearGradient>
    <path id="${id}-arc" d="${arc}"/>
  </defs>

  <circle cx="${CX}" cy="${CY}" r="${R}" fill="#cfeff1" stroke="#151515" stroke-width="4"/>
  <path d="${arcPath(70, 158, 262)}" fill="none" stroke="url(#${id}-ret)" stroke-width="16" stroke-linecap="round"/>
  ${(() => { const [x, y] = pt(160, 262); return `<g transform="translate(${f(x)} ${f(y)}) rotate(${160 + 90})"><path d="M-20 4 L0 -22 L20 4 Z" fill="${teal}"/></g>`; })()}

  <text class="exp-arc" style="font-size:23px">${words.map(([w, off]) => `<textPath href="#${id}-arc" startOffset="${off}">${w}</textPath>`).join("")}</text>
  ${arrows.map((px) => chevron(at(px), rText - 8, teal)).join("")}

  ${petal({ comp: "terapia", aria: "Terapia Intensiva (Intensive Therapy). Ver detalhes.", x: CX - 98, y: 250, rx: 112, ry: 68, rot: 32, fill: "#fbd3d3", stroke: "#d6302b",
    ix: CX - 82, iy: 260, irx: 68, iry: 34, color: "#d6302b", label: "IT", lx: CX - 92, ly: 276,
    extra: tagText(CX - 128, 196, 32, t.reflect, "#1a1a1a", 19) + tagText(CX - 158, 262, 54, t.review, "#1a1a1a", 19) + miniArrow(CX - 66, 214, 32, "#d6302b") + miniArrow(CX - 112, 298, 40, "#d6302b") })}
  ${petal({ comp: "informacao", aria: "Informação Limitada (Limited Information). Ver detalhes.", x: CX + 98, y: 250, rx: 112, ry: 68, rot: -32, fill: "#f8e6a0", stroke: "#1f1f1f",
    ix: CX + 82, iy: 260, irx: 68, iry: 34, color: "#c99a06", label: "LI", lx: CX + 96, ly: 276,
    extra: tagText(CX + 132, 198, -30, t.reflect, "#1a1a1a", 19) + tagText(CX + 160, 270, -54, t.review, "#1a1a1a", 19) + miniArrow(CX + 66, 214, 148, "#c99a06") + miniArrow(CX + 110, 300, 140, "#c99a06") })}
  ${petal({ comp: "sugestoes", aria: "Sugestões Específicas (Specific Suggestions). Ver detalhes.", x: CX, y: 462, rx: 66, ry: 112, rot: 0, fill: "#efc9ee", stroke: "#1f1f1f",
    ix: CX, iy: 474, irx: 38, iry: 74, color: "#b0279b", label: "SS", lx: CX, ly: 506,
    extra: tagText(CX - 44, 496, -88, t.reflect, "#1a1a1a", 15) + tagText(CX + 46, 496, 88, t.review, "#1a1a1a", 15) + miniArrow(CX - 36, 428, -90, "#b0279b") + miniArrow(CX + 36, 428, -90, "#b0279b") })}

  <g class="fig-hot" data-comp="permissao" tabindex="0" role="button" aria-label="Permissão (Permission giving), no centro do modelo. Ver detalhes.">
    <ellipse class="hot-shape" cx="${CX}" cy="${CY + 8}" rx="108" ry="78" fill="#eef4a6" stroke="#1d7a35" stroke-width="7"/>
    <path d="M${CX - 82} 300 Q ${CX - 98} 326 ${CX - 82} 352" fill="none" stroke="#1d7a35" stroke-width="8" stroke-linecap="round"/>
    <path d="M${CX - 90} 292 L ${CX - 74} 302 L ${CX - 92} 308 Z" fill="#1d7a35"/>
    <path d="M${CX - 90} 360 L ${CX - 74} 350 L ${CX - 92} 344 Z" fill="#1d7a35"/>
    <path d="M${CX + 82} 300 Q ${CX + 98} 326 ${CX + 82} 352" fill="none" stroke="#1d7a35" stroke-width="8" stroke-linecap="round"/>
    <path d="M${CX + 90} 292 L ${CX + 74} 302 L ${CX + 92} 308 Z" fill="#1d7a35"/>
    <path d="M${CX + 90} 360 L ${CX + 74} 350 L ${CX + 92} 344 Z" fill="#1d7a35"/>
    <text x="${CX}" y="${CY - 24}" class="exp-small" font-size="22" text-anchor="middle" fill="#1a1a1a">${t.reflect}</text>
    <circle cx="${CX}" cy="${CY + 10}" r="30" fill="none" stroke="#1d7a35" stroke-width="3"/>
    <text x="${CX}" y="${CY + 26}" class="exp-letter" fill="#1d7a35" text-anchor="middle" style="font-size:42px">P</text>
    <text x="${CX}" y="${CY + 64}" class="exp-small" font-size="22" text-anchor="middle" fill="#1a1a1a">${t.review}</text>
  </g>

  <g class="exp-key" transform="translate(8 432)">
    <rect width="236" height="44" rx="12" fill="#cfeff1" stroke="#151515" stroke-width="3"/>
    <text x="18" y="31" class="exp-small" style="font-size:24px;font-weight:800" fill="#151515">${lang === "pt" ? "Legenda" : "Key"}</text>
    <rect y="52" width="236" height="148" rx="12" fill="#cfeff1" stroke="#151515" stroke-width="3"/>
    <g class="exp-small" style="font-size:17px">
      <text x="16" y="84" fill="#1d7a35"><tspan font-weight="800">P</tspan><tspan x="56">${lang === "pt" ? "Permissão" : "Permission giving"}</tspan></text>
      <text x="16" y="116" fill="#a77d00"><tspan font-weight="800">LI</tspan><tspan x="56">${lang === "pt" ? "Informação Limitada" : "Limited Information"}</tspan></text>
      <text x="16" y="148" fill="#b0279b"><tspan font-weight="800">SS</tspan><tspan x="56">${lang === "pt" ? "Sugestões Específicas" : "Specific Suggestions"}</tspan></text>
      <text x="16" y="180" fill="#d6302b"><tspan font-weight="800">IT</tspan><tspan x="56">${lang === "pt" ? "Terapia Intensiva" : "Intensive Therapy"}</tspan></text>
    </g>
  </g>
</svg>`;
  return raw(svg);
}
