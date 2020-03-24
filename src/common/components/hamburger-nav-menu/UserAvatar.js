import React from 'react';
import './index.less';

export default class UserAvatar extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            showUserMenu: false,
            userInitials: ""
        })
    }

    componentDidMount() {
        //compute user Initials
        if (this.props.userName !== undefined) {
            let nameWordsArray = this.props.userName.split(' ');
            let userInitials = nameWordsArray[0].charAt(0);
            if (nameWordsArray.length > 1) {
                userInitials = userInitials + nameWordsArray[nameWordsArray.length - 1].charAt(0);
            }
            this.setState({ userInitials })
        }
    }

    componentDidUpdate(){
        //compute user Initials
        if (this.props.userName !== undefined) {
            let nameWordsArray = this.props.userName.split(' ');
            let userInitials = nameWordsArray[0].charAt(0);
            if (nameWordsArray.length > 1) {
                userInitials = userInitials + nameWordsArray[nameWordsArray.length - 1].charAt(0);
            }
            if(this.state.userInitials === ""){
                this.setState({ userInitials })
            }
        }
    }

    onUserDropdownClick = () => {
        let hmUserOption = document.getElementById('hmUserOption').style.display;
        if (hmUserOption === "" || hmUserOption === "none") {
            document.getElementById('hmUserOption').style.display = "block";
        } else if (hmUserOption === "block") {
            document.getElementById('hmUserOption').style.display = "none";
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="hm-user-avatar">
                    <div className="hm-user-name-container Vertical_Center_Align">
                        <label className="hm-user-initial-label" htmlFor="userCb">
                            {this.state.userInitials}
                        </label>
                    </div>
                    <input type="checkbox" className="userCheckbox" id="userCb" />
                    <div className="hm-user-dropdown-container">
                        <div className="hm-user-dropdown-content">
                            {this.props.userOptions.map((value, i) =>
                                <div className="hm-user-dropdown-option" key={i}>
                                    <label className="hm-user-dropdown-label">{value}</label>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}