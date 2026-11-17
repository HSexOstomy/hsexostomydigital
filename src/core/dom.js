/* Utilitários de DOM e renderização segura.
   html`` escapa automaticamente os valores interpolados; use raw() apenas para HTML confiável. */

class Raw {
  constructor(s) { this.s = s; }
  toString() { return this.s; }
}

const MAP = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
export const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => MAP[c]);
export const raw = (s) => new Raw(String(s ?? ""));

function part(v) {
  if (v == null || v === false || v === true) return "";
  if (v instanceof Raw) return v.s;
  if (Array.isArray(v)) return v.map(part).join("");
  return esc(v);
}

export function html(strings, ...values) {
  let out = strings[0];
  for (let i = 0; i < values.length; i++) out += part(values[i]) + strings[i + 1];
  return new Raw(out);
}

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* Delegação de eventos: on(root, "click", "[data-x]", (ev, el) => {}) */
export function on(root, type, selector, handler) {
  const fn = (ev) => {
    const el = ev.target.closest(selector);
    if (el && root.contains(el)) handler(ev, el);
  };
  root.addEventListener(type, fn);
  return () => root.removeEventListener(type, fn);
}

export const slug = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
export const norm = (s) => String(s ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
