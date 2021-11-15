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
    validationMessages: any = {};
    state = { datesLoaded: false, datesLoading: false, info: true, termsCondition: true, mobile: '', branchList: {}, branchSelected: '', dateList: [], collectionTimeSlots: [], validation: this.validationMessages };
    service = new CommonHttpService();

    constructor(props?: any) {
        super(props);
        props = this.props;
        console.log("uuid in constructor:" + this.props.uuid)
    }


    componentDidMount() {
        this.getBranchList();
        this.setState({ mobile: this.getValue('mobileNumber') });
    }

    getBranchList() {
        console.log("uuid is:" + this.props.uuid)
        this.service.get(`/branchlist/${this.props.uuid}`, this.props.uuid, this.props.lang).then((res) => {
            this.setState({ branchList: res });
            if (this.getValue('collectionBranch')) {
                this.getDateList(this.getValue('collectionBranch'));
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    getDateList(event: any) {
        this.setState({ datesLoading: true })
        this.service.get(`/slots/${event.value}/${this.props.uuid}`, this.props.uuid, this.props.lang).then((res) => {
            this.setState({ datesLoading: false })
            this.setState({ dateList: res.data.slots });
            this.setState({ datesLoaded: true });
            if (this.getValue('collectionDate')) {
                this.setState({ selectedDate: this.getValue('collectionDate') });
                this.getTimeSlots(this.getValue('collectionDate'));
            }
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
            if (this.getValue('collectionTimeSlot')) {
                this.setState({ selectedTimeSlot: this.getValue('collectionTimeSlot') });
            }
        }
    }

    allFields: any = this.props.fields;

    setData(e: any, field: any) {
        const fieldData = _.find(this.allFields, ['name', field]);
        if (fieldData) {
            fieldData.value = e;
            this.validation(field, fieldData.label);
            this.props.onChange(this.allFields);
        }
    }

    setTouched(field: any) {
        const fieldData = _.find(this.allFields, ['name', field]);
        if (fieldData) {
            fieldData.touched = true;
            this.props.onChange(this.allFields);
        }
    }

    validate(e: any) {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({ mobile: e.target.value });
        }
    }

    getValue(key: string) {
        const data = _.find(this.props.fields, ['name', key]);
        if (data && data.value) {
            return data.value;
        }
        return null;
    }

    validation(field: any, title: any) {
        const validation: any = this.state.validation;
        if (!this.getValue(field)) {
            validation[field] = `${title} is required...`;
        } else if (field === 'mobileNumber') {
            if (this.getValue(field).length !== 8) {
                validation[field] = `${title} length must be 8`;
            } else if (!Number(this.getValue(field))) {
                validation[field] = `${title} should not be 0`;
            } else {
                validation[field] = null;
            }
        } else {
            validation[field] = null;
        }
        console.log(this.state.validation);
        this.setState({ validation });
    }

    getMessage(field: string) {
        return this.state.validation[field] as string;
    }

    render() {
        const { t }: any = this.props;
        return (
            <div className='form'>
                {
                    this.state.datesLoading &&
                    <div id="loader" className="loader"></div>
                }
                <div className="title">Order Details</div>
                <Form layout="vertical">
                    <Form.Item name='title' label={t('forms.Title')}>
                        <Select size="large" placeholder={t('forms.SelectPlaceholder')} defaultValue={this.getValue('title')} onFocus={() => this.setTouched('title')} onBlur={() => this.validation('title', t('forms.Title'))} onChange={(e) => this.setData(e, 'title')}>
                            <Option value="Mr.">Mr.</Option>
                            <Option value="Mrs.">Mrs.</Option>
                            <Option value="Miss">Miss</Option>
                        </Select>
                        {
                            this.getMessage('title') && <span className="field-error">{this.getMessage('title')}</span>
                        }
                    </Form.Item>
                    <Form.Item name='lastName' label={t('forms.LastName')}>
                        <Input size="large" maxLength={30} placeholder={t('forms.LastName')} defaultValue={this.getValue('lastName')} onFocus={() => this.setTouched('lastName')} onBlur={() => this.validation('lastName', t('forms.LastName'))} onChange={(e) => this.setData(e.target.value, 'lastName')} />
                        {
                            this.getMessage('lastName') && <span className="field-error">{this.getMessage('lastName')}</span>
                        }
                    </Form.Item>
                    <Form.Item name='mobileNumber' label={t('forms.MobileNumber')}>
                        <Input.Group compact>
                            <Input className='country-code' disabled={true} size="large" defaultValue="852" />
                            <Input className='mobile-number' maxLength={8} size="large" placeholder={t('forms.MobileNumber')} defaultValue={this.getValue('mobileNumber')} onFocus={() => this.setTouched('mobileNumber')} onBlur={() => this.validation('mobileNumber', t('forms.MobileNumber'))} value={this.state.mobile} onChange={(e) => { this.setData(e.target.value, 'mobileNumber'); this.validate(e); }} />
                        </Input.Group>
                        {
                            this.getMessage('mobileNumber') && <span className="field-error">{this.getMessage('mobileNumber')}</span>
                        }
                    </Form.Item>
                    <Form.Item name='collectionBranch' label={t('forms.CollectionBranch')}>
                        <Select labelInValue size="large" placeholder={t('forms.SelectPlaceholder')} defaultValue={this.getValue('collectionBranch')} onFocus={() => this.setTouched('collectionBranch')} onBlur={() => this.validation('collectionBranch', t('forms.CollectionBranch'))} onChange={(e) => { this.getDateList(e); this.setData(e, 'collectionBranch'); }}>
                            {Object.entries(this.state.branchList).map(([k, v]: any) => (
                                _.size(v) &&
                                <OptGroup label={k === 'regionOne' ? t('forms.regionOne') : ((k === 'regionTwo' ? t('forms.regionTwo') : t('forms.regionThree')))}>
                                    {v.map((d: any) => (
                                        <Option value={d.code}>{(this.props.lang === 'en') ? d.name : d.chineseName}</Option>
                                    ))}
                                </OptGroup>
                            ))}
                        </Select>
                        {
                            this.getMessage('collectionBranch') && <span className="field-error">{this.getMessage('collectionBranch')}</span>
                        }
                    </Form.Item>
                    {
                        this.state.dateList.length === 0 && this.state.datesLoaded &&
                        <span className="field-error">{t('forms.noslotsavailable')}</span>
                    }
                    <Form.Item name='collectionDate' label={t('forms.CollectionDate')}>
                        <DatePicker disabled={_.size(this.state.dateList) < 1} size="large" format={'DD/MM/YYYY'} defaultValue={this.getValue('collectionDate')} onFocus={() => this.setTouched('collectionDate')} onBlur={() => this.validation('collectionDate', t('forms.CollectionDate'))} disabledDate={(e) => this.disabledDate(e)} onChange={(e) => { this.getTimeSlots(e); this.setData(e, 'collectionDate'); }}
                            style={{
                                width: '100%',
                            }}
                        />
                        {
                            this.getMessage('collectionDate') && <span className="field-error">{this.getMessage('collectionDate')}</span>
                        }
                    </Form.Item>
                    <Form.Item name='collectionTimeslot' label={t('forms.CollectionTimeslot')}>
                        <Select size="large" disabled={_.size(this.state.dateList) < 1} placeholder={t('forms.SelectPlaceholder')} defaultValue={this.getValue('collectionTimeslot')} onFocus={() => this.setTouched('collectionTimeslot')} onBlur={() => this.validation('collectionTimeslot', t('forms.CollectionTimeslot'))} onChange={(e) => this.setData(e, 'collectionTimeslot')}>
                            {this.state.collectionTimeSlots.map((dt) => (
                                <Option value={dt['slot-time']}>{dt['slot-time']}</Option>
                            ))}
                        </Select>
                        {
                            this.getMessage('collectionTimeslot') && <span className="field-error">{this.getMessage('collectionTimeslot')}</span>
                        }
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