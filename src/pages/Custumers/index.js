
import React,{useState,useEffect,useContext} from 'react';
import { AuthContext } from '../../Context/auth';
import Title from '../../Components/Title';
import Header from '../../Components/Header';
import { FiUser } from 'react-icons/fi';
import { database } from '../../Config';
import { addDoc,collection,getDoc,doc } from 'firebase/firestore';
import {toast} from 'react-toastify'



export default function Custumers() {
  const {user,logOut} = useContext(AuthContext)

  const [nome,setNome] = useState('')
  const [cnpj,setCnpj] = useState('')
  const [endereco,setEndereco] = useState('')


     async function handleRegister(e){
        e.preventDefault()

        if(nome !== '' && cnpj !== '' && endereco !== ''){

          await addDoc(collection(database,"custumers"),{
            nome: nome,
            cnpj: cnpj,
            endereco: endereco
          }).then(() => {

                
           
                toast.success('Empresa Registrada com Sucesso')
                setNome('');
                setEndereco('');
                setCnpj('');
                 
                
           
          })

          .catch((error) => {
            toast.dismiss('Erro ao cadastrar empresa')
          })
          
        

        }else{
          toast.dismiss('Preencha os Campos de Texto')
        }

      } 





   return (
  
  <div>
    <Header/>

    <div className='Content'>
        <Title nome={'Clientes'}>
          <FiUser size={25} />
        </Title>

        <div className='Conteudo__Formulario'>
          <form className='Formulario__Principal' onSubmit={handleRegister}>
            <label className='form__Profile'>Nome da Empresa</label>
              <input type={'text'} value={nome} placeholder="Nome da empresa" onChange={(text) => setNome(text.target.value)}/>
              <label className='form__Profile'>CNPJ</label>
              <input type={'text'} value={cnpj} placeholder="CNPJ da empresa" onChange={(text) => setCnpj(text.target.value)}/>
              <label className='form__Profile'>Endereço</label>
              <input type={'text'} value={endereco} placeholder="Endereço da empresa" onChange={(text) => setEndereco(text.target.value)}/>

            <button type='submit'>Cadastrar</button>

          </form>



        </div>
    </div>
    
   </div>
  );
}