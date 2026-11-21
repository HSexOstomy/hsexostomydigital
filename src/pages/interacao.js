/* Interação: registros de eventos (com comentários por e-mail), notícias e documentos */
import { html, $, $$, on, norm } from "../core/dom.js";
import { pageHead, icon } from "../core/ui.js";
import { richText } from "../core/richtext.js";
import { eventos, noticias, documentos, CATEGORIAS_DOC } from "../data/interacao.js";

const cfg = window.HSO_CONFIG || {};
const IC = cfg.interacao || {};

const MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
const dataLonga = (iso) => { if (!iso) return ""; const [a, m, d] = iso.split("-").map(Number); return `${d} de ${MESES[m - 1]} de ${a}`; };
const dataCurta = (iso) => { if (!iso) return ""; const [a, m, d] = iso.split("-"); return `${d}/${m}/${a}`; };
const externo = (u) => /^https?:/i.test(u);
const alvo = (u) => (externo(u) || /\.(pdf|docx?|pptx?|xlsx?|zip)$/i.test(u) ? html` target="_blank" rel="noopener"` : "");
const botao = (url, rotulo, cls = "btn") => externo(url) || /\.(pdf|docx?|pptx?|xlsx?|zip)$/i.test(url)
  ? html`<a class="${cls}" href="${url}" target="_blank" rel="noopener">${icon(externo(url) ? "external" : "download")}${rotulo}</a>`
  : html`<a class="${cls}" href="${url}">${rotulo} ${icon("arrow")}</a>`;

const vazio = (titulo, texto) => html`<div class="empty ia-empty">${icon("info")}<p><strong>${titulo}</strong></p><p class="small">${texto}</p></div>`;

const CRUMB = { eventos: "Registros de eventos", noticias: "Notícias", documentos: "Documentos" };
const ART = { eventos: "equipe-grupo", noticias: "enfermeira-fita", documentos: "enfermeiro-fita" };

/* ---------------------------------------------------------------- Eventos */
function listaEventos() {
  return html`<div class="page">
    ${pageHead({ kicker: "Interação", title: "Registros de eventos", lead: "Encontros, oficinas e atividades realizadas pelo grupo, com fotos, materiais e espaço para o seu comentário.", crumbs: [[null, CRUMB.eventos]], art: ART.eventos })}
    <div class="container section">
      ${eventos.length ? html`<div class="grid grid-3 ia-grid">${eventos.map((e) => html`<article class="card card-link ia-card">
          <a class="ia-cover" href="#eventos/${e.id}" tabindex="-1" aria-hidden="true">${e.capa ? html`<img src="${e.capa}" alt="" loading="lazy">` : html`<span class="ia-cover-vazia">${icon("users")}</span>`}</a>
          <div class="ia-card-body">
            <div class="tags">${e.data ? html`<span class="tag tag-navy">${icon("clock")}${dataCurta(e.data)}</span>` : ""}${e.modalidade ? html`<span class="tag">${e.modalidade}</span>` : ""}</div>
            <h2 class="h3"><a href="#eventos/${e.id}">${e.titulo}</a></h2>
            ${e.resumo ? html`<p class="small">${e.resumo}</p>` : ""}
            <p class="ia-mais small">Ver registro ${icon("arrow")}</p>
          </div>
        </article>`)}</div>`
      : vazio("Ainda não há eventos registrados.", "Os registros dos encontros realizados pelo grupo aparecerão aqui.")}
    </div>
  </div>`;
}

function formComentario(e) {
  if (!IC.comentarios || !e.comentarios) return "";
  if (!IC.email) return "";
  return html`<section class="section" aria-labelledby="coment-t">
    <div class="card ia-comentario">
      <div class="section-head"><div><p class="kicker">Participe</p><h2 id="coment-t">Deixe seu comentário</h2><p>${IC.avisoComentarios}</p></div></div>
      <form id="form-comentario" novalidate>
        <div class="form-grid">
          <div class="field"><label for="c-nome">Nome</label><input class="input" id="c-nome" name="nome" autocomplete="name" maxlength="120" required></div>
          <div class="field"><label for="c-email">E-mail <span class="muted">(opcional, para resposta)</span></label><input class="input" id="c-email" name="email" type="email" autocomplete="email" maxlength="160"></div>
          <div class="field field-wide"><label for="c-msg">Comentário</label><textarea class="textarea" id="c-msg" name="mensagem" maxlength="2000" required></textarea><span class="hint" id="c-cont">0 de 2000 caracteres</span></div>
          <div class="ia-honey" aria-hidden="true"><label for="c-site">Não preencha</label><input id="c-site" name="_honey" tabindex="-1" autocomplete="off"></div>
        </div>
        <div class="btn-row ia-enviar"><button class="btn btn-primary" type="submit">${icon("chat")}Enviar comentário</button><p class="small muted" id="c-status" role="status" aria-live="polite"></p></div>
      </form>
    </div>
  </section>`;
}

function evento(e) {
  return html`<div class="page">
    ${pageHead({ kicker: `Registro de evento${e.data ? ` · ${dataLonga(e.data)}` : ""}`, title: e.titulo, lead: e.resumo, crumbs: [["eventos", CRUMB.eventos], [null, e.titulo]] })}
    <div class="container section">
      <div class="ia-detalhe">
        <article class="ia-main">
          ${e.capa ? html`<img class="ia-capa" src="${e.capa}" alt="" loading="lazy">` : ""}
          ${e.texto ? html`<div class="prose ia-texto">${richText(e.texto)}</div>` : ""}
          ${e.galeria.length ? html`<section class="section"><h2 class="h3">Fotos</h2><div class="ia-galeria">${e.galeria.map((g) => html`<figure><a href="${g.src}" target="_blank" rel="noopener"><img src="${g.src}" alt="${g.legenda || "Foto do evento"}" loading="lazy"></a>${g.legenda ? html`<figcaption class="small muted">${g.legenda}</figcaption>` : ""}</figure>`)}</div></section>` : ""}
          ${e.links.length ? html`<section class="section"><h2 class="h3">Materiais e links</h2><div class="btn-row">${e.links.map((l) => botao(l.url, l.rotulo))}</div></section>` : ""}
        </article>
        <aside class="card ia-info">
          <h2 class="h4">Sobre o evento</h2>
          <dl>
            ${e.data ? html`<dt>Data</dt><dd>${dataLonga(e.data)}</dd>` : ""}
            ${e.horario ? html`<dt>Horário</dt><dd>${e.horario}</dd>` : ""}
            ${e.modalidade ? html`<dt>Modalidade</dt><dd>${e.modalidade}</dd>` : ""}
            ${e.local ? html`<dt>Local</dt><dd>${e.local}</dd>` : ""}
            ${e.publico ? html`<dt>Público</dt><dd>${e.publico}</dd>` : ""}
          </dl>
          <a class="btn btn-sm" href="#eventos">${icon("back")}Todos os eventos</a>
        </aside>
      </div>
      ${formComentario(e)}
    </div>
  </div>`;
}

/* ---------------------------------------------------------------- Notícias */
function listaNoticias() {
  return html`<div class="page">
    ${pageHead({ kicker: "Interação", title: "Notícias", lead: "Novidades, avisos e informações importantes do grupo H_Sex_Ostomy.", crumbs: [[null, CRUMB.noticias]], art: ART.noticias })}
    <div class="container section">
      ${noticias.length ? html`<div class="stack ia-noticias">${noticias.map((n) => html`<article class="card card-link ia-noticia ${n.imagem ? "tem-img" : ""}">
          ${n.imagem ? html`<img class="ia-thumb" src="${n.imagem}" alt="" loading="lazy">` : ""}
          <div>
            <div class="tags">${n.destaque ? html`<span class="tag tag-green">Destaque</span>` : ""}${n.categoria ? html`<span class="tag tag-violet">${n.categoria}</span>` : ""}${n.data ? html`<span class="tag">${dataCurta(n.data)}</span>` : ""}</div>
            <h2 class="h3"><a href="#noticias/${n.id}">${n.titulo}</a></h2>
            ${n.resumo ? html`<p class="small">${n.resumo}</p>` : ""}
            <p class="ia-mais small">Ler notícia ${icon("arrow")}</p>
          </div>
        </article>`)}</div>`
      : vazio("Ainda não há notícias publicadas.", "As novidades e os avisos do grupo aparecerão aqui.")}
    </div>
  </div>`;
}

function noticia(n) {
  return html`<div class="page">
    ${pageHead({ kicker: [n.categoria || "Notícia", n.data ? dataLonga(n.data) : ""].filter(Boolean).join(" · "), title: n.titulo, lead: n.resumo, crumbs: [["noticias", CRUMB.noticias], [null, n.titulo]] })}
    <div class="container section stack-lg ia-leitura">
      ${n.imagem ? html`<img class="ia-capa" src="${n.imagem}" alt="" loading="lazy">` : ""}
      ${n.texto ? html`<div class="prose ia-texto">${richText(n.texto)}</div>` : ""}
      <div class="btn-row">${n.linkUrl ? botao(n.linkUrl, n.linkTexto || "Saiba mais", "btn btn-primary") : ""}<a class="btn" href="#noticias">${icon("back")}Todas as notícias</a></div>
    </div>
  </div>`;
}

/* ---------------------------------------------------------------- Documentos */
const TIPO_ARQ = (d) => (d.externo && !d.ext ? "Link" : ({ pdf: "PDF", doc: "Word", docx: "Word", ppt: "PowerPoint", pptx: "PowerPoint", xls: "Excel", xlsx: "Excel", zip: "ZIP", png: "Imagem", jpg: "Imagem", jpeg: "Imagem", webp: "Imagem" }[d.ext] || (d.ext ? d.ext.toUpperCase() : "Arquivo")));

function listaDocs(filtro = "", busca = "") {
  const q = norm(busca);
  const lista = documentos.filter((d) => (!filtro || d.categoria === filtro) && (!q || norm(`${d.titulo} ${d.descricao}`).includes(q)));
  if (!documentos.length) return vazio("Ainda não há documentos disponíveis.", "Manuais, artigos, apresentações e outros arquivos do grupo aparecerão aqui.");
  if (!lista.length) return html`<p class="muted">Nenhum documento encontrado.</p>`;
  return html`<ul class="ia-docs" role="list">${lista.map((d) => html`<li class="card ia-doc">
      <span class="ia-doc-ic" aria-hidden="true">${icon(d.externo && !d.ext ? "external" : "book")}<b>${TIPO_ARQ(d)}</b></span>
      <div>
        <h2 class="h4">${d.titulo}</h2>
        ${d.descricao ? html`<p class="small">${d.descricao}</p>` : ""}
        <div class="tags"><span class="tag tag-navy">${CATEGORIAS_DOC[d.categoria] || "Outros"}</span>${d.data ? html`<span class="tag">${dataCurta(d.data)}</span>` : ""}</div>
      </div>
      <a class="btn btn-sm" href="${d.url}"${alvo(d.url)} aria-label="${d.externo ? "Abrir" : "Baixar"}: ${d.titulo}">${icon(d.externo ? "external" : "download")}${d.externo ? "Abrir" : "Baixar"}</a>
    </li>`)}</ul>`;
}

function paginaDocs() {
  const cats = Object.keys(CATEGORIAS_DOC).filter((c) => documentos.some((d) => d.categoria === c));
  return html`<div class="page">
    ${pageHead({ kicker: "Interação", title: "Documentos", lead: "Arquivos que o grupo disponibiliza: manuais, artigos, apresentações, formulários e materiais educativos.", crumbs: [[null, CRUMB.documentos]], art: ART.documentos })}
    <div class="container section stack">
      ${documentos.length > 3 ? html`<div class="ia-filtros">
        <div class="field"><label class="sr-only" for="doc-busca">Buscar documento</label><input class="input" id="doc-busca" type="search" placeholder="Buscar por título ou descrição"></div>
        ${cats.length > 1 ? html`<div class="pills" role="group" aria-label="Filtrar por categoria"><button class="pill-btn" type="button" data-cat="" aria-pressed="true">Todos</button>${cats.map((c) => html`<button class="pill-btn" type="button" data-cat="${c}" aria-pressed="false">${CATEGORIAS_DOC[c]}</button>`)}</div>` : ""}
      </div>` : ""}
      <div id="doc-lista">${listaDocs()}</div>
    </div>
  </div>`;
}

/* ---------------------------------------------------------------- Envio do comentário (FormSubmit) */
async function enviar(form, e) {
  const st = $("#c-status", form), bt = $("button[type=submit]", form);
  const d = Object.fromEntries(new FormData(form));
  if (d._honey) return;
  if (!d.nome.trim() || !d.mensagem.trim()) { st.textContent = "Preencha seu nome e o comentário."; (d.nome.trim() ? $("#c-msg", form) : $("#c-nome", form)).focus(); return; }
  if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) { st.textContent = "Confira o e-mail informado."; $("#c-email", form).focus(); return; }
  bt.disabled = true; st.textContent = "Enviando…";
  const corpo = {
    Evento: e.titulo, "Data do evento": dataLonga(e.data), Nome: d.nome.trim(), email: d.email.trim(), "Comentário": d.mensagem.trim(),
    "Página": location.href, _subject: `Comentário no site H_Sex_Ostomy: ${e.titulo}`, _template: "table", _captcha: "false"
  };
  const mailto = `mailto:${IC.email}?subject=${encodeURIComponent(corpo._subject)}&body=${encodeURIComponent(`${d.mensagem.trim()}\n\n${d.nome.trim()}`)}`;
  try {
    const r = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(IC.email)}`, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(corpo) });
    const j = await r.json().catch(() => ({}));
    if (r.ok && String(j.success) === "true") {
      form.reset(); $("#c-cont", form).textContent = "0 de 2000 caracteres";
      st.textContent = IC.mensagemSucesso || "Comentário enviado. Obrigado!";
    } else if (/activ/i.test(j.message || "")) {
      st.innerHTML = "";
      st.append("O envio de comentários ainda está sendo ativado pela equipe. Tente novamente mais tarde ou ");
      const a = Object.assign(document.createElement("a"), { href: mailto, textContent: "envie por e-mail" }); st.append(a, ".");
    } else throw new Error(j.message || `HTTP ${r.status}`);
  } catch (err) {
    console.error(err);
    st.innerHTML = "";
    st.append("Não foi possível enviar agora. Tente novamente ou ");
    const a = Object.assign(document.createElement("a"), { href: mailto, textContent: "envie por e-mail" }); st.append(a, ".");
  } finally { bt.disabled = false; }
}

/* ---------------------------------------------------------------- Página */
const achar = (ctx) => {
  if (!ctx.params[0]) return null;
  return (ctx.name === "eventos" ? eventos : ctx.name === "noticias" ? noticias : []).find((x) => x.id === ctx.params[0]) || "nao-encontrado";
};

function naoEncontrado(ctx) {
  return html`<div class="page">${pageHead({ kicker: "Interação", title: "Conteúdo não encontrado", lead: "Ele pode ter sido renomeado ou removido.", crumbs: [[ctx.name, CRUMB[ctx.name]], [null, "Não encontrado"]] })}
    <div class="container section"><a class="btn btn-primary" href="#${ctx.name}">${icon("back")}Voltar para ${CRUMB[ctx.name]}</a></div></div>`;
}

export default {
  render(ctx) {
    const item = achar(ctx);
    if (item === "nao-encontrado") return naoEncontrado(ctx);
    if (ctx.name === "eventos") return item ? evento(item) : listaEventos();
    if (ctx.name === "noticias") return item ? noticia(item) : listaNoticias();
    return paginaDocs();
  },
  title(ctx) {
    const item = achar(ctx);
    return item && item !== "nao-encontrado" ? item.titulo : CRUMB[ctx.name];
  },
  mount(root, ctx) {
    const offs = [];
    const item = achar(ctx);
    if (ctx.name === "eventos" && item && item !== "nao-encontrado") {
      const form = $("#form-comentario", root);
      if (form) {
        const aoEnviar = (ev) => { ev.preventDefault(); enviar(form, item); };
        form.addEventListener("submit", aoEnviar);
        offs.push(() => form.removeEventListener("submit", aoEnviar));
        offs.push(on(form, "input", "#c-msg", (_, el) => { $("#c-cont", form).textContent = `${el.value.length} de 2000 caracteres`; }));
      }
    }
    if (ctx.name === "documentos") {
      let cat = "", busca = "";
      const lista = $("#doc-lista", root);
      const redesenhar = () => { lista.innerHTML = String(listaDocs(cat, busca)); };
      offs.push(on(root, "click", "[data-cat]", (_, b) => { cat = b.dataset.cat; $$("[data-cat]", root).forEach((x) => x.setAttribute("aria-pressed", String(x === b))); redesenhar(); }));
      offs.push(on(root, "input", "#doc-busca", (_, el) => { busca = el.value; redesenhar(); }));
    }
    return () => offs.forEach((f) => typeof f === "function" && f());
  }
};
