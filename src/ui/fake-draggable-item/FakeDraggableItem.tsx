import { ReactNode, useState } from "react";

type Props = {
  dragStarted: (e: React.MouseEvent) => void;
	children?: ReactNode;
	data: string
};
export function FakeDraggableItem(props: Props) {

	const dragStart = (e: React.MouseEvent) => {
		e.preventDefault()
		props.dragStarted(e);
	}

  return (
    <div className="bg-red-400 h-8 w-fit px-2 py-1 cursor-move flex items-center text-white pointer-events-auto" onMouseDown={(e) => dragStart(e)}>
			<span>{props.data}</span>
      {props.children}
    </div>
  );
}
