/* eslint-disable no-shadow */
/* eslint-disable no-sequences */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Button, Modal, Table, Icon } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import DeletarVariacao from '../DeletarVariacao';
import NewVariacao from '../ModalNovaVariacao';
import Editar from '../ModalEditeVariacao';
import Visualizar from '../Opcao';
import api from '../../../services/api';

function ModalExampleModal({ openVariacao, setOpenVariacao, product }) {
  const [variacao, setVariacao] = useState([]);
  const [newVariacao, setNewVariacao] = useState(false);
  const [deletar, setDeletar] = useState(false);
  const [editar, setEditar] = useState(false);
  const [visualizar, setVisualizar] = useState(false);
  const [item, setItem] = useState();
  const [itemVar, setItemVar] = useState();
  const [itemVisua, setItemVisual] = useState();

  useEffect(() => {
    async function loadOrder() {
      try {
        const response = await api.get(`productsEdit/${product}`);
        setVariacao(response.data[0].variacao);
      } catch (err) {
        if (err.response) {
          toast.error('Erro no servidor');
        } else {
          toast.error('Falha ao conectar com o servidor');
        }
      }
    }
    loadOrder();
  }, []);

  function deletarVariacao(itemV) {
    setItem(itemV);
    setDeletar(true);
  }
  function editarVariacao(edit) {
    setItemVar(edit);
    setEditar(true);
  }
  function visualizarOp(itemVi) {
    setItemVisual(itemVi);
    setVisualizar(true);
  }
  function novaVariacao() {
    setNewVariacao(true);
  }

  return (
    <>
      <Modal
        onClose={() => setOpenVariacao(false)}
        onOpen={() => setOpenVariacao(true)}
        open={openVariacao}
      >
        <Modal.Header style={{ background: '#F4A460', color: '#fff' }}>
          Variações
        </Modal.Header>
        <Modal.Content image>
          <Modal.Description style={{ marginLeft: 10 }}>
            <div>
              <Button positive onClick={novaVariacao}>
                + Nova variação
              </Button>
            </div>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Nome</Table.HeaderCell>
                  <Table.HeaderCell>Mínimo</Table.HeaderCell>
                  <Table.HeaderCell>Maxímo</Table.HeaderCell>
                  <Table.HeaderCell>Logíca</Table.HeaderCell>
                  <Table.HeaderCell> Qtd. Opção</Table.HeaderCell>
                  <Table.HeaderCell>Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {variacao.map(item => (
                  <Table.Row>
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell>{item.minimo}</Table.Cell>
                    <Table.Cell>{item.maximo}</Table.Cell>
                    <Table.Cell>SOMAR TOTAL</Table.Cell>
                    <Table.Cell style={{ color: 'blue' }}>
                      {item.opcao.length}
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        icon
                        color="orange"
                        title="Visualizar opção"
                        onClick={() => visualizarOp(item)}
                      >
                        <Icon name="eye" style={{ color: '#fff' }} />
                      </Button>
                      <Button
                        icon
                        style={{ background: '#999' }}
                        title="Editar"
                        onClick={() => editarVariacao(item)}
                      >
                        <Icon name="edit" style={{ color: '#fff' }} />
                      </Button>
                      <Button
                        icon
                        color="red"
                        title="Excluir"
                        onClick={() => deletarVariacao(item.id)}
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
          <Button color="black" onClick={() => setOpenVariacao(false)}>
            Sair
          </Button>
        </Modal.Actions>
      </Modal>
      <DeletarVariacao deletar={deletar} setDeletar={setDeletar} item={item} />
      {editar ? (
        <Editar editar={editar} setEditar={setEditar} item={itemVar} />
      ) : null}
      {visualizar ? (
        <Visualizar
          visualizar={visualizar}
          setVisualizar={setVisualizar}
          item={itemVisua}
          variacao={variacao}
        />
      ) : null}
      <NewVariacao
        variacao={variacao}
        product={product}
        newVariacao={newVariacao}
        setNewVariacao={setNewVariacao}
      />
    </>
  );
}

export default ModalExampleModal;
