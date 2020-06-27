import * as React from 'react'

interface HiddenInputProps {
  name: string
  value: string
}

export const HiddenInput: React.FunctionComponent<HiddenInputProps> = (props) => (
  <input type='hidden' {...props} />
)
