
import React, {useState,useContext} from 'react';
import {FiSettings} from 'react-icons/fi'
import { AuthContext } from '../../Context/auth';
import Header from '../../Components/Header';
import Title from '../../Components/Title';
import Avatar from '../../Assets/avatar.png'
import { FiUpload } from 'react-icons/fi';
import './profile.css'
import {database,storage } from '../../Config/index';
import {doc,updateDoc} from 'firebase/firestore'
import { toast } from 'react-toastify';
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage'

export default function Profile() {
   
  const {user, LocalStorage, setUser, logOut} = useContext(AuthContext)
  //no avatarUrl recebe aqui a url e no imageAvatar ele guarda o arquivo que vai mandar pro firebase
  const [avatarUrl,setAvatarUrl] = useState(user && user.avatarUrl)
  const [imageAvatar,setImageAvatar] = useState(null)
 
  const [email,setEmail] = useState(user && user.email)
  const [nome, setNome] = useState(user && user.nome)

  


   function Mudar(e){
    if(e.target.files[0]){
      const imagem = e.target.files[0];
      
      if(imagem.type === 'image/jpeg' || imagem.type === 'image/png'){
          setImageAvatar(imagem)
          setAvatarUrl(URL.createObjectURL(imagem))
      }else{
        alert('envie um imagem do tipo Png ou JPEG')
        setImageAvatar(null);
        return;
      }

    }
   } 


   async function Salvar(e){
    e.preventDefault();
    
    // esse primeira condição é para mudar o nome do usuario
      if(imageAvatar === null && nome !== ''){
         await updateDoc(doc(database,"users", user.uid), {
          nome: nome,
         
         })
         .then(() => {
              let data = {
                ...user,
                nome:nome
              }
              setUser(data)
              LocalStorage(data)
              toast.success('Nome alterado com Sucesso')
         })
      }
      else if(nome !== '' && imageAvatar !== null){
        UploadDeTudo()


      }

   }

   async function UploadDeTudo(){

    const uid = user.uid;

    const uploadRef = ref(storage, `image/${uid}/${imageAvatar.name}`)

    const uploadTask = uploadBytes(uploadRef,imageAvatar)
    
    .then((snapshot) => {

      getDownloadURL(snapshot.ref)
      
      .then( async (downloadURL) => {
        let urlFoto = downloadURL;

        await updateDoc(doc(database,"users", user.uid), {
            avatarUrl: urlFoto,
            nome: nome
        })
         .then(() => {
            let data = {
              ...user,
              nome: nome,
              avatarUrl: urlFoto
            }
            setUser(data);
            LocalStorage(data);
            toast.success('Atualizado Com Sucesso')
        })

      })
    })
 }

   


  return (
   <div>
    <Header/>
    <div className='Content'>
      <Title nome={'Meu Perfil'}>
          <FiSettings size={25}/>
      </Title>

      <div className='Conteudo__Formulario'>
        <form className='Formulario__Principal' onSubmit={Salvar}>
          
          <label className='Label__Avatar'>
             <span>
                <FiUpload size={22} color={'#FFF'}/>
              </span>

              <input type='file' accept="image/*" onChange={Mudar} /><br/>
              {avatarUrl === null ? (
                <img src={Avatar} width={250} height={250}/>
                
                ) : (
                <img src={avatarUrl} width={250} height={250}/>      
                )}

          </label>

          <label>Nome</label>
          <input type={'text'} value={nome} onChange={(text) => setNome(text.target.value)}/>
          
          <label>Email</label>
           <input type={'email'} value={email} disabled={true}/>

          <button className='botao' type='submit'>Salvar</button>
        </form>


      </div>

      <div className='Conteiner__Formulario'>
        <button className='Btn__Sair' onClick={() => {logOut()}}>Sair</button>
      </div>








    </div>
  
   </div>
  );
}