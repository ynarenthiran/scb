import './tab.scss';

import { Tabs } from 'antd';
import { Component } from 'react';
import NewBooking from './new-booking/new-booking';
import UpdateBooking from './update-booking/update-booking';

const { TabPane } = Tabs;

class Tab extends Component {
    render() {
        return (
            <Tabs defaultActiveKey="new">
                <TabPane tab="New Booking" key="new">
                    <NewBooking />
                </TabPane>
                <TabPane tab="Cancellation and Enquiries" key="cancellationAndEnquiries">
                    <UpdateBooking />
                </TabPane>
            </Tabs>
        );
    }
}

export default Tab;
