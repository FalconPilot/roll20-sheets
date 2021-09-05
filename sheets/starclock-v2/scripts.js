// Events
const events = {
  sheetOpened: 'sheet:opened',
  buttonClicked: (btn) => `clicked:${btn}`,
  repeatingGroupButtonClicked: (group, btn) => `clicked:repeating_${group}:${btn}`,
  attributeChanged: (attr) => `change:${attr}`,
  repeatingGroupAttributeChanged: (group, attr = null) => `change:repeating_${group}${attr ? `:${attr}` : ''}`,
  removeRepeatingGroup: (group) => `remove:repeating_${group}`
}

// Rolltemplates
const rolltemplate = (template, records) => [
  `&{template:${template}}`
].concat(Object.entries(records).map(([key, value]) => `{{${key}=${value}}}`)).join(' ')

const skillKeys = Object.values(constants.skillGroups)
  .flatMap(group => group.special
    ? Object.values(group.skills).flatMap(subGroup => Object.keys(subGroup))
    : Object.keys(group.skills)
  )

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

const processRoll = dice =>
  dice
    .sort()
    .reduce((acc, dice) => {
      const x = acc.slice()
      x[dice - 1].push(['A', 'B', 'C', 'D', 'E', 'F'][dice - 1])
      return x
    }, [[], [], [], [], [], []])
    .filter(arr => arr.length > 0)
    .map(arr => arr.join(''))
    .join(' ')

onEvents([events.buttonClicked('roll-skill')], info => {
  const key = info.htmlAttributes.value
  const prefix = ['a', 'e', 'i', 'o', 'u', 'y']
    .includes(info.htmlAttributes['data-name'][0].toLowerCase())
      ? 'd\''
      : 'de '
  const name = `Test ${prefix}${info.htmlAttributes['data-name']}`
  getAttrs([key, 'character_name'], values => {
    startRoll(rolltemplate('general', {
      name,
      character: values.character_name,
      roll: `[[[[{${values[key] || 1} + ?{Bonus/Malus|0},1}kh1]]D6]]`
    }), data => {
      finishRoll(data.rollId, {
        roll: processRoll(data.results.roll.dice)
      })
    })
  })
})

onEvents([events.buttonClicked('roll-general')], info => {
  getAttrs(['character_name'], values => {
    startRoll(rolltemplate('general', {
      name: 'Jet de dés',
      character: values.character_name,
      roll: `[[[[{?{Nombre de dés|1},1}kh1]]D6]]`
    }), data => {
      finishRoll(data.rollId, {
        roll: processRoll(data.results.roll.dice)
      })
    })
  })
})

const getSkillForWtype = wtype => {
  switch (wtype) {
    case 'rifle': return 'longguns'
    case 'pistol': return 'handguns'
    case 'onehanded': return 'onehanded'
    case 'twohanded': return 'twohanded'
    case 'shield': return 'shields'
    case 'melee': return 'melee'
    default: return null
  }
}

onEvents([events.buttonClicked('repeating_weapons:attackroll')], () => {
  getAttrs([
    'character_name',
    'repeating_weapons_wname',
    'repeating_weapons_wtype',
    'repeating_weapons_whits',
    'repeating_weapons_wwounds',
    'repeating_weapons_wwounds_type'
  ], values => {
    const skill = getSkillForWtype(values.repeating_weapons_wtype)
    if (!skill) {
      console.error(`Could not find skill for "${values.repeating_weapons_wtype}"`)
      return
    }
    const skillKey = `skl_${skill}_total`
    getAttrs([skillKey], v2 => {
      const name = `Attaque : ${values.repeating_weapons_wname}`
      const woundsType = {
        inc: 'incapacitante',
        leg: 'légère',
        mod: 'modérée',
        gra: 'grave'
      }[values.repeating_weapons_wwounds_type] || 'inconnues'

      const hitsSuffix = parseInt(values.repeating_weapons_whits, 10) > 1 ? 's' : ''
      const woundsSuffix = parseInt(values.repeating_weapons_wwounds, 10) > 1 ? 's' : ''
      const hits = `${values.repeating_weapons_whits} coup${hitsSuffix}`
      const wounds = `blessure${woundsSuffix} ${woundsType}${woundsSuffix}`

      startRoll(rolltemplate('attack', {
        name,
        character: values.character_name,
        roll: `[[[[{${v2[skillKey] || 1} + ?{Bonus/Malus|0},1}kh1]]D6]]`,
        hits,
        wounds,
        woundsAmount: values.repeating_weapons_wwounds,
        woundKey: values.repeating_weapons_wwounds_type
      }), data => {
        finishRoll(data.rollId, {
          roll: processRoll(data.results.roll.dice)
        })
      })
    })
  })
})

onEvents([
  events.repeatingGroupAttributeChanged('weapons', 'archetype')
], infos => {
  if (infos.newValue === 'custom') {
    return
  }

  const wgroup = Object.entries(constants.weapons)
    .find(([_wk, weapons]) => weapons[infos.newValue])

  if (!wgroup) {
    return
  }

  const [groupKey, weapon] = [wgroup[0], wgroup[1][infos.newValue]]
  const sectionId = infos.sourceAttribute.split('_')[2]
  const prefix = `repeating_weapons_${sectionId}`

  const standardParams = {
    [`${prefix}_wname`]: weapon.name,
    [`${prefix}_whits`]: weapon.hits,
    [`${prefix}_wtype`]: groupKey,
    [`${prefix}_wdescription`]: weapon.description,
    [`${prefix}_wimage`]: weapon.image || 'none'
  }

  if (['onehanded', 'twohanded', 'shield', 'melee'].includes(groupKey)) {
    setAttrs({
      ...standardParams,
      [`${prefix}_wwounds`]: weapon.wounds,
      [`${prefix}_wpenetration`]: weapon.penetration,
      [`${prefix}_wwounds_type`]: weapon.woundsType
    })
    return
  }

  const caliber = constants.calibers[weapon.caliber]

  if (weapon.caliber && !caliber) {
    console.error(`Caliber "${weapon.caliber}" not found in constants !`)
    return
  }

  setAttrs({
    ...standardParams,
    [`${prefix}_wwounds`]: weapon.wounds || caliber.wounds || 0,
    [`${prefix}_wpenetration`]: weapon.penetration || caliber.penetration || 0,
    [`${prefix}_wwounds_type`]: weapon.woundsType || caliber.woundsType,
    [`${prefix}_wcaliber`]: weapon.caliber
  })
})

onEvents([events.buttonClicked('repeating_weapons:resetwimg')], infos => {
  const sectionId = infos.sourceAttribute.split('_')[2]
  setAttrs({
    [`repeating_weapons_${sectionId}_wimage`]: 'none'
  })
})

const skillKnownSections = skillKeys.map(sk => `skl_${sk}_known`)
const skillMasteredSections = skillKeys.map(sk => `skl_${sk}_mastered`)

const calcLinear = (values, multiplier = 1) => (total, section) =>
  total + parseNumberValue(values[section]) * multiplier

onEvents([
  events.sheetOpened,
  events.attributeChanged('xp_total'),
  events.repeatingGroupAttributeChanged('traits', 'txp'),
  events.repeatingGroupAttributeChanged('traits', 'times_taken'),
  events.removeRepeatingGroup('traits'),
  events.repeatingGroupAttributeChanged('knowledge', 'klevel'),
  events.removeRepeatingGroup('knowledge'),
  ...skillKnownSections.map(events.attributeChanged),
  ...skillMasteredSections.map(events.attributeChanged),
], () => {
  getSectionIDs('repeating_traits', tids => {
    const traitSections = tids.map(id => [
      `repeating_traits_${id}_txp`,
      `repeating_traits_${id}_times_taken`
    ])
    getSectionIDs('repeating_knowledge', kids => {
      const knowledgeSections = kids.map(id => `repeating_knowledge_${id}_klevel`)
      getAttrs([
        'xp_total',
        ...traitSections.flat(),
        ...skillKnownSections,
        ...skillMasteredSections,
        ...knowledgeSections
      ], values => {
        const traitsXP = traitSections.reduce((total, [xpsec, ttsec]) => (
          calcLinear(values, values[xpsec])(total, ttsec)
        ), 0)
        const skillKnownXP = skillKnownSections.reduce(calcLinear(values, 5), 0)
        const skillMasteredXP = skillMasteredSections.reduce(calcLinear(values, 10), 0)
        const knowledgeXP = knowledgeSections.reduce(calcLinear(values, 5), 0)
  
        const totalXP = parseNumberValue(values.xp_total)
        const xpLeft = totalXP - traitsXP - skillKnownXP - skillMasteredXP - knowledgeXP
        setAttrs({
          xp_left: xpLeft,
          xp_warning: xpLeft < 0
        })
      })
    })
  })
})
