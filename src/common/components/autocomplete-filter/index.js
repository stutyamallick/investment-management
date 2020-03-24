import React from 'react'
import ReactAutocomplete from 'react-autocomplete'
import './index.less'

export default class AutoCompleteFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }

    onInputChange = (e) => {
        let value = e.target.value;
        this.setState({ value })
        if(value.length > 2){
            this.props.onInputChange(value)
        }
    }

    onSelect = (value) => {
        this.setState({ value })
        let selectedPropertyObj = this.props.propertyList.propertyName.filter(
            propertyName => propertyName.propertyDisplayName == value
        )
        this.props.onSelect(selectedPropertyObj[0]);
    }

    render() {
        let propertyList = [];
        if(this.props.propertyList !== null){
            propertyList = this.props.propertyList.propertyName
        }
        return (
            <div className="react_autocomplete_container">
                <div className="filter_title_container">
                    <label className="filter_title">{this.props.filterTitle}</label>
                </div>
                <ReactAutocomplete
                    items={propertyList}
                    getItemValue={item => item.propertyDisplayName}
                    renderItem={(item, highlighted) =>
                        <div
                            key={item.propertyDisplayName}
                            // style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
                        >
                            {item.propertyDisplayName}
                        </div>
                    }
                    inputProps={{placeholder: this.props.filterTitle}}
                    value={this.state.value}
                    onChange={this.onInputChange}
                    // onSelect={value => this.setState({ value })}
                    onSelect={value => this.onSelect(value)}
                />
            </div>
        )
    }
}