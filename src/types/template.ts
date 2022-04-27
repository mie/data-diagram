export type ValueType = "int" | "float" | "string" | "boolean";
export type ActionType = "create" | "update" | "delete"

export interface FieldType {
	id: number,
  name: string,
  type: ValueType,
  default: string,
	required: boolean,
}

export interface TemplateType {
	id: number,
  name: string,
  fields: FieldType[],
}
