import React, { useState } from "react";
import useLocalStorage from "./LocalStorage";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  TouchSensor,
  closestCenter,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./DragComponents/SortableItem";

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const TextAdd: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const [newTodo, setNewTodo] = useState<string>("");

  const addTodo = () => {
    if (newTodo.trim() === "") {
      return;
    }

    const newTodoItem: Todo = {
      id: todos.length + 1,
      text: newTodo,
      completed: false,
    };

    setTodos([...todos, newTodoItem]);
    setNewTodo("");
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };


  // =============USE REACT-DND ==================

  const [activeItem, setActiveItem] = useState<Todo>();
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveItem(todos.find((item) => item.id === active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeItem = todos.find((item) => item.id === active.id);
    const overItem = todos.find((item) => item.id === over.id);

    if (!activeItem || !overItem) {
      return;
    }

    const activeIndex = todos.findIndex((item) => item.id === active.id);
    const overIndex = todos.findIndex((item) => item.id === over.id);

    if (activeIndex !== overIndex) {
      setTodos((prev) => arrayMove<Todo>(prev, activeIndex, overIndex));
    }
    setActiveItem(undefined);
  };

  const handleDragCancel = () => {
    setActiveItem(undefined);
  };


  return (
    <div className="text-add-wrapper" >
      <div className="add-text-wrapper mt-12 mx-14 border-2 items-center border-dashed border-gray-300 p-2 mb-4">
        <div className="add-text-form flex">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add Your Text"
            className="flex-grow p-2 py-1 rounded-l-md focus:outline-none"
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white p-2 px-6 rounded-r-md hover:bg-blue-600 focus:outline-none font-medium"
          >
            Add Text
          </button>
        </div>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={todos} strategy={rectSortingStrategy}>
          <ul className="mt-4 mx-14">
            {todos.map((item) => (
              <div key={item.id} >
                <SortableItem item={item} onDelete={deleteTodo} />
              </div>
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default TextAdd;
