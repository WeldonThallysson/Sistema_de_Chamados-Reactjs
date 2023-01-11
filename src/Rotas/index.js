import React from 'react';
import { Routes,Route } from 'react-router-dom';
import SignIn from '../pages/SignIn/index';
import SignUp from '../pages/SignUp/index';
import Dashboard from '../pages/Dashboard';

export default function Rotas() {
 return (

    <Routes>
        <Route path='/' element={<SignIn/>}/>
        <Route path='/registro' element={<SignUp/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>

  );
}