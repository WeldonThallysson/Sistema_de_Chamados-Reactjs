import './modal.css'
import { FiX } from 'react-icons/fi'

export default function Modal({setAtiveModal,conteudo}){
    return(
        <div className="Conteiner__Modal">
           <div className='Conteudo__Modal'>
            <button className='close' onClick={() => setAtiveModal(!true) }>
               <FiX size={20} color="#FFF"/> Fechar        
            </button>

            <main>
                <h2>Detalhes do Chamado</h2>    
                <div className='row'>
                    <span>Clientes: <i>{conteudo.cliente}</i></span>
                </div>
                <div className='row'>
                    <span>Assunto: <i>{conteudo.assunto}</i></span>
                </div>
                <div className='row'>
                    <span>Cadastrado em: <i>{conteudo.createdFormatado}</i></span>
                </div>
                <div className='row'>
                    <span>Status: <i style={{color:'#FFF',backgroundColor: conteudo.status === "Aberto" ?"#5cb85c":"grey" }}>{conteudo.status}</i></span>
                </div>
               
                {conteudo.complemento !== '' && (
                 <>
                 <h3>Complemento</h3>
                  <p>{conteudo.complemento}</p>
                 </>
                  )}
                  

               

            </main>  
           </div>   
        </div>


    )

}