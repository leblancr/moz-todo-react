// Form.jsx
import { useState, useEffect, SetStateAction} from "react";

function Form(props: { addTask: (arg0: string) => void; }) {
    // variable and function to set variable
    const [name, setName] = useState("");  // initial value

    // updates the state variable everytime a key is pressed
    function handleChange(event: { target: { value: SetStateAction<string>; }; }) {
    setName(event.target.value);
    //console.log(name)
  }

  // addTask() is passed in props
  function handleSubmit(event: { preventDefault: () => void; }) {
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
