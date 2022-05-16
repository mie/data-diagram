import React, { ReactNode } from "react";
type Props = {
	visible: boolean
  children?: ReactNode;
	onClose: () => void
};
export function Modal(props: Props) {

	const classes : string = "modal";

  return (
    <div className={props.visible ? classes : [classes, "hidden"].join(" ")} onClick={() => props.onClose()}>
      <div className="modal-inner">{props.children}</div>
    </div>
  );
}
