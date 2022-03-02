import { CharacterStats } from '../types/character'

export const characterStatNames = {
  [CharacterStats.Strength]: 'physique',
  [CharacterStats.Agility]: 'agilité',
  [CharacterStats.Acuity]: 'acuité',
  [CharacterStats.Hability]: 'habilité',
  [CharacterStats.Charisma]: 'charisme',
  [CharacterStats.Empathy]: 'empathie',
  [CharacterStats.Intelligence]: 'intelligence',
  [CharacterStats.Willpower]: 'volonté',
} as const
