import './update-booking.scss';

import { Component } from "react";
import { Button, Col, Form, Input, Space } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

class UpdateBooking extends Component {
    state = { email: null, mobile: null };

    submitForm() {
        console.log(this.state);
    }

    render() {
        return (
            <Form className='update-booking' layout="horizontal">
                <Space direction="vertical">
                    <Form.Item name='mobileNumber' label="Mobile Number">
                        <Input size="large" placeholder="Mobile Number" onChange={(e) => this.setState({ mobile: e.target.value })} />
                    </Form.Item>
                    or
                    <Form.Item name='emailAddress' label="Email Address">
                        <Input size="large" placeholder="Email Address" onChange={(e) => this.setState({ email: e.target.value })} />
                    </Form.Item>
                    <Col span={8} offset={16}>
                        <Button className='submit-btn' type="primary" disabled={!this.state.email && !this.state.mobile} icon={<ArrowRightOutlined />} onClick={() => this.submitForm()}>Submit</Button>
                    </Col>
                </Space>
            </Form>
        );
    }
}

export default UpdateBooking;
