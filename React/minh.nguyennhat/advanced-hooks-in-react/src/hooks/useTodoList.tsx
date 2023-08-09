import { useState } from "react";

const useTodoList = () => {
  const [todoList, setTodoList] = useState<string[]>([]);

  function addTodo(todo: string) {
    setTodoList((prevTodoList) => [...prevTodoList, todo]);
  }

  return {
    todoList,
    addTodo,
  };
};

// TodoList component
const TodoList = () => {
  const { todoList, addTodo } = useTodoList();

  return (
    <div>
      {todoList.map((todo, index) => (
        <div key={index}>{todo}</div>
      ))}
      <button onClick={() => addTodo("New todo")}>Add Todo</button>
    </div>
  );
};

export default TodoList;
