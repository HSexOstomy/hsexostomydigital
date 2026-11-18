/* H_Sex_Ostomy Digital · CONFIGURAÇÕES EDITÁVEIS
   Altere aqui nomes, titulações, fotos, instituições, contato e os links do workshop.
   Para editar no GitHub: abra este arquivo, clique no lápis, altere entre as aspas e salve (Commit changes).
   Fotos: envie para a pasta assets/img/ e informe o caminho, ex.: "assets/img/foto-ariana.webp". */

window.HSO_CONFIG = {
  autores: [
    {
      papel: "Autoria do manual",
      nome: "Ariana Luiza Rabelo",
      titulacao: "Enfermeira. Doutoranda em Enfermagem e Saúde (PPGENF/UFBA)",
      foto: "",
      bio: "Autora do H_Sex_Ostomy: Programa de Reabilitação da Sexualidade Masculina, desenvolvido no doutorado."
    },
    {
      papel: "Orientação e coordenação",
      nome: "Anderson Reis de Sousa",
      titulacao: "Prof. Dr., Escola de Enfermagem da UFBA",
      foto: "",
      bio: "Orientador da pesquisa e coordenador do programa."
    },
    {
      papel: "Coorientação",
      nome: "Óscar Javier Vergara Escobar",
      titulacao: "Enfermeiro, Universidad El Bosque (Bogotá, Colômbia)",
      foto: "",
      bio: "Coorientador da pesquisa. Pesquisador em enfermagem e saúde de homens."
    }
  ],

  instituicoes: [
    { nome: "Universidade Federal da Bahia", logo: "assets/img/logo-ufba.webp", url: "https://www.ufba.br/" },
    { nome: "Programa de Pós-Graduação em Enfermagem e Saúde, Escola de Enfermagem da UFBA", logo: "assets/img/logo-ppgenf.webp", url: "https://enfermagem.ufba.br/" },
    { nome: "Universidad El Bosque, Bogotá, Colômbia", logo: "", url: "https://www.unbosque.edu.co/" }
  ],

  /* Apoio e financiamento (aparecem no rodapé e na página Equipe) */
  apoio: [
    { nome: "CAPES: Coordenação de Aperfeiçoamento de Pessoal de Nível Superior", logo: "assets/img/logo-capes.webp", url: "https://www.gov.br/capes/" },
    { nome: "CNPq: Conselho Nacional de Desenvolvimento Científico e Tecnológico", logo: "assets/img/logo-cnpq.webp", url: "https://www.gov.br/cnpq/" },
    { nome: "NECTA: Núcleo de Estudos de Cuidado e Tecnologia da Saúde do Adulto, EEUFBA", logo: "assets/img/logo-necta.webp", url: "" }
  ],

  contato: {
    email: "arianaluiza-cajuru@hotmail.com"
  },

  /* Link público do PDF do manual (Google Drive, OneDrive etc.). Deixe vazio enquanto não houver. */
  manualPdf: "",

  workshop: {
    data: "2026-11-23",
    horario: "19:00",
    duracaoMin: 180,
    modalidade: "On-line, pelo Google Meet",
    /* Links usados no modo facilitador. Deixe vazio o que ainda não existir. */
    linkMeet: "",
    linkPreTeste: "",
    linkPosTeste: "",
    /* Endereço público do site, usado no QR code do modo participante. */
    enderecoSite: "https://hsexostomy.github.io/hsexostomydigital/"
  },

  versao: "0.8 · plataforma educacional em desenvolvimento"
};
