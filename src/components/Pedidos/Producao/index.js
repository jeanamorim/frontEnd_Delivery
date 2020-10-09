/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Button, Icon, Divider, Grid, Image, Card } from 'semantic-ui-react';
import { formatPrice } from '../../../util/format';
// import { Container } from './styles';

function Producao({ producao, loading, handleChange, viewOrdens }) {
  return (
    <Grid.Column>
      <div className="grid">
        <Icon name="home" />
        PRODUZINDO
      </div>
      <Divider />
      {producao.length > 0 ? (
        <>
          {producao.map(order => (
            <div key={order.id} style={{ marginLeft: 8 }}>
              <div
                className="panel panel-default"
                style={{ borderColor: '#F4A460' }}
              >
                <div
                  onClick={() => viewOrdens(order)}
                  className="block-anchor panel-footer text-center"
                  style={{
                    background: '#F4A460',
                    color: '#fff',
                    height: 35,
                  }}
                >
                  {order.timeDistance}
                </div>
                <div className="panel-body bk-secondary text-dark">
                  <Card.Header style={{ fontSize: 10 }}>
                    {order.ship_neighborhood}
                  </Card.Header>
                  <Card.Meta> #{order.id}</Card.Meta>
                  <Card.Description>
                    {order.payment_method}
                    <strong> R$ {formatPrice(order.total)}</strong>
                  </Card.Description>
                  {order.order_details.map(image => (
                    <div
                      style={{
                        alignItems: 'center',

                        float: 'left',
                      }}
                    >
                      <Image
                        src={image.product.image.url}
                        style={{
                          borderRadius: 50,
                          height: 30,
                          width: 30,
                        }}
                      />
                      <div> {image.quantity}x </div>
                    </div>
                  ))}
                </div>
                <div className="ui two buttons">
                  {loading ? (
                    <Button loading color="red">
                      Loading
                    </Button>
                  ) : (
                    <Button
                      id={order.id}
                      style={{ color: '#fff', background: '#6D6D6D' }}
                      type="button"
                      value="CANCELADO"
                      // onClick={handleChange}
                    >
                      Imprimir
                    </Button>
                  )}
                  {loading ? (
                    <Button loading color="green">
                      Loading
                    </Button>
                  ) : (
                    <Button
                      id={order.id}
                      color="green"
                      onClick={handleChange}
                      type="button"
                      value="ENVIADO"
                    >
                      Enviar
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div style={{ color: '#999' }}>
          Nenhum pedido em produção
          <Divider />
        </div>
      )}
    </Grid.Column>
  );
}

export default Producao;
