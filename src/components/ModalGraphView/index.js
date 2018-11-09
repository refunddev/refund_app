import React, { Component } from 'react';
import { Modal, Card, List, Tabs } from 'antd';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";


const TabPane = Tabs.TabPane;


export default class ModalGraphView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      dataSource: [
          {
            title: "Причины возвратов",
            name: "infographRefundReason",
            data: [
            {
              id: "51E748D88D4637A6E054001B782A74A6",
              name: "Ошибочно перечислены",
              value: 119,
            },
            {
              id: "51E748D88D4737A6E054001B782A74A6",
              name: "Излишне начислены на работников",
              value: 1,
            },
            {
              id: "51E748D88D4837A6E054001B782A74A6",
              name: "Неверно указан код назначения платежа",
              value: 0,
            },
            {
              id: "51E748D88D4937A6E054001B782A74A6",
              name: "В формате платежного поручения МТ 102 допущены ошибки",
              value: 0,
            },
            {
              id: "51E748D88D4A37A6E054001B782A74A6",
              name: "Неверно указаны реквизиты плательщика",
              value: 10,
            },
            {
              id: "9",
              name: "Плательщиком или банком дважды перечислено",
              value: 782,
            }
          ]
          },
          {
            title: "Статусы возвратов",
            name:"infographAppRefundStatus",
            data: [
              {
                id: "1",
                name: "Получен от ГК",
                value: 0
              },
              {
                id: "10",
                name: "Принято",
                value: 0
              },
              {
                id: "2",
                name: "Ошибка загрузки",
                value: 0
              },
              {
                id: "3",
                name: "Обработано-одобрено",
                value: 0
              },
              {
                id: "4",
                name: "Обработано - отказано",
                value: 0
              },
              {
                id: "5",
                name: "Исполнено- одобрено",
                value: 0
              },
              {
                id: "6",
                name: "Исполнено-отказано",
                value: 0
              },
              {
                id: "7",
                name: "Отправлено- одобрено",
                value: 906
              },
              {
                id: "8",
                name: "Отправлено-отказано",
                value: 6
              },
              {
                id: "9",
                name: "Ошибка в отправке",
                value: 0
              }
            ]
          }
        ]
    };
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  componentWillReceiveProps(props, prevProps) {
    if (props != null) {
      this.setState({
        isVisible: props.visible,
      //TODO  dataSource: props.dataSource,
      });
    }
  }


  handleCancel = (e) => {
    this.props.resetshow();
  };

  render() {

    const { dataSource, isVisible } = this.state;

    const cols = {
      sales: {
        tickInterval: 1
      }
    };

    const label = {
    htmlTemplate(text)  {return '<div style="white-space: normal; text-align: center; margin-top: 40px; font-size: 9px; ">'+text+'</div>'} }

    return (
      <Modal
        width={1200}
        centered
        onCancel={this.handleCancel}
        footer={[null, null]}
        visible={isVisible}
      >
        <Tabs defaultActiveKey="1">
          {dataSource.map((graph, i) =>
              <TabPane tab={graph.title} key={i+1}>
                <Chart
                  height={400}
                  data={graph.data}
                  scale={cols}
                  forceFit
                >
                  <Axis name="name" label={label} />
                  <Axis name="value" />
                  <Legend name='name' visible={false} />
                  <Tooltip
                    containerTpl='<div class="g2-tooltip"><p class="g2-tooltip-title"></p><table class="g2-tooltip-list"></table></div>'
                    itemTpl='<tr class="g2-tooltip-list-item"><td>{value}</td></tr>'
                    offset={50}
                    g2-tooltip={{
                      position: 'absolute',
                      border : '1px solid #efefef',
                      backgroundColor: 'white',
                      color: '#000',
                      opacity: "0.8",
                      padding: '5px 15px',
                      'transition': 'top 200ms,left 200ms'
                    }}
                    g2-tooltip-list={{
                      margin: '10px'
                    }}
                  />
                  <Geom type="interval" position="name*value" />
                </Chart>
              </TabPane>
            )}

        </Tabs>
      </Modal>);
  }
}
