import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import cx from "classnames";

export default function NavMenu({ menu, subMenu, onNavMenuClick }) {
	const [showSubMenu, setShowSubMenu] = useState(false);
	const subMenuPrefix = subMenu ? "sub-service-" : "";
	const path = menu.url ? { to: "/" + menu.url } : { to: "" };

	function onMenuClick(e) {
		setShowSubMenu(!showSubMenu);
		e.stopPropagation();
	}

	return (
		<div className={subMenuPrefix + "nav-container"}>
			{
				<>
					<div
						className={cx(
							"nav-container-innerCt",
							showSubMenu ? "opened" : "closed"
						)}
						onClick={menu.subMenu && !menu.url ? onMenuClick : onNavMenuClick}
					>
						<NavLink
							{...path}
							activeStyle={{
								pointerEvents: "none"
							}}
						>
							{menu.display}
						</NavLink>
						{menu.subMenu && (
							<span className="subMenu-dot-label" onClick={onMenuClick} />
						)}
					</div>
					<div className="showSubMenu">
						{menu.subMenu &&
							menu.subMenu.map(menu => (
								<NavMenu
									key={menu.url}
									menu={menu}
									onNavMenuClick={onNavMenuClick}
									subMenu
								/>
							))}
					</div>
				</>
			}
		</div>
	);
}
