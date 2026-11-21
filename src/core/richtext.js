/* Texto formatado vindo do painel (campo rich-text em HTML).
   Só passam marcações simples de texto; tudo o mais vira texto puro. */
import { raw, esc } from "./dom.js";
import { asset } from "./content.js";

const PERMITIDAS = new Set(["P", "BR", "STRONG", "B", "EM", "I", "U", "S", "A", "UL", "OL", "LI", "H2", "H3", "H4", "BLOCKQUOTE", "IMG", "HR", "FIGURE", "FIGCAPTION", "TABLE", "THEAD", "TBODY", "TR", "TH", "TD"]);
const RENOMEAR = { H1: "H2", H5: "H4", H6: "H4" };
const REMOVER = new Set(["SCRIPT", "STYLE", "IFRAME", "OBJECT", "EMBED", "FORM", "INPUT", "BUTTON", "SELECT", "TEXTAREA", "SVG", "MATH", "TEMPLATE", "NOSCRIPT", "LINK", "META"]);
const DESEMBRULHAR = new Set(["DIV", "SPAN", "SECTION", "ARTICLE", "FONT", "MARK", "SMALL", "SUP", "SUB", "CODE", "PRE"]);

const urlSegura = (u) => /^(https?:|mailto:|tel:|#)/i.test(u) || /^[\w./-]+$/.test(u);

function limpar(no, doc) {
  for (const filho of [...no.childNodes]) {
    if (filho.nodeType === 3) continue;
    if (filho.nodeType !== 1) { filho.remove(); continue; }
    let el = filho;
    if (RENOMEAR[el.tagName]) {
      const novo = doc.createElement(RENOMEAR[el.tagName]);
      while (el.firstChild) novo.appendChild(el.firstChild);
      el.replaceWith(novo); el = novo;
    }
    if (REMOVER.has(el.tagName)) { el.remove(); continue; }
    if (DESEMBRULHAR.has(el.tagName)) { limpar(el, doc); el.replaceWith(...el.childNodes); continue; }
    if (!PERMITIDAS.has(el.tagName)) { el.replaceWith(doc.createTextNode(el.textContent || "")); continue; }
    const href = el.getAttribute("href"), src = el.getAttribute("src"), alt = el.getAttribute("alt");
    for (const a of [...el.attributes]) el.removeAttribute(a.name);
    if (el.tagName === "A") {
      const h = (href || "").trim();
      if (h && urlSegura(h)) {
        el.setAttribute("href", /^https?:/i.test(h) || h.startsWith("#") || h.startsWith("mailto:") || h.startsWith("tel:") ? h : asset(h));
        if (/^https?:/i.test(h) || /\.(pdf|docx?|pptx?|xlsx?|zip)$/i.test(h)) { el.setAttribute("target", "_blank"); el.setAttribute("rel", "noopener"); }
      }
    }
    if (el.tagName === "IMG") {
      const s = (src || "").trim();
      if (!s || !urlSegura(s)) { el.remove(); continue; }
      el.setAttribute("src", /^https?:/i.test(s) ? s : asset(s));
      el.setAttribute("alt", alt || "");
      el.setAttribute("loading", "lazy");
    }
    limpar(el, doc);
  }
}

export function richText(valor) {
  const s = valor == null ? "" : String(valor).trim();
  if (!s) return "";
  if (!/<[a-z][\s\S]*>/i.test(s)) {
    return raw(s.split(/\n\s*\n/).map((p) => `<p>${esc(p).replace(/\n/g, "<br>")}</p>`).join(""));
  }
  const doc = new DOMParser().parseFromString(`<div>${s}</div>`, "text/html");
  const raiz = doc.body.firstElementChild;
  limpar(raiz, doc);
  return raw(raiz.innerHTML);
}
