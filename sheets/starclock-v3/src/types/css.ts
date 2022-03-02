export type SizeUnit
  = 'px'
  | 'em'
  | '%'

export type Size<U extends SizeUnit> = [number, U]

export type HexChar = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F'

export type HexTuple = [HexChar, HexChar]

export type HexValue = HexChar | HexTuple

export type HexColor<Hex extends HexChar | HexTuple>
  = [Hex, Hex, Hex]
  | [Hex, Hex, Hex, Hex]
