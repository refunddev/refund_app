import React, { Component } from 'react';
import { Modal, Input, Form, Icon } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';


export default class ModalChangePassword extends Component {


  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      pass1: '',
      pass2: '',
      pass3: '',
      errmsg: formatMessage({ id: 'app.password.change.emptyText' }),
      ischeck: false,
    };
  }

  componentDidMount() {
  }

  componentWillReceiveProps(props) {
    if (props != null) {
      this.setState({
        isVisible: props.visible,
        pass1: '',
        pass2: '',
        pass3: '',
        ischeck: false,
      });
    }
  }

  formfield = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleOk = () => {
    const { ischeck } = this.state;
    const { resetshow } = this.props;
    this.setState({
      ischeck: true,
    }, () => {
      if (ischeck) {
        console.log('here we send refresh password');
      }
      else {
        this.setState({ isVisible: false });
        resetshow();
      }
    });
  };


  render() {
    const spanTitleStyle = { fontSize: '13px', fontWeight: 'bold' };
    const showStyle = { display: 'block', color: 'red' };
    const hideStyle = { display: 'none' };
    const { isVisible, pass1, pass2, pass3, ischeck, errmsg } = this.state;
    const { resetshow } = this.props;

    return (<Modal
      title={formatMessage({ id: 'menu.account.changepassword' })}
      onOk={(e) => {
        this.handleOk(e);
      }}
      onCancel={(e) => {
        resetshow(e);
      }}
      width={500}
      visible={isVisible}
    >
      <Form onSubmit={this.handleSubmit} className="login-form">
        <div>
          <span style={spanTitleStyle}>{formatMessage({ id: 'menu.account.password.current' })}:</span>
          <Input
            name="pass1"
            onChange={(e) => {
              this.formfield(e);
            }}
            value={pass1}
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>}
          />
          <div style={(pass1 === '' && ischeck) ? showStyle : hideStyle}>{errmsg}</div>
        </div>
        <div>
          <span style={spanTitleStyle}>{formatMessage({ id: 'form.password.placeholder' })}:</span>
          <Input
            value={pass2}
            onChange={(e) => {
              this.formfield(e);
            }}
            name="pass2"
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>}
          />
          <div style={(pass2 === '' && ischeck) ? showStyle : hideStyle}>{errmsg}</div>
        </div>
        <div>
          <span style={spanTitleStyle}>{formatMessage({id:"form.confirm-password.label"})}:</span>
          <Input
            value={pass3}
            onChange={(e) => {
              this.formfield(e);
            }}
            name="pass3"
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>}
          />
          <div style={(pass3 === '' && ischeck) ? showStyle : hideStyle}>{errmsg}</div>
        </div>
      </Form>
    </Modal>);
  }
}


