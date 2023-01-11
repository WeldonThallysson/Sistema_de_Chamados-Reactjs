import React,{useState,createContext} from "react";
import { auth,database } from "../Config/index"; 
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {doc,setDoc} from 'firebase/firestore'
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext({})


export default function AuthProvider({children}){
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(false)  
    const navigate = useNavigate()

    function Logar(email,senha){
      console.log(email)
      console.log(senha)  
      alert('logado com sucesso')
    }

    //função de cadastrar usuario no Autentication e no Database via SetDoc
    async function Cadastro(email,senha,nome){
        setLoading(true)
        await createUserWithEmailAndPassword(auth,email,senha)
        .then( async(value) => {
              let uid = value.user.uid
    
              await setDoc(doc(database, 'users', uid),{
                nome: nome,
                avatarUrl: null,
              })

              .then(() => {
                let data = {
                  uid: uid,
                  nome: nome,
                  email: value.user.email,
                  avatarUrl: null
                }
                setUser(data);
                LocalStorage(data)
                setLoading(false)           
                navigate('/dashboard')
              })
        })
        .catch((error) => {
          alert('erro ao criar conta')
        })
     
    }

    function LocalStorage(data){
      localStorage.setItem('@tickets', JSON.stringify(data))
    }
  
  return(
      <AuthContext.Provider value={{
         Logado:!!user,
         Logar,
         Cadastro,
         loading,
         user
        
      }}>
          {children}
      </AuthContext.Provider>
  )

}