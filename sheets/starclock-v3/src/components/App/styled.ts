import styled from 'styled-components'

import { Size } from '../../types/css'
import { size } from '../../utils/css'

// Constants
export const sheetWidth: Size<'px'> = [800, 'px']
export const sheetFontSize: Size<'px'> = [13, 'px']

export const Wrapper = styled.div`
  width: ${size(sheetWidth)};
  font-size: ${size(sheetFontSize)};
`
