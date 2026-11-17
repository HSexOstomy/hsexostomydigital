/* Aulas, casos clínicos e atividades de fixação. Conteúdo elaborado a partir do manual;
   casos e personagens são fictícios. */

const q = (pergunta, opcoes) => ({ pergunta, opcoes });
const o = (t, feedback, certo = false) => ({ t, feedback, certo });

export const aulas = [
  {
    id: "conhecer", titulo: "Conhecendo o H_Sex_Ostomy", duracao: 8, secoes: ["apresentacao", "identidade"],
    objetivo: "Reconhecer a finalidade, a origem e os valores do programa.",
    essencial: [
      "O programa nasceu de uma revisão de escopo, de observação participante, de um estudo de métodos mistos e da cocriação com enfermeiras da reabilitação.",
      "Os usuários diretos são enfermeiros(as); os beneficiários são homens com estomas de eliminação, sujeitos ativos do cuidado.",
      "Acolhimento, reconhecimento, autonomia, intersubjetividade e ética orientam cada encontro."
    ],
    pratique: [
      q("Na consulta, um homem não traz espontaneamente dúvidas sobre sexualidade. O que isso significa?", [
        o("Que o tema não é uma necessidade e pode ficar fora do cuidado.", "A ausência de queixa espontânea não significa ausência de necessidade. Muitos homens não falam por vergonha ou receio de serem mal interpretados (7.5)."),
        o("Que cabe ao(à) enfermeiro(a) oferecer a abertura, pedindo Permissão.", "Isso. O manual recomenda que o(a) enfermeiro(a) tome a iniciativa e ofereça o espaço, sempre com Permissão.", true)
      ]),
      q("Quem é o usuário direto do programa?", [
        o("O(a) enfermeiro(a) que conduz a consulta.", "Correto. O programa instrumentaliza enfermeiros(as); o homem com estoma é a pessoa beneficiária e protagonista do cuidado.", true),
        o("O homem com estoma, que lê o manual sozinho.", "O manual é técnico-educativo para profissionais. O homem participa como protagonista do cuidado, não como leitor direto.")
      ])
    ]
  },
  {
    id: "teoria", titulo: "Teoria de Enfermagem de Reabilitação para o Bem-Viver", duracao: 12, secoes: ["6-1"],
    objetivo: "Compreender a reabilitação como reconstrução na relação intersubjetiva.",
    essencial: [
      "Dois fundamentos: Teoria do Reconhecimento (Honneth), com autoconfiança, autorrespeito e autoestima; e Princípio da Esperança (Bloch), com o Esperançar.",
      "Aos conceitos de pessoa, ambiente, saúde e enfermagem soma-se o tempo.",
      "Parcimônia: a relação entre enfermeira e pessoa cuidada em reabilitação contribui para o Bem-Viver acontecer.",
      "Reconstrução não exige voltar ao padrão anterior à estomia: são construções sucessivas de possibilidades."
    ],
    pratique: [
      q("Um homem diz que quer “voltar a ser como antes”. Qual conceito ajuda a conduzir a conversa?", [
        o("Reconstrução: apoiar construções sucessivas de possibilidades, sem exigir o retorno ao padrão anterior.", "Isso. O Quadro 1 orienta considerar novas formas de intimidade, prazer e vínculo.", true),
        o("Esperançar: prometer que tudo voltará ao normal para motivá-lo.", "O Esperançar apoia expectativas realistas e concretas e evita promessas irreais.")
      ]),
      q("O que o conceito de Diversidade pede na prática?", [
        o("Usar linguagem não normativa, sem presumir orientação sexual, monogamia ou um único modelo de masculinidade.", "Exatamente o que o Quadro 1 propõe.", true),
        o("Aplicar o mesmo roteiro a todos para garantir igualdade.", "Igualdade não é uniformidade. A individualização é central no programa.")
      ])
    ]
  },
  {
    id: "explissit", titulo: "O modelo EX-PLISSIT", duracao: 10, secoes: ["6-2", "7-9"],
    objetivo: "Diferenciar os níveis de intervenção e o ciclo de reflexão e revisão.",
    essencial: [
      "A Permissão está no centro e é renovada a cada encontro.",
      "Informação Limitada, Sugestões Específicas e Terapia Intensiva são níveis de profundidade, não etapas rígidas.",
      "Reflexão é focada no paciente; revisão é focada no profissional.",
      "Um assunto discutido não está necessariamente resolvido: a sexualidade é dinâmica."
    ],
    pratique: [
      q("A Terapia Intensiva só pode acontecer depois das Sugestões Específicas?", [
        o("Sim, é sempre a última fase.", "No EX-PLISSIT, a Terapia Intensiva pode ser oferecida em qualquer estágio, conforme a necessidade."),
        o("Não. Pode ser indicada em qualquer momento em que a demanda exceder o escopo do(a) enfermeiro(a).", "Correto (6.2 e 7.9.5).", true)
      ])
    ]
  },
  {
    id: "consulta", titulo: "Preparando a consulta", duracao: 10, secoes: ["7-1", "7-2", "7-3", "7-5"],
    objetivo: "Organizar ambiente, periodicidade e postura para abordar a sexualidade.",
    essencial: [
      "Ambiente privativo, acolhedor e acessível; no teleatendimento, plataforma segura.",
      "Introduzir o tema já na primeira consulta e retomá-lo, no mínimo, a cada três meses.",
      "Ajustar a profundidade à abertura de cada homem e observar sinais verbais e não verbais.",
      "Demandas tardias são esperadas: muitas surgem quando o homem retoma a vida afetiva."
    ],
    pratique: [
      q("O paciente chega acompanhado da esposa. Antes de abordar a sexualidade, o que fazer?", [
        o("Avaliar com ele se a permanência da acompanhante é desejada.", "Isso. O manual orienta garantir inicialmente um momento individual e incluir a parceria quando o homem desejar.", true),
        o("Conduzir a conversa com os dois, já que é um assunto do casal.", "A inclusão da parceria depende do consentimento do homem.")
      ])
    ]
  },
  {
    id: "permissao", titulo: "Permissão e autonomia", duracao: 8, secoes: ["7-9-1"],
    objetivo: "Aplicar os cinco passos da Permissão e respeitar a recusa.",
    essencial: [
      "Prepare o ambiente, solicite permissão, respeite a escolha, inicie o diálogo, normalize e fortaleça.",
      "Se o homem não autorizar, acolha sem julgamento, siga com o atendimento clínico e coloque-se disponível.",
      "Documente a oferta da abordagem, a decisão do usuário e a possibilidade de retomada."
    ],
    pratique: [
      q("O homem recusa conversar sobre sexualidade hoje. Qual o registro adequado?", [
        o("Não registrar nada, para não constranger.", "O manual recomenda documentar a oferta, a decisão, as orientações e a possibilidade de retomada."),
        o("Registrar a oferta da abordagem, a decisão do usuário e a possibilidade de retomar o tema.", "Correto (p. 31).", true)
      ])
    ]
  },
  {
    id: "revisao", titulo: "Revisão contínua", duracao: 6, secoes: ["7-9-2"],
    objetivo: "Usar a Revisão no início e no final de cada encontro.",
    essencial: [
      "Monitorar mudanças, avaliar a efetividade das intervenções, identificar novas demandas e (re)orientar.",
      "Inclui reflexão do(a) enfermeiro(a) sobre a própria prática.",
      "Use os resultados NOC para evidenciar a evolução."
    ],
    pratique: [
      q("Qual destas falas abre bem uma Revisão?", [
        o("“Como tem sido para você lidar com essas questões desde a nossa última conversa?”", "Isso, é o exemplo 2 da Figura 5.", true),
        o("“Imagino que aquilo que conversamos já esteja resolvido, certo?”", "O EX-PLISSIT alerta para não presumir que o assunto foi resolvido.")
      ])
    ]
  },
  {
    id: "informacao", titulo: "Informação Limitada", duracao: 15, secoes: ["7-9-3", "7-9-3-1"],
    objetivo: "Selecionar e conduzir temas do Quadro 2 com as falas sugeridas.",
    essencial: [
      "Seis temas: reabilitação, imagem corporal, função e vivência sexual, odor/gases/ruídos, parceria e mitos.",
      "Não é preciso abordar todos de uma vez. Pergunte o que faz sentido para a pessoa.",
      "O orgasmo não depende diretamente da ereção ou da ejaculação.",
      "O estoma nunca deve ser penetrado ou manipulado na relação sexual."
    ],
    pratique: [
      q("O homem pergunta se poderá voltar a ter sexo anal receptivo após amputação abdominoperineal do reto. Como responder?", [
        o("Que a prática pode ficar impossibilitada pela remoção do reto e do ânus, e discutir alternativas de prazer.", "Correto. O Quadro 2 e o Quadro 3 orientam informar com clareza e explorar outras possibilidades.", true),
        o("Que pode usar o estoma como alternativa, com lubrificante.", "Nunca. O estoma não deve ser penetrado ou manipulado, pelo risco de lesão e sangramento.")
      ]),
      q("Medo de gases e ruídos durante a intimidade. Qual postura o manual sugere?", [
        o("Desmistificar sem minimizar e oferecer estratégias práticas.", "Isso: o incômodo é real, e existem formas de manejá-lo.", true),
        o("Dizer que é bobagem e que ninguém repara.", "Minimizar a preocupação fragiliza o vínculo. O manual pede para reconhecer o incômodo.")
      ])
    ]
  },
  {
    id: "sugestoes", titulo: "Sugestões Específicas e processo de enfermagem", duracao: 18, secoes: ["7-7", "7-9-4"],
    objetivo: "Construir um plano com NANDA-I, NOC e NIC a partir do histórico e dos instrumentos.",
    essencial: [
      "Histórico clínico e sexual do Quadro 6, com atenção a anti-hipertensivos, antidepressivos e opioides.",
      "IIEF-15 e QS-M são autoaplicáveis e podem ser usados por enfermeiros(as).",
      "Nove diagnósticos sugeridos, cada um com NOC, NIC e pontos de atenção para o homem com estoma.",
      "Registro: características, fatores relacionados, resultados com escala e prazo, atividades e encaminhamentos."
    ],
    pratique: [
      q("O IIEF-15 mostra função erétil 14/30. O que isso indica e o que fazer?", [
        o("Disfunção erétil moderada; considerar Função sexual prejudicada e avaliar encaminhamento à urologia.", "Correto. 11 a 16 pontos no domínio indicam DE moderada, e disfunção erétil está entre as situações de encaminhamento.", true),
        o("Função normal; nenhuma conduta.", "No domínio função erétil, 26 a 30 indicam ausência de disfunção.")
      ])
    ]
  },
  {
    id: "rede", titulo: "Terapia Intensiva, rede e implantação", duracao: 12, secoes: ["7-9-5", "8", "9"],
    objetivo: "Encaminhar com qualidade e planejar a implantação no serviço.",
    essencial: [
      "Encaminhar quando a demanda excede o escopo: sofrimento psicoemocional, disfunção erétil, infertilidade, conflitos significativos, entre outros.",
      "O encaminhamento não encerra a responsabilidade do cuidado.",
      "Seis diretrizes de implantação e oito indicadores de estrutura, processo e resultado."
    ],
    pratique: [
      q("Após encaminhar à psicologia, o acompanhamento de enfermagem…", [
        o("Termina: o caso passou para outro profissional.", "O manual é explícito: o encaminhamento não encerra o cuidado."),
        o("Continua, com Revisão e verificação de que as necessidades foram acolhidas.", "Correto (p. 61).", true)
      ])
    ]
  }
];

/* Casos clínicos fictícios */
export const casos = [
  {
    id: "bruno", nome: "Bruno", idade: 41, resumo: "Colostomia há 8 meses após ressecção por câncer colorretal. Casado. Acompanhamento em quatro encontros.",
    tags: ["Longitudinal", "4 encontros"],
    encontros: [
      { titulo: "Primeira consulta", fase: "permissao",
        cena: "Bruno, 41 anos, convive com uma colostomia há oito meses. Na consulta, conversa com tranquilidade sobre a adaptação à bolsa, mas desvia o olhar quando o assunto se aproxima da vida a dois.",
        pergunta: "Como reconhecer a sexualidade como parte do cuidado sem invadir os limites dele?",
        opcoes: [
          o("Normalizar o tema e pedir Permissão, respeitando a resposta.", "O profissional oferece a oportunidade e acolhe a recusa. Bruno diz que prefere não falar hoje. Registre a oferta e a decisão, e mantenha a porta aberta.", true),
          o("Começar o histórico sexual completo para aproveitar a consulta.", "A relevância clínica do tema não dispensa a Permissão. Bruno se fecha e diz que está desconfortável."),
          o("Não mencionar sexualidade, para evitar constrangimento.", "Bruno perde a chance de dizer se queria conversar. A ausência de queixa não é ausência de necessidade.")
        ] },
      { titulo: "Retorno após seis semanas", fase: "informacao",
        cena: "Bruno está mais adaptado ao dispositivo. Conta que sente falta da intimidade com a esposa, mas tem medo de a bolsa vazar durante a relação.",
        pergunta: "Qual o próximo movimento mais coerente com o programa?",
        opcoes: [
          o("Renovar a Permissão, explorar o medo e orientar cuidados práticos (esvaziar, verificar aderência, acessórios).", "A Revisão revelou uma demanda tardia. A Informação Limitada foi contextualizada ao que ele trouxe, com apoio do Quadro 3.", true),
          o("Passar todas as orientações do manual de uma só vez.", "Bruno diz que é informação demais. Informação Limitada responde ao que é pertinente naquele momento."),
          o("Encaminhar direto para terapia sexual.", "Ainda não há demanda que exceda o escopo da enfermagem. O(a) enfermeiro(a) pode orientar e acompanhar.")
        ] },
      { titulo: "Avaliação individualizada", fase: "sugestoes",
        cena: "Bruno autoriza aprofundar. Relata menor desejo, dificuldade para manter a ereção, vergonha do corpo e conversas tensas com a esposa. Faz uso de anti-hipertensivo.",
        pergunta: "Como organizar a avaliação e o plano?",
        opcoes: [
          o("Histórico clínico e sexual, IIEF-15 e QS-M, revisão das medicações e diagnósticos discutidos com ele.", "Sugestões Específicas articulam avaliação, instrumentos e prioridades da pessoa. O anti-hipertensivo é um possível fator iatrogênico a considerar.", true),
          o("Aplicar só o IIEF-15 e decidir o plano pelo escore.", "Escores apoiam o raciocínio, mas não substituem escuta e avaliação psicossocial."),
          o("Assumir que tudo decorre da cirurgia.", "A disfunção depende também de idade, comorbidades, medicamentos, saúde mental e relacionamento (p. 42).")
        ] },
      { titulo: "Continuidade do cuidado", fase: "terapia",
        cena: "Após as intervenções, Bruno segue com dificuldade erétil persistente (IIEF-15: função erétil 14/30) e sofrimento importante. Quer ajuda especializada, mas também continuar sendo acompanhado.",
        pergunta: "Como conduzir?",
        opcoes: [
          o("Pactuar encaminhamento à urologia e à psicologia e manter a Revisão nas consultas de enfermagem.", "A Terapia Intensiva é indicada e não encerra a responsabilidade da enfermagem. A rede sustenta a continuidade.", true),
          o("Encaminhar e encerrar o acompanhamento de enfermagem.", "Bruno não sabe a quem recorrer quando surgem dúvidas. O manual pede acompanhar a trajetória na rede."),
          o("Não encaminhar, pois ele já recebeu orientações.", "Disfunção erétil persistente e sofrimento importante estão entre as situações de encaminhamento.")
        ] }
    ]
  },
  {
    id: "antonio", nome: "Seu Antônio", idade: 68, resumo: "Urostomia após cistectomia radical. Viúvo há dois anos, começou a namorar. Religioso.",
    tags: ["Urostomia", "Diversidade"],
    encontros: [
      { titulo: "Consulta de rotina", fase: "permissao",
        cena: "Seu Antônio comenta, rindo, que “na idade dele isso não importa mais”, mas logo pergunta se a bolsa “atrapalha namorar”.",
        pergunta: "Como responder?",
        opcoes: [
          o("Acolher a pergunta, pedir Permissão e explorar o que ele quer saber.", "A brincadeira é uma abertura. Respeitar o ritmo dele e acolher a dúvida reconhece a sexualidade em qualquer idade.", true),
          o("Concordar que na idade dele o assunto não é prioridade.", "Presumir desinteresse pela idade é um estigma que o Quadro 1 pede para combater (Respeito social)."),
          o("Responder apenas que a bolsa não atrapalha e mudar de assunto.", "A resposta fecha a conversa antes de entender a preocupação real.")
        ] },
      { titulo: "Dúvidas sobre a função", fase: "informacao",
        cena: "Ele relata que não tem mais ejaculação e acha que “não sente mais nada”. Diz que a religião dele valoriza o casamento e que pensa em se casar de novo.",
        pergunta: "Que informação é mais pertinente?",
        opcoes: [
          o("Explicar que o orgasmo pode acontecer sem ejaculação e que alterações após cistectomia têm abordagem clínica.", "O manual distingue ereção, ejaculação e orgasmo (vias nervosas distintas). Considere o contexto religioso sem impor valores.", true),
          o("Dizer que a cistectomia acaba com a vida sexual.", "É um mito. Há possibilidades de cuidado e encaminhamento."),
          o("Recomendar que ele não se case enquanto não resolver a questão.", "O(a) enfermeiro(a) não impõe decisões. Autonomia e Realidade social orientam a conduta.")
        ] }
    ]
  },
  {
    id: "rafael", nome: "Rafael", idade: 29, resumo: "Ileostomia por doença de Crohn, com proctocolectomia. Homem gay, namora há um ano.",
    tags: ["Ileostomia", "Diversidade"],
    encontros: [
      { titulo: "Primeiro encontro", fase: "permissao",
        cena: "Rafael diz que o namorado “vai acabar indo embora”. Ao ser perguntado sobre a esposa, corrige: “é namorado”.",
        pergunta: "O que o episódio ensina?",
        opcoes: [
          o("Pedir desculpas, seguir com linguagem neutra e não presumir orientação sexual nem modelo de relação.", "Diversidade pede linguagem e condutas não normativas. Reconhecer o erro fortalece a relação intersubjetiva.", true),
          o("Ignorar a correção e continuar a consulta.", "Ignorar fragiliza o vínculo e o reconhecimento."),
          o("Mudar o foco para cuidados com a bolsa, já que o tema é delicado.", "Desviar o assunto reforça o silêncio institucional que o programa busca romper.")
        ] },
      { titulo: "Pergunta específica", fase: "informacao",
        cena: "Com Permissão, Rafael pergunta se ainda poderá ter sexo anal receptivo e se o estoma poderia ser usado.",
        pergunta: "Como orientar?",
        opcoes: [
          o("Explicar que, após a remoção do reto, a prática pode ficar impossibilitada; que o estoma nunca deve ser penetrado; e explorar outras formas de prazer com ele e o parceiro.", "Isso reúne o Quadro 2 (função sexual) e o Quadro 3 (destaque sobre penetração), sem julgamento.", true),
          o("Evitar o tema e sugerir procurar um especialista.", "O assunto está no escopo da Informação Limitada. O encaminhamento cabe se houver demanda que exceda esse escopo."),
          o("Dizer que é possível usar o estoma com cuidado.", "Nunca. Há risco de lesão, sangramento e complicações.")
        ] },
      { titulo: "Parceria", fase: "sugestoes",
        cena: "Rafael autoriza trazer o namorado para a próxima consulta. Os dois evitam falar de intimidade “para não magoar”.",
        pergunta: "Qual diagnóstico e intervenções considerar?",
        opcoes: [
          o("Relacionamento ineficaz com o parceiro íntimo, com inclusão do parceiro na educação, avaliação e metas.", "É o que os pontos de atenção do diagnóstico 00449 propõem, mediante consentimento.", true),
          o("Conhecimento de saúde inadequado do parceiro.", "O diagnóstico se refere à pessoa cuidada. O foco aqui é o padrão de mutualidade do casal."),
          o("Nenhum: é só uma fase.", "O sofrimento relatado e a evitação justificam o plano de cuidado.")
        ] }
    ]
  }
];

/* Mito ou fato: fixação para o workshop e para estudo */
export const mitos = [
  { frase: "O estoma, por si só, contraindica a atividade sexual.", fato: false, explica: "O estoma, por si só, não contraindica a atividade sexual (Quadro 2, p. 36)." },
  { frase: "O orgasmo depende da ereção e da ejaculação.", fato: false, explica: "São funções reguladas por vias nervosas distintas. É possível ter orgasmo com ejaculação retrógrada ou orgasmo seco (p. 42)." },
  { frase: "Se o homem não fala sobre sexualidade, é porque não tem preocupações.", fato: false, explica: "Vergonha e medo de ser mal interpretado silenciam muitos homens. Cabe ao(à) enfermeiro(a) abrir o espaço (7.5)." },
  { frase: "Uma vez concedida, a Permissão vale para os encontros seguintes.", fato: false, explica: "A Permissão é renovada a cada encontro, respeitando a autonomia (Figura 3)." },
  { frase: "Após amputação abdominoperineal do reto, o sexo anal receptivo pode ficar impossibilitado.", fato: true, explica: "A remoção total ou parcial do reto e do ânus pode impossibilitar a prática. Outras formas de prazer podem ser exploradas (Quadros 2 e 3)." },
  { frase: "O estoma pode ser usado para penetração se houver cuidado e lubrificação.", fato: false, explica: "Nunca. O estoma não deve ser penetrado ou manipulado, pelo risco de lesão e sangramento (p. 41)." },
  { frase: "Enfermeiros(as) podem aplicar o IIEF-15 e o QS-M.", fato: true, explica: "Ambos são autoaplicáveis e podem ser aplicados por enfermeiros(as), inclusive de forma assistida (p. 25)." },
  { frase: "A disfunção sexual após cirurgia pélvica depende apenas da técnica cirúrgica.", fato: false, explica: "Idade, comorbidades, radioterapia, medicamentos, saúde mental e relacionamento também influenciam (p. 42)." },
  { frase: "Encaminhar para Terapia Intensiva encerra a responsabilidade da enfermagem.", fato: false, explica: "O encaminhamento não encerra o cuidado. É preciso acompanhar a trajetória do homem na rede (p. 61)." },
  { frase: "Gases e ruídos durante a intimidade são reações fisiológicas esperadas.", fato: true, explica: "São reações do organismo funcionando de uma nova forma, não falhas. Há estratégias de manejo (Quadro 2, p. 37)." }
];

/* Escolha a melhor fala */
export const falasTreino = [
  { situacao: "Primeira consulta. Você quer abrir o tema da sexualidade.",
    opcoes: [
      o("“Como a sexualidade é uma dimensão importante da saúde, costumo conversar sobre esse tema com todos os meus pacientes. Você se sente confortável para falarmos hoje?”", "É a fala do Quadro 5: normaliza, explica e pede Permissão.", true),
      o("“Preciso fazer algumas perguntas sobre sua vida sexual. É rápido.”", "Não pede Permissão nem explica por que o tema faz parte do cuidado."),
      o("“Você tem problemas de ereção?”", "Começa pelo tópico mais sensível e sem Permissão. O NIC 5248 orienta ir dos menos para os mais sensíveis.")
    ] },
  { situacao: "Ele diz que evita se olhar no espelho desde a cirurgia.",
    opcoes: [
      o("“Isso passa, logo você se acostuma.”", "Minimiza e apressa o processo. O Quadro 2 pede acolher sem minimizar nem apressar."),
      o("“Sentir estranhamento no próprio corpo após uma mudança tão significativa é natural. Isso tende a se transformar com o tempo. Respeite seu tempo.”", "É a fala do Quadro 2 para retirar o peso do processo de reconstrução.", true),
      o("“Você deveria se olhar mais para aceitar logo.”", "Impõe ritmo e expectativa externa.")
    ] },
  { situacao: "Retorno. Na última consulta vocês falaram sobre medo de vazamento.",
    opcoes: [
      o("“Então, aquilo já está resolvido?”", "Presume resolução. O EX-PLISSIT alerta que o assunto discutido não está necessariamente resolvido."),
      o("“Na última vez conversamos sobre o medo de vazamento. Houve alguma mudança desde então? As dúvidas foram esclarecidas ou ainda permanecem?”", "É o exemplo de Revisão da Figura 5.", true),
      o("“Hoje vamos falar de outro assunto.”", "Ignora a Revisão no início do encontro.")
    ] }
];
