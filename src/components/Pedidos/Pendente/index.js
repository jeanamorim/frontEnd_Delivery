/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Button, Icon, Divider, Grid, Image, Card } from 'semantic-ui-react';
import { formatPrice } from '../../../util/format';
// import { Container } from './styles';

function Pendente({ pendente, loading, handleChange, viewOrdens }) {
  return (
    <Grid.Column>
      <div>
        <Icon name="exclamation triangle" />
        PENDENTE
      </div>
      <Divider />
      {pendente.length > 0 ? (
        <>
          {pendente.map(order => (
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
                    <strong> {formatPrice(order.total)}</strong>
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
                      color="red"
                      type="button"
                      value="CANCELADO"
                      onClick={handleChange}
                    >
                      Cancelar
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
                      value="PRODUCAO"
                    >
                      Aceitar
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div style={{ color: '#999' }}>
          Nenhum pedido pendente
          <Divider />
        </div>
      )}
    </Grid.Column>
  );
}

export default Pendente;
