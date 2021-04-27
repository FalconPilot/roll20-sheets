const banalize = str =>
  str.toLowerCase()
    .replace(/[éèëê]/g, 'e')
    .replace(/[ôöø]/g, 'o')
    .replace(/[îï]/g, 'i')
    .replace(/[àâä]/g, 'a')
    .replace(/[üùû]/g, 'u')

const sortByValue = ([_1, v1], [_2, v2]) => banalize(v1) > banalize(v2) ? 1 : -1

const sortByValueKey = (key) => ([_1, v1], [_2, v2]) => sortByValue([_1, v1[key]], [_2, v2[key]])

const skillsQuery = skills => `[[?{Compétence|Aucune, 0|${
  Object.entries(skills)
    .sort(sortByValueKey('name'))
    .map(([k, skill]) => `${skill.name}, @{skill_${k}_level}`)
    .join('|')
}}]]`

const rolltemplate = (templateName, formulas) => [
  `&{template:${templateName}}`,
  ...Object.entries(formulas).map(([k, v]) => `{{${k}=${v}}}`)
].join(' ')

module.exports = {
  tabs: {
    stats: 'Caractéristiques',
    skills: 'Compétences',
    specs: 'Spécialités',
    traits: 'Traits',
    inventory: 'Inventaire'
  },
  races: {
    drakkeidRed: 'Drakkéide rouge',
    drakkeidBlue: 'Drakkéide bleu',
    drakkeidGreen: 'Drakkéide vert',
    drakkeidBlack: 'Drakkéide noir',
    drakkeidWhite: 'Drakkéide blanc',
    human: 'Humain',
    harpy: 'Harpie',
    minotaur: 'Minotaure',
    jagarSmall: 'Jagar (Rertuk)',
    jagarMedium: 'Jagar (Rort)',
    jagarBig: 'Jagar (Qrikann)',
    maker: 'Façonneurs'
  },
  origins: {
    traveler: 'Sans-attache',
    loyalist: 'Loyaliste',
    steyrlyr: 'Steyrlyr',
    argaryn: 'Argaryn',
    akdland: 'Akland',
    ritija: 'Ritija',
    freemen: 'Homme-libre',
    jagar: 'Jagar'
  },
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
  statsDice: ['d4', 'd6', 'd8', 'd10', 'd12'],
  specsDice: ['d4', 'd8', 'd12'],
  reserveDice: ['d4', 'd6', 'd8', 'd10', 'd12', 'joker'],
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
      description: 'Résister au poison, à la douleur, à la peur...'
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
  },
  fn: {
    sortByValue,
    sortByValueKey,
    rolltemplate,
    skillsQuery
  }
}
