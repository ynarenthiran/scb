import './Captcha.scss';
import { Component } from "react";
import { Button, Input, Layout } from 'antd';
import { Redirect } from 'react-router-dom';
import { ReloadOutlined } from '@ant-design/icons';
const { Header, Content } = Layout;

class Captcha extends Component {
    state = { navigate: false, captchaInput: null };
    captcha = 'https://www.technotification.com/wp-content/uploads/2014/12/captcha.jpg';
    render() {
        if (this.state.navigate) {
            return <Redirect to="/booking" path="/booking" exact={true} />
        }
        return (
            <Layout className="captcha">
                <Header>
                    <div className="header">Captcha Verification</div>
                </Header>
                <Content>
                    <div className="block">
                        <div>Type the Verification Code (in Capital Letters)</div>
                        <img src={this.captcha} />
                        <div className='captcha-input'>
                            <Input placeholder="Verification Code" onChange={(e) => this.setState({ captchaInput: e.target.value })} /> <Button shape="circle" icon={<ReloadOutlined />} />
                        </div>
                        <Button block disabled={!this.state.captchaInput} onClick={() => this.setState({ navigate: true })}>Proceed</Button>
                    </div>
                </Content>
            </Layout>
        )
    }
}
export default Captcha;