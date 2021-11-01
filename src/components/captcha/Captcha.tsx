import './Captcha.scss';
import { Component } from "react";
import { Button, Input, Layout } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import { GlobalOutlined, ReloadOutlined } from '@ant-design/icons';
import { withTranslation } from 'react-i18next';
import i18n from '../../wrappers/i18n/i18n';
import { v4 as uuidv4 } from 'uuid';
import { CommonHttpService } from '../../services/common-http.service';
const { Header, Content } = Layout;

class Captcha extends Component {
    state: any = { navigate: false, captchaInput: '', verifyButtonLoader: false, reloadCaptchaLoader: false, captcha: null, lang: 'en', message: null };
    service = new CommonHttpService();
    constructor(props?: any) {
        super(props);
        this.changeLanguageHandler('en');

    }

    componentDidMount() {
        this.getStatus();
    }

    changeLanguageHandler(lang: any) {
        this.setState({ lang });
        this.service.setLanguage(lang);
        i18n.changeLanguage(lang);
    }

    getStatus() {
        this.service.get('/servicecheck').then((result) => {
            this.setState({ message: result.paramValue });
            if (result.paramValue && result.paramValue.toLowerCase() === 'Up'.toLowerCase()) {
                this.refreshCaptcha();
            }
        }, (error) => {
            this.setState({ message: "Error" });
        })
    }

    refreshCaptcha() {
        this.setState({ reloadCaptchaLoader: true });
        this.setState({ captchainvalid: false });
        this.setState({ captchaInput: "" });
        this.setState({ captcha: null });
        this.service.get('/captcha').then((result) => {
            this.setState({ reloadCaptchaLoader: false });
            this.setState({ captcha: result.data.captcha });
            this.setState({ uuid: result.data.uuid });
            this.service.setUUID(result.data.uuid);
        }, (error) => {
            this.setState({ reloadCaptchaLoader: false });
            this.setState({ captcha: null });
            this.setState({ message: "Error" });
        })
    }

    verifyCaptcha() {
        this.setState({ verifyButtonLoader: true });
        let validateCaptcha = {
            "data":
            {
                "id": 0,
                "type": "CAPTCHAVALIDATION",
                "attributes": { "unique-id": this.state.uuid, "captha-answer": this.state.captchaInput }
            }
        };
        this.service.post('/captcha', validateCaptcha).then((result) => {
            this.setState({ verifyButtonLoader: false });
            if (result.status === 404) {
                this.setState({ navigate: false });
                this.setState({ captchainvalid: true });
                this.setState({ captchaInput: "" });
            } else if (result.status === 200) {
                this.setState({ navigate: true });
            } else {
                this.setState({ navigate: false });
                this.setState({ captchainvalid: true });
                this.setState({ captchaInput: "" });
            }
        }, (error) => {
            this.setState({ captcha: null });
            this.setState({ message: "Error" });
            this.setState({ verifyButtonLoader: false });
        });
    }

    render() {
        const { t }: any = this.props;
        if (this.state.navigate) {
            return <Redirect to="/booking" path="/booking" exact={true} />
        }
        return (
            <Layout className="captcha">
                <Header>
                    <img className='sc-logo' src='../assets/images/sc-logo.svg' alt="Logo" />
                    <div className='border'>
                        <div className='border-top'></div>
                        <div className='border-bottom'></div>
                    </div>
                    <div className='header'>{t('new_booking.header')}</div>
                </Header>
                <Content>
                    <Button icon={<GlobalOutlined />} shape="round" className='lang' onClick={() => this.changeLanguageHandler(this.state.lang === 'en' ? 'zh' : 'en')}>{t(`captcha.selectOptions.${this.state.lang === 'en' ? 'English' : 'Chinese'}`)}</Button>
                    <Link to="/booking">New Booking</Link>
                    {
                        !this.state.message &&
                        <div id="loader" className="loader"></div>
                    }
                    {/* Technical Error */}
                    {
                        this.state.message && this.state.message.toLowerCase() === 'Error'.toLowerCase() &&
                        <div className='header'>{t('captcha.TechnicalError')}</div>
                    }
                    {/* System Maintenance */}
                    {
                        this.state.message && this.state.message.toLowerCase() === 'Maintenance'.toLowerCase() &&
                        <div className='header'>{t('captcha.Maintenance')}</div>
                    }
                    {/* Thank You */}
                    {
                        this.state.message && this.state.message.toLowerCase() === 'Thankyou'.toLowerCase() &&
                        <div className='header'>{t('captcha.Thankyou')}</div>
                    }
                    {
                        this.state.message && this.state.message.toLowerCase() === 'Up'.toLowerCase() &&
                        <div className="block">
                            <div>{t('captcha.header')}</div>
                            {
                                this.state.reloadCaptchaLoader && !this.state.captcha &&
                                <div id="loader" className="loader"></div>
                            }
                            {
                                !this.state.reloadCaptchaLoader && this.state.captcha &&
                                <div className='captcha-img'>
                                    <img src={'data:image/png;base64,' + this.state.captcha} alt="Captcha" />
                                    <Button className='img-reload' shape="circle" icon={<ReloadOutlined />} onClick={() => this.refreshCaptcha()}></Button>
                                </div>
                            }

                            <Input placeholder={t('captcha.placeholder')} size="large" maxLength={7} value={this.state.captchaInput} autoFocus onChange={(e) => this.setState({ captchaInput: e.target.value })} onPressEnter={() => this.verifyCaptcha()} />
                            {
                                !this.state.reloadCaptchaLoader && this.state.captcha && this.state.captchainvalid &&
                                <div className='captcha-error'>
                                    {t('captcha.Error')}
                                </div>
                            }
                            <Button block disabled={this.state.captchaInput?.length !== 7} onClick={() => this.verifyCaptcha()}>{t('captcha.button')}</Button>
                            {
                                this.state.verifyButtonLoader &&
                                <div id="loader" className="loader"></div>
                            }
                        </div>
                    }
                </Content>
            </Layout>
        )
    }
}
const CaptchaTranslated = withTranslation()(Captcha);
export default CaptchaTranslated;