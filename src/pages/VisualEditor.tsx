import React, { useRef, useState } from "react";
import { Canvas, EdgeData, NodeData, Node, addNodeAndEdge } from "reaflow";
import { createNode } from "../utils/objectFactory";

type Props = {};
export function VisualEditor(props: Props) {
  const [droppable, setDroppable] = useState<boolean>(false);
  const [dragging, setDragging] = useState<boolean>(false);
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [edges, setEdges] = useState<EdgeData[]>([]);
  const [enteredNode, setEnteredNode] = useState<NodeData | null>(null);

  const d = useRef<HTMLDivElement>(null);

  const mouseEnter = (e: React.MouseEvent) => {
    setDroppable(true);
  };

  const mouseLeave = (e: React.MouseEvent) => {
    setDroppable(false);
  };

  const dragStart = (e: React.MouseEvent) => {
    setDragging(true);
  };

  const dragEnd = (e: React.MouseEvent) => {
    if (droppable && dragging) {
      const node = createNode();
      if (enteredNode !== null) {
        const result = addNodeAndEdge(nodes, edges, node, enteredNode);
        setNodes(result.nodes);
        setEdges(result.edges);
      } else {
        setNodes([...nodes, node]);
      }
    }
    setDragging(false);
  };

  const moveMouse = (e: React.MouseEvent) => {
    if (d.current !== null && dragging) {
      d.current.style.transform = "TranslateY(" + (e.clientY - 150) + "px)";
      d.current.style.transform += "TranslateX(" + (e.clientX - 110) + "px)";
    }
  };

  return (
    <div className="flex flex-col max-w-full w-panel bg-slate-50 rounded-md p-4">
      <div className="">
        <p className="text-xl">Visual editing</p>
      </div>
      <div className="flex flex-row min-w-full mt-2">
        <div
          className="w-1/3 flex flex-col border p-4 gap-1 relative"
          onMouseMove={(e) => moveMouse(e)}
          onMouseUp={(e) => dragEnd(e)}
        >
          <div
            className="bg-red-600 w-8 h-8"
            onMouseDown={(e) => dragStart(e)}
          ></div>
          <div
            className={
              dragging
                ? "bg-red-600 w-8 h-8 fixed pointer-events-none"
                : "bg-red-600 w-8 h-8 fixed pointer-events-none hidden"
            }
            ref={d}
          ></div>
          <div className="bg-blue-600 w-8 h-8"></div>
          <div className="bg-green-600 w-8 h-8"></div>
        </div>
        <div className="w-2/3 border bg-white p-4 h-full overflow-auto">
          <Canvas
            className={dragging ? "bg-red-100" : "bg-red-100"}
            maxWidth={400}
            maxHeight={400}
            node={
              <Node
                onEnter={(event, node) => setEnteredNode(node)}
                onLeave={(event, node) => setEnteredNode(null)}
              />
            }
            nodes={nodes}
            edges={edges}
            onMouseEnter={(e) => mouseEnter(e)}
            onMouseLeave={(e) => mouseLeave(e)}
          />
        </div>
      </div>
    </div>
  );
}
