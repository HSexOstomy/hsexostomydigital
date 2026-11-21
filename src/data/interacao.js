/* Interação: registros de eventos, notícias e documentos.
   Tudo vem do painel de edição (conteudo/eventos.json, noticias.json, documentos.json e interacao.json). */
import { C, arr, txt, asset } from "../core/content.js";
import { slug } from "../core/dom.js";

const limpo = (x) => txt(x).trim();
const dataISO = (v) => (/^\d{4}-\d{2}-\d{2}/.test(limpo(v)) ? limpo(v).slice(0, 10) : "");
const porData = (a, b) => (b.data || "").localeCompare(a.data || "") || a.titulo.localeCompare(b.titulo, "pt-BR");

/* Endereço de cada item: gerado a partir do título (sem acentos), sem repetir */
function comIds(lista) {
  const vistos = new Map();
  return lista.map((x) => {
    const base = slug(x.titulo) || "item";
    const n = (vistos.get(base) || 0) + 1; vistos.set(base, n);
    return { ...x, id: n > 1 ? `${base}-${n}` : base };
  });
}

const link = (url) => { const u = limpo(url); return /^(https?:|mailto:|#)/i.test(u) ? u : asset(u); };

export const CATEGORIAS_NOTICIA = { noticia: "Notícia", aviso: "Aviso", publicacao: "Publicação", evento: "Evento", conquista: "Conquista" };
export const CATEGORIAS_DOC = { manual: "Manuais e guias", artigo: "Artigos e publicações", apresentacao: "Apresentações", formulario: "Formulários e instrumentos", educativo: "Materiais educativos", outro: "Outros" };
export const MODALIDADES = { presencial: "Presencial", online: "On-line", hibrido: "Híbrido" };

export const eventos = comIds(arr(C.eventos.eventos).filter((e) => e && limpo(e.titulo)).map((e) => ({
  titulo: limpo(e.titulo), data: dataISO(e.data), horario: limpo(e.horario), local: limpo(e.local),
  modalidade: MODALIDADES[limpo(e.modalidade)] || limpo(e.modalidade), publico: limpo(e.publico),
  resumo: txt(e.resumo), capa: asset(e.capa), texto: txt(e.texto),
  galeria: arr(e.galeria).filter((g) => g && limpo(g.imagem)).map((g) => ({ src: asset(g.imagem), legenda: txt(g.legenda) })),
  links: arr(e.links).filter((l) => l && limpo(l.url)).map((l) => ({ rotulo: limpo(l.rotulo) || "Abrir link", url: link(l.url) })),
  comentarios: e.comentarios !== false
})).sort(porData));

export const noticias = comIds(arr(C.noticias.noticias).filter((n) => n && limpo(n.titulo)).map((n) => ({
  titulo: limpo(n.titulo), data: dataISO(n.data), categoria: CATEGORIAS_NOTICIA[limpo(n.categoria)] || "",
  resumo: txt(n.resumo), imagem: asset(n.imagem), texto: txt(n.texto),
  linkTexto: limpo(n.linkTexto), linkUrl: limpo(n.linkUrl) ? link(n.linkUrl) : "", destaque: n.destaque === true
})).sort((a, b) => (b.destaque - a.destaque) || porData(a, b)));

export const documentos = arr(C.documentos.documentos).filter((d) => d && limpo(d.titulo) && (limpo(d.arquivo) || limpo(d.link))).map((d) => {
  const url = limpo(d.link) ? link(d.link) : asset(d.arquivo);
  const e = (url.split("?")[0].match(/\.([a-z0-9]{2,5})$/i)?.[1] || "").toLowerCase();
  const ext = ["pdf", "doc", "docx", "ppt", "pptx", "xls", "xlsx", "zip", "png", "jpg", "jpeg", "webp", "txt", "rtf", "odt"].includes(e) ? e : "";
  return { titulo: limpo(d.titulo), descricao: txt(d.descricao), categoria: limpo(d.categoria) || "outro", data: dataISO(d.data), url, ext, externo: !!limpo(d.link) };
}).sort(porData);
