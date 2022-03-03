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

onEvents([
  events.sheetOpened,
  ...statKeys.map(advances).map(events.attributeChanged),
  ...aptKeys.map(known).map(events.attributeChanged)
], () => {
  getAttrs([
    ...statKeys.map(advances),
    ...aptKeys.map(known)
  ], values => {
    setAttrs({
      xp_spent: 0
    })
  })
})
