import React, { useEffect, useState } from "react";
import { Canvas, EdgeData, NodeData, Node, addNodeAndEdge } from "reaflow";
import { ElementType } from "../types/visual";
import { FakeDraggableItem } from "../ui/fake-draggable-item/FakeDraggableItem";
import { FakeDraggable } from "../ui/fake-draggable/FakeDraggable";
import { FakeDroppable } from "../ui/fake-droppable/FakeDroppable";
import { createNode } from "../utils/objectFactory";

type Props = {};
export function VisualEditor(props: Props) {
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [edges, setEdges] = useState<EdgeData[]>([]);
  const [droppable, setDroppable] = useState<boolean>(false);
  const [elementTypes, setElementTypes] = useState<ElementType[]>([]);
  const [draggingItem, setDraggingItem] = useState<string | null>(null);
  const [enteredNode, setEnteredNode] = useState<NodeData | null>(null);

  useEffect(() => {
    const types = Object.entries(ElementType).map((e, i) => {
      return e[1];
    });
    setElementTypes(types);
  }, []);

  const dropItem = () => {
    if (draggingItem !== null && droppable) {
			if (enteredNode !== null) {
				const result = addNodeAndEdge(nodes, edges, createNode(draggingItem), enteredNode);
				setNodes(result.nodes);
				setEdges(result.edges);
			} else {
				setNodes([...nodes, createNode(draggingItem)]);
			}      
      setDraggingItem(null);
    }
  };

  return (
    <div className="flex flex-col max-w-full w-panel bg-slate-50 rounded-md p-4 z-0">
      <div>
        <p className="text-xl">Visual editor</p>
      </div>
      <FakeDraggable onDrop={(e) => setDraggingItem(null)} item={draggingItem}>
        <div className="flex flex-row min-w-full mt-2">
          <div className="w-1/3 flex flex-col border p-4 gap-1">
						<p>Drag and drop boxes on the canvas</p>
            {elementTypes.map((i, idx) => {
              return (
                <FakeDraggableItem
                  data={i}
                  key={i}
                  dragStarted={(e) =>
                    draggingItem === null && setDraggingItem(i)
                  }
                />
              );
            })}
          </div>
          <div className="w-2/3 border bg-white p-4 h-full overflow-y-scroll">
            <FakeDroppable onDrop={(e) => dropItem()}>
              <Canvas
                className="canvas"
                node={
                  <Node
                    onEnter={(event, node) => setEnteredNode(node)}
                    onLeave={(event, node) => setEnteredNode(null)}
                  />
                }
                nodes={nodes}
                edges={edges}
                onMouseEnter={(e) => setDroppable(true)}
                onMouseLeave={(e) => setDroppable(false)}
              />
            </FakeDroppable>
          </div>
        </div>
      </FakeDraggable>
    </div>
  );
}