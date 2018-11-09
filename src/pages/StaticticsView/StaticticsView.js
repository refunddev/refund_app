import React, { Component } from 'react';
import {
  Card,
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
  Divider,
  Spin,
} from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment';
import { connect } from 'dva';
import { faTimes } from '@fortawesome/free-solid-svg-icons/index';
import SmartGridView from '@/components/SmartGridView';


const { RangePicker } = DatePicker;

export default class StaticticsView extends Component {
  state = {

    filters: {
      dateValues: null,
    },

    gridData: {
      columns: [
        {
          isVisible: true,
          dataIndex: 'appcount',
          title: 'Количество заявок на возврат',
        },
        {
          dataIndex: 'otcount',
          isVisible: true,
          title: 'Количество отчислений на возврат',
        },
        {
          dataIndex: 'vzcount',
          isVisible: true,
          title: 'Количество взносов на возврат',
        },
        {
          dataIndex: 'penotcount',
          isVisible: true,
          title: 'Количество пени за отчисления',
        },
        {
          dataIndex: 'penvzcount',
          isVisible: true,
          title: 'Количество пени за взносы',
        },
        {
          dataIndex: 'otsum',
          isVisible: true,
          title: 'Сумма отчислений на возврат',
        },
        {
          dataIndex: 'vzsum',
          isVisible: true,
          title: 'Сумма взносов на возврат',
        },
        {
          dataIndex: 'penotsum',
          isVisible: true,
          title: 'Сумма пени за отчисления на возврат',
        },
        {
          dataIndex: 'penvzsum',
          isVisible: true,
          title: 'Сумма пени за взносы на возврат',
        },
      ],
      dataSource: [
        {
          id: '1',
          appcount: 10,
          otcount: 11,
          vzcount: 20,
          penotcount: 15,
          penvzcount: 16,
          otsum: 15809,
          vzsum: 11809,
          penotsum: 16809,
          penvzsum: 10809,
        },
      ],
    },
  };

  componentDidMount() {
  }

  render() {

    const { gridData } = this.state;

    return (<PageHeaderWrapper title={formatMessage({ id: 'menu.refund.stat.title' })}>
      <Card bodyStyle={{ padding: 5 }}>
        <Row type="flex" justify="center">
          <Col>
            <Card bodyStyle={{ padding: 5 }}>
              <RangePicker
                //
                placeholder={[formatMessage({id:"datepicker.start.label"}), formatMessage({id:"datepicker.end.label"})]}
                format={'DD.MM.YYYY'}
                onChange={(date, dateString) => {
                  this.setState((prevState) => ({
                    filters: {
                      ...prevState.filters,
                      dateValues: dateString,
                    },
                  }));
                }}/>
              <Button style={{ margin: '10px' }} onClick={() => {
                console.log(this.state.filters.dateValues);
              }
              }>{formatMessage({id:"button.apply"})}</Button>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <SmartGridView
              name={'StatisticsView'}
              hideFilterBtn={true}
              hideRefreshBtn={true}
              columns={gridData.columns}
              dataSource={{
                data: gridData.dataSource,
              }}
            />
          </Col>
        </Row>
      </Card>
      <br/>
    </PageHeaderWrapper>);
  }

}
