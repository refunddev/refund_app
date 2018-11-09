import React, { Component } from 'react';
import { Modal, Tabs, Table, Button, Spin } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { connect } from 'dva';

const TabPane = Tabs.TabPane;

@connect(({ universal2, loading }) => ({
  universal2,
  loadingData: loading.effects['universal2/data'],
}))
export default class ModalGridView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      isVisible: false,
    };
  }

  componentWillReceiveProps(props, prevProps) {
    if (props != null) {
      this.setState({
        isVisible: props.visible,
        dataSource: props.dataSource,
      });
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'universal2/clear',
      payload: {
        table: 'mainmodal',
      },
    });
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'universal2/columns',
      payload: {
        table: 'mainmodal',
      },
    });
    dispatch({
      type: 'universal2/data',
      payload: {
        table: 'mainmodal',
      },
    });
  }

  handleCancel = (e) => {
    this.props.resetshow();
  };

  render() {

    const { visible, universal2 } = this.props;

    let dataStore = universal2.dataStore.refundKnpList ? universal2.dataStore.refundKnpList : [];

    return (<Modal
      width={1000}
      centered
      onCancel={this.handleCancel}
      footer={[<Button key={'savemt'}>{formatMessage({id:"form.save"})}</Button>, <Button key={'exportExcel'}>{formatMessage({id:"system.excelExport"})}</Button>,
        <Button key={'closeExcel'} onClick={this.handleCancel}>{formatMessage({id:"system.close"})}</Button>]}
      visible={visible}>
      <Spin tip="Загрузка..." spinning={this.props.loadingData}>
        <Tabs>
          {dataStore.map((tabItem) => {
            return (<TabPane tab={tabItem.knpId} key={tabItem.knpId}>
              <span>{formatMessage({id:"system.totalAmount"})}: {tabItem.totalAmount}</span><span
              style={{ 'float': 'right', 'paddingRight': '10px' }}>{formatMessage({id:"app.table.column.total"})}: {tabItem.refundList.length}</span>
              <Table size={"small"} bordered={true} rowKey={'id'} pagination={false} dataSource={tabItem.refundList} columns={universal2.columns}
                    />
            </TabPane>);
          })}
        </Tabs>
      </Spin>
    </Modal>);
  }
}


