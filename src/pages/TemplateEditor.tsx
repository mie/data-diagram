import { useEffect, useState } from "react";
import { TemplateList } from "../components/TemplateList";
import {
  TemplateElementType,
  FieldType,
  TemplateType,
} from "../types/template";
import { FieldList } from "../components/FieldList";
import { createField, createTemplate } from "../utils/objectFactory";
import { Button } from "../ui/button/Button";
import { Panel } from "../components/Panel";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { add, remove, update } from '../reducers/templates'

export function TemplateEditor() {
  const templates = useAppSelector(
    (state) => state.templates.templates
  );
  const dispatch = useAppDispatch();
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>(
    {} as TemplateType
  );

  useEffect(() => {
    setSelectedTemplate({} as TemplateType);
		dispatch(add(createTemplate("NodeTemplate")))
  }, []);
  
  const addTemplate = () => {
    const newTemplate: TemplateType = createTemplate();
    dispatch(add(newTemplate));
    setSelectedTemplate(newTemplate);
  };

  const deleteTemplate = (id: number) => {
    dispatch(remove(id));
    if (selectedTemplate.id === id) {
      setSelectedTemplate({} as TemplateType);
    }
  };

  const updateTemplate = (values: object) => {
    const template = { ...selectedTemplate, ...values };
    dispatch(update(template));
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
    <Panel title="Template Editor">
      <div className="w-1/4 max-w-96 flex flex-col border p-4 gap-1">
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
      <div className="w-3/4 border p-4 h-full">
        {!Array.isArray(selectedTemplate.fields) ? (
          <div>Select a template</div>
        ) : (
          <div>
            <div className="mb-4">
              <label>Title:</label>
              <input
                type="text"
                className="input"
                value={selectedTemplate.name}
                onChange={(e) => updateTemplate({ name: e.target.value })}
              />
              <label>Type:</label>
              <select
                className="input"
                defaultValue={selectedTemplate.type}
                onChange={(e) => updateTemplate({ type: e.target.value })}
              >
                {Object.entries(TemplateElementType).map(
                  (e: [string, TemplateElementType]) => {
                    return (
                      <option value={e[0]} key={e[0]}>
                        {e[0]}
                      </option>
                    );
                  }
                )}
              </select>
            </div>
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
            <Button clickAction={addField}>+ Add Field</Button>
          </div>
        )}
      </div>
    </Panel>
  );
}
