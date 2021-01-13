import React, { useState } from "react";
import db from "../../firebase";
import {
  Button,
  FormControl,
  Input,
  List,
  ListItem,
  ListItemText,
  Modal,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import "./Todo.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const Todo = (props) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [modalStyle] = useState(getModalStyle);
  const classes = useStyles();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const updateTodo = () => {
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    setInput("");
    setOpen(false);
  };
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          <h2>Update This Todo</h2>
          <FormControl>
            <Input
              placeholder={props.todo.todo}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </FormControl>
          <Button
            type="submit"
            onClick={updateTodo}
            variant="contained"
            color="default"
            disabled={!input}
          >
            Update
          </Button>
        </div>
      </Modal>
      <List className="Todo">
        <ListItem>
          <ListItemText primary={props.todo.todo} />
        </ListItem>
        <EditIcon onClick={handleOpen} color="primary" />
        <DeleteForeverIcon
          onClick={(e) => {
            db.collection("todos").doc(props.todo.id).delete();
          }}
          variant="contained"
          color="secondary"
        />
      </List>
    </div>
  );
};

export default Todo;
