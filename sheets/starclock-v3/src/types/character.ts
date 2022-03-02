export enum CharacterStats {
  Strength = 'str',
  Agility = 'agi',
  Acuity = 'acu',
  Hability = 'hab',
  Charisma = 'cha',
  Empathy = 'emp',
  Intelligence = 'int',
  Willpower = 'wil',
}

export interface CharacterSkillGroup {
  name: string
  mainStat: CharacterStats
  offStat: CharacterStats
}
