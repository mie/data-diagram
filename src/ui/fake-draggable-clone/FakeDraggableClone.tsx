import { useEffect, useRef } from "react";
type Props = {
  x: number;
  y: number;
  className?: string;
};
export function FakeDraggableClone(props: Props) {
  const d = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (d !== null && d.current !== null) {
      d.current.style.left = (props.x) + "px";
			d.current.style.top = (props.y) + "px";
    }
  }, [props.x, props.y]);

  return (
    <div
      className={"bg-red-200 h-8 w-12 fixed pointer-events-none " + props.className}
      ref={d}
    ></div>
  );
}
