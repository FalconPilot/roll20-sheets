const __utilsFn = {
  /* Roll functions */
  rolltemplate: (templateName, formulas) => [
    `&{template:${templateName}}`,
    ...Object.entries(formulas).map(([k, v]) => `{{${k}=${v}}}`)
  ].join(' '),
  skillsQuery: (skills) => `[[?{Compétence|Aucune, 0|${
    Object.entries(skills)
      .sort(__utilsFn.sortByValueKey('name'))
      .map(([k, skill]) => `${skill.name}, @{skill_${k}_level}`)
      .join('|')
  }}]]`,
  /* Sort functions */
  sortByValue: ([_1, v1], [_2, v2]) => __utilsFn.banalize(v1) > __utilsFn.banalize(v2) ? 1 : -1,
  sortByValueKey: (key) => ([_1, v1], [_2, v2]) => __utilsFn.sortByValue([_1, v1[key]], [_2, v2[key]]),
  /* Generic utils */
  banalize: str =>
    str.toLowerCase()
      .replace(/[éèëê]/g, 'e')
      .replace(/[ôöø]/g, 'o')
      .replace(/[îï]/g, 'i')
      .replace(/[àâä]/g, 'a')
      .replace(/[üùû]/g, 'u')
}

module.exports = {
  fn: __utilsFn,
  tabs: {
    character: 'Caractéristiques',
    skills: 'Compétences',
    specs: 'Spécialités',
    paths: 'Voies',
    inventory: 'Inventaire'
  },
  statsDice: ['d4', 'd6', 'd8', 'd10', 'd12'],
  specsDice: ['d4', 'd8', 'd12'],
  reserveDice: ['d4', 'd6', 'd8', 'd10', 'd12', 'joker'],
  stats: {
    phy: {
      name: 'Physique',
      description: 'Force, constitution et forme physique'
    },
    agi: {
      name: 'Agilité',
      description: 'Capacité à se mouvoir, réflexes instinctifs'
    },
    adr: {
      name: 'Adresse',
      description: 'Habilité manuelle, rapidité et précision des doigts'
    },
    con: {
      name: 'Contrôle',
      description: 'Capacité à maîtriser ses émotions et ses 5 sens'
    },
    int: {
      name: 'Intelligence',
      description: 'Facultés de déduction, de réflexion et d\'assimilation'
    },
    cha: {
      name: 'Charisme',
      description: 'Magnétisme animal, capacités sociales'
    }
  },
  races: {
    dragon: {
      name: 'Hommes-dragons',
      options: {
        red: 'Dragon rouge',
        green: 'Dragon vert',
        blue: 'Dragon bleu',
        black: 'Dragon noir',
        white: 'Dragon blanc'
      }
    },
    human: {
      name: 'Humains',
      options: {
        red: 'Géant',
        green: 'Océanide',
        blue: 'Céruléen',
        black: 'Banshee',
        white: 'Oni'
      }
    },
    chimera: {
      name: 'Chimères',
      options: {
        red: 'Rakshasa',
        green: 'Satyre',
        blue: 'Harpie',
        black: 'Plantoïde',
        white: 'Renarcureuil (TBD)'
      }
    }
  },
  skills: {
    athletics: {
      name: 'Athlétisme',
      description: 'Courir, nager, escalader...'
    },
    authority: {
      name: 'Autorité',
      description: 'Intimider, commander, forcer son opinion, maîtriser un animal...'
    },
    craft: {
      name: 'Artisanat',
      description: 'Fabriquer, bricoler...'
    },
    education: {
      name: 'Érudition',
      description: 'Étudier, connaître, identifier...'
    },
    endurance: {
      name: 'Endurance',
      description: 'Résister au poison, à la douleur, à la peur, à l\'alcool...'
    },
    gathering: {
      name: 'Récolte',
      description: 'Ramasser des plantes, couper du bois, miner...'
    },
    healing: {
      name: 'Soins',
      description: 'Appliquer les premiers soins, recoudre des plaies, pratiquer la chirurgie...'
    },
    insight: {
      name: 'Lucidité',
      description: 'Reconnaître un mensonge, comprendre l\'état d\'esprit de quelqu\'un...'
    },
    magic: {
      name: 'Magie',
      description: 'Détecter, contrôler, comprendre, manipuler la magie...'
    },
    melee: {
      name: 'Corps-à-corps',
      description: 'Combattre à mains nues, à la lance, à la hache, au marteau...'
    },
    mount: {
      name: 'Monte',
      description: 'Maîtriser sa monture, charger à dos de monture, rester à dos de monture...'
    },
    perception: {
      name: 'Perception',
      description: 'Déceler des éléments dissimulés, scruter l\'horizon, monter la garde...'
    },
    shooting: {
      name: 'Tir',
      description: 'Tirer à l\'arc, à l\'arbalète, à la fronde...'
    },
    speech: {
      name: 'Éloquence',
      description: 'Convaincre, négocier, charmer, apaiser un animal...'
    },
    stealth: {
      name: 'Discrétion',
      description: 'Se cacher, se mouvoir silencieusement, dissimuler un objet...'
    },
    voltige: {
      name: 'Voltige',
      description: 'Sauter, faire une roulade, faire des sauts périlleux, esquiver...'
    }
  }
}
