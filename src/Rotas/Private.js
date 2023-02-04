import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/auth";


export default function Private({children}){
   const {Logado,loadingPrivate} = useContext(AuthContext)
   
    if(loadingPrivate){
     return(
      <div></div>
      )
    }

    if(!Logado){
       return(
       <Navigate to={'/'}/>
       )
    }
    
    return children
}