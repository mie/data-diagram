import { EditableField } from "../ui/editable-field/EditableField";
import { CalculatorType, FieldType, ValueType } from "../types/template";
import { useEffect, useState } from "react";

type Props = {
  fields: FieldType[],
	deleteField: (id: number) => void,
	updateField: (id: number, update: Object) => void
};
export function FieldList(props: Props) {
	const [selectedField, setSelectedField] = useState({} as FieldType);
	const [sortedFields, setSortedFields] = useState<FieldType[]>([])

	useEffect(() => {
		setSortedFields(props.fields.sort((a: FieldType, b: FieldType) => {
			return a.name.localeCompare(b.name);
		}))
	}, [props.fields])

  return (
    <div>
      <table className="w-full mt-4 table-fixed">
        <thead className="w-full border-y text-sm font-bold">
          <tr>
            <td className="p-2 border-x">Name</td>
            <td className="w-32 p-2 border-r">Type</td>
						<td className="w-32 p-2 border-r">Calculator</td>
            <td className="w-40 p-2 border-r">Default</td>
            <td className="w-20 p-2 border-r">Required</td>
						<td className="w-20 p-2 border-r">Actions</td>
          </tr>
        </thead>
        <tbody>
          {sortedFields.map((field: FieldType) => {
            return (
              <tr className="border-b" key={field.id}>
                <td className="p-1 border-x">
                  <EditableField
                    view={true}
                    text={field.name}
                    onSave={(value: string) =>
                      props.updateField(field.id, {name: value})
                    }
                    onTextClick={() => {
                      setSelectedField(field);
                    }}
                  />
                </td>
								<td className="w-32 p-1 border-r">
                  <select
                    className="form-select p-1 bg-white border"
                    defaultValue={field.calculator}
										onChange={(e) => props.updateField(field.id, {calculator: e.target.value})}
                  >
                    {Object.entries(CalculatorType).map((t: [string, CalculatorType]) => {
                      return (
                        <option value={t[1]} key={t[0]}>
                          {t[1]}
                        </option>
                      );
                    })}
                  </select>
                </td>
                <td className="w-32 p-1 border-r">
                  <select
                    className="form-select p-1 bg-white border"
                    defaultValue={field.type}
										onChange={(e) => props.updateField(field.id, {type: e.target.value})}
                  >
                    {Object.entries(ValueType).map((t: [string, ValueType]) => {
                      return (
                        <option value={t[1]} key={t[0]}>
                          {t[1]}
                        </option>
                      );
                    })}
                  </select>
                </td>
                <td className="w-40 p-1 border-r">
                  <EditableField
                    view={true}
                    text={field.default === "" ? "<empty string>" : field.default}
                    onSave={(value: string) => props.updateField(field.id, {default: value}) }
                    onTextClick={() => {
                      setSelectedField(field);
                    }}
                  />
                </td>
                <td className="w-20 p-1 text-center border-r">
                  <input
                    type="checkbox"
                    checked={field.required}
                    onChange={(e) => props.updateField(field.id, {required: e.target.checked})}
                  />
                </td>
								<td className="text-center p-1 border-r">
									<button className="border px-1 text-white bg-red-700" onClick={() => props.deleteField(field.id)}>[x]</button>
								</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
