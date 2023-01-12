import * as C from "./style.js";
import {Modal} from '../Modal'

export const TableRow = ({
  id,
  nome,
  sexo,
  phone,
  maritalStatus,
  disciplina,
  birth,
  deleteProfessor,
  updateProfessor
}) => {
  return (
    <C.Container>
      <C.TableData>{id}</C.TableData>
      <C.TableData>{nome}</C.TableData>
      <C.TableData>{sexo}</C.TableData>
      <C.TableData>{phone}</C.TableData>
      <C.TableData>{maritalStatus}</C.TableData>
      <C.TableData>{disciplina}</C.TableData>
      <C.TableData>
        {birth
          .substring(0, 10)
          .split("-")
          .reverse()
          .join("-")
          .replaceAll("-", "/")}
      </C.TableData>
      <C.TableData>
        <div style={{display: 'flex', gap: '5px', fontWeight: 600}}>
          <Modal 
            updateProfessor={updateProfessor}
            professor={{
              id,
              tx_nome: nome,
              tx_telefone: phone,
              leciona: disciplina,
              dt_nascimento: birth,
              tx_sexo: sexo,
              tx_estado_civil: maritalStatus,
            }}
          />
          <C.Button onClick={() => deleteProfessor(id)} theme="delete">Delete</C.Button>
        </div>
      </C.TableData>
    </C.Container>
  );
};
