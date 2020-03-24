import React from 'react';

export default class FormButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSubButtons: false
        }
    }
    onButtonClick = (data) => {
        let showSubButtons = false;
        if (data.subSection !== undefined) {
            if (!this.state.showSubButtons) {
                showSubButtons = true;
            }
        } else {
            this.props.onButtonClick(data.display)
        }
        this.setState({ showSubButtons })
    }
    render() {
        let buttonBackgroundColor = "#50738E";
        if(this.props.selectedButton === this.props.data.display){
            buttonBackgroundColor = "#05375e"
        }
        return (
            <div>
                <button
                    className="form_button"
                    style={{backgroundColor: buttonBackgroundColor}}
                    onClick={() => this.onButtonClick(this.props.data)}>
                    {this.props.data.display}
                    {this.props.data.subSection !== undefined
                        ? <span>
                            &nbsp;&nbsp;...
                        </span>
                        : null
                    }
                </button>
                {this.state.showSubButtons && this.props.data.subSection !== undefined
                    ? <div className="form_subService_btns_container" >
                        {this.props.data.subSection.map((subSection) =>
                            <div key={subSection.display}
                                onClick={() => this.onButtonClick(subSection)}>
                                <button className="form_sub_button">
                                    {subSection.display}
                                </button>
                            </div>
                        )}
                    </div>
                    : null
                }
            </div>
        )
    }
}