import React from 'react';
import './index.less';

export default class UserAvatar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInitials: ""
        };
    }

    componentDidMount() {
        //compute user Initials
        if (this.props.userName) {
            let nameWordsArray = this.props.userName.split(' ');
            let userInitials = nameWordsArray[0].charAt(0);
            if (nameWordsArray.length > 1) {
                userInitials += nameWordsArray[nameWordsArray.length - 1].charAt(0);
            }
            this.setState({ userInitials });
        }
    }

    componentDidUpdate(){
        //compute user Initials
        if (this.props.userName) {
            let nameWordsArray = this.props.userName.split(' ');
            let userInitials = nameWordsArray[0].charAt(0);
            if (nameWordsArray.length > 1) {
                userInitials += nameWordsArray[nameWordsArray.length - 1].charAt(0);
            }
            if(this.state.userInitials === ""){
                this.setState({ userInitials });
            }
        }
    }

    myFunction = () => {
        this.myDropdown.classList.toggle('show');
      }

    render() {
        const { userOptions, onUserMenuClick } = this.props;
        return (
            <div className="user-avatar-container" onMouseOver={this.myFunction} onMouseOut={this.myFunction}>
                <button className="dropbtn">{this.state.userInitials}</button>
                <div ref={(el) => this.myDropdown = el} className="dropdown-content">
                    {
                        userOptions.map((value, i) =>
                            <a className="user-dropdown-option" key={i} onClick={onUserMenuClick}>
                                {value}
                            </a>
                        )
                    }
                </div>
            </div>
        )
    }
}
