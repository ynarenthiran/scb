import './update-booking.scss';

import { Component } from "react";
import { Button, Col, Form, Input, Row, Space, Table } from 'antd';
import { ArrowRightOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import { withTranslation } from 'react-i18next';
import { CommonHttpService } from '../../../services/common-http.service';
import * as _ from 'lodash';
import ModalComponentTranslated from '../../modal';

var dateFormat = require('dateformat');


class UpdateBooking extends Component {
    state = { modalMsg: '', refNo: '', showModal: false, mobile: '', mobileNumber: '', rowSelected: false, selectedRowKeys: [], selectedRows: [], mobileSearch: null, loadingAppointment: false, appointmentData: null, status: null };
    service = new CommonHttpService();


    componentWillMount() {
        console.log("tereeeee");
        this.setState({ appointmentData: null });
        this.setState({ selectedRows: null });
        this.setState({ selectedRowKeys: null });
        this.setState({ rowSelected: false });
        for (let i = 0; i < 150; i++) {
            this.data.push({
                key: i,
                'appointmentdate': i,
                'branch-name': i,
                'appointment-slot': `Edward King ${i}`,
                'ref-id': Date.now()
            });
        }
        this.setState({ appointmentData: this.data });
    }

    componentDidUnMount() {
        console.log("testsss....");
        this.setState({ appointmentData: null });
        this.setState({ selectedRows: null });
        this.setState({ selectedRowKeys: null });
        this.setState({ rowSelected: false });
    }


    getAppointments() {
        this.setState({ loadingAppointment: true });
        this.setState({ appointmentData: null });
        this.rowSelection = {
            selectedRowKeys: [],
            onChange: this.onSelectChange
        }
        let getAppointmentData = {
            "data":
            {
                "id": 0,
                "type": "APPOINTMENT",
                "attributes": { "unique-id": this.props.uuid, "mobileNo": '852' + this.state.mobileNumber }
            }
        };
        this.service.post('/appointments', getAppointmentData, this.props.uuid, this.props.lang).then(res => {
            this.setState({
                status: res.status,
            });
            return res.json();
        }).then((response) => {
            this.setState({ mobile: '' });
            if (this.state.status === 404) {
                this.setState({ loadingAppointment: false });
            } else if (this.state.status === 200) {
                this.setState({ loadingAppointment: false });
                _.each(response, (el: any) => {
                    console.log("test:");
                    el["appointmentdate"] = dateFormat(el["appointment-date"], "dd-mm-yyyy")
                    el["appointment-date"] = dateFormat(el["appointment-date"], "dd/mm/yyyy")
                })
                this.setState({ appointmentData: response });
            } else {
                this.setState({ loadingAppointment: false });
            }
        }).catch((error) => {
            this.setState({ loadingAppointment: false });
        });
    }

    cancelAppointment() {
        this.setState({ loadingAppointment: true });
        let cancelAppointment = {
            "data":
            {
                "id": 0,
                "type": "CANCELATION",
                "attributes": this.state.selectedRows[0]
            }
        } as any;
        delete cancelAppointment.data.attributes['booked-date']
        cancelAppointment.data.attributes['unique-id'] = this.props.uuid;
        cancelAppointment.data.attributes['id'] = 0;
        cancelAppointment.data.attributes['status'] = 'cancelled';
        cancelAppointment.data.attributes['language-code'] = this.props.lang;
        this.service.post('', cancelAppointment, this.props.uuid, this.props.lang).then((result) => {
            this.setState({ verifyButtonLoader: false });
            console.log("result.status:" + result.status)
            if (result.status === 404) {
                this.setState({ loadingAppointment: false });
            } else if (result.status === 200) {
                this.setState({ loadingAppointment: false });
                this.setState({ showModal: true });
                this.setState({ modalMsg: "cancel_success" });
                this.setState({ rowSelected: true });
                this.setState({ refNo: cancelAppointment.data.attributes['ref-id'] });
            } else {
                this.setState({ loadingAppointment: false });
            }
        }).catch((error) => {
            this.setState({ loadingAppointment: false });
        });
    }

    onSelectChange = (selectedRowKeys: any, selectedRows: any) => {
        console.log("selectedRows:", selectedRows[0]);
        this.setState({ selectedRowKeys });
        this.setState({ selectedRows });
        this.setState({ rowSelected: true });
        this.rowSelection.selectedRowKeys = selectedRowKeys;
    };

    rowSelection = {
        selectedRowKeys: [],
        onChange: this.onSelectChange
    };


    validate(e: any) {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({ mobile: e.target.value })
            this.setState({ mobileNumber: e.target.value })
            this.setState({ rowSelected: false });
        }
    }


    props: any = this.props;
    constructor(props?: any) {
        super(props);
        props = this.props;
        console.log("lanaguge:" + this.props.lang)
        console.log("uuid:" + this.props.uuid)
        this.validate = this.validate.bind(this);
    }
    columns = [
        {
            title: 'Collection Date',
            dataIndex: 'appointmentdate'
        },
        {
            title: 'Collection Branch',
            dataIndex: 'branch-name'
        },
        {
            title: 'Collection Timeslot',
            dataIndex: 'appointment-slot'
        },
        {
            title: 'Reference Number',
            dataIndex: 'ref-id'
        }
    ];

    data: any = [];




    render() {
        const { t }: any = this.props;
        return (
            <div>
                <Form className='update-booking' layout="horizontal">
                    <Space direction="vertical">
                        <Form.Item name='mobileNumber' label={t('update_booking.mobile')}>
                            <Input.Group compact>
                                <Input className='country-code' disabled={true} size="large" defaultValue="852" />
                                <Input className='mobile-number' size="large" maxLength={8} placeholder={t('update_booking.mobile')} value={this.state.mobile} onChange={this.validate} autoFocus onPressEnter={() => this.getAppointments()} />
                            </Input.Group>
                        </Form.Item>
                        <div className='buttons'>
                            {
                                !this.state.rowSelected &&
                                <Button className='submit-btn' type="primary" disabled={this.state.mobile.length !== 8} icon={<ArrowRightOutlined />} onClick={() => this.getAppointments()}>{t('update_booking.button')}</Button>
                            }
                            {
                                this.state.rowSelected &&
                                <Button className='submit-btn' type="primary" icon={<ArrowRightOutlined />} onClick={() => this.cancelAppointment()}>{t('update_booking.cancelbutton')}</Button>
                            }
                        </div>
                    </Space>
                </Form>
                {
                    this.state.loadingAppointment &&
                    <div id="loader" className="loader"></div>
                }
                {
                    this.state.appointmentData !== null &&
                    <Table locale={{ emptyText: t('update_booking.norecordfound') + '852' + this.state.mobileNumber }} rowSelection={{ type: 'radio', ...this.rowSelection }} columns={this.columns} dataSource={this.state.appointmentData} size="small" bordered />
                }
                <ModalComponentTranslated visible={this.state.showModal} body={
                    <Col>
                        <Space>
                            <CheckCircleTwoTone style={{ fontSize: '30px' }} twoToneColor="#52c41a" />
                            <div>{t('update_booking.' + this.state.modalMsg)}</div>
                        </Space>
                        {
                            this.state.refNo !== '' &&
                            <div> {t('new_booking.refnumber')} <b>{this.state.refNo}</b></div>
                        }
                    </Col>
                } onChange={(event: any) => { this.setState({ showModal: event }); this.getAppointments(); }}></ModalComponentTranslated>
            </div>
        );
    }
}
const UpdateBookingTranslated = withTranslation()(UpdateBooking);
export default UpdateBookingTranslated;