/* H_Sex_Ostomy Digital v0.4 — trilha interativa do fluxograma.
   Interação educativa: não automatiza julgamento clínico. */
(function(){
"use strict";
const byId=id=>document.getElementById(id);
const safe=t=>String(t??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const N={
admissao:{k:"Início do acompanhamento",title:"Admissão no H_Sex_Ostomy",text:"O programa incorpora a sexualidade ao cuidado de enfermagem como dimensão legítima da reabilitação, com acompanhamento contínuo e respeito à singularidade.",actions:["Acolher o homem e identificar necessidades assistenciais no encontro.","Preparar condições de privacidade, segurança e acolhimento.","Apresentar a possibilidade de conversar sobre sexualidade, sem pressupor consentimento."],options:[["Iniciar pela Permissão","permissao"]],page:"27–30",tone:"blue"},
permissao:{k:"Processo transversal",title:"Permissão",text:"Antes de aprofundar informações sobre sexualidade, deve-se solicitar autorização em ambiente seguro, livre de julgamentos, com respeito à autonomia e ao tempo do homem.",actions:["Prepare um ambiente privativo e acolhedor.","Pergunte de forma clara se a pessoa se sente confortável para conversar sobre sexualidade.","Escute a resposta sem pressão, validando os limites da pessoa."],options:[["Ver decisão: o usuário autoriza?","autoriza"]],page:"29–31",tone:"green"},
autoriza:{k:"Ponto de decisão",title:"O usuário autoriza a discussão?",text:"O que acontece a seguir depende da vontade da pessoa. A negativa não significa falha nem encerra a responsabilidade pelo cuidado.",actions:["Aguarde a resposta sem indução.","Respeite tanto a autorização quanto a recusa.","Adapte a continuidade do cuidado à decisão tomada."],options:[["SIM · Oferecer Informação Limitada","informacao"],["NÃO · Respeitar e manter o cuidado","recusa"]],page:"28–31",tone:"amber"},
recusa:{k:"Caminho NÃO · Continuidade",title:"Não autorizou conversar: o cuidado continua",text:"A decisão de não falar sobre sexualidade deve ser acolhida. O fluxograma indica continuidade do atendimento clínico geral e disponibilidade futura, e o texto do manual recomenda registro e possibilidade de retomada.",actions:["Acolha a decisão sem julgamento e não aprofunde a temática.","Continue o atendimento clínico geral conforme as necessidades apresentadas.","Registre em prontuário a oferta da abordagem, a decisão da pessoa e orientações pertinentes.","Deixe explícita a disponibilidade para retomar o assunto em outro momento, se ela desejar."],options:[["Continuar acompanhamento / Revisão","revisao"],["Retomar Permissão em outro encontro","permissao"]],page:"28 e 31",tone:"rose"},
informacao:{k:"Componente EX-PLISSIT",title:"Informação Limitada",text:"Com Permissão, o enfermeiro oferece informações gerais pertinentes sobre imagem corporal, intimidade, adaptação ao estoma, mitos e preocupações, de acordo com o que a pessoa deseja e precisa compreender.",actions:["Identifique os interesses e dúvidas da pessoa.","Ofereça informações relevantes em linguagem acessível.","Verifique a compreensão e respeite o ritmo de cada encontro."],options:[["Verificar se há demandas específicas","demanda"]],page:"28 e 33–42",tone:"yellow"},
demanda:{k:"Ponto de decisão",title:"Existem demandas específicas?",text:"O fluxograma diferencia situações que exigem aprofundamento individualizado daquelas que podem continuar com orientações gerais e acompanhamento.",actions:["Escute o que foi expressado e observe novas demandas.","Evite pressupor problemas ou dificuldades.","Ajuste a abordagem à necessidade real identificada."],options:[["SIM · Avançar para Sugestões Específicas","sugestoes"],["NÃO · Continuar acompanhamento","sem-demanda"]],page:"28 e 43",tone:"amber"},
"sem-demanda":{k:"Caminho NÃO · Acompanhamento",title:"Sem demanda específica: manter acompanhamento",text:"A ausência de demanda específica não encerra o cuidado. O fluxograma orienta continuar o acompanhamento e informar disponibilidade futura para falar sobre sexualidade.",actions:["Mantenha acompanhamento conforme as necessidades da pessoa.","Reforce a possibilidade de voltar ao tema em outro encontro.","Reavalie mudanças e o surgimento de demandas tardias nos retornos."],options:[["Ir à Revisão contínua","revisao"],["Retornar a Informação Limitada quando pertinente","informacao"]],page:"24, 28 e 31–32",tone:"rose"},
sugestoes:{k:"Componente EX-PLISSIT",title:"Sugestões Específicas",text:"Quando surgem demandas concretas, o enfermeiro pode aprofundar o histórico clínico e sexual, desenvolver raciocínio diagnóstico e propor intervenções individualizadas dentro do seu escopo de atuação.",actions:["Avalie e registre as demandas identificadas.","Considere história sexual, contexto, condições clínicas e instrumentos pertinentes, quando apropriados.","Construa cuidados individualizados com a pessoa, respeitando sua autonomia."],options:[["Verificar necessidade de suporte especializado","apoio"]],page:"28 e 43–59",tone:"violet"},
apoio:{k:"Ponto de decisão",title:"Necessita de suporte especializado?",text:"A escolha depende da avaliação e dos recursos disponíveis. O encaminhamento especializado não é obrigatório para todos os homens.",actions:["Reconheça necessidades que ultrapassam o escopo da abordagem disponível.","Identifique os recursos especializados pertinentes.","Planeje continuidade e comunicação com a rede quando houver indicação."],options:[["SIM · Articular Terapia Intensiva","terapia"],["NÃO · Seguir com Revisão e acompanhamento","revisao"]],page:"28 e 60–61",tone:"amber"},
terapia:{k:"Componente EX-PLISSIT",title:"Terapia Intensiva",text:"Demandas que excedem o escopo de intervenção do enfermeiro podem exigir avaliação ou tratamento por especialistas. Encaminhar não significa abandonar o acompanhamento de enfermagem.",actions:["Explique a necessidade de suporte especializado de forma compartilhada.","Articule os profissionais ou serviços pertinentes: psicologia, urologia, sexologia, fisioterapia pélvica e outros conforme o contexto.","Mantenha o vínculo e acompanhe o acesso e a continuidade do cuidado."],options:[["Acompanhar após encaminhamento / Revisão","revisao"]],page:"60–62",tone:"violet"},
revisao:{k:"Processo contínuo",title:"Avaliação, Revisão e Reflexão",text:"Em cada encontro, revise intervenções, identifique mudanças e novas demandas, reflita com a pessoa sobre o cuidado e ajuste o plano. O percurso pode retornar a qualquer componente conforme a necessidade.",actions:["Monitore mudanças, dúvidas e intervenções realizadas.","Registre a evolução e reavalie as necessidades.","Reofereça Permissão no momento adequado e reoriente a abordagem quando pertinente."],options:[["Iniciar outro ciclo / Solicitar Permissão","permissao"],["Revisitar a investigação de demandas","demanda"],["Voltar ao início do fluxo","admissao"]],page:"26, 28 e 31–32",tone:"green"}
};
const starts={autoriza:"NÃO e SIM",demanda:"NÃO e SIM",apoio:"NÃO e SIM"};
const keys=Object.keys(N);
let current="admissao";
let seen=new Set(),past=[];
try{seen=new Set(JSON.parse(sessionStorage.getItem("hsex_trail_seen")||"[]"))}catch(err){}
const persist=()=>{try{sessionStorage.setItem("hsex_trail_seen",JSON.stringify([...seen]))}catch(err){}};
const show=function(id,fromHistory=false){
 if(!N[id])return;
 if(!fromHistory&&current!==id)past.push(current);
 current=id;seen.add(id);persist();
 document.querySelectorAll("[data-trail]").forEach(el=>{
  const item=el.getAttribute("data-trail");
  el.classList.toggle("current",item===id);el.classList.toggle("seen",seen.has(item));
  el.setAttribute("aria-pressed",String(item===id));
 });
 const d=N[id],root=byId("trail-detail");if(!root)return;
 root.innerHTML='<div class="lesson-kicker">FLUXOGRAMA · '+safe(d.k)+'</div><h2>'+safe(d.title)+'</h2><p>'+safe(d.text)+'</p><h3>O que fazer neste ponto?</h3><ol class="trail-actions">'+d.actions.map(x=>"<li>"+safe(x)+"</li>").join("")+'</ol><p class="source">Manual H_Sex_Ostomy, páginas '+safe(d.page)+'</p><div class="trail-options"><h3>Escolha o próximo caminho</h3>'+d.options.map(([label,to])=>'<button type="button" class="trail-choice '+(label.startsWith("NÃO")?"negative":"positive")+'" data-trail-choice="'+safe(to)+'">'+safe(label)+' <span aria-hidden="true">→</span></button>').join("")+'</div><div class="trail-tools"><button type="button" class="btn small" id="trail-back" '+(!past.length?"disabled":"")+'>← Voltar</button><span class="note">'+seen.size+' de '+keys.length+' pontos explorados</span></div><p class="assistive">Você pode clicar em qualquer ponto do mapa para explorar o programa fora de ordem. Isso é um recurso de aprendizagem, não autoriza pular a Permissão na prática clínica.</p>';
 document.querySelectorAll("[data-trail]").forEach(el=>{const id2=el.getAttribute("data-trail");el.title=N[id2]?.title||"";el.dataset.tone=N[id2]?.tone||"blue"});
};
function start(){const r=byId("trail-map");if(!r)return;show(current,true);
const shortcuts=byId("trail-shortcuts");
if(shortcuts)shortcuts.innerHTML=keys.filter(x=>["admissao","permissao","informacao","sugestoes","terapia","revisao"].includes(x)).map(k=>'<button type="button" class="btn small" data-trail="'+k+'">'+safe(N[k].title)+'</button>').join("");
}
document.addEventListener("click",e=>{
 const option=e.target.closest("[data-trail-choice]");if(option){show(option.dataset.trailChoice);return}
 const node=e.target.closest("[data-trail]");if(node){show(node.dataset.trail);return}
 if(e.target.closest("#trail-restart")){past=[];seen.clear();show("admissao",true);return}
 if(e.target.closest("#trail-back")){if(past.length)show(past.pop(),true);return}
 const menuLink=e.target.closest(".nav-items a");
 if(menuLink){
  document.querySelectorAll(".nav-dd").forEach(d=>d.open=false);
  const anchor=menuLink.getAttribute("data-scroll");
  if(anchor)setTimeout(()=>byId(anchor)?.scrollIntoView({behavior:"smooth",block:"start"}),40);
 }
});
document.querySelectorAll(".nav-dd").forEach(d=>d.addEventListener("toggle",()=>{if(d.open)document.querySelectorAll(".nav-dd").forEach(other=>{if(other!==d)other.open=false})}));
document.addEventListener("keydown",e=>{if(e.key==="Escape")document.querySelectorAll(".nav-dd").forEach(d=>d.open=false)});
window.addEventListener("hsex:view",e=>{if(e.detail?.id==="trilha")show(current,true)});
try{start()}catch(e){console.error("Trilha interativa indisponível",e);const root=byId("trail-detail");if(root)root.textContent="A trilha não pôde ser carregada. O índice do manual e o mapa do programa permanecem disponíveis."}
})();