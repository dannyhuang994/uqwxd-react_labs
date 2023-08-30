import React from "react";
import "./App.css";

const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");

  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");

  // This useEffect runs when the component mounts to retrieve todos from local storage
  React.useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  // This useEffect runs when todos change to save them to local storage
  React.useEffect(() => {
    if (todos.length > 0) {
      const json = JSON.stringify(todos);
      localStorage.setItem("todos", json);
    }
  }, [todos]);


  function handleSubmit(e) {
    e.preventDefault(); // Prevents the default form submission behavior
  
    // Create a new todo object with a unique ID, text, and completed status
    const newTodo = {
      id: new Date().getTime(), // Using the current timestamp as a unique ID
      text: todo.trim(), // Trimming any whitespace from the todo text
      completed: false, // Initially setting the completed status to false
    };
  
    // Check if the todo text is not empty
    if (newTodo.text.length > 0) {
      // Concatenate the newTodo to the existing todos array and update the state
      setTodos([...todos, newTodo]);
      setTodo(""); // Clear the todo input field for the next entry
    } else {
      // If the todo text is empty, show an alert and clear the input field
      alert("Enter Valid Task");
      setTodo(""); // Clear the todo input field
    }
  }
  

  // Function to delete a todo
  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  // Function to toggle the completion status of a todo
  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  // Function to submit edits for a todo
  function submitEdits(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  }

  return (
    <div id="todo-list">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button type="submit">Add Todo</button>
      </form>

      {/* Mapping through todos to display them */}
      {todos.map((todo) => (
        <div key={todo.id} className="todo">

          <div className="todo-text">
            <input
              type="checkbox"
              id="completed"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />

            {/* Conditional rendering based on editing state */}
            {todo.id === todoEditing ? (
              <input
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              <div>{todo.text}</div>
            )}
          </div>

          <div className="todo-actions">

            {/* Conditional rendering based on editing state */}
            {todo.id === todoEditing ? (
              <button onClick={() => submitEdits(todo.id)}>Submit Edits</button>
            ) : (
              <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
            )}

            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>  

        </div>
      ))}
    </div>
  );
};

export default App;


 