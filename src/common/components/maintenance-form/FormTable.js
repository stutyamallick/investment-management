import React from 'react';
import FormTableHeader from './FormTableHeader'
import FormTableBody from './FormTableBody'

export default class FormTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editInitiated: false,
            isCollapse: false,
            rowUpdateArr: [],
            updatedRowData: null
        }
    }
    
    onEditClick = () => {
        this.setState({ editInitiated: true });
    }

    onEditCancel = () => {
        this.setState({ editInitiated: false });
    }

    onCollapse = (flag) => {
        this.setState({ isCollapse: flag });
    }

    onSaveClick = () => {
        this.setState({ editInitiated: false });
        this.props.onSaveClick(this.state.rowUpdateArr);
    }

    onRowDataUpdate = (editedObj) => {
        const editIndex = this.isRowAlreadyUpdated(editedObj);
        if(editIndex !== -1)
         {
             const updateArr = this.state.rowUpdateArr.slice(0);
             const editValue = updateArr.splice(editIndex, 1)[0];
             this.setState({ rowUpdateArr: [ ...updateArr, { ...editValue, ...editedObj } ] });
         }
         else {
            this.setState({ rowUpdateArr: [ ...this.state.rowUpdateArr, editedObj ] }); 
         }

        console.log(this.state.rowUpdateArr, 'rowUpdateArr');
    }

    isRowAlreadyUpdated = ({ acctDescriptionKey, attributeListKey, categoryKey }) => {
        let editLocation = -1;
        this.state.rowUpdateArr.forEach((updatedData, i) => {
            if(updatedData.attributeListKey ===  attributeListKey && updatedData.acctDescriptionKey === acctDescriptionKey && updatedData.categoryKey === categoryKey)
                editLocation = i;
        });
        return editLocation;
    }

    // onRowDataUpdate = (editedData) => {
    //     let updatedRowData = []
    //     for (let i = 0; i < this.props.tableData.tableData.length; i++) {
    //         if (this.props.tableData.tableData[i].displayName === editedData.editedAttributeName) {
    //             let obj = {
    //                 ...this.props.tableData.tableData[i],
    //                 edited: true,
    //                 newValue: editedData.editedAttributeValue
    //             }
    //             updatedRowData.push(obj)
    //         }
    //     }
    //     if (this.state.updatedRowData !== null) {
    //         for (let i = 0; i < this.state.updatedRowData.length; i++) {
    //             if (this.state.updatedRowData[i].displayName !== editedData.editedAttributeName) {
    //                 updatedRowData.push(this.state.updatedRowData[i])
    //             }
    //         }
    //     }
    //     this.setState({ updatedRowData });
    // }

    render() {
        const { isCollapse, editInitiated, } = this.state;
        const { tableData, editAllStatus, isTableEditable } = this.props;
        return (
            <div className="form_table">
                <FormTableHeader
                    title={tableData.tableHeader}
                    subHeader={tableData.subHeader}
                    onEditClick={this.onEditClick}
                    onSaveClick={this.onSaveClick}
                    onEditCancel={this.onEditCancel}
                    onCollapse={this.onCollapse}
                    isTableEditable={isTableEditable}
                    editAllStatus={this.props.editAllStatus}
                />
                <FormTableBody
                    data={tableData.tableData}
                    isCollapse={isCollapse}
                    editInitiated={editInitiated || editAllStatus}
                    onRowDataUpdate={this.onRowDataUpdate} />
            </div>
        )
    }
}
