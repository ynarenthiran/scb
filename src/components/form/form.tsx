import './form.scss';

import { Row, Form, Input, Select, DatePicker, Space } from 'antd';
import { Option } from 'antd/lib/mentions';

function Forms(props: any) {
    return (
        <div className='form'>
            <div className="title">{props.status === 'review' ? 'Review of ' : ''}Order Details</div>
            <Form layout="vertical" fields={props.fields}
                onFieldsChange={(_, allFields) => {
                    props.onChange(allFields);
                }} form={props.form}>
                <Row>
                    <Space>
                        <Form.Item name='title' label="Title" rules={[{ required: true, message: 'Username is required!' }]}>
                            <Select disabled={props.status === 'review'} size="large" placeholder="Please Select...">
                                <Option value="Mr.">Mr.</Option>
                                <Option value="Mrs.">Mrs.</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name='firstName' label="First Name" rules={[{ required: true, message: 'Username is required!' }]}>
                            <Input disabled={props.status === 'review'} size="large" placeholder="First Name" />
                            {
                                false && <span className="ant-form-text">First Name</span>
                            }
                        </Form.Item>
                        <Form.Item name='lastName' label="Last Name" rules={[{ required: true, message: 'Username is required!' }]}>
                            <Input disabled={props.status === 'review'} size="large" placeholder="Last Name" />
                            {
                                false && <span className="ant-form-text">Last Name</span>
                            }
                        </Form.Item>
                    </Space>
                </Row>
                <Row>
                    <Space>
                        <Form.Item name='mobileNumber' label="Mobile Number" rules={[{ required: true, message: 'Username is required!' }]}>
                            <Input disabled={props.status === 'review'} size="large" placeholder="Mobile Number" />
                            {
                                false && <span className="ant-form-text">Mobile Number</span>
                            }
                        </Form.Item>
                        <Form.Item name='emailAddress' label="Email Address" rules={[{ required: true, message: 'Username is required!' }]}>
                            <Input disabled={props.status === 'review'} size="large" placeholder="Email Address" />
                            {
                                false && <span className="ant-form-text">Email Address</span>
                            }
                        </Form.Item>
                    </Space>
                </Row>
                <Row>
                    <Space>
                        <Form.Item name='collectionBranch' label="Collection Branch" rules={[{ required: true, message: 'Username is required!' }]}>
                            <Select disabled={props.status === 'review'} size="large" placeholder="Please Select...">
                                {['1', '2', '3', '4', '5', '6', '7', '8'].map((i) => <Option value={i} >Branch {i}</Option>)}
                            </Select>
                        </Form.Item>
                        <Form.Item name='collectionDate' label="Collection Date" rules={[{ required: true, message: 'Username is required!' }]}>
                            <DatePicker disabled={props.status === 'review'} size="large"
                                style={{
                                    width: '100%',
                                }}
                            />
                        </Form.Item>
                        <Form.Item name='collectionTimeslot' label="Collection Timeslot" rules={[{ required: true, message: 'Username is required!' }]}>
                            <Select disabled={props.status === 'review'} size="large" placeholder="Please Select...">
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
                    <span className="ant-form-text">1</span>
                </Form.Item>
            </Form>
        </div>
    )
};

export default Forms;