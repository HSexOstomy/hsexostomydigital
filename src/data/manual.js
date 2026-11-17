/* Estrutura de leitura do manual H_Sex_Ostomy (2026), com o texto das seções.
   Tipos de bloco: p, h, lista, nota, teoria, citacao, quadro (referência a dado estruturado), figura, ferramenta. */

export const partes = [
  { id: "abertura", titulo: "Apresentação e identidade", cor: "navy" },
  { id: "fundamentos", titulo: "Fundamentação teórica", cor: "violet" },
  { id: "metodo", titulo: "Metodologia de aplicação", cor: "blue" },
  { id: "fases", titulo: "Fases e níveis de intervenção", cor: "green" },
  { id: "gestao", titulo: "Rede, implantação e avaliação", cor: "navy" },
  { id: "anexos", titulo: "Referências, anexos e apêndice", cor: "gray" }
];

export const secoes = [
  {
    id: "apresentacao", num: "", titulo: "Apresentação", paginas: "8–9", parte: "abertura",
    resumo: "Por que o programa existe, de que pesquisas nasceu e como foi cocriado com enfermeiras da reabilitação.",
    blocos: [{ t: "apresentacao" }],
    ferramentas: [["sobre", "Conhecer o projeto"]]
  },
  {
    id: "identidade", num: "1–5", titulo: "Finalidade, missão, visão, valores e público-alvo", paginas: "10", parte: "abertura",
    resumo: "O que o programa busca, para quem foi feito e quais valores orientam cada encontro.",
    blocos: [{ t: "identidade" }],
    ferramentas: [["sobre", "Ver na página Sobre"]]
  },
  {
    id: "6-1", num: "6.1", titulo: "Teoria de Enfermagem de Reabilitação para o Bem-Viver", paginas: "10–18", parte: "fundamentos",
    resumo: "Referencial teórico-filosófico que entende a reabilitação como reconstrução da identidade na relação intersubjetiva entre enfermeira e pessoa cuidada.",
    blocos: [
      { t: "p", x: "A Teoria de Enfermagem de Reabilitação para o Bem-Viver constitui um referencial teórico-filosófico que orienta o cuidado de enfermagem de reabilitação, propõe uma abordagem ampliada do cuidado, valorizando o contexto, a subjetividade e a singularidade de cada pessoa, tendo como meta criar condições e possibilidades para o Bem-Viver (Schoeller, 2025)." },
      { t: "p", x: "Foi desenvolvida pelas pesquisadoras Soraia Dornelles Schoeller, Caroline Porcelis Vargas, Maria Manuela Martins e Milena Zuchetto, e propõe que a reabilitação seja vista como um processo de reconstrução da identidade da pessoa em busca de uma vida plena. Para as autoras, a teoria deve ser “instrumento para pensar e refletir uma prática de enfermagem de reabilitação com finalidade a autorrealização das pessoas envolvidas nesse processo, sendo possível pensar nas práticas nos mais diversos ambientes, constituições familiares, sociedades políticas e processos de viver” (Schoeller, 2025)." },
      { t: "h", x: "Dois fundamentos filosóficos" },
      { t: "lista", itens: [
        "Teoria do Reconhecimento de Axel Honneth: a identidade humana é formada por relações intersubjetivas de reconhecimento em três esferas, o Amor, o Direito e a Solidariedade, que favorecem, respectivamente, o desenvolvimento da autoconfiança, do autorrespeito e da autoestima.",
        "Princípio da Esperança de Ernst Bloch: fundamenta o cuidado como um movimento antecipador e motivacional, introduzindo o conceito de Esperançar, que transforma a angústia do presente em um futuro possível e tangível."
      ] },
      { t: "p", x: "Em sua estrutura conceitual, encontram-se os quatro conceitos metaparadigmáticos da enfermagem, pessoa, ambiente, saúde e enfermagem, aos quais se acrescenta o tempo como elemento essencial do processo de reabilitação. A esses conceitos articulam-se reabilitação, cuidado de enfermagem de reabilitação, relação intersubjetiva, reconhecimento, reconstrução, esperança, diversidade, autonomia, dignidade, participação autônoma e igualitária, autorrealização e Bem-Viver (Schoeller, 2025)." },
      { t: "p", x: "A pessoa é compreendida como um ser singular, diverso e multidimensional, constituído por dimensões biológicas, psicológicas, sociais, culturais, espirituais e éticas. O ambiente corresponde ao espaço físico, relacional, social, histórico e cultural no qual a pessoa vive e estabelece relações. A saúde ultrapassa a ausência de doença e envolve autonomia, reconhecimento, participação social e possibilidades de Bem-Viver. A enfermagem de reabilitação caracteriza-se como uma prática especializada, intencional e relacional, que apoia a pessoa na reconstrução da própria vida." },
      { t: "p", x: "Na relação intersubjetiva entre a enfermeira e a pessoa cuidada, o reconhecimento constitui uma relação recíproca, na qual as pessoas envolvidas reconhecem a subjetividade, a identidade e a diversidade uma da outra. A reabilitação concretiza-se por meio do cuidado de enfermagem, que busca favorecer a autonomia, a consciência, a esperança, o reconhecimento e a reconstrução da pessoa. Essa relação pode ser influenciada positiva ou negativamente pelas condições ambientais, sociais e temporais nas quais o cuidado acontece (Schoeller et al., 2025)." },
      { t: "p", x: "Para as autoras, a reabilitação é o processo de (re)construção da própria vida, no qual novas e velhas habilidades devem ser trabalhadas e redirecionadas, a fim de que a pessoa e sua rede de apoio deem continuidade ao processo de viver e ser estimados, respeitados e cidadãos. O Bem-Viver das pessoas em processo de reabilitação é resultado de construções ambientais, pessoais e relacionais desenvolvidas a partir da relação entre enfermeira de reabilitação e pessoa cuidada, uma relação intersubjetiva pautada no reconhecimento através da autoconfiança, do autorrespeito e da autoestima." },
      { t: "citacao", x: "A relação entre enfermeira e pessoa cuidada em reabilitação contribui para o Bem-Viver acontecer.", fonte: "Parcimônia da teoria (Schoeller, 2025)" },
      { t: "figura", fig: "teoria", legenda: "Figura 1. Diagrama de conceitos, definições e afirmações do modelo teórico da Teoria de Enfermagem de Reabilitação para o Bem-Viver.", fonte: "Redesenho a partir da figura do manual. Fonte original: Zuchetto." },
      { t: "h", x: "A teoria no H_Sex_Ostomy" },
      { t: "p", x: "No programa, a teoria orienta a compreensão da sexualidade como uma dimensão constitutiva do processo de viver e de reabilitação dos homens com estomas de eliminação. As mudanças decorrentes da condição de saúde, do tratamento e da presença do estoma podem repercutir na imagem corporal, na identidade, na autoconfiança, no autorrespeito, na autoestima, na autonomia e nas relações afetivas e sexuais. Em homens, essas repercussões atingem também a construção da identidade masculina e são influenciadas pelas experiências individuais, pelo tempo de convivência com o estoma e pelos contextos familiar, conjugal, assistencial, cultural e social (Anjos et al., 2025; Santos, 2025; Araújo, 2022)." },
      { t: "quadro", q: "quadro1", legenda: "Quadro 1. Operacionalização dos conceitos da Teoria de Enfermagem de Reabilitação para o Bem-Viver no H_Sex_Ostomy (adaptado de Zuchetto, 2023)." },
      { t: "p", x: "No H_Sex_Ostomy, a pessoa é reconhecida em sua singularidade, história, identidade, corporeidade, sexualidade, desejos, valores e crenças. O ambiente compreende as relações e condições que favorecem ou obstaculizam essa vivência, como parceria, família, rede de apoio e aspectos sociais e culturais. O tempo é entendido como processo contínuo e não linear, no qual a reconstrução da sexualidade após o estoma produz novas necessidades ao longo do viver. A Enfermagem de Reabilitação articula esse processo por meio da relação intersubjetiva entre enfermeira(o) e pessoa cuidada, sustentada em escuta, diálogo e participação nas decisões." },
      { t: "nota", x: "O programa não se configura como um roteiro rígido de condutas, mas como um direcionamento clínico-assistencial. O julgamento clínico do(a) enfermeiro(a) para avaliar, identificar diagnósticos e selecionar intervenções adequadas a cada encontro é condição indispensável, uma vez que o que se adequa a um homem em determinado contexto regional, cultural e socioeconômico pode não corresponder às necessidades de outro, mesmo dentro do mesmo território nacional." }
    ],
    ferramentas: [["fundamentos", "Explorar os 41 conceitos"]]
  },
  {
    id: "6-2", num: "6.2", titulo: "Modelo Extended PLISSIT (EX-PLISSIT)", paginas: "18–20", parte: "fundamentos",
    resumo: "Modelo para abordar o bem-estar sexual em deficiência adquirida ou doença crônica, com a Permissão no centro e um ciclo contínuo de reflexão e revisão.",
    blocos: [
      { t: "p", x: "O Extended PLISSIT (EX-PLISSIT) é um modelo proposto para profissionais de saúde abordarem as necessidades de bem-estar sexual de indivíduos com deficiência adquirida ou doença crônica. Traz como foco a permissão e a revisão constante, de modo que todas as intervenções devem ser iniciadas com a permissão do indivíduo, dando a oportunidade para fazer perguntas e/ou expressar suas preocupações (Taylor; Davis, 2007)." },
      { t: "figura", fig: "explissit", legenda: "Figura 2. Modelo EX-PLISSIT.", fonte: "Redesenho a partir de Taylor, B.; Davis, S. The Extended PLISSIT Model for Addressing the Sexual Wellbeing of Individuals with an Acquired Disability or Chronic Illness. Sex Disabil 25, 135–139 (2007)." },
      { t: "lista", itens: [
        "Informação Limitada: informações gerais, que precisam ser inclusivas e relevantes para o indivíduo. O profissional não deve presumir que os pacientes se sentirão capazes de revelar seus problemas e preocupações em um primeiro momento, o que evidencia a necessidade da permissão.",
        "Sugestões Específicas: abordagem baseada na resolução de problemas específicos do paciente, que requer mais conhecimento e habilidade. O profissional precisa realizar uma anamnese sexual para identificar problemas, preocupações e expectativas.",
        "Terapia Intensiva: pode ser oferecida em qualquer estágio. É primordial que os profissionais reconheçam seus pontos fortes e suas limitações e identifiquem a necessidade de encaminhamento a profissionais especializados (psicólogos, sexólogos, urologistas etc.)."
      ] },
      { t: "p", x: "O modelo propõe um ciclo de reflexão e revisão, desafiando suposições para desenvolver conhecimento e autoconsciência. A reflexão é focada no paciente, enquanto a revisão é focada no profissional. Uma vez que determinado assunto tenha sido discutido, os profissionais não devem presumir que foi totalmente resolvido, porque a sexualidade é dinâmica e pode ser impactada por mudanças nas dimensões físicas, sociais e psicológicas. Os profissionais devem refletir sobre suas atitudes e os impactos que podem ter tido na consulta, individualmente ou com colegas, informalmente ou por meio de supervisão clínica. A revisão permite trabalhar em equipe para atender às necessidades de bem-estar sexual (Taylor; Davis, 2007)." }
    ],
    ferramentas: [["programa", "Ver os cinco componentes"]]
  },
  {
    id: "7-1", num: "7–7.1", titulo: "Metodologia de aplicação, materiais e insumos", paginas: "20–21", parte: "metodo",
    resumo: "Recursos humanos, tecnológicos e físicos necessários para aplicar o programa.",
    blocos: [
      { t: "p", x: "O programa fundamenta-se na Teoria de Enfermagem de Reabilitação para o Bem-Viver (Schoeller, 2025), promovendo um cuidado pautado na intersubjetividade e na escuta qualificada da pessoa cuidada. Articulado ao modelo EX-PLISSIT (Taylor; Davis, 2007), o processo é conduzido por um fluxo contínuo de reflexão e revisão, no qual o(a) enfermeiro(a) atua como impulsionador(a) na busca pelo Bem-Viver." },
      { t: "h", x: "Recursos humanos" },
      { t: "lista", itens: ["Enfermeiros(as) capacitados(as) para aplicação do programa H_Sex_Ostomy."] },
      { t: "h", x: "Recursos tecnológicos" },
      { t: "lista", itens: ["Manual técnico-educativo do programa H_Sex_Ostomy.", "Formulários e instrumentos para levantamento do histórico sexual e identificação das necessidades da pessoa cuidada.", "Instrumentos validados para avaliação e acompanhamento da função e satisfação sexual, quando necessário, como o IIEF-15 e o QS-M.", "Formulários para registro dos diagnósticos de enfermagem, planejamento das intervenções e acompanhamento.", "Fluxo institucional de encaminhamento e acompanhamento multiprofissional, quando necessário.", "Materiais educativos complementares, como peças anatômicas, manequins, álbuns seriados, vídeos e infográficos, quando disponíveis ou elaborados pela equipe com base no conteúdo do programa.", "Para atendimentos remotos, plataforma digital segura, que assegure confidencialidade e proteção das informações."] },
      { t: "h", x: "Recursos físicos" },
      { t: "lista", itens: ["Ambiente privativo, acolhedor e acessível, que assegure confidencialidade, conforto e privacidade visual e auditiva.", "Para atendimentos remotos, dispositivo eletrônico com câmera, áudio e acesso à internet, como computador, tablet ou smartphone."] }
    ],
    ferramentas: [["calculadoras", "Instrumentos IIEF-15 e QS-M"], ["planejador", "Formulário de registro"]]
  },
  {
    id: "7-2", num: "7.2", titulo: "Contextos de aplicação do programa", paginas: "21–22", parte: "metodo",
    resumo: "Onde o programa pode acontecer e quais resoluções do COFEN amparam cada modalidade.",
    blocos: [
      { t: "p", x: "O programa pode ser aplicado por enfermeiros(as) em diferentes contextos assistenciais que atuem na reabilitação da pessoa com estoma, respeitando as especificidades de cada cenário:" },
      { t: "lista", itens: [
        "Serviços de Reabilitação da Pessoa com Estoma: contexto primário de aplicação, com atendimento individualizado, contínuo e centrado nas necessidades de cada homem.",
        "Atenção Primária à Saúde: Unidades Básicas de Saúde, Estratégia Saúde da Família e demais serviços, favorecendo a identificação precoce das demandas relacionadas à sexualidade e intimidade, o acompanhamento longitudinal e a educação em saúde. O(a) enfermeiro(a) pode realizar acolhimento, avaliação das necessidades, orientações e encaminhamentos, articulando o cuidado com a Rede de Atenção à Saúde.",
        "Consultórios e Clínicas de Enfermagem: prática autônoma do(a) enfermeiro(a), reconhecendo a dimensão empreendedora da profissão e seu papel como gestor(a) do cuidado especializado em saúde sexual e reabilitação.",
        "Atenção Domiciliar: quando o contexto clínico ou a condição do usuário indicar, garantindo continuidade do cuidado com preservação da privacidade e do conforto.",
        "Teleatendimento: consultas por plataformas digitais seguras, como modalidade complementar ou substitutiva, ampliando o acesso independentemente de barreiras geográficas, de mobilidade ou de disponibilidade."
      ] },
      { t: "nota", x: "O programa pode ser implementado na modalidade presencial ou, quando necessário, de forma remota ou domiciliar, em conformidade com os preceitos ético-legais da enfermagem. Resoluções que regulamentam essas modalidades: COFEN nº 568/2018, alterada pela nº 606/2019 (Consultórios e Clínicas de Enfermagem); COFEN nº 766/2024 (Atenção Domiciliar); COFEN nº 696/2022 (Saúde Digital e Telenfermagem); COFEN nº 728/2023, alterada pela nº 803/2026 (Enfermagem de Reabilitação); COFEN nº 735/2024 (Enfermeiro navegador e Enfermeiro clínico especialista)." }
    ]
  },
  {
    id: "7-3", num: "7.3–7.4", titulo: "Periodicidade das consultas e singularidades", paginas: "23", parte: "metodo",
    resumo: "Quando retomar o tema e como ajustar a profundidade da abordagem ao ritmo de cada homem.",
    blocos: [
      { t: "h", x: "7.3 Periodicidade recomendada" },
      { t: "lista", itens: [
        "A temática pode ser introduzida de forma gradual, já na primeira consulta de enfermagem após admissão no serviço, permanecendo como componente longitudinal do cuidado nas consultas subsequentes, minimamente a cada três meses, podendo ser ajustada conforme as necessidades individuais (Distrito Federal, 2022).",
        "O intervalo entre atendimentos deve ser ajustado conforme as demandas clínicas, emocionais e psicossociais da pessoa cuidada. Teleatendimentos intermediários podem ser ofertados sempre que o(a) enfermeiro(a) ou o próprio homem identificar necessidade."
      ] },
      { t: "h", x: "7.4 Singularidades no processo de reabilitação sexual" },
      { t: "p", x: "Alguns homens poderão demonstrar maior abertura para discutir a sexualidade desde o primeiro atendimento, enquanto outros poderão necessitar de tempo, vínculo terapêutico e abordagens mais superficiais antes de aprofundar a temática. O(a) enfermeiro(a) deve:" },
      { t: "lista", itens: [
        "Garantir espaço seguro, acolhedor e livre de julgamentos, reconhecendo e preservando a subjetividade e validando a singularidade da pessoa cuidada.",
        "Respeitar a vontade, autonomia, intimidade, os limites e o tempo de cada pessoa.",
        "Observar sinais verbais e não verbais de abertura, desconforto ou sofrimento emocional, agindo com sensibilidade ética.",
        "Considerar especificidades, particularidades, experiências e contexto vivido, como elementos que moldam a identidade masculina.",
        "Ajustar a profundidade da abordagem conforme a abertura, receptividade e interesse da pessoa cuidada, baseando-se na permissão contínua.",
        "Reconhecer que a pessoa cuidada pode, a qualquer momento, aprofundar a discussão, interromper a conversa e retomar a temática posteriormente."
      ] }
    ],
    ferramentas: [["consulta", "Preparar a consulta"]]
  },
  {
    id: "7-5", num: "7.5–7.6", titulo: "Iniciativa do(a) enfermeiro(a) e demandas tardias", paginas: "24", parte: "metodo",
    resumo: "Por que cabe ao(à) enfermeiro(a) abrir a conversa e por que muitas demandas só aparecem meses depois.",
    blocos: [
      { t: "h", x: "7.5 Iniciativa e abertura para o diálogo" },
      { t: "p", x: "Mesmo que a pessoa não manifeste preocupações iniciais, recomenda-se que o(a) enfermeiro(a) inicie o diálogo. A oferta de Informações Limitadas deve, contudo, ser sempre precedida pela solicitação da Permissão, assegurando o consentimento e o conforto durante o encontro. Essa estratégia favorece o reconhecimento da sexualidade como dimensão legítima do cuidado e permite que o homem compreenda que o(a) enfermeiro(a) é um profissional capacitado e disponível para essa abordagem." },
      { t: "p", x: "Dúvidas, receios ou preocupações, como questionamentos sobre função erétil e intimidade com a parceria, podem surgir durante o encontro, e essa abertura prévia reduz a probabilidade de que permaneçam silenciadas. Alguns homens evitam trazer a temática espontaneamente por receio de serem mal interpretados, por vergonha ou constrangimento, o que reforça a importância de que o(a) enfermeiro(a) tome a iniciativa e se mostre aberto(a) à discussão (Rabelo, 2025; Lin; Yin; Chen, 2023; Fourie et al., 2025)." },
      { t: "h", x: "7.6 Identificando demandas tardias" },
      { t: "p", x: "Ao estabelecer vínculo, é possível que muitas demandas relacionadas à sexualidade e intimidade surjam de forma tardia, à medida que o homem retoma as atividades afetivas e sexuais (Lin; Yin; Chen, 2023; Fourie et al., 2025). Esse adiamento pode estar relacionado a:" },
      { t: "lista", itens: ["Prioridades com cuidados decorrentes do procedimento cirúrgico.", "Preocupações com a funcionalidade do estoma e dos dispositivos coletores e adjuvantes.", "Preocupações relacionadas à própria sobrevivência e ao tratamento da doença de base.", "Não aproximação ou valorização da sexualidade enquanto questão a ser tratada.", "Ausência de alterações orgânicas e funcionais de origem geniturinária e sexual, em um primeiro momento.", "Comprometimento do letramento em saúde sexual/sexualidade.", "Comprometimento da saúde mental, evidenciado por expressões verbais e não verbais."] }
    ]
  },
  {
    id: "7-7", num: "7.7", titulo: "Consulta e avaliação clínica com foco na sexualidade", paginas: "25–26", parte: "metodo",
    resumo: "Instrumentos validados (IIEF-15 e QS-M), taxonomias do processo de enfermagem e condução flexível e não linear.",
    blocos: [
      { t: "p", x: "Durante as consultas, o(a) enfermeiro(a) poderá utilizar instrumentos clínicos para apoiar o raciocínio diagnóstico e a tomada de decisão terapêutica, incluindo histórico sexual direcionado, perguntas norteadoras relacionadas à intimidade e adaptação ao estoma, além de instrumentos validados para a população brasileira:" },
      { t: "lista", itens: [
        "Índice Internacional de Função Erétil (IIEF-15): 15 questões agrupadas em cinco domínios (função erétil, orgasmo, desejo sexual, satisfação sexual e satisfação geral). Permite classificar a função erétil desde ausência de disfunção até disfunção erétil grave (Gonzáles, 2013). Anexo A.",
        "Quociente Sexual Masculino (QS-M): 10 itens sobre satisfação sexual masculina, cada um pontuado de 0 a 5. O escore final é a soma multiplicada por dois, de 0 a 100, e escores mais elevados indicam maior satisfação e desempenho sexual (Abdo, 2006). Anexo B."
      ] },
      { t: "nota", x: "Não há impedimento para a aplicação desses instrumentos por enfermeiros(as), uma vez que ambos são autoaplicáveis. A aplicação pode ocorrer de forma assistida em situações que envolvam dificuldades de leitura, compreensão ou necessidade de esclarecimentos. A utilização de instrumentos validados encontra respaldo na Resolução COFEN que trata do Processo de Enfermagem, segundo a qual o processo deve estar fundamentado em suporte teórico, incluindo instrumentos de avaliação e predição de risco validados." },
      { t: "p", x: "A partir das necessidades identificadas, o(a) enfermeiro(a) poderá desenvolver sugestões específicas e encaminhamentos especializados, utilizando o processo de enfermagem fundamentado nas taxonomias NANDA-I/INKA (diagnósticos), NOC (resultados) e NIC (intervenções)." },
      { t: "nota", x: "A escolha das classificações NANDA-I/INKA, NOC e NIC não restringe a aplicação do programa a essas terminologias. Em outros contextos, o(a) enfermeiro(a) poderá utilizar os sistemas de linguagem adotados institucionalmente, como a CIPE®, desde que sejam mantidos o raciocínio clínico, a individualização do cuidado, a documentação das etapas do Processo de Enfermagem e a coerência com as necessidades identificadas." },
      { t: "h", x: "Condução flexível e não linear" },
      { t: "lista", itens: ["Adequar o conteúdo, a profundidade e a complexidade das abordagens às necessidades, condições clínicas e contexto da pessoa cuidada.", "Reconhecer os diferentes tempos, experiências e necessidades individuais.", "Reconhecer que a reabilitação sexual não ocorre de maneira sequencial ou progressiva para todos, podendo haver avanços, dificuldades, interrupções, novas demandas ou necessidade de revisitar conteúdos."] }
    ],
    ferramentas: [["iief", "Aplicar o IIEF-15"], ["qsm", "Aplicar o QS-M"]]
  },
  {
    id: "7-8", num: "7.8", titulo: "Fluxograma do H_Sex_Ostomy", paginas: "27–28", parte: "metodo",
    resumo: "Representação visual do acompanhamento longitudinal: pontos de decisão, caminhos alternativos e o loop contínuo.",
    blocos: [
      { t: "p", x: "O fluxograma representa visualmente o processo de acompanhamento longitudinal contínuo de homens com estomas de eliminação em serviços de reabilitação. É uma ferramenta de apoio à prática clínica que sintetiza as fases do modelo EX-PLISSIT adaptado ao contexto da reabilitação sexual." },
      { t: "p", x: "Seu objetivo é orientar a condução sistemática da abordagem da sexualidade após a estomia, facilitar a tomada de decisão clínica, evidenciar o caráter longitudinal e contínuo do acompanhamento e servir como material educativo. Na prática, pode ser impresso e fixado nos consultórios como lembrete visual, utilizado em capacitações e apresentado ao usuário, quando apropriado, para que compreenda o processo." },
      { t: "figura", fig: "fluxograma", legenda: "Figura 3. Fluxograma sintetizado do H_Sex_Ostomy: Programa de Reabilitação da Sexualidade Masculina.", fonte: "Elaboração própria, 2026." },
      { t: "nota", x: "Recomenda-se que o(a) enfermeiro(a) utilize o fluxograma como orientação geral, exercendo sempre sua autonomia profissional e julgamento clínico para adaptar o processo às singularidades de cada pessoa cuidada." }
    ],
    ferramentas: [["fluxograma", "Explorar o fluxograma interativo"]]
  },
  {
    id: "7-9", num: "7.9", titulo: "Estrutura do programa: fases e níveis de intervenção", paginas: "29", parte: "fases",
    resumo: "As fases se retroalimentam e podem ser retomadas a qualquer momento. Cada uma tem objetivo e meta orientadores.",
    blocos: [
      { t: "p", x: "O programa está organizado em fases sequenciais e interdependentes, estruturadas a partir do modelo EX-PLISSIT e adaptadas ao contexto da reabilitação sexual do homem com estoma. Cada fase representa um nível crescente de complexidade e profundidade. A progressão não é rígida nem linear: o(a) enfermeiro(a) deve avaliar, a cada encontro, em qual nível o paciente se encontra e qual abordagem melhor responde às suas demandas naquele momento." },
      { t: "p", x: "Parte-se do entendimento de que a sexualidade é um fenômeno complexo e singular, influenciado por fatores biológicos, emocionais, relacionais e sociais, que não pode ser reduzido a uma fase isolada do cuidado (WHO, 2006). As fases se retroalimentam e podem ser retomadas a qualquer momento." },
      { t: "nota", x: "O conteúdo apresentado é sugestivo, elaborado com base em dados empíricos de pesquisa de campo com homens com estomas de eliminação e enfermeiras do Serviço de Reabilitação, além da literatura científica. O(a) enfermeiro(a) deve exercer sua autonomia para escolher as abordagens mais pertinentes a cada situação." },
      { t: "componentes" }
    ]
  },
  {
    id: "7-9-1", num: "7.9.1", titulo: "Permissão", paginas: "29–31", parte: "fases", cor: "p",
    resumo: "Deve ser solicitada em todos os estágios. Todas as intervenções começam com a permissão do homem.",
    blocos: [
      { t: "objetivoMeta", ref: "permissao" },
      { t: "figura", fig: "permissao", legenda: "Figura 4. Estratégia de aplicação da etapa Permissão.", fonte: "Elaboração própria, 2026." },
      { t: "falas", ref: "permissao" },
      { t: "nota", ref: "recusa" }
    ],
    ferramentas: [["consulta/permissao", "Usar na consulta"]]
  },
  {
    id: "7-9-2", num: "7.9.2", titulo: "Revisão", paginas: "31–32", parte: "fases", cor: "r",
    resumo: "Acontece continuamente, no final de cada consulta e no início das sessões subsequentes.",
    blocos: [
      { t: "objetivoMeta", ref: "revisao" },
      { t: "figura", fig: "revisao", legenda: "Figura 5. Estratégia de aplicação da fase da Revisão.", fonte: "Elaboração própria, 2026." },
      { t: "falas", ref: "revisao" }
    ],
    ferramentas: [["consulta/revisao", "Usar na consulta"]]
  },
  {
    id: "7-9-3", num: "7.9.3", titulo: "Informação Limitada", paginas: "33–41", parte: "fases", cor: "li",
    resumo: "Seis temáticas recorrentes, cada uma com finalidade, o que informar, atribuição do(a) enfermeiro(a) e exemplos de fala.",
    blocos: [
      { t: "objetivoMeta", ref: "informacao" },
      { t: "p", x: "O intuito não é transmitir um conjunto de informações, mas conduzir uma conversa que normalize o tema, amplie a compreensão da sexualidade como dimensão do Bem-Viver e reduza o isolamento que muitos homens sentem diante dessas questões. Barreiras como vergonha, receio de ser mal interpretado e ausência de abertura do profissional frequentemente impedem que essas informações cheguem à pessoa cuidada, e cabe ao(à) enfermeiro(a) tomar a iniciativa de oferecer esse espaço (Fischer, 2026)." },
      { t: "p", x: "Ter um estoma não significa o fim da vida sexual, mas o início de um processo de reconstrução, definido na teoria como a elaboração de construções sucessivas em diversas possibilidades para o Bem-Viver. Esse processo é gradual e individual, devendo ser conduzido com acolhimento e sem julgamentos, de modo a favorecer a consciencialização (Schoeller, 2025)." },
      { t: "nota", x: "Considere o conhecimento e o aprendizado da pessoa cuidada, os mitos, tabus, influências socioculturais e a linguagem, evitando presumir que a pessoa compreende tudo o que foi dito. Na dúvida, cuidadosamente pergunte! Em uma mesma consulta não é necessário contemplar todos os tópicos: o(a) profissional tem autonomia para selecionar e adaptar as informações mais relevantes." },
      { t: "quadro", q: "quadro2", legenda: "Quadro 2. Temáticas recorrentes que podem ser abordadas na fase de Informação Limitada nos encontros terapêuticos." },
      { t: "p", x: "Algumas estratégias práticas de autocuidado podem contribuir para a segurança, o conforto e a autoconfiança do homem com estoma durante a intimidade. Elas representam um exercício de autonomia e autorrespeito e devem ser compreendidas como sugestões adaptáveis à singularidade de cada pessoa, não como condutas prescritivas." },
      { t: "quadro", q: "quadro3", legenda: "Quadro 3. Dicas práticas de cuidados antes da atividade sexual." }
    ],
    ferramentas: [["consulta/informacao", "Falas prontas por tema"], ["orientacoes", "Imprimir orientações ao paciente"]]
  },
  {
    id: "7-9-3-1", num: "7.9.3.1", titulo: "Disfunções sexuais possíveis", paginas: "42–43", parte: "fases", cor: "li",
    resumo: "Fatores que influenciam a função sexual após cirurgia pélvica, nervos envolvidos e disfunções por tipo de cirurgia.",
    blocos: [
      { t: "p", x: "A presença de disfunção sexual após cirurgia pélvica não depende exclusivamente da técnica cirúrgica. Fatores como idade, comorbidades (diabetes, hipertensão, doença cardiovascular), radioterapia, uso de medicamentos, saúde mental, qualidade do relacionamento e processo de adaptação ao estoma também influenciam a recuperação da função sexual (Ghomeshi et al., 2023; Zigouras et al., 2025)." },
      { t: "p", x: "Nas cirurgias pélvicas, a função sexual masculina pode ser comprometida por lesão de estruturas nervosas, cuja extensão depende da complexidade e do alcance da intervenção: nervos autonômicos, nervos hipogástricos superiores (próximos ao promontório sacral e à região pré-sacral), nervos esplâncnicos pélvicos e fibras simpáticas e parassimpáticas. Lesões nas fibras simpáticas podem comprometer a ejaculação (por exemplo, ejaculação retrógrada), enquanto lesões parassimpáticas tendem a resultar em disfunção erétil. Danos aos plexos adjacentes às vesículas seminais e à próstata, de inervação mista, também podem repercutir na função erétil." },
      { t: "citacao", x: "A vivência do orgasmo não está diretamente atrelada à ereção ou à ejaculação, pois essas funções são reguladas por vias nervosas distintas.", fonte: "Manual, p. 42" },
      { t: "p", x: "Alguns homens podem apresentar ejaculação retrógrada, redução da intensidade orgástica ou orgasmo seco e ainda assim experienciar o orgasmo. A recuperação da função sexual tende a ser gradual, especialmente quando sustentada por acompanhamento multiprofissional, manejo adequado das demandas físicas e emocionais e suporte contínuo ao longo da reabilitação." },
      { t: "quadro", q: "quadro4", legenda: "Quadro 4. Disfunções sexuais masculinas comuns após estomia." }
    ],
    ferramentas: [["orientacoes", "Consultar na prática"]]
  },
  {
    id: "7-9-4", num: "7.9.4", titulo: "Sugestões Específicas", paginas: "43–59", parte: "fases", cor: "ss",
    resumo: "Atuação direcionada: histórico, nove diagnósticos de enfermagem com NOC e NIC, pontos de atenção e exemplo de registro.",
    blocos: [
      { t: "objetivoMeta", ref: "sugestoes" },
      { t: "p", x: "O(a) enfermeiro(a) deve atuar de forma direcionada, compreendendo a reabilitação como um processo de reconstrução na/para/com a diversidade, que contempla dimensões físicas, emocionais, relacionais e sociais (Schoeller, 2025)." },
      { t: "falas", ref: "quadro5" },
      { t: "nota", x: "O Quadro 6 constitui um direcionamento clínico-assistencial, não um roteiro rígido de conduta. Os diagnósticos apresentados foram identificados a partir de problemas relatados por homens com estoma durante as entrevistas de um estudo de métodos mistos desenvolvido pela pesquisadora." },
      { t: "quadro", q: "quadro6", legenda: "Quadro 6. Plano de cuidados para a fase de Sugestões Específicas: histórico, diagnósticos de enfermagem, resultados e intervenções." },
      { t: "h", x: "Exemplo de registro (p. 59)" },
      { t: "p", x: "Na prática, o registro no prontuário deve contemplar todas as etapas do Processo de Enfermagem: os dados clínicos que fundamentam o diagnóstico, incluindo fatores relacionados e características definidoras; os resultados esperados e indicadores NOC; as atividades realizadas; os encaminhamentos; a resposta da pessoa e a evolução dos resultados, com data, hora e identificação do profissional." },
      { t: "registro" }
    ],
    ferramentas: [["planejador", "Montar o plano no Planejador"]]
  },
  {
    id: "7-9-5", num: "7.9.5", titulo: "Terapia Intensiva", paginas: "60–61", parte: "fases", cor: "it",
    resumo: "Não é fase obrigatória. Quando encaminhar, para quem, e por que o encaminhamento não encerra o cuidado.",
    blocos: [
      { t: "p", x: "A Terapia Intensiva não constitui necessariamente uma fase obrigatória do programa. Ela é indicada quando as demandas identificadas excedem o escopo das intervenções realizadas pelo(a) enfermeiro(a), exigindo avaliação, acompanhamento ou tratamento especializado por outros profissionais ou serviços da rede de atenção à saúde." },
      { t: "objetivoMeta", ref: "terapia" },
      { t: "terapia" }
    ],
    ferramentas: [["encaminhamento", "Gerar encaminhamento"]]
  },
  {
    id: "8", num: "8", titulo: "Articulação em rede e continuidade do cuidado", paginas: "62", parte: "gestao",
    resumo: "O(a) enfermeiro(a) coordena o cuidado: identifica a rede mínima de suporte e estabelece padrões intercolaborativos.",
    blocos: [
      { t: "p", x: "O(a) enfermeiro(a) desempenha papel estratégico na coordenação do cuidado, promovendo a comunicação entre os serviços, monitorando o acesso do usuário aos recursos necessários e acompanhando sua trajetória ao longo do processo de reabilitação." },
      { t: "p", x: "Recomenda-se a identificação da rede mínima de suporte do homem com estoma, compreendendo familiares, parceiro(a), cuidadores, atenção primária, serviços especializados, grupos de apoio e demais recursos comunitários. A partir dessa avaliação, devem-se estabelecer padrões intercolaborativos, articulando ações com a equipe multiprofissional e os diferentes níveis de atenção, favorecendo a corresponsabilização pelo cuidado, a longitudinalidade do acompanhamento e a reabilitação." },
      { t: "figura", fig: "rede", legenda: "Figura 6. Identificação da rede de cuidados ao homem com estoma.", fonte: "Elaboração própria, 2026." }
    ],
    ferramentas: [["encaminhamento", "Mapear a rede"]]
  },
  {
    id: "9", num: "9", titulo: "Implantação e avaliação do programa", paginas: "63–66", parte: "gestao",
    resumo: "Seis diretrizes norteadoras para implantar o programa e oito indicadores de estrutura, processo e resultado.",
    blocos: [
      { t: "p", x: "A incorporação do H_Sex_Ostomy aos serviços pressupõe um processo organizado, que envolve condições prévias para a implantação, operacionalização das ações assistenciais e acompanhamento sistemático da execução e dos resultados. As orientações têm caráter norteador e devem ser adequadas aos recursos de cada contexto, preservando os fundamentos teóricos, os componentes essenciais e a finalidade do programa." },
      { t: "h", x: "9.1 Diretrizes para implantação" },
      { t: "diretrizes" },
      { t: "h", x: "9.2 Indicadores de acompanhamento" },
      { t: "p", x: "Os indicadores têm caráter propositivo e são um ponto de partida a ser ajustado conforme as especificidades de cada serviço. Recomenda-se que gestores e enfermeiros(as) selecionem aqueles factíveis de implementação e monitoramento contínuo, podendo incorporar outros que julgarem pertinentes, mantida a coerência com os objetivos do programa." },
      { t: "quadro", q: "quadro7", legenda: "Quadro 7. Sugestão de indicadores de estrutura, processo e resultado para acompanhamento do programa." }
    ],
    ferramentas: [["implantacao", "Calcular indicadores"]]
  },
  {
    id: "referencias", num: "", titulo: "Referências", paginas: "67–70", parte: "anexos",
    resumo: "Lista completa das referências do manual.",
    blocos: [{ t: "referencias" }]
  },
  {
    id: "anexo-a", num: "Anexo A", titulo: "IIEF-15: Índice Internacional de Função Erétil", paginas: "70–72", parte: "anexos",
    resumo: "As 15 perguntas e alternativas, com cálculo automático dos cinco domínios.",
    blocos: [{ t: "instrumento", ref: "iief" }],
    ferramentas: [["iief", "Aplicar o IIEF-15"]]
  },
  {
    id: "anexo-b", num: "Anexo B", titulo: "Quociente Sexual: Versão Masculina (QS-M)", paginas: "73–74", parte: "anexos",
    resumo: "As 10 perguntas, pontuação de 0 a 100 e faixas de interpretação.",
    blocos: [{ t: "instrumento", ref: "qsm" }],
    ferramentas: [["qsm", "Aplicar o QS-M"]]
  },
  {
    id: "apendice-a", num: "Apêndice A", titulo: "H_Sex_Ostomy na prática: material-síntese", paginas: "75", parte: "anexos",
    resumo: "O que fazer em cada etapa do encontro terapêutico, em uma página.",
    blocos: [{ t: "sintese" }],
    ferramentas: [["sintese", "Abrir versão para imprimir"]]
  }
];

export const referencias = [
  "ABDO, C. H. N. The male sexual quotient: a brief, self-administered questionnaire to assess male sexual satisfaction. The Journal of Sexual Medicine, v. 4, n. 2, p. 382-389, 2007. DOI: 10.1111/j.1743-6109.2006.00414.x.",
  "ANJOS, C. S. et al. Vulnerabilidades individuais, sociais e programáticas vivenciadas por pessoas com estomas de eliminação: revisão de escopo. Cogitare Enfermagem, v. 30, 2025. DOI: 10.1590/ce.v30i0.100172.",
  "ANNON, J. S. The PLISSIT model: a proposed conceptual scheme for the behavioral treatment of sexual problems. Journal of Sex Education and Therapy, v. 2, n. 1, p. 1-15, 1976. DOI: 10.1080/01614576.1976.11074483.",
  "ARAÚJO, I. F. M.; SOUSA, A. R.; SANTANA, E. S.; PEREIRA, Á. Sexualidade de homens em vivência de estomias intestinais: histórias sobre sentimentos e significados. ESTIMA, Brazilian Journal of Enterostomal Therapy, v. 20, e1922, 2022. DOI: 10.30886/estima.v20.1213_PT.",
  "ASSIS, G. M. et al. (org.). Assistência em estomaterapia: incontinências e outras disfunções do assoalho pélvico. 1. ed. Rio de Janeiro: Atheneu, 2026. p. 501-508.",
  "BUTCHER, H. K. et al. (ed.). Classificação das intervenções de enfermagem (NIC). 7. ed. Rio de Janeiro: Guanabara Koogan, 2020.",
  "CONSELHO FEDERAL DE ENFERMAGEM (COFEN). Resolução COFEN nº 696, de 17 de maio de 2022. Dispõe sobre a atuação da Enfermagem na Saúde Digital, normatizando a Telenfermagem. Brasília, DF: COFEN, 2022.",
  "CONSELHO FEDERAL DE ENFERMAGEM (COFEN). Resolução COFEN nº 728, de 9 de novembro de 2023. Normatiza a atuação da Equipe de Enfermagem de Reabilitação. Alterada pela Resolução COFEN nº 803, de 12 de março de 2026. Brasília, DF: COFEN, 2023.",
  "CONSELHO FEDERAL DE ENFERMAGEM (COFEN). Resolução COFEN nº 735, de 17 de janeiro de 2024. Normatiza a atuação do Enfermeiro navegador e do Enfermeiro clínico especialista. Brasília, DF: COFEN, 2024.",
  "CONSELHO FEDERAL DE ENFERMAGEM (COFEN). Resolução COFEN nº 766, de 5 de novembro de 2024. Aprova as normas e diretrizes para atuação da Equipe de Enfermagem na Atenção Domiciliar. Brasília, DF: COFEN, 2024.",
  "DISTRITO FEDERAL. Secretaria de Estado de Saúde. Manual de assistência de enfermagem na atenção à saúde de pessoas com estomias de eliminação intestinal e urinária. Brasília, DF: SES-DF, 2022.",
  "FOURIE, S. et al. “And don’t say everything will be normal!”: an international cross-sectional survey on the patients’ unmet sexual wellbeing needs after ostomy formation. Colorectal Disease, v. 27, e70264, 2025. DOI: 10.1111/codi.70264.",
  "GONZÁLES, A. I. et al. Validação do Índice Internacional de Função Erétil (IIFE) para uso no Brasil. Arquivos Brasileiros de Cardiologia, v. 101, n. 2, p. 176-182, 2013. DOI: 10.5935/abc.20130141.",
  "GREEN, L. W. et al. Health program planning, implementation, and evaluation: creating behavioral, environmental, and policy change. Baltimore: Johns Hopkins University Press, 2022.",
  "HERDMAN, T. H.; KAMITSURU, S.; LOPES, C. T. (org.). Diagnósticos de enfermagem da NANDA-I: definições e classificação, 2024-2026. 13. ed. Porto Alegre: Artmed, 2024.",
  "INTERNATIONAL NURSING KNOWLEDGE ASSOCIATION (INKA). About INKA: from NANDA International to INKA. 2026.",
  "INTERNATIONAL COUNCIL OF NURSES. International Classification for Nursing Practice (ICNP®): 2019 release. Geneva: ICN, 2019.",
  "JIANG, N. et al. Cavernous nerve injury resulted erectile dysfunction and regeneration. Journal of Immunology Research, v. 2021, p. 1-9, 2021. DOI: 10.1155/2021/5353785.",
  "LIN, S.; YIN, G.; CHEN, L. The sexuality experience of stoma patients: a meta-ethnography of qualitative research. BMC Health Services Research, v. 23, n. 1, p. 489, 2023. DOI: 10.1186/s12913-023-09532-2.",
  "MOORHEAD, S.; SWANSON, E.; JOHNSON, M. (ed.). Classificação dos Resultados de Enfermagem (NOC): medição de resultados em saúde. 7. ed. Rio de Janeiro: Guanabara Koogan, 2024.",
  "PAULA, M. A. B.; MORAES, J. T. (org.). Consenso brasileiro de cuidado às pessoas adultas com estomias de eliminação 2020. São Paulo: Segmento Farma, 2021.",
  "PERRIN, A.; BURCH, J. Sexual health, sexuality and living with a stoma. British Journal of Nursing, v. 34, n. 22, p. S8-S13, 2025. DOI: 10.12968/bjon.2025.0100.",
  "PRONK, C. E. et al. Sexual function after radical cystectomy in males with bladder carcinoma: a six-year longitudinal single-centre study. Frontiers in Urology, v. 3, e1100516, 2023. DOI: 10.3389/fruro.2023.1100516.",
  "RABELO, A. L. et al. Interventions in the sexuality of men with stomas: a scoping review. Journal of Clinical Nursing, v. 34, n. 5, p. 1580-1591, 2025. DOI: 10.1111/jocn.17613.",
  "ROSEN, R. C. et al. The International Index of Erectile Function (IIEF): a multidimensional scale for assessment of erectile dysfunction. Urology, v. 49, n. 6, p. 822-830, 1997. DOI: 10.1016/S0090-4295(97)00238-0.",
  "SANTOS, J. V. A. L. D. et al. Sociability of male cancer patients with stoma: a qualitative metasynthesis. Revista Brasileira de Enfermagem, v. 78, n. 6, e20250021, 2025. DOI: 10.1590/0034-7167-2025-0021.",
  "TAYLOR, B.; DAVIS, S. The extended PLISSIT model for addressing the sexual wellbeing of individuals with an acquired disability or chronic illness. Sexuality and Disability, v. 25, n. 3, p. 135-139, 2007. DOI: 10.1007/s11195-007-9044-x.",
  "WORLD HEALTH ORGANIZATION. Defining sexual health: report of a technical consultation on sexual health, 28-31 January 2002. Geneva: WHO, 2006.",
  "ZIGOURAS, S.; TAYLOR, J. P. Sexual dysfunction after colorectal surgery. Clinics in Colon and Rectal Surgery, v. 39, n. 1, p. 62-69, 2025. DOI: 10.1055/s-0045-1807737."
];
