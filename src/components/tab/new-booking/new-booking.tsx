import './new-booking.scss';

import { Layout, Button, Row, Col, Space } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Component } from 'react';
import FormsTranslated from '../../form/form';
import ReviewBookingTranslated from '../review-booking/review-booking';
import { withTranslation } from 'react-i18next';
import { CommonHttpService } from '../../../services/common-http.service';
import ModalComponentTranslated from '../../modal';
import * as _ from 'lodash';
import moment from 'moment'
import { Redirect } from 'react-router-dom';

const { Footer } = Layout;

const formControls = [
    { label: 'Title', name: 'title', value: null, required: true, touched: false },
    { label: 'Last Name', name: 'lastName', value: null, required: true, touched: false },
    { label: 'Mobile Number', name: 'mobileNumber', value: null, required: true, touched: false },
    { label: 'Collection Branch', name: 'collectionBranch', value: null, required: true, touched: false },
    { label: 'Collection Date', name: 'collectionDate', value: null, required: true, touched: false },
    { label: 'Collection Timeslot', name: 'collectionTimeslot', value: null, required: true, touched: false }
]

class NewBooking extends Component {
    form: any;
    state = { navigate: false, bookingProgress: false, status: null, refNo: '', fields: _.cloneDeep(formControls), orderStatus: "change", showModal: false, modalMsg: null };
    props: any = this.props;
    service = new CommonHttpService();
    constructor(props?: any) {
        super(props);
        props = this.props;
        console.log("lanaguge:" + this.props.lang)
        console.log("uuid:" + this.props.uuid)
        this.setState({ fields: this.props.fields});
    }

    componentWillUnmount() {
        // this.setState({ fields: formControls, orderStatus: "change" });
    }

    componentDidMount() {
        console.log("component mounted");
    }

    
    getValue(key: any) {
        const data: any = _.find(this.state.fields, ['name', key]);
        console.log("data is:", data);
        if (data && data.value) {
            return (key === 'collectionDate') ? moment(data.value).format('DD/MM/YYYY') : (key === 'collectionBranch' && data.value && data.value.label) ? data.value.label : data.value;

        }
        return '-';
    }

    getBranchCode(key: any) {
        console.log("data for branch code:", this.state.fields)
        const data: any = _.find(this.state.fields, ['name', key]);
        console.log("data is:", data);
        if (data && data.value) {
            return (key === 'collectionBranch') ? data.value.value : '-';
        }
        return '-';
    }

    get disableButton(): boolean {
        const overallvalidation: boolean = (!!_.find(this.state.fields, ['value', null]) || !!_.find(this.state.fields, ['value', undefined]));
        const mobileNumber: any = _.find(this.state.fields, ['name', 'mobileNumber']);
        const mobileNumberValidation: boolean = ((mobileNumber.value && mobileNumber.value.length !== 8) || !Number(mobileNumber.value));
        return overallvalidation || mobileNumberValidation;
    }

    submitOrder() {
        this.setState({ status: null });
        this.setState({ bookingProgress: true });
        let validateCaptcha = {
            "data":
            {
                "id": 0,
                "type": "APPOINTMENT",
                "attributes": {
                    "unique-id": this.props.uuid,
                    "branch-code": this.getBranchCode('collectionBranch'),
                    "title": this.getValue('title'),
                    "appointment-slot": this.getValue('collectionTimeslot'),
                    "last-name": this.getValue('lastName'),
                    "mobileNo": '852' + this.getValue('mobileNumber'),
                    "appointment-date": this.getValue('collectionDate'),
                    "quantity": 1,
                    "booked-date": moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
                    "status": 'booked',
                    "language-code": this.props.lang,
                    "branch-name": this.getValue('collectionBranch'),
                    "ref-id": this.props.uuid
                }
            }
        };
        this.service.post('', validateCaptcha, this.props.uuid, this.props.lang).then((result) => {
            this.setState({ bookingProgress: false });
            this.setState({
                status: result.status,
            });
            return result.json();
        }).then((response) => {
            console.log("result.status:", this.state.status + ", ref", response['tp-ref'])
            if (this.state.status === 404) {
                console.log("the error code:",response['code'])
                if(response['code']!==undefined && response['code']==='FORMS-API-CNYNOTES001'){
                    this.setState({ showModal: true });
                    this.setState({ modalMsg: "booking_duplicatemobile" });
                    this.setState({ refNo: '' });
                }
            }else if (this.state.status === 200) {
                this.setState({ showModal: true });
                this.setState({ modalMsg: "booking_success" });
                this.setState({ refNo: response['tp-ref'] });
            } else {

            }
        }).catch((error) => {
            //TODO:
        });
    }

    reviewOrder(fields: any) {
        //this.setState({ fields });
        this.setState({ orderStatus: 'review' });
    }

    backToChange() {
        this.setState({ orderStatus: 'change' });
    }

    modalClosed(event: any){
        this.setState({ fields: _.cloneDeep(formControls), showModal: event });
        this.backToChange();
    }

    render() {
        const { t }: any = this.props;
        if (this.state.navigate) {
            console.log("test");
            return (
                 <Redirect to={'/captcha'} /> 
              );
        }else{
        return (
            <span>
                {
                    this.state.bookingProgress &&
                    <div id="loader" className="loader"></div>
                }
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
                        {
                            this.state.orderStatus === 'review' &&
                            <Space align='end'>
                                <Button danger type='primary' icon={<ArrowLeftOutlined />} onClick={() => this.backToChange()}>{t('new_booking.button.back')}</Button>
                                <Button className='review-btn' disabled={this.disableButton} type='primary' icon={<ArrowRightOutlined />} onClick={() => this.submitOrder()}>{t('new_booking.button.submit')}</Button>
                            </Space>
                        }
                        {
                            this.state.orderStatus === 'change' &&
                            <Space align='end'>
                                <Button className='submit-btn' disabled={this.disableButton} type='primary' icon={<ArrowRightOutlined />} onClick={() => this.reviewOrder(this.state.fields)}>{t('new_booking.button.review')}</Button>
                            </Space>
                        }
                    </Row>
                </Footer>
                <ModalComponentTranslated visible={this.state.showModal} body={
                    <Col>
                            
                            <div>{t('new_booking.' + this.state.modalMsg)}</div>
                        
                        {
                            this.state.refNo !== '' &&
                            <div> {t('new_booking.refnumber')} <b>{this.state.refNo}</b></div>
                        }
                    </Col>
                } onChange={(event: any) => this.modalClosed(event) }></ModalComponentTranslated>
            </span>
        );
        }
    }
}

const NewBookingTranslated = withTranslation()(NewBooking);
export default NewBookingTranslated;