import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Rotas from './Rotas/index'
import AuthProvider from "./Context/auth";
import 'react-toastify/dist/ReactToastify.css';
import Header from "./Components/Header";

function App() {
  return (
    <BrowserRouter>
   
     <AuthProvider>
     
        <ToastContainer autoClose={3000}/> 
    
          <Rotas/>
        
     </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
