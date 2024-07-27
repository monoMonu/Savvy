import React from "react"
import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from 'react-router-dom'
import { LogInPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { useAuth } from "./context/authContext/useAuth";
import { HomePage } from "./pages/home";
import {PayTogether} from "./pages/PayTogether";
import GoalsPage from "./pages/goalList";

function App() {

  const router = createBrowserRouter(
     createRoutesFromElements(
        <Route errorElement={<>404 Page not found</>}>
           <Route
              path='/'
              element={<HomePage />} // Landing page
           />

           <Route 
              path='/login' 
              element={<LogInPage />} 
           />

           <Route 
              path='/register' 
              element={<RegisterPage />} 
           />
           <Route 
              path='/home' 
              element={<HomePage />} 
           />
           <Route
               path='/PayTogether'
               element={<PayTogether/>}
            />
            <Route
               path='/goalList'
               element={<GoalsPage/>}
            />
        </Route>
     )
  );

  return (
     <>
        <RouterProvider router={router} />
     </>
  )
}

function ProtectedRoute({children}){

  const {isAuthenticated} = useAuth();

  if(!isAuthenticated) 
    return <Navigate to="/login" replace />
  return children;

}

export default App
