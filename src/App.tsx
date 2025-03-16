import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ResponsiveAppBar from './components/nav-bar'
import { Button } from '@mui/material'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Outlet></Outlet>
    </>
  )
}

export default App
