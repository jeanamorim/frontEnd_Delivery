/* eslint-disable no-array-constructor */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { Icon, Button, Divider } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import MenuItem from '@material-ui/core/MenuItem';
import MomentUtils from '@date-io/moment';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import { Container, Time, Header, ContainerText, Text } from './styles';
import api from '../../../services/api';
import Animation from '../../../components/Animation';
import * as loadingData from '../../../assets/animations/loading.json';

const schema = Yup.object().shape({
  week_day: Yup.string().required('É necessário selecionar o dia'),
  from: Yup.string().required('O horário é obrigatório'),
  to: Yup.string().required('O horário é obrigatório'),
});

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    height: 50,
    fontSize: 500,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function HorFuncionamento() {
  const [scheduleItems, setScheduleItems] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const idLoja = useSelector(state => state.user.profile.id);
  const status = useSelector(state => state.user.profile.status);
  const [data] = useState(new Date());

  const classes = useStyles();

  useEffect(() => {
    async function Schedule() {
      setLoading(true);
      try {
        const response = await api.get('/schedule');

        setScheduleItems(response.data);
        setLoading(false);
      } catch (err) {
        if (err.response) {
          toast.error('Erro no servidor');
        } else {
          toast.error('Falha ao conectar com o servidor');
        }
      }
    }
    Schedule();
  }, []);

  async function updateHours(id) {
    setLoadingButton(true);
    try {
      await api.put(`schedule/${id}`, {
        from: schedule.from,
        to: schedule.to,
      });

      const response = await api.get('/schedule');
      setScheduleItems(response.data);

      toast.success('Horarios atualizado com sucesso');
      setSchedule('');
      setLoadingButton(false);
    } catch (err) {
      if (err.response) {
        toast.error('Erro no servidor');
      } else {
        toast.error('Erro ao conectar com o servidor');
      }
    }
  }

  function novaHora() {
    function pad(s) {
      return s < 10 ? `0${s}` : s;
    }
    const date = new Date();
    return [date.getHours(), date.getMinutes()].map(pad).join(':');
  }
  const result = scheduleItems.map(
    item =>
      item.week_day === data.getDay() &&
      novaHora() <= item.to &&
      novaHora() >= item.from,
  );

  useEffect(() => {
    async function requestLoja() {
      if (result) {
        await api.put(`estabelecimento/${idLoja}`, {
          status: 'ABERTO',
        });
      }
      await api.put(`estabelecimento/${idLoja}`, {
        status: 'FECHADO',
      });
    }
    requestLoja();
  }, [data, result, idLoja]);

  function setFreteItemValue(position, field, value) {
    const updateScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        setSchedule({ ...scheduleItem, [field]: value });
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });

    setScheduleItems(updateScheduleItems);
  }

  const loadingAnimation = (
    <Animation width={50} height={50} animation={loadingData} />
  );

  function refreshPage() {
    window.location.reload();
  }
  return (
    <div className="content-wrapper">
      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <h2 className="page-title">Horários de funcionamento</h2>
              <div className="panel panel-default">
                <div className="panel-heading">
                  <Button onClick={refreshPage}>
                    <Icon name="sync" /> Atualizar
                  </Button>
                </div>
                <div className="panel-body">
                  <div>
                    {status === 'FECHADO' ? (
                      <Button
                        type="button"
                        negative
                        variant="contained"
                        style={{ borderRadius: 20 }}
                      >
                        {status}
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        positive
                        variant="contained"
                        style={{ borderRadius: 20 }}
                      >
                        {status}
                      </Button>
                    )}
                  </div>

                  <Container>
                    <Header>
                      <div> Horários de funcionamento</div>
                    </Header>
                    <Divider />
                    {/* <Container>
                    <ContainerText>
                      <Text>
                        Ao editar um horário em seguida clique em - SALVAR - se
                        voçê for editar outra horário sem salvar o anterior, o
                        valor da anterior será perdido.
                      </Text>
                    </ContainerText>
                  </Container> */}
                    {loading ? (
                      <Container>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                          }}
                        >
                          Carregando...
                        </div>
                        {loadingAnimation}
                      </Container>
                    ) : (
                      <Container>
                        {scheduleItems.map((item, index) => (
                          <form
                            className={classes.container}
                            noValidate
                            key={item.id}
                          >
                            <FormControl className={classes.formControl}>
                              <Select
                                disabled
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={item.week_day}
                                // onChange={handleChange}
                              >
                                <MenuItem value={1}>Segunda-feira</MenuItem>
                                <MenuItem value={2}>Terça-feira</MenuItem>
                                <MenuItem value={3}>Quarta-feira</MenuItem>
                                <MenuItem value={4}>Quinta-feira</MenuItem>
                                <MenuItem value={5}>Sexta-feira</MenuItem>
                                <MenuItem value={6}>Sabado</MenuItem>
                                <MenuItem value={7}>Domingo</MenuItem>
                              </Select>
                            </FormControl>

                            <TextField
                              id="datetime-local"
                              label="Que horas quer abrir?"
                              type="time"
                              defaultValue={item.from}
                              className={classes.textField}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              onChange={e =>
                                setFreteItemValue(index, 'from', e.target.value)
                              }
                            />

                            <TextField
                              id="datetime-local"
                              label="Quer horas quer fechar?"
                              type="time"
                              defaultValue={item.to}
                              className={classes.textField}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              onChange={e =>
                                setFreteItemValue(index, 'to', e.target.value)
                              }
                            />
                            {schedule.week_day === item.week_day ? (
                              <div>
                                {loadingButton ? (
                                  <Button
                                    type="button"
                                    loading
                                    positive
                                    variant="contained"
                                  >
                                    loading
                                  </Button>
                                ) : (
                                  <Button
                                    type="button"
                                    loading={loading}
                                    positive
                                    variant="contained"
                                    onClick={() => updateHours(item.id)}
                                  >
                                    Salvar
                                  </Button>
                                )}
                              </div>
                            ) : (
                              <Button
                                type="button"
                                variant="contained"
                                style={{
                                  backgroundColor: '#9999',
                                }}
                              >
                                Salvar
                              </Button>
                            )}
                          </form>
                        ))}
                      </Container>
                    )}
                  </Container>
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
