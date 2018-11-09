import React, { Component } from 'react';
import { formatMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {
  Card,
  Table,
  Button,
  Row,
  Col,
  Input,
  DatePicker,
} from 'antd';

class Searcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iin: '',
      name: '',
      surname: '',
      patronic: '',
      bdate: null,
    };
  }

  formfield = (e) => {
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  ChangeDate(value) {
    this.setState({
      bdate: value
    })
  }

  render() {
    const columns = [{
      title: 'Наименование',
      dataIndex: 'name',
      render: (text) => <div style={{color: 'black'}}>{text}</div>,
      width: 100,

    }, {
      title: 'Значения',
      dataIndex: 'value',
      key: 'value',
      width: 150,
    }];

    const data = [{
      name: 'ИИН',
      value: '880328301579',
    }, {
      name: 'ФАМИЛИЯ',
      value: 'Иванов',
    }, {
      name: 'ОТЧЕСТВО',
      value: 'Иванович',
    }, {
      name: 'ИМЯ',
      value: 'Иван',
    }, {
      name: 'ДАТА РОЖДЕНИЯ',
      value: '28.03.1988',
    }, {
      name: 'ПОЛ',
      value: 'Мужской',
    }];
    const mBottom = { marginBottom: '5px' };
    const { iin, surname, name, patronic, bdate } = this.state;

    return (
      <PageHeaderWrapper title={formatMessage({ id: 'menu.rpmu.searcher' })}>
        <Row style={{ marginBottom:'10px' }}>
          <Col span={9}>
            <Card
              title={formatMessage({ id: 'report.param.searcher' })}
            >
              <div style={mBottom}>{formatMessage({ id: 'profile.field.iin' })}:
                <Input
                  value={iin}
                  name='iin'
                  onChange={(e) => {
                    this.formfield(e);
                }}
                />
              </div>
              <div style={mBottom}>{formatMessage({ id: 'profile.field.familya' })}:
                <Input
                  value={surname}
                  name='surname'
                  onChange={(e) => {
                    this.formfield(e);
                }}
                />
              </div>
              <div style={mBottom}>{formatMessage({ id: 'profile.field.name' })}:
                <Input
                  value={name}
                  name='name'
                  onChange={(e) => {
                    this.formfield(e);
                }}
                />
              </div>
              <div style={mBottom}>{formatMessage({ id: 'profile.field.surname' })}:
                <Input
                  type='text'
                  value={patronic}
                  name='patronic'
                  onChange={(e) => {
                  this.formfield(e);
                  }}
                />
              </div>
              <div style={mBottom}><p>{formatMessage({ id: 'profile.field.birthday' })}:</p>
                <DatePicker
                  format="DD.MM.YYYY"
                  value={bdate}
                  onChange={(e, t) =>{this.ChangeDate(e, t)}}
                />
              </div>
              <div style={{ marginTop:'34px' }}>
                <Button
                  type='primary'
                  style={{marginRight:"7px"}}
                  onClick={()=>{ console.log(this.state)}}
                >
                  {formatMessage({ id: 'system.search' })}
                </Button>
                <Button
                  onClick={()=>{this.setState({
                    iin: '',
                    name: '',
                    surname: '',
                    patronic: '',
                    bdate: null,
                  })
                }}
                >
                  {formatMessage({ id: 'system.clear' })}
                </Button>
              </div>
            </Card>
          </Col>
          <Col span={15}>
            <Card>
              <Table
                columns={columns}
                dataSource={data}
                pagination={{ position: 'none' }}
                showHeader={false}
              />
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}
export default Searcher;




