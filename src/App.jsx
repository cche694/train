import React, { useState, useEffect, useCallback, useRef } from "react";
import "./App.css";
let idSeq = Date.now();
const Control = (props) => {
  const { addTodo } = props;
  const inputRef = useRef();
  const onSubmit = (e) => {
    e.preventDefault();
    const newText = inputRef.current.value.trim();
    if (newText.length === 0) {
      return;
    }
    addTodo({
      id: ++idSeq,
      text: newText,
      complete: false,
    });
    inputRef.current.value = "";
  };
  return (
    <div className="control">
      <h1>todos</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="what needs to be done"
          ref={inputRef}
        />
      </form>
    </div>
  );
};
function TodoItem(props) {
  const {
    todo: { id, text, complete },
    removeTodo,
    toggleTodo,
  } = props;
  const onChange = () => {
    toggleTodo(id);
  };
  const onRemove = () => {
    removeTodo(id);
  };
  console.log(complete);
  return (
    <li className="todo-item">
      <input type="checkbox" onChange={onChange} checked={complete} />
      <label className={complete ? "complete" : ""}>{text}</label>
      <button onClick={onRemove}>&#xd7;</button>
    </li>
  );
}

function Todo(props) {
  const { todos, removeTodo, toggleTodo } = props;
  console.log("todos");
  return (
    <ul>
      {todos.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            removeTodo={removeTodo}
            toggleTodo={toggleTodo}
          ></TodoItem>
        );
      })}
    </ul>
  );
}

function TodoList(props) {
  const [todos, settodos] = useState([]);
  const addTodo = (todo) => {
    settodos((todos) => [...todos, todo]);
  };
  const removeTodo = useCallback((id) => {
    settodos((todos) =>
      todos.filter((todo) => {
        return todo.id !== id;
      })
    );
  }, []);
  const toggleTodo = (id) => {
    settodos((todos) => {
      return todos.map((todo) => {
        return todo.id == id
          ? {
              ...todo,
              complete: !todo.complete,
            }
          : todo;
      });
    });
  };
  return (
    <div className="todo-list">
      <Control addTodo={addTodo} />
      <Todo removeTodo={removeTodo} toggleTodo={toggleTodo} todos={todos} />
    </div>
  );
}

export default TodoList;
