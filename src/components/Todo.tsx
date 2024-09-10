// Todo.jsx
// has the checkbox, edit and delete buttons for each item
import { useState, useEffect, useRef } from "react";

function usePrevious(value: boolean | undefined) {
  const ref = useRef();
  useEffect(() => {
    // @ts-ignore
      ref.current = value;
  });
  return ref.current;
}

function Todo(props: { name: unknown; editTask: (arg0: any, arg1: any) => void; id: any; completed: any; toggleTaskCompleted: (arg0: any) => any; deleteTask: (arg0: any) => any; }) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState(props.name);
  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);
  const wasEditing = usePrevious(isEditing);

  // Focus the input element when editing mode is enabled
  useEffect(() => {
    if (!wasEditing && isEditing) {
      setNewName(props.name)
      editFieldRef.current?.focus();
    } else if (wasEditing && !isEditing) {
      // @ts-ignore
        editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing, props.name]); // Run effect when editing state changes

  function handleChange(e: { target: { value: unknown; }; }) {
    setNewName(e.target.value);
  }

  function handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        {/*  <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label> */}
        <input
          id={props.id}
          className="todo-text"
          type="text"
          value={newName}
          onChange={handleChange}
          ref={editFieldRef} // Attach ref to input
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}>
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
        </button>
      </div>
    </form>
  );
  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button type="button"
          className="btn"
          onClick={() => setEditing(true)}
          ref={editButtonRef}>
          Edit <span className="visually-hidden">{props.name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteTask(props.id)}>
          Delete <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>
  );

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}

export default Todo;
