import React, { useEffect, useState } from "react";
import { TemplateType } from "../types/template";
import { btnSizes, btnTypes, Button } from "../ui/button/Button";

interface TemplateListProps {
  templates: TemplateType[];
  selectedTemplate?: TemplateType;
  selectTemplate: (template: TemplateType) => void;
  deleteTemplate: (id: number) => void;
  updateTemplate: (id: number, values: object) => void;
}

export function TemplateList(props: TemplateListProps) {
  const selectTemplate = (template: TemplateType) => {
    props.selectTemplate(template);
  };

  const [sortedTemplates, setSortedTemplates] = useState<TemplateType[]>([]);

  useEffect(() => {
		const t_copy: TemplateType[] = props.templates.slice()
    setSortedTemplates(
      t_copy.sort((a: TemplateType, b: TemplateType) => {
        return a.name.localeCompare(b.name);
      })
    );
  }, [props.templates]);

  const deleteTemplate = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    props.deleteTemplate(id);
  };

  const templateClasses: string =
    "border w-full px-4 py-2 border-gray-500 hover:bg-gray-500 cursor-pointer flex items-center justify-between";

  return (
    <>
      {sortedTemplates.map((template: TemplateType) => {
        return (
          <div
            className={
              props.selectedTemplate === undefined ||
              props.selectedTemplate !== template
                ? templateClasses
                : templateClasses + " bg-gray-500"
            }
            onClick={() => selectTemplate(template)}
            key={template.id}
          >
            {/* <EditableField
              view={true}
              text={template.name}
              onSave={(value: string) =>
                props.updateTemplate(template.id, { name: value })
              }
            /> */}
            <div className="flex">
              <span
                className="min-w-10 mr-2 inline-block min-h-6 hover:cursor-pointer"
              >
                {template.name}
              </span>
            </div>
            <Button
              type={btnTypes.danger}
              size={btnSizes.sm}
              clickAction={(e) => deleteTemplate(e, template.id)}
            >
              [x]
            </Button>
          </div>
        );
      })}
    </>
  );
}
