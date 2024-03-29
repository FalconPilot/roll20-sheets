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
  races: {
    regular: {
      human: 'Humain',
      doppleganger: 'Doppleganger',
      alkor: 'Alkor',
      endaari: 'Endaari'
    },
    mutants: {
      drone: 'Drone',
      troll: 'Troll',
      changeling: 'Changelin'
    }
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
  },
  calibers: {
    pistol_light: {
      name: 'Pistolet léger',
      diameter: '9mm',
      woundsType: 'leg',
      wounds: 1,
      penetration: 1
    },
    pistol_heavy: {
      name: 'Pistolet lourd',
      diameter: '10mm',
      woundsType: 'leg',
      wounds: 2,
      penetration: 0
    },
    rifle_light: {
      name: 'Fusil léger',
      diameter: '5x50mm',
      woundsType: 'mod',
      wounds: 1,
      penetration: 2
    },
    rifle_heavy: {
      name: 'Fusil lourd',
      diameter: '7x60mm',
      woundsType: 'mod',
      wounds: 2,
      penetration: 1
    },
    antimaterial: {
      name: 'Antimatériel',
      diameter: '12.7mm',
      woundsType: 'gra',
      wounds: 5,
      penetration: 3
    },
    shell: {
      name: 'Cartouches',
      diameter: '12G',
      woundsType: 'leg',
      wounds: 3,
      penetration: 0
    },
    special: {
      name: 'Spécifique'
    }
  },
  weapons: {
    rifle: {
      daix: {
        name: 'Dai-X',
        image: 'daix',
        description: 'Fusil d\'assaut standard de DaiCom, le DAI-X est encore utilisé aujourd\'hui en raison de sa simplicité de fabrication.',
        caliber: 'rifle_light',
        hits: 4
      },
      acp9: {
        name: 'ACP-9',
        image: 'acp9',
        description: 'L\'ACP-9 est un pistolet-mitrailleur léger, facile d\'utilisation et doté d\'une cadence de tir très rapide. Il est un favori des agents de sécurité de la Confédération.',
        caliber: 'pistol_light',
        hits: 6
      },
      scorpion: {
        name: 'M8 Scorpion',
        image: 'scorpion',
        description: 'Développé à l\'origine pour transpercer le blindage de véhicules de reconnaissance, le M8 Scorpion tire des obus de 12.7mm d\'une puissance de feu incomparable et démesurée.',
        caliber: 'antimaterial',
        hits: 1
      },
      kampfer: {
        name: 'Kämpfer GRU-12',
        image: 'kampfer',
        description: 'Ce fusil de calibre 12 lourd et rustique a fait ses preuves parmi les forces de l\'ordre confédérées. Sa conception date de la création de la Confédération, ce qui la rend extrêmement commune au sein des armureries.',
        caliber: 'shell',
        hits: 1
      },
      celica2100: {
        name: 'Celica 2100',
        image: 'celica2100',
        description: 'Ce fusil icônique conçu pour sortir en l\'an 2100 est vite devenu un incontournable pour beaucoup de tireurs. Précis, robuste et venant avec une lunette moyenne-distance intégrée, il n\'y a que sa fiabilité que certains remettent parfois en doute...',
        caliber: 'rifle_heavy',
        hits: 2
      },
      mayaf1: {
        name: 'Maya F1',
        image: 'mayaf1',
        description: 'Ce fusil issu de croisements technologiques entre la Confédération et une coopérative d\'ingénieurs Endaaris possède des performances incroyables... au prix d\'une fiabilité désastreuse.',
        caliber: 'rifle_light',
        hits: 6
      }
    },
    pistol: {
      dmpc: {
        name: 'DMP-Compact',
        image: 'dmpc',
        description: 'Peu onéreux et léger, le DMP-Compact est une arme de choix pour toute personne au budget raisonnable cherchant un moyen de se protéger.',
        caliber: 'pistol_light',
        hits: 3
      },
      dmp10: {
        name: 'DMP-10 Magnum',
        image: 'dmp10',
        description: 'Cette variante du DMP-Compact chambrée en 10mm Magnum est l\'une des plus iconiques des films d\'action. Imposant, puissant et létal, il n\'est pas à mettre entre toutes les mains.',
        caliber: 'pistol_heavy',
        hits: 2,
        penetration: 1
      },
      m30: {
        name: 'Revolver M-30',
        image: 'm30',
        description: 'Ce revolver de conception robuste est utilisé par beaucoup de compagnies de sécurité en raison de son très faible coût de production. On le retrouve sans grande surprise aussi énormément entre les mains de gangsters...',
        caliber: 'pistol_heavy',
        hits: 1
      }
    },
    onehanded: {
      tonfa: {
        name: 'Matraque téléscopique',
        image: 'baton',
        description: 'Une matraque de sécurité tout ce qu\'il y a de plus dissuasive. Lestée et maniable.',
        woundsType: 'inc',
        wounds: 1,
        hits: 2,
        penetration: 0
      },
      knife: {
        name: 'Couteau',
        image: 'knife',
        description: 'Une des armes les plus anciennes que la civilisation n\'ait jamais conçue. Il en existe des petits, des moyens, des grands...',
        woundsType: 'leg',
        wounds: 1,
        hits: 3,
        penetration: 1
      }
    },
    melee: {
      adeptgauntlet: {
        name: 'Gantelet d\'adepte',
        image: 'adeptgauntlet',
        description: 'Un gantelet Alkor fait pour ceux ayant le rang d\'Adepte au sein d\'un temple. Une lame en Cristalite se trouve en son sein.',
        woundsType: 'leg',
        wouds: 1,
        hits: 3,
        penetration: 3
      }
    }
  }
}
