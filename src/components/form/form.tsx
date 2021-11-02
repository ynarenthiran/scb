import './form.scss';

import { Form, Input, Select, DatePicker, Space, Checkbox } from 'antd';
import { Component } from 'react';
import { CommonHttpService } from '../../services/common-http.service';
import * as _ from 'lodash';
import { withTranslation } from 'react-i18next';
const { OptGroup, Option } = Select;


class Forms extends Component {
    props: any = this.props;
    form: any;
    state = { info: true, termsCondition: true, branchList: {}, branchSelected: '', dateList: [], collectionTimeSlots: [] };
    service = new CommonHttpService();

    constructor(props?: any) {
        super(props);
        props = this.props;
        console.log("uuid in constructor:"+this.props.uuid)
    }
    
    
    componentDidMount() {
        this.setState({ info: true, termsCondition: true, branchList: {}, branchSelected: '', dateList: [], collectionTimeSlots: [] });
        this.getBranchList();
    }

    getBranchList() {
        console.log("uuid is:"+this.props.uuid)
        this.service.get(`/branchlist/${this.props.uuid}`,this.props.uuid,this.props.lang).then((res) => {
            this.setState({ branchList: res });
        }).catch((err) => {
            console.log(err);
        });
    }

    getDateList(event: any) {
        console.log(event);
        this.service.get(`/slots/${event}/${this.props.uuid}`,this.props.uuid,this.props.lang).then((res) => {
            this.setState({ dateList: res.data.slots });
        }).catch((err) => {
            console.log(err);
        });
    }

    disabledDate(event: any) {
        const date: any = event ? _.find(this.state.dateList, ['slot-date', event.format('DD/MM/YYYY')]) : null;
        return !date || (date && !date.status);
    }

    getTimeSlots(event: any) {
        const date: any = event ? _.find(this.state.dateList, ['slot-date', event.format('DD/MM/YYYY')]) : null;
        if (date && date.status) {
            this.setState({ collectionTimeSlots: date.slotTime });
        }
    }

    render() {
        const { t }: any = this.props;
        return (
            <div className='form'>
                <div className="title">Order Details</div>
                <Form layout="vertical" fields={this.props.fields}
                    onFieldsChange={(_, allFields) => {
                        this.props.onChange(allFields);
                    }} form={this.form}>
                    <Form.Item name='title' label={t('forms.Title')} rules={[{ required: true, message: `${t('forms.Title')} is required!` }]}>
                        <Select size="large" placeholder={t('forms.SelectPlaceholder')}>
                            <Option value="Mr.">Mr.</Option>
                            <Option value="Mrs.">Mrs.</Option>
                            <Option value="Miss">Miss</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name='lastName' label={t('forms.LastName')} rules={[{ required: true, message: `${t('forms.LastName')} is required!` }]}>
                        <Input size="large" placeholder={t('forms.LastName')} />
                        {
                            false && <span className="ant-form-text">Last Name</span>
                        }
                    </Form.Item>
                    <Form.Item name='mobileNumber' label={t('forms.MobileNumber')} rules={[{ required: true, message: `${t('forms.MobileNumber')} is required!` }]}>
                        <Input.Group compact>
                            <Input style={{ width: '10%' }} disabled={true} size="large" defaultValue="852" />
                            <Input style={{ width: '90%' }} maxLength={8} size="large" placeholder={t('forms.MobileNumber')} />
                        </Input.Group>
                    </Form.Item>
                    <Form.Item name='collectionBranch' label={t('forms.CollectionBranch')} rules={[{ required: true, message: `${t('forms.CollectionBranch')} is required!` }]}>
                        <Select size="large" placeholder={t('forms.SelectPlaceholder')} onChange={(event) => this.getDateList(event)}>
                            {Object.entries(this.state.branchList).map(([k, v]: any) => (
                                _.size(v) &&
                                <OptGroup label={k === 'regionOne' ? t('forms.regionOne') : ((k === 'regionTwo' ? t('forms.regionTwo') : t('forms.regionThree')))}>
                                    {v.map((d: any) => (
                                        <Option value={d.code}>{(this.props.language === 'en') ? d.name : d.chineseName}</Option>
                                    ))}
                                </OptGroup>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name='collectionDate' label={t('forms.CollectionDate')} rules={[{ required: true, message: `${t('forms.CollectionDate')} is required!` }]}>
                        <DatePicker disabled={_.size(this.state.dateList) < 1} size="large" format={'DD/MM/YYYY'} disabledDate={(event) => this.disabledDate(event)} onChange={(event) => this.getTimeSlots(event)}
                            style={{
                                width: '100%',
                            }}
                        />
                    </Form.Item>
                    <Form.Item name='collectionTimeslot' label={t('forms.CollectionTimeslot')} rules={[{ required: true, message: `${t('forms.CollectionTimeslot')} is required!` }]}>
                        <Select size="large" placeholder={t('forms.SelectPlaceholder')}>
                            {this.state.collectionTimeSlots.map((dt) => (
                                <Option value={dt['slot-time']}>{dt['slot-time']}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label={t('forms.Quantity')}>
                        <Space direction='vertical'>
                            <span className="ant-form-text">1</span>
                            <span className="ant-form-text">{t('forms.QuantityText')}</span>
                        </Space>
                    </Form.Item>
                    <Form.Item label={t('forms.Declaration')}>
                        <Space direction='vertical'>
                            <Checkbox checked={this.state.info} onChange={(e) => this.setState({ info: e.target.checked })}>{t('forms.DeclarationPoints.1')}</Checkbox>
                            <Checkbox checked={this.state.termsCondition} onChange={(e) => this.setState({ termsCondition: e.target.checked })}>{t('forms.DeclarationPoints.2')}</Checkbox>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
const FormsTranslated: any = withTranslation()(Forms);
export default FormsTranslated;