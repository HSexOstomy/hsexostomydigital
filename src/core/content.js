/* Conteúdo editável da plataforma.
   Os textos, a equipe, as instituições, os links e o PDF do manual ficam na pasta conteudo/ (arquivos JSON),
   editados pelo painel Pages CMS (app.pagescms.org). A configuração do painel está em .pages.yml.
   Este módulo carrega tudo antes da primeira página e monta window.HSO_CONFIG. */

const ARQUIVOS = ["geral", "equipe", "instituicoes", "inicio", "sobre", "paginas", "orientacoes", "workshop", "slides", "capacitacao", "mitos", "falas", "casos", "manual", "interacao", "eventos", "noticias", "documentos"];

export const arr = (x) => (Array.isArray(x) ? x : []);
export const txt = (x) => (x == null ? "" : String(x));
const limpo = (x) => txt(x).trim();

/* Caminho de imagem ou arquivo enviado pelo painel: sempre relativo à raiz do site */
export const asset = (p) => limpo(p).replace(/^\/+/, "").replace(/^hsexostomydigital\//, "");

async function carregar(nome) {
  const r = await fetch(`conteudo/${nome}.json`, { cache: "no-cache" });
  if (!r.ok) throw new Error(`conteudo/${nome}.json: HTTP ${r.status}`);
  return r.json();
}

const lidos = await Promise.all(ARQUIVOS.map((n) => carregar(n).catch((e) => { console.error("Falha ao carregar conteúdo", e); return {}; })));
export const C = Object.fromEntries(ARQUIVOS.map((n, i) => [n, lidos[i] && typeof lidos[i] === "object" ? lidos[i] : {}]));

/* Data do workshop em AAAA-MM-DD, aceitando o formato salvo pelo seletor de data */
function dataISO(v) {
  const s = limpo(v);
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
  const d = s ? new Date(s) : null;
  if (!d || isNaN(d)) return "";
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

const pessoa = (p) => ({
  grupo: limpo(p.grupo) || "principal",
  papel: txt(p.papel), nome: limpo(p.nome), titulacao: txt(p.titulacao),
  foto: asset(p.foto), enquadramento: limpo(p.enquadramento) || "centro", bio: txt(p.bio), link: limpo(p.link)
});
const marca = (i) => ({ nome: txt(i.nome), logo: asset(i.logo), url: limpo(i.url) });

const G = C.geral, W = C.workshop, M = C.manual, I = C.interacao;
const pessoas = arr(C.equipe.pessoas).filter((p) => p && limpo(p.nome)).map(pessoa);

window.HSO_CONFIG = {
  autores: pessoas.filter((p) => p.grupo === "principal"),
  bolsistas: pessoas.filter((p) => p.grupo === "bolsistas"),
  colaboradores: pessoas.filter((p) => p.grupo === "colaboradores"),
  instituicoes: arr(C.instituicoes.realizacao).filter((i) => i && limpo(i.nome)).map(marca),
  apoio: arr(C.instituicoes.apoio).filter((i) => i && limpo(i.nome)).map(marca),
  contato: { email: limpo(G.contato?.email), cepTelefone: txt(G.contato?.cepTelefone), cepEmail: limpo(G.contato?.cepEmail) },
  /* Manual: conteudo/manual.json (versões antigas guardavam o PDF em geral.json) */
  manualPdf: limpo(M.pdfLink) || asset(M.pdfArquivo) || limpo(G.manualLink) || asset(G.manualArquivo),
  materiais: arr(M.materiais || G.materiais).filter((m) => m && limpo(m.titulo) && (limpo(m.link) || limpo(m.arquivo)))
    .map((m) => ({ titulo: limpo(m.titulo), url: limpo(m.link) || asset(m.arquivo) })),
  manual: {
    titulo: limpo(M.titulo) || "H_Sex_Ostomy®: Programa de Reabilitação da Sexualidade Masculina",
    edicao: limpo(M.edicao) || "1ª edição · 2026 · 75 páginas",
    autoria: limpo(M.autoria) || "Ariana Luiza Rabelo · Anderson Reis de Sousa · Escola de Enfermagem da UFBA",
    capa: asset(M.capa) || "assets/img/capa.webp"
  },
  interacao: {
    comentarios: I.comentariosAtivos !== false,
    email: limpo(I.emailComentarios),
    avisoComentarios: txt(I.avisoComentarios),
    mensagemSucesso: txt(I.mensagemSucesso)
  },
  rodape: { descricao: txt(G.rodapeDescricao), aviso: txt(G.rodapeAviso) },
  workshop: {
    data: dataISO(W.data),
    horario: limpo(W.horario) || "19:00",
    duracaoMin: Number(W.duracaoMin) || 180,
    modalidade: txt(W.modalidade),
    linkMeet: limpo(W.linkMeet),
    linkPreTeste: limpo(W.linkPreTeste),
    linkPosTeste: limpo(W.linkPosTeste),
    linkMural: limpo(W.linkMural),
    muralTitulo: limpo(W.muralTitulo) || "Mural de opiniões",
    muralTexto: txt(W.muralTexto),
    enderecoSite: limpo(W.enderecoSite) || "https://hsexostomy.github.io/hsexostomydigital/"
  },
  /* Contador de visitas GoatCounter: só o nome da conta (ex.: hsexostomy) */
  contador: limpo(G.contadorGoatcounter).toLowerCase().replace(/^https?:\/\//, "").replace(/\.goatcounter\.com.*$/, ""),
  versao: txt(G.versao)
};
