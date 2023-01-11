import React from "react";
import { BrowserRouter } from "react-router-dom";
import Rotas from './Rotas/index'
import AuthProvider from "./Context/auth";
function App() {
  return (
    <BrowserRouter>
     <AuthProvider>
      <Rotas/>
     </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
