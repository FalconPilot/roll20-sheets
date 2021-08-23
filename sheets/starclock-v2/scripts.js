// Events
const events = {
  sheetOpened: 'sheet:opened',
  buttonClicked: (btn) => `clicked:${btn}`,
  repeatingGroupButtonClicked: (group, btn) => `clicked:repeating_${group}:${btn}`,
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

onEvents([events.buttonClicked('roll-skill')], info => {
  const key = info.htmlAttributes.value
  const prefix = ['a', 'e', 'i', 'o', 'u', 'y']
    .includes(info.htmlAttributes['data-name'][0].toLowerCase())
      ? 'd\''
      : 'de '
  const name = `Test ${prefix}${info.htmlAttributes['data-name']}`
  getAttrs([key, 'character_name'], values => {
    console.log(values)
    startRoll(`&{template:general} {{name=${name}}} {{character=${values.character_name}}} {{roll=[[[[{${values[key] || 1} + ?{Bonus/Malus|0},1}kh1]]D6]]}}`, data => {
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

onEvents([events.buttonClicked('repeating_weapons:test')], infos => {
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
      console.log(skillKey)
      console.log(v2)
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
      const wounds = `${values.repeating_weapons_wwounds} blessure${woundsSuffix} ${woundsType}${woundsSuffix}`

      startRoll(`&{template:attack} {{name=${name}}} {{character=${values.character_name}}} {{roll=[[[[{${v2[skillKey] || 1} + ?{Bonus/Malus|0},1}kh1]]D6]]}} {{hits=${hits}}} {{wounds=${wounds}}}`, data => {
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
    [`${prefix}_wdescription`]: weapon.description
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
