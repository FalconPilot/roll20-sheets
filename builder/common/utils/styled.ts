import { css, SerializedStyles as BaseSerializedStyles } from '@emotion/core'
import styled, { StyledComponent as BaseStyledComponent } from '@emotion/styled'

export interface SerializedStyles extends BaseSerializedStyles {
  name: string
}
