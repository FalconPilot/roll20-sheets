// Events
const events = {
  sheetOpened: 'sheet:opened',
  buttonClicked: (btn) => `clicked:${btn}`,
  attributeChanged: (attr) => `change:${attr}`,
  repeatingGroupAttributeChanged: (group, attr = null) => `change:repeating_${group}${attr ? `:${attr}` : ''}`,
  removeRepeatingGroup: (group) => `remove:repeating_${group}`
}

const parseNumberValue = (raw) => {
  const value = parseInt(raw, 10)
  return isNaN(value) ? 0 : value
}

const onEvents = (events, callback) => {
  events.forEach(evt => {
    on(evt, callback)
  })
}

const getParamsFromKeys = (keys, values, parseFunc = (v) => v) => (
  Object.entries(values).reduce((acc, [k, v]) => (
    keys.includes(k)
      ? { ...acc, [k]: parseFunc(v) }
      : acc
  ), {})
)

const getValues = (reqTuples, callback) => {
  getAttrs(reqTuples.map(t => t[0]), (values) => {
    const obj = reqTuples.reduce((acc, t) => ({
      ...acc,
      ...t[1](values)
    }), {})
    callback(obj)
  })
}

const getStats = [Object.keys(constants.stats), (values) => (
  getParamsFromKeys(Object.keys(constants.stats), values, parseNumberValue)
)]

const calculateGroupDice = (mainStat, known) => mainStat + (known ? 1 : 0)

const calculateSkillDice = (mainStat, offStat, known, groupKnown) => (
  mainStat + (groupKnown ? 1 : 0) + (known ? offStat : 0)
)

Object.keys(constants.stats).forEach(stat => {
  const groupKeys = gk => [
    `grp_${gk}_known`,
    `grp_${gk}_bonus`
  ]

  const skillKeys = sk => [
    `skl_${sk}_known`,
    `skl_${sk}_bonus`
  ]

  const related = Object.entries(constants.skillGroups).reduce((acc, [gk, group]) => {
    let keys = []
    let skills = []

    if (group.offStat === stat || group.mainStat === stat) {
      skills = group.special ? Object.keys(Object.values(group.skills)): Object.keys(group.skills)
      keys.push(groupKeys(gk), ...skills.map(skillKeys))
    } else if (group.special) {
      skills = Object.entries(group.skills).reduce((list, [skillStat, relatedSkills]) => (
        skillStat === stat
          ? list.concat(Object.keys(relatedSkills))
          : list
      ), [])
      keys.push(...skills.map(skillKeys))
    }

    if (keys.length > 0) {
      onEvents([
        events.sheetOpened,
        ...keys.reduce((acc, arr) => acc.concat(arr), []).map(events.attributeChanged)
      ], () => {
        console.log(skills)
      })
    }

    return acc.concat(...keys)
  }, [])

  onEvents([
    events.sheetOpened,
    events.attributeChanged(stat)
  ], () => {
    console.log('STAT CHANGED !')
  })

  console.log(stat, related)
})
