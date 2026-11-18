/* Capacitação profissional: módulos com conteúdo clínico baseado no manual H_Sex_Ostomy.
   Tipos de alerta: seguranca (risco ao paciente), erro (erro comum na prática), etica (ética e registro), dica (pérola clínica). */

const q = (pergunta, opcoes) => ({ pergunta, opcoes });
const o = (t, feedback, certo = false) => ({ t, feedback, certo });

export const modulos = [
  {
    id: "por-que", titulo: "Por que abordar a sexualidade na reabilitação", min: 12, secoes: ["apresentacao", "7-5"],
    objetivo: "Reconhecer a sexualidade como necessidade legítima de cuidado e entender por que o tema costuma ficar em silêncio.",
    blocos: [
      { titulo: "Uma lacuna da assistência", texto: [
        "As necessidades de bem-estar sexual de pessoas com deficiência adquirida ou doença crônica seguem pouco abordadas nos serviços, sobretudo na reabilitação. Faltam instrumentos e materiais que orientem os profissionais, e a sexualidade raramente entra de forma sistemática na consulta de enfermagem.",
        "No homem com estoma de eliminação, alterações corporais, repercussões psicossociais, mudanças na função e na satisfação sexual e barreiras relacionais se somam. Para muitos, a estomia atinge diretamente a construção da identidade masculina."
      ] },
      { titulo: "Por que os homens não falam", texto: [
        "Vergonha, receio de ser mal interpretado e a falta de abertura do profissional impedem que o tema apareça. Muitos homens esperam que alguém abra o espaço. Por isso o manual recomenda que a iniciativa seja do(a) enfermeiro(a), sempre precedida de Permissão (7.5)."
      ] },
      { titulo: "Demandas tardias são a regra, não a exceção", texto: [
        "No início, a prioridade costuma ser o cuidado cirúrgico, o manejo do dispositivo e a própria sobrevivência. As questões sexuais tendem a surgir quando o homem retoma a vida afetiva, às vezes meses depois. Outras razões para o adiamento: ausência inicial de alterações geniturinárias, letramento em saúde sexual limitado e sofrimento psíquico."
      ] }
    ],
    alertas: [
      ["erro", "Interpretar a ausência de queixa como ausência de necessidade. O silêncio do paciente é, muitas vezes, efeito do silêncio do serviço."],
      ["dica", "Sinalizar desde a primeira consulta que o tema faz parte do cuidado já reduz a barreira, mesmo que a conversa aprofundada aconteça depois."]
    ],
    vinheta: "Seu Carlos, 63 anos, colostomia há 5 meses, nunca mencionou sexualidade. Na sala de espera, comenta com outro paciente que “isso acabou pra mim”.",
    pratique: [
      q("O que esse comentário de Seu Carlos sugere para a próxima consulta?", [
        o("Que ele não quer falar do assunto e o tema deve ser evitado.", "O comentário indica uma crença sobre o fim da vida sexual, não uma recusa. É uma oportunidade para oferecer o espaço com Permissão."),
        o("Que há uma crença a ser explorada; vale abrir o tema com Permissão e normalizar a dúvida.", "Isso. “Não posso mais ter vida sexual” é um dos mitos listados no Quadro 2 (p. 39).", true),
        o("Que ele deve ser encaminhado à psicologia imediatamente.", "Ainda não há avaliação que indique encaminhamento. O primeiro passo é a escuta.")
      ]),
      q("Na admissão, um homem está focado em aprender a trocar a bolsa. O que o manual recomenda sobre a sexualidade?", [
        o("Esperar que ele traga o tema espontaneamente.", "O manual recomenda a iniciativa do(a) enfermeiro(a), justamente porque muitos não falam."),
        o("Introduzir o tema de forma gradual já na primeira consulta e retomá-lo, no mínimo, a cada três meses.", "Correto (7.3).", true)
      ])
    ]
  },
  {
    id: "fundamentos", titulo: "Bem-Viver e EX-PLISSIT na prática", min: 15, secoes: ["6-1", "6-2", "7-9"],
    objetivo: "Traduzir os dois referenciais do programa em atitudes concretas durante a consulta.",
    blocos: [
      { titulo: "Teoria de Enfermagem de Reabilitação para o Bem-Viver", texto: [
        "Reabilitar é (re)construir a própria vida. A teoria se apoia no Reconhecimento (Honneth), que se expressa em autoconfiança, autorrespeito e autoestima, e no Princípio da Esperança (Bloch), que sustenta o Esperançar: construir expectativas realistas a partir do presente.",
        "Na consulta, isso significa não reduzir o homem ao estoma ou à função erétil, apoiar construções sucessivas de possibilidades (sem exigir o retorno ao padrão anterior) e construir o cuidado na relação intersubjetiva, em que os dois se reconhecem como sujeitos."
      ] },
      { titulo: "EX-PLISSIT", texto: [
        "A Permissão fica no centro e é renovada a cada encontro. Informação Limitada, Sugestões Específicas e Terapia Intensiva são níveis de profundidade, não etapas obrigatórias em sequência; a Terapia Intensiva pode ser indicada em qualquer momento.",
        "O modelo inclui um ciclo de reflexão (foco no paciente) e revisão (foco no profissional): desafiar suposições, rever a própria atuação e não presumir que um assunto discutido está resolvido."
      ] }
    ],
    alertas: [
      ["erro", "Usar o EX-PLISSIT como checklist linear (P, depois LI, depois SS, depois IT). A progressão depende das demandas de cada encontro."],
      ["dica", "Uma pergunta útil de revisão para você mesmo(a): “O que eu presumi sobre esse homem que talvez não seja verdade?”"]
    ],
    vinheta: "Na segunda consulta, você percebe que falou muito sobre ereção, mas o paciente parecia mais preocupado com a reação da esposa à bolsa.",
    pratique: [
      q("Qual elemento do EX-PLISSIT ajuda a corrigir esse desvio?", [
        o("A Revisão, com reflexão sobre a própria atuação e retomada do que importa para ele.", "Isso. A revisão é focada no profissional e ajuda a desafiar suposições.", true),
        o("A Terapia Intensiva, encaminhando à terapia de casal.", "Antes de encaminhar, é preciso entender a demanda. Aqui o problema foi de foco na consulta.")
      ]),
      q("Um homem diz que quer “voltar a ser como antes”. Qual postura reflete o Esperançar?", [
        o("Garantir que, com tratamento, tudo voltará ao normal.", "Promessas irreais contrariam o Esperançar, que se ancora no presente vivido."),
        o("Construir com ele metas concretas e possíveis, reconhecendo outras formas de intimidade e prazer.", "Correto. Quadro 1: Esperançar e Reconstrução.", true)
      ])
    ]
  },
  {
    id: "permissao", titulo: "Preparar o encontro e pedir Permissão", min: 12, secoes: ["7-3", "7-9-1"],
    objetivo: "Conduzir a abertura do tema com segurança, respeitar a recusa e registrar adequadamente.",
    blocos: [
      { titulo: "Antes de falar", texto: [
        "Ambiente privativo, com privacidade visual e auditiva. Se o homem estiver acompanhado, pergunte se ele deseja que a pessoa permaneça; garanta primeiro um momento individual. No teleatendimento, plataforma segura e local reservado para ambos."
      ] },
      { titulo: "Os cinco passos (Figura 4)", texto: [
        "Prepare o ambiente; solicite permissão; respeite a escolha do indivíduo; inicie o diálogo; normalize e fortaleça. Uma boa abertura normaliza (“muitos homens com estoma têm dúvidas…”), explica por que o tema faz parte do cuidado e deixa claro que ele pode dizer não."
      ] },
      { titulo: "Quando a resposta é não", texto: [
        "Acolha sem julgamento, siga com o atendimento clínico e informe disponibilidade futura. Registre a oferta da abordagem, a decisão, as orientações e a possibilidade de retomada. A Permissão é renovada a cada encontro: o não de hoje não é o de amanhã."
      ] }
    ],
    alertas: [
      ["etica", "Não há Permissão implícita: a relevância clínica do tema não dispensa o consentimento, e a permissão de uma consulta não vale para a seguinte."],
      ["erro", "Começar pelo histórico sexual detalhado sem pedir Permissão “para aproveitar a consulta”. O resultado costuma ser fechamento e perda de vínculo."],
      ["etica", "Documente também a recusa. A ausência de registro apaga a oferta do cuidado."]
    ],
    vinheta: "Seu Antônio chega com a filha, que responde por ele a maior parte das perguntas.",
    pratique: [
      q("Como proceder antes de abordar a sexualidade?", [
        o("Conduzir com a filha presente, pois ela ajuda na comunicação.", "A presença de acompanhante depende do desejo do homem, e o tema pede privacidade."),
        o("Pedir, de forma natural, um momento a sós com ele e perguntar se deseja que a filha permaneça.", "Correto. Quadro 5 e Quadro 1 (Família).", true)
      ]),
      q("Ele recusa conversar sobre o tema. Qual registro é adequado?", [
        o("“Paciente sem queixas sexuais.”", "Esse registro distorce o que aconteceu: ele não negou queixas, recusou a conversa naquele momento."),
        o("“Ofertada abordagem sobre sexualidade; usuário optou por não conversar no momento; orientado sobre disponibilidade para retomar.”", "Isso: oferta, decisão e possibilidade de retomada (p. 31).", true)
      ])
    ]
  },
  {
    id: "informacao", titulo: "Informação Limitada: o que dizer e como", min: 18, secoes: ["7-9-3"],
    objetivo: "Oferecer informações gerais, precisas e pertinentes, selecionando os temas do Quadro 2 conforme a pessoa.",
    blocos: [
      { titulo: "Informações que todo homem com estoma deveria ouvir", texto: [
        "O estoma, por si só, não contraindica a atividade sexual. Ter um estoma não significa o fim da vida sexual, mas o início de um processo de reconstrução. A bolsa é um recurso que viabiliza a vida social e íntima, não um impedimento.",
        "Ereção, ejaculação e orgasmo são funções reguladas por vias nervosas distintas: é possível ter orgasmo com ejaculação retrógrada ou orgasmo seco. Mudanças persistentes têm abordagem clínica e não precisam ser aceitas como permanentes."
      ] },
      { titulo: "Cuidados práticos antes da intimidade (Quadro 3)", texto: [
        "Esvaziar a bolsa antes; verificar a aderência e, se necessário, reforçar com fita adesiva elástica; preferir bolsas com filtro de carvão ativado; considerar bolsa fechada, mini cap, capas, cintas ou faixas; para quem faz irrigação, realizá-la pouco antes. Evitar alimentos que aumentam gases nas horas anteriores (feijão, repolho, cerveja, refrigerantes).",
        "Posições que evitem pressão sobre o estoma: decúbito lateral com o estoma voltado para o lado oposto à parceria; por cima, inclinando para o lado sem a bolsa; almofadas para proteger o abdome. Após o orgasmo, o peristaltismo tende a aumentar: dobrar e fixar a bolsa ajuda."
      ] },
      { titulo: "Como conduzir", texto: [
        "Não é transmitir um pacote de informações, mas conversar: nomear experiências comuns antes de perguntar, desmistificar sem minimizar e verificar a compreensão. Em uma mesma consulta, escolha o que responde ao momento da pessoa."
      ] }
    ],
    alertas: [
      ["seguranca", "O estoma nunca deve ser penetrado ou manipulado durante a relação sexual, pelo risco de lesão, sangramento e complicações."],
      ["seguranca", "Após ressecção anterior baixa, excisão abdominoperineal ou panproctocolectomia, o sexo anal pode ficar comprometido ou impossibilitado (remoção do reto ou risco à anastomose). Informe com clareza e explore alternativas de prazer."],
      ["erro", "Minimizar o medo de gases, ruídos ou vazamento (“ninguém repara”). O incômodo é real; reconheça e ofereça estratégias."],
      ["dica", "Termine perguntando o que ficou de dúvida. Na dúvida, cuidadosamente pergunte!"]
    ],
    vinheta: "Rafael, 29 anos, ileostomia após proctocolectomia, pergunta se poderá voltar a ter sexo anal receptivo com o namorado.",
    pratique: [
      q("Qual a orientação adequada?", [
        o("Explicar que, com a remoção do reto, a prática pode ficar impossibilitada; que o estoma nunca deve ser penetrado; e explorar outras formas de prazer com ele e o parceiro.", "Correto e sem julgamento: Quadros 2 e 3.", true),
        o("Dizer que o assunto é delicado e encaminhar ao urologista.", "A orientação está no escopo da Informação Limitada; encaminhar sem orientar fecha a conversa."),
        o("Sugerir o estoma como alternativa, com bastante lubrificante.", "Nunca. Há risco de lesão e sangramento.")
      ]),
      q("Um homem diz que não sente mais nada porque não ejacula. O que informar?", [
        o("Que sem ejaculação não há orgasmo.", "Incorreto. São vias nervosas distintas."),
        o("Que orgasmo e ejaculação são funções distintas e que é possível ter orgasmo seco; e que a alteração merece avaliação.", "Isso (p. 42).", true)
      ]),
      q("Qual dica do Quadro 3 responde ao medo de a bolsa encher logo após o orgasmo?", [
        o("Dobrar a bolsa e fixá-la à pele com fita adesiva, porque o peristaltismo tende a aumentar após o orgasmo.", "Correto (p. 40).", true),
        o("Ficar em jejum por 24 horas antes da relação.", "Não há essa recomendação. A orientação é evitar alimentos que favorecem gases nas horas anteriores.")
      ])
    ]
  },
  {
    id: "disfuncoes", titulo: "Cirurgia, nervos e disfunções sexuais", min: 14, secoes: ["7-9-3-1"],
    objetivo: "Relacionar o tipo de cirurgia e outros fatores às disfunções possíveis, para orientar e encaminhar com fundamento.",
    blocos: [
      { titulo: "Inervação e função", texto: [
        "Cirurgias pélvicas podem lesar nervos autonômicos, hipogástricos superiores (próximos ao promontório sacral), esplâncnicos pélvicos e plexos junto às vesículas seminais e à próstata. Lesão simpática tende a comprometer a ejaculação (por exemplo, ejaculação retrógrada); lesão parassimpática tende a causar disfunção erétil."
      ] },
      { titulo: "Por tipo de cirurgia (Quadro 4)", texto: [
        "Exenteração pélvica: disfunção erétil, alterações da ejaculação, infertilidade e redução da resposta sexual. Proctocolectomia total com ileostomia: disfunção erétil, alterações ejaculatórias, menor satisfação. Cistectomia radical com urostomia: disfunção erétil, alterações ejaculatórias, redução da libido. Colectomias com preservação esfincteriana: alterações transitórias. Técnicas com preservação nervosa: menor incidência e recuperação mais favorável."
      ] },
      { titulo: "Não é só a técnica", texto: [
        "Idade, diabetes, hipertensão, doença cardiovascular, radioterapia, medicamentos, saúde mental, qualidade do relacionamento e adaptação ao estoma também influenciam. A recuperação tende a ser gradual, especialmente com acompanhamento multiprofissional."
      ] }
    ],
    alertas: [
      ["seguranca", "Revise sempre as medicações: anti-hipertensivos, antidepressivos e opioides são possíveis causas iatrogênicas de disfunção sexual. Discuta ajustes com a equipe médica; não suspenda por conta própria."],
      ["erro", "Atribuir toda disfunção à cirurgia. Fatores relacionais e psíquicos podem ser determinantes e mudam a conduta."],
      ["dica", "Disfunção erétil persistente e alterações ejaculatórias com repercussão importante estão entre as situações de encaminhamento (7.9.5)."]
    ],
    vinheta: "Seu Antônio, 68 anos, cistectomia radical com urostomia há 1 ano, hipertenso e diabético, relata desejo preservado, ereção insuficiente e ausência de ejaculação.",
    pratique: [
      q("Como interpretar esse quadro?", [
        o("É esperado após cistectomia radical e há fatores somados (idade, HAS, DM); vale avaliar, orientar e considerar encaminhamento urológico.", "Correto: Quadro 4 e fatores da p. 42.", true),
        o("A ausência de ejaculação indica que a cirurgia foi malsucedida.", "Alterações ejaculatórias são esperadas nesse procedimento."),
        o("Como o desejo está preservado, não há o que fazer.", "A função erétil e o sofrimento associado merecem avaliação e cuidado.")
      ]),
      q("Que informação do histórico muda a sua conduta?", [
        o("O uso de anti-hipertensivo, possível causa iatrogênica, a ser discutida com a equipe médica.", "Isso. O Quadro 6 pede verificar anti-hipertensivos, antidepressivos e opioides.", true),
        o("O tempo de estoma, porque após 1 ano não há mais recuperação.", "Não há esse limite; a recuperação é variável e gradual.")
      ])
    ]
  },
  {
    id: "avaliacao", titulo: "Histórico sexual e instrumentos", min: 16, secoes: ["7-7", "anexo-a", "anexo-b"],
    objetivo: "Conduzir o histórico do Quadro 6 e aplicar e interpretar o IIEF-15 e o QS-M com segurança.",
    blocos: [
      { titulo: "Histórico sexual", texto: [
        "Comece pelos tópicos menos sensíveis e avance para os mais sensíveis, usando os termos da pessoa. Registre idade, orientação sexual autodeclarada, interação socioafetiva, religião, situação conjugal, tipo de estoma e de cirurgia, tempo e condição do estoma, comorbidades e medicações. Depois: vida sexual ativa, retomada após a estomia, mudanças, corpo, intimidade, conversa com a parceria, ereção, desejo, excitação, ejaculação, sofrimento e insegurança com a bolsa."
      ] },
      { titulo: "IIEF-15", texto: [
        "Quinze itens em cinco domínios. O domínio função erétil (itens 1 a 5 e 15, máximo 30) classifica: 26 a 30 sem disfunção; 22 a 25 leve; 17 a 21 leve a moderada; 11 a 16 moderada; 6 a 10 grave. A soma total não tem classificação própria. Considere as últimas quatro semanas."
      ] },
      { titulo: "QS-M", texto: [
        "Dez itens de 0 a 5; a soma é multiplicada por 2 (0 a 100). Faixas: 82 a 100 muito satisfeito; 62 a 80 parcialmente satisfeito; 42 a 60 médio; 22 a 40 insatisfeito; 0 a 20 muito insatisfeito."
      ] }
    ],
    alertas: [
      ["erro", "Interpretar escore baixo no IIEF-15 sem olhar as respostas zero. “Sem atividade sexual” pontua zero e não equivale a disfunção: o escore pode refletir ausência de oportunidade, e não incapacidade."],
      ["etica", "Instrumentos são autoaplicáveis, mas a aplicação assistida exige privacidade e cuidado com o constrangimento. Explique a finalidade e respeite a decisão de não responder."],
      ["dica", "Os escores não explicam o contexto. Use-os para acompanhar a evolução entre consultas, junto com o histórico."]
    ],
    vinheta: "Rafael pontua 4/30 no domínio função erétil do IIEF-15. Nas questões 1 a 5, marcou “sem atividade sexual” porque está sem relações desde a cirurgia.",
    pratique: [
      q("Como interpretar?", [
        o("Disfunção erétil grave; encaminhar à urologia.", "O escore reflete a ausência de atividade, não necessariamente de função. A interpretação está limitada."),
        o("Interpretação limitada: as respostas zero indicam ausência de atividade. Explore os motivos (medo, vergonha, parceria) e reavalie depois.", "Correto.", true)
      ]),
      q("Qual sequência respeita o NIC Aconselhamento sexual?", [
        o("Começar perguntando sobre ereção e ejaculação.", "O NIC 5248 orienta começar pelos tópicos menos sensíveis."),
        o("Começar por adaptação ao estoma e relação com o corpo, e só depois função sexual.", "Isso.", true)
      ])
    ]
  },
  {
    id: "processo", titulo: "Processo de enfermagem: diagnóstico ao registro", min: 18, secoes: ["7-9-4"],
    objetivo: "Formular diagnósticos, resultados com escala e prazo e intervenções, e registrar no padrão do exemplo da p. 59.",
    blocos: [
      { titulo: "Os nove diagnósticos do Quadro 6", texto: [
        "Imagem corporal conturbada (00497), Ansiedade excessiva (00400), Medo excessivo (00390), Função sexual prejudicada (00386), Autoestima inadequada situacional (00481), Conhecimento de saúde inadequado (00435), Identidade pessoal conturbada (00494), Relacionamento ineficaz com o parceiro íntimo (00449) e Desempenho de papel ineficaz (00055). Foram identificados a partir de problemas relatados por homens com estoma."
      ] },
      { titulo: "Resultados NOC com escala", texto: [
        "Escolha indicadores relevantes, pontue o estado atual na escala de 1 a 5 e defina a meta e o prazo. Exemplo do manual: Funcionamento Sexual, “expressa conforto com o próprio corpo”, de levemente comprometido para pouco comprometido em 90 dias."
      ] },
      { titulo: "Registro completo", texto: [
        "Dados que fundamentam o diagnóstico (características definidoras e fatores relacionados), resultados e indicadores, atividades realizadas, encaminhamentos, resposta da pessoa e evolução, com data, hora e identificação profissional."
      ] }
    ],
    alertas: [
      ["erro", "Registrar só o título do diagnóstico. Sem características definidoras e fatores relacionados, o raciocínio clínico não fica documentado."],
      ["dica", "Metas pequenas e alcançáveis (subir 1 ou 2 pontos em 90 dias) favorecem a adesão e tornam a Revisão mais objetiva."],
      ["etica", "As classificações não restringem o programa: a CIPE® ou a linguagem institucional podem ser usadas, mantendo o raciocínio e a documentação."]
    ],
    vinheta: "Bruno relata vergonha do corpo, evita tirar a camisa e diz que a esposa “deve ter nojo”. IIEF-15 com função erétil 24/30.",
    pratique: [
      q("Qual diagnóstico é o mais pertinente como prioridade?", [
        o("Função sexual prejudicada (00386).", "A função erétil está na faixa leve; o foco do relato é a imagem corporal."),
        o("Imagem corporal conturbada (00497).", "Correto: imagem mental negativa em relação ao aspecto físico.", true),
        o("Desempenho de papel ineficaz (00055).", "Não há dados sobre mudança de papel.")
      ]),
      q("Qual meta está escrita adequadamente?", [
        o("“Melhorar a autoestima.”", "Sem indicador, escala nem prazo, não é possível avaliar na Revisão."),
        o("“Satisfação com a aparência do corpo: de 2 (raramente positivo) para 4 (frequentemente positivo) em 90 dias.”", "Isso: indicador, estado atual, meta e prazo.", true)
      ])
    ]
  },
  {
    id: "rede", titulo: "Terapia Intensiva, rede e continuidade", min: 12, secoes: ["7-9-5", "8"],
    objetivo: "Reconhecer quando encaminhar, fazê-lo de forma qualificada e manter a continuidade do cuidado.",
    blocos: [
      { titulo: "Quando encaminhar", texto: [
        "Sofrimento psicoemocional; disfunção erétil; alterações ejaculatórias com repercussão importante; infertilidade; conflitos relacionais ou conjugais significativos; baixa autoestima ou sofrimento ligado à imagem corporal; sintomas de ansiedade ou depressão; necessidade de intervenções especializadas indisponíveis no serviço."
      ] },
      { titulo: "Como encaminhar", texto: [
        "Avalie disponibilidade e acesso; discuta com o homem a necessidade e os objetivos; formalize; compartilhe informações clínicas relevantes; oriente o fluxo; acompanhe a efetivação. Possíveis destinos: psicologia, urologia, andrologia, fisioterapia pélvica, sexologia, serviço social, psiquiatria, terapia de casal/familiar e enfermagem especializada."
      ] },
      { titulo: "O que o(a) enfermeiro(a) habilitado(a) pode oferecer", texto: [
        "Para disfunção erétil, além da mudança de estilo de vida e das medicações prescritas pelo médico, enfermeiros(as) habilitados(as) podem realizar tratamentos conservadores como treino de fortalecimento pélvico, biofeedback, eletroestimulação, radiofrequência e terapia a vácuo. Para ejaculação precoce, técnicas comportamentais como o método stop-start."
      ] }
    ],
    alertas: [
      ["etica", "O encaminhamento não encerra a responsabilidade do cuidado: acompanhe a trajetória e verifique se a demanda foi acolhida."],
      ["seguranca", "Sinais de ansiedade intensa, depressão ou ideação de autoextermínio pedem avaliação em saúde mental sem demora."],
      ["erro", "Encaminhar sem discutir objetivos com o homem. Encaminhamentos não pactuados costumam não se efetivar."]
    ],
    vinheta: "Após três meses, Bruno mantém disfunção erétil (IIEF-15 14/30), dorme mal e diz que “não tem mais ânimo para nada”.",
    pratique: [
      q("Qual conduta é mais completa?", [
        o("Encaminhar à urologia e encerrar o acompanhamento de enfermagem.", "O manual pede continuidade e contrarreferência."),
        o("Pactuar encaminhamento à urologia e avaliação em saúde mental, manter a Revisão e acompanhar a efetivação.", "Correto: dois critérios de encaminhamento presentes e continuidade garantida.", true)
      ])
    ]
  },
  {
    id: "diversidade", titulo: "Masculinidades, diversidade e parceria", min: 14, secoes: ["7-9-3", "6-1"],
    objetivo: "Conduzir a abordagem sem presumir orientação sexual, modelo de relação ou de masculinidade, e incluir a parceria quando desejado.",
    blocos: [
      { titulo: "Masculinidades", texto: [
        "Normas que associam masculinidade à ereção, à penetração, ao controle corporal e à virilidade podem fazer o homem se sentir “menos homem”. Acolha esse sofrimento sem reforçar estereótipos e ajude a ressignificar o papel masculino para além do desempenho sexual (pontos de atenção do 00055)."
      ] },
      { titulo: "Linguagem não normativa", texto: [
        "Pergunte em vez de presumir: “você tem parceria?”, e não “e a sua esposa?”. Registre a orientação sexual como a pessoa se autodeclara. Considere idade, religião e contexto sociocultural sem impor os valores do profissional (Quadro 1: Diversidade e Realidade social)."
      ] },
      { titulo: "Parceria", texto: [
        "Garanta primeiro um momento individual e inclua a parceria quando o homem desejar. A parceria pode ser fonte de apoio ou de rejeição; explore a comunicação do casal sem expor o paciente a julgamentos. Intimidade vai além do ato sexual: toque, cuidado, conversa."
      ] }
    ],
    alertas: [
      ["erro", "Presumir heterossexualidade ou monogamia. Uma pergunta errada pode encerrar o vínculo."],
      ["erro", "Presumir desinteresse sexual pela idade. Estigma ligado à idade está entre os que o programa pede para combater."],
      ["dica", "Se errar o pronome ou a parceria, reconheça com naturalidade e siga. Reconhecer o erro fortalece a relação."]
    ],
    vinheta: "Ao perguntar “e a sua esposa, como reagiu?”, Rafael corrige: “é namorado”.",
    pratique: [
      q("Qual a melhor resposta?", [
        o("“Desculpe, Rafael. E o seu namorado, como tem reagido?”, e seguir com linguagem neutra.", "Correto: reconhece, corrige e mantém o foco nele.", true),
        o("Ignorar a correção para não constranger.", "Ignorar fragiliza o reconhecimento."),
        o("Mudar de assunto para os cuidados com a bolsa.", "Desviar reforça o silêncio que o programa busca romper.")
      ]),
      q("Seu Antônio, 68 anos, diz que “na idade dele isso não importa”, mas pergunta se a bolsa atrapalha namorar. O que fazer?", [
        o("Concordar e mudar de assunto.", "Presumir desinteresse pela idade é estigma."),
        o("Acolher a pergunta, pedir Permissão e explorar o que ele quer saber.", "Isso: a pergunta é uma abertura.", true)
      ])
    ]
  }
];

export const TIPO_ALERTA = {
  seguranca: ["Segurança do paciente", "alerta"],
  erro: ["Erro comum", "nota"],
  etica: ["Ética e registro", "info"],
  dica: ["Pérola clínica", "ok"]
};
