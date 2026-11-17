(function(){
"use strict";
const D=window.HSEX_DIGITAL;
if(!D){console.warn("Conteúdo educativo indisponível.");return;}
const $=id=>document.getElementById(id);
const esc=t=>String(t??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const views=["apresentacao","manual","percurso","simulacao","workshop","recursos"];
let currentSection="identidade",currentFlow="permissao",slide=0,scene=0,answer=null,showNotes=true;
let visited=new Set();
try{visited=new Set(JSON.parse(localStorage.getItem("hsex_digital_visited_v03")||"[]"))}catch(e){}
const save=()=>{try{localStorage.setItem("hsex_digital_visited_v03",JSON.stringify([...visited]))}catch(e){}};
const toast=(message)=>{let n=$("notice");if(n){n.textContent=message;n.hidden=false;setTimeout(()=>{n.hidden=true},3500)}};
function openView(id){if(!views.includes(id))id="apresentacao";for(const v of document.querySelectorAll(".view"))v.classList.toggle("active",v.id===id);for(const a of document.querySelectorAll("[data-view]"))a.classList.toggle("active",a.getAttribute("data-view")===id);visited.add(id);save();try{history.replaceState(null,"","#"+id)}catch(e){};window.scrollTo({top:0,behavior:"instant"});if(id==="percurso")renderFlow();if(id==="manual")renderManual();if(id==="workshop")renderSlide();}
function renderIdentity(){const d=D.identity;$("purpose").textContent=d.purpose;$("mission").textContent=d.mission;$("vision").textContent=d.vision;
$("values").innerHTML=d.values.map((v,i)=>'<div class="value"><span class="eyebrow">0'+(i+1)+'</span><strong>'+esc(v[0])+'</strong><p>'+esc(v[1])+'</p></div>').join("");
$("audience").innerHTML=d.audience.map((t,i)=>'<div class="panel"><span class="eyebrow">'+(i?"Pessoas beneficiárias":"Usuários diretos")+'</span><p>'+esc(t)+'</p></div>').join("");
}
function renderManual(){
$("manual-menu").innerHTML=D.manual.map(s=>'<button type="button" data-section="'+s.id+'" class="'+(currentSection===s.id?"selected":"")+'">'+esc(s.order)+" · "+esc(s.name)+'</button>').join("");
renderManualUnit();
}
function renderManualUnit(search=""){
const s=D.manual.find(x=>x.id===currentSection)||D.manual[0];
const q=search.trim().toLocaleLowerCase("pt-BR");
let topics=q?s.topics.filter(t=>t.join(" ").toLocaleLowerCase("pt-BR").includes(q)):s.topics;
$("manual-content").innerHTML='<span class="chapter-num">CAPÍTULO '+esc(s.order)+'</span><h2>'+esc(s.name)+'</h2><p class="lead">'+esc(s.intro)+'</p><p class="note">Clique em um item para ver o resumo e a referência de página do manual. Não se trata de transcrição integral.</p><div class="manual-pills"><span>'+topics.length+' itens neste capítulo</span><span>Fonte: Manual H_Sex_Ostomy, 2026</span></div><div id="manual-details">'+(topics.length?topics.map(t=>'<details class="subtopic"><summary><span>'+esc(t[0])+" — "+esc(t[1])+'</span><small>p. '+esc(t[3])+'</small></summary><div class="detail"><p>'+esc(t[2])+'</p><p class="source">Localização no manual original: página(s) '+esc(t[3])+'.</p></div></details>').join(""):'<p>Não há itens correspondentes neste capítulo.</p>')+'</div><div class="notice">Para aprofundar, consulte as páginas indicadas do manual. A edição digital completa de cada capítulo ainda está sendo desenvolvida a partir do documento original.</div>';
}
function renderFlow(){
const f=D.flow.find(x=>x.id===currentFlow)||D.flow[0];
$("flow-map").innerHTML='<div class="map-head"><span class="eyebrow">Percurso não linear</span><h2>Mapa de cuidado</h2><p class="note">Escolha uma etapa e veja seu papel na aplicação do programa.</p></div><div class="map-grid">'+D.flow.map(x=>'<button type="button" class="map-node '+(x.id==="permissao"?"perm":x.id==="revisao"?"review":x.id==="terapia"?"therapy":"")+(x.id===f.id?" selected":"")+'" data-flow="'+x.id+'" aria-pressed="'+(x.id===f.id)+'"><small>'+esc(x.kind)+'</small><strong>'+esc(x.short)+" "+esc(x.title)+'</strong><span>Consultar →</span></button>').join("")+'</div><p class="notice" style="margin:10px 16px 0">↻ Permissão e Revisão atravessam o cuidado. O encaminhamento especializado depende de avaliação individual.</p>';
$("flow-detail").innerHTML='<span class="eyebrow">Componente · Manual pp. '+esc(f.page)+'</span><h2>'+esc(f.title)+'</h2><p class="lead">'+esc(f.goal)+'</p><h3>Na consulta de enfermagem</h3>'+f.actions.map((a,i)=>'<div class="resource-row"><span style="color:#0f9b75;font-weight:900">'+(i+1).toString().padStart(2,"0")+'</span><span>'+esc(a)+'</span></div>').join("")+'<div class="notice"><strong>Importante:</strong> '+esc(f.hint)+'</div><div class="button-row" style="margin-top:20px"><button class="btn small" data-section="'+(f.id==="revisao"?"fases":"fases")+'" data-openmanual="1">Localizar no manual →</button><button class="btn small primary" data-view="simulacao">Experimentar um caso ↗</button></div>';
}
function renderSlide(){
const s=D.slides[slide];
$("slide-content").innerHTML='<span class="slide-num">DEMONSTRAÇÃO GUIADA · '+(slide+1).toString().padStart(2,"0")+' / '+D.slides.length+'</span><h2>'+esc(s[0])+'</h2><p>'+esc(s[1])+'</p><div class="button-row" style="margin-top:25px"><a class="btn small" href="#'+(slide===4?"percurso":slide===5?"simulacao":slide===6?"manual":"apresentacao")+'" data-view="'+(slide===4?"percurso":slide===5?"simulacao":slide===6?"manual":"apresentacao")+'">Explorar este assunto ↗</a></div>';
$("speaker-notes").innerHTML='<strong>Orientação para quem conduz</strong><p>'+esc(s[2])+'</p><p class="note">Este roteiro serve à apresentação do workshop. Não corresponde a uma sessão real do programa.</p>';$("speaker-notes").hidden=!showNotes;
$("slide-count").textContent=(slide+1)+" de "+D.slides.length;
$("slide-prev").disabled=slide===0;$("slide-next").textContent=slide===D.slides.length-1?"Recomeçar ↺":"Avançar →";
$("slide-index").innerHTML=D.slides.map((_,i)=>'<button data-slide="'+i+'" class="'+(i===slide?"active":"")+'" aria-label="Ir ao tópico '+(i+1)+'">'+(i+1)+'</button>').join("");
}
function renderCase(){
const c=D.scenarios[scene];
$("scenario").innerHTML='<div class="lesson-kicker">SIMULAÇÃO FICTÍCIA · CENA '+(scene+1)+' DE '+D.scenarios.length+'</div><h2>'+esc(c.scene)+'</h2><div class="case-situation"><strong>Situação</strong><p>'+esc(c.story)+'</p></div><h3>'+esc(c.question)+'</h3>'+c.opts.map((o,i)=>'<button class="option" data-option="'+i+'" '+(answer!==null?"disabled":"")+'>'+esc(o[0])+'</button>').join("")+(answer!==null?'<div class="feedback"><strong>Devolutiva pedagógica</strong><p>'+esc(c.opts[answer][1])+'</p><p class="source">Referência: '+esc(c.source)+'</p></div><button class="btn primary" id="case-next">'+(scene===D.scenarios.length-1?"Reiniciar cenário ↺":"Continuar o caso →")+'</button>':'<p class="note">Selecione uma alternativa para receber feedback. Não há pontuação ou julgamento da sua prática.</p>');
$("case-step").textContent=(scene+1)+" / "+D.scenarios.length;
}
function renderResources(){
const resources=[
["01","Conheça o programa","Finalidade, missão, visão, valores, público-alvo e fundamentação.","apresentacao"],
["02","Índice completo do manual","Capítulos 1 a 9, referências, anexos e apêndice, com indicação de páginas.","manual"],
["03","Fluxo do cuidado","Percurso clicável baseado nos componentes do EX-PLISSIT adaptado ao programa.","percurso"],
["04","Resumo assistencial","Apêndice A, página 75: material-síntese para apoio à consulta de enfermagem.","manual"],
["05","IIEF-15 e QS-M","Anexos A e B, páginas 70–74: instrumentos citados no manual; conferir condições de uso e reprodução.","manual"],
["06","Implantação e indicadores","Capítulo 9, páginas 63–67: diretrizes e indicadores de estrutura, processo e resultado.","manual"]
];
$("resources").innerHTML=resources.map(r=>'<article class="resource"><div class="icon">◇</div><h3>'+esc(r[1])+'</h3><p>'+esc(r[2])+'</p><button class="btn small" data-view="'+esc(r[3])+'">Explorar ↗</button></article>').join("");
}
function updateStats(){const n=visited.size;$("visited").textContent=n+" / "+views.length;const p=$("progress");p.style.width=(n/views.length*100)+"%";}
function init(){
renderIdentity();renderManual();renderFlow();renderSlide();renderCase();renderResources();
document.body.classList.add("ready");
const id=location.hash.slice(1);openView(id||"apresentacao");updateStats();
}
document.addEventListener("click",e=>{
const el=e.target.closest("button,a");if(!el)return;
if(el.hasAttribute("data-view")){e.preventDefault();openView(el.dataset.view);updateStats();return}
if(el.hasAttribute("data-section")){
  currentSection=el.dataset.section;renderManual();
  if(el.hasAttribute("data-openmanual")){openView("manual");updateStats()}
  return;
}
if(el.hasAttribute("data-flow")){currentFlow=el.dataset.flow;renderFlow();return}
if(el.hasAttribute("data-slide")){slide=Number(el.dataset.slide);renderSlide();return}
if(el.hasAttribute("data-option")){answer=Number(el.dataset.option);renderCase();return}
if(el.id==="slide-prev"){slide=Math.max(0,slide-1);renderSlide();return}
if(el.id==="slide-next"){slide=(slide+1)%D.slides.length;renderSlide();return}
if(el.id==="toggle-notes"){showNotes=!showNotes;renderSlide();return}
if(el.id==="case-next"){scene=(scene+1)%D.scenarios.length;answer=null;renderCase();return}
if(el.id==="restart-case"){scene=0;answer=null;renderCase();return}
if(el.id==="copy-link"){e.preventDefault();if(navigator.clipboard?.writeText){navigator.clipboard.writeText(location.origin+location.pathname).then(()=>toast("Link copiado."),()=>toast("Copie o endereço do navegador."))}else{toast("Copie o endereço do navegador.")}return}
if(el.id==="present-mode"){document.body.classList.toggle("present");el.setAttribute("aria-pressed",String(document.body.classList.contains("present")));return}
});
document.addEventListener("input",e=>{if(e.target.id==="manual-search")renderManualUnit(e.target.value)});
document.addEventListener("keydown",e=>{if(!document.body.classList.contains("present")||document.querySelector("#workshop.view.active")===null)return;if(e.key==="ArrowRight"){slide=(slide+1)%D.slides.length;renderSlide()}if(e.key==="ArrowLeft"){slide=Math.max(0,slide-1);renderSlide()}});
window.addEventListener("hashchange",()=>{let id=location.hash.slice(1);if(views.includes(id)){openView(id);updateStats()}});
try{init()}catch(e){console.error("Falha ao inicializar interface",e);document.body.classList.remove("ready");const node=$("notice");if(node){node.hidden=false;node.textContent="A navegação interativa não carregou. A visão geral continua disponível nesta página.";}}
})();