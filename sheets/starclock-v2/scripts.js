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

const calcNumber = n => {
  const v = parseInt(n, 10)
  return typeof v === 'number' && !isNaN(v) ? v : 0
}

onEvents([events.buttonClicked('roll_skill')], info => {
  const key = info.htmlAttributes.value
  const prefix = ['a', 'e', 'i', 'o', 'u', 'y']
    .includes(info.htmlAttributes['data-name'][0].toLowerCase())
      ? 'd\''
      : 'de '
  const name = `Test ${prefix}${info.htmlAttributes['data-name']}`
  getAttrs([key, 'character_name'], values => {
    startRoll(`&{template:general} {{name=${name}}} {{character=${values.character_name}}} {{roll=[[[[${values[key]}]]D6]]}}`, data => {
      finishRoll(data.rollId, {
        roll: data.results.roll.dice
          .sort()
          .reduce((acc, dice) => {
            const x = acc.slice()
            x[dice - 1].push(['A', 'B', 'C', 'D', 'E', 'F'][dice - 1])
            return x
          }, [[], [], [], [], [], []])
          .filter(arr => arr.length > 0)
          .map(arr => arr.join(''))
          .join(' ')
      })
    })
  })
})
