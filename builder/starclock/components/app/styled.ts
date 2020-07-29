import styled, { StyledComponent } from '@emotion/styled'
import { css, SerializedStyles } from '@emotion/core'
import { PropsWithChildren } from 'react'

import { Theme } from '$starclock/Theme'
import { ActionButton, ActionButtonProps } from '$common/components/buttons'
import { FlexRow, FlexColumn } from '$common/styled'
import { TabControlInput } from '$starclock/styled/inputs'
import { tabs } from '$starclock/constants/tabs'
import { Tab } from '$starclock/types'
import { Console } from 'console'

export const AppWrapper: StyledComponent<{}, {}, {}> = styled.div`
  width: 800px;
  margin: auto;
`

export const TabSelector: StyledComponent<{}, {}, {}> = styled.div`
  ${FlexRow}
  width: 100%;
`

export const TabButton: StyledComponent<PropsWithChildren<ActionButtonProps>, {}, {}> = styled(ActionButton)`
  color: ${Theme.colors.white};
  background-color: ${Theme.colors.dark};
`

export const TabContainer: SerializedStyles = css`
  display: none;
`

export const TabControl = styled(TabControlInput)`
  ${tabs.map((tab: Tab): SerializedStyles => css`
    & ~ .sheet-css-${TabContainer.name}[value="${tab.name}"] {
      ${FlexColumn}
    }
  `)}
`
