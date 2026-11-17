/* Workshop Participativo do H_Sex_Ostomy: roteiro de 3 horas, apresentação e atividades.
   Datas, horários e links ficam em site.config.js. */

export const agenda = [
  { id: "abertura", titulo: "Abertura e acolhimento", min: 10, tipo: "expositivo",
    objetivo: "Apresentar a equipe, os objetivos do encontro e os combinados.", recursos: [] },
  { id: "quebragelo", titulo: "Quebra-gelo: mito ou fato?", min: 15, tipo: "atividade",
    objetivo: "Mobilizar crenças e saberes prévios com afirmações rápidas.", recursos: [["participar/mitos", "Atividade no celular"]] },
  { id: "porque", titulo: "Por que falar de sexualidade na reabilitação?", min: 15, tipo: "expositivo",
    objetivo: "Situar a lacuna assistencial e o percurso de construção do programa.", recursos: [["sobre", "O projeto"]] },
  { id: "fundamentos", titulo: "Fundamentos: Bem-Viver e EX-PLISSIT", min: 20, tipo: "expositivo",
    objetivo: "Apresentar os dois referenciais e como se articulam.", recursos: [["fundamentos", "Fundamentos"], ["programa", "Componentes"]] },
  { id: "acao", titulo: "O programa em ação: fluxograma, Permissão e Revisão", min: 20, tipo: "demonstracao",
    objetivo: "Percorrer o fluxograma e treinar as falas de abertura e retomada.", recursos: [["fluxograma", "Fluxograma"], ["consulta/permissao", "Na consulta"]] },
  { id: "informacao", titulo: "Informação Limitada: o que e como falar", min: 15, tipo: "atividade",
    objetivo: "Explorar os seis temas do Quadro 2 e escolher falas adequadas.", recursos: [["consulta/informacao", "Falas por tema"], ["participar/falas", "Escolha a melhor fala"]] },
  { id: "intervalo", titulo: "Intervalo", min: 10, tipo: "pausa", objetivo: "", recursos: [] },
  { id: "sugestoes", titulo: "Sugestões Específicas e Terapia Intensiva", min: 20, tipo: "demonstracao",
    objetivo: "Demonstrar calculadoras, Planejador de Cuidados e encaminhamento.", recursos: [["calculadoras", "Calculadoras"], ["planejador", "Planejador"], ["encaminhamento", "Encaminhamento"]] },
  { id: "casos", titulo: "Atividade prática: casos clínicos", min: 25, tipo: "atividade",
    objetivo: "Em grupos, decidir condutas em casos fictícios e justificar com o programa.", recursos: [["participar/casos", "Casos no celular"]] },
  { id: "discussao", titulo: "Discussão participativa", min: 20, tipo: "discussao",
    objetivo: "Coletar percepções sobre aplicabilidade e contribuições para o aperfeiçoamento.", recursos: [] },
  { id: "encerramento", titulo: "Pós-teste e encerramento", min: 10, tipo: "encerramento",
    objetivo: "Orientar o preenchimento do pós-teste e da avaliação, e agradecer.", recursos: [] }
];

export const checklist = {
  antes: [
    "Confirmar que todos os inscritos responderam ao formulário de inscrição e pré-teste",
    "Enviar o link do Meet aos participantes (e-mail e WhatsApp)",
    "Testar o compartilhamento de tela com a apresentação em tela cheia",
    "Testar o QR code do modo participante em um celular",
    "Definir quem modera o chat e cronometra os blocos",
    "Preparar o link do pós-teste para enviar no encerramento"
  ],
  cuidado: "Não divulgue o link deste site antes de todos terem respondido ao pré-teste. O contato prévio com o conteúdo pode alterar as respostas da linha de base."
};

export const discussao = [
  { eixo: "Aceitabilidade", pergunta: "O que mais chamou sua atenção no programa? Houve algo que causou estranhamento ou resistência?", apoio: "Explore sentimentos e percepções gerais sobre a proposta." },
  { eixo: "Adequação", pergunta: "O programa responde às necessidades que você observa nos homens com estoma que atende ou atendeu? O que está faltando?", apoio: "Peça exemplos concretos da prática." },
  { eixo: "Viabilidade", pergunta: "O que seria preciso no seu serviço para aplicar o programa? Quais barreiras você antecipa (tempo, espaço, equipe, rede)?", apoio: "Relacione com as diretrizes de implantação (9.1)." },
  { eixo: "Aperfeiçoamento", pergunta: "O que você mudaria, acrescentaria ou retiraria do programa e deste ambiente digital?", apoio: "Registre as sugestões para a próxima versão." }
];

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
  { bloco: "casos", tipo: "qr", kicker: "Atividade em grupos", titulo: "Casos clínicos", texto: "Cada grupo escolhe um caso: Bruno, Seu Antônio ou Rafael. Decidam juntos e justifiquem com o programa.", rota: "participar/casos",
    notas: "Grupos de 3 a 5 pessoas (salas do Meet, se possível). 15 minutos em grupo, 10 minutos de socialização." },
  { bloco: "discussao", tipo: "discussao", kicker: "Discussão participativa", titulo: "Sua experiência importa",
    notas: "Siga os quatro eixos. Peça exemplos concretos e registre as contribuições." },
  { bloco: "encerramento", tipo: "encerramento", titulo: "Obrigado pela participação!", texto: "Agora, responda ao pós-teste e à avaliação da aplicabilidade do programa.",
    notas: "Envie o link do pós-teste no chat e aguarde alguns minutos. Lembre da declaração de 4 horas." }
];
