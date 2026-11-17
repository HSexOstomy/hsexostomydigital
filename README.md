# H_Sex_Ostomy Digital — protótipo v0.1

Ambiente educativo interativo para apresentar e explorar os fundamentos e componentes do **H_Sex_Ostomy — Programa de Reabilitação da Sexualidade Masculina**.

**Fonte-base:** Rabelo, Ariana Luiza; Sousa, Anderson Reis de. *H_Sex_Ostomy: Programa de Reabilitação da Sexualidade Masculina*. Salvador, 2026. Manual fornecido pelos autores para elaboração deste protótipo.

## Recursos já implementados

- Mapa clínico interativo, com entrada direta nas fases do programa.
- Conteúdos educativos por tema e por abas (essencial, aplicação, prática, figura do manual quando disponível).
- Dicas contextuais reveladas ao clicar.
- Modo apresentação para conduzir workshop, com setas ← e → para navegar, e Esc para sair.
- Modo exploração livre para acesso individual pelo mesmo link.
- Simulação fictícia de três momentos do cuidado, com escolhas e feedback formativo, sem pontuação.
- Progresso local de conteúdos explorados, sem cadastro.
- Layout responsivo para computador e celular.
- Imagens selecionadas do manual original (verificar autorização de publicação com titulares dos direitos antes de tornar público).

## Publicar GRATUITAMENTE no GitHub Pages

1. Crie uma conta em https://github.com/ ou entre na sua conta.
2. O repositório público já foi criado: `HSexOstomy/hsexostomydigital`.
3. Faça upload **do conteúdo desta pasta** (arquivos `index.html`, `styles.css`, `content.js`, `app.js`, `.nojekyll`, `README.md` e a pasta `assets`) na raiz do repositório.
4. Clique em **Settings → Pages**.
5. Em **Build and deployment**, escolha **Deploy from a branch**. Selecione branch `main`, pasta `/(root)` e clique em **Save**.
6. Abra o endereço exibido pelo GitHub Pages. Em geral, será `https://HSexOstomy.github.io/hsexostomydigital/` (depende do nome escolhido).

> No GitHub Free, o Pages para repositórios é gratuito quando o repositório é **público**. Não envie dados sensíveis, planilhas de pesquisa, respostas individuais dos participantes nem materiais de terceiros sem autorização.

## Testar no computador

Abra `index.html` no navegador. Também pode executar `python -m http.server 8000` nesta pasta e abrir `http://localhost:8000/`.

## Organização dos arquivos

- `index.html` — estrutura da plataforma e mapa.
- `styles.css` — identidade visual e layout.
- `content.js` — textos dos módulos e caso fictício. É o arquivo principal para atualização científica.
- `app.js` — navegação, apresentação, dicas, simulação e marcação de progresso.
- `assets/*.webp` — figuras selecionadas do manual e capa.

## Pontos que precisam de revisão antes da publicação definitiva

- Revisão científica por responsáveis pelo programa, inclusive das sínteses didáticas.
- Conferência das autorizações de uso das ilustrações, do manual e de instrumentos.
- Revisão de acessibilidade e testes com usuários, incluindo dispositivos móveis.
- Decisão sobre qual instrumento da pesquisa e link será usado no workshop; pré/pós-teste **não estão incorporados** ao protótipo.
- Se for necessário sincronizar progresso entre dispositivos, incluir cadastros ou relatórios, será preciso planejar tratamento de dados, consentimento e infraestrutura além do GitHub Pages puro.

**Importante:** a plataforma é um recurso educativo. Não foi validada como ferramenta clínica nem avaliada quanto à eficácia pedagógica. Não coleta informações de pacientes e não salva respostas de questionários de pesquisa.