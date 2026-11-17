(()=>{"use strict";
const root=()=>document.getElementById("cases-content");
let idx=0,choice=null,decisions=[];
const visits=[
 {label:"Encontro 1",time:"Primeira consulta",title:"A sexualidade ainda não é uma prioridade para ele",
 story:"Bruno, 41 anos, convive com um estoma de eliminação há oito meses. Na consulta, está disposto a conversar sobre adaptação à bolsa, mas evita assuntos relacionados à intimidade.",
 question:"O que você faria para reconhecer a sexualidade como parte do cuidado sem invadir os limites do homem?",
 options:[
  {name:"Normalizar o tema e solicitar Permissão, respeitando a resposta.",path:"permissao",reply:"Enfermeiro: A sexualidade também faz parte do cuidado. Você se sentiria à vontade para conversar sobre isso? Bruno: Prefiro não falar sobre esse assunto hoje.",feedback:"O profissional oferece a oportunidade, acolhe a recusa e mantém o atendimento clínico geral. Permissão não é um consentimento permanente.",right:true},
  {name:"Começar o histórico sexual detalhado para aproveitar a consulta.",path:"autorizacao",reply:"Bruno: Eu não queria falar sobre isso agora. Me sinto desconfortável.",feedback:"A relevância clínica do tema não dispensa a solicitação da Permissão. É necessário interromper o aprofundamento e respeitar a decisão."},
  {name:"Não mencionar sexualidade em nenhum momento, para evitar constrangimento.",path:"recusa",reply:"Bruno não recebeu a oportunidade de expressar se desejava abordar a sexualidade.",feedback:"O manual recomenda iniciativa profissional para oferecer abertura ao diálogo, sem impor a abordagem. A ausência de queixa espontânea não significa ausência de necessidades."}
 ]},
 {label:"Encontro 2",time:"Retorno após algumas semanas",title:"A demanda aparece mais tarde",
 story:"No retorno, Bruno relata melhor adaptação ao dispositivo coletor. Ele menciona que sente falta de intimidade com sua parceria, mas tem receio de um vazamento durante a relação sexual.",
 question:"Qual seria o próximo movimento mais fundamentado no programa?",
 options:[
  {name:"Solicitar Permissão novamente, explorar a dúvida e orientar conforme a necessidade.",path:"informacao",reply:"Bruno: Hoje quero conversar. Tenho medo de o dispositivo soltar e não sei como me preparar.",feedback:"O vínculo e a Revisão permitiram identificar uma demanda tardia. A Informação Limitada deve ser contextualizada; o Quadro 3 apresenta cuidados como esvaziamento e verificação do dispositivo.",right:true},
  {name:"Passar todas as recomendações do manual em uma única consulta.",path:"informacao",reply:"Bruno: É informação demais. Eu só precisava entender como me sentir mais seguro.",feedback:"Informação Limitada não exige contemplar todos os temas simultaneamente. A seleção deve responder às dúvidas e à compreensão da pessoa."},
  {name:"Encaminhar diretamente para terapia especializada, sem avaliação adicional.",path:"terapia",reply:"Bruno: Pensei que você pudesse me orientar. Preciso mesmo de outro profissional?",feedback:"O encaminhamento depende de avaliação e necessidade concreta. O enfermeiro pode oferecer orientações e manter acompanhamento, respeitando seu escopo."}
 ]},
 {label:"Encontro 3",time:"Avaliação individualizada",title:"Corpo, resposta sexual e parceria",
 story:"Bruno autoriza aprofundar o diálogo e relata menor desejo sexual, insatisfação com a imagem corporal e dificuldade de comunicação com a parceria. Diz que as mudanças o preocupam.",
 question:"Como organizar a avaliação e construir possibilidades de cuidado?",
 options:[
  {name:"Explorar o histórico sexual e clínico, discutir prioridades e elaborar plano individualizado.",path:"sugestoes",reply:"Bruno: O que mais me incomoda é minha imagem corporal e a distância que surgiu entre nós. Gostaria de entender quais opções tenho.",feedback:"Sugestões Específicas articula avaliação, prioridades da pessoa, resultados esperados e intervenções. IIEF-15 e QS-M podem ser considerados quando pertinentes, nunca automaticamente.",right:true},
  {name:"Usar apenas um escore sexual para definir todo o plano.",path:"sugestoes",reply:"Bruno: Mas minha principal dificuldade é me sentir bem com meu corpo.",feedback:"Escalas podem apoiar o raciocínio; elas não substituem a avaliação psicossocial, a escuta e a identificação individualizada de necessidades."},
  {name:"Assumir que todas as dificuldades decorrem diretamente da cirurgia.",path:"demanda",reply:"Bruno: Tenho outras preocupações que também afetaram nossa relação.",feedback:"A sexualidade envolve dimensões biológicas, emocionais, relacionais e sociais. Não é adequado presumir uma única causa."}
 ]},
 {label:"Encontro 4",time:"Continuidade do cuidado",title:"Quando considerar suporte especializado?",
 story:"Após medidas educativas e acompanhamento, Bruno continua relatando sofrimento importante relacionado à intimidade. Ele deseja explorar apoio psicológico e avaliação especializada.",
 question:"Como conduzir a articulação em rede preservando o vínculo?",
 options:[
  {name:"Pactuar encaminhamentos pertinentes e manter a Revisão no acompanhamento de enfermagem.",path:"terapia",reply:"Bruno: Quero procurar ajuda, mas também gostaria de continuar sendo acompanhado aqui.",feedback:"Terapia Intensiva é considerada quando necessária e não encerra a responsabilidade da enfermagem. A articulação em rede e a Revisão sustentam a continuidade.",right:true},
  {name:"Encaminhar e dar por encerrado o acompanhamento de enfermagem.",path:"terapia",reply:"Bruno: Não sei a quem procurar se surgirem outras dúvidas.",feedback:"O manual indica acompanhar a trajetória do homem, verificar acesso e manter disponibilidade para novas demandas."},
  {name:"Evitar encaminhamento porque já recebeu informações gerais.",path:"apoio",reply:"Bruno: Gostaria de apoio para lidar com esse sofrimento.",feedback:"Quando a demanda ultrapassa o escopo de uma abordagem, a articulação com profissionais especializados pode ser indicada."}
 ]}
];
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function draw(){
const r=root();if(!r)return;
const c=visits[idx],ch=choice!==null?c.options[choice]:null;
r.innerHTML='<div class="v7-case-layout"><aside class="v7-case-profile"><span class="eyebrow">CASO LONGITUDINAL FICTÍCIO</span><div class="v7-case-avatar" role="img" aria-label="Ilustração simbólica de um homem">👨🏽</div><h2>Bruno, 41 anos</h2><p>Homem com estoma de eliminação. Sua trajetória é apresentada em diferentes consultas para explorar o cuidado longitudinal.</p><div class="v7-case-timeline">'+visits.map((s,i)=>'<button data-v7visit="'+i+'" class="'+(i===idx?"active":"")+'"><span>'+(i+1)+'</span><div><strong>'+esc(s.label)+'</strong><small>'+esc(s.time)+'</small></div>'+(decisions[i]!==undefined?"✓":"")+'</button>').join("")+'</div><p class="small">O caso é fictício; as decisões não são avaliadas como uma prova.</p></aside>'+
'<section class="v7-case-main"><span class="eyebrow">CENA '+(idx+1)+' DE '+visits.length+' · '+esc(c.time).toUpperCase()+'</span><h2>'+esc(c.title)+'</h2><div class="v7-case-story"><strong>Situação clínica</strong><p>'+esc(c.story)+'</p></div><h3>'+esc(c.question)+'</h3><div class="v7-case-options">'+c.options.map((o,i)=>'<button data-v7caseoption="'+i+'" '+(choice!==null?"disabled":"")+'>'+esc(o.name)+'</button>').join("")+'</div>'+
(ch?'<div class="v7-case-reflection"><span class="eyebrow">CONSEQUÊNCIA DA ESCOLHA</span><blockquote>'+esc(ch.reply)+'</blockquote><h3>Raciocínio clínico</h3><p>'+esc(ch.feedback)+'</p><div class="button-row"><button data-v7casereview class="button">Reconsiderar escolha</button><button data-v7casepath="'+esc(ch.path)+'" class="button secondary">Ver no fluxograma →</button></div></div>':"")+
'<div class="v7-case-controls"><button data-v7casenav="-1" class="button" '+(idx===0?"disabled":"")+'>← Consulta anterior</button><button data-v7casenav="1" class="button primary" '+(idx===visits.length-1?"disabled":"")+'>Próximo encontro →</button><button data-v7casereset class="button subtle">Reiniciar</button></div></section></div>';
}
document.addEventListener("click",e=>{
let x=e.target.closest("[data-v7caseoption]");if(x){choice=Number(x.dataset.v7caseoption);decisions[idx]=choice;draw();return}
x=e.target.closest("[data-v7visit]");if(x){idx=Number(x.dataset.v7visit);choice=decisions[idx]??null;draw();return}
x=e.target.closest("[data-v7casenav]");if(x){idx=Math.max(0,Math.min(visits.length-1,idx+Number(x.dataset.v7casenav)));choice=decisions[idx]??null;draw();return}
if(e.target.closest("[data-v7casereview]")){choice=null;delete decisions[idx];draw();return}
if(e.target.closest("[data-v7casereset]")){idx=0;choice=null;decisions=[];draw();return}
x=e.target.closest("[data-v7casepath]");if(x){window.HSO07?.gotoTrail?.(x.dataset.v7casepath);return}
x=e.target.closest("[data-go]");if(x&&x.dataset.go==="casos")setTimeout(draw,0);
});
window.addEventListener("hashchange",()=>{if(location.hash==="#casos")setTimeout(draw,0)});
draw();
})();