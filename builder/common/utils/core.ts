import { RollTemplate, RollTemplateItem } from '$common/types/styled'

export const attribute = (v: string): string => `@{${v}}`

export const rolltemplate = (template: RollTemplate): string => `&{template:${template.name}}` + (
  template.items
    .map((item: RollTemplateItem): string => `{{${item.key}=${item.value}}}`)
    .join(' ')
)
