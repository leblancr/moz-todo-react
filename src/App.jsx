import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { useState } from "react";

function App(props) {
  // props = DATA from main.jsx
  // <App tasks={DATA} />
  // console.log(props)
  const [tasks, setTasks] = useState(props.tasks);  // list state variable

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
    setTasks(updatedTasks);  // new list with one item toggled
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  // map takes an array and returns a different array
  // (task) => task.name this is a function
  // map each task to a function that returns Todo object
  const taskList = tasks?.map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
    />
    )
  );

  function addTask(name) {
    console.log('tasks', tasks)
    const lastItem = tasks[tasks.length - 1];
    console.log('lastItem', lastItem)
    const newTask = { id: lastItem['id'] + 1, name, completed: false };
    setTasks([...tasks, newTask]);  // spread syntax
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

  return (
    <div className="todoapp stack-large">
      <h1>Todo</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">{headingText}</h2>
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
