import type { Category, DetailContent, DiaryTypeId } from "./types";

export const medicalNotice =
  "Essas informações não substituem avaliação médica. Procure sempre a UBS para confirmação e acompanhamento.";

export const categories: Category[] = [
  { id: "corrimento", title: "Corrimento Vaginal", icon: "water-outline" },
  { id: "colica", title: "Cólica", icon: "stomach" },
  { id: "atraso", title: "Atraso Menstrual", icon: "calendar-alert" },
  { id: "sangramento", title: "Sangramento Fora do Período", icon: "water-plus-outline" },
  { id: "urinar", title: "Dor ou Ardor ao Urinar", icon: "toilet" },
  { id: "ciclo", title: "Conheça seu Ciclo Menstrual", icon: "calendar-heart" },
  { id: "tpm", title: "TPM e Alterações Emocionais", icon: "emoticon-outline" },
  { id: "colo", title: "Prevenção - Câncer de Colo do Útero", icon: "shield-cross-outline" },
  { id: "mama", title: "Prevenção - Câncer de Mama", icon: "ribbon" },
  { id: "violencia", title: "Violência Contra a Mulher", icon: "hand-heart-outline" },
  { id: "climaterio", title: "Climatério e Menopausa", icon: "weather-sunset" },
  { id: "autocuidado", title: "Autocuidado e Hábitos Saudáveis", icon: "heart-pulse" }
];

export const details: Record<Category["id"], DetailContent> = {
  corrimento: {
    ...categories[0],
    sections: [
      {
        title: "O que é normal",
        items: [
          "Muco transparente ou claro, sem odor, sem coceira",
          "No periodo fertil: muco elastico, semelhante a clara de ovo"
        ]
      },
      {
        title: "Quando procurar a UBS",
        items: [
          "Corrimento branco grumoso com coceira intensa",
          "Amarelado ou esverdeado com aspecto bolhoso e odor forte",
          "Acinzentado com odor fetido que piora apos relacao sexual",
          "Corrimento com dor pelvica, ardor ao urinar ou sangramento apos relacao"
        ]
      },
      {
        title: "O que fazer em casa",
        items: [
          "Higiene intima com agua e sabao neutro, sem duchas internas",
          "Evitar roupas apertadas e calcinhas sinteticas",
          "Dormir sem calcinha para ventilacao",
          "Evitar protetor diario continuo"
        ]
      }
    ],
    specialAlert: "Gestantes com qualquer alteração devem buscar avaliação mesmo que leve."
  },
  colica: {
    ...categories[1],
    banner: true,
    sections: [
      {
        title: "O que e",
        items: [
          "Dor na parte baixa da barriga, abaixo do umbigo, comum em mulheres, especialmente adolescentes apos a primeira menstruacao"
        ]
      },
      {
        title: "Quando procurar a UBS",
        items: ["Febre", "Dor muito forte", "Sangramento intenso", "Suspeita ou confirmacao de gravidez", "Manchas arroxeadas na pele"]
      },
      {
        title: "O que fazer em casa",
        items: ["Compressas de agua morna na regiao inferior do abdomen", "Praticar atividade fisica", "Manter hidratacao e alimentacao saudavel"]
      }
    ]
  },
  atraso: {
    ...categories[2],
    banner: true,
    sections: [
      {
        title: "Quando procurar a UBS",
        items: ["Atraso de 15 dias ou mais", "Teste de gravidez positivo"]
      },
      {
        title: "O que fazer em casa",
        items: ["Fazer teste de gravidez se o atraso for maior que 15 dias", "Anotar os ciclos para observar um padrao", "Evitar automedicacao"]
      }
    ]
  },
  sangramento: {
    ...categories[3],
    banner: true,
    sections: [
      {
        title: "Perguntas orientadoras",
        items: [
          "Ha quantos dias e em quais dias o sangramento ocorreu?",
          "Existe relacao com algum medicamento ou inicio de metodo contraceptivo?",
          "Ha outros sintomas associados, como colicas?"
        ]
      },
      {
        title: "O que fazer em casa",
        items: [
          "Observe o volume e a frequencia do sangramento",
          "Anotar relacao com medicamentos ou inicio de metodos contraceptivos",
          "Evitar relacoes sexuais ate avaliacao se o sangramento for repetido"
        ]
      }
    ],
    specialAlert: "Procure sempre a UBS para avaliacao e exame fisico se tiver qualquer sangramento fora do periodo menstrual."
  },
  urinar: {
    ...categories[4],
    banner: true,
    sections: [
      {
        title: "Perguntas orientadoras",
        items: [
          "Sente urgencia em urinar?",
          "O ardor ocorre uma unica vez, apos relacao ou de forma repetida?",
          "Ha aumento da frequencia urinaria?",
          "Sente dor na regiao inferior do abdomen ou nas costas?",
          "Teve febre?"
        ]
      },
      {
        title: "Quando procurar a UBS",
        items: ["Sente ardor persistente ou vontade frequente de urinar", "Sangue na urina", "Febre, dor lombar ou calafrios"]
      }
    ]
  },
  ciclo: {
    ...categories[5],
    sections: [
      {
        title: "Informacao educativa",
        items: [
          "O ciclo menstrual pode variar entre 21 e 36 dias",
          "O sangramento pode durar de 3 a 7 dias",
          "Pequenas variacoes sao normais, especialmente em adolescentes, pos-parto e proximo a menopausa"
        ]
      },
      {
        title: "O que fazer em casa",
        items: [
          "Anotar o ciclo: dia, duracao, intensidade e sintomas",
          "Compressas mornas para aliviar colicas",
          "Manter hidratacao, evitar excesso de cafe e sal durante o periodo",
          "Praticar habitos de relaxamento, como alongamento e meditacao"
        ]
      }
    ]
  },
  tpm: {
    ...categories[6],
    sections: [
      {
        title: "Explicacao",
        items: [
          "Antes da menstruacao ocorre queda do estrogenio, que pode influenciar serotonina e dopamina",
          "Pode causar irritacao, tristeza, sensibilidade ou mudancas de humor",
          "Nem todas as mulheres sentem os mesmos sintomas",
          "Estresse, alimentacao, sono e situacoes pessoais tambem influenciam"
        ]
      },
      {
        title: "O que fazer em casa",
        items: [
          "Pequenas refeicoes equilibradas e exercicios leves",
          "Reduzir alcool e cafeina",
          "Reservar momentos de descanso e lazer",
          "Buscar apoio psicologico se sentir sobrecarga emocional"
        ]
      }
    ]
  },
  colo: {
    ...categories[7],
    banner: true,
    sections: [
      {
        title: "Informacao educativa",
        items: [
          "Exame Papanicolau ajuda a identificar alteracoes antes que virem cancer",
          "Indicado para mulheres entre 25 e 64 anos que ja iniciaram atividade sexual, independentemente da orientacao sexual, inclusive mulheres que fazem sexo com mulheres e homens trans"
        ]
      },
      {
        title: "Quando procurar a UBS",
        items: [
          "Nunca fez o Papanicolau",
          "Esta ha mais de 1 ano sem realizar o exame",
          "Sangramento fora do periodo ou apos relacao sexual",
          "Corrimento persistente com odor forte",
          "Dor pelvica frequente sem causa conhecida"
        ]
      },
      {
        title: "O que fazer em casa",
        items: [
          "Manter exames preventivos em dia",
          "Usar preservativo nas relacoes sexuais",
          "Tomar vacina contra HPV quando indicada",
          "Evitar tabagismo",
          "Manter estilo de vida saudavel"
        ]
      }
    ]
  },
  mama: {
    ...categories[8],
    banner: true,
    sections: [
      {
        title: "Quando procurar a UBS",
        items: [
          "Caroco ou nodulo na mama ou na axila",
          "Secrecao pelo mamilo",
          "Retracao da pele ou do mamilo",
          "Pele com aspecto de casca de laranja",
          "Vermelhidao, inchaco ou mudanca no formato da mama",
          "Nunca realizou mamografia, a partir dos 40 anos",
          "Historico familiar de cancer de mama",
          "Dor em uma ou ambas as mamas"
        ]
      },
      {
        title: "O que fazer em casa",
        items: [
          "Autoexame mensal das mamas",
          "Agendar mamografia conforme orientacao da UBS",
          "Evitar tabagismo, excesso de alcool e sedentarismo",
          "Alimentacao saudavel com frutas, verduras e fibras",
          "Atividade fisica regular"
        ]
      }
    ]
  },
  violencia: {
    ...categories[9],
    sections: [
      {
        title: "O que e",
        items: ["Qualquer atitude que provoque morte, dor ou sofrimento fisico, sexual ou emocional, em espacos publicos ou privados"]
      },
      {
        title: "Quando procurar ajuda",
        items: ["Sentir medo, vergonha, culpa ou ameacas", "Agressoes fisicas, sexuais ou controle da rotina", "Precisar de apoio para sair de uma relacao abusiva"]
      },
      {
        title: "O que fazer",
        items: [
          "Buscar atendimento na UBS, CRAS, CREAS ou Delegacia da Mulher",
          "Ligar para o 180, Central de Atendimento a Mulher, gratuito e sigiloso",
          "Pedir ajuda a alguem de confianca e nao se isolar"
        ]
      }
    ]
  },
  climaterio: {
    ...categories[10],
    banner: true,
    sections: [
      {
        title: "O que e",
        items: [
          "Climaterio: transicao da fase reprodutiva para a nao reprodutiva, geralmente entre 40 e 65 anos",
          "Menopausa: parada definitiva da menstruacao, confirmada apos 12 meses sem menstruar, geralmente entre 48 e 50 anos"
        ]
      },
      {
        title: "Sintomas comuns",
        items: [
          "Fogachos e suores noturnos",
          "Alteracoes do sono e irritabilidade",
          "Ansiedade e oscilacoes de humor",
          "Irregularidade menstrual na transicao",
          "Diminuicao da libido e ressecamento vaginal",
          "Dor na relacao sexual e urgencia urinaria",
          "Infeccoes urinarias recorrentes",
          "Ganho de peso e diminuicao da massa ossea, como osteoporose"
        ]
      },
      {
        title: "Quando procurar a UBS",
        items: [
          "Aos primeiros sinais e sintomas",
          "Sintomas intensos que afetam sono ou qualidade de vida",
          "Sangramento apos 1 ano sem menstruar",
          "Dor durante relacoes sexuais"
        ]
      },
      {
        title: "O que fazer em casa",
        items: [
          "Fogachos: dormir em ambiente ventilado, usar roupas em camadas, beber agua ao perceber os sintomas, evitar fumo, alcool e cafeina",
          "Sono: manter horarios regulares, evitar cafeina a noite, praticar atividade fisica sem ser perto do horario de dormir",
          "Geral: alimentacao saudavel, atividade fisica regular, considerar uso de lubrificantes vaginais, buscar orientacao sobre terapia hormonal se necessario"
        ]
      }
    ]
  },
  autocuidado: {
    ...categories[11],
    sections: [
      {
        title: "O que fazer em casa",
        items: [
          "Rotina de sono regular e alimentacao equilibrada",
          "Atividade fisica pelo menos 3 vezes por semana",
          "Autoexame das mamas e exames preventivos em dia",
          "Reservar momentos de lazer e relaxamento",
          "Evitar uso abusivo de alcool, cigarro e automedicacao"
        ]
      },
      {
        title: "Quando procurar a UBS",
        items: ["Para acompanhamento regular, vacinacao, planejamento familiar ou suporte emocional"]
      }
    ]
  }
};

export const diaryTypes: Array<{ id: DiaryTypeId; label: string; icon: string }> = [
  { id: "menstruacao", label: "Menstruacao", icon: "water" },
  { id: "corrimento", label: "Corrimento", icon: "water-outline" },
  { id: "colica", label: "Colica", icon: "stomach" },
  { id: "humor", label: "Humor", icon: "emoticon-outline" },
  { id: "climaterio", label: "Sintoma de climaterio", icon: "weather-sunset" },
  { id: "consulta", label: "Consulta realizada", icon: "hospital-box-outline" }
];

export const lifeStages = [
  "Adolescencia",
  "Fase adulta",
  "Tentando engravidar",
  "Gestacao e pos-parto",
  "Climaterio e menopausa",
  "Idosa"
];

export const violentometer = [
  "Piadas ofensivas",
  "Chantagens",
  "Mentiras e manipulacao",
  "Ignorar ou fazer silencio punitivo",
  "Ciume excessivo",
  "Culpabilizar",
  "Desqualificar",
  "Ridicularizar ou humilhar",
  "Ofender verbalmente",
  "Intimidar ou ameacar",
  "Controlar amizades, roupa, dinheiro ou rotina",
  "Proibir escolhas e isolar",
  "Destruir objetos pessoais",
  "Empurrar, sacudir ou apertar",
  "Agredir fisicamente",
  "Forcar relacao sexual",
  "Ameacar com armas ou objetos",
  "Ameacar de morte ou tentar matar"
];
