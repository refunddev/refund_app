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

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<PageHeaderWrapper hiddenBreadcrumb={true} title="ГЛАВНАЯ">
      <div>
        Home Page

      </div>
    </PageHeaderWrapper>);
  }
}

