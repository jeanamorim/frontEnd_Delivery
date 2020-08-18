/* eslint-disable no-unused-expressions */
/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import { Form, Select, Input } from '@rocketseat/unform';
import { Icon, Button } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import api from '../../../services/api';

const schema = Yup.object().shape({
  week_day: Yup.string().required('É necessário selecionar o dia'),
  from: Yup.string().required('O horário é obrigatório'),
  to: Yup.string().required('O horário é obrigatório'),
});

function HorFuncionamento() {
  const [scheduleItems, setScheduleItems] = useState([]);
  const [schedule, setSchedule] = useState([]);

  async function Schedule() {
    try {
      const response = await api.get('/schedule');
      setSchedule(response.data);
    } catch (err) {
      if (err.response) {
        toast.error('Erro no servidor');
      } else {
        toast.error('Falha ao conectar com o servidor');
      }
    }
  }
  useEffect(() => {
    Schedule();
  }, []);

  async function handleCreateClass(e) {
    e.preventDefault();
    try {
      await api.post('schedule', {
        schedule: scheduleItems,
      });
      await Schedule();
      toast.success('Horários salvos com sucesso');
    } catch (error) {
      toast.error('Erro no servidor');
    }
  }
  async function handleDeleteClass(id) {
    try {
      await api.delete(`schedule/${id}`);
      await Schedule();
      toast.success('Horário deletado com sucesso');
    } catch (error) {
      toast.error('Erro no servidor');
    }
  }

  function addNewScheduleItem() {
    setScheduleItems([...scheduleItems, { week_day: 0, from: '', to: '' }]);
  }

  function setScheduleItemValue(position, field, value) {
    const updateScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });

    setScheduleItems(updateScheduleItems);
  }
  return (
    <div className="content-wrapper">
      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <h2 className="page-title">Horários de funcionamento</h2>
              <div className="panel panel-default">
                <div className="panel-heading">Seus horários</div>
                <div className="panel-body">
                  <div>
                    <Button
                      type="button"
                      positive
                      variant="contained"
                      onClick={addNewScheduleItem}
                    >
                      <Icon name="plus" />
                      Novo horario
                    </Button>
                  </div>
                  {scheduleItems.map((scheduleItem, index) => {
                    return (
                      <Form
                        key={scheduleItem.week_day}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <div className="form-group col-md-2">
                          <label htmlFor="week_day">Dias da semana</label>

                          <Select
                            name="week_day"
                            className="form-control"
                            value={scheduleItem.week_day}
                            onChange={e =>
                              setScheduleItemValue(
                                index,
                                'week_day',
                                e.target.value,
                              )
                            }
                            options={[
                              { id: '0', title: 'Domingo' },
                              { id: '1', title: 'Segunda-feira' },
                              { id: '2', title: 'Terça-feira' },
                              { id: '3', title: 'Quarta-feira' },
                              { id: '4', title: 'Quinta-feira' },
                              { id: '5', title: 'Sexta-feira' },
                              { id: '6', title: 'Sábado' },
                            ]}
                          />
                        </div>
                        <div className="form-group col-md-1">
                          <label htmlFor="from">Das</label>
                          <Input
                            type="time"
                            className="form-control"
                            name="from"
                            value={scheduleItem.from}
                            onChange={e =>
                              setScheduleItemValue(
                                index,
                                'from',
                                e.target.value,
                              )
                            }
                          />
                        </div>
                        <div className="form-group col-md-1">
                          <label htmlFor="to">Até</label>
                          <Input
                            name="to"
                            type="time"
                            className="form-control"
                            value={scheduleItem.to}
                            onChange={e =>
                              setScheduleItemValue(index, 'to', e.target.value)
                            }
                          />
                        </div>
                      </Form>
                    );
                  })}
                  <br />
                  <br />
                  <br />
                  {schedule.map(scheduleItem => {
                    return (
                      <Form
                        key={scheduleItem.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <div className="form-group col-md-2">
                          <label htmlFor="week_day">Dias da semana</label>

                          <Select
                            disabled
                            name="week_day"
                            className="form-control"
                            value={scheduleItem.week_day}
                            options={[
                              { id: '0', title: 'Domingo' },
                              { id: '1', title: 'Segunda-feira' },
                              { id: '2', title: 'Terça-feira' },
                              { id: '3', title: 'Quarta-feira' },
                              { id: '4', title: 'Quinta-feira' },
                              { id: '5', title: 'Sexta-feira' },
                              { id: '6', title: 'Sábado' },
                            ]}
                          />
                        </div>
                        <div className="form-group col-md-1">
                          <label htmlFor="from">Das</label>
                          <input
                            type="time"
                            className="form-control"
                            name="from"
                            value={scheduleItem.from}
                          />
                        </div>
                        <div className="form-group col-md-1">
                          <label htmlFor="to">Até</label>
                          <input
                            name="to"
                            type="time"
                            className="form-control"
                            value={scheduleItem.to}
                          />
                        </div>
                        <Button
                          title="deletar horario"
                          type="button"
                          negative
                          variant="contained"
                          onClick={() => handleDeleteClass(scheduleItem.id)}
                        >
                          <Icon name="delete" />
                          Deletar
                        </Button>
                      </Form>
                    );
                  })}
                  {scheduleItems.length > 0 ? (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: '35%',
                        marginTop: 20,
                      }}
                    >
                      <Button
                        type="button"
                        positive
                        variant="contained"
                        onClick={handleCreateClass}
                      >
                        Salvar
                      </Button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HorFuncionamento;
