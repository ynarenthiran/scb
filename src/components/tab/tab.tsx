import './tab.scss';

import { Button, Layout, Tabs } from 'antd';
import NewBooking from './new-booking/new-booking';
import UpdateBooking from './update-booking/update-booking';
import { withTranslation } from 'react-i18next';
import { Component } from 'react';
import { CommonHttpService } from '../../services/common-http.service';
import { GlobalOutlined } from '@ant-design/icons';
import i18n from '../../wrappers/i18n/i18n';

const { Header, Content } = Layout;
const { TabPane } = Tabs;


class Tab extends Component {
    props: any = this.props;
    constructor(props?: any) {
        super(props);
        props = this.props;
    }

    state = { tabChange: false, lang: 'en' };
    service = new CommonHttpService();

    changeLanguageHandler(lang: any) {
        this.setState({ lang });
        this.service.setLanguage(lang);
        i18n.changeLanguage(lang);
    }

    render() {
        const { t }: any = this.props;
        return (
            <Layout>
                {/* <Header>
                    <div className='header'>{t('new_booking.header')}</div>
                    <div className='hint'>{t('new_booking.hint')}</div>
                </Header> */}
                <Header>
                    <img className='sc-logo' src={`${this.service.BASEURL}/images/sc-logo.svg`} alt="Logo" />
                    <img className='sc-mobile-logo' src={`${this.service.BASEURL}/images/sc-mobile-logo.svg`} alt="Logo" />
                    <div className='border'>
                        <div className='border-top'></div>
                        <div className='border-bottom'></div>
                    </div>
                    <div className='header-title'>{t('new_booking.header')}
                        <Button icon={<GlobalOutlined />} shape="round" className='lang' onClick={() => this.changeLanguageHandler(this.state.lang === 'en' ? 'zh' : 'en')}>{t(`captcha.selectOptions.${this.state.lang === 'en' ? 'English' : 'Chinese'}`)}</Button>
                    </div>
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