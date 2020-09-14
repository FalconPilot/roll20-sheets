import styled from '@emotion/styled'
import { css, SerializedStyles } from '@emotion/core'

import { Theme } from '$starclock/Theme'
import { ActionButton, ActionButtonProps } from '$common/components/buttons'
import { FlexRow, FlexColumn } from '$common/styled'
import { TabControlInput } from '$starclock/styled/inputs'
import { tabs } from '$starclock/constants/tabs'
import { Tab } from '$starclock/types'

export const AppWrapper = styled.div`
  width: 800px;
  margin: auto;
`

export const TabSelector = styled.div`
  ${FlexRow}
  width: 100%;
`

export const TabButton = styled(ActionButton)`
  color: ${Theme.colors.white};
  background-color: ${Theme.colors.dark};
`

export const TabContainer: SerializedStyles = css`
  display: none;
`

export const TabControl = styled(TabControlInput)`
  ${tabs.map((tab: Tab) => css`
    & ~ .sheet-css-${TabContainer.name}[value="${tab.name}"] {
      ${FlexColumn}
    }
  `)}
`
