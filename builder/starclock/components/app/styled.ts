import styled, { StyledComponent } from '@emotion/styled'

import { StarClockTheme } from '$starclock/Theme'

export const AppWrapper: StyledComponent<{}, {}, {}> = styled.div`
  background-color: ${StarClockTheme.colors.dark};
`

export const Tab: StyledComponent<{}, {}, {}> = styled.div`
  color: ${StarClockTheme.colors.dark};
`
