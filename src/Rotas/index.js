import React from 'react';
import { Routes,Route } from 'react-router-dom';
import SignIn from '../pages/SignIn/index';
import SignUp from '../pages/SignUp/index';
import Dashboard from '../pages/Dashboard';
import Custumers from '../pages/Custumers';
import Profile from '../pages/Profile'
import Private from './Private';
import New from '../pages/New';

export default function Rotas() {
 return (

    <Routes>
        <Route path='/' element={<SignIn/>}/>
        <Route path='/registro' element={<SignUp/>}/>
        <Route path='/dashboard' element={<Private><Dashboard/></Private>}/>
        <Route path='/profile' element={<Private><Profile/></Private>}/>
        <Route path='/custumers' element={<Private><Custumers/></Private>}/>
        <Route path='/new' element={<Private><New/></Private>}/>
     </Routes>

  );
}