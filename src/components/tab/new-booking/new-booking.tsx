import './new-booking.scss';

import { Layout, Button, Row, Col, Space } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Component } from 'react';
import FormsTranslated from '../../form/form';
import { withTranslation } from 'react-i18next';

const { Footer } = Layout;

const formControls = [
    { name: ['title'], value: null, required: true, disabled: false },
    { name: ['lastName'], value: null, required: true, disabled: false },
    { name: ['mobileNumber'], value: null, required: true, disabled: false },
    { name: ['emailAddress'], value: null, required: true, disabled: false },
    { name: ['collectionBranch'], value: null, required: true, disabled: false },
    { name: ['collectionDate'], value: null, required: true, disabled: false },
    { name: ['collectionTimeslot'], value: null, required: true, disabled: false }
]

class NewBooking extends Component {
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
        const { t }: any = this.props;
        return (
            <span>
                <FormsTranslated form={this.form} fields={this.state.fields} status={this.state.orderStatus} onChange={(newFields: any) => { this.setState({ fields: newFields }); }} />
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
            </span>
        );
    }
}

const NewBookingTranslated = withTranslation()(NewBooking);

export default NewBookingTranslated;
