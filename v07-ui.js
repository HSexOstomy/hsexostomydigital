(()=>{"use strict";
const D=window.HSO5,C=window.HSO_SITE_CONFIG||{},by=id=>document.getElementById(id);
if(!D)return;
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const link=(id,text)=>'<a class="button secondary" data-go="'+id+'" href="#'+id+'">'+esc(text)+'</a>';
const pic=(key,description)=>'<figure class="v7-figure"><img src="./'+esc(D.assets[key])+'" data-zoom alt="'+esc(description)+'" loading="lazy"><figcaption>'+esc(description)+'</figcaption></figure>';
const st={comp:"permissao",trail:"inicio",previous:[],seen:new Set(["inicio"]),lesson:0,mode:"free",done:new Set(),value:"Acolhimento"};
const loc={inicio:[50,12.1],permissao:[50,20.5],autorizacao:[50,30.7],recusa:[17.1,40.2],informacao:[50,42.2],demanda:[50,51.6],"sem-demanda":[17.1,60.9],sugestoes:[50,62.2],apoio:[50,72.4],terapia:[84.5,72.8],revisao:[50,85.3]};
const F=Object.fromEntries(D.flow.map(x=>[x.id,x]));
try{st.done=new Set(JSON.parse(localStorage.getItem("hsex-lessons-done")||"[]"))}catch(e){}
function institution(i){return '<a class="v7-inst" href="'+esc(i.url||"#")+'" target="_blank" rel="noopener noreferrer"><span class="v7-inst-img"><img src="./'+esc(i.logo)+'" alt="'+esc(i.short)+'"></span><span><strong>'+esc(i.short)+'</strong><small>'+esc(i.name)+'</small></span><b>↗</b></a>'}
function renderAbout(){
const r=by("about-content");if(!r)return;
const v=D.identity;
r.innerHTML='<div class="v7-identity"><article class="v7-identity-box"><span class="eyebrow">FINALIDADE</span><h2>Por que o H_Sex_Ostomy existe?</h2><p>'+esc(v.purpose)+'</p></article><article class="v7-identity-box navy"><span class="eyebrow">MISSÃO</span><h2>O que buscamos fazer?</h2><p>'+esc(v.mission)+'</p></article></div><div class="v7-vision"><div><span class="eyebrow">VISÃO</span><h2>Construir caminhos para o Bem-Viver</h2><p>'+esc(v.vision)+'</p></div>'+pic("teoria","Fundamentos teóricos do programa, esquema digital do manual.")+'</div><section class="v7-values"><span class="eyebrow">VALORES</span><h2>Princípios que orientam o cuidado</h2><div class="v7-values-tabs">'+v.values.map(([a])=>'<button data-v7value="'+esc(a)+'" class="'+(st.value===a?"active":"")+'">'+esc(a)+'</button>').join("")+'</div><div class="v7-values-detail"><strong>'+esc(st.value)+'</strong><p>'+esc(v.values.find(x=>x[0]===st.value)?.[1]||"")+'</p></div></section><div class="grid-2 section-space"><article class="card"><h3>Usuários diretos</h3><p>Enfermeiros(as) responsáveis pela abordagem da sexualidade na consulta de enfermagem.</p></article><article class="card"><h3>Beneficiários do cuidado</h3><p>Homens com estomas de eliminação, agentes ativos da própria reabilitação.</p></article></div>';
}
function renderTeam(){
const r=by("team-content");if(!r)return;
r.innerHTML='<p class="v7-muted">Nomes, titulações e futuras fotografias podem ser atualizados no arquivo <code>v07-config.js</code> do GitHub.</p><div class="v7-people">'+(C.authors||[]).map(a=>'<article class="v7-person"><div class="v7-person-avatar">'+(a.portrait?'<img src="'+esc(a.portrait)+'" alt="Foto de '+esc(a.name)+'">':'<span role="img" aria-label="Avatar provisório">'+esc(a.avatar||"👤")+'</span>')+'</div><div><span class="eyebrow">'+esc(a.role)+'</span><h2>'+esc(a.name)+'</h2><p class="v7-muted">'+esc(a.academicTitle)+'</p><p>'+esc(a.biography)+'</p></div></article>').join("")+'</div><section class="v7-support"><span class="eyebrow">APOIO INSTITUCIONAL</span><h2>Instituições vinculadas</h2><p>Este espaço pode receber outras instituições sem reformular a página.</p><div class="v7-inst-list">'+(C.institutions||[]).map(institution).join("")+'</div></section>';
}
function renderContact(){
const r=by("contact-content");if(!r)return;
const email=C.contactEmail||"";
r.innerHTML='<div class="v7-contact"><article class="v7-contact-primary"><span class="eyebrow">CONTATO ACADÊMICO</span><h2>Fale conosco</h2><p>Dúvidas, colaboração científica e sugestões sobre o programa.</p><a class="v7-email" href="mailto:'+esc(email)+'?subject=Contato%20H_Sex_Ostomy">'+esc(email)+'</a><p class="small">Não encaminhe dados identificáveis de pacientes.</p></article><aside class="v7-contact-secondary"><span class="eyebrow">APOIO INSTITUCIONAL</span><h2>Instituições</h2><div class="v7-inst-list">'+(C.institutions||[]).map(institution).join("")+'</div></aside></div>';
}
function renderProgram(){
const r=by("program-content");if(!r)return;const c=D.components.find(x=>x.id===st.comp)||D.components[0],p={permissao:"permissao",revisao:"revisao",informacao:"sintese",sugestoes:"sintese",terapia:"rede"};
r.innerHTML='<div class="v7-overview"><div><span class="eyebrow">FUNDAMENTAÇÃO E APLICAÇÃO</span><h2>Um programa, duas bases científicas</h2><p>Teoria de Enfermagem de Reabilitação para o Bem-Viver e EX-PLISSIT. A abordagem é contínua, centrada na pessoa e não segue etapas rigidamente lineares.</p><div class="button-row">'+link("manual","Consultar metodologia")+link("trilha","Ver trilha interativa")+'</div></div>'+pic("teoria","Esquema didático da articulação dos referenciais do programa.")+'</div><div class="v7-comp-head"><span class="eyebrow">OS CINCO COMPONENTES</span><h2>Selecione o conteúdo a explorar</h2></div><div class="v7-component-tabs">'+D.components.map(x=>'<button data-v7comp="'+x.id+'" class="'+(x.id===st.comp?"active":"")+'">'+esc(x.name)+'</button>').join("")+'</div><article class="v7-component"><div><span class="eyebrow">'+esc(c.tag)+' · PP. '+esc(c.pages)+'</span><h2>'+esc(c.name)+'</h2><p class="v7-lead">'+esc(c.summary)+'</p><h3>Orientações para a prática</h3><ol>'+c.actions.map(x=>'<li>'+esc(x)+'</li>').join("")+'</ol><div class="v7-guidance"><strong>Aplicação contextualizada</strong><p>'+esc(c.example)+'</p></div><div class="button-row">'+link("trilha","Experimentar decisões")+link("aulas","Estudar na formação")+'</div></div>'+pic(p[c.id],"Esquema educativo sobre "+c.name+", adaptado do manual.")+'</article>';
}
const hotspots=(active)=>'<div class="v7-diagram"><img src="./assets/fluxograma-v07.svg" alt="Fluxograma do H_Sex_Ostomy, fiel à organização da Figura 3, com decisões e caminhos de retorno">'+Object.entries(loc).map(([id,[x,y]])=>'<button class="v7-hotspot '+(active===id?"active":"")+'" data-v7node="'+id+'" style="left:'+x+'%;top:'+y+'%" title="'+esc(F[id]?.title)+'" aria-label="Explorar '+esc(F[id]?.title)+'">+</button>').join("")+'</div>';
const faq=[
["E quando o homem não autoriza?","Respeite a decisão, continue a assistência geral, registre a oferta e mantenha disponível uma futura conversa."],
["É necessário chegar à Terapia Intensiva?","Não. Ela é considerada quando demandas ultrapassam o escopo das intervenções de enfermagem."],
["A pessoa precisa cumprir todas as fases?","Não. O percurso é flexível. Permissão e Revisão são contínuas e os níveis podem ser retomados."],
["O que acontece quando não há demanda específica?","O acompanhamento continua, com abertura para novas dúvidas e necessidades tardias."],
["Como interpretar o retorno do fluxo?","Como acompanhamento longitudinal, reflexão e possibilidade de revisitar a Permissão e outras intervenções."]
];
function renderFlow(){
const r=by("flux-content");if(!r)return;
r.innerHTML='<section class="v7-flow"><span class="eyebrow">FIGURA 3 · MANUAL, P. 28</span><h2>Um fluxograma que se pode explorar</h2><p>Os pontos marcados com + são clicáveis. Passe o cursor para identificar a fase ou clique para abrir a explicação e seguir o caminho.</p>'+hotspots(null)+link("trilha","Simular os caminhos do fluxo →")+'</section><section class="v7-faq"><span class="eyebrow">DÚVIDAS EXPLICADAS</span><h2>Entenda as decisões do fluxograma</h2>'+faq.map(([q,a])=>'<details><summary>'+esc(q)+'</summary><p>'+esc(a)+'</p></details>').join("")+'</section>';
}
function renderTrail(){
const r=by("trail-content");if(!r)return;const f=F[st.trail]||D.flow[0];
r.innerHTML='<div class="v7-trail"><div class="v7-flow-map"><p class="small">Clique em qualquer ponto do fluxograma; você pode mudar de etapa a qualquer momento.</p>'+hotspots(st.trail)+'</div><aside class="v7-inspector"><span class="eyebrow">PONTO ATUAL</span><h2>'+esc(f.title)+'</h2><p>'+esc(f.desc)+'</p><h3>Escolha o próximo caminho</h3>'+f.options.map(([label,id])=>'<button class="v7-branch '+(label.startsWith("NÃO")?"negative":"")+'" data-v7next="'+id+'">'+esc(label)+' <b>→</b></button>').join("")+'<div class="button-row"><button class="button" data-v7back '+(!st.previous.length?"disabled":"")+'>← Voltar</button><button class="button" data-v7reset>Reiniciar</button></div><p class="small">'+st.seen.size+' de '+D.flow.length+' pontos explorados.</p><div class="v7-guidance">Na assistência, é indispensável obter Permissão e considerar a avaliação individualizada.</div></aside></div>';
}
function renderManual(){
const r=by("manual-content");if(!r)return;
const group=[D.chapters.slice(0,4),D.chapters.slice(4,8),D.chapters.slice(8)];
const pdf=(C.manualPdfUrl||"").trim();
r.innerHTML='<div class="v7-manual-hero"><div><span class="eyebrow">SUMÁRIO DO MANUAL ORIGINAL</span><h2>Navegue pelas seções do documento</h2><p>Numeração original, páginas e subitens. Abra cada seção para localizar o conteúdo. Este sumário não substitui o texto integral das 75 páginas.</p></div>'+pic("sintese","Material-síntese do programa, adaptação do Apêndice A, p. 75.")+'</div>'+group.map((list,i)=>'<section class="v7-manual-group"><h3>'+["Apresentação, fundamentos e método","Fluxo, intervenções e implantação","Referências e materiais complementares"][i]+'</h3>'+list.map(x=>'<details class="v7-toc"><summary><strong>'+esc((x.num?x.num+" · ":"")+x.title)+'</strong><span>p. '+esc(x.pages)+'</span></summary><div class="v7-toc-body"><p>'+esc(x.blurb)+'</p>'+(x.sub?'<ul>'+x.sub.map(x=>'<li>'+esc(x)+'</li>').join("")+'</ul>':"")+(x.figure?pic(x.figure,"Figura correspondente à seção "+x.title):"")+(x.id==="anexoa"?link("iief","Abrir IIEF-15"):x.id==="anexob"?link("qsm","Abrir QS-M"):x.id==="fluxo"?link("trilha","Abrir fluxograma"):link("aulas","Ver formação"))+'</div></details>').join("")+'</section>').join("")+'<section class="v7-pdf-slot"><span class="eyebrow">DOCUMENTO INTEGRAL</span><h2>Manual em PDF</h2><p>Espaço preparado para inserir o link do arquivo na nuvem quando estiver disponível. Edite apenas <code>manualPdfUrl</code> em <code>v07-config.js</code>.</p>'+(pdf.startsWith("https://")?'<a class="button primary" href="'+esc(pdf)+'" target="_blank" rel="noopener">Abrir PDF ↗</a>':'<span class="v7-pdf-empty">Aguardando o link do PDF</span>')+'</section>';
}
const lessons=[
["Conhecendo o H_Sex_Ostomy","Finalidade, missão, valores, público-alvo e escopo.","sobre"],
["Fundamentos teóricos","Teoria de Enfermagem de Reabilitação para o Bem-Viver e EX-PLISSIT.","programa"],
["Preparação da consulta","Recursos, contextos, periodicidade, histórico sexual e privacidade.","manual"],
["Permissão e autonomia","Abertura do diálogo, acolhimento e resposta negativa.","trilha"],
["Revisão contínua","Acompanhamento e necessidades que surgem em encontros posteriores.","trilha"],
["Informação Limitada","Orientações adequadas às necessidades do homem.","programa"],
["Sugestões Específicas","Avaliação e construção individualizada do plano de cuidados.","plano"],
["Terapia Intensiva","Encaminhamento quando indicado e articulação em rede.","fluxo"],
["Implantação e avaliação","Condições de implantação, indicadores e continuidade.","manual"]
];
function renderLessons(){
const r=by("lessons-content");if(!r)return;const x=lessons[st.lesson];
r.innerHTML='<div class="v7-course-head"><div><span class="eyebrow">JORNADA DE APRENDIZAGEM</span><h2>Você escolhe como aprender</h2><p>Uma sequência orientada ou acesso livre aos conteúdos: as duas experiências utilizam o mesmo programa.</p></div><div class="v7-course-modes"><button data-v7mode="guided" class="'+(st.mode==="guided"?"active":"")+'">Percurso guiado</button><button data-v7mode="free" class="'+(st.mode==="free"?"active":"")+'">Exploração livre</button></div></div><div class="v7-course"><nav class="v7-course-nav">'+lessons.map((p,i)=>'<button data-v7lesson="'+i+'" class="'+(i===st.lesson?"active":"")+'"><b>'+String(i+1).padStart(2,"0")+'</b><span>'+esc(p[0])+'</span>'+(st.done.has(i)?" ✓":"")+'</button>').join("")+'</nav><article class="v7-course-lesson"><span class="eyebrow">UNIDADE '+(st.lesson+1)+' DE '+lessons.length+'</span><h2>'+esc(x[0])+'</h2><p class="v7-lead">'+esc(x[1])+'</p><h3>Objetivo de aprendizagem</h3><p>Compreender os fundamentos e aplicar criticamente o conteúdo correspondente às necessidades da pessoa com estoma.</p><div class="button-row">'+link(x[2],"Abrir conteúdo e atividade →")+'</div><div class="v7-course-controls"><button class="button" data-v7done="'+st.lesson+'">'+(st.done.has(st.lesson)?"✓ Unidade estudada":"Marcar como estudada")+'</button><button class="button primary" data-v7lesson="'+Math.min(st.lesson+1,lessons.length-1)+'" '+(st.lesson===lessons.length-1?"disabled":"")+'>Próxima unidade →</button></div><p class="small">A marcação indica exploração, não conclusão certificada de curso.</p></article></div>';
}
function render(id){
if(id==="sobre")renderAbout();if(id==="equipe")renderTeam();if(id==="contato")renderContact();
if(id==="programa")renderProgram();if(id==="fluxo")renderFlow();if(id==="trilha")renderTrail();
if(id==="manual")renderManual();if(id==="aulas")renderLessons();
}
function gotoTrail(id){if(!F[id])return;if(st.trail!==id)st.previous.push(st.trail);st.trail=id;st.seen.add(id);if(by("page-trilha")?.classList.contains("is-active"))renderTrail();else{location.hash="trilha";setTimeout(renderTrail,0)}}
document.addEventListener("click",e=>{
const q=e.target.closest("[data-v7value]");if(q){st.value=q.dataset.v7value;renderAbout();return}
const c=e.target.closest("[data-v7comp]");if(c){st.comp=c.dataset.v7comp;renderProgram();return}
const n=e.target.closest("[data-v7node]");if(n){gotoTrail(n.dataset.v7node);return}
const next=e.target.closest("[data-v7next]");if(next){gotoTrail(next.dataset.v7next);return}
if(e.target.closest("[data-v7back]")){if(st.previous.length)st.trail=st.previous.pop();renderTrail();return}
if(e.target.closest("[data-v7reset]")){st.trail="inicio";st.previous=[];st.seen=new Set(["inicio"]);renderTrail();return}
const m=e.target.closest("[data-v7mode]");if(m){st.mode=m.dataset.v7mode;renderLessons();return}
const u=e.target.closest("[data-v7lesson]");if(u){st.lesson=Number(u.dataset.v7lesson);renderLessons();return}
const d=e.target.closest("[data-v7done]");if(d){st.done.add(Number(d.dataset.v7done));try{localStorage.setItem("hsex-lessons-done",JSON.stringify([...st.done]))}catch(e){}renderLessons();return}
const go=e.target.closest("[data-go]");if(go)setTimeout(()=>render(go.dataset.go),0);
});
window.addEventListener("hashchange",()=>setTimeout(()=>render(location.hash.slice(1)),0));
for(const id of ["sobre","equipe","contato","programa","fluxo","trilha","manual","aulas"])render(id);
window.HSO07={render,gotoTrail,lessonCount:lessons.length};
})();