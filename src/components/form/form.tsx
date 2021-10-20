import './form.scss';

import { Row, Form, Input, Select, DatePicker, Space, Checkbox } from 'antd';
import { Component } from 'react';
const { Option } = Select;

class Forms extends Component {
    props: any = this.props;
    state = { info: true, termsCondition: true };
    render() {
        return (
            <div className='form'>
                <div className="title">{this.props.status === 'review' ? 'Review of ' : ''}Order Details</div>
                <Form layout="vertical" fields={this.props.fields}
                    onFieldsChange={(_, allFields) => {
                        this.props.onChange(allFields);
                    }} form={this.props.form}>
                    <Row>
                        <Space>
                            <Form.Item name='title' label="Title" rules={[{ required: true, message: 'Username is required!' }]}>
                                <Select disabled={this.props.status === 'review'} size="large" placeholder="Please Select...">
                                    <Option value="Mr.">Mr.</Option>
                                    <Option value="Mrs.">Mrs.</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name='firstName' label="First Name" rules={[{ required: true, message: 'Username is required!' }]}>
                                <Input disabled={this.props.status === 'review'} size="large" placeholder="First Name" />
                                {
                                    false && <span className="ant-form-text">First Name</span>
                                }
                            </Form.Item>
                            <Form.Item name='lastName' label="Last Name" rules={[{ required: true, message: 'Username is required!' }]}>
                                <Input disabled={this.props.status === 'review'} size="large" placeholder="Last Name" />
                                {
                                    false && <span className="ant-form-text">Last Name</span>
                                }
                            </Form.Item>
                        </Space>
                    </Row>
                    <Row>
                        <Space>
                            <Form.Item name='mobileNumber' label="Mobile Number" rules={[{ required: true, message: 'Username is required!' }]}>
                                <Input disabled={this.props.status === 'review'} size="large" placeholder="Mobile Number" />
                                {
                                    false && <span className="ant-form-text">Mobile Number</span>
                                }
                            </Form.Item>
                            <Form.Item name='emailAddress' label="Email Address" rules={[{ required: true, message: 'Username is required!' }]}>
                                <Input disabled={this.props.status === 'review'} size="large" placeholder="Email Address" />
                                {
                                    false && <span className="ant-form-text">Email Address</span>
                                }
                            </Form.Item>
                        </Space>
                    </Row>
                    <Row>
                        <Space>
                            <Form.Item name='collectionBranch' label="Collection Branch" rules={[{ required: true, message: 'Username is required!' }]}>
                                <Select disabled={this.props.status === 'review'} size="large" placeholder="Please Select...">
                                    {['1', '2', '3', '4', '5', '6', '7', '8'].map((i) => <Option value={i} >Branch {i}</Option>)}
                                </Select>
                            </Form.Item>
                            <Form.Item name='collectionDate' label="Collection Date" rules={[{ required: true, message: 'Username is required!' }]}>
                                <DatePicker disabled={this.props.status === 'review'} size="large"
                                    style={{
                                        width: '100%',
                                    }}
                                />
                            </Form.Item>
                            <Form.Item name='collectionTimeslot' label="Collection Timeslot" rules={[{ required: true, message: 'Username is required!' }]}>
                                <Select disabled={this.props.status === 'review'} size="large" placeholder="Please Select...">
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
                        </Space>
                    </Row>
                    <Form.Item label="Quantity">
                        <Space direction='vertical'>
                            <span className="ant-form-text">1</span>
                            <span className="ant-form-text">Total value per pack: HK$3,000. (Denomination: HK$20 x 100pcs, HK$50 x 20pcs)</span>
                        </Space>
                    </Form.Item>
                    <Form.Item label="Declaration">
                        <Space direction='vertical'>
                            <Checkbox checked={this.state.info} onChange={(e) => this.setState({ info: e.target.checked })}>I confirm the above information is accurate to my knowledge. No amendment is allowed once the form is submitted</Checkbox>
                            <Checkbox checked={this.state.termsCondition} onChange={(e) => this.setState({ termsCondition: e.target.checked })}>I have read, understood and agreed to the terms and conditions of this application</Checkbox>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
export default Forms;