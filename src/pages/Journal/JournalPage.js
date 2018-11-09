import React, { Component } from 'react';
import {
  Card,
  Tabs,
  Table,
  Icon,
  Menu,
  Dropdown,
  Button,
  Label,
  Pagination,
  Row,
  Col,
  Form,
  Input,
  DatePicker,
  Select,
  Checkbox,
  Spin,
  Divider,
} from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import GridFilter from '@/components/GridFilter';
import { faTimes } from '@fortawesome/free-solid-svg-icons/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SmartGridView from '@/components/SmartGridView';
import { connect } from 'dva';

const TabPane = Tabs.TabPane;
const dateFormat = 'YYYY/MM/DD';


@connect(({ universal2, loading }) => ({
  universal2,
  loadingData: loading.effects['universal2/data'],
}))
export default class JournalPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [],
      filterContainer: 0,
      searchButton: false,
      dataContent: {
        'size': 15,
        'totalElements': 8921,
        'totalPages': 595,
        'content': [],
      },

      filterForm: [],
    };
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'universal2/clear',
      payload: {
        table: 'requests',
      },
    });
  }

  componentDidMount() {

    const { dispatch } = this.props;
    dispatch({
      type: 'universal2/columns',
      payload: {
        table: 'journal',
      },
    });
    dispatch({
      type: 'universal2/data',
      payload: {
        table: 'journal',
      },
    });

    this.setState({
      filterForm: [
        {
          name: 'date',
          label: 'Дата',
          type: 'betweenDate',
        },
        {
          name: 'iin',
          label: 'ИИН Потребителя',
          type: 'text',
        }, {
          name: 'number_request',
          label: 'Номер заявки',
          type: 'text',
        }, {
          name: 'login',
          label: 'Логин',
          type: 'text',
        }, {
          name: 'action',
          label: 'Действия',
          type: 'combobox',
          store: [{
            id: '0',
            name: 'Исполнено-одобрено',
          }, {
            id: '1',
            name: 'Исполнено',
          }],
        },
      ],
    });
  }

  applyFilter(dataFilter) {
    console.log(dataFilter);
  }

  clearFilter() {
    console.log('clearead');
  }

  onShowSizeChange = (current, pageSize) => {

    const max = current * pageSize;
    const min = max - pageSize;
    /*this.setState({
      dataSource: this.state.testdata.content.slice(min, max),
    });*/

    const { dispatch } = this.props;
    dispatch({
      type: 'universal2/data',
      payload: {
        table: 'payment',
      },
    });
  };


  refreshTable = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'universal2/data',
      payload: {
        table: 'journal',
      },
    });
  };

  filterPanelState = () => {
    this.setState(({ filterContainer }) => ({
      searchButton: filterContainer == 6 ? 0 : 6,
      filterContainer: filterContainer == 6 ? 0 : 6,
    }));
  };

  render() {

    const { dataStore, columns } = this.props.universal2;

    const DataDiv = () => (
      <Spin tip="Загрузка..." spinning={this.props.loadingData}>
        <SmartGridView
          name={'journalPageColumns'}
          searchButton={this.state.searchButton}
          fixedBody={true}
          rowKey={'id'}
          loading={this.props.loadingData}
          fixedHeader={true}
          rowSelection={true}
          columns={columns}
          sorted={true}
          showTotal={false}
          dataSource={{
            total: 50,
            pageSize: 10,
            page: 1,
            data: dataStore,
          }}
          onShowSizeChange={(pageNumber, pageSize) => {
            console.log(pageNumber, pageSize);
          }}
          onSelectCell={(cellIndex, cell) => {

          }}
          onSelectRow={() => {

          }}
          onFilter={(filters) => {

          }}
          onRefresh={() => {
            this.refreshTable();
          }}
          onSearch={() => {
            this.filterPanelState();
          }}
        />
      </Spin>
    );

    return (
      <PageHeaderWrapper title={formatMessage({ id: 'menu.journal.title' })}>
        <Card bodyStyle={{ padding: 5 }}>
          <Tabs defaultActiveKey="1">
            <TabPane tab={formatMessage({ id: 'menu.journal.refunds' })} key="1">
              <Row>
                <Col xs={this.state.filterContainer !== 6 ? 0 : 24} sm={this.state.filterContainer !== 6 ? 0 : 24}
                     md={this.state.filterContainer}>
                  <Card
                    headStyle={{
                      padding: '0 14px',
                    }}
                    style={{ margin: '0px 5px 10px 0px', borderRadius: '5px' }}
                    type="inner"
                    title={formatMessage({ id: 'system.filter' })}
                    extra={<Icon style={{ 'cursor': 'pointer' }} onClick={this.filterPanelState}><FontAwesomeIcon
                      icon={faTimes}/></Icon>}
                  >
                    <GridFilter clearFilter={this.clearFilter} applyFilter={this.applyFilter} key={'1'}
                                filterForm={this.state.filterForm}
                                dateFormat={dateFormat}/>
                  </Card>

                </Col>
                <Col xs={24} sm={this.state.filterContainer !== 6 ? 0 : 24}
                     md={this.state.filterContainer !== 6 ? 24 : 18}>
                  <DataDiv/>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab={formatMessage({ id: 'menu.journal.requests' })} key="2">
              Заявки
            </TabPane>
          </Tabs>
        </Card>
        <br/>
      </PageHeaderWrapper>);
  }

}
