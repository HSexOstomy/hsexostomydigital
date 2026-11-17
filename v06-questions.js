/* Itens transcritos do manual H_Sex_Ostomy (2026), Anexos A e B, páginas 70–74.
   Uso educacional; conferência de permissão para reprodução pública necessária antes de ampla divulgação. */
(function(){
const freq=[
[5,"Quase sempre ou sempre"],[4,"A maioria das vezes (muito mais que metade das vezes)"],
[3,"Algumas vezes (aproximadamente metade das vezes)"],[2,"Poucas vezes (muito menos que a metade das vezes)"],[1,"Quase nunca ou nunca"]
];
const fq=(zero="Sem atividade sexual")=>[...freq,[0,zero]];
const interest=[[5,"Sempre"],[4,"A maioria das vezes"],[3,"Aproximadamente metade das vezes"],[2,"Às vezes"],[1,"Raramente"],[0,"Nunca"]];
const satisfied=[[5,"Muito satisfeito"],[4,"Moderadamente satisfeito"],[3,"Igualmente satisfeito e insatisfeito"],[2,"Moderadamente insatisfeito"],[1,"Muito insatisfeito"]];
window.HSO_QUESTIONS={
iief:[
{q:"Com que frequência você foi capaz de ter uma ereção durante uma relação sexual?",choices:fq()},
{q:"Quando você teve relações sexuais com estimulação sexual, com que frequência foram suas ereções duras o suficiente para a penetração?",choices:fq()},
{q:"Quando você tentou ter relação sexual, com que frequência foi capaz de penetrar (entrar)?",choices:fq()},
{q:"Durante uma relação sexual, com que frequência você foi capaz de manter sua ereção após ter penetrado (entrado)?",choices:fq()},
{q:"Durante uma relação sexual, o quanto foi difícil para você manter sua ereção até o fim da relação?",choices:[[5,"Não foi difícil"],[4,"Pouco difícil"],[3,"Difícil"],[2,"Muito difícil"],[1,"Extremamente difícil"],[0,"Não tentei ter relação sexual"]]},
{q:"Quantas vezes você tentou ter relação sexual?",choices:[[5,"11 ou mais tentativas"],[4,"7–10 tentativas"],[3,"5–6 tentativas"],[2,"3–4 tentativas"],[1,"1–2 tentativas"],[0,"Não tentei ter relação sexual"]]},
{q:"Quando você tentou ter relação sexual, com que frequência ela foi satisfatória para você?",choices:fq("Não tentei ter relação sexual")},
{q:"Nas últimas 4 semanas, o quanto você aproveitou a relação sexual?",choices:[[5,"Aproveitou extremamente"],[4,"Aproveitou muito"],[3,"Aproveitou um pouco"],[2,"Aproveitou muito pouco"],[1,"Não aproveitou"],[0,"Não teve relação sexual"]]},
{q:"Quando você teve estimulação sexual ou relação sexual, com qual frequência você teve uma ejaculação?",choices:fq("Não teve estimulação ou relação sexual")},
{q:"Quando você teve estimulação sexual ou relação sexual, com que frequência você teve a sensação de orgasmo com ou sem ejaculação?",choices:fq("Não teve estimulação ou relação sexual")},
{q:"Com que frequência você tem sentido desejo sexual?",choices:[[5,"Quase sempre ou sempre"],[4,"Frequentemente (muito mais que metade do tempo)"],[3,"Algumas vezes (aproximadamente metade do tempo)"],[2,"Poucas vezes (muito menos que a metade do tempo)"],[1,"Quase nunca ou nunca"]]},
{q:"Quanto você consideraria o seu nível de desejo sexual?",choices:[[5,"Muito alto"],[4,"Alto"],[3,"Moderado"],[2,"Baixo"],[1,"Muito baixo ou inexistente"]]},
{q:"De modo geral, o quão satisfeito você tem estado com sua vida sexual?",choices:satisfied},
{q:"De modo geral, o quão satisfeito você tem estado com o seu relacionamento sexual?",choices:satisfied},
{q:"Como você consideraria a sua confiança em conseguir ter e manter uma ereção?",choices:[[5,"Muito alta"],[4,"Alta"],[3,"Moderada"],[2,"Baixa"],[1,"Muito baixa"]]}
],
qsm:[
{q:"Seu interesse por sexo é o suficiente para você querer iniciar o ato sexual?",choices:interest},
{q:"Sua capacidade de sedução dá a você confiança de se lançar em atividade de conquista sexual?",choices:interest},
{q:"As preliminares de seu ato sexual são agradáveis e satisfazem você e sua (seu) parceira(o)?",choices:interest},
{q:"Seu desempenho sexual varia conforme sua (seu) parceira(o) seja ou não capaz de se satisfazer durante o ato sexual com você?",choices:interest},
{q:"Você consegue manter o pênis ereto (duro) o tempo que precisa para completar a atividade sexual com satisfação?",choices:interest},
{q:"Após o estímulo sexual, sua ereção é suficientemente rígida (dura) para garantir uma relação sexual satisfatória?",choices:interest},
{q:"Você é capaz de obter e manter a mesma qualidade de ereção nas várias relações sexuais que realiza em diferentes dias?",choices:interest},
{q:"Você consegue controlar a ejaculação para que seu ato sexual se prolongue o quanto você desejar?",choices:interest},
{q:"Você consegue chegar ao orgasmo nas relações sexuais que realiza?",choices:interest},
{q:"Seu desempenho sexual o estimula a fazer sexo outras vezes, em outras oportunidades?",choices:interest}
]
};
})();