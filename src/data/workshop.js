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
export const slides = [
  { bloco: "abertura", tipo: "capa", titulo: "Workshop Participativo do H_Sex_Ostomy", sub: "Programa de Reabilitação da Sexualidade Masculina",
    notas: "Boas-vindas. Apresente a equipe e o tempo total (cerca de 3 horas). Lembre que a participação é voluntária e que haverá declaração." },
  { bloco: "abertura", tipo: "pontos", kicker: "Hoje vamos", titulo: "Objetivos do encontro",
    pontos: ["Conhecer os fundamentos e componentes do H_Sex_Ostomy", "Experimentar o programa em situações de cuidado", "Discutir aplicabilidade e possibilidades de implementação", "Reunir contribuições para o aperfeiçoamento do programa"],
    notas: "Combinados: câmeras opcionais, chat aberto, respeito às diferentes experiências. Não há respostas certas na discussão." },
  { bloco: "quebragelo", tipo: "qr", kicker: "Atividade", titulo: "Mito ou fato?", texto: "Aponte a câmera do celular para o código e abra a atividade. Responda às afirmações e veja a explicação de cada uma.", rota: "participar/mitos",
    notas: "Dê 5 minutos. Depois, peça que digitem no chat qual afirmação mais surpreendeu. Comente duas ou três." },
  { bloco: "porque", tipo: "pontos", kicker: "O problema", titulo: "Um silêncio que atravessa a reabilitação",
    pontos: ["O bem-estar sexual de pessoas com deficiência ainda é pouco abordado nos serviços", "Faltam instrumentos e materiais que orientem os profissionais", "Em homens com estoma, alterações corporais, psicossociais, funcionais e relacionais se somam", "Muitos esperam que alguém abra o espaço para falar"],
    notas: "Use a Apresentação do manual (p. 8). Pergunte: quem já teve uma conversa sobre sexualidade com um homem com estoma?" },
  { bloco: "porque", tipo: "percurso", kicker: "Como o programa foi construído", titulo: "Da pesquisa à prática",
    notas: "Destaque a cocriação com enfermeiras do serviço de reabilitação: o programa nasce da prática." },
  { bloco: "fundamentos", tipo: "citacao", kicker: "Teoria de Enfermagem de Reabilitação para o Bem-Viver", titulo: "A relação entre enfermeira e pessoa cuidada em reabilitação contribui para o Bem-Viver acontecer.", fonte: "Schoeller, 2025",
    notas: "Explique Reconhecimento (autoconfiança, autorrespeito, autoestima) e Esperançar. Reabilitação como reconstrução, não retorno ao padrão anterior." },
  { bloco: "fundamentos", tipo: "figura", fig: "teoria", kicker: "Figura 1", titulo: "Conceitos do modelo teórico",
    notas: "Mostre que pessoa cuidada e enfermeira compartilham conceitos e que ambiente e tempo atravessam a relação." },
  { bloco: "fundamentos", tipo: "figura", fig: "explissit", kicker: "Figura 2", titulo: "O modelo EX-PLISSIT",
    notas: "Permissão no centro. Reflexão (foco no paciente) e revisão (foco no profissional) em todos os níveis. A Terapia Intensiva pode acontecer em qualquer momento." },
  { bloco: "acao", tipo: "componentes", kicker: "O programa", titulo: "Cinco componentes, um acompanhamento contínuo",
    notas: "Permissão e Revisão são contínuas. Os níveis se articulam conforme a demanda, de forma não linear." },
  { bloco: "acao", tipo: "figura", fig: "fluxograma", kicker: "Figura 3", titulo: "Fluxograma do programa", rota: "fluxograma",
    notas: "Abra o fluxograma interativo e percorra um caminho com o “Não”: recusar a conversa também leva a ações de cuidado." },
  { bloco: "acao", tipo: "figura", fig: "permissao", kicker: "Figura 4", titulo: "Como aplicar a Permissão",
    notas: "Leia em voz alta um dos exemplos. Pergunte: como vocês costumam começar essa conversa?" },
  { bloco: "acao", tipo: "figura", fig: "revisao", kicker: "Figura 5", titulo: "Como aplicar a Revisão",
    notas: "A Revisão acontece no início e no final de cada encontro e inclui a reflexão do profissional sobre a própria prática." },
  { bloco: "informacao", tipo: "temas", kicker: "Informação Limitada", titulo: "Seis temas recorrentes",
    notas: "Não é preciso abordar todos de uma vez. Abra um tema no site e leia as falas sugeridas." },
  { bloco: "informacao", tipo: "qr", kicker: "Atividade", titulo: "Escolha a melhor fala", texto: "Três situações, três falas possíveis. Qual você usaria?", rota: "participar/falas",
    notas: "Dê 5 minutos. Discuta por que as falas incorretas fecham a conversa." },
  { bloco: "intervalo", tipo: "pausa", titulo: "Intervalo", texto: "Voltamos em 10 minutos.", notas: "Cronometre o retorno." },
  { bloco: "sugestoes", tipo: "pontos", kicker: "Sugestões Específicas", titulo: "Do histórico ao plano de cuidados",
    pontos: ["Histórico clínico e sexual (Quadro 6)", "Instrumentos validados: IIEF-15 e QS-M", "Nove diagnósticos NANDA-I com NOC, NIC e pontos de atenção", "Registro com escala NOC, prazo, atividades e encaminhamentos"],
    rota: "planejador", notas: "Demonstre o Planejador com o caso do Bruno: marque Função sexual prejudicada e gere a evolução." },
  { bloco: "sugestoes", tipo: "pontos", kicker: "Terapia Intensiva", titulo: "Quando a demanda excede o escopo",
    pontos: ["Sofrimento psicoemocional, disfunção erétil, infertilidade", "Conflitos relacionais significativos, ansiedade ou depressão", "Encaminhar com objetivo, fluxo formal e acompanhamento", "O encaminhamento não encerra o cuidado"],
    rota: "encaminhamento", notas: "Mostre o gerador de encaminhamento e a rede da Figura 6." },
  { bloco: "casos", tipo: "qr", kicker: "Atividade em grupos", titulo: "Simulação clínica", texto: "Cada grupo escolhe um caso: Bruno, Seu Antônio ou Rafael. Cada decisão muda a história e o vínculo. Decidam juntos e justifiquem.", rota: "participar/casos",
    notas: "Grupos de 3 a 5 pessoas (salas do Meet, se possível). 15 minutos em grupo, 10 minutos de socialização." },
  { bloco: "discussao", tipo: "discussao", kicker: "Discussão participativa", titulo: "Sua experiência importa",
    notas: "Siga os quatro eixos. Peça exemplos concretos e registre as contribuições." },
  { bloco: "encerramento", tipo: "encerramento", titulo: "Obrigado pela participação!", texto: "Agora, responda ao pós-teste e à avaliação da aplicabilidade do programa.",
    notas: "Envie o link do pós-teste no chat e aguarde alguns minutos. Lembre da declaração de 4 horas." }
];
