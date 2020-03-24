import React from 'react';
import './index.less';

export default class SearchOverlay extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            searchTextValue: ''
        }
    }

    onSearchTextChange = (event) => {
        this.setState({ searchTextValue: event.target.value })
    }
    onSearchBtnClick = () => {
        this.props.onSearchBtnClick(this.state.searchTextValue)
    }

    render() {
        return (
            <div className="search-overlay">
                <div className="search-content">
                    <div className="search-field-container">
                        <input 
                            type="text" 
                            placeholder={this.props.placeholderText}
                            className="search-text-field"
                            value={this.state.searchTextValue}
                            onChange={this.onSearchTextChange} />
                    </div>
                    <div className="search-buttons-container">
                        <button
                            className="search-button"
                            onClick={this.onSearchBtnClick} >
                            {this.props.searchButtonText}
                        </button>
                        &nbsp;&nbsp;
                        <button
                            onClick={this.props.onCancelBtnClick}
                            className="search-button">
                            {this.props.cancelButtonText}
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}