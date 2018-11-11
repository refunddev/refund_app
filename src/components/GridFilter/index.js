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
  Divider,
  Spin,
} from 'antd';
import moment from 'moment/moment';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

@connect(({ references, loading }) => ({
  references,
  loadingData: loading.effects['references/load'],
}))
export default class GridFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isClearFilter: false,
      formFilters: {},
      disableFields: {},
      fields: {},
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { isClearFilter, fields } = this.state;

    if (Object.keys(fields).length === 0) {

      let _fields = {};

      this.props.filterForm.forEach((filterItem, idx) => {
        _fields[filterItem.name] = {
          disabled: false,
          type: filterItem.type,
        };

        if (['multibox', 'combobox'].indexOf(filterItem.type) !== -1) {
          dispatch({
            type: 'references/load',
            code: filterItem.name,
          });
        }
      });

      this.setState({
        fields: _fields,
      });
    }
  }

  componentDidUpdate() {
    const { dispatch } = this.props;
    const { isClearFilter, fields } = this.state;

    if (isClearFilter) {
      this.setState({
        isClearFilter: false,
      });
    }

    if (Object.keys(fields).length === 0) {

      let _fields = {};

      this.props.filterForm.forEach((filterItem, idx) => {
        _fields[filterItem.name] = {
          disabled: false,
          type: filterItem.type,
        };

        if (['multibox', 'combobox'].indexOf(filterItem.type) !== -1) {
          dispatch({
            type: 'references/load',
            code: filterItem.name,
          });
        }
      });

      this.setState({
        fields: _fields,
      });
    }

  }

  fieldOnChange = (filterItem, value) => {

    const { formFilters } = this.state;

    this.setState({
      formFilters: {
        ...formFilters,
        [filterItem.name]: value,
      },
    });
  };

  applyFilters = () => {
    const { fields, formFilters } = this.state;
    const { applyFilter } = this.props;

    let filterData = {};
    Object.keys(fields).forEach((field) => {
      if (formFilters[field]) {


        if (['multibox', 'combobox'].indexOf(fields[field].type) !== -1) {
          let properyName = fields[field].type == 'multibox' ? field + 'List' : field + 'Id';
          let propertyValue = fields[field].type == 'multibox' ?
            formFilters[field].map((valueId) => ({
              id: valueId,
            })) : { id: formFilters[field] };

          filterData[properyName] = fields[field].disabled ? null : propertyValue;

          return;
        }

        /// to do is null  prefix
        if (['betweenDate'].indexOf(fields[field].type) !== -1) {
          filterData[field + 'Start'] = fields[field].disabled ? null : formFilters[field][0];
          filterData[field + 'End'] = fields[field].disabled ? null : formFilters[field][1];
          return;
        }

        filterData[field] = fields[field].disabled ? null : formFilters[field];
      }
    });


    applyFilter(filterData);
  };

  clearFilters = () => {
    const { clearFilter } = this.props;
    const { fields, formFilters } = this.state;

    Object.keys(fields).forEach((field) => {
      fields[field].disabled = false;
    });

    this.setState({
      formFilters: {},
      isClearFilter: true,
    });

    clearFilter();
  };

  renderFilter = (filterItem, _index) => {

    const { dateFormat, references } = this.props;
    const { fields, formFilters, isClearFilter } = this.state;
    const mBottom = { marginBottom: '5px' };

    switch (filterItem.type) {
      case 'betweenDate': {

        let RangeDateProps = {
          ref: React.createRef(),
          /*     defaultValue: formFilters[filterItem.name] ? formFilters[filterItem.name] : [moment(new Date(), dateFormat), moment(new Date(), dateFormat)],*/
          format: dateFormat,
          onChange: (moment, dateString) => {
            this.fieldOnChange(filterItem, dateString);
          },
        };

        if (isClearFilter) {
          RangeDateProps.value = null;
          /*this.setState({
            isClearFilter: false,
          });*/
        }

        return (<div key={_index} style={mBottom}>{filterItem.label}:

          <Row>
            <Col md={22}>
              <RangePicker   {...RangeDateProps}
                             placeholder={[
                               formatMessage({ id: 'datepicker.start.label' }),
                               formatMessage({ id: 'datepicker.end.label' }),
                             ]}
                             disabled={fields[filterItem.name].disabled}/>
            </Col>
            <Col md={2}>
              <div style={{ margin: '5px' }}>
                <Checkbox checked={fields[filterItem.name].disabled} onChange={(e) => {
                  fields[filterItem.name].disabled = e.target.checked;
                  this.setState({
                    fields: fields,
                    formFilters: formFilters,
                  });
                }}></Checkbox>
              </div>
            </Col>
          </Row>
        </div>);
      }
      case 'text': {
        return (<div key={_index} style={mBottom}>{filterItem.label}:
          <Input onKeyDown={this.onKeyPress} onChange={(e) => {
            this.fieldOnChange(filterItem, e.target.value);
          }} value={formFilters[filterItem.name]} style={{ width: '100%' }}/></div>);
      }
      case 'multibox': {

        let params = {};

        if (isClearFilter) {
          params.value = [];
        }


        return (<div key={_index} style={mBottom}>{filterItem.label}:
          <Select
            {...params}
            mode="multiple"
            style={{ width: '100%' }}
            placeholder=""
            onChange={(value) => {
              this.fieldOnChange(filterItem, value);
            }}
          >
            {references[filterItem.name] && references[filterItem.name].map((item) => {
              return <Select.Option key={item.id}>{item.code} - {item.nameRu}</Select.Option>;
            })}
          </Select>
        </div>);
      }
      case 'combobox': {

        let params = {};

        if (isClearFilter) {
          params.value = [];
        }


        return (<div key={_index} style={mBottom}>{filterItem.label}:
          <Select
            {...params}
            style={{ width: '100%' }}
            placeholder=""
            onChange={(value) => {
              this.fieldOnChange(filterItem, value);
            }}
          >
            <Select.Option key={null}>{<div style={{ height: 20 }}></div>}</Select.Option>
            {references[filterItem.name] && references[filterItem.name].map((item) => {
              return <Select.Option key={item.id}>{item.nameRu}</Select.Option>;
            })}
          </Select>
        </div>);
      }
      default:
        break;
    }

  };

  onKeyPress = (e) => {
    if (e.keyCode === 13) {
      this.applyFilters();
    }
  };

  render() {

    const { fields, isClearFilter } = this.state;
    const { filterForm } = this.props;

    let count = this.props.filterForm.map((filterItem) => {
      return filterItem.type == 'multibox' || filterItem.type == 'combobox';
    }).filter((f) => f);


    return (<Spin tip="Загрузка..." spinning={count.length > 0 ? this.props.loadingData : false}>
      <Form layout={'vertical'}>
        {Object.keys(fields).length > 0 && filterForm.map((filterItem, idx) => this.renderFilter(filterItem, idx))}
        <Divider style={{ margin: '16px 10px 0 0' }}/>
        <Button style={{ margin: '10px 0 0 0px' }} type='primary'
                onClick={this.applyFilters}>
          {formatMessage({ id: 'system.search' })}
        </Button>
        <Button style={{ margin: '10px 0 0 5px' }}
                onClick={this.clearFilters}>{formatMessage({ id: 'system.clear' })}</Button>
      </Form>
    </Spin>);
  }
}
