import { Component } from "react";
import { Modal, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { withTranslation } from 'react-i18next';

class ModalComponent extends Component {
    props: any = this.props;
    state = { isModalVisible: false };

    componentWillUnmount() {
        this.setState({ isModalVisible: false });
    }

    render() {
        const { t }: any = this.props;
        return (
            <Modal title={t('new_booking.header')} visible={this.props.visible} onCancel={() => this.props.onChange(false)} footer={[
                <Button key="submit" type="primary" onClick={() => this.props.onChange(false)}>
                    Ok
                </Button>
            ]}>
                {this.props.body}
            </Modal>
        );
    }
}
const ModalComponentTranslated: any = withTranslation()(ModalComponent);
export default ModalComponentTranslated;