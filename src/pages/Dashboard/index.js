import React, { useState, useEffect } from "react";
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from "react-icons/fi";
import Header from "../../Components/Header";
import Title from "../../Components/Title";
import { Link } from "react-router-dom";
import "./dashboard.css";
import { format } from "date-fns";
import {
  getDocs,
  orderBy,
  limit,
  startAfter,
  collection,
  query,
  updateDoc,
} from "firebase/firestore";
import { database } from "../../Config/index";
import { id } from "date-fns/locale";

export default function Dashboard() {
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vazio, setVazio] = useState(false);

  const [lastDocs, setLastDocs] = useState([]);
  const [carregarMais, setCarregarMais] = useState(false);

  useEffect(() => {
    async function chamadosCadastrados() {
      const q = query(
        collection(database, "chamados"),
        orderBy("created", "desc"),
        limit(5)
      );
      const querySnapshot = await getDocs(q).then((snapshot) => {
        let lista = [];
        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            assunto: doc.data().assunto,
            status: doc.data().status,
            cliente: doc.data().cliente,
            created: doc.data().created,
            createdFormatado: format(doc.data().created.toDate(), "dd/MM/yyyy"),
            clienteUid: doc.data().clienteUid,
            complemento: doc.data().complemento,
          });
        });
        setChamados((chamados) => [...chamados, ...lista]);
        console.log(lista);
      });

      setLoading(false);
      setCarregarMais(false);
    }

    chamadosCadastrados();

    return () => {};
  }, []);

  async function mostrarMais() {
    setCarregarMais(true);
    const q = query(
      collection(database, "chamados"),
      orderBy("created", "desc"),
      startAfter(lastDocs),
      limit(1)
    );
    const maisChamados = await getDocs(q).then((snapshot) => {
      let lista = [];
      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          assunto: doc.data().assunto,
          status: doc.data().status,
          cliente: doc.data().cliente,
          created: doc.data().created,
          createdFormatado: format(doc.data().created.toDate(), "dd/MM/yyyy"),
          clienteUid: doc.data().clienteUid,
          complemento: doc.data().complemento,
        });
      });

      const lastDoc = snapshot.docs[snapshot.docs.length - 1]; // pegando o ultimo item da lista
      setLastDocs(lastDoc);
      setChamados((chamados) => [...chamados, ...lista]);
      setCarregarMais(false)
      console.log(lista);
    });
  }
  //agora aqui  abaixo vai ficar nossa condição de carregando

  if (loading) {
    return (
      <div>
        <Header />
        <div className="Content">
          <Title nome={"Chamados"}>
            <FiMessageSquare size={25} />
          </Title>
          <div className="Conteudo__Formulario">
            <span>Buscando Chamados...</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Header />
      <div className="Content">
        <Title nome={"Chamados"}>
          <FiMessageSquare size={25} />
        </Title>
        <>
          {chamados.length === 0 ? (
            <div className="Conteudo__Formulario">
              <span className="Alerta__Chamado">
                Chamado registrado não encontrado...
              </span>
              <Link className="new" to={"/new"}>
                <FiPlus color={"#FFF"} size={25} />
                Novo Chamado
              </Link>
            </div>
          ) : (
            <>
              <Link className="new" to={"/new"}>
                <FiPlus color={"#FFF"} size={25} />
                Novo Chamado
              </Link>
              <table className="Tabela__Principal">
                <thead>
                  <tr>
                    <th scope="col">Clientes</th>
                    <th scope="col">Assunto</th>
                    <th scope="col">Status</th>
                    <th scope="col">Cadastrando em</th>
                    <th scope="col">#</th>
                  </tr>
                </thead>

                <tbody>
                  {chamados.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td data-label="Cliente">{item.cliente}</td>
                        <td data-label="Assunto">{item.assunto}</td>
                        <td data-label="Status">
                          <span
                            className="badge"
                            style={{
                              backgroundColor:
                                item.status === "Aberto" ? "#5cb85c" : "grey",
                            }}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td data-label="Cadastrado">{item.createdFormatado}</td>
                        <td data-label="#">
                          <button
                            className="action"
                            style={{ backgroundColor: "#3586f3" }}
                          >
                            <FiSearch color="#FFF" size={17} />
                          </button>
                          <button
                            className="action"
                            style={{ backgroundColor: "#f6a935" }}
                          >
                            <FiEdit2 color="#FFF" size={17} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {carregarMais && <h3>Buscando mais Chamados...</h3>}
              {!carregarMais && !vazio && (
                <button onClick={mostrarMais} className="btn__addMais">
                  Carregar mais...
                </button>
              )}
            </>
          )}
        </>
      </div>
    </div>
  );
}
