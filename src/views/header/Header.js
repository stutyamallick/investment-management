import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/user/actions';
import './header.less';
import menuList from '../../constants/menu_config';
import * as appConstants from '../../configurations/appConstants';
import GlobalSearch from '../../common/components/global-search/index';
import UserAvatar from '../../common/components/user-avatar/index';
import SearchOverlay from '../../common/components/search-overlay/index';
import HamburgerNavMenu from '../../common/components/hamburger-nav-menu/index';
import { authContext } from '../../configurations/adalConfig'
import logoWhite from '../../resources/images/logo-white.png'
import logoWithoutName from '../../resources/images/logo-without-name.png'

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMaintenanceSubService: false,
            showUserMenu: false,
            showSearchOverlay: false
        };
    }

    componentWillMount(){
        this.props.getUserData();
    }

    onSearchIconClick = () => {
        let showSearchOverlay = false;
        if (!this.state.showSearchOverlay) {
            showSearchOverlay = true;
        }
        this.setState({ showSearchOverlay })
    }

    onSearchBtnClick = (value) => {
        this.setState({ showSearchOverlay: false })
    }

    onCancelBtnClick = () => {
        this.setState({ showSearchOverlay: false })
    }

    onUserMenuClick = () => {
        authContext.logOut();
    }

    render() {
        let userName;
        if(this.props.userData !== null){
            userName = this.props.userData.user.preferredName;
        }
        return (
            <div className="header-container">
                <div className="app-icon-container">
                    <div className="app-icon-inner-container">
                        <img src={logoWhite}
                            alt="Stream" className="app-icon" />
                    </div>
                </div>
                <div className="app-name-container">
                    <div className="app-name-inner-container">
                        <label className="app-name-label">
                            {appConstants.APPLICATION_NAME}
                        </label>
                    </div>
                </div>
                <div className="app-icon-name-container">
                    <div className="app-icon-name-inner-container">
                        <img src={logoWithoutName}
                            alt="Stream" className="app-icon-name-icon" />
                        <br />
                        <label className="app-name-label">
                            {appConstants.APPLICATION_NAME}
                        </label>
                    </div>
                </div>
                <div className="app-user-action-item-container">
                    <div className="app-search-container">
                        <GlobalSearch
                            placeholderText={appConstants.GLOBAL_SEARCH_PLACEHOLDER} />
                    </div>
                    <UserAvatar
                        userName={userName}
                        userOptions={["Sign out"]}
                        onUserMenuClick={this.onUserMenuClick}
                    />
                </div>
                <HamburgerNavMenu
                    userName={userName}
                    userOptions={["Sign out"]}
                    menu={menuList} />

                {this.state.showSearchOverlay
                    ? <SearchOverlay
                        placeholderText={appConstants.GLOBAL_SEARCH_PLACEHOLDER}
                        searchButtonText={appConstants.GLOBAL_SEARCH_SEARCH_BUTTON_TEXT}
                        cancelButtonText={appConstants.GLOBAL_SEARCH_CANCEL_BUTTON_TEXT}
                        onSearchBtnClick={this.onSearchBtnClick}
                        onCancelBtnClick={this.onCancelBtnClick} />
                    : null
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userData: state.user.userData
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getUserData: () => dispatch(actions.getUserData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
