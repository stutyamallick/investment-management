import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/property-maintenance/actions';
import '../../common/styles/maintenance-module-styles.less'
import MaintenanceCard from '../../common/components/maintenance-card/index';
import MaintenanceFormTable from '../../common/components/maintenance-form/index';
import MaintenanceFormButtons from '../../common/components/maintenance-form-buttons/index'
import AutoCompleteFilter from '../../common/components/autocomplete-filter/index';
import * as appConstants from '../../configurations/appConstants';
import Button from '../../common/components/button';
import { PROPERTY_EDIT } from '../../constants/constants';

class PropertyMaintenance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formButtons: 
                [
                        { "display": "General Asset Summary", "key": 1 },
                        { "display": "Operating Summary", "key": 2 },
                        { "display": "Reversion Summary", "key": 3 },
                        { "display": "Current Cost Basis", "key": 4 },
                        { "display": "Current Capitalization", "key": 5 },
                        { "display": "Estimated Fully Funded Capital", "key": 7 },
                        { "display": "Debt Information", "key": 8 }
                ],
            showFormButtons: false,
            showFormTable: false,
            tableData: {},
            selectedPropertyId: '',
            selectedProperty: {},
            selectedBtn: {},
            isTableEditable: false
        }
    }

    onInputChange = (value) => {
        this.props.getFilteredProperties(value);
    }

    onSelect = (value) => {
        this.props.getPropertyTrackerDetails(value.propertyId);
        this.props.getPropertyDetails(value.propertyId);
        this.props.getAllManualEditFields(value.propertyId);
        this.setState({ showFormTable: false, showFormButtons: true, selectedPropertyId: value.propertyId, selectedProperty: value, selectedBtn: {} });
        this.props.getFilteredProperties(value.display);
    }

    groupByCategory = (propertyArr, columnDataKeys) => {
        const summaryData = [];
        this.getTableEditableStatus(propertyArr);
        propertyArr.forEach(element => {
            summaryData.push({
                label: element.attributeName,
                columnData: this.getColumnData(element, columnDataKeys),
                attributeListKey: element.attributeListKey,
                acctDescriptionKey: element.acctDescriptionKey,
                categoryKey: element.categoryKey
            });
        });
        return summaryData;
    }

    getTableEditableStatus = (propertyArr) => {
        propertyArr.some(element => {
        const isTableEdit = [element.editAttribute, element.editActuals, element.editBudget, element.editProforma].indexOf(PROPERTY_EDIT.edit) !== -1;
            if(isTableEdit) {
                this.setState({ isTableEditable: true });
                return true;
            }            
        });
    }

    getColumnData = (element, columnDataKeys) => {
        return columnDataKeys.map((attributeKey) => {
            return { valueKey: attributeKey.valueKey, value: element[attributeKey.valueKey], editable: element[attributeKey.editKey] === PROPERTY_EDIT.edit };
        });
    }

    onButtonClick = (category) => {
        this.setState({ selectedBtn: category, isTableEditable: false });
        let subHeader = [];
        let categoryData = [];

        let sectionPropertyDetails = this.props.propertyDetails.property.filter(
            property => property.categoryKey == category.key
        );

        console.log(sectionPropertyDetails, 'sectionPropertyDetails');

        switch(category.key) {
            case 1:
            case 3:
            case 8:
                categoryData = this.groupByCategory(sectionPropertyDetails, [{ valueKey: "attributeValue", editKey: "editAttribute"}]);
                break;
            case 2:
                categoryData = this.groupByCategory(sectionPropertyDetails, [{ valueKey: "actualBegin", editKey: "editActuals"}, { valueKey: "budget", editKey: "editBudget" }, { valueKey: "proforma", editKey: "editProforma"}]);
                subHeader = ["", "Actual/Budget", "Original Budget", "Pro Forma"];
                break;
            case 4:
            case 5:
            case 7:
                categoryData = this.groupByCategory(sectionPropertyDetails, [{ valueKey: "actualBegin", editKey: "editActuals"  }, { valueKey: "amountPSF", editKey: "editProforma"}]);
                subHeader = ["", "$ Amount", "$/SF"];
                break;
        };
        let formData = {
            tableHeader: category.display,
            subHeader: subHeader,
            tableKey: category.key,
            tableData: categoryData
        }
        this.setState({ tableData: formData, showFormTable: true })
    }

    onEditAllClick = () => {
        console.log('edit all clicked')
    }

    onSaveClick = (data) => {
        console.log(data, 'save data object');
        if(!data) return;
        // let editData = []
        // for (let i = 0; i < data.length; i++) {
        //     let currentManualFieldData = this.props.manualEditFields.propertyEditableFields.filter(
        //         edit => edit.attributeName === data[i].displayName
        //     )
        //     let currentEditObj = {
        //         "newValue": data[i].newValue,
        //         "categoryKey": currentManualFieldData[0].categoryKey,
        //         "attributeListKey": currentManualFieldData[0].attributeListKey,
        //         "attributeKey": currentManualFieldData[0].attributeKey,
        //         "dataType": currentManualFieldData[0].dataType
        //     }
        //     editData.push(currentEditObj);
        // }
        let params = {
            id: this.state.selectedPropertyId,
            saveData: data
        }
        this.props.saveEditedData(params);
        setTimeout(() => {
            this.props.getPropertyDetails(this.state.selectedProperty.propertyId);
        });
    }

    render() {
        const { formButtons, selectedBtn, showFormButtons, showFormTable, tableData, isTableEditable } = this.state;
        return (
            <div className="maintenance_card_main_container">
                <MaintenanceCard
                    headerTitle={appConstants.PROPERTY_MAINTENANCE_CARD_HEADER}
                >
                    <AutoCompleteFilter
                        filterTitle="Select a Property"
                        propertyList={this.props.filteredProperties}
                        onInputChange={this.onInputChange}
                        onSelect={this.onSelect} />

                    <div className="horizontal_line_seperator"><div></div></div>

                    <div>
                        {
                            showFormButtons && formButtons.map((btn, i) => {
                                return <Button key={"btn_" + i} label={btn.display} isSelected={selectedBtn.key == btn.key} onClick={() => this.onButtonClick(btn)} />
                            })
                        }
                    </div>

                    {
                    showFormTable && <MaintenanceFormTable
                            tableData={tableData}
                            isTableEditable={isTableEditable}
                            onSaveClick={this.onSaveClick} />
                    }
                </MaintenanceCard>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        filteredProperties: state.property.filteredProperties,
        propertyTrackerDetails: state.property.propertyTrackerDetails,
        propertyDetails: state.property.propertyDetails,
        manualEditFields: state.property.manualEditFields
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getFilteredProperties: (param) => dispatch(actions.getFilteredProperties(param)),
        getPropertyTrackerDetails: (param) => dispatch(actions.getPropertyTrackerDetails(param)),
        getPropertyDetails: (param) => dispatch(actions.getPropertyDetails(param)),
        getAllManualEditFields: (param) => dispatch(actions.getAllManualEditFields(param)),
        saveEditedData: (param) => dispatch(actions.saveEditedData(param))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertyMaintenance);
