import { css } from 'styled-components'

import { hexColor } from '../utils/css'

export const theme = {
  colors: {
    white: hexColor(['F', 'F', 'F']),
    screenBackground: hexColor(['3', '3', '3'])
  }
} as const

export const screen = css`
  font-family: 'Monaco', monospace;
  font-size: 13px;
  color: ${theme.colors.white};
  background-color: ${theme.colors.screenBackground};
`

