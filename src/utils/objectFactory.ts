import { FieldType, TemplateType } from "../types/template";

export const createTemplate = (name?: string): TemplateType => {
  return {
    id: new Date().getDate(),
    name: name !== undefined ? name : "NewTemplate",
    fields: [],
  };
};

export const createField = (name?: string): FieldType => {
  return {
    id: new Date().getDate(),
    name: name !== undefined ? name : "NewField",
    type: "string",
		required: false,
		default: ""
  };
};
