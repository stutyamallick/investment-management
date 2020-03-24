import React from 'react';
import './index.less';
import FormTable from './FormTable';

export default class MaintenanceFormTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editAllStatus: false
        }
    }
    
    onSaveClick = (data) => {
        this.setState({ editAllStatus: false })
        this.props.onSaveClick(data)
    }

    render() {
        return (
            <div className="tableContainer">
                <FormTable
                    tableData={this.props.tableData}
                    onSaveClick={this.onSaveClick}
                    isTableEditable={this.props.isTableEditable}
                    editAllStatus={this.state.editAllStatus} />
            </div>
        )
    }
}