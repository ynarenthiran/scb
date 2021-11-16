import './tab.scss';

import { Layout, Tabs } from 'antd';
import NewBooking from './new-booking/new-booking';
import UpdateBooking from './update-booking/update-booking';
import { withTranslation } from 'react-i18next';
import { Component } from 'react';
import Captcha from '../captcha/Captcha';

const { Header, Content } = Layout;
const { TabPane } = Tabs;


class Tab extends Component {
    props: any = this.props;
    constructor(props?: any) {
        super(props);
        props = this.props;
    }

    state = { tabChange: false };

    render() {
        const { t }: any = this.props;
        return (
            <Layout>
                <Header>
                    <div className='header'>{t('new_booking.header')}</div>
                    <div className='hint'>{t('new_booking.hint')}</div>
                </Header>
                <Content>
                    <Tabs defaultActiveKey="new" onChange={(event: any) => this.setState({ tabChange: event === 'new' })}>
                        <TabPane tab={t('tab.new_booking')} key="new">
                            <NewBooking {...this.props} tabChange={this.state.tabChange} />
                        </TabPane>
                        <TabPane tab={t('tab.update_booking')} key="cancellationAndEnquiries">
                            <UpdateBooking {...this.props} />
                        </TabPane>
                    </Tabs>
                </Content>
            </Layout>
        );
    }
}

const TabTranslated = withTranslation()(Tab);

export default TabTranslated;