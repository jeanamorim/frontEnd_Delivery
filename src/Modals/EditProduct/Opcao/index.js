/* eslint-disable no-shadow */
/* eslint-disable no-sequences */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button, Modal, Table, Icon } from 'semantic-ui-react';
import DeletarOpcao from '../DeletarOpcao';
import NewOpcao from '../ModalNovaOpcao';
import Editar from '../ModalEditarOpcao';

function ModalExampleModal({
  visualizar,
  setVisualizar,
  item,
  variacao,
  setRender,
  render,
}) {
  const [deletar, setDeletar] = useState(false);
  const [newOpcao, setNewOpcao] = useState(false);
  const [editar, setEditar] = useState(false);
  const [itemOp, setItemOp] = useState();
  const [itemEdit, setItemEdit] = useState();

  function deletarOpcao(op) {
    setItemOp(op);
    setDeletar(true);
  }
  function editarOpcao(edit) {
    setItemEdit(edit);
    setEditar(true);
  }
  function novaOpcao() {
    setNewOpcao(true);
  }

  return (
    <>
      <Modal
        onClose={() => setVisualizar(false)}
        onOpen={() => setVisualizar(true)}
        open={visualizar}
      >
        <Modal.Header style={{ background: '#F4A460', color: '#fff' }}>
          Opções
        </Modal.Header>
        <Modal.Content image>
          <Modal.Description style={{ marginLeft: 10 }}>
            <div>
              <Button positive onClick={novaOpcao}>
                + Nova opção
              </Button>
            </div>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Nome</Table.HeaderCell>
                  <Table.HeaderCell>Valor</Table.HeaderCell>
                  <Table.HeaderCell>status</Table.HeaderCell>
                  <Table.HeaderCell>Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {item.opcao.map(item => (
                  <Table.Row>
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell>R$ {item.price}</Table.Cell>
                    <Table.Cell>{item.status}</Table.Cell>

                    <Table.Cell>
                      <Button
                        icon
                        style={{ background: '#999' }}
                        title="Editar"
                        onClick={() => editarOpcao(item)}
                      >
                        <Icon name="edit" style={{ color: '#fff' }} />
                      </Button>
                      <Button
                        icon
                        color="red"
                        title="Excluir"
                        onClick={() => deletarOpcao(item)}
                      >
                        <Icon name="delete" style={{ color: '#fff' }} />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Modal.Description>
        </Modal.Content>

        <Modal.Actions>
          <Button color="black" onClick={() => setVisualizar(false)}>
            Sair
          </Button>
        </Modal.Actions>
      </Modal>
      {deletar ? (
        <DeletarOpcao
          deletar={deletar}
          setDeletar={setDeletar}
          item={itemOp}
          setRender={setRender}
          render={render}
          setVisualizar={setVisualizar}
        />
      ) : null}
      {editar ? (
        <Editar
          editar={editar}
          setEditar={setEditar}
          item={itemEdit}
          setRender={setRender}
          render={render}
          setVisualizar={setVisualizar}
        />
      ) : null}
      {newOpcao ? (
        <NewOpcao
          idVariacao={item.id}
          variacao={variacao}
          newOpcao={newOpcao}
          setNewOpcao={setNewOpcao}
          setRender={setRender}
          render={render}
          setVisualizar={setVisualizar}
        />
      ) : null}
    </>
  );
}

export default ModalExampleModal;
