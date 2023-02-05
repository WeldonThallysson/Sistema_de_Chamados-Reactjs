import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Context/auth";
import { database } from "../../Config/index";
import { addDoc,collection, getDocs, getDoc, updateDoc,doc} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Header from "../../Components/Header";
import Title from "../../Components/Title";
import { FiPlusCircle } from "react-icons/fi";
import "./new.css";
import { toast } from "react-toastify";

export default function New() {
  /*abaixo eu criei as variaveis que vão receber os dados e tbm uma apenas pra fazer uma condinção ternária*/
  /*clientes recebe um array de objetos que vai vir do firebase database através de uma requisição com o metodo getdocs indicando que é uma collection que ta puxando do endereço database assim que abrir a tela New usando o useEffect*/

  /*O selecionado vai começar com zero pq ele vai ser o value do select */

  const {user} = useContext(AuthContext);
  const {id} = useParams()
  const [clientes, setClientes] = useState([]);
  const [selecionado, setSelecionado] = useState(0);
  const [carregarusuario, setCarregarUsuario] = useState(true);
  const [assunto, setAssunto] = useState("Suporte");
  const [status, setStatus] = useState("");
  const [complemento, setComplemento] = useState("");
  const [editarchamado,setEditarChamado] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
  
    async function LoadCustumer() {
      const query = await getDocs(collection(database, "custumers"))
        .then((snapshot) => {
          let lista = [];
          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              nome: doc.data().nome,
            });

            if (snapshot.docs.size === 0) {
              setClientes([{ id: 1, nome: "Freela" }]);
              setCarregarUsuario(false);
              return;
            } 
            
            
            if(id){
              LoadId(lista)
             
           }

            setClientes(lista);
            setCarregarUsuario(false);

          
          });
        })
        .catch(() => {
          setCarregarUsuario(false);
        });
    }
    LoadCustumer();
  }, [id]);



  async function LoadId(lista){
     
    const docSnap = await getDoc(doc(database,"chamados", id))

    .then((snapshot) => {   
      
      let index = lista.findIndex(item => item.id === snapshot.data().clienteId);
      setSelecionado(index);
      setAssunto(snapshot.data().assunto);
      setComplemento(snapshot.data().complemento);
      setStatus(snapshot.data().status);
      setEditarChamado(true);

    })   
    .catch((error) => {
      console.log(error)
      setEditarChamado(false)
    })

  }

  function handleOptionChange(e) {
    setStatus(e.target.value);
    console.log(e.target.value);
  }

  function handleSelect(e) {
    setAssunto(e.target.value);
    console.log(e.target.value);
  }

  function seletor(e) {
    setSelecionado(e.target.value);
  }

  async function registrar(e){
    e.preventDefault();
    if(editarchamado){
      const docSnap = await updateDoc(doc(database,"chamados", id),{  
       cliente: clientes[selecionado].nome,
       clienteId: clientes[selecionado].id,
       assunto: assunto,
       complemento: complemento,
       status: status,
       userUid: user.uid,     
       })
       .then(() => {
       toast.success("Chamado atualizado com sucesso");
       setComplemento("");
       setAssunto("Suporte");
       setSelecionado(0);
       setStatus("");
       navigate('/dashboard');
      })
       return;
      }
    
    await addDoc(collection(database,"chamados"),{
      created: new Date(),
      cliente: clientes[selecionado].nome,
      clienteId: clientes[selecionado].id,
      assunto: assunto,
      complemento: complemento,
      status: status,
      userUid: user.uid

    })
    .then(() => {
      toast.success("Chamado Registrado");
      setComplemento("");
      setAssunto("Suporte");
      setSelecionado(0);
      setStatus("")

    })
    .catch(() => {
      toast.dismiss('Ops! erro ao registrar.')
    })

  }
  return (
    <div>
      <Header />

      <div className="Content">
        <Title nome={id ? "Editando Chamado" : "Novo Chamado"}>
          <FiPlusCircle size={25} color="black" />
        </Title>
        <div className="Conteudo__Formulario">

          <form className="Formulario__Principal" onSubmit={registrar}>
            <label>Clientes</label>
            {carregarusuario ? (
              <input type="text" disabled={true} value="Carregando..."></input>
            ) : (
              <select value={selecionado} onChange={seletor}>
                {clientes.map((item, index) => {
                  return (
                    <option key={index} value={index}>
                      {item.nome}
                    </option>
                  );
                })}
              </select>
            )}

            <label>Assuntos</label>
            <select value={assunto} onChange={handleSelect}>
              <option key={1} value={"suporte"}>
                Suporte
              </option>
              <option key={2} value={"visita tecnica"}>
                Visita Técnica
              </option>
              <option key={3} value={"Finançeiro"}>
                Finançeiro
              </option>
            </select>

            <label>Status</label>
            <div className="Status">
              <input
                type="radio"
                name="radio"
                checked={status === "Aberto"}
                onChange={handleOptionChange}
                value="Aberto"
              />
              <span>Em Aberto</span>

              <input
                type="radio"
                name="radio"
                onChange={handleOptionChange}
                checked={status === "Progresso"}
                value="Progresso"
              />
              <span>Progresso</span>

              <input
                type="radio"
                name="radio"
                onChange={handleOptionChange}
                checked={status === "Atendido"}
                value="Atendido"
              />
              <span>Atendido</span>
            </div>

            <label>Complemento</label>
            <textarea
              type="text"
              value={complemento}
              onChange={(text) => setComplemento(text.target.value)}
              placeholder="descreva seu problema(Opcional)"
            />

            <button type="submit">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
