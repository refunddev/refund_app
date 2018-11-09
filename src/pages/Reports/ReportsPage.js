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
import { formatMessage, FormattedMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ReportGrid from './ReportsGrid';
import ReportForm from './ReportForm';

const TabPane = Tabs.TabPane;

export default class ReportsPage extends Component {

  state = {

    selectedRow: null,

    tabs: {
      activeKey: '1',
    },

    reportForm: {
      data: {},
      filterData: [],
      buttonIsDisabled: true,
      reportName: '',
    },

    reportsData: {
      columns: [{
        title: '№',
        dataIndex: 'index',
      }, {
        title: 'Наименование на казахском',
        dataIndex: 'name_kk',
      }, {
        title: 'Наименование на русском',
        dataIndex: 'name_ru',
      }, {
        title: 'Формат',
        dataIndex: 'file_type',
      }],

      dataSource: [{
        id: '1',
        index: 1,
        name_ru: 'Количество договоров в разрезе1',
        name_kk: 'Количество договоров в разрезе1',
        params: [{
          type: 'RangePicker',
          label: 'Дата',
          placeHolder: ['С', 'ПО'],
        }, {
          type: 'MonthPicker',
          label: 'Месяц',
          placeHolder: ['С', 'ПО'],
        }],
        file_type: 'PDF',
      }, {
        id: '2',
        index: 2,
        name_ru: 'Количество договоров в разрезе2',
        name_kk: 'Количество договоров в разрезе2',
        params: [{
          type: 'RangePicker',
          label: 'Дата',
          placeHolder: ['С', 'ПО'],
        }, {
          type: 'MonthPicker',
          label: 'Месяц',
          placeHolder: ['С', 'ПО'],
        }, {
          type: 'MonthPicker',
          label: 'Месяц 1',
          placeHolder: ['С', 'ПО'],
        }],
        file_type: 'PDF',
      }],
    },

  };


  onRowClick = (record, index) => {
    this.setState({
      selectedRow: index,
      reportForm: {
        formingReport: false,
        reportName: record.name_ru,
        buttonIsDisabled: false,
        data: record,
      },
    });


  };

  unReport = () => {
    this.setState((prevState, props) => {
      return {
        reportForm: {
          ...prevState.reportForm,
          formingReport: false,
        },
      };
    });
  };

  reportForming = (formFilter) => {

    let filteredData = [];

    Object.keys(formFilter).forEach((formItem) => {
      if (formFilter[formItem].momentValue) {
        filteredData.push({
          index: formItem,
          valueList: formFilter[formItem].value,
        });
      }

    });

    let orderRecord = this.state.reportForm.data;
    this.setState((prevState, props) => {
      return {
        reportForm: {
          ...prevState.reportForm,
          formingReport: true,
          filterData: filteredData,
        },
        tabs: {
          activeKey: '2',
        },
      };
    });
  };


  tabOnChange = (activeKey) => {
    if (this.state.tabs.activeKey === activeKey) return;
    this.setState((prevState, props) => {
      return {
        tabs: {
          activeKey: activeKey,
        },
      };
    });
  };

  render() {
    return (<PageHeaderWrapper title="Отчеты">
        <Card bodyStyle={{ padding: 5 }}>
          <Row gutter={16}>
            <Col sm={18} md={18}>
              <Tabs onChange={this.tabOnChange} activeKey={this.state.tabs.activeKey}>
                <TabPane tab={formatMessage({ id: 'report.list' })} key="1">
                  <Table
                    rowClassName={(record, index) => {
                      return this.state.selectedRow === index ? 'active' : '';
                    }}
                    size={'small'}
                    rowKey={'id'}
                    onRow={(record, index) => {
                      return {
                        onClick: () => this.onRowClick(record, index),
                      };
                    }}
                    pagination={false}
                    columns={this.state.reportsData.columns}
                    bordered={true}
                    dataSource={this.state.reportsData.dataSource}/>
                </TabPane>
                <TabPane tab={formatMessage({ id: 'report.formingList' })} key="2">
                  <ReportGrid  {...this.state.reportForm} unReport={this.unReport}/>
                </TabPane>
              </Tabs>

            </Col>
            <Col sm={6} md={6}>
              <ReportForm {...this.state.reportForm} reportForming={this.reportForming}/>
            </Col>
          </Row>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
