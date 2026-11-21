/* Roteador por hash com carregamento sob demanda, títulos, foco e realce do menu */
import { $, $$ } from "./dom.js";

const SITE = "H_Sex_Ostomy® Digital";

export const routes = {
  inicio:         { load: () => import("../pages/inicio.js"), titulo: "Início" },
  sobre:          { load: () => import("../pages/sobre.js"), titulo: "O projeto", grupo: "sobre" },
  equipe:         { load: () => import("../pages/sobre.js"), titulo: "Equipe e ficha técnica", grupo: "sobre" },
  contato:        { load: () => import("../pages/sobre.js"), titulo: "Contato", grupo: "sobre" },
  programa:       { load: () => import("../pages/programa.js"), titulo: "Componentes do Programa", grupo: "programa" },
  fundamentos:    { load: () => import("../pages/fundamentos.js"), titulo: "Fundamentos", grupo: "programa" },
  fluxograma:     { load: () => import("../pages/fluxograma.js"), titulo: "Fluxograma", grupo: "programa" },
  manual:         { load: () => import("../pages/manual.js"), titulo: "Manual", grupo: "programa" },
  sintese:        { load: () => import("../pages/sintese.js"), titulo: "Síntese de bolso", grupo: "programa" },
  consulta:       { load: () => import("../pages/consulta.js"), titulo: "Na consulta", grupo: "ferramentas" },
  orientacoes:    { load: () => import("../pages/orientacoes.js"), titulo: "Orientações ao paciente", grupo: "ferramentas" },
  calculadoras:   { load: () => import("../pages/calculadoras.js"), titulo: "Calculadoras", grupo: "ferramentas" },
  iief:           { load: () => import("../pages/calculadoras.js"), titulo: "IIEF-15", grupo: "ferramentas" },
  qsm:            { load: () => import("../pages/calculadoras.js"), titulo: "QS-M", grupo: "ferramentas" },
  planejador:     { load: () => import("../pages/planejador.js"), titulo: "Planejador de cuidados", grupo: "ferramentas" },
  encaminhamento: { load: () => import("../pages/encaminhamento.js"), titulo: "Encaminhamento e rede", grupo: "ferramentas" },
  implantacao:    { load: () => import("../pages/implantacao.js"), titulo: "Implantação e indicadores", grupo: "ferramentas" },
  capacitacao:    { load: () => import("../pages/capacitacao.js"), titulo: "Formação de Habilidades", grupo: "aprenda" },
  casos:          { load: () => import("../pages/casos.js"), titulo: "Simulação clínica", grupo: "aprenda" },
  mitos:          { load: () => import("../pages/mitos.js"), titulo: "Mito ou fato", grupo: "aprenda" },
  eventos:        { load: () => import("../pages/interacao.js"), titulo: "Registros de eventos", grupo: "interacao" },
  noticias:       { load: () => import("../pages/interacao.js"), titulo: "Notícias", grupo: "interacao" },
  documentos:     { load: () => import("../pages/interacao.js"), titulo: "Documentos", grupo: "interacao" },
  workshop:       { load: () => import("../pages/workshop.js"), titulo: "Workshop", grupo: "workshop" },
  apresentar:     { load: () => import("../pages/apresentar.js"), titulo: "Apresentação do workshop", grupo: "workshop", modo: "present" },
  participar:     { load: () => import("../pages/participar.js"), titulo: "Participe do workshop", grupo: "workshop" }
};

/* Endereços da versão anterior continuam funcionando */
const aliases = { interacao: "eventos", registros: "eventos", aulas: "capacitacao", plano: "planejador", avaliacao: "calculadoras", trilha: "fluxograma", fluxo: "fluxograma", "": "inicio" };

export function parse(hash = location.hash) {
  const clean = decodeURIComponent(hash.replace(/^#\/?/, ""));
  const [nameRaw, ...rest] = clean.split("/");
  const name = aliases[nameRaw] ?? nameRaw;
  return { name: routes[name] ? name : "404", params: rest.filter(Boolean), path: clean };
}

let current = { name: null, path: null, cleanup: null };
let firstRender = true;

export async function navigate() {
  const app = $("#app");
  const route = parse();
  if (route.path === current.path && !firstRender) return;

  closeMenus();
  document.getElementById("toast")?.classList.remove("is-on");
  if (typeof current.cleanup === "function") { try { current.cleanup(); } catch { /* ignora */ } }

  const def = routes[route.name] || { load: () => import("../pages/404.js"), titulo: "Página não encontrada" };
  let mod;
  try {
    mod = (await def.load()).default;
  } catch (err) {
    console.error(err);
    app.innerHTML = '<div class="container" style="padding:4rem 0"><h1>Não foi possível carregar esta página</h1><p>Verifique sua conexão e tente novamente.</p><p><a class="btn btn-primary" href="#inicio">Voltar ao início</a></p></div>';
    return;
  }

  const ctx = { name: route.name, params: route.params, path: route.path };
  const samePage = current.name === route.name;
  document.body.classList.toggle("mode-present", def.modo === "present");

  app.innerHTML = String(mod.render(ctx));
  current = { name: route.name, path: route.path, cleanup: mod.mount ? mod.mount(app, ctx) : null };

  const title = (mod.title && mod.title(ctx)) || def.titulo;
  document.title = route.name === "inicio" ? `${SITE} · Programa de Reabilitação da Sexualidade Masculina` : `${title} · ${SITE}`;
  markNav(route);

  if (!firstRender) {
    if (!(samePage && mod.keepScroll)) window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    const h1 = $("h1", app);
    if (h1) { h1.setAttribute("tabindex", "-1"); h1.focus({ preventScroll: true }); }
  }
  firstRender = false;
}

function markNav(route) {
  const group = routes[route.name]?.grupo;
  $$(".nav-item").forEach((li) => li.classList.remove("is-current"));
  $$(".main-nav a, .footer-nav a").forEach((a) => {
    const target = a.getAttribute("href").slice(1);
    const match = target === route.name || (target === "calculadoras" && ["iief", "qsm"].includes(route.name)) || (target === "sobre" && route.name === "sobre");
    if (match) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
  });
  if (group) {
    const trig = $(`[aria-controls="menu-${group}"]`);
    trig?.closest(".nav-item")?.classList.add("is-current");
  }
}

export function closeMenus() {
  $$("[data-menu]").forEach((b) => b.setAttribute("aria-expanded", "false"));
  const nav = $(".main-nav"), tog = $("#menu-toggle");
  nav?.classList.remove("is-open");
  tog?.setAttribute("aria-expanded", "false");
  document.body.classList.remove("nav-open");
}
