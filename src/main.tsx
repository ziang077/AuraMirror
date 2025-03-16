import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import { CssBaseline, ThemeProvider } from '@mui/material'
import { darkTheme } from './util/theme.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Account from './pages/Account.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "account",
        element: <Account />
      }
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode> 
    <ThemeProvider theme={darkTheme}>
      <CssBaseline></CssBaseline>
      <RouterProvider router={router} />
    </ThemeProvider>


  </React.StrictMode>,
)
