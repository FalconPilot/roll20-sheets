module.exports = {
  tabs: {
    character: 'Character',
    perks: 'Perks',
    advancements: 'Advancements',
    gear: 'Gear',
    psy: 'Psychic',
    options: 'y'
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
  skills: {
    acrobatics: {
      name: 'Acrobatics',
      stats: ['agi', 'str'],
      aptitudes: ['agi', 'gen']
    },
    athletics: {
      name: 'Athletics',
      stats: ['str', 'tou'],
      aptitudes: ['str', 'gen']
    },
    awareness: {
      name: 'Awareness',
      stats: ['per', 'fel', 'int'],
      aptitudes: ['per', 'fld']
    },
    charm: {
      name: 'Charm',
      stats: ['fel', 'inf'],
      aptitudes: ['fel', 'soc']
    },
    command: {
      name: 'Command',
      stats: ['fel', 'int', 'str', 'wp'],
      aptitudes: ['fel', 'lead']
    },
    commerce: {
      name: 'Commerce',
      stats: ['int', 'fel'],
      aptitudes: ['int', 'kno']
    },
    deceive: {
      name: 'Deceive',
      stats: ['fel', 'int'],
      aptitudes: ['fel', 'soc']
    },
    dodge: {
      name: 'Dodge',
      stats: ['agi'],
      aptitudes: ['agi', 'def']
    },
    inquiry: {
      name: 'Inquiry',
      stats: ['fel', 'int', 'per'],
      aptitudes: ['fel', 'soc']
    },
    interrogation: {
      name: 'Interrogation',
      stats: ['wp', 'fel'],
      aptitudes: ['wp', 'soc']
    },
    intimidate: {
      name: 'Intimidate',
      stats: ['str', 'wp'],
      aptitudes: ['str', 'soc']
    },
    logic: {
      name: 'Logic',
      stats: ['int'],
      aptitudes: ['int', 'kno']
    },
    medicae: {
      name: 'Medicae',
      stats: ['int', 'ag', 'per'],
      aptitudes: ['int', 'fld']
    },
    parry: {
      name: 'Parry',
      stats: ['ws'],
      aptitudes: ['ws', 'def']
    },
    psyniscience: {
      name: 'Psyniscience',
      stats: ['per'],
      aptitudes: ['per', 'psy']
    },
    scrutiny: {
      name: 'Scrutiny',
      stats: ['per', 'fel'],
      aptitudes: ['per', 'gen']
    },
    security: {
      name: 'Security',
      stats: ['int', 'agi'],
      aptitudes: ['int', 'tech']
    },
    sleight: {
      name: 'Sleight of Hand',
      stats: ['agi'],
      aptitudes: ['agi', 'kno']
    },
    stealth: {
      name: 'Stealth',
      stats: ['agi'],
      aptitudes: ['agi', 'fld']
    },
    survival: {
      name: 'Survival',
      stats: ['per', 'agi', 'int'],
      aptitudes: ['per', 'fld']
    },
    techuse: {
      name: 'Tech-Use',
      stats: ['int', 'ag'],
      aptitudes: ['int', 'tech']
    }
  },
  specialistSkills: {
    commonlore: {
      name: 'Common Lore',
      stats: ['int', 'fel'],
      aptitudes: ['int', 'kno']
    },
    forbiddenlore: {
      name: 'Forbidden Lore',
      stats: ['int', 'fel'],
      aptitudes: ['int', 'kno']
    },
    linguistics: {
      name: 'Linguistics',
      stats: ['int', 'fel'],
      aptitudes: ['int', 'gen']
    },
    navigate: {
      name: 'Navigate',
      stats: ['int', 'per'],
      aptitudes: ['int', 'fld']
    },
    operate: {
      name: 'Operate',
      stats: ['agi', 'int'],
      aptitudes: ['agi', 'fld']
    },
    scholasticlore: {
      name: 'Scholastic Lore',
      stats: ['int', 'fel'],
      aptitudes: ['int', 'kno']
    },
    trade: {
      name: 'Trade',
      stats: ['int', 'agi'],
      aptitudes: ['int', 'gen']
    }
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
  },
  damages: {
    e: 'Energy',
    i: 'Impact',
    r: 'Rending',
    x: 'Explosive'
  },
  gear: {
    ranged: {
      classes: {
        pistol: 'Pistol',
        basic: 'Basic',
        heavy: 'Heavy',
        thrown: 'Thrown',
        vehicle: 'Vehicle'
      }
    },
    armor: {
      locations: {
        h: 'Head',
        b: 'Body',
        la: 'L. arm',
        ra: 'R. arm',
        ll: 'L. leg',
        rl: 'R. leg'
      }
    }
  },
  rolltemplate: (template, values) => `&{template:${template}} ${Object.entries(values).map(([k, v]) => (
    `{{${k}=${v}}}`
  )).join(' ')}`
}
