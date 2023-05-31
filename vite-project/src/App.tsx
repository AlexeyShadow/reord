import Icon from "./Icon";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";

const style = {
  width: "300px",
  display: "flex",
  borderRadius: "8px",
  padding: "1rem",
  border: "1px solid black",
  alignItems: "center",
  gap: "3rem",
  fontSize: "24px",
  margin: "20px",
};

const list = [
  {
    id: "1",
    title: "1. Read books",
  },
  {
    id: "2",
    title: "2. Go to work",
  },
  {
    id: "3",
    title: "3. Go to home",
  },
  {
    id: "4",
    title: "4. Eat melon",
  },
  {
    id: "5",
    title: "5. Drink coffee",
  },
];

export default function App() {
  const [dragList, setDragList] = useState(list);

  function handleDragEnd(result: any) {
    const items = Array.from(dragList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setDragList(items);
  }

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {dragList.map(({ id, title }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <li
                        id={id}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        style={style}
                      >
                        <Icon {...provided.dragHandleProps} />
                        <span>{title}</span>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
