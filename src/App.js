import React, { useState, useEffect } from "react";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import "./App.css";
import Todo from "./components/Todo/Todo";
import db from "./firebase";
import firebase from "firebase/app";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        // console.log(snapshot.docs.map((doc) => doc.data().todo));
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);

  const inputChangedHandler = (e) => {
    // console.log(e.target.value);
    return setInput(e.target.value);
  };

  const addTodoHandler = (e) => {
    e.preventDefault();
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setTodos([...todos, input]);
    setInput("");
  };

  // console.log(todos);

  return (
    <div className="App">
      <form>
        <FormControl>
          <InputLabel>Enter a Todo</InputLabel>
          <Input value={input} onChange={inputChangedHandler} />
        </FormControl>
        <Button
          type="submit"
          onClick={addTodoHandler}
          variant="contained"
          color="primary"
          disabled={!input}
        >
          Add Todo
        </Button>
      </form>
      <ul>
        {todos.map((todo, idx) => {
          return <Todo key={idx} todo={todo} />;
        })}
      </ul>
    </div>
  );
};

export default App;
