/* Identidade, componentes e fundamentos do H_Sex_Ostomy (manual, pp. 8–20). */

export const identidade = {
  finalidade: "Apoiar enfermeiros na abordagem da saúde sexual e o Bem-Viver de homens com estomas de eliminação por meio de intervenções educativas, psicossociais e clínicas fundamentadas no método EX-PLISSIT e na Teoria de Enfermagem de Reabilitação para o Bem-Viver.",
  missao: "Instrumentalizar enfermeiros para abordagem da sexualidade de homens com estomas de eliminação em serviços de saúde na perspectiva da reabilitação para o Bem-Viver.",
  visao: "Ser reconhecido como um programa de referência para guiar a abordagem da sexualidade de homens com estomias de eliminação, na perspectiva da reabilitação para o Bem-Viver, reconhecido pela valorização da intersubjetividade, autonomia e reconstruções no processo de reabilitação.",
  valores: [
    ["Acolhimento", "A criação de um espaço seguro, livre de julgamentos, é condição inegociável para que o diálogo sobre sexualidade aconteça."],
    ["Reconhecimento", "Compromisso com a visibilidade das necessidades sexuais do homem com estoma, combatendo estigmas e crenças que impactam na busca pelo Bem-Viver."],
    ["Autonomia", "O paciente é o agente central de seu processo de reabilitação."],
    ["Intersubjetividade", "A reabilitação acontece no encontro entre sujeitos, de modo que a relação enfermeiro–paciente é constitutiva do cuidado."],
    ["Ética", "Exercício profissional com postura ética em todas as fases do cuidado de reabilitação, facilitando a busca pelo Bem-Viver da pessoa cuidada."]
  ],
  publico: [
    ["Usuários diretos do programa", "Enfermeiros(as) que utilizarão o H_Sex_Ostomy para orientar e estruturar a abordagem da sexualidade na consulta de enfermagem."],
    ["Pessoas beneficiárias do cuidado", "Homens com estomas de eliminação, reconhecidos como sujeitos ativos do processo de cuidado e de reconstrução em direção ao Bem-Viver."]
  ]
};

export const apresentacao = [
  "As necessidades relacionadas ao bem-estar sexual de pessoas com deficiência ainda são insuficientemente abordadas nos serviços de saúde, especialmente no âmbito da reabilitação. Na prática assistencial, a incorporação sistemática da sexualidade às consultas de enfermagem permanece limitada, sendo observada a escassez de instrumentos, tecnologias e materiais capazes de orientar os profissionais para uma abordagem qualificada dessa dimensão do cuidado. No contexto dos homens com estomas de eliminação, essa fragilidade assume particular relevância, considerando que a vivência da sexualidade pode ser atravessada por alterações corporais, repercussões psicossociais, mudanças na função e na satisfação sexual, além de barreiras relacionais e assistenciais.",
  "O H_Sex_Ostomy resulta de um estudo mais amplo desenvolvido a partir de diferentes etapas investigativas relacionadas à sexualidade de homens com estomas de eliminação e ao cuidado de enfermagem nesse campo. Previamente à sua construção, foram realizadas uma revisão de escopo, destinada ao mapeamento das evidências disponíveis acerca de intervenções na sexualidade de homens com estomas; uma observação participante no contexto de um serviço especializado de reabilitação de pessoas com estomas; e um estudo de métodos mistos, que possibilitou integrar diferentes perspectivas sobre a satisfação sexual e as experiências vivenciadas por esses homens. Os conhecimentos produzidos nessas etapas contribuíram para a compreensão do fenômeno e para a identificação de necessidades, lacunas e elementos relevantes à estruturação do programa.",
  "A construção do programa também incorporou um processo de cocriação com enfermeiras atuantes em um serviço de reabilitação de pessoas com estomas, aproximando o conhecimento produzido na pesquisa das condições concretas da prática assistencial. Participaram dessa etapa profissionais com diferentes níveis de formação e experiência na área: duas enfermeiras estomaterapeutas e pós-graduandas em reabilitação, uma enfermeira especialista em reabilitação e uma enfermeira capacitada para atuação nesse campo. A cocriação envolveu a análise e elaboração de conteúdos, proposição de novos conteúdos, exemplificação de situações assistenciais e correlação entre os referenciais teóricos e a prática clínica, considerando as vivências e experiências das enfermeiras no cuidado às pessoas com estomas.",
  "Diante desse percurso, foi desenvolvido o H_Sex_Ostomy: Programa de Reabilitação da Sexualidade Masculina, compreendido como um programa de saúde constituído por um conjunto de atividades planejadas e organizadas, desenvolvidas ao longo do tempo para alcançar objetivos específicos relacionados à saúde. O programa foi concebido com o propósito de contribuir para a consulta de enfermagem ao homem com estoma de eliminação, oferecendo um referencial estruturado para a abordagem da sexualidade ao longo do processo de reabilitação.",
  "O programa fundamenta-se na articulação entre o modelo EX-PLISSIT, que orienta uma abordagem clínica progressiva, contínua e centrada na pessoa, e a Teoria de Enfermagem de Reabilitação para o Bem-Viver, que sustenta o cuidado a partir da relação intersubjetiva e do reconhecimento da pessoa em sua singularidade, favorecendo processos de reconstrução, autonomia, autorrealização e emancipação. Assim, o H_Sex_Ostomy foi concebido para subsidiar a prática do enfermeiro na promoção da sexualidade e do Bem-Viver de homens com estomas de eliminação ao longo do processo de reabilitação."
];

export const percurso = [
  ["Revisão de escopo", "Mapeamento das evidências sobre intervenções na sexualidade de homens com estomas."],
  ["Observação participante", "Imersão em um serviço especializado de reabilitação de pessoas com estomas."],
  ["Estudo de métodos mistos", "Integração de perspectivas sobre satisfação sexual e experiências desses homens."],
  ["Cocriação com enfermeiras", "Análise, elaboração e exemplificação de conteúdos com quatro enfermeiras da reabilitação."]
];

/* Componentes do programa (EX-PLISSIT adaptado). Cores seguem o Apêndice A. */
export const componentes = [
  { id: "permissao", sigla: "P", nome: "Permissão", rotulo: "Contínua", cor: "p", secao: "7-9-1", paginas: "29–31",
    resumo: "Abre e sustenta todas as etapas. Deve ser solicitada a cada encontro, com privacidade, acolhimento e respeito à recusa.",
    acao: "Criar um espaço seguro, normalizar o tema, pedir consentimento explícito e observar sinais de conforto." },
  { id: "revisao", sigla: "R", nome: "Revisão", rotulo: "Contínua", cor: "r", secao: "7-9-2", paginas: "31–32",
    resumo: "Acontece no final de cada consulta e no início das seguintes: monitora mudanças, avalia intervenções, identifica novas demandas e promove reflexão sobre a prática.",
    acao: "Retomar o que foi discutido, verificar mudanças, compreensão e novas demandas, reorientar o plano." },
  { id: "informacao", sigla: "LI", nome: "Informação Limitada", rotulo: "Informação geral", cor: "li", secao: "7-9-3", paginas: "33–43",
    resumo: "Informações gerais, inclusivas e relevantes para o momento da pessoa, conduzidas como conversa que normaliza o tema e reduz medos e crenças equivocadas.",
    acao: "Selecionar apenas os temas pertinentes àquele encontro. Não é preciso abordar todos de uma vez." },
  { id: "sugestoes", sigla: "SS", nome: "Sugestões Específicas", rotulo: "Plano individual", cor: "ss", secao: "7-9-4", paginas: "43–59",
    resumo: "Avaliação clínica e histórico sexual, instrumentos validados e processo de enfermagem (NANDA-I, NOC, NIC) para demandas concretas.",
    acao: "Aprofundar a avaliação, formular diagnósticos, resultados e intervenções e construir metas com o homem." },
  { id: "terapia", sigla: "IT", nome: "Terapia Intensiva", rotulo: "Quando necessária", cor: "it", secao: "7-9-5", paginas: "60–61",
    resumo: "Não é fase obrigatória. Indicada quando a demanda excede o escopo autônomo do(a) enfermeiro(a), por meio de encaminhamento qualificado e acompanhamento.",
    acao: "Discutir o encaminhamento com o homem, formalizar o fluxo e acompanhar o resultado." }
];

/* Quadro 1 (pp. 13–18): operacionalização dos conceitos da Teoria no H_Sex_Ostomy. Fonte: adaptado de Zuchetto, 2023. */
export const conceitos = [
  ["Ambiente", "Garantir espaço físico privado e confortável para as consultas. Mapear fatores familiares, sociais, culturais e religiosos que atravessam a vivência sexual do paciente."],
  ["Autoconfiança", "Criar condições para que o paciente fale abertamente sobre desejos e dificuldades. Apoiar o homem no reconhecimento de suas capacidades para cuidar da estomia, comunicar suas necessidades, relacionar-se."],
  ["Autoestima", "Valorizar capacidades, qualidades, conquistas e possibilidades do homem, evitando que sua identidade seja reduzida à estomia ou à disfunção sexual. Trabalhar sentimentos de vergonha, desvalorização corporal e percepção de ser “menos homem”."],
  ["Autorrealização", "Apoiar e construir de maneira dialogada escolhas e metas significativas para a vivência da sexualidade, valorizando sua participação autônoma e suas capacidades."],
  ["Autorrespeito", "Reforçar a pessoa como sujeito de direitos. Informar sobre direitos sexuais, privacidade, confidencialidade, consentimento e acesso ao cuidado. Respeitar as decisões, inclusive quando o homem não desejar abordar a sexualidade."],
  ["Bem-Viver", "Orientar o cuidado para além da função sexual, em direção ao reconhecimento, à autonomia, valorização de si, à participação e qualidade de vida."],
  ["Biológico", "Avaliar aspectos físicos e funcionais relacionados à sexualidade (as repercussões da cirurgia, tratamento, comorbidades, medicamentos etc.) que impactam a experiência sexual da pessoa."],
  ["Conflitos sociais", "Identificar situações de ausência de reconhecimento, como rejeição, estigma, discriminação, isolamento, conflitos conjugais ou desrespeito no serviço. Acolher a experiência e articular suporte multiprofissional quando necessário."],
  ["Consciência", "Favorecer a reflexão sobre mudanças corporais, sentimentos, crenças, direitos, escolhas, obstáculos e facilitadores relacionados à sexualidade e à reabilitação."],
  ["Consciencialização", "Apoiar o processo contínuo de autoconhecimento. Ajudar o homem a reconhecer necessidades, questionar mitos e compreender possibilidades de cuidado e vivência da sexualidade."],
  ["Contemporaneidade", "Considerar que as necessidades da pessoa evoluem com o tempo, com as mudanças em seus relacionamentos e com o contexto de vida ao longo da reabilitação."],
  ["Cuidado de enfermagem", "Operacionalizar o programa nas consultas de reabilitação. Iniciar a abordagem da sexualidade, respeitando a vontade da pessoa cuidada."],
  ["Desigualdade", "Identificar barreiras econômicas, sociais, educacionais, raciais, territoriais, institucionais ou relacionadas à orientação sexual e à deficiência que dificultem o acesso, a participação ou a continuidade do cuidado no ambulatório e mediar conforme possibilidades."],
  ["Dignidade", "Reconhecer o homem como sujeito de direitos. Preservar privacidade, confidencialidade, integridade corporal, liberdade de escolha e tratamento respeitoso em todas as etapas do atendimento."],
  ["Diversidade", "Individualizar a abordagem. Adotar linguagem e condutas não normativas, sem presumir orientação sexual, monogamia ou um único modelo de masculinidade."],
  ["Enfermagem", "Oferecer cuidado que articule dimensões biopsicossociais, utilizando o processo de enfermagem e os recursos do programa."],
  ["Enfermagem de reabilitação", "Estruturar o cuidado à sexualidade em ações articuladas ao plano geral de reabilitação da pessoa com estoma, como parte do processo contínuo de reconstrução da pessoa em direção ao Bem-Viver."],
  ["Enfermeiro", "Atuar como facilitador do cuidado. Acolher, escutar e cuidar, articulando as dimensões biológicas, emocionais, relacionais, sociais, culturais e educacionais da sexualidade, respeitando sua autonomia e vontade."],
  ["Esperançar", "Estimular e apoiar a construção de expectativas futuras realistas e concretas, ancoradas no presente vivido, evitando promessas irreais."],
  ["Eticidade", "Conduzir a consulta com respeito, consentimento, confidencialidade, sem julgamento e com responsabilidade profissional."],
  ["Família", "Reconhecer a família e a parceria como possíveis fontes de apoio. Garantir inicialmente um momento individual e incluir parceria, quando o homem desejar e autorizar."],
  ["Identidade", "Reconhecer que a estomia pode gerar ruptura na identidade masculina e sexual do homem, acompanhando o processo de ressignificação."],
  ["Individuação", "Considerar a trajetória singular de cada pessoa na forma como reconstrói sua relação consigo e com a própria sexualidade."],
  ["Intersubjetividade", "Construir, a cada encontro/consulta, um espaço de fala em que enfermeiro e a pessoa cuidada se reconheçam mutuamente como sujeitos legítimos, reduzindo vergonha e assimetria de poder."],
  ["Liberdade social", "Apoiar o homem na definição de seus próprios objetivos, incluindo afetivos e sexuais, reconhecendo que sua realização depende também de relações respeitosas, acesso a direitos e condições sociais favoráveis."],
  ["Mutualidade", "Tratar cada homem em sua individualidade, sem hierarquizar ou comparar experiências, prezando pelo respeito e estima."],
  ["Obstáculo", "Tratar cada homem em sua individualidade, sem hierarquizar ou comparar experiências, prezando pelo respeito e estima.", "No manual, este texto é idêntico ao de Mutualidade (p. 16). Vale conferir com as autoras."],
  ["Paridade", "Promover direitos sexuais e reprodutivos da pessoa cuidada, assegurando sua autonomia e respeitando sua vontade na reabilitação."],
  ["Participação", "Envolver o homem no seu plano de cuidados, como protagonista, respeitando suas vontades e necessidades."],
  ["Pessoa cuidada", "Acolher o homem com estoma em sua história de vida, corporeidade e sexualidade desde a primeira consulta, evitando reduzi-lo à condição clínica e/ou ao estoma."],
  ["Processo", "Reconhecer que a vivência da sexualidade após a estomia é contínua, não um evento único, exigindo revisão e reflexão constante ao longo da reabilitação."],
  ["Reabilitação", "Favorecer a reconstrução na, para e com a diversidade, desenvolvendo possibilidades funcionais, emocionais, relacionais, educacionais e sociais relacionadas à sexualidade e ao Bem-Viver."],
  ["Realidade social", "Considerar o contexto sociocultural e religioso do paciente na condução da consulta sobre sexualidade, sem impor os valores do profissional."],
  ["Reciprocidade", "Manter comunicação bidirecional: o enfermeiro oferece conhecimento e apoio, enquanto o homem comunica experiências, prioridades e limites. Verificar compreensão e revisar decisões conjuntamente."],
  ["Reconhecimento", "Validar as necessidades, os valores e os direitos da pessoa cuidada."],
  ["Reconstrução", "Apoiar construções sucessivas de possibilidades para a sexualidade, sem exigir o retorno ao padrão anterior à estomia. Considerar novas formas de intimidade, prazer e vínculo."],
  ["Respeito social", "Combater estigmas relacionados à estomia, ao corpo, à masculinidade, à idade ou à orientação sexual. Garantir atendimento respeitoso e acesso igualitário aos recursos do serviço de reabilitação."],
  ["Saúde", "Compreender a sexualidade como parte da saúde integral da pessoa, e não como aspecto isolado ou secundário do cuidado de reabilitação."],
  ["Tempo", "Respeitar o ritmo de cada homem e reconhecer que necessidades podem surgir ou mudar ao longo do acompanhamento."],
  ["Vida intersubjetiva", "Investigar relações com parceria, família, amigos, comunidade e profissionais, identificando vínculos que favorecem ou dificultam reconhecimento, intimidade e participação social."],
  ["Vontade", "Apoiar a pessoa na formulação de metas concretas e alcançáveis para reabilitação, incluindo a vivência da sexualidade, respeitando seu próprio ritmo."]
];

/* Figura 1 (p. 12): agrupamento dos conceitos no modelo teórico (adaptado de Zuchetto) */
export const modeloTeorico = {
  enfermeira: ["Autoconfiança", "Autoestima", "Autorrespeito", "Consciencialização", "Diversidade", "Identidade", "Reabilitação", "Vontade"],
  enfermagem: ["Cuidado de enfermagem", "Enfermagem", "Esperançar", "Eticidade", "Individuação", "Intersubjetividade", "Liberdade social", "Mutualidade", "Paridade", "Participação", "Reciprocidade", "Reconhecimento", "Respeito social", "Vida intersubjetiva"],
  pessoa: ["Autoconfiança", "Autoestima", "Autorrespeito", "Biológico", "Consciência", "Consciencialização", "Dignidade", "Diversidade", "Identidade", "Reabilitação", "Vontade"],
  ambiente: ["Conflitos sociais", "Desigualdade", "Família", "Obstáculos", "Realidade social"],
  tempo: ["Contemporaneidade", "Processo"],
  bemViver: ["Autorrealização", "Reconstrução", "Saúde"]
};

export const parcimonia = "A relação entre enfermeira e pessoa cuidada em reabilitação contribui para o Bem-Viver acontecer.";

export const fichaTecnica = [
  ["Elaboração do texto", "Ariana Luiza Rabelo"],
  ["Coordenação", "Anderson Reis de Sousa"],
  ["Colaboração técnico-assistencial", "Enfermeiras participantes do processo de cocriação do H_Sex_Ostomy"],
  ["Ilustrações, projeto gráfico e diagramação", "Davi Barreto"],
  ["Instituição", "Universidade Federal da Bahia (UFBA), Escola de Enfermagem, Programa de Pós-Graduação em Enfermagem e Saúde"],
  ["Projeto de origem", "Promoção da sexualidade na reabilitação de homens com estomas de eliminação: desenvolvimento do programa H_Sex_Ostomy"],
  ["Edição", "1ª edição, 2026, versão eletrônica"]
];
