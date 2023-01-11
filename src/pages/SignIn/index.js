import React,{useState,useContext} from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../Context/auth';
import { Link } from 'react-router-dom';
import './estilos.css'

import Logo from '../../Assets/Logo_maior.png'
export default function SignIn() {

    const [email,setEmail] = useState('')
    const [senha,setSenha] = useState('')
    const {Logar} = useContext(AuthContext)  
   
    function loga(e){
        e.preventDefault()
        if(email !== '' && senha !== ''){
            Logar(email,senha)
        }
    }

 return (
   <div className='Conteiner__Center'>
     <div className='Conteiner__Login'>
        <div className='Login__Area'>
          <img className='Img__Login' src={Logo} alt="logo do sistema de chamados"/>
        </div>

        <form className='Formulario' onSubmit={loga}>
          <h1 className='Titulo__Formulario'>Entrar</h1>
          <input 
          value={email}
          type={'text'} 
          className='Input'
          placeholder="Digite seu Email"
          onChange={(text) => setEmail(text.target.value)}
          />
    
          <input  
          value={senha}
          type={'password'} 
          className='Input'
          placeholder="Digite seu Senha"
          onChange={(text) => setSenha(text.target.value)} />
            
        <button
          value="Acessar"
          type={'submit'}
          className='Botao'
        >Entrar</button>
        </form>
        <Link className="btn__CriarConta" to='/registro'>Criar uma Conta</Link>
     </div>
   </div>
  );
}