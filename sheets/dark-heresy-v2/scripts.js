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

const initial = key => `${key}_initial`
const advances = key => `${key}_advances`
const known = key => `${key}_known`

const statKeys = Object.keys(constants.stats)
const aptKeys = Object.keys(constants.aptitudes).map(apt => `apt_${apt}`)

const statCalculationKeys = [
  ...statKeys.map(initial),
  ...statKeys.map(advances)
]

const setPercentage = key => values => {
  const current = parseNum(values[`${key}_current`])
  const max = parseNum(values[`${key}_max`])

  setAttrs({
    [`${key}_percentage`]: max === 0 ? 0 : Math.ceil((current / max) * 10)
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
  aptArray
    .filter(apt => !!values[`apt_${apt}_known`])
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
        parseNum(values[initial(stat)])
          + parseNum(values[advances(stat)])
      )
    }), {}))
  })
})

// Calculate EXP
onEvents([
  events.sheetOpened,
  events.attributeChanged('exp_gained'),
  ...statKeys.map(advances).map(events.attributeChanged),
  ...aptKeys.map(known).map(events.attributeChanged)
], () => {
  getAttrs([
    'exp_gained',
    ...statKeys.map(advances),
    ...aptKeys.map(known)
  ], values => {
    const baseXP = parseNum(values.exp_gained)

    const statXP = statKeys.reduce((total, key) => {
      const points = parseNum(values[advances(key)])
      const aptIndex = getAptitudeIndex(values, constants.stats[key].aptitudes)

      const cost = new Array(points > 25 ? 25 : points)
        .fill(null)
        .reduce((subTotal, _v, idx) => {
          const threshold = [5, 10, 15, 20, 25].find(t => t <= idx + 1)
          return subTotal + (constants.xpMatrix.stats[`+${threshold}`][aptIndex] / 5)
        }, 0)

      return total + cost
    }, 0)

    console.log(statXP)

    const spentXP = 0

    setAttrs({
      exp_spent: spentXP,
      exp_total: baseXP - spentXP
    })
  })
})
