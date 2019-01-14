var starClock = starClock || {};
starClock.data = {

  /*
  **  Inventory
  */

  inventory: {

    /* Guns */
    guns: {

      /* BAR-51 */
      bar51: {
        caliber: "7.62x51mm",
        damage_bonus: 0,
        rolls: [
          {
            name: "Single",
            count: 1
          },
          {
            name: "Semi",
            count: 3
          },
          {
            name: "Full",
            count: 6
          }
        ],
        failure: 2,
        picture_url: "http://image.noelshack.com/fichiers/2016/38/1474628722-bar-51.png",
        company: "voz_technika"
      },

      /* Brak-39 */
      brak39: {
        caliber: "7.62x39mm",
        damage_bonus: 0,
        rolls: [
          {
            name: "Single",
            count: 1
          },
          {
            name: "Semi",
            count: 3
          },
          {
            name: "Full",
            count: 6
          }
        ],
        failure: 3,
        picture_url: "http://image.noelshack.com/fichiers/2016/38/1474630195-brak-39.png",
        company: "voz_technika"
      }
    },

    /* Ammo */
    ammo: {
      "7.62x51mm": {
        dice_count: 3,
        dice_faces: 4,
        damage_bonus: 2,
        perforation: 4
      },
      "7.62x39mm": {
        dice_count: 2,
        dice_faces: 6,
        damage_bonus: 2,
        perforation: 3
      }
    }
  },

  /*
  **  Resources
  */

  resources: {

    /* Logos */
    logos: {
      voz_technika: "http://image.noelshack.com/fichiers/2016/38/1474744257-voz-technika.png"
    }
  }
};

log("--- StarClock compendium loaded ! ---");
