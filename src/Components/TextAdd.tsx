// TextAdd.tsx
import React, { useState, useEffect } from "react";
import useLocalStorage from "./LocalStorage";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";

type Todo = {
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

  const toggleTodo = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  // const recorder = (list, startIndex, endIndex) => {
  //   const result = Array.from(list)
  //   const [removed] = result.splice(startIndex, 1)
  //   result.splice(endIndex, 0, removed)

  //   return result
  // }

  // const onDragEnd = (result) => {
  //   if (!result.destination) {
  //     return;
  //   }
  //   const recordedItems = recorder()
  // };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const updatedTodos = Array.from(todos);
    const [reorderedItem] = updatedTodos.splice(result.source.index, 1);
    updatedTodos.splice(result.destination.index, 0, reorderedItem);

    setTodos(updatedTodos);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <div className="add-text-wrapper mt-12 mx-14 border-2 items-center border-dashed border-gray-300 p-2 mb-4">
          <div className="add-text-form flex ">
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
        <Droppable droppableId="droppable">
          {(provided) => (
            <ul
              className="mt-4 mx-14"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {todos.map((todo, index) => (
                <Draggable draggableId={todo.id.toString()} key={todo.id.toString()} index={index}>

                  {(provided)=> (
                    <li className="uploaded-item flex justify-between items-center p-4 rounded mb-4"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    >
                    <div className="flex items-center">
                      <span className="mr-2">{index + 1}: </span>
                      <span
                        style={{
                          textDecoration: todo.completed
                            ? "line-through"
                            : "none",
                        }}
                        className={todo.completed ? "text-gray-500" : ""}
                      >
                        {todo.text}
                      </span>
                    </div>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="bg-red-500 text-white px-5 py-1 rounded"
                    >
                      Delete
                    </button>
                  </li>
                  )}
                </Draggable>
              ))}
            </ul>;
  )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default TextAdd;
