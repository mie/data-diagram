import { NodeData } from "reaflow";
import { CalculatorType, TemplateElementType, FieldType, TemplateType, ValueType } from "../types/template";

export const createTemplate = (name?: string): TemplateType => {
  return {
    id: Date.now(),
    name: name !== undefined ? name : "NewTemplate",
    fields: [],
		type: TemplateElementType.Node
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

export const createNode = (name: string, id?: string): NodeData => {
	const nodeid: string = id !== undefined ? id : new Date().getTime().toString()
	return {
		id: nodeid
		,text: [name, nodeid].join("-")
	}
}