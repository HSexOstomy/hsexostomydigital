/* Aulas, casos clínicos e atividades de fixação. Conteúdo elaborado a partir do manual;
   casos e personagens são fictícios. As frases de "Mito ou fato" ficam em conteudo/mitos.json (editável pelo painel). */
import { C, arr, txt } from "../core/content.js";

const q = (pergunta, opcoes) => ({ pergunta, opcoes });
const o = (t, feedback, certo = false) => ({ t, feedback, certo });

/* Simulação clínica ramificada: cada escolha leva a um novo ponto da história.
   fase = etapa do fluxograma (Figura 3) destacada; efeito = mudança no vínculo (-1, 0, +1). */
const op = (t, efeito, next, resposta, feedback) => ({ t, efeito, next, resposta, feedback });

export const casos = [
  {
    id: "bruno", nome: "Bruno", idade: 41, inicio: "b1",
    resumo: "Colostomia há 8 meses após ressecção por câncer colorretal. Casado, motorista de aplicativo. O caso evolui ao longo de vários encontros.",
    tags: ["Colostomia", "Longitudinal"],
    nos: {
      b1: { fase: "permissao", titulo: "Primeira consulta", cena: "Bruno conversa com tranquilidade sobre a troca da bolsa, mas desvia o olhar quando você menciona a vida a dois.",
        pergunta: "Como reconhecer a sexualidade como parte do cuidado sem invadir os limites dele?", opcoes: [
          op("Normalizar o tema, explicar por que faz parte do cuidado e pedir Permissão.", 1, "b2a", "“Agradeço, mas hoje prefiro não falar disso.”", "A oportunidade foi oferecida com respeito. A recusa também é uma resposta que orienta o cuidado."),
          op("Aproveitar a consulta para fazer o histórico sexual completo.", -1, "b2b", "“Eu não esperava essas perguntas. Podemos parar?”", "A relevância clínica não dispensa a Permissão. Bruno se sentiu invadido."),
          op("Não mencionar a sexualidade, para evitar constrangimento.", -1, "b2c", "Bruno vai embora sem saber que podia falar disso aqui.", "A ausência de queixa não é ausência de necessidade (7.5).")
        ] },
      b2a: { fase: "nao1", titulo: "Ele disse não", cena: "Bruno recusou a conversa hoje.", pergunta: "Como encerrar este ponto?", opcoes: [
          op("Acolher, seguir com o atendimento, informar disponibilidade e registrar a oferta e a decisão.", 1, "b3", "“Bom saber que posso falar quando quiser.”", "Exatamente o que o manual orienta (p. 31)."),
          op("Insistir um pouco, explicando como o tema é importante para a reabilitação.", -1, "b3", "Bruno sorri sem graça e muda de assunto.", "Insistir após a recusa fragiliza a autonomia e o vínculo.")
        ] },
      b2b: { fase: "permissao", titulo: "Dois meses depois", cena: "Bruno faltou ao retorno. Volta dois meses depois, com vazamentos frequentes e evitando contato visual.", pergunta: "Como retomar?", opcoes: [
          op("Reconhecer o desconforto anterior, focar na demanda que ele traz (vazamento) e só ao final pedir Permissão para retomar outros temas.", 1, "b3", "“Obrigado por perguntar antes desta vez.”", "Reparar a relação intersubjetiva é parte do cuidado. A Permissão reconstrói a confiança."),
          op("Retomar o histórico sexual de onde parou.", -1, "fim_ruim", "Bruno pede transferência para outro serviço.", "Repetir o erro rompeu o vínculo.")
        ] },
      b2c: { fase: "admissao", titulo: "Um telefonema", cena: "Seis semanas depois, a esposa liga: Bruno anda isolado e irritado, e o casal não conversa mais sobre intimidade.", pergunta: "O que fazer?", opcoes: [
          op("Agradecer, agendar um retorno com Bruno e, na consulta, abrir o tema com Permissão.", 1, "b3", "Na consulta, Bruno diz: “Achei que não fosse assunto para cá.”", "Antecipar o retorno e abrir o espaço corrige a omissão inicial."),
          op("Explicar que é uma questão do casal, fora do escopo da enfermagem.", -1, "fim_ruim", "O casal deixa de procurar o serviço.", "A sexualidade é dimensão legítima do cuidado de enfermagem na reabilitação.")
        ] },
      b3: { fase: "informacao", titulo: "Retorno", cena: "Bruno conta que sente falta da intimidade com a esposa, mas tem medo de a bolsa vazar durante a relação.", pergunta: "Qual o próximo movimento?", opcoes: [
          op("Renovar a Permissão, explorar o medo e orientar cuidados práticos: esvaziar, verificar aderência, filtro, cinta, posições.", 1, "b4", "“Ninguém tinha me explicado isso. Vou tentar.”", "Informação Limitada contextualizada ao que ele trouxe, com apoio do Quadro 3."),
          op("Repassar todas as orientações do manual, para garantir.", 0, "b4", "“É coisa demais. Eu só queria me sentir seguro.”", "Informação Limitada responde ao momento da pessoa, não a todos os temas de uma vez."),
          op("Encaminhar direto à terapia sexual.", -1, "b4", "“Pensei que você pudesse me orientar.”", "A dúvida está no escopo da enfermagem. Encaminhar sem orientar frustra a expectativa.")
        ] },
      b4: { fase: "sugestoes", titulo: "Aprofundando", cena: "Bruno autoriza aprofundar. Relata menos desejo, dificuldade para manter a ereção, vergonha do corpo e conversas tensas com a esposa. Usa anti-hipertensivo.", pergunta: "Como organizar a avaliação?", opcoes: [
          op("Histórico clínico e sexual, IIEF-15 e QS-M, revisão das medicações e diagnósticos discutidos com ele.", 1, "b5", "Bruno: “O que mais me pesa é como eu me vejo.”", "Avaliação completa: o anti-hipertensivo é possível fator iatrogênico."),
          op("Aplicar só o IIEF-15 e decidir pelo escore.", 0, "b5", "O escore sai, mas a vergonha do corpo não aparece no instrumento.", "Escores apoiam, mas não substituem a escuta."),
          op("Explicar que é esperado após a cirurgia.", -1, "b5b", "“Então não tem jeito?” Bruno se cala.", "A disfunção depende também de idade, comorbidades, medicação, saúde mental e relação (p. 42).")
        ] },
      b5: { fase: "sugestoes", titulo: "Plano de cuidados", cena: "IIEF-15: função erétil 14/30. QS-M: 44. Ele quer melhorar a relação com o corpo e com a esposa.", pergunta: "Qual plano inicial?", opcoes: [
          op("Imagem corporal conturbada e Função sexual prejudicada, metas pequenas em 90 dias, incluir a esposa se ele quiser, retorno em 30 dias.", 1, "b6", "Bruno concorda e sai com um plano que entende.", "Plano centrado na pessoa, com metas mensuráveis."),
          op("Plano centrado apenas na ereção.", 0, "b6", "Bruno segue o plano, mas a vergonha continua.", "Reduzir a sexualidade à ereção deixa de fora o que ele priorizou.")
        ] },
      b5b: { fase: "sugestoes", titulo: "Corrigindo o rumo", cena: "Bruno ficou desanimado com a explicação anterior.", pergunta: "Como reparar?", opcoes: [
          op("Reconhecer que a explicação foi incompleta, falar dos múltiplos fatores e propor uma avaliação completa.", 1, "b5", "“Então ainda tem o que fazer.”", "Reconhecer o erro fortalece a relação e reabre caminhos."),
          op("Reforçar que é efeito da cirurgia e que ele precisa se adaptar.", -1, "fim_ruim", "Bruno desiste do acompanhamento.", "Promessas negativas também são irreais: o Esperançar se perdeu.")
        ] },
      b6: { fase: "d3", titulo: "Três meses depois", cena: "A função erétil segue 14/30. Bruno dorme mal e diz que “não tem mais ânimo para nada”.", pergunta: "Como conduzir?", opcoes: [
          op("Pactuar encaminhamento à urologia e avaliação em saúde mental, manter a Revisão e acompanhar a efetivação.", 1, "b7", "“Quero ajuda, mas quero continuar vindo aqui.”", "Dois critérios de encaminhamento e continuidade garantida."),
          op("Encaminhar à urologia e encerrar o acompanhamento de enfermagem.", -1, "fim_parcial", "Bruno não sabe a quem recorrer quando surgem dúvidas.", "O encaminhamento não encerra o cuidado (p. 61)."),
          op("Não encaminhar: ele já recebeu orientações.", -1, "fim_ruim", "O sofrimento se agrava.", "Disfunção persistente e sofrimento são critérios de Terapia Intensiva.")
        ] },
      b7: { fase: "avaliacao", titulo: "Revisão", cena: "Bruno está em tratamento urológico e acompanhamento psicológico. Hoje, a esposa veio junto.", pergunta: "Como conduzir a Revisão?", opcoes: [
          op("Retomar o plano, comparar os indicadores NOC, perguntar sobre novas dúvidas e, com o consentimento dele, incluir a esposa.", 1, "fim_bom", "A esposa: “Eu também tinha medo de machucar ele.”", "Revisão com indicadores e inclusão consentida da parceria."),
          op("Considerar o caso resolvido e dar alta.", 0, "fim_parcial", "Seis meses depois, novas dúvidas surgem e ele não sabe se pode voltar.", "A sexualidade é dinâmica: o processo é contínuo (loop).")
        ] }
    }
  },
  {
    id: "antonio", nome: "Seu Antônio", idade: 68, inicio: "a1",
    resumo: "Urostomia após cistectomia radical. Viúvo há dois anos, começou a namorar. Hipertenso, diabético, católico praticante.",
    tags: ["Urostomia", "Idade e religião"],
    nos: {
      a1: { fase: "permissao", titulo: "Consulta de rotina", cena: "Seu Antônio comenta, rindo, que “na idade dele isso não importa mais”, mas logo pergunta se a bolsa “atrapalha namorar”.", pergunta: "Como responder?", opcoes: [
          op("Acolher a pergunta, pedir Permissão e explorar o que ele quer saber.", 1, "a2", "“Pois é, enfermeira, a gente fica sem graça de perguntar.”", "A brincadeira era uma abertura."),
          op("Concordar que, na idade dele, não é prioridade.", -1, "a1b", "Ele ri, mas não pergunta mais nada.", "Presumir desinteresse pela idade é um estigma (Respeito social).")
        ] },
      a1b: { fase: "nao2", titulo: "Meses depois", cena: "Seu Antônio conta à técnica que terminou o namoro por vergonha da bolsa.", pergunta: "Como retomar?", opcoes: [
          op("Chamar para uma conversa reservada, reconhecer que o assunto ficou de lado e pedir Permissão para falar dele.", 1, "a2", "“Achei que era bobagem de velho.”", "Demandas tardias são esperadas; a Revisão permite retomá-las."),
          op("Seguir só com os cuidados da urostomia.", -1, "fim_ruim", "O isolamento aumenta.", "O tema deixou de ser oferecido.")
        ] },
      a2: { fase: "informacao", titulo: "Dúvidas sobre a função", cena: "Ele diz que não tem mais ejaculação e acha que “não sente mais nada”. Conta que pensa em se casar de novo, pela igreja.", pergunta: "Que informação é mais pertinente?", opcoes: [
          op("Explicar que o orgasmo pode acontecer sem ejaculação e que as alterações têm abordagem clínica, respeitando seus valores religiosos.", 1, "a3", "“Então eu posso me casar sem medo.”", "Vias nervosas distintas (p. 42) e Realidade social respeitada."),
          op("Dizer que a cistectomia encerra a vida sexual.", -1, "a3", "Ele fica em silêncio.", "É um mito. Há possibilidades de cuidado."),
          op("Sugerir adiar o casamento até resolver a questão.", -1, "a3", "“Isso é decisão minha, não?”", "Autonomia: o(a) enfermeiro(a) não decide pela pessoa.")
        ] },
      a3: { fase: "sugestoes", titulo: "Avaliação", cena: "Desejo preservado; IIEF-15 com função erétil 9/30. Usa anti-hipertensivo. Ele quer tentar algum tratamento.", pergunta: "Qual conduta?", opcoes: [
          op("Orientar, revisar as medicações com a equipe médica, pactuar encaminhamento urológico e manter a Revisão.", 1, "a4", "“Vou levar a lista de remédios.”", "Disfunção erétil grave e possível fator iatrogênico justificam o encaminhamento."),
          op("Dizer que, na idade dele, é normal.", -1, "fim_parcial", "Ele aceita, decepcionado.", "Normalizar a disfunção pela idade é estigma e omissão.")
        ] },
      a4: { fase: "avaliacao", titulo: "Revisão", cena: "Seu Antônio volta com a namorada e pergunta se ela pode participar da conversa.", pergunta: "Como conduzir?", opcoes: [
          op("Confirmar a vontade dele, incluir a namorada e falar de intimidade para além da penetração.", 1, "fim_bom", "A namorada: “Eu só queria saber como ajudar.”", "Inclusão consentida da parceria (pontos de atenção do 00449)."),
          op("Conversar apenas com a namorada, para não constrangê-lo.", -1, "fim_parcial", "Ele se sente excluído do próprio cuidado.", "O homem é protagonista do seu cuidado.")
        ] }
    }
  },
  {
    id: "rafael", nome: "Rafael", idade: 29, inicio: "r1",
    resumo: "Ileostomia por doença de Crohn, após proctocolectomia. Homem gay, namora há um ano. Designer.",
    tags: ["Ileostomia", "Diversidade"],
    nos: {
      r1: { fase: "permissao", titulo: "Primeiro encontro", cena: "Rafael diz que o parceiro “vai acabar indo embora”. Ao ser perguntado sobre a esposa, corrige: “é namorado”.", pergunta: "Como reagir?", opcoes: [
          op("Pedir desculpas com naturalidade e seguir com linguagem neutra, sem presumir orientação nem modelo de relação.", 1, "r2", "“Tranquilo. Ele é muito parceiro, eu é que tenho medo.”", "Diversidade e reconhecimento na prática."),
          op("Ignorar a correção e continuar.", -1, "r1b", "Rafael responde em monossílabos.", "Ignorar fragiliza o vínculo.")
        ] },
      r1b: { fase: "permissao", titulo: "Um silêncio", cena: "Rafael responde “tanto faz” a todas as perguntas.", pergunta: "O que fazer?", opcoes: [
          op("Reconhecer o erro de antes e reabrir a conversa com Permissão.", 1, "r2", "“Obrigado por perceber.”", "Reparar o erro restabelece a relação intersubjetiva."),
          op("Seguir com os cuidados da bolsa.", -1, "fim_ruim", "Rafael não volta.", "O vínculo se perdeu.")
        ] },
      r2: { fase: "informacao", titulo: "Pergunta específica", cena: "Com Permissão, Rafael pergunta se ainda poderá ter sexo anal receptivo e se o estoma poderia ser usado.", pergunta: "Como orientar?", opcoes: [
          op("Explicar que, sem o reto, a prática pode ficar impossibilitada; que o estoma nunca deve ser penetrado; e explorar outras formas de prazer com ele e o parceiro.", 1, "r3", "“Prefiro saber a verdade. Vamos conversar sobre o resto.”", "Quadros 2 e 3, sem julgamento."),
          op("Dizer que é um assunto delicado e encaminhar.", -1, "r3", "“Achei que você ia me responder.”", "A orientação está no escopo da Informação Limitada."),
          op("Dizer que o estoma pode ser usado com cuidado.", -1, "r2x", "Rafael agradece a dica.", "Orientação perigosa: há risco de lesão e sangramento.")
        ] },
      r2x: { fase: "terapia", titulo: "Consequência", cena: "Duas semanas depois, Rafael chega com dor e sangramento no estoma.", pergunta: "O que fazer agora?", opcoes: [
          op("Avaliar o estoma, encaminhar com urgência se necessário, corrigir a orientação sem culpabilizá-lo e registrar.", 0, "r3", "“Eu achei que estava seguro.”", "A responsabilidade foi da orientação. Corrigir e proteger é prioridade.")
        ] },
      r3: { fase: "sugestoes", titulo: "Instrumentos", cena: "No IIEF-15, Rafael marcou “sem atividade sexual” nas questões 1 a 5: função erétil 4/30. Ele não tem relações desde a cirurgia.", pergunta: "Como interpretar?", opcoes: [
          op("Interpretação limitada: as respostas zero indicam ausência de atividade. Explorar os motivos e reavaliar depois.", 1, "r4", "“É medo, não é falta de vontade.”", "Atenção às respostas zero do IIEF-15."),
          op("Disfunção erétil grave: encaminhar à urologia.", -1, "r4", "“Mas eu não tenho problema de ereção…”", "O escore refletia ausência de atividade, não de função.")
        ] },
      r4: { fase: "sugestoes", titulo: "O casal", cena: "Rafael traz o namorado. Os dois evitam falar de intimidade “para não magoar”.", pergunta: "Qual diagnóstico e intervenção priorizar?", opcoes: [
          op("Relacionamento ineficaz com o parceiro íntimo, incluindo o parceiro na educação, avaliação e metas.", 1, "fim_bom", "O namorado: “A gente precisava dessa conversa.”", "Pontos de atenção do 00449."),
          op("Conhecimento de saúde inadequado do namorado.", 0, "fim_parcial", "A conversa fica técnica e o silêncio do casal continua.", "O foco é o padrão de mutualidade do casal.")
        ] }
    }
  }
];

export const finais = {
  fim_bom: { titulo: "Cuidado contínuo", tipo: "bom", texto: "O acompanhamento seguiu com Permissão renovada, Revisão e articulação em rede. A história continua: o processo é um loop, e novas demandas serão acolhidas." },
  fim_parcial: { titulo: "Cuidado incompleto", tipo: "parcial", texto: "Parte das necessidades foi atendida, mas a continuidade ou a centralidade da pessoa ficou comprometida. Reveja os pontos em que o vínculo caiu." },
  fim_ruim: { titulo: "Vínculo rompido", tipo: "ruim", texto: "As escolhas afastaram a pessoa do cuidado. Na vida real, retomar exige reconhecer o erro e reconstruir a confiança. Refaça o caso e experimente outros caminhos." }
};

/* Mito ou fato: fixação para o workshop e para estudo */
export const mitos = arr(C.mitos.mitos).filter((m) => m && txt(m.frase)).map((m) => ({ frase: txt(m.frase), fato: m.fato === true, explica: txt(m.explica) }));

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
