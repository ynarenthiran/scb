import { Component } from "react";
import { Modal, Button, Empty } from 'antd';
import { withTranslation } from 'react-i18next';
import { CommonHttpService } from '../services/common-http.service';

class ModalComponent extends Component {
    props: any = this.props;
    state = { isModalVisible: false };

    service = new CommonHttpService();

    componentWillUnmount() {
        this.setState({ isModalVisible: false });
    }

    render() {
        const { t }: any = this.props;
        return (
            <Modal className={this.props.method} visible={this.props.visible} onCancel={() => this.props.onChange(false)} footer={[
                <Button key="submit" type="primary" onClick={() => this.props.onChange(false)}>
                    {t('modal.okbutton')}
                </Button>
            ]}>
                <div className='modal-content-data'>
                    {
                        (this.props.method === 'info' || this.props.method === 'error' || this.props.method === 'success') &&
                        <Empty image={`${this.service.BASEURL}/images/${this.props.method}.svg`} description={false} />
                    }
                    {
                        this.props.title &&
                        <div className="modal-title">
                            {this.props.title}
                        </div>
                    }
                    {
                        this.props.message.map((pm: any) => (
                            <div className="modal-message">
                                {pm}
                            </div>
                        ))
                    }
                </div>
            </Modal>
        );
    }
}
const ModalComponentTranslated: any = withTranslation()(ModalComponent);
export default ModalComponentTranslated;