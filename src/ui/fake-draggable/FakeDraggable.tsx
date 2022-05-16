import React, { useState } from "react";
import { FakeDraggableClone } from "../fake-draggable-clone/FakeDraggableClone";

type Props = {
  onDrop: (e: React.MouseEvent) => void;
  item: string | null;
  children?: React.ReactNode;
	className?: string
};
export function FakeDraggable(props: Props) {
	const [offsetX, setOffsetX] = useState<number>(0);
	const [offsetY, setOffsetY] = useState<number>(0);
  const [cloneX, setCloneX] = useState<number>(0);
  const [cloneY, setCloneY] = useState<number>(0);

  const setCoords = (x: number, y: number) => {
    setCloneX(x - offsetX);
    setCloneY(y - offsetY);
  };

  const mouseMove = (e: React.MouseEvent) => {
    if (props.item !== null) {
			setCoords(e.nativeEvent.clientX, e.nativeEvent.clientY);
    }
  };

	const mouseDown = (e: React.MouseEvent) => {
		setOffsetX(e.nativeEvent.offsetX);
		setOffsetY(e.nativeEvent.offsetY);
		setCoords(e.nativeEvent.clientX, e.nativeEvent.clientY);
	}

  return (
    <div
      onMouseMove={(e) => mouseMove(e)}
      onMouseUp={(e) => props.onDrop(e)}
      onMouseDown={(e) => mouseDown(e)}
			className={props.className}
    >
      {props.item !== null && <FakeDraggableClone x={cloneX} y={cloneY} />}
      {props.children}
    </div>
  );
}
