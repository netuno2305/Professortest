import React, { useState, useEffect } from "react";

export const Modal = ({ updateProfessor, professor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    discipline: "",
    data: "",
    sexo: "",
    esCivil: "",
  });

  function openModal() {
    console.log({
      professor,
    });
    setFormData({
      tx_nome: professor.tx_nome,
      tx_telefone: professor.tx_telefone,
      leciona: professor.leciona,
      dt_nascimento: professor.dt_nascimento,
      tx_sexo: professor.tx_sexo,
      tx_estado_civil: professor.tx_estado_civil,
    });
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    // aqui você pode enviar os dados do formulário para o seu back-end
    updateProfessor(professor.id, formData);
    setIsOpen(false);
  }

  const Container = {
    position: "fixed",
    zIndex: 999,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba( 0, 0, 0, 0.5 )",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const Content = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  };

  return (
    <div>
      <button
        style={{
          padding: "5px 10px",
          backgroundColor: "#5BC0DE",
          color: "#fff",
          border: 0,
        }}
        onClick={openModal}
      >
        Editar
      </button>
      {isOpen && (
        <div style={Container} className="modal">
          <div className="modal-content" style={Content}>
            <form onSubmit={handleSubmit}>
              <label>
                Nome:
                <input
                  type="text"
                  name="tx_nome"
                  value={formData.tx_nome}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Telefone:
                <input
                  type="text"
                  name="tx_telefone"
                  value={formData.tx_telefone}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Disciplina:
                <input
                  type="text"
                  name="leciona"
                  value={formData.leciona}
                  onChange={handleChange}
                />
              </label>

              <div>
                <input type="date" placeholder="Nascimento" />
              </div>

              <div>
                <select
                  name="tx_sexo"
                  id="Sexo"
                  value={formData.tx_sexo}
                  onChange={handleChange}
                >
                  <option value="m" label="Masculino">
                    m
                  </option>
                  <option value="f" label="Feminino">
                    f
                  </option>
                </select>
              </div>

              <div>
                <select
                  name="tx_estado_civil"
                  id="Estado Civil"
                  value={formData.tx_estado_civil}
                  onChange={handleChange}
                >
                  <option value="s" label="Solteiro">
                    m
                  </option>
                  <option value="c" label="Casado">
                    f
                  </option>
                </select>
              </div>
              <br />
              <button type="submit">Salvar</button>
              <button onClick={closeModal}>Cancelar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
