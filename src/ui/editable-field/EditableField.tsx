import * as React from "react";
import { btnTypes, Button } from "../button/Button";
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
    if (typeof props.onTextClick === "function") {
      props.onTextClick();
    }
  };

  const cancelEdit = () => {
    setViewState(true);
    setValue(props.text);
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
        <div className="flex flex-row overflow-hidden input-group">
          <input
            className="input"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
					<Button clickAction={save} type={btnTypes.primary}>
            Save
          </Button>
          <Button clickAction={cancelEdit} type={btnTypes.cancel}>
            Cancel
          </Button>
        </div>
      )}
    </>
  );
}
