import { HexColor, HexValue, Size, SizeUnit } from '../types/css'

export const size = <U extends SizeUnit>(size: Size<U>): string =>
  `${size.join('')}`

export const addSizes = <U extends SizeUnit>(s1: Size<U>, s2: Size<U>): Size<U> =>
  [s1[0] + s2[0], s1[1]]

export const hexColor = <Hex extends HexValue>(color: HexColor<Hex>): string =>
  `#${color.map(x => Array.isArray(x) ? x.join('') : x).join('')}`
