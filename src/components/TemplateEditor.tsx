import { useEffect, useState } from "react";
import { TemplateList } from "./TemplateList";
import { FieldType, TemplateType } from "../types/template";
import { FieldList } from "./FieldList";
import { createField, createTemplate } from "../utils/objectFactory";

export function TemplateEditor() {
  const [templates, setTemplates] = useState<TemplateType[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>(
    {} as TemplateType
  );

  useEffect(() => {
		setSelectedTemplate({} as TemplateType);
    setTemplates([
      {
        id: 1,
        name: "NodeTemplate",
        fields: [
          { id: 1, name: "Name", type: "string", default: "", required: true },
        ],
      },
      {
        id: 2,
        name: "FlowTemplate",
        fields: [
          {
            id: 2,
            name: "Product1",
            type: "string",
            default: "",
            required: true,
          },
          {
            id: 3,
            name: "Product2",
            type: "string",
            default: "",
            required: true,
          },
          { id: 4, name: "Source", type: "int", default: "", required: true },
          { id: 5, name: "Dest", type: "int", default: "", required: true },
          {
            id: 6,
            name: "Measured",
            type: "float",
            default: "",
            required: false,
          },
        ],
      },
      {
        id: 3,
        name: "TankTemplate",
        fields: [
          {
            id: 7,
            name: "Measured",
            type: "float",
            default: "",
            required: true,
          },
          {
            id: 8,
            name: "ProductName",
            type: "string",
            default: "",
            required: true,
          },
          { id: 9, name: "Name", type: "string", default: "", required: true },
        ],
      },
    ]);
  }, []);

  const addTemplate = () => {
    const newTemplate: TemplateType = createTemplate();
    setTemplates([...templates, newTemplate]);
    setSelectedTemplate(newTemplate);
  };

  const deleteTemplate = (id: number) => {
    setTemplates(
      templates.filter((t: TemplateType) => {
        return t.id !== id;
      })
    );
		if (selectedTemplate.id === id) {
			setSelectedTemplate({} as TemplateType)
		}
  };

  const updateTemplate = (id: number, values: object) => {
    const template = { ...selectedTemplate, ...values };
    setTemplates(
      templates
        .filter((t: TemplateType) => {
          return t.id !== id;
        })
        .concat([template])
    );
		setSelectedTemplate(template);
  };

	const addField = () => {
		updateTemplate(selectedTemplate.id, {fields: [...selectedTemplate.fields, createField()]})
	}

	const updateField = (id: number, values: object) => {
		
	}

  return (
    <div className="flex flex-col max-w-full w-panel bg-slate-50 rounded-md p-4">
      <div className="">
        <p className="text-xl">Template editing</p>
      </div>
      <div className="flex flex-row min-w-full mt-2">
        <div className="w-1/3 flex flex-col border p-4 gap-1">
          <TemplateList
            templates={templates}
            selectedTemplate={selectedTemplate}
            select={(template: TemplateType) => setSelectedTemplate(template)}
            delete={(templateid) => deleteTemplate(templateid)}
            update={(id, value) => updateTemplate(id, value)}
          />
          <button
            className="border px-4 py-2 mt-2 text-white bg-green-600 rounded-md"
            onClick={addTemplate}
          >
            + Add Template
          </button>
        </div>

        <div className="w-2/3 border bg-white p-4">
          {!Array.isArray(selectedTemplate.fields) ? (
            <div>Select a template</div>
          ) : (
            <div>
              <FieldList
                fields={
                  selectedTemplate.fields === undefined
                    ? []
                    : selectedTemplate.fields
                }
                deleteField={(id) => updateTemplate(selectedTemplate.id, {fields: selectedTemplate.fields.filter((f: FieldType) => f.id !== id)})}
                updateField={(id, data) => updateField(id, data)}
              />
              <button
                className="border px-2 mt-2 text-white bg-green-600 rounded-md"
								onClick={addField}
              >
                + Add Field
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
