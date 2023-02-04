import React,{useState,createContext,useEffect} from "react";
import { auth, database, storage} from "../Config/index"; 
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { signInWithEmailAndPassword,signOut } from "firebase/auth";
import { doc,setDoc,getDoc} from 'firebase/firestore'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export const AuthContext = createContext({})


export default function AuthProvider({children}){
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(false)  
    const [loadingPrivate,setLoadingPrivate] = useState(true)  
    const navigate = useNavigate()

//abaixo assim que abrir a aplicação ele vai recuperar os dados passados dentro do local storange e mandar para o user e manter o usuario logado mesmo se sair da página.

   useEffect(() => {
    async function loadingUser(){
      const storageUser = localStorage.getItem('@tickets')
      
      if(storageUser){
        setUser(JSON.parse(storageUser))
        setLoadingPrivate(false)
      }
      setLoadingPrivate(false)
    }

    loadingUser()
   },[]) 
   
   async function Logar(email,senha){  
    setLoading(true)
    await signInWithEmailAndPassword(auth,email,senha)
    .then( async (value) => {

      let uid = value.user.uid
      
      const docSnap = await getDoc(doc(database,'users',uid))

         let data = {
          uid: uid,
          nome: docSnap.data().nome,
          email:value.user.email,
          avatarUrl:docSnap.data().avatarUrl
 
        }

      setUser(data)
      LocalStorage(data)
      setLoading(false)
      toast.success('Seja Bem Vindo ao Sistema')
      navigate('/dashboard')
    
   })

   
   
    .catch((error) => {
      setLoading(false)
      toast.error('Ops tem algo de errado !')
    })


    }
  
   

    //função de cadastrar usuario no Autentication e no Database via SetDoc
    async function Cadastro(email,senha,nome){
        setLoading(true)
        await createUserWithEmailAndPassword(auth,email,senha)
        .then( async (value) => {
              let uid = value.user.uid
    
              await setDoc(doc(database, 'users', uid), {
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
                toast.success('Seja Bem Vindo ao Sistema')
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
  
    async function logOut(){
        await signOut(auth)
        localStorage.removeItem('@tickets')
        setUser(null)
    }
  return(
      <AuthContext.Provider value={{
         Logado:!!user,
         Logar,
         Cadastro,
         logOut,
         loading,
         loadingPrivate,
         user,
         LocalStorage,
         setUser
      }}>
          {children}
      </AuthContext.Provider>
  )
}
