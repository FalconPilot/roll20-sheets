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
        ...properties.map(property => `${section}_${id}_${property}`)
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
  getRepeatingSectionAttrs('repeating_armors', ['armor_protection'], (values) => {
    setAttrs({
      protection_total: Object.values(values).reduce((total, v) => {
        const n = parseInt(v, 10)
        return isNaN(n) ? total : total + n
      }, 0)
    })
  })
})

const phyAttributes = constants.statsDice.map(dice => `phy_${dice}`)

onEvents([
  events.sheetOpened,
  phyAttributes.map(events.attributeChanged),
  events.attributeChanged('skill_endurance_level')
], () => {
  getAttrs(phyAttributes.concat(['skill_endurance_level']), values => {
    console.log(values)
  })
})