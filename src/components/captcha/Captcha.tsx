import './Captcha.scss';
import { Component } from "react";
import { Button, Empty, Input, Layout } from 'antd';
import { Redirect } from 'react-router-dom';
import { ReloadOutlined, LoadingOutlined, GlobalOutlined } from '@ant-design/icons';
import { withTranslation } from 'react-i18next';
import i18n from '../../wrappers/i18n/i18n';
import axios from 'axios';
import { apiVersion, APP_URL } from '../../environment'
const { Header, Content } = Layout;

class Captcha extends Component {
    state: any = { navigate: false, captchaInput: '', verifyButtonLoader: false, reloadCaptchaLoader: false, captcha: null, lang: 'en', message: null };

    constructor(props?: any) {
        super(props);
        this.changeLanguageHandler('en');
        this.getStatus();
        this.refreshCaptcha();
    }

    changeLanguageHandler(lang: any) {
        this.setState({ lang });
        i18n.changeLanguage(lang);
    }

    getStatus() {
        this.setState({ message: null });
        axios.get(`${APP_URL}/${apiVersion}/servicecheck`).then((res) => {
            this.setState({ message: res.data.message });
        }).catch((err) => {
            console.log(err);
            // this.setState({ message: 'Technical Error' });
            this.setState({ message: 'UP' });
        })
    }

    refreshCaptcha() {
        this.setState({ reloadCaptchaLoader: true });
        this.setState({ captcha: '' });
        setTimeout(() => {
            this.setState({ reloadCaptchaLoader: false });
            this.setState({ captcha: 'https://www.technotification.com/wp-content/uploads/2014/12/captcha.jpg' });
        }, 2000);
    }

    verifyCaptcha() {
        this.setState({ verifyButtonLoader: true });
        setTimeout(() => {
            this.setState({ verifyButtonLoader: false });
            this.setState({ navigate: true });
        }, 2000);
    }

    render() {
        const { t }: any = this.props;
        if (this.state.navigate) {
            return <Redirect to="/booking" path="/booking" exact={true} />
        }
        return (
            <Layout className="captcha">
                <Header>
                    <img className='sc-logo' src='./assets/images/sc-logo.svg' alt="Logo" />
                    <div className='border'>
                        <div className='border-top'></div>
                        <div className='border-bottom'></div>
                    </div>
                    <div className='header'>{t('new_booking.header')}</div>
                </Header>
                <Content>
                    <Button icon={<GlobalOutlined />} shape="round" className='lang' onClick={() => this.changeLanguageHandler(this.state.lang === 'en' ? 'zh' : 'en')}>{t(`captcha.selectOptions.${this.state.lang === 'en' ? 'English' : 'Chinese'}`)}</Button>
                    {
                        !this.state.message &&
                        <LoadingOutlined style={{ fontSize: 30 }} spin />
                    }
                    {/* Technical Error */}
                    {
                        this.state.message && this.state.message.toLowerCase() === 'technical error' &&
                        <Empty image="https://image.flaticon.com/icons/png/512/237/237169.png" description={t('captcha.TechnicalError')}></Empty>
                    }
                    {/* System Maintenance */}
                    {
                        this.state.message && this.state.message.toLowerCase() === 'system maintenance' &&
                        <Empty image="https://www.searlesgraphics.com/Images/support-maintenance.png" description={t('captcha.Maintenance')}></Empty>
                    }
                    {/* Thank You */}
                    {
                        this.state.message && this.state.message.toLowerCase() === 'thank you' &&
                        <Empty image="https://www.pngall.com/wp-content/uploads/2016/04/Thank-You-PNG-Picture.png" description={''}></Empty>
                    }
                    {
                        this.state.message && this.state.message.toLowerCase() === 'up' &&
                        <div className="block">
                            <div>{t('captcha.header')}</div>
                            {
                                this.state.reloadCaptchaLoader && !this.state.captcha &&
                                <LoadingOutlined style={{ fontSize: 24 }} spin />
                            }
                            {
                                !this.state.reloadCaptchaLoader && this.state.captcha &&
                                <div className='captcha-img'>
                                    <img src={this.state.captcha} alt="Captcha" />
                                    <Button className='img-reload' shape="circle" icon={<ReloadOutlined />} onClick={() => this.refreshCaptcha()}></Button>
                                </div>
                            }
                            <Input placeholder={t('captcha.placeholder')} size="large" maxLength={6} onChange={(e) => this.setState({ captchaInput: e.target.value })} />
                            <Button block disabled={this.state.captchaInput?.length !== 6} loading={this.state.verifyButtonLoader} onClick={() => this.verifyCaptcha()}>{t('captcha.button')}</Button>
                        </div>
                    }
                </Content>
            </Layout>
        )
    }
}

const CaptchaTranslated = withTranslation()(Captcha);

export default CaptchaTranslated;