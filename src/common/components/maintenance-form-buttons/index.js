import React from 'react';
import './index.less';
import FormButton from './FormButton'

export default class MaintenanceFormButtons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedButton: ""
        }
    }

    onButtonClick = (value) => {
        let selectedButton = "";
        for (let i = 0; i < this.props.data.length; i++) {
            if (this.props.data[i].subSection !== undefined) {
                for (let j = 0; j < this.props.data[i].subSection.length; j++) {
                    if (value.display === this.props.data[i].subSection[j].display) {
                        selectedButton = this.props.data[i].display;
                    }
                }
            } else {
                if (value.display === this.props.data[i].display) {
                    selectedButton = this.props.data[i].display;
                }
            }
        }

        this.props.onButtonClick(value)
        this.setState({ selectedButton })
    }
    render() {
        return (
            <div style={{ padding: '0.5rem' }}>
                <div className="formtype_buttons_container Row_Flex">
                    {this.props.data.map((data) =>
                        <FormButton
                            key={data.display}
                            data={data}
                            onButtonClick={this.onButtonClick}
                            selectedButton={this.state.selectedButton} />
                    )}
                </div>
                {this.props.editAll
                    ? <div className="form_edit_all_text_container Rev_Row_Flex">
                        <div className="edit_all_text_container" onClick={this.props.onEditAllClick}>
                            {this.props.editAllText !== undefined
                                ? <span className="edit_all_text">{this.props.editAllText}</span>
                                : <span className="edit_all_text">{'Edit All Fields'}</span>
                            }
                        </div>
                    </div>
                    : null
                }
            </div>
        )
    }
}