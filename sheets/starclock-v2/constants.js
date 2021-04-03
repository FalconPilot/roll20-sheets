module.exports = {
  stats: {
    phy: 'physique',
    agi: 'agilité',
    acu: 'acuité',
    hab: 'habilité',
    cha: 'charisme',
    emp: 'empathie',
    int: 'intelligence',
    wil: 'volonté'
  },
  skillGroups: {
    acrobatics: {
      name: 'Acrobaties',
      mainStat: 'agi',
      offStat: 'acu',
      skills: {
        stealth: 'Dissimulation',
        dodge: 'Esquive',
        throw: 'Lancer',
        pirouettes: 'Pirouettes'
      }
    },
    craft: {
      name: 'Artisanat',
      mainStat: 'hab',
      offStat: 'int',
      skills: {
        botanist: 'Botanique',
        cooking: 'Cuisine',
        woodwork: 'Menuiserie',
        metalwork: 'Métallurgie',
        tailor: 'Textile',
      }
    },
    arts: {
      name: 'Arts',
      special: true,
      offStat: 'emp',
      skills: {
        cha: {
          sing: 'Chant',
          play: 'Comédie'
        },
        agi: {
          dance: 'Danse'
        },
        int: {
          literature: 'Littérature'
        },
        hab: {
          drawn: 'Dessin',
          music: 'Musique',
          sculpture: 'Sculpture'
        }
      }
    },
    athletics: {
      name: 'Athlétisme',
      mainStat: 'phy',
      offStat: 'agi',
      skills: {
        run: 'Course',
        climb: 'Escalade',
        swim: 'Natation',
        jump: 'Saut'
      }
    },
    comprehension: {
      name: 'Compréhension',
      mainStat: 'emp',
      offStat: 'wil',
      skills: {
        teaching: 'Pédagogie',
        insight: 'Perspicacité',
        psychology: 'Psychologie'
      }
    },
    fighting: {
      name: 'Corps-à-corps',
      mainStat: 'phy',
      offStat: 'hab',
      skills: {
        twohanded: 'Armes à deux mains',
        onehanded: 'Armes à une main',
        shields: 'Boucliers',
        melee: 'Mêlée'
      }
    },
    dialog: {
      name: 'Dialogue',
      mainStat: 'cha',
      offStat: 'emp',
      skills: {
        charm: 'Charme',
        intimidate: 'Intimidation',
        negociate: 'Négociation'
      }
    },
    mechatronics: {
      name: 'Mécatronique',
      mainStat: 'hab',
      offStat: 'int',
      skills: {
        planes: 'Aéronefs',
        weapons: 'Armement personnel',
        bigweapons: 'Armement embarqué',
        explosives: 'Explosifs',
        informatics: 'Informatique',
        machinery: 'Machinerie industrielle',
        boats: 'Navires',
        prosthesis: 'Prothèses',
        robotics: 'Robotique',
        ships: 'Vaisseaux',
        vehicles: 'Véhicules terrestres'
      }
    },
    perception: {
      name: 'Perception',
      mainStat: 'acu',
      offStat: 'wil',
      skills: {
        search: 'Fouille',
        look: 'Scruter',
        awareness: 'Vigilance'
      }
    },
    pilot: {
      name: 'Pilotage',
      mainStat: 'acu',
      offStat: 'int',
      skills: {
        planes: 'Aéronefs',
        boats: 'Navires',
        ships: 'Vaisseaux',
        wheeled: 'Véhicules à roues',
        antigrav: 'Véhicules antigrav'
      }
    },
    roguery: {
      name: 'Roublardise',
      mainStat: 'hab',
      offStat: 'acu',
      skills: {
        magic: 'Escamotage',
        pickpocket: 'Pickpocket',
        security: 'Sécurité'
      }
    },
    science: {
      name: 'Sciences',
      special: true,
      offStat: 'int',
      skills: {
        hab: {
          chemistry: 'Chimie',
          medic: 'Médecine'
        },
        wil: {
          research: 'Recherche'
        }
      }
    },
    sixthsense: {
      name: 'Sixième sens',
      special: true,
      offStat: 'wil',
      skills: {
        int: { chronomancy: 'Chronomancie' },
        emp: { mentalism: 'Mentalisme' },
        hab: { telekinesis: 'Télékinésie' },
        acu: { thermokinesis: 'Thermokinésie' }
      }
    },
    shooting: {
      name: 'Tir',
      mainStat: 'acu',
      offStat: 'hab',
      skills: {
        crossbows: 'Arbalètes',
        bows: 'Arcs',
        handguns: 'Armes de poing',
        longguns: 'Armes longues',
        heavyguns: 'Armes lourdes',
        artillery: 'Artillerie'
      }
    }
  }
}  
