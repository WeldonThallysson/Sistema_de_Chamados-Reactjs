import React,{useState,useContext} from 'react';
import { AuthContext } from '../../Context/auth';
import Logo from '../../Assets/Logo_maior.png';
import { Link } from 'react-router-dom';

import './estilos.css'

export default function SignUp() {
  const [nome,setNome] = useState('');
  const [email,setEmail] = useState('');
  const [senha,setSenha] = useState('');
  
  const { Cadastro,loading } = useContext(AuthContext)

  async function cadastrar(e){
    e.preventDefault()

    if(nome !== '' &&  email !== '' && senha !== ''){
       await Cadastro(email,senha,nome)


    } else{
      alert('Por favor verifique os campos de texto')
    }

  }


return (
 <div className='Conteiner__Center'>
   <div className='Conteiner__Login'>
      <div className='Login__Area'>
        <img className='Img__Login' src={Logo} alt="logo do sistema de chamados"/>
      </div>

      <form className='Formulario' onSubmit={cadastrar}>
        <h1 className='Titulo__Formulario'>Nova Conta</h1>
        <input 
        value={nome}
        type={'text'} 
        className='Input'
        placeholder="Digite seu Nome"
        onChange={(text) => setNome(text.target.value)}
        />
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
        
      >{loading ? 'Caregando...': 'Cadastrar'}</button>
      </form>
      <Link className="btn__CriarConta" to='/'>Já tem uma Conta?Faça Login</Link>
   </div>
 </div>
);
}