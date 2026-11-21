# H_Sex_Ostomy Digital

**Site:** https://hsexostomy.github.io/hsexostomydigital/

Plataforma educacional do *H_Sex_Ostomy: Programa de Reabilitação da Sexualidade Masculina* (Rabelo; Sousa, 2026), da Escola de Enfermagem da UFBA. Leva o programa para a prática digital: manual por seções, ferramentas de consulta, aulas, casos clínicos e o Workshop Participativo.

## O que tem na plataforma

| Área | Páginas | Para que serve |
|---|---|---|
| **Sobre** | `#sobre`, `#equipe`, `#contato` | Apresentação, identidade, autoria, ficha técnica, instituições |
| **O Programa** | `#programa`, `#fundamentos`, `#fluxograma`, `#manual`, `#sintese` | Figuras originais do manual em alta resolução com áreas clicáveis (Figura 2 e Figura 3), exemplos práticos em cada etapa do fluxograma, os 41 conceitos da teoria, leitor do manual com busca, Apêndice A para imprimir |
| **Ferramentas** | `#consulta`, `#orientacoes`, `#calculadoras`, `#iief`, `#qsm`, `#planejador`, `#encaminhamento`, `#implantacao` | Roteiro com falas prontas, folheto ao paciente, IIEF-15 e QS-M, plano de cuidados com evolução, gerador de encaminhamento, indicadores do Quadro 7 |
| **Aprenda** | `#capacitacao`, `#casos`, `#mitos` | Capacitação profissional em nove módulos clínicos com alertas; simulação clínica ramificada (o caso muda conforme as escolhas); mito ou fato |
| **Workshop** | `#workshop`, `#apresentar`, `#participar` | Roteiro de 3 horas, apresentação em tela cheia com notas, modo participante por QR code |

## Como editar sem mexer no código

### Painel de edição (recomendado)
Textos, fotos, links e equipe são editados com cliques pelo **Pages CMS** (gratuito): https://app.pagescms.org

1. Entre com a conta do GitHub que administra `hsexostomy`.
2. Na primeira vez, instale o GitHub App do Pages CMS e libere o repositório `hsexostomydigital`.
3. Abra o repositório. O menu mostra:
   - **Equipe e parceiros**: equipe principal, bolsistas e colaboradores(as) (foto recortada automaticamente no círculo, enquadramento, função, formação, minibiografia e link do currículo); ficha técnica; instituições de realização e apoio (com logos)
   - **Textos do site**: página inicial (incluindo um aviso em destaque opcional), Sobre o programa, textos de abertura de cada página, folheto de orientações ao paciente (com contato do serviço), contato, rodapé, manual/guia em PDF e materiais para download
   - **Workshop**: data, horário, links do Meet, pré-teste e pós-teste, roteiro, checklist, eixos da discussão; slides (títulos, tópicos e notas do apresentador)
   - **Capacitação e atividades**: módulos da capacitação, Mito ou fato, Escolha a melhor fala e textos dos casos da simulação clínica
4. Altere, clique em **Save**. O site atualiza sozinho em 1 a 2 minutos.

Os dados ficam em `conteudo/*.json` e a configuração do painel em `.pages.yml`. Fotos vão para `assets/img/` e PDFs para `assets/docs/`. Campos marcados "Não altere" são códigos internos.

O painel não edita o visual, a ordem das abas, as escalas e instrumentos (IIEF-15, QS-M), os diagnósticos NANDA-I/NOC/NIC, o fluxograma, os textos e quadros do manual nem os caminhos da simulação. Isso continua no código (`src/`).

Para convidar outras pessoas a editar sem conta no GitHub: no painel, **Collaborators** > e-mail. O que elas salvam vai direto para o ar.

### Conteúdo técnico (no código)
Em `src/data/`:

| Arquivo | Conteúdo |
|---|---|
| `programa.js` | Componentes, Quadro 1 (41 conceitos), Figura 1. Apresentação, identidade e ficha técnica vêm de `conteudo/` |
| `quadros.js` | Quadro 2 (temas e falas), Quadro 3, Quadro 4, Figuras 4 e 5, Quadro 5, Terapia Intensiva, rede, diretrizes, Quadro 7, Apêndice A |
| `cuidado.js` | Quadro 6 completo: histórico, 9 diagnósticos com NOC, NIC e pontos de atenção; escalas NOC; exemplo de registro |
| `instrumentos.js` | IIEF-15 e QS-M (Anexos A e B), domínios e faixas |
| `manual.js` | Seções do leitor do manual, textos e referências |
| `capacitacao.js` | Leitura dos módulos de `conteudo/capacitacao.json` e tipos de alerta |
| `aprendizagem.js` | Leitura dos casos, falas e mitos de `conteudo/`; caminhos e efeitos da simulação ficam em `conteudo/casos.json` como campos travados |
| `workshop.js` | Tipo e recursos de cada bloco do roteiro; roteiro e slides vêm de `conteudo/` |

Se algo der errado, o histórico do GitHub permite voltar a qualquer versão anterior.

## Arquitetura

Site estático, sem etapa de build, publicado pelo GitHub Pages.

```
index.html            estrutura, cabeçalho, menu e rodapé
conteudo/             textos, equipe, instituições e links (editados pelo painel)
.pages.yml            configuração do painel de edição (Pages CMS)
styles/               tokens.css (cores e fontes do manual), base, layout, components, figures, pages, workshop, print
src/main.js           inicialização, menu acessível, ações globais
src/core/             content.js (carrega conteudo/), dom.js (renderização com escape automático), router.js (rotas por hash), store.js, ui.js
src/data/             conteúdo do manual
src/figures/          figuras originais do manual com áreas clicáveis (imagem.js), etapas do fluxograma, síntese
src/pages/            uma página por arquivo, carregada sob demanda
assets/fonts/         Fira Sans e Fira Sans Condensed (tipografia do manual, licença OFL)
assets/img/           capa, figuras 1 a 6 e ilustrações extraídas do PDF a 300 dpi, com fundo transparente; logos
assets/docs/          PDFs enviados pelo painel
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

- `backup-site-2026-11-21`: site como estava antes do painel de edição
- `backup-before-v08-plataforma`: protótipo v0.7, antes da reconstrução como plataforma
- `backup-before-v07-learning-and-care` e `backup-v05-before-menu-scales-fix`: versões mais antigas

## Limites

Ferramenta educativa e de apoio. Não substitui o julgamento clínico nem foi validada como tecnologia digital. Use apenas dados fictícios ou não identificáveis. Os códigos NANDA-I, NOC e NIC e as escalas devem ser conferidos nas edições vigentes das classificações.
