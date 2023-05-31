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

const grid = 8;

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  listStyle: "none",
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: any) => ({
  listStyle: "none",
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
});

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
          {(provided, snapshot) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {dragList.map(({ id, title }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided, snapshot) => (
                      <li
                        id={id}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
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
