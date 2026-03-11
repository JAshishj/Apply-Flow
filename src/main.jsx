import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import { AppProvider } from './Context/Application_Context';  
import './index.css'
import Dashboard from './Pages/Dashboard';
import Applications from './Pages/Applications';

const router = createBrowserRouter([
  { path: "/", element: <Dashboard /> },
  { path: "/Applications", element: <Applications /> },
  {path: "*", element: <div className="text-white text-3xl text-center mt-20">404 - Page Not Found</div> }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>,
)
