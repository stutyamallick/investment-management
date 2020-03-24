import React from 'react';
import './index.less';
import NavMenu from './NavMenu';
import UserAvatar from './UserAvatar';

export default class HamburgerNavMenu extends React.Component {

    onNavMenuClick = () => {
        this.mySidenav.checked = false;
        // const openMenu = document.querySelectorAll('.opened');
        // openMenu.forEach((_node) => {
        //     _node.classList.remove('opened');
        //     _node.classList.add('closed');
        // });
    }

    render() {
        const { userName, userOptions, menu } = this.props;
        return (
            <div className="menuToggle">                
                <input className="menu_checkbox" type="checkbox" ref={(el) => this.mySidenav = el} />
                <label className="menubar"></label>
                <div className="menu">
                    <div className="hm-user-container">
                        <UserAvatar
                            userName={userName}
                            userOptions={userOptions} />
                    </div>
                    <div>
                        {menu.map(
                            (menu, i) =>
                                <NavMenu
                                    key={i}
                                    menu={menu}
                                    onNavMenuClick={this.onNavMenuClick} />
                        )}
                    </div>
                </div>
            </div>
        )
    }
}
