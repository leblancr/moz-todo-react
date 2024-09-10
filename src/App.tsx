// App.tsx
// @ts-ignore
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

// Define the Task type
interface Task {
  _id: string; // Changed to _id for MongoDB compatibility
  name: string;
  completed: boolean;
}

interface AppProps {
  tasks: Task[];
}

const FILTER_MAP = {
  All: () => true,
  Active: (task: { completed: boolean; }) => !task.completed,
  Completed: (task: { completed: boolean; }) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

// the function that main calls
const App: React.FC<AppProps> = ({ tasks: initialTasks }) => {
  // props = DATA from main.jsx
  // <App tasks={DATA} />
  // console.log(props)
  // const [tasks, setTasks] = useState(props.tasks);  // state variable is a list
  // const [filter, setFilter] = useState("All");  // All, Active or Completed
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<string>("All");

  // Here, we define an updatedTasks constant that maps over the
  // original tasks array. If the task's id property matches the
  // id provided to the function, we use object spread syntax to
  // create a new object, and toggle the completed property of
  // that object before returning it. If it doesn't match,
  // we return the original object.
  const toggleTaskCompleted = async (id: string) => {
    try {
      const task = tasks.find(task => task._id === id);
      if (!task) return;

      const updatedTask = { ...task, completed: !task.completed };
      await axios.put(`/tasks/${id}`, updatedTask);

      setTasks(tasks.map(task =>
        task._id === id ? updatedTask : task
      ));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const addTask = async (name: string) => {
    try {
      const response = await axios.post('/tasks', {
        name,
        completed: false
      });

      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const editTask = async (id: string, newName: string) => {
    try {
      const updatedTask = { name: newName };
      await axios.put(`/tasks/${id}`, updatedTask);

      setTasks(tasks.map(task =>
        task._id === id ? { ...task, name: newName } : task
      ));
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  // Fetch tasks when component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  // map takes an array and returns a different array
  // (task) => task.name this is a function
  // map each task to a function that returns Todo object
  // turns DATA from main.jsx into Todo objects
  const taskList = tasks
    .filter(FILTER_MAP[filter])  // All, Active or Completed
    .map((task: { _id: any; name: any; completed: any; }) => (
      <Todo
        id={task._id}
        name={task.name}
        completed={task.completed}
        key={task._id}
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

  //
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
