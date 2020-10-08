/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-alert */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Input, Form, Select } from '@rocketseat/unform';
import { Button, Divider, Icon, Modal, Header } from 'semantic-ui-react';
import { formatPrice } from '../../../util/format';
import { VariacaoList, Opcao, NovaOpcao, PageContent } from './styles';
import ModalEditarOpcao from '../ModalEditarOpcao';
import ModalNewOpcao from '../ModalNovaOpcao';
import ModalNewVariacao from '../ModalNovaVariacao';

export default function Variacoes({
  variacao,
  setVariacaoItemValue,
  editVariacao,
  loadingEditVar,
  editarVariacao,
  setOpcaoItemValue,
  product,
  handleSubmitOpcao,
  loadingPostOp,
  deletarVariação,

  name,
  price,
  status,
  setName,
  setPrice,
  setStatus,
}) {
  const [open, setOpen] = React.useState(false);
  const [novaOpcao, setNovaOpcao] = React.useState(false);
  const [novaVariacao, setNovaVariacao] = React.useState(false);
  const [itemIdVar, setItemVar] = React.useState([]);
  const [item, setItem] = React.useState([]);

  function editarOpcao(item) {
    setItem(item);
    setOpen(true);
  }
  function CadastrarNovaOpcao(item) {
    setItemVar(item);
    setNovaOpcao(true);
  }
  function CadastrarNovaVariacao(item) {
    setNovaVariacao(true);
  }

  return (
    <>
      <VariacaoList>
        <PageContent>
          {variacao.map(item => {
            return (
              <>
                <div>
                  <thead>
                    <tr>
                      <th>NOME DA VARIACAO</th>
                      <th>MINIMO</th>
                      <th>MAXIMO</th>
                      <th>LOGICA</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={item.id} onClick={() => editarOpcao(item)}>
                      <td>{item.name}</td>
                      <td>{item.minimo}</td>
                      <td>{item.maximo}</td>
                      <td>SOMAR TOTAL</td>
                    </tr>
                  </tbody>
                </div>
                {item.opcao.map((i, index) => {
                  return (
                    <>
                      <PageContent>
                        <thead>
                          <tr>
                            <th>NOME DO OPÇÂO</th>
                            <th>PREÇO</th>
                            <th>STATUS</th>
                          </tr>
                        </thead>
                        <tbody>
                          <>
                            <tr key={i.id} onClick={() => editarOpcao(i)}>
                              <td>{i.name}</td>
                              <td>{formatPrice(i.price)}</td>
                              <td>{i.status}</td>
                            </tr>
                            <br />
                          </>
                        </tbody>
                      </PageContent>
                    </>
                  );
                })}
              </>
            );
          })}
        </PageContent>
      </VariacaoList>
      <ModalEditarOpcao open={open} setOpen={setOpen} item={item} />
      <ModalNewOpcao
        novaOpcao={novaOpcao}
        setNovaOpcao={setNovaOpcao}
        itemIdVar={itemIdVar}
        variacao={variacao}
      />
      <ModalNewVariacao
        novaVariacao={novaVariacao}
        setNovaVariacao={setNovaVariacao}
        product={product}
        variacao={variacao}
      />
    </>
  );
}
//             return(
//               <thead>
//                 <tr>
//                   <th>NOME DA VARIACAO</th>
//                   <th>MINIMO</th>
//                   <th>MAXIMO</th>
//                   <th>LOGICA</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr key={item.id} onClick={() => editarOpcao(item)}>
//                   <td>{item.name}</td>
//                   <td>{item.minimo}</td>
//                   <td>{item.maximo}</td>
//                   <td>SOMAR TOTAL</td>
//                 </tr>
//               </tbody>
//               <div
//                 style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   flexDirection: 'column',
//                 }}
//               >
//                 <Button
//                   style={{
//                     background: ' #fff',
//                     borderColor: ' #fff',
//                     borderRadius: 6,
//                   }}
//                 >
//                   <text
//                     style={{
//                       fontSize: 17,
//                       color: '#0B9F03',
//                       fontWeight: 'bold',
//                     }}
//                   >
//                     Mostrar Opção ({item.opcao.length})
//                   </text>
//                 </Button>
//               </div>

//               <PageContent>
//                 <thead>
//                   <tr>
//                     <th>NOME DO OPÇÂO</th>
//                     <th>PREÇO</th>
//                     <th>STATUS</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {item.opcao.map(i => (
//                     <>
//                       <tr key={i.id} onClick={() => editarOpcao(i)}>
//                         <td>{i.name}</td>
//                         <td>{formatPrice(i.price)}</td>
//                         <td>{i.status}</td>
//                       </tr>
//                       <br />
//                     </>
//                   ))}
//                 </tbody>
//               </PageContent>
//             )
// })}

{
  /* <div




   <PageContent>
              <thead>
                <tr>
                  <th>NOME DO OPÇÂO</th>
                  <th>PREÇO</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {item.opcao.map(i => (
                  <>
                    <tr key={i.id} onClick={() => editarOpcao(i)}>
                      <td>{i.name}</td>
                      <td>{formatPrice(i.price)}</td>
                      <td>{i.status}</td>
                    </tr>
                    <br />
                  </>
                ))}
              </tbody>
            </PageContent>
                    style={{
                      display: 'flex',
                    }}
                  >
                    <Button
                      style={{
                        background: ' #fff',
                        borderColor: ' #fff',
                      }}
                      onClick={() => CadastrarNovaOpcao(item.id)}
                    >
                      <text
                        style={{
                          fontSize: 17,
                          color: '#0B9F03',
                          fontWeight: 'bold',
                        }}
                      >
                        + Cadastrar nova opção
                      </text>
                    </Button>
                  </div>
                </> */
}

{
  /* <Button
              style={{
                background: ' #fff',
                borderColor: ' #fff',
                borderRadius: 6,
              }}
            >
              <text
                style={{
                  fontSize: 17,
                  color: '#0B9F03',
                  fontWeight: 'bold',
                }}
              >
                Opção ({item.opcao.length})
              </text>
            </Button>

            <Divider /> */
}
