# H_Sex_Ostomy Digital

**Site:** https://hsexostomy.github.io/hsexostomydigital/

Ambiente digital educativo desenvolvido a partir do manual *H_Sex_Ostomy: Programa de Reabilitação da Sexualidade Masculina* (2026).

## Navegação principal

1. **Sobre:** O projeto, equipe e instituições, contato
2. **O Programa:** Fundamentos e componentes, fluxograma interativo, sumário do manual
3. **Aprenda:** Aulas em percurso guiado ou livre, trilha de decisões, caso clínico longitudinal
4. **Ferramentas:** Calculadoras (IIEF-15 e QS-M) e Planejador de Cuidados
5. **Workshop:** Roteiro e atalhos para demonstração

O nome do programa no cabeçalho retorna ao **Início**; não existe um menu principal separado repetindo o conteúdo da home.

## Como editar autorias, fotografias e instituições

Edite **`v07-config.js`** no GitHub, sem alterar HTML ou CSS:

- `authors`: nome, titulação, papel, biografia e caminho da fotografia (exemplo: `assets/foto-autora.webp`). Sem fotografia, aparece um emoji simbólico.
- `institutions`: nome, logotipo, endereço web. Permite adicionar instituições futuras.
- `contactEmail`: contato acadêmico.
- `manualPdfUrl`: endereço HTTPS do PDF na nuvem. Enquanto vazio, o site apresenta uma área reservada.

Para acrescentar fotografias, envie arquivos aos caminhos definidos em `assets/`. A marca institucional identifica vínculos acadêmicos; **não implica endosso institucional** da plataforma em desenvolvimento.

## Arquivos novos da v0.7

- `assets/fluxograma-v07.svg`: organograma visual adaptado da Figura 3 do manual (p. 28), com caixas centrais, decisões e retornos
- `v07-config.js`: dados institucionais editáveis
- `v07-ui.js`: páginas Sobre, O Programa, sumário, fluxograma e nove aulas
- `v07-care.js`: avaliação estruturada, nove diagnósticos NANDA-I, seleção de indicadores NOC e atividades NIC, relatório com impressão
- `v07-calculadoras.js`: apresentação e contextualização do IIEF-15 e QS-M
- `v07-casos.js`: caso longitudinal fictício em quatro consultas
- `v07.css`: identidade visual, layout e estilos de impressão
- `v06-questions.js`: 25 perguntas e respectivas opções de resposta
- `v05.js` e `v05-data.js`: lógica e dados de base

## Recursos educativos

**Aulas:** o enfermeiro escolhe entre uma sequência de nove unidades e exploração livre. Cada unidade oferece conteúdos essenciais, referência às páginas do manual, uma questão reflexiva com feedback e acesso à seção relacionada. O conteúdo integral do manual **ainda não está transcrito** na plataforma.

**Fluxograma:** os hotspots posicionados sobre o organograma permitem navegar por Permissão, decisões Sim/Não, Informação Limitada, Sugestões Específicas, Terapia Intensiva e Revisão. Não é algoritmo clínico obrigatório.

**Planejador:** o Quadro 6 (pp. 45–58) embasa histórico clínico e sexual e nove diagnósticos de enfermagem. O profissional seleciona NANDA-I, indicadores NOC, atividades NIC, metas e acompanhamento, podendo imprimir ou salvar como PDF pelo navegador. **Os indicadores e atividades disponíveis são uma seleção didática do Quadro 6; não são a transcrição integral de todas as opções do manual.** Confirme os códigos e os direitos de reprodução nas edições oficiais das classificações.

**Calculadoras:** IIEF-15 e QS-M apresentam todas as perguntas e alternativas disponíveis nos anexos do manual. Os escores são calculados no navegador após as respostas; a interpretação deve respeitar as regras específicas dos instrumentos e as limitações de ausência de atividade sexual.

## Segurança e limitações

Esta plataforma ainda não foi validada como ferramenta clínica ou pedagógica digital. Os exemplos devem utilizar **dados fictícios**, sem informações identificáveis de pacientes. A hospedagem pública no GitHub Pages não é infraestrutura para prontuários ou armazenamento de informações de saúde. Avaliação, diagnósticos e intervenções exigem julgamento profissional e respeito à autonomia do homem.

A versão anterior à reorganização está preservada na branch `backup-before-v07-learning-and-care`.
