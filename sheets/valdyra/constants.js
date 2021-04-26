module.exports = {
  tabs: {
    stats: 'Caractéristiques',
    skills: 'Compétences',
    specs: 'Spécialités',
    traits: 'Traits',
    inventory: 'Inventaire'
  },
  races: {
    drakkeid: 'Drakkéide',
    human: 'Humain',
    harpy: 'Harpie',
    minotaur: 'Minotaure',
    jagar: 'Jagar',
    maker: 'Façonneurs'
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
    athletics: 'Athlétisme',
    authority: 'Autorité',
    craft: 'Artisanat',
    education: 'Érudition',
    endurance: 'Endurance',
    gathering: 'Récolte',
    healing: 'Soins',
    insight: 'Lucidité',
    melee: 'Corps-à-corps',
    mount: 'Monte',
    perception: 'Perception',
    shooting: 'Tir',
    speech: 'Éloquence',
    stealth: 'Discrétion',
    voltige: 'Voltige'
  },
  fn: {
    sortByValue: ([_1, v1], [_2, v2]) => v1 > v2 ? 1 : -1
  }
}
