module.exports = {
  tabs: {
    character: 'Character',
    advancements: 'Advancements',
    gear: 'Gear',
    vehicles: 'Vehicles',
    ship: 'Ship',
    psy: 'Psykana',
    npcs: 'NPCs',
  },
  stats: {
    ws: {
      name: 'Weapon Skill',
      diminutive: 'WS',
      aptitudes: ['ws', 'off']
    },
    bs: {
      name: 'Ballistic Skill',
      diminutive: 'BS',
      aptitudes: ['bs', 'fin']
    },
    str: {
      name: 'Strength',
      diminutive: 'S',
      aptitudes: ['str', 'off']
    },
    tou: {
      name: 'Toughness',
      diminutive: 'T',
      aptitudes: ['tou', 'def']
    },
    agi: {
      name: 'Agility',
      diminutive: 'Ag',
      aptitudes: ['agi', 'fin']
    },
    int: {
      name: 'Intelligence',
      diminutive: 'Int',
      aptitudes: ['int', 'kno']
    },
    per: {
      name: 'Perception',
      diminutive: 'Per',
      aptitudes: ['per', 'fld']
    },
    wp: {
      name: 'Willpower',
      diminutive: 'WP',
      aptitudes: ['wp', 'psy']
    },
    fel: {
      name: 'Fellowship',
      diminutive: 'Fel',
      aptitudes: ['fel', 'soc']
    },
    inf: {
      name: 'Influence',
      diminutive: 'Inf',
      aptitudes: ['inf', 'soc']
    }
  },
  aptitudes: {
    gen: 'General',
    ws: 'Weapon Skill',
    bs: 'Ballistic Skill',
    str: 'Strength',
    tou: 'Toughness',
    agi: 'Agility',
    int: 'Intelligence',
    per: 'Perception',
    wp: 'Willpower',
    fel: 'Fellowship',
    inf: 'Influence',
    off: 'Offence',
    def: 'Defence',
    fin: 'Finesse',
    psy: 'Psyker',
    tech: 'Tech',
    kno: 'Knowledge',
    soc: 'Social',
    lead: 'Leadership',
    fld: 'Fieldcraft'
  },
  xpMatrix: {
    stats: {
      '+5': [100, 250, 500],
      '+10': [250, 500, 750],
      '+15': [500, 750, 1000],
      '+20': [750, 1000, 1500],
      '+25': [1250, 1500, 2500]
    },
    skills: {
      known: [100, 200, 300],
      trained: [200, 400, 600],
      experienced: [300, 600, 900],
      veteran: [400, 800, 1200]
    },
    talents: {
      t1: [200, 300, 600],
      t2: [300, 450, 900],
      t3: [400, 600, 1200]
    }
  }
}