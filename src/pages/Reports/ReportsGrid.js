import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Card,
  Table,
  Icon,
  Menu,
  Input,
  Dropdown,
  Button,
  Checkbox,
  Tabs,
  Label,
  Select,
  Row,
  Col,
  Calendar, Badge,
  DatePicker,
  Modal,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { formatMessage, FormattedMessage } from 'umi/locale';

export default class ReportsGrid extends Component {
  state = {

    selectedRow: null,

    _configTimer: {

      second: 1000,
      count: 5,
    },

    tasks: [],

    columns: [
      {
        title: '№',
        dataIndex: 'index',
        render: (e, record, index) => {
          return index + 1;
        },
      }, {
        title: 'Наименование на казахском',
        dataIndex: 'reportId.nameKz',
      }, {
        title: 'Наименование на русском',
        dataIndex: 'reportId.nameRu',
      }, {
        title: 'Дата',
        dataIndex: 'entryDate',
      }, {
        title: 'Пользователь',
        dataIndex: 'userId.surname',
      }, {
        title: 'Формат',
        dataIndex: 'reportId.exportFormat.nameRu',
      }, {
        title: 'Действие',
        align: 'center',
        dataIndex: 'action_column',
        width: 80,
        onCell: record => {
          return {
            onClick: () => {
              if (record.status === 2) {
                Modal.error({
                  title: 'Ошибка',
                  content: record.message,
                });
              }
              if (record.status === 1) {
                this.downloadFile(record);
              }
            },
          };
        },
        render: (e, record) => {

          let status = record.status;

          switch (status) {
            case 0: {
              return <Icon spin><FontAwesomeIcon icon={faSpinner}/></Icon>;
            }
            case 1: {
              return <Button>{formatMessage({ id: 'system.download' })}</Button>;
            }
            case 2: {
              return <Button style={{ 'color': 'red' }}>{formatMessage({ id: 'system.error' })}</Button>;
            }
            default:
              break;
          }

        },
      }],

    dataSource: [
      {
        'id': 229,
        'status': 1,
        'reportExportFormat': 'pdf',
        'entryDate': '31.10.2018 21:16',
        'userId': {
          'id': '346DD7A796744F06A2593521D3935F12',
          'iin': '860000000000',
          'surname': 'КУДАЙБЕРГЕНОВ',
          'firstname': 'БЕКЖАН',
          'patronname': 'БАУЫРЖАНОВИЧ',
          'birthDate': '20.05.2018',
          'organizationId': {
            'id': '70A1F9C472805177E054001B782A74A6',
            'bin': '990440000385',
            'nameRu': 'Акционерное общество "Центр развития трудовых ресурсов"\n',
            'nameKz': 'Акционерное общество "Центр развития трудовых ресурсов"\n',
            'address': null,
            'entryDate': '10.07.2018 15:44',
            'changeDate': null,
            'dOkedList': null,
          },
        },
        'reportId': {
          'id': 1,
          'nameRu': 'Количество договоров в разрезе должностей',
          'nameKz': 'Количество договоров в разрезе должностей',
          'params': null,
          'exportFormat': {
            'id': 2,
            'parentId': null,
            'nameRu': 'PDF',
            'nameKz': 'PDF',
            'code': null,
          },
        },
      },
      {
        'id': 230,
        'status': 1,
        'entryDate': '31.10.2018 21:16',
        'userId': {
          'id': '346DD7A796744F06A2593521D3935F12',
          'iin': '860000000000',
          'surname': 'КУДАЙБЕРГЕНОВ',
          'firstname': 'БЕКЖАН',
          'patronname': 'БАУЫРЖАНОВИЧ',
          'birthDate': '20.05.2018',
          'organizationId': {
            'id': '70A1F9C472805177E054001B782A74A6',
            'bin': '990440000385',
            'nameRu': 'Акционерное общество "Центр развития трудовых ресурсов"\n',
            'nameKz': 'Акционерное общество "Центр развития трудовых ресурсов"\n',
            'address': null,
            'entryDate': '10.07.2018 15:44',
            'changeDate': null,
            'dOkedList': null,
          },
        },
        'reportId': {
          'id': 1,
          'nameRu': 'Количество договоров в разрезе должностей',
          'nameKz': 'Количество договоров в разрезе должностей',
          'params': null,
          'exportFormat': {
            'id': 2,
            'parentId': null,
            'nameRu': 'PDF',
            'nameKz': 'PDF',
            'code': null,
          },
        },
      },
      {
        'id': 231,
        'status': 2,
        'message': 'Lorem ipsum',
        'entryDate': '31.10.2018 21:16',
        'userId': {
          'id': '346DD7A796744F06A2593521D3935F12',
          'iin': '860000000000',
          'surname': 'КУДАЙБЕРГЕНОВ',
          'firstname': 'БЕКЖАН',
          'patronname': 'БАУЫРЖАНОВИЧ',
          'birthDate': '20.05.2018',
          'organizationId': {
            'id': '70A1F9C472805177E054001B782A74A6',
            'bin': '990440000385',
            'nameRu': 'Акционерное общество "Центр развития трудовых ресурсов"\n',
            'nameKz': 'Акционерное общество "Центр развития трудовых ресурсов"\n',
            'address': null,
            'entryDate': '10.07.2018 15:44',
            'changeDate': null,
            'dOkedList': null,
          },
        },
        'reportId': {
          'id': 1,
          'nameRu': 'Количество договоров в разрезе должностей',
          'nameKz': 'Количество договоров в разрезе должностей',
          'params': null,
          'exportFormat': {
            'id': 2,
            'parentId': null,
            'nameRu': 'PDF',
            'nameKz': 'PDF',
            'code': null,
          },
        },
      },
    ],
  };

  componentWillUnmount() {
    console.log('unMount');
  }

  /*shouldComponentUpdate(nextProps, nextState, nextContext) {

  }*/


  downloadFile = async (param) => {
    var link = document.createElement('a');
    link.href = 'https://www.7-zip.org/a/7z1805.exe';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  createTask = async (result) => {

    let intervalOrder = {
      key: result.id,
      count: this.state._configTimer.count,
      clear: () => {
        clearInterval(timer);
      },
    };

    let timer = setInterval(() => {
      intervalOrder.count--;

      this.getOrder(result.id, intervalOrder.count, () => {
        intervalOrder.clear();
        this.removeTask(result.id);
      });

    }, this.state._configTimer.second);

    this.setState(prevState => ({
      tasks: [...prevState.tasks, intervalOrder],
    }));
  };

  removeTask(taskItem) {
    this.setState(prevState => ({
      tasks: prevState.tasks.filter(x => x.key !== taskItem),
    }));
  }

  getOrder = async (taskItem, count, call) => {

    const res = await fetch('/api/refund/getorder');
    const json = await res.json();

    if (json.status !== 0) {
      this.setStatus(taskItem, json, call);
    } else if (count === 0) {
      this.setStatus(taskItem, { status: 2, message: formatMessage({ id: 'system.system.timeout' }) }, call);
    }
  };

  setStatus = async (taskItem, json, call) => {
    const { dataSource } = this.state;
    let _dataSource = [];

    dataSource.forEach((item) => {
      if (item.id === taskItem) {
        item.status = json.status;
        item.message = json.message;
      }
      _dataSource.push(item);
    });

    this.setState({
      dataSource: _dataSource,
    }, () => {
      call();
    });
  };

  saveOrder = async () => {
// to do filter send
    const res = await fetch('/api/refund/saveorder');
    let result = await res.json();

    result.message = '';

    this.setState(prevState => ({
      dataSource: [result, ...prevState.dataSource],
    }), () => {
      this.createTask(result);
    });
  };

  componentDidUpdate() {
    if (this.props.formingReport) {
      this.props.unReport();
      this.saveOrder();
    }
  }

  componentDidMount() {
    if (this.props.formingReport) {
      this.props.unReport();
      this.saveOrder();
    }
  }

  render() {

    const { columns, dataSource } = this.state;

    return (<Table
      size={'small'}
      rowClassName={(record, index) => {
        return this.state.selectedRow === index ? 'active' : '';
      }}
      onRow={(record, index) => {
        return {
          onClick: () => {
            this.setState({
              selectedRow: index,
            });
          },
        };
      }}
      rowKey={'id'}
      columns={columns}
      bordered={true}
      dataSource={dataSource}/>);
  }
}
