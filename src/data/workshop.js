/* Workshop Participativo do H_Sex_Ostomy: roteiro de 3 horas, apresentação e atividades.
   Datas, horários, links e textos do roteiro ficam em conteudo/workshop.json (editável pelo painel). */
import { C, arr, txt } from "../core/content.js";

/* Tipo e recursos de cada bloco ficam aqui; título, duração e objetivo vêm do painel (conteudo/workshop.json). */
const ESTRUTURA = {
  abertura: { tipo: "expositivo", recursos: [] },
  quebragelo: { tipo: "atividade", recursos: [["participar/mitos", "Atividade no celular"]] },
  porque: { tipo: "expositivo", recursos: [["sobre", "O projeto"]] },
  fundamentos: { tipo: "expositivo", recursos: [["fundamentos", "Fundamentos"], ["programa", "Componentes"]] },
  acao: { tipo: "demonstracao", recursos: [["fluxograma", "Fluxograma"], ["consulta/permissao", "Na consulta"]] },
  informacao: { tipo: "atividade", recursos: [["consulta/informacao", "Falas por tema"], ["participar/falas", "Escolha a melhor fala"]] },
  intervalo: { tipo: "pausa", recursos: [] },
  sugestoes: { tipo: "demonstracao", recursos: [["calculadoras", "Calculadoras"], ["planejador", "Planejador"], ["encaminhamento", "Encaminhamento"]] },
  casos: { tipo: "atividade", recursos: [["participar/casos", "Simulação no celular"]] },
  discussao: { tipo: "discussao", recursos: [] },
  encerramento: { tipo: "encerramento", recursos: [] }
};

const W = C.workshop;

export const agenda = arr(W.agenda).filter((a) => a && txt(a.titulo)).map((a, i) => {
  const id = txt(a.id) || `bloco-${i + 1}`;
  const e = ESTRUTURA[id] || { tipo: "expositivo", recursos: [] };
  return { id, titulo: txt(a.titulo), min: Number(a.min) || 0, tipo: e.tipo, objetivo: txt(a.objetivo), recursos: e.recursos };
});

export const checklist = {
  antes: arr(W.checklistAntes).map(txt).filter(Boolean),
  cuidado: txt(W.checklistCuidado)
};

export const discussao = arr(W.discussao).filter((d) => d && txt(d.eixo)).map((d) => ({ eixo: txt(d.eixo), pergunta: txt(d.pergunta), apoio: txt(d.apoio) }));

/* Slides da apresentação. tipo: capa | pontos | figura | componentes | atividade | qr | pausa | discussao | encerramento */
export const slides = arr(C.slides.slides).filter(Boolean).map((s) => ({
  bloco: txt(s.bloco), tipo: txt(s.tipo) || "pontos", kicker: txt(s.kicker), titulo: txt(s.titulo), sub: txt(s.sub), texto: txt(s.texto),
  pontos: arr(s.pontos).map(txt).filter(Boolean), fonte: txt(s.fonte), fig: txt(s.fig), rota: txt(s.rota), notas: txt(s.notas)
}));
