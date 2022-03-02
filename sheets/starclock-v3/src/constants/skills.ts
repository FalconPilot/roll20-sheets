import { CharacterSkillGroup, CharacterStats } from '../types/character'

export const skillGroups = {
  foo: {
    name: 'foobar',
    mainStat: CharacterStats.Acuity,
    offStat: CharacterStats.Strength
  }
} as const
