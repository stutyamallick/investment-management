import React from 'react';
import './index.less';
import searchIcon from '../../../resources/images/search-icon-white.svg'

export default class GlobalSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="search-block">
                <div className="search-block-input-ct">
                    <div className="search-input-inner-ct">
                        <input
                            type="text" className="search-input-box"
                            placeholder={this.props.placeholderText} />
                    </div>
                </div>
                <div className="search-icon-ct">
                    <img src={searchIcon}
                        alt="search" className="search-icon" onClick={this.onSearchIconClick} />
                </div>
            </div>
        )
    }
}