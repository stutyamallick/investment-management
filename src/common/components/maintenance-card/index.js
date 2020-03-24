import React from 'react';
import './index.less'

export default class MaintenanceCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //
        }
    }
    render() {
        return (
            <div className="maintenance-card-main-body">
                <div className="maintenance-card-header">
                    <label className="maintenance-card-header-title">{this.props.headerTitle}</label>
                </div>
                <div className="maintenance-card-body">
                    {this.props.children}
                </div>
            </div>
        )
    }
}