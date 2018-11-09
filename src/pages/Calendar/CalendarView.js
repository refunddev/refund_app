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
  Label,
  Select,
  Calendar,
  Badge,
  DatePicker,
  Modal,
} from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import style from './CalendarView.less';
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/ru_RU';
import ModalGridView from '@/components/ModalGridView';

moment.locale('ru-ru');


const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const Option = Select.Option;


export default class CalendarView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentDate: moment(),
      modalVisible: false,
      selectedDate: '',
      modalData: {},
      dataSource: [],
      modalForm: {
        selectedDayType: '',
        description: '',
        deleteBtnVisible: false,
        eventDescriptionVisible: false,
      },
    };
  }

  componentDidMount() {
    this.setState({
      dataSource: [{
        date: '23.10.2018',
        EventID: {
          id: '1',
          code: '10',
        },
      }, {
        date: '01.10.2018',
        EventID: {
          id: '2',
          name: 'Lorem ipsum dolor sit amet 11111',
          code: '10',
        },
      }],
    });


  }

  showModal = (data) => {

    const { modalForm } = this.state;

    if (Object.keys(data).length) {
      modalForm.eventDescriptionVisible = data.id === '2';
      modalForm.deleteBtnVisible = true;
      modalForm.description = data.name;
      modalForm.selectedDayType = data.id;
    }

    this.setState({
      modalVisible: true,
      modalData: data ? data : {},
      modalForm: modalForm,
    });
  };
  handleOk = (e) => {
    const { modalForm } = this.state;
    this.handleCancel();
  };
  handleCancel = (e) => {
    this.setState({
      modalData: {},
      modalVisible: false,
      modalForm: {
        selectedDay: '',
        description: '',
        deleteBtnVisible: false,
        eventDescriptionVisible: false,
      },
    });
  };
  handleDelete = () => {
    const { modalData, dataSource } = this.state;

    if (Object.keys(modalData).length > 0) {
      console.log(modalData);
    }
  };

  dateCellRender(value) {
    const eventData = this.getListData(value);

    return eventData && (
      <div className={'event_day'}><Icon type="calendar" theme="outlined"/>{eventData.name}</div>
    );
  }

  getListData(value) {
    let listData;

    const { dataSource } = this.state;

    dataSource.forEach((dateItem) => {
      let _date = moment(dateItem.date, 'DD-MM-YYYY').format('DD');
      let _month = moment(dateItem.date, 'DD-MM-YYYY').format('MM');

      if (_date == value.date() && _month == value.month() + 1) {
        listData = dateItem.EventID;
      }
    });

    return listData || '';
  }

  getMonthData(value) {
    if (value.month() === 8) {
      return 1394;
    }
  }

  monthCellRender(value) {
    const num = this.getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }

  onSelectDate(e) {
    let _date = moment(e, 'DD.MM.YYYY');

    this.setState({ selectedDate: _date });

    let EventData = this.getListData(e);
    this.showModal(EventData);
  }

  onChangeDatePicker(e, st) {

    let month = moment(e).format('MM');
    let year = moment(e).format('YYYY');

    /// send to server is redux init

    if (e)
      this.setState({
        currentDate: e,
      });
  }

  render() {

    const { modalVisible, currentDate, modalForm } = this.state;
    const { eventDescriptionVisible, deleteBtnVisible } = modalForm;
    const spantitle = {fontSize:"13px", fontWeight:"bold"};


    return (<PageHeaderWrapper title={formatMessage({ id: 'menu.refunds.calendar' })}>
      <Modal centered
             className={style.modal_buttons}
             title={formatMessage({ id: 'calendar.createEvent' })+" "+moment(this.state.selectedDate).format('DD.MM.YYYY')}
             onCancel={this.handleCancel.bind(this)}
             visible={modalVisible}
             footer={[
               <Button style={{ display: deleteBtnVisible ? '' : 'none' }} key="delete"
                       onClick={this.handleDelete}
                       type="danger">{formatMessage({ id: 'button.delete' })}</Button>,
               <Button key="submit" onClick={this.handleOk} type="primary">{formatMessage({ id: 'form.save' })}</Button>,
               <Button key="cancel" onClick={this.handleCancel}>{formatMessage({ id: 'button.cancel' })}</Button>,
             ]}>
        <div><span style={spantitle}>{formatMessage({ id: 'label.type' })}:</span>
        <Select
          style={{ width: '100%' }}
          placeholder={formatMessage({ id: 'label.select' })}
          value={modalForm.selectedDayType}
          onChange={(value, option) => {
            this.setState(({ modalForm }) => ({
              modalForm: {
                ...modalForm,
                selectedDayType: value,
                description: '',
                eventDescriptionVisible: value === '2',
              },
            }));
          }}
          optionFilterProp="children">
          <Option value="1">Выходной день</Option>
          <Option value="2">Праздничный день</Option>
        </Select>
        </div>
        <div style={{display: eventDescriptionVisible ? '' : 'none' }}><span style={spantitle}>{formatMessage({ id: 'component.globalHeader.event' })}:</span>
        <Input value={modalForm.description} title={"asdasd"} onChange={(({ target }) => {

          this.setState(({ modalForm }) => ({
            modalForm: {
              ...modalForm,
              description: target.value,
            },
          }));
        })} style={{ width: '100%'}}
               placeholder={formatMessage({ id: 'component.globalHeader.event' })}/>
        </div>
      </Modal>


      <Card bordered={false}>
        <div>
          <MonthPicker format={"MM.YYYY"} value={currentDate} onChange={this.onChangeDatePicker.bind(this)} placeholder={formatMessage({ id: 'label.select' })}/>
          <Calendar value={currentDate} className={style.customCalendar} onSelect={this.onSelectDate.bind(this)}
                    dateCellRender={this.dateCellRender.bind(this)}
                    monthCellRender={this.monthCellRender.bind(this)}/>
        </div>
      </Card>
    </PageHeaderWrapper>);
  };
}
