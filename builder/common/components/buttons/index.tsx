import * as React from 'react'

interface ActionButtonProps {
  name: string
}

interface Roll20ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  type: string
} 

class Roll20Button extends React.Component<Roll20ButtonProps> {
  render () {
    return <button>{this.props.children}</button>
  }
}

export const ActionButton: React.FunctionComponent<ActionButtonProps> = (props) => (
  <Roll20Button type='action' name={props.name}>{props.children}</Roll20Button>
)
