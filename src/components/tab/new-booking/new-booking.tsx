import './new-booking.scss';

import { Layout, Button, Row, Col, Space } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import { Component } from 'react';
import FormsTranslated from '../../form/form';
import ReviewBookingTranslated from '../review-booking/review-booking';
import { withTranslation } from 'react-i18next';
import ModalComponentTranslated from '../../modal';

const { Footer } = Layout;

const formControls = [
    { label: 'Title', name: 'title', value: null, required: true },
    { label: 'Last Name', name: 'lastName', value: null, required: true },
    { label: 'Mobile Number', name: 'mobileNumber', value: null, required: true },
    { label: 'Collection Branch', name: 'collectionBranch', value: null, required: true },
    { label: 'Collection Date', name: 'collectionDate', value: null, required: true },
    { label: 'Collection Timeslot', name: 'collectionTimeslot', value: null, required: true }
]

class NewBooking extends Component {
    form: any;
    state = { fields: formControls, orderStatus: "change", showModal: false };
    props: any = this.props;
    constructor(props?: any) {
        super(props);
        props = this.props;
        console.log("lanaguge:" + this.props.lang)
        console.log("uuid:" + this.props.uuid)
    }

    componentWillUnmount() {
        this.setState({ fields: formControls, orderStatus: "change" });
    }

    submitOrder(fields: any) {
        console.log(fields);
        this.setState({ showModal: true });
    }

    reviewOrder(fields: any) {
        this.setState({ fields });
        this.setState({ orderStatus: 'review' });
    }

    backToChange() {
        this.setState({ orderStatus: 'change' });
    }

    render() {
        const { t }: any = this.props;
        return (
            <span>
                {
                    this.state.orderStatus === 'change' &&
                    <FormsTranslated {...this.props} form={this.form} fields={this.state.fields} onChange={(newFields: any) => { this.setState({ fields: newFields }); }} />
                }
                {
                    this.state.orderStatus === 'review' &&
                    <ReviewBookingTranslated fields={this.state.fields} />
                }
                <Footer>
                    <Row className='footer-row'>
                        <Col span={4} offset={20}>
                            <Row>
                                {
                                    this.state.orderStatus === 'review' &&
                                    <Space align='end'>
                                        <Col span={12}>
                                            <Button danger type='primary' icon={<ArrowLeftOutlined />} onClick={() => this.backToChange()}>{t('new_booking.button.back')}</Button>
                                        </Col>
                                        <Col span={12}>
                                            <Button className='review-btn' type='primary' icon={<ArrowRightOutlined />} onClick={() => this.submitOrder(this.state.fields)}>{t('new_booking.button.submit')}</Button>
                                        </Col>
                                    </Space>
                                }
                                {
                                    this.state.orderStatus === 'change' &&
                                    <Col span={16} offset={8}>
                                        <Button className='submit-btn' type='primary' icon={<ArrowRightOutlined />} onClick={() => this.reviewOrder(this.state.fields)}>{t('new_booking.button.review')}</Button>
                                    </Col>
                                }
                            </Row>
                        </Col>
                    </Row>
                </Footer>
                <ModalComponentTranslated visible={this.state.showModal} body={
                    <Col>
                        <Space>
                            <CheckCircleTwoTone style={{ fontSize: '30px' }} twoToneColor="#52c41a" />
                            <div>Thanks for your submission of this pre-order form: A sms confirmation will be sent to your mobile number provided in this form.</div>
                        </Space>
                        <div>Your Reference Number is <b>A0003</b></div>
                    </Col>
                } onChange={(event: any) => this.setState({ showModal: event })}></ModalComponentTranslated>
            </span>
        );
    }
}

const NewBookingTranslated = withTranslation()(NewBooking);

export default NewBookingTranslated;
