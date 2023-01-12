import * as C from './App.style.js'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "./components/Modal";
import {TableRow} from "./components/TableRow"
// import { ReactPaginateProps } from "react-paginate";

function App() {
  // state to hold the list of professor
  const [professor, setprofessor] = useState([]);

  const [formName, setFormName] = useState("");
  const [formSexo, setFormSexo] = useState("m");
  const [formEsCivil, setFormEsCivil] = useState("s");
  const [formNascimento, setFormNascimento] = useState("");
  const [formTelefone, setFormTelefone] = useState("");
  const [formDisciplina, setFormDisciplina] = useState("");
  const [count, setCount] = useState(0);

  const length = 9999999999;

  const loadProfessor = (index = 0) => {
    axios
      .get("http://104.248.0.74:3000/", { params: { length, index } })
      .then((response) => {
        setprofessor(response.data.professor);
        setCount(response.data.count);
      })
      .catch((error) => console.error(error));
  };


  useEffect(() => loadProfessor, []);

  const addProfessor = () => {
    axios
      .post("http://104.248.0.74:3000/", {
        tx_nome: formName,
        tx_sexo: formSexo,
        tx_estado_civil: formEsCivil,
        dt_nascimento: formNascimento,
        tx_telefone: formTelefone,
        leciona: formDisciplina,
      })
      .then((response) => {
        setprofessor([...professor, response.data]);
      })
      .catch((error) => console.error(error));
  };

  const updateProfessor = (id, updatedProfessor) => {
    axios
      .put(`http://104.248.0.74:3000/${id}`, updatedProfessor)
      .then((response) => {
        const updatedprofessor = professor.map((professor) => {
          if (professor.id_professor === id) {
            return response.data;
          }
          return professor;
        });
        setprofessor(updatedprofessor);
      })
      .catch((error) => console.error(error));
  };

  const deleteProfessor = (id) => {
    if(window.confirm('Voce deseja alterar esse dado?')) {
      axios
        .delete(`http://104.248.0.74:3000/${id}`)
        .then((response) => {
          const updatedprofessor = professor.filter(
            (professor) => professor.id_professor !== id
          );
          setprofessor(updatedprofessor);
        })
        .catch((error) => console.error(error));
    }
  };

  const handleChangeName = (e) => {
    setFormName(e.target.value);
  };

  const handleChangeTelefone = (e) => {
    setFormTelefone(e.target.value);
  };

  const handleChangeEscivil = (e) => {
    setFormEsCivil(e.target.value);
  };

  const handleChangeDisplina = (e) => {
    setFormDisciplina(e.target.value);
  };

  const handleChangeDataNascimento = (e) => {
    setFormNascimento(e.target.value);
  };

  const handleChangeSexo = (e) => {
    setFormSexo(e.target.value);
  };

  return (
    <div>
      <h1>Professores</h1>
      <form action="">
        <div>
          <label htmlFor="Nome" />
          <input type="text" placeholder="Nome" onChange={handleChangeName} />
        </div>
        <div>
          <select name="Sexo" id="Sexo" onChange={handleChangeSexo}>
            <option value="m" label="Masculino">
              m
            </option>
            <option value="f" label="Feminino">
              f
            </option>
          </select>
        </div>
        <div>
          <input
            type="text"
            placeholder="Telefone"
            onChange={handleChangeTelefone}
          />
        </div>
        <div>
          <select
            name="Estado civil"
            id="Estado Civil"
            onChange={handleChangeEscivil}
          >
            <option value="s" label="Solteiro">
              m
            </option>
            <option value="c" label="Casado">
              f
            </option>
          </select>
        </div>
        <div>
          <input
            type="text"
            placeholder="Disciplina"
            onChange={handleChangeDisplina}
          />
        </div>
        <div>
          <input
            type="date"
            placeholder="Nascimento"
            onChange={handleChangeDataNascimento}
          />
        </div>
      </form>
      <button onClick={addProfessor}>Adicionar</button>

      <C.ContainerTable>
        <C.Table>
          <thead>
            <tr>
              <th>id</th>
              <th>Nome</th>
              <th>Sexo</th>
              <th>Telefone</th>
              <th>Estado Civil</th>
              <th>Disciplina</th>
              <th>Nascimento</th>
            </tr>
          </thead>
          <C.tBody>
            {professor.map((professor) => (
              <TableRow 
                key={professor.id_professor} 
                id={professor.id_professor}
                nome={professor.tx_nome}
                sexo={professor.tx_sexo}
                birth={professor.dt_nascimento}
                disciplina={professor.leciona}
                maritalStatus={professor.tx_estado_civil}
                phone={professor.tx_telefone}
                deleteProfessor={deleteProfessor}
                updateProfessor={updateProfessor}
              />
            ))}
          </C.tBody>
          {/* <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={loadProfessor(professor.length)}
            pageRangeDisplayed={length}
            pageCount={count}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
          /> */}
        </C.Table>
      </C.ContainerTable>
    </div>
  );
}

export default App;
