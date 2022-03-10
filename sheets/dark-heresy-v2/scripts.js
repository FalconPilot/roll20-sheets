// Events
const events = {
  sheetOpened: 'sheet:opened',
  buttonClicked: (btn) => `clicked:${btn}`,
  repeatingGroupButtonClicked: (group, btn) => `clicked:repeating_${group}:${btn}`,
  attributeChanged: (attr) => `change:${attr}`,
  repeatingGroupAttributeChanged: (group, attr = null) => `change:repeating_${group}${attr ? `:${attr}` : ''}`,
  removeRepeatingGroup: (group) => `remove:repeating_${group}`
}

const parseNum = (raw) => {
  const value = parseInt(raw, 10)
  return isNaN(value) ? 0 : value
}

const onEvents = (events, callback) => {
  events.forEach(evt => {
    on(evt, callback)
  })
}

const keygen = {
  initial: key => `${key}_initial`,
  advances: key => `${key}_advances`,
  known: key => `${key}_known`,
  bonus: key => `${key}_bonus_plus`,
  total: key => `${key}_total`,
  ads: key => `ads${key}`,
  free: key => `${key}_free`,
  tier: key => `${key}_tier`
}


const statKeys = Object.keys(constants.stats)
const skillKeys = Object.keys(constants.skills)
const aptKeys = Object.keys(constants.aptitudes).map(apt => `apt_${apt}`)

const statCalculationKeys = [
  ...statKeys.map(keygen.initial),
  ...statKeys.map(keygen.advances)
]

const setPercentage = key => values => {
  const current = parseNum(values[`${key}_current`])
  const max = parseNum(values[`${key}_max`])
  const percentage = max === 0 ? 0 : Math.ceil((current / max) * 10)

  setAttrs({
    [`${key}_percentage`]: Math.max(0, Math.min(10, percentage))
  })
}

const bars = ['wounds']

// Calculate bar percentages
bars.forEach(key => {
  const currentKey = `${key}_current`
  const maxKey = `${key}_max`
  onEvents([
    events.sheetOpened,
    events.attributeChanged(currentKey),
    events.attributeChanged(maxKey)
  ], () => {
    getAttrs([currentKey, maxKey], setPercentage(key))
  })
})

const getAptitudeIndex = (values, aptArray) => (
  2 - aptArray
    .filter(apt => values[`apt_${apt}_known`] === 'on')
    .length
)

// Calculate total stats
onEvents([
  events.sheetOpened,
  ...statCalculationKeys.map(events.attributeChanged)
], () => {
  getAttrs(statCalculationKeys, values => {
    setAttrs(statKeys.reduce((acc, stat) => ({
      ...acc,
      [`${stat}_total`]: (
        parseNum(values[keygen.initial(stat)])
          + parseNum(values[keygen.advances(stat)])
      )
    }), {}))
  })
})

// Calculate stat bonuses
onEvents([
  events.sheetOpened,
  ...statKeys.map(keygen.total).map(events.attributeChanged),
  ...statKeys.map(keygen.bonus).map(events.attributeChanged)
], () => {
  getAttrs([
    ...statKeys.map(keygen.total),
    ...statKeys.map(keygen.bonus)
  ], values => {
    const statBonuses = statKeys.reduce((acc, key) => {
      const rawBonus = Math.floor(parseNum(values[keygen.total(key)]) / 10)

      return {
        ...acc,
        [`${key}_bonus`]: rawBonus + parseNum(values[keygen.bonus(key)])
      }
    }, {})

    setAttrs(statBonuses)
  })
})

const adsGroups = Object.keys(constants.specialistSkills).map(keygen.ads)
const skillStatuses = Object.keys(constants.xpMatrix.skills)

const genStatusKeys = prefix => (
  skillStatuses.reduce((sub1, status) => [
    ...sub1,
    `${prefix}_${status}`,
    `${prefix}_${status}_free`
  ], [])
)

const genSkillKeys = (prefix, ids) => (
  ids.reduce((acc, id) => [
    ...acc,
    ...genStatusKeys(`${prefix}_${id}`)
  ], [])
)

const calcSkillMatrix = (key, skill, values) => (
  skillStatuses.reduce((total, status) => {
    const fullKey = `${key}_${status}`
    const isObtained = values[fullKey] === 'on'
    const isFree = values[keygen.free(fullKey)] === 'on'

    if (!isObtained || isFree) {
      return total
    }

    const aptIndex = getAptitudeIndex(values, skill.aptitudes)
    const cost = constants.xpMatrix.skills[status][aptIndex]
    return total + cost
  }, 0)
)

// Get skill groups
const getSkillGroups = (acc, group, tail) => {
  getSectionIDs(keygen.ads(group), groupIDs => {
    const skillGroupsIDs = {
      ...acc,
      [group]: groupIDs
    }
    
    if (tail.length > 0) {
      return getSkillGroups(skillGroupsIDs, tail[0], tail.slice(1))
    }
  
    // Compute XP from there
    getSectionIDs('repeating_miscadv', miscIDs => {
      const advKeys = miscIDs.map(id => `repeating_miscadv_${id}_cost`)

      getSectionIDs('repeating_traits', traitIDs => {
        const traitKeys = traitIDs.map(id => `repeating_traits_${id}`)
        getAttrs([
          'exp_gained',
          ...advKeys,
          ...statKeys.map(keygen.advances),
          ...aptKeys.map(keygen.known),
          ...Object.entries(skillGroupsIDs).reduce((acc, [group, ids]) => [
            ...acc,
            ...genSkillKeys(`repeating_${keygen.ads(group)}`, ids)
          ], []),
          ...skillKeys.reduce((acc, skill) => [
            ...acc,
            ...genStatusKeys(skill)
          ], [])
        ], values => {
          const baseXP = parseNum(values.exp_gained)
      
          // Stats XP cost
          const statXP = statKeys.reduce((total, key) => {
            const points = parseNum(values[keygen.advances(key)])
            const aptIndex = getAptitudeIndex(values, constants.stats[key].aptitudes)
    
            const cost = new Array(points > 25 ? 25 : points)
              .fill(null)
              .reduce((subTotal, _v, idx) => {
                const threshold = [5, 10, 15, 20, 25].find(t => t >= idx + 1)
                return subTotal + (constants.xpMatrix.stats[`+${threshold}`][aptIndex] / 5)
              }, 0)
      
            return total + cost
          }, 0)
  
          // Skills XP cost
          const skillsXP = skillKeys.reduce((total, key) => (
            total + calcSkillMatrix(key, constants.skills[key], values)
          ), 0)
  
          // Skillgroups XP cost
          const groupsXP = Object.entries(skillGroupsIDs).reduce((total, [key, ids]) => {
            const costs = ids.reduce((sub, id) => (
              sub + calcSkillMatrix(`repeating_${keygen.ads(key)}_${id}`, constants.specialistSkills[key], values)
            ), 0)
            return total + costs
          }, 0)

          // Traits XP cost
          const traitsXP = 0
  
          // Custom XP cost
          const customXP = advKeys.reduce((total, key) => total + parseNum(values[key]), 0)
      
          // Total spent XP
          const spentXP = statXP
            + customXP
            + skillsXP
            + groupsXP
            + traitsXP
      
          setAttrs({
            exp_spent: spentXP,
            exp_left: baseXP - spentXP
          })
        })
      })
      })
  })
}

// Trigger XP calculation
onEvents([
  events.sheetOpened,
  events.attributeChanged('exp_gained'),
  events.repeatingGroupAttributeChanged('miscadv', 'cost'),
  events.removeRepeatingGroup('miscadv'),
  events.repeatingGroupAttributeChanged('traits', 'tier'),
  events.repeatingGroupAttributeChanged('traits', 'free'),
  events.removeRepeatingGroup('traits'),
  ...statKeys.map(keygen.advances).map(events.attributeChanged),
  ...aptKeys.map(keygen.known).map(events.attributeChanged),
  ...skillKeys.reduce((acc, key) => [
    ...acc,
    ...skillStatuses.map(status => `${key}_${status}`).map(events.attributeChanged),
    ...skillStatuses.map(status => `${key}_${status}`).map(keygen.free).map(events.attributeChanged),
  ], []),
  ...adsGroups.map(events.removeRepeatingGroup),
  ...adsGroups.reduce((acc, group) => [
    ...acc,
    ...skillStatuses.map(status => events.repeatingGroupAttributeChanged(group, status)),
    ...skillStatuses.map(status => events.repeatingGroupAttributeChanged(group, keygen.free(status)))
  ], [])
], () => {
  getSkillGroups(
    {},
    Object.keys(constants.specialistSkills)[0],
    Object.keys(constants.specialistSkills).slice(1)
  )
})
