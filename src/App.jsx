import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { useState } from "react";

function App(props) {
  // props = DATA from main.jsx
  // <App tasks={DATA} />
  // console.log(props)
  const [tasks, setTasks] = useState(props.tasks);
  
  // map takes an array and returns a different array
  // (task) => task.name this is a function
  // map each task to a function that returns Todo object
  const taskList = tasks?.map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
    />
    )
  );

  function addTask(name) {
    console.log('tasks', tasks)
    const lastItem = tasks[tasks.length - 1];
    const lastId = tasks[tasks.length - 1]['id'];
   
    console.log('lastItem', lastItem)
    console.log('lastId', lastId)
    
    const newTask = { id: lastId + 1, name, completed: false };
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
  