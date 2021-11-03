import './update-booking.scss';

import { Component } from "react";
import { Button, Col, Form, Input, Row, Space, Table } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { withTranslation } from 'react-i18next';
import { CommonHttpService } from '../../../services/common-http.service';
import _ from 'lodash';

class UpdateBooking extends Component {
    state = { mobile: '', selectedRowKeys: [], mobileSearch: null, loadingAppointment: false, appointmentData: null, status: null };
    service = new CommonHttpService();

    componentWillUnmount() {
        this.setState({});
    }

    submitForm() {
        this.setState({ loadingAppointment: true });
        let validateCaptcha = {
            "data":
            {
                "id": 0,
                "type": "APPOINTMENT",
                "attributes": { "unique-id": this.props.uuid, "mobileNo": '852' + this.state.mobile }
            }
        };
        this.service.post('/appointments', validateCaptcha, this.props.uuid, this.props.lang).then(res => {
            this.setState({
                status: res.status,
            });
            return res.json();
        }).then((response) => {
            console.log("result.status:" + this.state.status);
            console.log("response:", response);
            this.setState({ loadingAppointment: true });
            if (this.state.status === 404) {
                this.setState({ loadingAppointment: false });
            } else if (this.state.status === 200) {
                this.setState({ loadingAppointment: false });
                _.each(response, (r) => {
                    r.key = r['ref-id'];
                })
                this.setState({ appointmentData: response });
                console.log("response:", this.state.appointmentData);
            } else {
                this.setState({ loadingAppointment: false });
            }
        }).catch((error) => {
            this.setState({ loadingAppointment: false });
        });
    }

    validate(e: any) {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({ mobile: e.target.value })
        }
        console.log("check function 1" + this.state.mobile)
    }

    props: any = this.props;
    constructor(props?: any) {
        super(props);
        props = this.props;
        console.log("lanaguge:" + this.props.lang)
        console.log("uuid:" + this.props.uuid)
        // this.validate = this.validate.bind(this);
    }
    columns = [
        {
            title: 'Collection Date',
            dataIndex: 'appointment-date'
        },
        {
            title: 'Collection Timeslot',
            dataIndex: 'appointment-slot'
        },
        {
            title: 'Collection Branch',
            dataIndex: 'branch-name'
        },
        {
            title: 'Reference Number',
            dataIndex: 'ref-id'
        }
    ];

    data: any = [];

    onSelectChange = (selectedRowKeys: any) => {
        this.setState({ selectedRowKeys });
        this.rowSelection.selectedRowKeys = selectedRowKeys;
    };

    rowSelection = {
        selectedRowKeys: [],
        onChange: this.onSelectChange
    };

    render() {
        // for (let i = 0; i < 150; i++) {
        //     this.data.push({
        //         key: i,
        //         'appointment-date': i,
        //         'appointment-slot': i,
        //         'branch-name': `Edward King ${i}`,
        //         'ref-id': 32
        //     });
        // }
        const { t }: any = this.props;
        return (
            <Row>
                <Col span={10}>
                    <Form className='update-booking' layout="horizontal">
                        <Space direction="vertical">
                            <Form.Item name='mobileNumber' label={t('update_booking.mobile')}>
                                <Input.Group compact>
                                    <Input style={{ width: '15%' }} disabled={true} size="large" defaultValue="852" />
                                    <Input style={{ width: '85%' }} size="large" maxLength={8} placeholder={t('update_booking.mobile')} value={this.state.mobile} onChange={(e) => this.validate(e)} autoFocus />
                                </Input.Group>
                            </Form.Item>
                            <Col className='submit-button' span={8} offset={16}>
                                <Button className='submit-btn' type="primary" disabled={this.state.mobile.length !== 8} icon={<ArrowRightOutlined />} onClick={() => this.submitForm()}>{t('update_booking.button')}</Button>
                            </Col>
                        </Space>
                    </Form>
                </Col>
                {
                    this.state.loadingAppointment &&
                    <div id="loader" className="loader"></div>
                }
                {
                    this.state.appointmentData != null &&
                    <Col span={14}>
                        <Table rowSelection={{ type: 'radio', ...this.rowSelection }} columns={this.columns} dataSource={this.state.appointmentData} size="small" bordered pagination={{ pageSize: 10 }} scroll={{ y: 165 }} />
                    </Col>
                }
            </Row>
        );
    }
}
const UpdateBookingTranslated = withTranslation()(UpdateBooking);
export default UpdateBookingTranslated;