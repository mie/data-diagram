import React, { useEffect, useState } from "react";
import { TemplateType } from "../types/template";
import { EditableField } from "../ui/editable-field/EditableField";

interface TemplateListProps {
  templates: TemplateType[];
  selectedTemplate?: TemplateType;
  selectTemplate: (template: TemplateType) => void;
  deleteTemplate: (id: number) => void;
	updateTemplate: (id: number, values: object) => void
}

export function TemplateList(props: TemplateListProps) {
  const selectTemplate = (template: TemplateType) => {
    props.selectTemplate(template);
  };

	const [sortedTemplates, setSortedTemplates] = useState<TemplateType[]>([])

	useEffect(() => {
		setSortedTemplates(props.templates.sort((a: TemplateType,b: TemplateType) => {
			return a.name.localeCompare(b.name)
		}))
	}, [props.templates])

	const deleteTemplate = (e: React.MouseEvent, id: number) => {
		e.stopPropagation();
		props.deleteTemplate(id)
	}

  const templateClasses: string =
    "border w-full px-4 py-2 border-cyan-200 hover:bg-cyan-200 cursor-pointer flex items-center justify-between";

  return (
    <>
      {sortedTemplates.map((template: TemplateType) => {
        return (
          <div
            className={
              props.selectedTemplate === undefined ||
              props.selectedTemplate !== template
                ? templateClasses
                : templateClasses + " bg-cyan-200"
            }
            onClick={() => selectTemplate(template)}
            key={template.name}
          >
            <EditableField view={true} text={template.name} onSave={(value: string) => props.updateTemplate(template.id, {name: value})} />
            <button
              className="bg-red-600 text-white px-1 border"
              onClick={(e) => deleteTemplate(e, template.id)}
            >
              [x]
            </button>
          </div>
        );
      })}
    </>
  );
}
