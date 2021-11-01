import './form.scss';

import { Form, Input, InputNumber, Select, DatePicker, Space, Checkbox } from 'antd';
import { Component } from 'react';
import { CommonHttpService } from '../../services/common-http.service';
import * as _ from 'lodash';
const { OptGroup, Option } = Select;


class Forms extends Component {
    props: any = this.props;
    state = { info: true, termsCondition: true, branchList: {}, branchSelected: '', dateList: [], collectionTimeSlots: [] };
    service = new CommonHttpService();

    componentDidMount() {
        this.getBranchList();
    }

    getBranchList() {
        this.service.get(`/branchlist`).then((res) => {
            const keys = _.keys(res.data);
            const initValue = (_.size(keys) && res.data && res.data[keys[0]] && res.data[keys[0]][0]) ? res.data[keys[0]][0].value : ''
            this.setState({ branchList: res.data, branchSelected: initValue });
        }).catch((err) => {
            console.log(err);
        });
    }

    getDateList(event: any) {
        console.log(event);
        this.service.get(`/slots/${this.state.branchSelected}`).then((res) => {
            this.setState({ dateList: res.data.slots });
        }).catch((err) => {
            console.log(err);
        });
    }

    disabledDate(event: any) {
        const date: any = event ? _.find(this.state.dateList, ['slot-date', event.format('DD/MM/YYYY')]) : null;
        return date && !date.status;
    }

    getTimeSlots(event: any) {
        const date: any = event ? _.find(this.state.dateList, ['slot-date', event.format('DD/MM/YYYY')]) : null;
        if (date && date.status) {
            this.setState({ collectionTimeSlots: date.slotTime });
        }
    }

    render() {
        return (
            <div className='form'>
                <div className="title">{this.props.status === 'review' ? 'Review of ' : ''}Order Details</div>
                <Form layout="vertical" fields={this.props.fields}
                    onFieldsChange={(_, allFields) => {
                        this.props.onChange(allFields);
                    }} form={this.props.form}>
                    <Form.Item name='title' label="Title" rules={[{ required: true, message: 'Title is required!' }]}>
                        <Select disabled={this.props.status === 'review'} size="large" placeholder="Please Select...">
                            <Option value="Mr.">Mr.</Option>
                            <Option value="Mrs.">Mrs.</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name='lastName' label="Last Name" rules={[{ required: true, message: 'Last Name is required!' }]}>
                        <Input disabled={this.props.status === 'review'} size="large" placeholder="Last Name" />
                        {
                            false && <span className="ant-form-text">Last Name</span>
                        }
                    </Form.Item>
                    <Form.Item name='mobileNumber' label="Mobile Number" rules={[{ required: true, message: 'Mobile Number is required!' }]}>
                        <Input.Group compact>
                            <Input style={{ width: '10%' }} disabled={true} size="large" defaultValue="852" />
                            <InputNumber style={{ width: '90%' }} min={1} max={99999999} value={undefined} size="large" placeholder="Mobile Number" />
                        </Input.Group>
                    </Form.Item>
                    <Form.Item name='emailAddress' label="Email Address" rules={[{ required: true, message: 'Email Address is required!' }]}>
                        <Input disabled={this.props.status === 'review'} size="large" placeholder="Email Address" />
                        {
                            false && <span className="ant-form-text">Email Address</span>
                        }
                    </Form.Item>
                    <Form.Item name='collectionBranch' label="Collection Branch" rules={[{ required: true, message: 'Collection Branch is required!' }]}>
                        <Select size="large" placeholder="Please Select..." onChange={(event) => this.getDateList(event)}>
                            {Object.entries(this.state.branchList).map(([k, v]: any) => (
                                <OptGroup label={k}>
                                    {v.map((d: any) => (
                                        <Option value={d.code}>Branch {d.name}</Option>
                                    ))}
                                </OptGroup>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name='collectionDate' label="Collection Date" rules={[{ required: true, message: 'Collection Date is required!' }]}>
                        <DatePicker disabled={_.size(this.state.dateList) < 1} size="large" format={'DD/MM/YYYY'} disabledDate={(event) => this.disabledDate(event)} onChange={(event) => this.getTimeSlots(event)}
                            style={{
                                width: '100%',
                            }}
                        />
                    </Form.Item>
                    <Form.Item name='collectionTimeslot' label="Collection Timeslot" rules={[{ required: true, message: 'Collection Timeslot is required!' }]}>
                        <Select disabled={this.props.status === 'review'} size="large" placeholder="Please Select...">
                            {this.state.collectionTimeSlots.map((dt) => (
                                <Option value={dt['slot-time']}>{dt['slot-time']}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Quantity">
                        <Space direction='vertical'>
                            <span className="ant-form-text">1</span>
                            <span className="ant-form-text">Total value per pack: HK$3,000. (Denomination: HK$20 x 100pcs, HK$50 x 20pcs)</span>
                        </Space>
                    </Form.Item>
                    <Form.Item label="Declaration">
                        <Space direction='vertical'>
                            <Checkbox checked={this.state.info} onChange={(e) => this.setState({ info: e.target.checked })}>I confirm the above information is accurate to my knowledge. No amendment is allowed once the form is submitted</Checkbox>
                            <Checkbox checked={this.state.termsCondition} onChange={(e) => this.setState({ termsCondition: e.target.checked })}>I have read, understood and agreed to the terms and conditions of this application</Checkbox>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
export default Forms;