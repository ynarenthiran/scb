import './update-booking.scss';

import { Component } from "react";
import { Button, Col, Form, Input, Row, Space, Table } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { withTranslation } from 'react-i18next';

class UpdateBooking extends Component {
    state = { email: null, mobile: null, selectedRowKeys: [] };

    submitForm() {
        console.log(this.state);
    }

    columns = [
        {
            title: 'Collection Date',
            dataIndex: 'collection_date'
        },
        {
            title: 'Collection Timeslot',
            dataIndex: 'collection_timeslot'
        },
        {
            title: 'Collection Branch',
            dataIndex: 'collection_branch'
        },
        {
            title: 'Reference Number',
            dataIndex: 'reference_number'
        }
    ];

    data: any = [];

    onSelectChange = (selectedRowKeys: any) => {
        this.setState({ selectedRowKeys });
        this.rowSelection.selectedRowKeys = selectedRowKeys;
    };

    rowSelection = {
        selectedRowKeys: [],
        onChange: this.onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_NONE
        ]
    };

    render() {
        for (let i = 0; i < 150; i++) {
            this.data.push({
                key: i,
                reference_number: i,
                collection_date: i,
                collection_timeslot: `Edward King ${i}`,
                collection_branch: 32
            });
        }
        const { t }: any = this.props;
        return (
            <Row>
                <Col span={10}>
                    <Form className='update-booking' layout="horizontal">
                        <Space direction="vertical">
                            <Form.Item name='mobileNumber' label={t('update_booking.mobile')}>
                                <Input size="large" placeholder={t('update_booking.mobile')} onChange={(e) => this.setState({ mobile: e.target.value })} />
                            </Form.Item>
                            or
                            <Form.Item name='emailAddress' label={t('update_booking.email')}>
                                <Input size="large" placeholder={t('update_booking.email')} onChange={(e) => this.setState({ email: e.target.value })} />
                            </Form.Item>
                            <Col className='submit-button' span={8} offset={16}>
                                <Button className='submit-btn' type="primary" disabled={!this.state.email && !this.state.mobile} icon={<ArrowRightOutlined />} onClick={() => this.submitForm()}>{t('update_booking.button')}</Button>
                            </Col>
                        </Space>
                    </Form>
                </Col>
                <Col span={14}>
                    <Table rowSelection={this.rowSelection} columns={this.columns} dataSource={this.data} size="small" bordered pagination={{ pageSize: 10 }} scroll={{ y: 165 }} />
                </Col>
            </Row>
        );
    }
}

const UpdateBookingTranslated = withTranslation()(UpdateBooking);

export default UpdateBookingTranslated;
