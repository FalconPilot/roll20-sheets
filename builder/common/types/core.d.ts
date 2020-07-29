export interface Roll20BaseElement {
  name: string
  displayName: string
}

export type Roll20FieldEventType
  = 'remove'
  | 'change'
  | ''

export type EventCallbackFunction = () => void

export interface Roll20FieldEvent<Scope> {
  scope: Scope
  trigger: Roll20FieldEventType
}

export interface Roll20ClickedEvent<Scope> {
  scope: Scope
  trigger: 'clicked'
}

export interface Roll20SheetOpenedEvent {
  scope: 'opened'
  trigger: 'sheet'
}

export type Roll20Event<Scope>
  = Roll20FieldEvent<Scope>
  | Roll20SheetOpenedEvent
