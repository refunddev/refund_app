import React, { Component } from 'react';
import { Card, Label, Row, Col, Input, Button, Table, Tabs, Spin } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva/index';

const TabPane = Tabs.TabPane;

@connect(({ universal, loading }) => ({
  universal,
  loadingData: loading.effects['universal/optionsData'],
}))
class Options extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      columns: [],
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'universal/optionsData',
      payload: {},
    });
  }


  fieldOnChange = (value, index, childindex) => {
    const datasource = this.props.universal.options;
    datasource[index].groupOptionList[childindex].optionValue = value;
    const { dispatch } = this.props;
    dispatch({
      type: 'universal/optionsDatachange',
      payload: datasource,
    });
  };
  saveChanges = () => {
    console.log(this.state.datasource);
  };


  render() {
    const { datasource } = this.props.universal.options;
    return (
      <PageHeaderWrapper title={formatMessage({ id: 'menu.options' })} children={'Child'}>
        <Spin tip={formatMessage({ id: 'system.loading' })} spinning={this.props.loadingData}>
          <Card style={{ borderRadius: '5px', marginBottom: '10px' }} bodyStyle={{ padding: 0 }} bordered={true}>
            <Row>
              <Button
                type="primary"
                style={{ margin: '5px 0px 0px 5px' }}
                onClick={() => {
                  this.saveChanges();
                }}>
                {formatMessage({ id: 'form.save' })}
              </Button>
            </Row>
            <Row>
              <Tabs defaultActiveKey="0">
                {this.props.universal.options.map((tabItem, index) => {
                  return (
                    <TabPane tab={tabItem.groupNameRu} key={index}>
                      {tabItem.groupOptionList
                        .map((inputs, childindex) => {
                          return (
                            <Row style={{ margin: '0px 10px 10px 10px' }} key={index + '' + childindex}>
                              <Col span={24} key={index + '' + childindex}>
                                <Input addonBefore={inputs.optionName} key={index + '' + childindex}
                                       defaultValue={inputs.optionValue} onChange={(e) => {
                                  this.fieldOnChange(e.target.value, index, childindex);
                                }}/>
                              </Col>
                            </Row>
                          );
                        })
                      }
                    </TabPane>);
                })}
              </Tabs>
            </Row>
          </Card>
        </Spin>
      </PageHeaderWrapper>
    );
  }
}

export default Options;
