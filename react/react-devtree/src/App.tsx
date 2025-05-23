import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from '@mui/material';
/*function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       
   <div className="container mt-5">
      <h1 className="text-primary">Hola, Bootstrap en React</h1>
      <button className="btn btn-success">Click</button>
    </div>
 
    </>
  )
}*/
function App() {
  return <Button variant="contained">Hola MUI</Button>;
}

export default App
