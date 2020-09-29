/* eslint-disable func-names */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';

import { MdClose } from 'react-icons/md';
import { Modal, Button, Divider } from 'semantic-ui-react';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import api from '../../services/api';
import FormProduct from './Product';
import FormVariacao from './NovaVariacao';

import DeletarProduto from './DeletarProduto';
import Variacoes from './Variacoes';

import { closeEditProduct } from '../../store/modules/product/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  category_id: Yup.string().required('A categoria é obrigatória'),
  description: Yup.string().required('A descrição é obrigatória'),
  quantity: Yup.string()
    .matches(/^[+]?([.]\d+|\d+[.]?\d*)$/, 'O valor precisa ser um número')
    .required('O número precisa ser maior que zero'),
  unit: Yup.string().required('A unidade é obrigatória'),
  price: Yup.string()
    .matches(
      /^[+]?([.]\d+|\d+[.]?\d*)$/,
      'Insira um número válido. Ex: 3, 1.5, 0.46',
    )
    .required('O preço é obrigatório'),
});
const schemaVariacao = Yup.object().shape({
  name: Yup.string().required('Obrigatório'),
  calculoPrice: Yup.string().required('Obrigatório'),

  minimo: Yup.string()
    .matches(
      /^[+]?([.]\d+|\d+[.]?\d*)$/,
      'Insira um número válido. Ex: 3, 1.5, 0.46',
    )
    .required('Obrigatório'),
  maximo: Yup.string()
    .matches(
      /^[+]?([.]\d+|\d+[.]?\d*)$/,
      'Insira um número válido. Ex: 3, 1.5, 0.46',
    )
    .required('Obrigatório'),
});

export default function Neew() {
  const dispatch = useDispatch();
  const [variacao, setVariacao] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('');

  const [loadingEditVar, setLoadingEditVar] = useState(false);
  const [loadingPostVar, setLoadingPostVar] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleOp, setVisibleOp] = useState(false);
  const [novaOp, setNovaOp] = useState(false);
  const [novaVari, setNovaVariacao] = useState(false);
  const [editVariacao, setEditeVariacao] = useState([]);
  const [editOpcao, setEditOpcao] = useState([]);
  const [render, setRender] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const product = useSelector(state => state.product.ProductToEdit);
  const categories = useSelector(state => state.categorias.Categorias);
  const openModal = useSelector(state => state.product.editProduct);
  const avatar = useSelector(state => state.uploads.avatar);
  const id = useSelector(state => state.product.ProductToEdit.id);

  const exibirVariacao = () => setVisible(!visible);
  const exibirOpcao = () => setVisibleOp(!visibleOp);
  const novaOpcao = () => setNovaOp(!novaOp);
  const novaVariacao = () => setNovaVariacao(!novaVari);

  useEffect(() => {
    async function loadOrder() {
      try {
        const response = await api.get(`productsEdit/${id}`);
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
  }, [render]);

  async function handleSubmit(data) {
    setLoading(true);
    try {
      await api.put(`products/${id}`, {
        ...data,
        image_id: avatar.id,
      });
      dispatch(closeEditProduct());
      setLoading(false);
      toast.success('Produto atualizado com sucesso');
    } catch (err) {
      if (err.response) {
        toast.error('Erro no servidor');
      } else {
        toast.error('Erro ao conectar com o servidor');
      }
    }
  }

  async function handleSubmitVariacao(data) {
    const idvar = variacao.map(function(item) {
      return item.id;
    });
    setLoadingPostVar(true);
    try {
      const response = await api.post('variacao', data);
      const ids = response.data.id;

      await api.put(`products/${id}`, {
        variacao: [...idvar, ids],
      });
      setRender(!render);
      setVisibleOp(false);
      toast.success('Variacao cadastrada com sucesso');

      document.getElementById('vd-form').reset();
      setLoadingPostVar(false);
      setNovaVariacao(false);
    } catch (err) {
      if (err.response) {
        toast.error('Erro no servidor');
      } else {
        toast.error('Erro ao conectar com o servidor');
      }
    }
  }
  async function deletarVariação(id) {
    try {
      await api.delete(`variacao/${id}`);
      setRender(!render);
      toast.success('Variação deletada com sucesso');
    } catch (err) {
      if (err.response) {
        toast.error('Erro no servidor');
      } else {
        toast.error('Erro ao conectar com o servidor');
      }
    }
  }
  async function handleSubmitOpcao(name, price, status, itemId) {
    const data = {
      name,
      price,
      status,
    };
    try {
      const response = await api.post('opcaovariacao', data);
      const ids = response.data.id;

      await api.put(`variacao/${itemId}`, {
        opcao: [ids],
      });

      setName('');
      setPrice('');
      setStatus('');
      setRender(!render);
      toast.success('Variacao cadastrada com sucesso');
    } catch (err) {
      if (err.response) {
        toast.error('Erro no servidor');
      } else {
        toast.error('Erro ao conectar com o servidor');
      }
    }
  }
  async function editarVariacao(idvar) {
    setLoadingEditVar(true);
    try {
      await api.put(`variacao/${idvar}`, {
        name: editVariacao.name,
        minimo: editVariacao.minimo,
        maximo: editVariacao.maximo,
      });

      toast.success('Variacao editada com sucesso');
      setEditeVariacao('');
      setLoadingEditVar(false);
    } catch (err) {
      if (err.response) {
        toast.error('Erro no servidor');
      } else {
        toast.error('Erro ao conectar com o servidor');
      }
    }
  }
  async function editarOpção(idOp) {
    setLoadingEditVar(true);
    try {
      await api.put(`opcaovariacao/${idOp}`, {
        name: editVariacao.name,
        minimo: editVariacao.minimo,
        maximo: editVariacao.maximo,
      });

      toast.success('Variacao editada com sucesso');
      setEditeVariacao('');
      setLoadingEditVar(false);
    } catch (err) {
      if (err.response) {
        toast.error('Erro no servidor');
      } else {
        toast.error('Erro ao conectar com o servidor');
      }
    }
  }

  const options = categories.map(category => ({
    id: category.id,
    title: category.name,
  }));

  function handleCloseModal() {
    dispatch(closeEditProduct());
  }
  function setVariacaoItemValue(position, field, value) {
    const variacoes = variacao.map((scheduleItem, index) => {
      if (index === position) {
        setEditeVariacao({ ...scheduleItem, [field]: value });
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });

    setVariacao(variacoes);
  }
  function setOpcaoItemValue(position, field, value) {
    const opcao = variacao.map((scheduleItem, index) => {
      if (index === position) {
        setEditOpcao({ ...scheduleItem.opcao, [field]: value });
        return { ...scheduleItem.opcao, [field]: value };
      }

      return scheduleItem;
    });

    setVariacao(opcao);
  }

  return (
    <>
      <Modal open={openModal}>
        <Modal.Header style={{ background: '#F4A460', color: '#fff' }}>
          Editar produto
          <MdClose
            style={{ float: 'right' }}
            onClick={() => handleCloseModal()}
          />
        </Modal.Header>
        <FormProduct
          handleSubmit={handleSubmit}
          product={product}
          schema={schema}
          options={options}
          loading={loading}
          handleCloseModal={handleCloseModal}
        />
        <div
          style={{
            position: 'absolute',
            marginTop: -145,
            marginLeft: 70,
          }}
        >
          <Button.Group vertical labeled icon>
            <Button
              icon="clipboard outline"
              content="Variação"
              style={{ background: '#999', color: '#fff' }}
              onClick={exibirVariacao}
            />
            <Button
              icon="times"
              negative
              content="Deletar"
              onClick={() => setOpenDeleteModal(true)}
            />
          </Button.Group>
        </div>
        {visible ? (
          <>
            <text style={{ fontSize: 20, marginLeft: 15, fontWeight: 'bold' }}>
              Cadastrar variação
            </text>
            <Divider />
            <div
              style={{
                display: 'flex',
              }}
            >
              <Button
                style={{
                  background: ' #fff',
                  borderColor: ' #fff',
                }}
                onClick={novaVariacao}
              >
                <text
                  style={{ fontSize: 17, color: '#0B9F03', fontWeight: 'bold' }}
                >
                  + Cadastrar nova variação
                </text>
              </Button>
            </div>
            <FormVariacao
              novaVari={novaVari}
              schemaVariacao={schemaVariacao}
              handleSubmitVariacao={handleSubmitVariacao}
              loadingPostVar={loadingPostVar}
            />
            {variacao.length > 0 ? (
              <div
                style={{
                  marginTop: 20,
                }}
              >
                <text
                  style={{
                    fontSize: 20,
                    marginLeft: 15,
                    fontWeight: 'bold',
                  }}
                >
                  Variações do produto
                </text>
              </div>
            ) : null}
            <Divider style={{ marginTop: 20 }} />
            <Variacoes
              variacao={variacao}
              setVariacaoItemValue={setVariacaoItemValue}
              editVariacao={editVariacao}
              loadingEditVar={loadingEditVar}
              editarVariacao={editarVariacao}
              setOpcaoItemValue={setOpcaoItemValue}
              visibleOp={visibleOp}
              novaOpcao={novaOpcao}
              novaOp={novaOp}
              handleSubmitOpcao={handleSubmitOpcao}
              exibirOpcao={exibirOpcao}
              deletarVariação={deletarVariação}
              name={name}
              price={price}
              status={status}
              setName={setName}
              setPrice={setPrice}
              setStatus={setStatus}
            />
          </>
        ) : null}
      </Modal>
      <DeletarProduto
        setOpenDeleteModal={setOpenDeleteModal}
        openDeleteModal={openDeleteModal}
        product={product}
      />
    </>
  );
}
