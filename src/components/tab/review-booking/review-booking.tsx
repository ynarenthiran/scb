import './review-booking.scss';

import { Component } from "react";
import { withTranslation } from 'react-i18next';
import { CommonHttpService } from '../../../services/common-http.service';
import _ from 'lodash';
import moment from 'moment'

class ReviewBooking extends Component {
    state = { mobile: '', selectedRowKeys: [], mobileSearch: null, loadingAppointment: false, appointmentData: null, status: null };
    service = new CommonHttpService();
    
    fields: any = [];

    componentWillUnmount() {
        this.setState({ mobile: '', selectedRowKeys: [], mobileSearch: null, loadingAppointment: false, appointmentData: null, status: null });
    }

    componentDidMount() {
        console.log(this.props.fields);
    }

    props: any = this.props;
    constructor(props?: any) {
        super(props);
        props = this.props;
        console.log(this.props);
    }

    getValue(key: any) {
        const data = _.find(this.props.fields, ['name', key]);
        console.log("data is:", data);
        if (data && data.value) {
            if (key === 'collectionDate') {
                return moment(data.value).format('DD/MM/YYYY');
            } else if (key === 'collectionBranch') {
                if (data.data) {
                    return `${data.data[this.language === 'zh' ? 'chineseName' : 'name'] || '-'}, ${(data.data) ? data.data[this.language === 'zh' ? 'chineseAddress' : 'address'] : '-'}`;
                } else {
                    return '-';
                }
            } else {
                return data.value;
            }
        }
        return '-';
    }

    get language() {
        return this.props.i18n.language;
    }

    render() {
        const { t }: any = this.props;
        this.fields = _.reject(this.props.fields, 'hide');
        return (
            <div className='review-booking'>
            
                <div className="title">{t('forms.ReviewDetails')}</div>
                <div className='prop-list'>
                    {
                        this.fields.map((pf: any) => (
                            <div className='prop-li'>
                                <div className='pl-label'>{t(`forms.${pf.label.replace(' ', '')}`)}</div>
                                <div className='pl-divider'>:</div>
                                <div className='pl-value'>{this.getValue(pf.name) || '-'}</div>
                            </div>
                        ))

                    }
                    <div className='prop-li'>
                        <div className='pl-label'>{t('forms.Quantity')}</div>
                        <div className='pl-divider'>:</div>
                        <div className='pl-value'>
                            <div className="ant-form-text">1</div>
                            <div className="ant-form-text">{t('forms.QuantityText')}</div>
                        </div>
                    </div>
                    <div className='prop-li'>
                        <div className='pl-label'>{t('forms.Note')}</div>
                        <div className='pl-divider'>:</div>
                        <div className='pl-value'>
                            {t('forms.Notes')}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const ReviewBookingTranslated: any = withTranslation()(ReviewBooking);
export default ReviewBookingTranslated;