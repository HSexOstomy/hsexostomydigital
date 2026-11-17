(()=>{
"use strict";
const D=window.HSO5;if(!D){console.error("Dados H_Sex_Ostomy indisponíveis");return}
const $=s=>document.getElementById(s);
const E=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const link=(id,label,style="secondary")=>'<a class="button '+style+'" href="#'+id+'" data-go="'+id+'">'+E(label)+'</a>';
const P={page:"inicio",comp:"permissao",chapter:"apresentacao",query:"",trail:"inicio",past:[],seen:new Set(["inicio"]),case:0,choice:null,slide:0,topic:"Todos",selected:[],scores:{iief:Array(15).fill(""),qsm:Array(10).fill("")}};
const slideData=[
["Boas-vindas ao H_Sex_Ostomy","Conheça uma proposta de reabilitação da sexualidade masculina na prática de enfermagem.","sobre"],
["Finalidade e identidade","Instrumentalizar enfermeiros, valorizando autonomia, acolhimento, reconhecimento, intersubjetividade e ética.","sobre"],
["Fundamentação","Teoria de Enfermagem de Reabilitação para o Bem-Viver e modelo EX-PLISSIT.","manual"],
["Como funciona o programa?","Permissão e Revisão são contínuas. Os níveis de intervenção se articulam conforme as demandas.","programa"],
["Vamos experimentar o fluxograma","Use os pontos de decisão. Uma resposta 'Não' também conduz a ações de cuidado.","trilha"],
["Avaliação e planejamento","Conheça instrumentos de avaliação e o processo de construção assistida do plano de cuidados.","avaliacao"],
["Situação simulada","Discuta uma decisão clínica fictícia e o raciocínio correspondente.","casos"],
["Discussão participativa","Reflita sobre possibilidades, barreiras e condições para implantação em serviços de saúde.","programa"]
];
const fig=(name,alt,caption="")=>D.assets[name]?'<figure class="figure"><img data-zoom src="./'+D.assets[name]+'" alt="'+E(alt)+'" loading="lazy" onerror="this.closest(\'figure\').hidden=true"><figcaption>'+E(caption)+'</figcaption></figure>':"";
const showAlert=(msg)=>'<div class="info">'+msg+'</div>';
const credit='<p class="caption">Conteúdo educativo elaborado a partir do manual H_Sex_Ostomy (2026). Para aplicação assistencial, consulte o documento original e exerça julgamento clínico.</p>';
function nav(id,push=true){
 const el=$("page-"+id);if(!el)return;
 document.querySelectorAll(".page").forEach(x=>x.classList.toggle("is-active",x.id==="page-"+id));
 document.querySelectorAll(".navigation a[data-go]").forEach(x=>x.classList.toggle("active",x.dataset.go===id));
 P.page=id;if(push&&location.hash!=="#"+id)history.replaceState(null,"","#"+id);
 document.querySelectorAll(".nav-group").forEach(n=>n.open=false);
 const mobile=$("mobile-navigation");if(mobile){mobile.hidden=true;$("menu-toggle")?.setAttribute("aria-expanded","false")}
 window.scrollTo({top:0,behavior:"instant"});
 if(id==="trilha")drawTrail();if(id==="iief")drawScore("iief");if(id==="qsm")drawScore("qsm");
}
function renderAbout(){
 const v=D.identity;
 $("about-content").innerHTML='<div class="grid-2"><article class="card"><span class="eyebrow">PROPÓSITO</span><h2>Finalidade</h2><p>'+E(v.purpose)+'</p></article><article class="card"><span class="eyebrow">MISSÃO</span><h2>Para quem e por quê?</h2><p>'+E(v.mission)+'</p></article></div>'+
 '<article class="card section-space"><span class="eyebrow">VISÃO</span><h2>O que buscamos construir</h2><p>'+E(v.vision)+'</p></article>'+
 '<div class="section-space"><span class="eyebrow">PRINCÍPIOS</span><h2>Valores do programa</h2><div class="grid-3">'+v.values.map(([a,b])=>'<div class="card value"><strong>'+E(a)+'</strong><p>'+E(b)+'</p></div>').join("")+'</div></div>'+
 '<div class="grid-2 section-space"><article class="card"><h3>Público que utiliza o programa</h3><p>Enfermeiros(as) envolvidos(as) no cuidado de pessoas com estomas de eliminação.</p></article><article class="card"><h3>Para quem é o cuidado</h3><p>Homens com estomas de eliminação, como participantes ativos de sua trajetória de reabilitação.</p></article></div>'+
 '<div class="button-row section-space">'+link("programa","Conhecer componentes →","primary")+link("equipe","Autoria e instituições →")+'</div>';
}
function renderTeam(){
 const img1='./'+D.assets.instituicao,img2='./'+D.assets.pos;
 $("team-content").innerHTML='<div class="grid-2"><div class="card"><span class="eyebrow">AUTORIA DO MANUAL</span><h2>Ariana Luiza Rabelo</h2><p>Pesquisadora vinculada ao desenvolvimento do H_Sex_Ostomy.</p><div class="info">Autoria e créditos devem ser apresentados conforme o manual e o projeto acadêmico, com revisão final dos responsáveis.</div></div><div class="card"><span class="eyebrow">ORIENTAÇÃO</span><h2>Anderson Reis de Sousa</h2><p>Professor e orientador acadêmico vinculado ao desenvolvimento do programa.</p></div></div>'+
 '<div class="grid-2 section-space"><div class="card institution"><img src="'+img1+'" alt="Brasão da Escola de Enfermagem da UFBA" onerror="this.hidden=true"><div><h3>Escola de Enfermagem da UFBA</h3><p>Vínculo acadêmico do desenvolvimento do programa.</p><a class="text-link" href="https://enfermagem.ufba.br/" rel="noopener" target="_blank">Portal institucional ↗</a></div></div><div class="card institution wide"><img src="'+img2+'" alt="Programa de Pós-Graduação em Enfermagem e Saúde da UFBA" onerror="this.hidden=true"><div><h3>Programa de Pós-Graduação em Enfermagem e Saúde</h3><p>PPGENF · Escola de Enfermagem · UFBA</p></div></div></div>'+
 '<p class="caption section-space">A apresentação das marcas identifica vínculos acadêmicos, não constitui declaração de endosso institucional da versão experimental do site.</p>';
}
function compButton(c){return'<button type="button" data-comp="'+c.id+'" class="'+(P.comp===c.id?"selected":"")+'">'+E(c.name)+' <span class="pill">'+E(c.tag)+'</span></button>'}
function renderProgram(){
 const c=D.components.find(x=>x.id===P.comp)||D.components[0];
 $("program-content").innerHTML='<div class="program-layout"><aside class="side-menu"><div class="side-label">COMPONENTES</div>'+D.components.map(compButton).join("")+
 '<div class="side-label">OUTRAS ÁREAS</div>'+link("manual","Manual por capítulos")+link("fluxo","Ver fluxograma")+link("plano","Planejar cuidados")+'</aside>'+
 '<article class="card content-panel"><span class="component-tag">'+E(c.tag)+' · MANUAL PP. '+E(c.pages)+'</span><h2>'+E(c.name)+'</h2><p style="font-size:17px">'+E(c.summary)+'</p>'+
 '<h3>Como traduzir esse componente em cuidado?</h3><ul>'+c.actions.map(x=>'<li>'+E(x)+'</li>').join("")+'</ul>'+
 '<div class="info"><strong>Exemplo de aplicação:</strong> '+E(c.example)+'</div>'+
 (c.figure?fig(c.figure,"Figura original de "+c.name,"Ilustração extraída do manual H_Sex_Ostomy."): "")+
 '<div class="button-row section-space">'+link("trilha","Explorar no fluxograma →","primary")+link("manual","Localizar no manual →")+'</div>'+credit+'</article></div>';
}
function renderFlow(){
 $("flux-content").innerHTML='<div class="card">'+fig("fluxograma","Fluxograma original do H_Sex_Ostomy na página 28","Figura 3, p. 28. Fluxo longitudinal, com decisões e retornos.")+
 '<div class="info"><strong>Interprete a figura:</strong> mesmo quando a resposta é negativa, o cuidado continua. A Permissão e a Revisão atravessam o percurso.</div>'+
 '<div class="button-row section-space">'+link("trilha","Abrir fluxograma clicável →","primary")+link("programa","Estudar componentes →")+'</div></div>';
}
function readerButton(ch){return'<button class="'+(ch.id===P.chapter?"active":"")+'" data-chapter="'+ch.id+'"><span>'+E(ch.num?ch.num+" · ":"")+E(ch.title)+'</span><small>p. '+E(ch.pages)+'</small></button>'}
function renderReader(){
 const c=D.chapters.find(x=>x.id===P.chapter)||D.chapters[0],filter=P.query.trim().toLocaleLowerCase("pt-BR");
 const filtered=D.chapters.filter(x=>(x.title+" "+x.blurb+" "+(x.sub||[]).join(" ")).toLocaleLowerCase("pt-BR").includes(filter));
 let supplement="";
 if(c.id==="identidade")supplement='<p>Finalidade, missão, visão, valores e público-alvo estão reunidos de forma completa na página Sobre.</p>'+link("sobre","Ler identidade do programa");
 if(c.id==="componentes")supplement='<p>Este capítulo inclui Permissão, Revisão, Informação Limitada, Sugestões Específicas e Terapia Intensiva.</p>'+link("programa","Explorar componentes");
 if(c.id==="fluxo")supplement=link("trilha","Experimentar fluxo interativo","primary");
 if(c.id==="metodologia")supplement='<p>Inclui os recursos de aplicação, as singularidades da reabilitação sexual e a avaliação clínica. O Quadro 6 (pp. 45–59) fundamenta o planejador de cuidados.</p>'+link("avaliacao","Ver instrumentos");
 if(c.id==="implantacao")supplement='<p>O Quadro 7, pp. 65–66, apresenta indicadores de estrutura, processo e resultado para acompanhamento da implantação.</p>';
 if(c.id==="anexoa")supplement=link("iief","Abrir calculadora IIEF-15","primary");
 if(c.id==="anexob")supplement=link("qsm","Abrir calculadora QS-M","primary");
 if(c.id==="apendice")supplement=link("programa","Consultar guia dos componentes");
 let art=c.figure?fig(c.figure,E(c.title),"Imagem selecionada do manual, p. "+c.pages+". Clique para ampliar."): "";
 const pos=D.chapters.findIndex(x=>x.id===c.id);
 $("manual-content").innerHTML='<div class="reader"><aside class="reader-list"><label for="reader-search" class="eyebrow">PESQUISAR CAPÍTULOS E TÍTULOS</label><input id="reader-search" class="reader-search" type="search" placeholder="Ex.: permissão, rede, implantação" value="'+E(P.query)+'"><div id="reader-buttons">'+(filtered.length?filtered.map(readerButton).join(""):'<p class="empty">Nenhum capítulo encontrado.</p>')+'</div></aside>'+
 '<article class="reader-main"><header><span class="eyebrow">MANUAL · '+E(c.num||"SEÇÃO")+' · PÁGINAS '+E(c.pages)+'</span><h2>'+E(c.title)+'</h2><p>'+E(c.blurb)+'</p></header>'+
 '<h3>O que este capítulo reúne</h3>'+(c.sub?'<ul class="reader-children">'+c.sub.map(x=>'<li>'+E(x)+'</li>').join("")+'</ul>':'<p>Esta seção corresponde ao título indicado no sumário original do documento.</p>')+
 art+supplement+
 '<div class="caution section-space"><strong>Sobre esta versão digital:</strong> o índice e a numeração correspondem ao PDF original. As fichas sintetizam o conteúdo e mostram as figuras selecionadas, mas ainda não reproduzem literalmente todas as 75 páginas. Para uso profissional, consulte também o manual original.</div>'+
 '<div class="reader-end"><button class="button subtle" data-chapter="'+D.chapters[Math.max(0,pos-1)].id+'" '+(pos===0?"disabled":"")+'>← Anterior</button><button class="button primary" data-chapter="'+D.chapters[Math.min(D.chapters.length-1,pos+1)].id+'" '+(pos===D.chapters.length-1?"disabled":"")+'>Próximo →</button></div></article></div>';
}
function renderAssessment(){
 $("assessment-content").innerHTML='<div class="grid-3 tool-cards"><a href="#iief" data-go="iief" class="card"><span class="tool-symbol">∑</span><h2>IIEF-15</h2><p>15 itens. Cinco domínios, soma automática e interpretação do domínio função erétil.</p><span class="text-link">Abrir calculadora →</span></a>'+
 '<a href="#qsm" data-go="qsm" class="card"><span class="tool-symbol">∑</span><h2>QS-M</h2><p>10 itens. Soma, multiplicação por dois e classificação automática do escore global.</p><span class="text-link">Abrir calculadora →</span></a>'+
 '<a href="#plano" data-go="plano" class="card"><span class="tool-symbol">▤</span><h2>Planejador de Cuidados</h2><p>Relações NANDA-I, NOC e NIC para análise, seleção e organização de plano educativo.</p><span class="text-link">Abrir planejador →</span></a></div>'+
 '<div class="section-space grid-2"><div class="card"><h2>Avaliação clínica complementar</h2><p>O Quadro 6 do manual (p. 45) propõe histórico clínico e sexual: tipo e tempo de estoma, condições clínicas, medicamentos, intimidade, imagem corporal, mudanças de desejo e resposta sexual, entre outros.</p>'+link("manual","Localizar no manual →")+'</div><div class="card"><h2>Como interpretar os resultados?</h2><p>As escalas oferecem informações para o raciocínio clínico. Escores não substituem investigação, Permissão, exame clínico quando pertinente, nem julgamento profissional.</p><p class="small">Nesta hospedagem pública, utilize dados fictícios. Não inclua nomes ou dados identificáveis de pacientes.</p></div></div>';
}
const forms={
iief:{n:15,max:5,name:"IIEF-15",min:i=>i>=10?1:0,range:"0–5 nos itens 1–10; 1–5 nos itens 11–15."},
qsm:{n:10,max:5,name:"QS-M",min:i=>0,range:"0–5 em todos os itens."}
};
function calcIIEF(values){
 const sum=idx=>idx.reduce((acc,i)=>acc+Number(values[i-1]),0);
 const domains=[["Função erétil",sum([1,2,3,4,5,15]),30],["Função orgásmica",sum([9,10]),10],["Desejo sexual",sum([11,12]),10],["Satisfação com a relação",sum([6,7,8]),15],["Satisfação geral",sum([13,14]),10]];
 const ef=domains[0][1];let severity=ef>=26?"Sem disfunção erétil":ef>=22?"Disfunção erétil leve":ef>=17?"Disfunção erétil leve a moderada":ef>=11?"Disfunção erétil moderada":ef>=1?"Disfunção erétil grave":"Não classificável";
 const noActivity=values.slice(0,5).every(v=>Number(v)===0);
 if(noActivity)severity="Interpretação limitada: sem atividade/tentativas nas questões de função erétil";
 return {domains,severity,total:sum([...Array(15)].map((_,i)=>i+1)),warning:values.slice(0,10).some(v=>Number(v)===0)?"Há resposta(s) zero indicando ausência de atividade ou tentativa. Considere o contexto antes de interpretar o domínio de função erétil.":""};
}
function calcQSM(values){
 const score=values.reduce((a,b)=>a+Number(b),0)*2;
 return {score,severity:score>=82?"Bom a excelente":score>=62?"Regular a bom":score>=42?"Desfavorável a regular":score>=22?"Ruim a desfavorável":"Nulo a ruim"};
}
function drawScore(type){
 const root=$(type+"-content");if(!root)return;
 const conf=forms[type],s=P.scores[type],complete=s.every(x=>x!=="");
 const itemHtml=s.map((v,i)=>'<div class="item-score"><label for="'+type+'-'+(i+1)+'">Item '+(i+1)+'</label><select id="'+type+'-'+(i+1)+'" data-score="'+type+'" data-index="'+i+'" aria-label="Pontuação do item '+(i+1)+'"><option value="">Selecione</option>'+Array.from({length:6-conf.min(i)},(_,j)=>j+conf.min(i)).map(n=>'<option value="'+n+'" '+(v===String(n)?"selected":"")+'>'+n+'</option>').join("")+'</select></div>').join("");
 let result='<p class="small">Responda todos os itens para calcular. Valores não respondidos não são tratados como zero.</p>';
 if(complete && type==="iief"){
  const x=calcIIEF(s);
  result='<div class="result-strip">'+x.domains.map(([name,val,max])=>'<div class="metric"><small>'+E(name)+'</small><strong>'+val+' / '+max+'</strong><div class="progress-track"><span style="width:'+(100*val/max).toFixed(2)+'%"></span></div></div>').join("")+'</div><div class="info section-space"><strong>Função erétil:</strong> '+E(x.severity)+'. <span class="small">Classificação baseada nos itens 1–5 e 15, não no escore total.</span></div>'+
 (x.warning?'<div class="caution section-space">'+E(x.warning)+'</div>':"")+'<p class="small section-space">Soma descritiva dos 15 itens: '+x.total+'. A interpretação deve priorizar cada domínio, e não uma classificação global da soma.</p>';
 } else if(complete){
  const x=calcQSM(s);
  result='<div class="result-strip"><div class="metric"><small>Escore total QS-M</small><strong>'+x.score+' / 100</strong><p>'+E(x.severity)+'</p></div><div class="metric"><small>Soma dos dez itens</small><strong>'+(x.score/2)+' / 50</strong><p>Resultado × 2</p></div></div><div class="info section-space">Faixa de interpretação segundo as categorias apresentadas no manual. O escore descreve função e satisfação sexual e não estabelece diagnóstico clínico.</div>';
 }
 root.innerHTML='<div class="card"><div class="grid-2"><div><span class="eyebrow">ENTRADA DE PONTUAÇÕES</span><h2>'+conf.name+'</h2><p class="small">Use o instrumento original para ler as perguntas e respostas. Esta ferramenta mostra apenas os números dos itens, respeitando direitos de reprodução.</p></div><div class="info"><strong>Regras:</strong> '+conf.range+'<br><strong>Referência no manual:</strong> '+(type==="iief"?"Anexo A, pp. 70–72.":"Anexo B, pp. 73–74.")+'</div></div><div class="caution section-space">Calculadora educativa sem armazenamento remoto. Não digite dados identificáveis de pacientes. A ausência de atividade sexual pode limitar a interpretação do IIEF-15.</div><div class="form-grid section-space">'+itemHtml+'</div><div class="section-space"><h3>Resultado</h3>'+result+'</div><div class="calc-actions"><button class="button" type="button" data-reset="'+type+'">Limpar respostas</button><button class="button primary" data-print="'+type+'" '+(!complete?"disabled":"")+'>Imprimir resultado</button></div></div>';
}
function renderCare(){
 const topics=["Todos",...new Set(D.diagnoses.map(x=>x.topic))];
 const matches=D.diagnoses.filter(x=>P.topic==="Todos"||x.topic===P.topic);
 $("care-content").innerHTML='<div class="caution">Ferramenta educacional de apoio ao raciocínio. Nenhum diagnóstico é confirmado automaticamente. As associações são exemplos do Quadro 6 do manual (pp. 45–59), devem ser verificadas nas edições oficiais das classificações e não substituem avaliação individualizada.</div>'+
 '<div class="grid-2 section-space"><div class="card"><span class="eyebrow">BIBLIOTECA CLÍNICA</span><h2>Diagnósticos para consideração</h2><p class="small">Filtre por dimensão do cuidado e selecione relações para um plano educativo de exemplo.</p><div class="topic-pills">'+topics.map(t=>'<button class="'+(P.topic===t?"active":"")+'" data-topic="'+E(t)+'">'+E(t)+'</button>').join("")+'</div>'+
 matches.map(d=>'<article class="diagnosis"><strong>'+E(d.name)+' · '+E(d.id)+'</strong><span class="small">'+E(d.topic)+' · manual pp. '+E(d.page)+'</span><p>'+E(d.focus)+'</p><details><summary class="small">Aspectos para investigar</summary><ul>'+d.check.map(x=>'<li class="small">'+E(x)+'</li>').join("")+'</ul></details><p class="small"><b>NOC:</b> '+d.noc.map(x=>E(x[1])+" ("+E(x[0])+")").join("; ")+'<br><b>NIC:</b> '+d.nic.map(x=>E(x[1])+" ("+E(x[0])+")").join("; ")+'</p><button type="button" data-adddiag="'+d.id+'" '+(P.selected.includes(d.id)?"disabled":"")+'>'+(P.selected.includes(d.id)?"Adicionado ✓":"+ Adicionar ao plano")+'</button></article>').join("")+'</div>'+
 '<div class="card"><span class="eyebrow">SELEÇÃO REVISÁVEL</span><h2>Meu plano de estudo</h2><p class="small">Os diagnósticos selecionados aparecem com resultados e intervenções associados. Revise e personalize antes de qualquer uso profissional.</p><div id="care-selection" class="plan-output">'+renderPlanSelection()+'</div><div class="calc-actions"><button class="button" data-clearplan>Limpar</button><button class="button primary" data-printplan '+(!P.selected.length?"disabled":"")+'>Imprimir plano educativo</button></div><p class="readonly-hint">Nenhum nome, prontuário ou informação identificável é solicitado ou armazenado no servidor.</p></div></div>';
}
function renderPlanSelection(){
 if(!P.selected.length)return'<p class="small">Nenhum diagnóstico selecionado. Use “Adicionar ao plano” na lista à esquerda.</p>';
 return P.selected.map((id,i)=>{const x=D.diagnoses.find(d=>d.id===id);if(!x)return"";return'<div class="diagnosis"><div style="display:flex;justify-content:space-between;gap:8px"><strong>'+(i+1)+'. '+E(x.name)+'</strong><button class="remove" data-remdiag="'+E(x.id)+'">Remover</button></div><p class="small">NANDA-I '+E(x.id)+' · NOC '+x.noc.map(a=>E(a[1])+" ("+E(a[0])+")").join(", ")+' · NIC '+x.nic.map(a=>E(a[1])+" ("+E(a[0])+")").join(", ")+'</p><p class="small"><strong>Aspectos para avaliação:</strong> '+E(x.focus)+'</p></div>'}).join("")+'<div class="info">Defina metas, intervenções individualizadas e revisão conforme avaliação e prioridades da pessoa. Este material não representa um plano assistencial validado automaticamente.</div>';
}
function trailButton(node){return'<button type="button" data-trail="'+node.id+'" class="flow-node '+E(node.kind)+' '+(P.trail===node.id?"selected":"")+'"><span class="pill">'+(node.kind==="decision"?"Decisão":node.kind==="alternative"?"Não":node.kind==="loop"?"Retorno":"Ação")+'</span><br>'+E(node.title)+'</button>'}
function drawTrail(){
 const x=D.flow.find(n=>n.id===P.trail)||D.flow[0];
 $("trail-content").innerHTML='<div class="grid-2" style="margin-bottom:18px"><div class="info"><strong>Navegação livre:</strong> clique em qualquer ponto do mapa, avance conforme uma resposta ou utilize “Voltar”. Não existe pontuação de acertos.</div><div class="caution"><strong>Aplicação real:</strong> pular no mapa é recurso educativo. A Permissão e a Revisão permanecem contínuas, e decisões dependem da pessoa.</div></div>'+
 '<div class="flow-grid"><div class="card"><span class="eyebrow">MAPA DO PERCURSO</span><div class="flow-list">'+D.flow.map(trailButton).join("")+'</div></div>'+
 '<aside class="card flow-detail"><span class="eyebrow">EXPLORANDO AGORA</span><h2>'+E(x.title)+'</h2><p>'+E(x.desc)+'</p><h3>Próximo caminho</h3>'+x.options.map(([label,dest])=>'<button class="flow-branch '+(label.startsWith("NÃO")?"negative":"")+'" data-trailnext="'+E(dest)+'">'+E(label)+' <span>→</span></button>').join("")+
 '<div class="button-row section-space"><button class="button" data-trailback '+(!P.past.length?"disabled":"")+'>← Voltar</button><button class="button subtle" data-trailreset>Recomeçar ↺</button></div><p class="small">'+P.seen.size+' de '+D.flow.length+' pontos explorados. Manual: Figura 3, p. 28.</p></aside></div>';
}
function renderCases(){
 const c=D.cases[P.case];
 $("cases-content").innerHTML='<div class="grid-2"><div class="card"><span class="eyebrow">SITUAÇÃO FICTÍCIA · CENA '+(P.case+1)+' DE '+D.cases.length+'</span><h2>'+E(c.title)+'</h2><p>'+E(c.scenario)+'</p><h3>Que conduta você considera?</h3><div class="case-options">'+c.options.map(([label],i)=>'<button data-casechoice="'+i+'" '+(P.choice!==null?"disabled":"")+'>'+E(label)+'</button>').join("")+'</div>'+
 (P.choice!==null?'<div class="feedback"><strong>Reflexão</strong><p>'+E(c.options[P.choice][1])+'</p><button class="button primary" data-casenext>'+(P.case===D.cases.length-1?"Recomeçar simulação":"Próxima cena →")+'</button></div>':"")+'</div><div class="card soft"><span class="eyebrow">APRENDER SEM PONTUAÇÃO</span><h2>Uma decisão, muitos contextos</h2><p>As opções ajudam a compreender a lógica do programa e os caminhos de continuidade de cuidado.</p>'+fig("permissao","Estratégia de Permissão, Figura 4 do manual","Manual, p. 30.")+link("trilha","Abrir a trilha de decisões")+'</div></div>';
}
function renderWorkshop(){
 const [title,desc,dest]=slideData[P.slide];
 $("workshop-content").innerHTML='<div class="grid-2"><div><div class="workshop-slide"><span class="slide-number">MOMENTO '+(P.slide+1)+' DE '+slideData.length+'</span><h2 style="font-size:36px;margin-top:22px">'+E(title)+'</h2><p style="font-size:19px;color:#446b7e">'+E(desc)+'</p><div class="button-row section-space">'+link(dest,"Abrir conteúdo relacionado →","primary")+'</div></div><div class="slide-controls"><button class="button" data-slide="-1" '+(P.slide===0?"disabled":"")+'>← Anterior</button><span class="small">Use as setas para apresentar</span><button class="button primary" data-slide="1" '+(P.slide===slideData.length-1?"disabled":"")+'>Próximo →</button></div></div><div class="card"><span class="eyebrow">ACESSO RÁPIDO</span><h2>Demonstrar sem perder o roteiro</h2><p>Abra uma área e volte a Workshop para continuar no mesmo momento.</p><div class="quicklinks">'+link("sobre","Missão e objetivos")+link("trilha","Fluxograma Sim / Não","primary")+link("programa","Componentes")+link("casos","Casos simulados")+link("iief","IIEF-15")+link("plano","Planejador")+'</div><div class="info section-space">O pré e o pós-teste do estudo permanecem como instrumentos de pesquisa separados. Links só serão inseridos depois de confirmados pela equipe.</div></div></div>';
}
function renderContact(){
 $("contact-content").innerHTML='<div class="contact-grid"><div class="card"><span class="eyebrow">CONTATO ACADÊMICO</span><h2>Fale com a equipe</h2><p>Para dúvidas, sugestões e comunicação sobre a pesquisa e o programa.</p><a class="mail" href="mailto:arianaluiza-cajuru@hotmail.com?subject=Contato%20sobre%20H_Sex_Ostomy">arianaluiza-cajuru@hotmail.com</a><p class="small">Endereço informado nos materiais do workshop. Não encaminhe dados identificáveis de pacientes.</p></div><div class="card"><span class="eyebrow">INSTITUIÇÕES</span><div class="institution"><img src="./'+D.assets.instituicao+'" alt="Brasão da Escola de Enfermagem" onerror="this.hidden=true"><div><strong>Escola de Enfermagem · UFBA</strong><p class="small">Programa de Pós-Graduação em Enfermagem e Saúde</p></div></div><img style="max-width:245px;max-height:85px;object-fit:contain;margin-top:25px" src="./'+D.assets.pos+'" alt="PPGENF UFBA" onerror="this.hidden=true"></div></div>';
}
function init(){
 renderAbout();renderTeam();renderProgram();renderFlow();renderReader();renderAssessment();drawScore("iief");drawScore("qsm");renderCare();drawTrail();renderCases();renderWorkshop();renderContact();
 const ids=["inicio","sobre","equipe","programa","fluxo","manual","avaliacao","iief","qsm","plano","trilha","casos","workshop","contato"];
 const mobile=$("mobile-navigation");mobile.innerHTML=ids.map(id=>'<a href="#'+id+'" data-go="'+id+'">'+({inicio:"Início",sobre:"O projeto",equipe:"Quem somos",programa:"Componentes",fluxo:"Fluxograma",manual:"Manual",avaliacao:"Avaliação",iief:"IIEF-15",qsm:"QS-M",plano:"Plano de cuidados",trilha:"Trilha",casos:"Casos",workshop:"Workshop",contato:"Contato"})[id]+'</a>').join("");
 const initial=location.hash.replace("#","");nav(ids.includes(initial)?initial:"inicio",false);
}
document.addEventListener("click",ev=>{
 const go=ev.target.closest("[data-go]");if(go){ev.preventDefault();nav(go.dataset.go);return}
 const comp=ev.target.closest("[data-comp]");if(comp){P.comp=comp.dataset.comp;renderProgram();return}
 const chapter=ev.target.closest("[data-chapter]");if(chapter){P.chapter=chapter.dataset.chapter;renderReader();return}
 const reset=ev.target.closest("[data-reset]");if(reset){P.scores[reset.dataset.reset].fill("");drawScore(reset.dataset.reset);return}
 const printing=ev.target.closest("[data-print],[data-printplan]");if(printing){window.print();return}
 const topic=ev.target.closest("[data-topic]");if(topic){P.topic=topic.dataset.topic;renderCare();return}
 const add=ev.target.closest("[data-adddiag]");if(add){if(!P.selected.includes(add.dataset.adddiag))P.selected.push(add.dataset.adddiag);renderCare();return}
 const rem=ev.target.closest("[data-remdiag]");if(rem){P.selected=P.selected.filter(id=>id!==rem.dataset.remdiag);renderCare();return}
 if(ev.target.closest("[data-clearplan]")){P.selected=[];renderCare();return}
 const tr=ev.target.closest("[data-trail]");if(tr){if(P.trail!==tr.dataset.trail)P.past.push(P.trail);P.trail=tr.dataset.trail;P.seen.add(P.trail);drawTrail();return}
 const tnext=ev.target.closest("[data-trailnext]");if(tnext){P.past.push(P.trail);P.trail=tnext.dataset.trailnext;P.seen.add(P.trail);drawTrail();return}
 if(ev.target.closest("[data-trailback]")){if(P.past.length)P.trail=P.past.pop();drawTrail();return}
 if(ev.target.closest("[data-trailreset]")){P.past=[];P.seen=new Set(["inicio"]);P.trail="inicio";drawTrail();return}
 const cc=ev.target.closest("[data-casechoice]");if(cc){if(P.choice===null){P.choice=Number(cc.dataset.casechoice);renderCases()}return}
 if(ev.target.closest("[data-casenext]")){P.case=(P.case+1)%D.cases.length;P.choice=null;renderCases();return}
 const slide=ev.target.closest("[data-slide]");if(slide){P.slide=Math.max(0,Math.min(slideData.length-1,P.slide+Number(slide.dataset.slide)));renderWorkshop();return}
 if(ev.target.closest("#menu-toggle")){const mob=$("mobile-navigation");mob.hidden=!mob.hidden;$("menu-toggle").setAttribute("aria-expanded",String(!mob.hidden));return}
 const zoom=ev.target.closest("[data-zoom]");if(zoom){$("modal-img").src=zoom.currentSrc||zoom.src;$("modal-img").alt=zoom.alt;$("modal-caption").textContent=zoom.closest("figure")?.querySelector("figcaption")?.textContent||"";$("image-modal").hidden=false;return}
 if(ev.target.closest("#modal-close")||ev.target.id==="image-modal"){$("image-modal").hidden=true;return}
 const navlink=ev.target.closest(".nav-drop a");if(navlink)document.querySelectorAll(".nav-group").forEach(x=>x.open=false);
});
document.addEventListener("change",ev=>{const sc=ev.target.closest("[data-score]");if(!sc)return;P.scores[sc.dataset.score][Number(sc.dataset.index)]=sc.value;drawScore(sc.dataset.score)});
document.addEventListener("input",ev=>{if(ev.target.id==="reader-search"){P.query=ev.target.value;const match=D.chapters.filter(x=>(x.title+" "+x.blurb+" "+(x.sub||[]).join(" ")).toLocaleLowerCase("pt-BR").includes(P.query.toLocaleLowerCase("pt-BR")));const box=$("reader-buttons");if(box)box.innerHTML=match.length?match.map(readerButton).join(""):'<p class="empty">Nenhum capítulo encontrado.</p>'}});
document.addEventListener("keydown",ev=>{if(ev.key==="Escape")$("image-modal").hidden=true});
window.addEventListener("hashchange",()=>{const h=location.hash.slice(1);if($("page-"+h))nav(h,false)});
try{init()}catch(error){console.error("H_Sex_Ostomy Digital: falha de inicialização",error);const hero=$("page-inicio");if(hero){hero.classList.add("is-active");const n=document.createElement("p");n.className="caution";n.textContent="Algumas funcionalidades não foram carregadas. Recarregue a página e, se necessário, entre em contato pelo menu Contato.";hero.prepend(n)}}
window.HSO5_TEST={calcIIEF,calcQSM,domains:D.diagnoses.length};
})();