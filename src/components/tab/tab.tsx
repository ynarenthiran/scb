import './tab.scss';

import { Layout, Tabs } from 'antd';
import NewBooking from './new-booking/new-booking';
import UpdateBooking from './update-booking/update-booking';
import { withTranslation } from 'react-i18next';
import { Component } from 'react';
import ImportantNotesTranslated from '../important-notes/important-notes';

const { Header, Content } = Layout;
const { TabPane } = Tabs;

class Tab extends Component {
    props: any = this.props;
    constructor(props?: any) {
        super(props);
        props = this.props;
        console.log("lanaguge:"+this.props.lang)
        console.log("uuid:"+this.props.uuid)
    }


    render() {
        const { t }: any = this.props;
        return (
            <Layout>
                <Header>
                    <div className='header'>{t('new_booking.header')}</div>
                    <div>{t('new_booking.hint')}</div>
                </Header>
                <Content>
                    <ImportantNotesTranslated />
                    <Tabs defaultActiveKey="new">
                        <TabPane tab={t('tab.new_booking')} key="new">
                            <NewBooking {...this.props}/>
                        </TabPane>
                        <TabPane tab={t('tab.update_booking')} key="cancellationAndEnquiries">
                            <UpdateBooking {...this.props}/>
                        </TabPane>
                    </Tabs>
                </Content>
            </Layout>
        );
    }
}

const TabTranslated = withTranslation()(Tab);

export default TabTranslated;
