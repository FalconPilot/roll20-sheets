import { Roll20Event } from '$common/types/core'
import { EventCallbackFunction } from '$common/types/core'

declare function on (events: string, callback: EventCallbackFunction): void

export const composeEvents = <Scope>(event: Roll20Event<Scope>): string => (
  `${event.trigger}:${event.scope}`
)

export const onEvents = <Scope>(events: Roll20Event<Scope>[], callback: EventCallbackFunction): void => {
  on(events.map(composeEvents).join(' '), callback)
}
