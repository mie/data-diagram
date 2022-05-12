import { useEffect, useState } from "react";
import { TemplateList } from "../components/TemplateList";
import {
  CalculatorType,
  FieldType,
  TemplateType,
  ValueType,
} from "../types/template";
import { FieldList } from "../components/FieldList";
import { createField, createTemplate } from "../utils/objectFactory";
import { Button } from "../ui/button/Button";

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
          {
            id: 1,
            name: "Name",
            type: ValueType.string,
            default: "",
            calculator: CalculatorType.None,
            required: true,
          },
        ],
      },
      {
        id: 2,
        name: "FlowTemplate",
        fields: [
          {
            id: 2,
            name: "Product1",
            type: ValueType.string,
            default: "",
            calculator: CalculatorType.None,
            required: true,
          },
          {
            id: 3,
            name: "Product2",
            type: ValueType.string,
            default: "",
            calculator: CalculatorType.None,
            required: true,
          },
          {
            id: 4,
            name: "Source",
            type: ValueType.int,
            default: "0",
            calculator: CalculatorType.None,
            required: true,
          },
          {
            id: 5,
            name: "Dest",
            type: ValueType.int,
            default: "0",
            calculator: CalculatorType.None,
            required: true,
          },
          {
            id: 6,
            name: "Measured",
            type: ValueType.float,
            default: "0.0",
            calculator: CalculatorType.None,
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
            type: ValueType.float,
            default: "0.0",
            calculator: CalculatorType.None,
            required: true,
          },
          {
            id: 8,
            name: "ProductName",
            type: ValueType.string,
            default: "",
            calculator: CalculatorType.None,
            required: true,
          },
          {
            id: 9,
            name: "Name",
            type: ValueType.string,
            default: "",
            calculator: CalculatorType.None,
            required: true,
          },
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
      setSelectedTemplate({} as TemplateType);
    }
  };

  const updateTemplate = (values: object) => {
    const template = { ...selectedTemplate, ...values };
    setTemplates(
      templates
        .filter((t: TemplateType) => {
          return t.id !== selectedTemplate.id;
        })
        .concat([template])
    );
    setSelectedTemplate(template);
  };

  const addField = () => {
    updateTemplate({ fields: [...selectedTemplate.fields, createField()] });
  };

  const updateField = (id: number, values: object) => {
    const fields: FieldType[] = [
      ...selectedTemplate.fields.filter((f: FieldType) => {
        return f.id !== id;
      }),
      {
        ...selectedTemplate.fields.filter((f: FieldType) => {
          return f.id === id;
        })[0],
        ...values,
      },
    ];
    updateTemplate({ fields: fields });
  };

  return (
    <div className="flex flex-col max-w-full w-panel bg-slate-50 rounded-md p-4 h-full">
      <div className="">
        <p className="text-xl">Template editing</p>
      </div>
      <div className="flex flex-row min-w-full mt-2 h-full">
        <div className="w-1/3 flex flex-col border p-4 gap-1">
          <TemplateList
            templates={templates}
            selectedTemplate={selectedTemplate}
            selectTemplate={(template: TemplateType) =>
              setSelectedTemplate(template)
            }
            deleteTemplate={(templateid) => deleteTemplate(templateid)}
            updateTemplate={(id, value) => updateTemplate(value)}
          />
          <div>
            <Button clickAction={addTemplate}>+ Add Template</Button>
          </div>
        </div>

        <div className="w-2/3 border bg-white p-4 h-full">
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
                deleteField={(id) =>
                  updateTemplate({
                    fields: selectedTemplate.fields.filter(
                      (f: FieldType) => f.id !== id
                    ),
                  })
                }
                updateField={(id, data) => updateField(id, data)}
              />
              <Button
                clickAction={addField}
              >
                + Add Field
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
