import * as React from 'react'

import { tabs } from '$starclock/constants/tabs'
import { Tab } from '$starclock/types'

import {
  AppWrapper,
  TabControl,
  TabSelector,
  TabButton,
  TabContainer
} from './styled'

export const App: React.FunctionComponent<{}> = () => (
  <AppWrapper>
    <TabControl />
    <TabSelector>
      {tabs.map((tab: Tab) => (
        <TabButton name={tab.name}>{tab.displayName}</TabButton>
      ))}
    </TabSelector>
    {tabs.map((tab: Tab) => (
      <div className={TabContainer.name}>
        {tab.displayName}
      </div>
    ))}
  </AppWrapper>
)
