import React,{useState,useEffect,useContext} from 'react';
import Logo from '../../Assets/avatar.png'
import {Link} from 'react-router-dom'
import {AuthContext} from '../../Context/auth'
import {FiHome,FiUser,FiSettings} from 'react-icons/fi'
import './Header.css'

export default function Header(props) {
        
    const {user} = useContext(AuthContext);

  
 return (
   <div className='Side__Bar'>
        <div className='Side__BarLogo'>
         <img className="Logo__SideBar" src={user.avatarUrl === null ? Logo : user.avatarUrl } alt='logo do avatar'/>
        </div>

        <Link className='Profile__btn' to="/dashboard">
            <FiHome color='#FFF' size={24}/>
            Chamados
        </Link>
        
        <Link className='Profile__btn' to="/custumers">
            <FiUser color='#FFF' size={24}/>
            Clientes
        </Link>
        
        <Link className='Profile__btn' to="/profile">
            <FiSettings color='#FFF' size={24}/>
            Perfil
        </Link>

   </div>
  );
}