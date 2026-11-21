/* Capacitação profissional: módulos com conteúdo clínico baseado no manual H_Sex_Ostomy.
   Tipos de alerta: seguranca (risco ao paciente), erro (erro comum na prática), etica (ética e registro), dica (pérola clínica). */
import { C, arr, txt } from "../core/content.js";
import { slug } from "../core/dom.js";

/* O conteúdo dos módulos fica em conteudo/capacitacao.json (editável pelo painel). */
const TIPOS = ["seguranca", "erro", "etica", "dica"];

export const modulos = arr(C.capacitacao.modulos).filter((m) => m && txt(m.titulo)).map((m) => ({
  id: txt(m.id) || slug(txt(m.titulo)),
  titulo: txt(m.titulo),
  min: Number(m.min) || 0,
  secoes: arr(m.secoes).map(txt).filter(Boolean),
  objetivo: txt(m.objetivo),
  blocos: arr(m.blocos).filter((b) => b && (b.titulo || arr(b.texto).length)).map((b) => ({ titulo: txt(b.titulo), texto: arr(b.texto).map(txt).filter(Boolean) })),
  alertas: arr(m.alertas).filter((a) => a && txt(a.texto)).map((a) => [TIPOS.includes(a.tipo) ? a.tipo : "dica", txt(a.texto)]),
  vinheta: txt(m.vinheta),
  pratique: arr(m.pratique).filter((q) => q && txt(q.pergunta)).map((q) => ({
    pergunta: txt(q.pergunta),
    opcoes: arr(q.opcoes).filter((o) => o && txt(o.t)).map((o) => ({ t: txt(o.t), feedback: txt(o.feedback), certo: o.certo === true }))
  }))
}));

export const TIPO_ALERTA = {
  seguranca: ["Segurança do paciente", "alerta"],
  erro: ["Erro comum", "nota"],
  etica: ["Ética e registro", "info"],
  dica: ["Pérola clínica", "ok"]
};
