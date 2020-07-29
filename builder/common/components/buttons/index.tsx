import * as React from 'react'

interface Roll20ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  type: string
} 

class Roll20Button extends React.Component<Roll20ButtonProps> {
  render () {
    return <button>{this.props.children}</button>
  }
}

export interface ActionButtonProps {
  name: string
}

export const ActionButton: React.FunctionComponent<ActionButtonProps> = (props) => (
  <Roll20Button type='action' name={`act_${props.name}`}>{props.children}</Roll20Button>
)
