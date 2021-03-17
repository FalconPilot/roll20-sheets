// Events
const events = {
  sheetOpened: 'sheet:opened',
  buttonClicked: (btn) => `clicked:${btn}`,
  attributeChanged: (attr) => `change:${attr}`,
  repeatingGroupAttributeChanged: (group, attr = null) => `change:repeating_${group}${attr ? `:${attr}` : ''}`,
  removeRepeatingGroup: (group) => `remove:repeating_${group}`
}

// Stats
const stats = {
  PHY: 'phy',
  AGI: 'agi',
  ACU: 'acu',
  HAB: 'hab',
  CHA: 'cha',
  EMP: 'emp',
  INT: 'int',
  WIL: 'wil'
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

const getValues = (reqTuples) => (callback) => {
  getAttrs(reqTuples.map(t => t[0]), (values) => {
    const obj = reqTuples.reduce((acc, t) => ({
      ...acc,
      ...t[1](values)
    }), {})
    callback(obj)
  })
}

const getStats = [Object.values(stats), (values) => (
  getParamsFromKeys(stats, values, parseNumberValue)
)]
