import { useMemo, useState } from "react";
import { Canvas, EdgeData, NodeData, Node, addNodeAndEdge } from "reaflow";
import { Panel } from "../components/Panel";
import { useAppSelector } from "../hooks/store";
import { TemplateType } from "../types/template";
import { FakeDraggableItem } from "../ui/fake-draggable-item/FakeDraggableItem";
import { FakeDraggable } from "../ui/fake-draggable/FakeDraggable";
import { FakeDroppable } from "../ui/fake-droppable/FakeDroppable";
import { createNode } from "../utils/objectFactory";

export function VisualEditor() {
  const templates = useAppSelector((state) => state.templates.templates);
  // const [nodeTemplates, setNodeTemplates] = useState<TemplateType[]>([])
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [edges, setEdges] = useState<EdgeData[]>([]);
  const [droppable, setDroppable] = useState<boolean>(false);
  const [draggingItem, setDraggingItem] = useState<string | null>(null);
  const [enteredNode, setEnteredNode] = useState<NodeData | null>(null);

  const nodeTemplates: TemplateType[] = useMemo(() => {
    return templates.filter((t) => t.type === "Node");
  }, [templates]);

  const dropItem = () => {
    if (draggingItem !== null && droppable) {
      if (enteredNode !== null) {
        const result = addNodeAndEdge(
          nodes,
          edges,
          createNode(draggingItem),
          enteredNode
        );
        setNodes(result.nodes);
        setEdges(result.edges);
      } else {
        setNodes([...nodes, createNode(draggingItem)]);
      }
      setDraggingItem(null);
    }
  };

	const selectNode = (node: NodeData) => {
		console.log(node);
		
	}

  return (
    <Panel title="Visual Editor">
      <FakeDraggable
        onDrop={(e) => setDraggingItem(null)}
        item={draggingItem}
        className="flex flex-row min-w-full mt-2"
      >
        <div className="w-1/4 max-w-96 flex flex-col border p-4 gap-1">
          <p>Drag and drop boxes on the canvas</p>
          {nodeTemplates.map((t) => {
            return (
              <FakeDraggableItem
                data={t.name}
                key={t.id}
                dragStarted={(e) =>
                  draggingItem === null && setDraggingItem(t.name)
                }
              />
            );
          })}
        </div>
        <div className="w-1/2 border p-4 h-full overflow-y-scroll">
          <FakeDroppable onDrop={(e) => dropItem()}>
            <Canvas
              className="canvas"
              node={
                <Node
                  onEnter={(event, node) => setEnteredNode(node)}
                  onLeave={(event, node) => setEnteredNode(null)}
									onClick={(event, node) => selectNode(node)}
                />
              }
              nodes={nodes}
              edges={edges}
              onMouseEnter={(e) => setDroppable(true)}
              onMouseLeave={(e) => setDroppable(false)}
            />
          </FakeDroppable>
        </div>
        <div className="w-1/4 border p-4">
          <p>Element fields:</p>
        </div>
      </FakeDraggable>
    </Panel>
  );
}
