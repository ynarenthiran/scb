import './review-booking.scss';

import { Component } from "react";
import { Col, Row } from 'antd';
import { withTranslation } from 'react-i18next';
import { CommonHttpService } from '../../../services/common-http.service';
import _ from 'lodash';

class ReviewBooking extends Component {
    state = { mobile: '', selectedRowKeys: [], mobileSearch: null, loadingAppointment: false, appointmentData: null, status: null };
    service = new CommonHttpService();

    componentWillUnmount() {
        this.setState({ mobile: '', selectedRowKeys: [], mobileSearch: null, loadingAppointment: false, appointmentData: null, status: null });
    }

    props: any = this.props;
    constructor(props?: any) {
        super(props);
        props = this.props;
        console.log(this.props);
    }

    getValue(key: any) {
        const data = _.find(this.props.fields, (pf) => { return (key === pf.name[0]) });
        if (data) {
            return data.value;
        }
        return '-';
    }

    render() {
        const { t }: any = this.props;
        return (
            <div className='review-booking'>
                <div className="title">Review Order Details</div>
                <div className='prop-list'>
                    <Col className='prop-li' span={16} push={4} pull={4}>
                        <Row>
                            <Col span={5}>{t('forms.Title')}</Col>
                            <Col span={1}>:</Col>
                            <Col span={16}>{this.getValue('title') || '-'}</Col>
                        </Row>
                    </Col>
                    <Col className='prop-li' span={16} push={4} pull={4}>
                        <Row>
                            <Col span={5}>{t('forms.LastName')}</Col>
                            <Col span={1}>:</Col>
                            <Col span={16}>{this.getValue('lastName') || '-'}</Col>
                        </Row>
                    </Col>
                    <Col className='prop-li' span={16} push={4} pull={4}>
                        <Row>
                            <Col span={5}>{t('forms.MobileNumber')}</Col>
                            <Col span={1}>:</Col>
                            <Col span={16}>{this.getValue('mobileNumber') || '-'}</Col>
                        </Row>
                    </Col>
                    <Col className='prop-li' span={16} push={4} pull={4}>
                        <Row>
                            <Col span={5}>{t('forms.CollectionBranch')}</Col>
                            <Col span={1}>:</Col>
                            <Col span={16}>{this.getValue('collectionBranch') || '-'}</Col>
                        </Row>
                    </Col>
                    <Col className='prop-li' span={16} push={4} pull={4}>
                        <Row>
                            <Col span={5}>{t('forms.CollectionDate')}</Col>
                            <Col span={1}>:</Col>
                            <Col span={16}>{this.getValue('collectionDate') || '-'}</Col>
                        </Row>
                    </Col>
                    <Col className='prop-li' span={16} push={4} pull={4}>
                        <Row>
                            <Col span={5}>{t('forms.CollectionTimeslot')}</Col>
                            <Col span={1}>:</Col>
                            <Col span={16}>{this.getValue('collectionTimeslot') || '-'}</Col>
                        </Row>
                    </Col>
                    <Col className='prop-li' span={16} push={4} pull={4}>
                        <Row>
                            <Col span={5}>{t('forms.Quantity')}</Col>
                            <Col span={1}>:</Col>
                            <Col span={16}>
                                <Col span={24}>
                                    <div className="ant-form-text">1</div>
                                    <div className="ant-form-text">{t('forms.QuantityText')}</div>
                                </Col>
                            </Col>
                        </Row>
                    </Col>
                </div>
            </div>
        );
    }
}
const ReviewBookingTranslated: any = withTranslation()(ReviewBooking);
export default ReviewBookingTranslated;