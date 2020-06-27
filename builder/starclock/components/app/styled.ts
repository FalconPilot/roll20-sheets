import styled, { StyledComponent } from '@emotion/styled'

import { StarClockTheme } from '$starclock/Theme'

export const AppWrapper: StyledComponent<{}, {}, {}> = styled.div`
  width: 800px;
  margin: auto;
`

export const Tab: StyledComponent<{}, {}, {}> = styled.div`
  color: ${StarClockTheme.colors.dark};
`
