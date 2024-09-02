import { useState, useEffect } from "react";

function Form(props) {
  // variable and function to set variable
  const [name, setName] = useState("");  // initial value

  function handleChange() {
    setName(event.target.value);
    //console.log(name)
  }

  // addTask() is passed in props
  function handleSubmit(event) {
    event.preventDefault();
    if (name.trim()) { // Checks if name is not an empty or whitespace-only string
      props.addTask(name);
    }
    setName("");
  }  
  
  // useEffect runs after the component re-renders, so it sees the updated state
  useEffect(() => {
    console.log(name);
  }, [name]); // Dependency array ensures this runs whenever `name` changes
  
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

export default Form;
