import * as React from 'react'

import { Roll20InputProps } from '$common/types/core'

export const TextInput: React.FunctionComponent<Roll20InputProps> = ({ name, ...props }) => (
  <input type='text' name={`attr_${name}`} {...props} />
)
