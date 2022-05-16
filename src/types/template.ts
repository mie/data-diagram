export enum ValueType {
  "int" = "int",
  "float" = "float",
  "string" = "string",
  "boolean" = "boolean",
}

export enum CalculatorType {
  "None" = "None",
  "PI Point" = "PI Point",
  "Formula" = "Formula",
  "Debalance" = "Debalance",
}

export enum TemplateElementType {
	"Node" = "Node",
	"Link" = "Link"
}

export interface FieldType {
  id: number;
  name: string;
  type: ValueType;
  calculator: CalculatorType;
  default: string;
  required: boolean;
}

export interface TemplateType {
  id: number;
  name: string;
	type: TemplateElementType;
  fields: FieldType[];
}
