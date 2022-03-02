import * as React from 'react'

import { NavigationHeader } from '../NavigationHeader'
import { Wrapper } from './styled'

export const App: React.FunctionComponent = () => {
  return (
    <Wrapper>
      <NavigationHeader />
    </Wrapper>
  )
}
