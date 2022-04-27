import * as React from "react";
type Props = {
  view: boolean;
  text: string;
  onSave: (value: string) => void;
  onTextClick?: () => void;
};
export function EditableField(props: Props) {
  const [viewState, setViewState] = React.useState<boolean>(props.view);
  const [value, setValue] = React.useState<string>(props.text);
  const save = () => {
    props.onSave(value);
    setViewState(true);
  };

  const clickView = () => {
    setViewState(false);
		if (typeof(props.onTextClick) === "function") {
			props.onTextClick();
		}
  };

  return (
    <>
      {viewState ? (
        <div className="flex">
          <span
            className="min-w-10 mr-2 inline-block min-h-6 hover:border-b hover:border-dashed hover:cursor-pointer"
            onClick={clickView}
          >
            {props.text}
          </span>
        </div>
      ) : (
        <div className="flex flex-row overflow-hidden">
          <input
            className="mr-2 border-b px-1 w-full"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button className="border px-1 bg-emerald-300" onClick={save}>
            Save
          </button>
          <button
            className="border px-1 bg-yellow-300"
            onClick={() => setViewState(true)}
          >
            Cancel
          </button>
        </div>
      )}
    </>
  );
}
