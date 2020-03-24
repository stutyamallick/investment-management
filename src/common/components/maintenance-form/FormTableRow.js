import React from 'react';
import { getFormattedRowCellData } from '../../../utils/currency';

export default class FormTableRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rowData: props.data.columnData
        }
    }

    onValueEdit = (event, cellData) => {
        const row = this.state.rowData.slice(0);
        row.forEach((cell) => {
            if(cellData.valueKey === cell.valueKey) {
                cell.value = event.target.value
            }
        });
        this.setState({ rowData: row })

        let editedObject = {
            attributeListKey: this.props.data.attributeListKey,
            acctDescriptionKey: this.props.data.acctDescriptionKey,
            categoryKey: this.props.data.categoryKey
        }
        editedObject[cellData.valueKey] = event.target.value;
        this.props.onRowDataUpdate(editedObject);
    }

    render() {
        const { rowData } = this.state;
        const { data: { label, columnData }, editInitiated } = this.props;
        const columnDataTraverse = editInitiated ? rowData : columnData;
        return (
            <div className="form_table_row Row_Flex">
                <div className="form_table_row_display_cell Flex_1">
                    <div className="form_table_row_display_cell_inner_ct">
                        <label className="form_table_display_label">
                            {label}
                        </label>
                    </div>
                </div>
                {
                    columnDataTraverse.map((cellData, i) => {
                        return <div className="form_table_row_value_cell Flex_1" key={i}>
                        <div className="form_table_row_value_cell_inner_ct">
                            {
                                editInitiated && cellData.editable
                                ? <span>
                                    {this.props.data.options !== undefined
                                        ? <select 
                                            className="form_editable_combo_field"
                                            onChange={this.onValueEdit}>
                                            {this.props.data.options.map(
                                                value =>
                                                    <option key={value}>{value}</option>
                                            )}
                                        </select>
                                        : <input
                                            type="text"
                                            className="form_editable_text_field"
                                            value={cellData.value}
                                            onChange={(e) => this.onValueEdit(e, cellData)} />
                                    }
                                </span>
                                : <span className="form_table_value_label">{getFormattedRowCellData(cellData.value)}</span>
                            }
                        </div>
                    </div>
                    })
                }                
            </div>
        )
    }
}
