/* Conteúdo editável da plataforma.
   Os textos, a equipe, as instituições, os links e o PDF do manual ficam na pasta conteudo/ (arquivos JSON),
   editados pelo painel Pages CMS (app.pagescms.org). A configuração do painel está em .pages.yml.
   Este módulo carrega tudo antes da primeira página e monta window.HSO_CONFIG. */

const ARQUIVOS = ["geral", "equipe", "instituicoes", "inicio", "sobre", "workshop", "capacitacao", "mitos"];

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
  foto: asset(p.foto), bio: txt(p.bio), link: limpo(p.link)
});
const marca = (i) => ({ nome: txt(i.nome), logo: asset(i.logo), url: limpo(i.url) });

const G = C.geral, W = C.workshop;
const pessoas = arr(C.equipe.pessoas).filter((p) => p && limpo(p.nome)).map(pessoa);

window.HSO_CONFIG = {
  autores: pessoas.filter((p) => p.grupo === "principal"),
  bolsistas: pessoas.filter((p) => p.grupo === "bolsistas"),
  colaboradores: pessoas.filter((p) => p.grupo === "colaboradores"),
  instituicoes: arr(C.instituicoes.realizacao).filter((i) => i && limpo(i.nome)).map(marca),
  apoio: arr(C.instituicoes.apoio).filter((i) => i && limpo(i.nome)).map(marca),
  contato: { email: limpo(G.contato?.email), cepTelefone: txt(G.contato?.cepTelefone), cepEmail: limpo(G.contato?.cepEmail) },
  manualPdf: limpo(G.manualLink) || asset(G.manualArquivo),
  workshop: {
    data: dataISO(W.data),
    horario: limpo(W.horario) || "19:00",
    duracaoMin: Number(W.duracaoMin) || 180,
    modalidade: txt(W.modalidade),
    linkMeet: limpo(W.linkMeet),
    linkPreTeste: limpo(W.linkPreTeste),
    linkPosTeste: limpo(W.linkPosTeste),
    enderecoSite: limpo(W.enderecoSite) || "https://hsexostomy.github.io/hsexostomydigital/"
  },
  versao: txt(G.versao)
};
