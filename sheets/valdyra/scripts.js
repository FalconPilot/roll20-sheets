// Events
const events = {
  sheetOpened: 'sheet:opened',
  buttonClicked: (btn) => `clicked:${btn}`,
  attributeChanged: (attr) => `change:${attr}`,
  repeatingGroupAttributeChanged: (group, attr = null) => `change:repeating_${group}${attr ? `:${attr}` : ''}`,
  removeRepeatingGroup: (group) => `remove:repeating_${group}`
}

const onEvents = (events, callback) => {
  events.forEach(evt => {
    on(evt, callback)
  })
}

const getRepeatingSectionAttrs = (section, properties, callback) => {
  getSectionIDs(section, ids => {
    getAttrs(
      ids.reduce((acc, id) => [
        ...acc,
        ...properties.map(property => `repeating_${section}_${id}_${property}`)
      ], []),
      callback
    )
  })
}

// Set total protection value
onEvents([
  events.sheetOpened,
  events.repeatingGroupAttributeChanged('armors', 'armor_protection'),
  events.removeRepeatingGroup('armors')
], () => {
  getRepeatingSectionAttrs('armors', ['armor_protection'], (values) => {
    setAttrs({
      protection_total: Object.values(values).reduce((total, v) => {
        const n = parseInt(v, 10)
        return isNaN(n) ? total : total + n
      }, 0)
    })
  })
})

const statParamCalculator = (maxProp, minimum, total, rpHead, rpTail) => {
  if (rpTail.length === 0) {
    setAttrs({
      [maxProp]: total < minimum ? minimum : total
    })
    return
  }

  getRepeatingSectionAttrs(rpHead[0], rpHead[1], values => {
    const newTotal = Object.values(values).reduce((acc, rawValue) => {
      const value = parseInt(rawValue, 10)
      return isNaN(value) ? acc : acc + value
    }, total)

    statParamCalculator(maxProp, minimum, newTotal, rpTail[0], rpTail.slice(1))
  })
}

const calculateStatParam = (
  maxProp,
  stat,
  properties,
  repeatingProperties = []
) => (basis, multiplier, minimum) => {
  const statProps = constants.statsDice.map(dice => `${stat}_${dice}`)
  onEvents([
    events.sheetOpened,
    ...properties.map(events.attributeChanged),
    ...statProps.map(events.attributeChanged),
    ...repeatingProperties.reduce((acc, [k, props]) => ([
      ...acc,
      ...props.map(prop => events.repeatingGroupAttributeChanged(k, prop))
    ]), []),
    ...repeatingProperties.map(([k]) => events.removeRepeatingGroup(k))
  ], () => {
    getAttrs(statProps.concat(properties), values => {
      const highestDice = statProps.reduce((max, key) => {
        if (values[key] !== 'on') {
          return max
        }

        const regex = new RegExp(`^${stat}_d`)
        const val = parseInt(key.replace(regex, ''), 10)
        return !isNaN(val) && val > max ? val : max
      }, 0)

      const stats = properties.reduce((total, prop) => {
        const v = parseInt(values[prop], 10)
        return isNaN(v) ? total : total + v
      }, 0)
  
      const total = basis + stats + Math.floor(highestDice * multiplier)

      statParamCalculator(
        maxProp,
        minimum,
        total,
        repeatingProperties[0],
        repeatingProperties.slice(1)
      )
    })
  })
}

calculateStatParam('health_max', 'phy', ['skill_endurance_level'])(10, 0.5)
calculateStatParam('magic_max', 'con', ['skill_magic_level'])(0, 0.5)
Object.entries(constants.defenses).forEach(([key, defense]) => {
  const properties = [`skill_${defense.skill}_level`]
  calculateStatParam(key, defense.stat, properties, [
    ['armors', [key]]
  ])(-1, 0.5, 1)
})