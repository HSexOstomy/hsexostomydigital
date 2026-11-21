/* Aulas, casos clínicos e atividades de fixação. Conteúdo elaborado a partir do manual;
   casos e personagens são fictícios. As frases de "Mito ou fato" ficam em conteudo/mitos.json (editável pelo painel). */
import { C, arr, txt } from "../core/content.js";

const q = (pergunta, opcoes) => ({ pergunta, opcoes });
const o = (t, feedback, certo = false) => ({ t, feedback, certo });

/* Simulação clínica ramificada: cada escolha leva a um novo ponto da história.
   fase = etapa do fluxograma (Figura 3) destacada; efeito = mudança no vínculo (-1, 0, +1). */
const op = (t, efeito, next, resposta, feedback) => ({ t, efeito, next, resposta, feedback });

/* Textos dos casos vêm de conteudo/casos.json (editável pelo painel). Os caminhos (next) e o efeito no vínculo ficam travados. */
const K = C.casos;
export const casos = arr(K.casos).filter((c) => c && txt(c.id) && txt(c.nome)).map((c) => ({
  id: txt(c.id), nome: txt(c.nome), idade: Number(c.idade) || txt(c.idade), inicio: txt(c.inicio),
  resumo: txt(c.resumo), tags: arr(c.tags).map(txt).filter(Boolean),
  nos: Object.fromEntries(arr(c.nos).filter((n) => n && txt(n.id)).map((n) => [txt(n.id), {
    fase: txt(n.fase), titulo: txt(n.titulo), cena: txt(n.cena), pergunta: txt(n.pergunta),
    opcoes: arr(n.opcoes).filter((o) => o && txt(o.t) && txt(o.next)).map((o) => op(txt(o.t), Number(o.efeito) || 0, txt(o.next), txt(o.resposta), txt(o.feedback)))
  }]))
}));

export const finais = Object.fromEntries(arr(K.finais).filter((f) => f && txt(f.id)).map((f) => [txt(f.id), { titulo: txt(f.titulo), tipo: txt(f.tipo), texto: txt(f.texto) }]));

/* Mito ou fato: fixação para o workshop e para estudo */
export const mitos = arr(C.mitos.mitos).filter((m) => m && txt(m.frase)).map((m) => ({ frase: txt(m.frase), fato: m.fato === true, explica: txt(m.explica) }));

/* Escolha a melhor fala */
/* Escolha a melhor fala: conteudo/falas.json (editável pelo painel) */
export const falasTreino = arr(C.falas.falas).filter((f) => f && txt(f.situacao)).map((f) => ({
  situacao: txt(f.situacao),
  opcoes: arr(f.opcoes).filter((x) => x && txt(x.t)).map((x) => o(txt(x.t), txt(x.feedback), x.certo === true))
}));
