import './App.scss';

import { Layout, Button, Row, Col, Space } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Component } from 'react';
import Forms from './components/form/form';
import ImportantNotes from './components/important-notes/important-notes';

const { Header, Footer, Content } = Layout;

const formControls = [
  { name: ['title'], value: null, required: true, disabled: false },
  { name: ['firstName'], value: null, required: true, disabled: false },
  { name: ['lastName'], value: null, required: true, disabled: false },
  { name: ['mobileNumber'], value: null, required: true, disabled: false },
  { name: ['emailAddress'], value: null, required: true, disabled: false },
  { name: ['collectionBranch'], value: null, required: true, disabled: false },
  { name: ['collectionDate'], value: null, required: true, disabled: false },
  { name: ['collectionTimeslot'], value: null, required: true, disabled: false }
]

class App extends Component {
  form: any;
  state = { fields: formControls, orderStatus: "change" };

  submitOrder(fields: any) {
    console.log(fields);
  }

  reviewOrder(fields: any) {
    this.setState({ orderStatus: 'review' });
    fields = formControls.map((f: any) => { f.disabled = true; return f });
    this.setState({ fields });
  }

  backToChange() {
    this.setState({ orderStatus: 'change' });
  }
  render() {
    return (
      <Layout>
        <Header>
          <div className='header'>Chinese New Year Banknotes Booking</div>
          <div>Please fill in the below ordering form to complete the registration</div>
        </Header>
        <Content>
          <ImportantNotes />
          <Forms form={this.form} fields={this.state.fields} status={this.state.orderStatus} onChange={(newFields: any) => { this.setState({ fields: newFields }); }} />
        </Content>
        <Footer>
          <Row className='footer-row'>
            <Col span={4} offset={20}>
              <Row>
                {
                  this.state.orderStatus === 'review' &&
                  <Space align='end'>
                    <Col span={12}>
                      <Button danger type='primary' icon={<ArrowLeftOutlined />} onClick={() => this.backToChange()}>Back</Button>
                    </Col>
                    <Col span={12}>
                      <Button type='primary' icon={<ArrowRightOutlined />} onClick={() => this.submitOrder(this.state.fields)}>Submit</Button>
                    </Col>
                  </Space>
                }
                {
                  this.state.orderStatus === 'change' &&
                  <Col span={12} offset={12}>
                    <Button type='primary' icon={<ArrowRightOutlined />} onClick={() => this.reviewOrder(this.state.fields)}>Review</Button>
                  </Col>
                }
              </Row>
            </Col>
          </Row>
        </Footer>
      </Layout>
    );
  }
}

export default App;
