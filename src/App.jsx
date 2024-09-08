import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { useState, useRef, useEffect } from "react";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

// the function that main calls
function App(props) {
  // props = DATA from main.jsx
  // <App tasks={DATA} />
  // console.log(props)
  const [tasks, setTasks] = useState(props.tasks);  // state variable is a list
  const [filter, setFilter] = useState("All");  // All, Active or Completed

  // map takes an array and returns a different array
  // (task) => task.name this is a function
  // map each task to a function that returns Todo object
  // turns DATA from main.jsx into Todo objects
  const taskList = tasks
    .filter(FILTER_MAP[filter])  // All, Active or Completed
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    )
  );

  //
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}  // filter is state variable
      setFilter={setFilter}  // callback function
    />
  ));


  // Here, we define an updatedTasks constant that maps over the
  // original tasks array. If the task's id property matches the
  // id provided to the function, we use object spread syntax to
  // create a new object, and toggle the completed property of
  // that object before returning it. If it doesn't match,
  // we return the original object.
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    }); // map ends here
    console.log(updatedTasks)
    setTasks(updatedTasks);  // new list with one item toggled
  }

  function addTask(name) {
    console.log('tasks', tasks)
    const lastItem = tasks[tasks.length - 1];
    console.log('lastItem', lastItem)
    const newTask = { id: lastItem['id'] + 1, name, completed: false };
    setTasks([...tasks, newTask]);  // spread syntax
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // Copy the task and update its name
        return { ...task, name: newName };
      }
      // Return the original task if it's not the edited task
      return task;
    });
    setTasks(editedTaskList);
  }

  // map instead of for loop
  const nums = [1, 2, 3, 4]
  const tempList = nums?.map((num) => (num *= num));  // single line no braces or return
  const sqrOfSqr = nums?.map((num) => {
    num *= num
    num *= num
    return num
  });  // multiline must use braces and return

  // console.log(tempList)
  // console.log(sqrOfSqr)

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;
  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length < prevTaskLength) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <div className="todoapp stack-large">
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef} >{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;
