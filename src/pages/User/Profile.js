import React, { Component } from 'react';
import { Card, List, Row, Col, Table } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva/index';

@connect(({ user }) => ({
  user,
}))
class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { currentUser } = this.props.user;

    const data = [{
      name: 'Логин',
      value: currentUser.username,
      key: 1,
    }, {
      name: 'ИИН',
      value: currentUser.iin,
      key: 2,
    }, {
      name: 'ФИО',
      value: currentUser.surname + ' ' + currentUser.firstname + (currentUser.patronname == null ? '' : ' ' + currentUser.patronname),
      key: 3,
    }, {
      name: 'Дата рождения',
      value: currentUser.birthDate,
      key: 4,
    }, {
      name: 'Телефон',
      value: currentUser.phone,
      key: 5,
    }, {
      name: 'Эл. почта',
      value: currentUser.email,
      key: 6,
    }, {
      name: 'Роли',
      value: currentUser.userDRoleList.map((role) => role.nameRu + ' '),
      key: 7,
    }, {
      name: 'Компания',
      value: currentUser.dcompanyId.nameRu,
      key: 8,
    }, {
      name: 'Должность',
      value: currentUser.dpositionId.nameRu,
      key: 9,
    }];

    const columns = [{
      title: 'Наименование',
      dataIndex: 'name',
      render: (text) => <div style={{ color: 'black' }}>{text}</div>,
      width: 100,

    }, {
      title: 'Значения',
      dataIndex: 'value',
      key: 'value',
      width: 150,
    }];

    return (
      <PageHeaderWrapper title={formatMessage({ id: 'menu.profile' })}>
        <Row>
          <Card
            bordered={false}
            bodyStyle={{ padding: 5 }}
          >
            <List
              itemLayout="vertical"
              style={{ paddingBottom: '5px' }}
            >
              <Table
                columns={columns}
                dataSource={data}
                pagination={{ position: 'none' }}
                showHeader={false}
              />
            </List>
          </Card>
        </Row>
      </PageHeaderWrapper>);
  }
}

export default Profile;
