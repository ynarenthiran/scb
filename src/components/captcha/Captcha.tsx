import './Captcha.scss';
import { Component } from "react";
import { Button, Input, Layout } from 'antd';
import { Redirect } from 'react-router-dom';
import { ReloadOutlined, LoadingOutlined, GlobalOutlined } from '@ant-design/icons';
import { withTranslation } from 'react-i18next';
import i18n from '../../wrappers/i18n/i18n';
const { Content } = Layout;

class Captcha extends Component {
    state: any = { navigate: false, captchaInput: '', verifyButtonLoader: false, reloadCaptchaLoader: false, captcha: 'https://www.technotification.com/wp-content/uploads/2014/12/captcha.jpg', lang: 'en' };

    constructor(props?: any) {
        super(props);
        this.changeLanguageHandler('en');
    }

    changeLanguageHandler(lang: any) {
        this.setState({ lang });
        i18n.changeLanguage(lang);
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
                <Content>
                    <Button icon={<GlobalOutlined />} className='lang' onClick={() => this.changeLanguageHandler(this.state.lang === 'en' ? 'zh' : 'en')}>{t(`captcha.selectOptions.${this.state.lang === 'en' ? 'English' : 'Chinese'}`)}</Button>
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
                        <Input placeholder={t('captcha.placeholder')} maxLength={6} onChange={(e) => this.setState({ captchaInput: e.target.value })} />
                        <Button block disabled={this.state.captchaInput?.length !== 6} loading={this.state.verifyButtonLoader} onClick={() => this.verifyCaptcha()}>{t('captcha.button')}</Button>
                    </div>
                </Content>
            </Layout>
        )
    }
}

const CaptchaTranslated = withTranslation()(Captcha);

export default CaptchaTranslated;