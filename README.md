# H_Sex_Ostomy Digital

**Site:** https://hsexostomy.github.io/hsexostomydigital/

Plataforma educacional do *H_Sex_Ostomy: Programa de Reabilitação da Sexualidade Masculina* (Rabelo; Sousa, 2026), da Escola de Enfermagem da UFBA. Leva o programa para a prática digital: manual por seções, ferramentas de consulta, aulas, casos clínicos e o Workshop Participativo.

## O que tem na plataforma

| Área | Páginas | Para que serve |
|---|---|---|
| **Sobre** | `#sobre`, `#equipe`, `#contato` | Apresentação, identidade, autoria, ficha técnica, instituições |
| **O Programa** | `#programa`, `#fundamentos`, `#fluxograma`, `#manual`, `#sintese` | EX-PLISSIT interativo, Teoria do Bem-Viver com os 41 conceitos, Figura 3 interativa, leitor do manual com busca, Apêndice A para imprimir |
| **Ferramentas** | `#consulta`, `#orientacoes`, `#calculadoras`, `#iief`, `#qsm`, `#planejador`, `#encaminhamento`, `#implantacao` | Roteiro com falas prontas, folheto ao paciente, IIEF-15 e QS-M, plano de cuidados com evolução, gerador de encaminhamento, indicadores do Quadro 7 |
| **Aprenda** | `#aulas`, `#casos`, `#mitos` | Nove aulas com exercícios, três casos clínicos fictícios, mito ou fato |
| **Workshop** | `#workshop`, `#apresentar`, `#participar` | Roteiro de 3 horas, apresentação em tela cheia com notas, modo participante por QR code |

## Como editar sem mexer no código

### Autoria, instituições, contato e links do workshop
Edite **`site.config.js`** pelo GitHub (abra o arquivo, clique no lápis, altere o texto entre aspas e clique em *Commit changes*):

- `autores`: nome, titulação, foto (`assets/img/arquivo.webp`) e biografia
- `instituicoes`: nome, logo e endereço
- `contato.email`
- `manualPdf`: link público do PDF do manual (aparece o botão "Baixar PDF")
- `workshop`: data, horário, duração, modalidade e os links do **Meet**, **pré-teste** e **pós-teste**. O endereço em `enderecoSite` gera os QR codes.

### Textos do programa
O conteúdo fica separado da interface, em `src/data/`:

| Arquivo | Conteúdo |
|---|---|
| `programa.js` | Apresentação, finalidade, missão, visão, valores, público, componentes, Quadro 1 (41 conceitos), Figura 1, ficha técnica |
| `quadros.js` | Quadro 2 (temas e falas), Quadro 3, Quadro 4, Figuras 4 e 5, Quadro 5, Terapia Intensiva, rede, diretrizes, Quadro 7, Apêndice A |
| `cuidado.js` | Quadro 6 completo: histórico, 9 diagnósticos com NOC, NIC e pontos de atenção; escalas NOC; exemplo de registro |
| `instrumentos.js` | IIEF-15 e QS-M (Anexos A e B), domínios e faixas |
| `manual.js` | Seções do leitor do manual, textos e referências |
| `aprendizagem.js` | Aulas, casos clínicos, mito ou fato, treino de falas |
| `workshop.js` | Roteiro (agenda), checklist, eixos da discussão e slides com notas do apresentador |

Ao editar, mantenha as aspas e vírgulas. Se algo quebrar, o histórico do GitHub permite voltar à versão anterior.

## Arquitetura

Site estático, sem etapa de build, publicado pelo GitHub Pages.

```
index.html            estrutura, cabeçalho, menu e rodapé
site.config.js        configurações editáveis
styles/               tokens.css (cores e fontes do manual), base, layout, components, figures, pages, workshop, print
src/main.js           inicialização, menu acessível, ações globais
src/core/             dom.js (renderização com escape automático), router.js (rotas por hash), store.js, ui.js
src/data/             conteúdo do manual
src/figures/          figuras redesenhadas em SVG/HTML (EX-PLISSIT, fluxograma, estratégias, modelo teórico, rede, síntese)
src/pages/            uma página por arquivo, carregada sob demanda
assets/fonts/         Fira Sans e Fira Sans Condensed (tipografia do manual, licença OFL)
assets/img/           capa, ilustrações e logos extraídos do manual
assets/vendor/        qrcode-generator (MIT)
```

**Identidade visual:** cores, tipografia e ilustrações extraídas do próprio manual. As cores dos cinco componentes seguem o Apêndice A (Permissão verde, Revisão azul, Informação Limitada ocre, Sugestões Específicas violeta, Terapia Intensiva coral).

**Acessibilidade:** navegação por teclado (incluindo submenus e figuras), foco gerenciado entre páginas, textos alternativos, figuras com descrição, contraste AA e respeito a "reduzir movimento". Auditado com axe-core sem violações.

**Privacidade:** nenhum dado é enviado a servidores. O Planejador guarda o rascunho só na aba aberta (sessionStorage) e o apaga ao fechá-la. O progresso das aulas fica no navegador.

## Testar no computador

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```

Os módulos JavaScript não funcionam abrindo o `index.html` direto do disco; use um servidor local como acima.

## Versões anteriores

- `backup-before-v08-plataforma`: protótipo v0.7, antes da reconstrução como plataforma
- `backup-before-v07-learning-and-care` e `backup-v05-before-menu-scales-fix`: versões mais antigas

## Limites

Ferramenta educativa e de apoio. Não substitui o julgamento clínico nem foi validada como tecnologia digital. Use apenas dados fictícios ou não identificáveis. Os códigos NANDA-I, NOC e NIC e as escalas devem ser conferidos nas edições vigentes das classificações.
