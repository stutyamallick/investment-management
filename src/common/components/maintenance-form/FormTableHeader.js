import React from 'react';
import { FaPlus, FaRegEdit, FaRegSave, FaMinus } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

export default class FormTableHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editClicked: false,
            isCollapsedTable: false
        }
        this.iconColor = "#FFFFFF";
        this.iconSize = "1.3em";
    }

    componentDidUpdate(prevProps) {
        if(prevProps.title !== this.props.title)
            this.onCancel();
    }
    
    onEditClick = () => {
        this.setState({ editClicked: true });
        this.props.onEditClick();
    }

    onCancel = () => {
        this.setState({ editClicked: false });
        this.props.onEditCancel();
    }

    onSaveClick = () => {
        this.setState({ editClicked: false });
        this.props.onSaveClick();
    }

    onCollapseTable = () => {
        this.setState({ isCollapsedTable: !this.state.isCollapsedTable }, () => {
            this.props.onCollapse(this.state.isCollapsedTable);
        });
    }

    render() {
        const { editClicked, isCollapsedTable } = this.state;
        const { subHeader, title, isTableEditable } = this.props;
        return (
            <>
                <div className="form_table_header">
                    <div className="form_table_title_container">
                        <div className="form_table_title_inner_container">
                            <label className="form_table_title">{title}</label>
                        </div>
                    </div>
                    <div className="header_btn_grp">
                        {
                            editClicked && isTableEditable ?
                            <>
                                <div className="headerIcon">
                                    <FaRegSave size={this.iconSize} color={this.iconColor} onClick={this.onSaveClick} />
                                </div>
                                <div className="headerIcon">
                                        <MdClose size={this.iconSize} color={this.iconColor} onClick={this.onCancel} />
                                </div>
                            </>
                            :
                            isTableEditable && <div className="headerIcon">
                                <FaRegEdit size={this.iconSize} color={this.iconColor} onClick={this.onEditClick} />
                            </div>
                        }
                        {
                            isCollapsedTable ?
                                <div className="headerIcon">
                                    <FaPlus size={this.iconSize} color={this.iconColor} onClick={this.onCollapseTable} />
                                </div>
                            :
                                <div className="headerIcon">
                                    <FaMinus size={this.iconSize} color={this.iconColor} onClick={this.onCollapseTable} />
                                </div>
                        }
                    </div>
                </div>
                {
                    subHeader && !isCollapsedTable && subHeader.length > 0
                        ? <div className="form_table_subHeader">
                            <div className="form_table_title_container">
                                <div className="form_table_title_inner_container">
                                    <div className="Row_Flex">
                                        {subHeader.map(
                                            (data, i) => <div className="Flex_1" key={'data_' + i}>
                                                <label className="form_table_subHeader_title">{data}</label>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        : null
                    }
                {/* <div className="form_table_header_btns_container"> */}
                    {/* <div className="form_table_header_btns_inner_container"> */}
                        {/* {this.state.editClicked || this.props.editAllStatus
                            ? <div style={{ backgroundColor: '#fff', width: '1.5rem', marginRight: '0.75rem' }}>
                                <img src={editIconBlue}
                                    alt="edit" className="form_table_edit_icon_clicked" />
                            </div>

                            : <div style={{ marginRight: '0.75rem' }}>
                                <img src={editIcon}
                                    alt="edit" className="form_table_edit_icon"
                                    onClick={this.onEditClick} />
                            </div>
                        } */}
                        {/* <div className="headerIcon" onClick={this.onEditClick}>
                            <FaRegEdit size={"1.3em"} color="#FFFFFF" />
                        </div>
                        <div className="headerIcon" onClick={this.onSaveClick}>
                            <FaRegSave size={"1.3em"} color="#FFFFFF" />
                        </div>
                        <div className="headerIcon">
                            <MdClose size={"1.3em"} color="#FFFFFF" />
                        </div> */}
                        {/* <div>
                            <img src={saveIcon}
                                alt="save" className="form_table_save_icon"
                                onClick={this.onSaveClick} />
                        </div> */}
                    {/* </div> */}
                {/* </div> */}
            </>
        )
    }
}
