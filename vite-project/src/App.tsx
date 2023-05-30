import Icon from "./Icon";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const style = {
  width: "300px",
  display: "flex",
  borderRadius: "8px",
  padding: "1rem",
  border: "1px solid black",
  alignItems: "center",
  gap: "3rem",
  fontSize: "24px",
};

const list = [
  {
    id: 1,
    title: "1. Read books",
  },
  {
    id: 2,
    title: "2.  Go to work",
  },
  {
    id: 3,
    title: "3. Go to home",
  },
  {
    id: 4,
    title: "4. Eat mellon",
  },
  {
    id: 5,
    title: "5. Drink coffee",
  },
];

export default function App() {
  return (
    <div>
      <DragDropContext onDragEnd={(...props) => console.log(props)}>
        <Droppable droppableId="droppable-1">
          {(provided, _) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {list.map((item, i) => {
                return (
                  <Draggable
                    key={item.id}
                    draggableId={"draggable-" + item.id}
                    index={i}
                  >
                    {(provided, _) => (
                      <div
                        style={style}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <Icon {...provided.dragHandleProps} />
                        <span>{item.title}</span>
                      </div>
                    )}
                  </Draggable>
                );
              })}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
