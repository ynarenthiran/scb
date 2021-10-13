import './App.scss';

import { Layout, Button, Row, Col, Form, Input, Select, DatePicker, Space } from 'antd';
import { Option } from 'antd/lib/mentions';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Header, Footer, Content } = Layout;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 4,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 8,
    },
    sm: {
      span: 8,
    },
  },
};

interface FieldData {
  name: string | number | (string | number)[];
  value?: any;
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
}

interface CustomizedFormProps {
  onChange: (fields: FieldData[]) => void;
  fields: FieldData[];
  form: any;
}

const CustomizedForm: React.FC<CustomizedFormProps> = ({ onChange, fields, form }) => (
  <Form layout="horizontal" {...formItemLayout} fields={fields}
    onFieldsChange={(_, allFields) => {
      onChange(allFields);
    }} form={form}>
    <Form.Item name='title' label="Title" rules={[{ required: true, message: 'Username is required!' }]}>
      <Select placeholder="Please Select...">
        <Option value="Mr.">Mr.</Option>
        <Option value="Mrs.">Mrs.</Option>
      </Select>
    </Form.Item>
    <Form.Item name='firstName' label="First Name" rules={[{ required: true, message: 'Username is required!' }]}>
      <Input placeholder="First Name" />
      {
        false && <span className="ant-form-text">First Name</span>
      }
    </Form.Item>
    <Form.Item name='lastName' label="Last Name" rules={[{ required: true, message: 'Username is required!' }]}>
      <Input placeholder="Last Name" />
      {
        false && <span className="ant-form-text">Last Name</span>
      }
    </Form.Item>
    <Form.Item name='mobileNumber' label="Mobile Number" className='mobile' rules={[{ required: true, message: 'Username is required!' }]}>
      <Input placeholder="Mobile Number" />
      {
        false && <span className="ant-form-text">Mobile Number</span>
      }
    </Form.Item>
    <span className="ant-form-text">or</span>
    <Form.Item name='emailAddress' label="Email Address" rules={[{ required: true, message: 'Username is required!' }]}>
      <Input placeholder="Email Address" />
      {
        false && <span className="ant-form-text">Email Address</span>
      }
    </Form.Item>
    <Form.Item name='collectionBranch' label="Collection Branch" rules={[{ required: true, message: 'Username is required!' }]}>
      <Select placeholder="Please Select...">
        {['1', '2', '3', '4', '5', '6', '7', '8'].map((i) => <Option value={i} >Branch {i}</Option>)}
      </Select>
    </Form.Item>
    <Form.Item name='collectionDate' label="Collection Date" rules={[{ required: true, message: 'Username is required!' }]}>
      <DatePicker
        style={{
          width: '100%',
        }}
      />
    </Form.Item>
    <Form.Item name='collectionTimeslot' label="Collection Timeslot" rules={[{ required: true, message: 'Username is required!' }]}>
      <Select placeholder="Please Select...">
        <Option value="10-11">10.00 AM - 11.00 AM</Option>
        <Option value="11-12">11.00 AM - 12.00 PM</Option>
        <Option value="12-13">12.00 PM - 01.00 PM</Option>
        <Option value="14-15">02.00 PM - 03.00 PM</Option>
        <Option value="15-16">03.00 PM - 04.00 PM</Option>
        <Option value="16-17">04.00 PM - 05.00 PM</Option>
        <Option value="17-18">05.00 PM - 06.00 PM</Option>
        <Option value="18-19">06.00 PM - 07.00 PM</Option>
        <Option value="19-20">07.00 PM - 08.00 PM</Option>
      </Select>
    </Form.Item>
    <Form.Item label="Quantity">
      <span className="ant-form-text">1</span>
    </Form.Item>
  </Form>
);

const formControls = [
  { name: 'title', value: null, required: true },
  { name: 'firstName', value: null, required: true },
  { name: 'lastName', value: null, required: true },
  { name: 'mobileNumber', value: null, required: true },
  { name: 'emailAddress', value: null, required: true },
  { name: 'collectionBranch', value: null, required: true },
  { name: 'collectionDate', value: null, required: true },
  { name: 'collectionTimeslot', value: null, required: true }
]

function clickMe(fields: any) {
  console.log(fields);
}

function App() {
  const [form] = Form.useForm();
  const [fields, setFields] = useState<FieldData[]>(formControls);
  return (
    <Layout>
      <Header>
        <div className='header'>Chinese New Year Banknotes Booking</div>
        <div>Please fill in the below ordering form to complete the registration</div>
      </Header>
      <Content>
        <div className='important-notes'>
          <div className="title">Important Notes</div>
          <ol>
            <li>Each client can only submit one pre-order application</li>
            <li>xxx xxx xxx</li>
            <li>xxx xxx xxx</li>
          </ol>
        </div>
        <div className='form'>
          <div className="title">Order Details</div>
          <CustomizedForm
            form={form}
            fields={fields}
            onChange={newFields => {
              setFields(newFields);
            }}
          />
        </div>
      </Content>
      <Footer>
        <Row className='footer-row'>
          <Col span={4} offset={20}>
            <Row>
              <Space>
                {
                  false && <Button style={{ width: '100%' }} danger icon={<ArrowLeftOutlined />} onClick={() => clickMe(fields)}>Back</Button>
                }
                <Button style={{ width: '100%' }} icon={<ArrowRightOutlined />} onClick={() => clickMe(fields)}>Submit</Button>
              </Space>
            </Row>
          </Col>
        </Row>
      </Footer>
    </Layout>
  );
}

export default App;
