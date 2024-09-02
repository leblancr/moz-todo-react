import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const DATA = [
  { id: 0, name: "Eat", completed: true },
  { id: 1, name: "Sleep", completed: false },
  { id: 2, name: "Repeat", completed: false },
];

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App tasks={DATA} />
  </StrictMode>,
)
