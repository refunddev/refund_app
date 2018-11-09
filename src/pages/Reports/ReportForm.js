import React, { Component } from 'react';
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
import moment from 'moment/moment';
import { formatMessage, FormattedMessage } from 'umi/locale';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

export default class ReportForm extends Component {
  state = {
    formId: '0',
    formFilters: [],
  };

  setFilterValue = (value, _index) => {
    this.setState(prevState => ({
      formFilters: {
        ...prevState.formFilters,
        [_index]: value,
      },
    }));
  };

  componentDidUpdate() {
    if (this.state.formId !== this.props.data.id) {
      this.setState(prevState => ({
        formId: this.props.data.id,
        formFilters: {},
      }));
    }
  }

  generateForm = (formItem, _index) => {

    const inputValue = this.state.formFilters;

    switch (formItem.type) {
      case 'RangePicker': {

        let params = {
          value: inputValue[_index] ? inputValue[_index].momentValue : null,
        };

        return (<div key={_index + '_'} style={{ margin: '5px' }}>{formItem.label}:
          <RangePicker
            {...params}
            format="DD.MM.YYYY"
            onChange={(date, stringDate) => {
              this.setFilterValue({
                value: stringDate,
                momentValue: date,
              }, _index);
            }}
            placeholder={formItem.placeHolder}
            key={_index}/>
        </div>);
      }
      case 'MonthPicker': {

        let params = {
          value: inputValue[_index] ? inputValue[_index].momentValue : null,
        };

        if (inputValue[_index]) {
          params.open = inputValue[_index].open;
        }

        return (<div key={_index + '_'} style={{ margin: '5px' }}>{formItem.label}:
          <RangePicker
            {...params}
            onOpenChange={(status) => {
              this.setFilterValue({
                open: status,
                value: inputValue[_index] ? inputValue[_index].value : null,
                momentValue: inputValue[_index] ? inputValue[_index].momentValue : null,
              }, _index);
            }}
            onPanelChange={(date, mode) => {
              if (mode[0] === 'month') {
                let dateValues = [
                  moment(date[0]).format('MM.YYYY'),
                  moment(date[1]).format('MM.YYYY'),
                ];

                this.setFilterValue({
                  open: false,
                  value: dateValues,
                  momentValue: date,
                }, _index);

              }
            }}
            placeholder={formItem.placeHolder}
            mode={['month', 'month']}
            format="MM.YYYY"
            key={_index}/>
        </div>);
      }
      default:
        break;
    }

  };

  render() {

    const { buttonIsDisabled, reportName, reportForming, data } = this.props;

    return (<Card bodyStyle={{ padding: 15 }}>
      {reportName}
      <hr/>
      {data.params ? data.params.map((filterItem, idx) => this.generateForm(filterItem, idx)) : formatMessage({ id: 'system.outParameters' })}
      <br/>
      <br/>
      <Button onClick={() => {
        reportForming(this.state.formFilters);
      }} type={'primary'} disabled={buttonIsDisabled}>{formatMessage({ id: 'system.forming' })}</Button>
    </Card>);
  }
}
