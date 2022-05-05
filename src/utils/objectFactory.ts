import { NodeData } from "reaflow";
import { CalculatorType, FieldType, TemplateType, ValueType } from "../types/template";

export const createTemplate = (name?: string): TemplateType => {
  return {
    id: new Date().getDate(),
    name: name !== undefined ? name : "NewTemplate",
    fields: [],
  };
};

export const createField = (name?: string): FieldType => {
  const id: number = new Date().getTime()
	console.log(id);
	return {
    id: id,
    name: name !== undefined ? name : `NewField-${id}`,
    type: ValueType.string,
		calculator: CalculatorType.None,
		required: false,
		default: ""
  };
};

export const createNode = (id?: string): NodeData => {
	return {
		id: id !== undefined ? id : new Date().getTime().toString()
		,text: "Node"
	}
}