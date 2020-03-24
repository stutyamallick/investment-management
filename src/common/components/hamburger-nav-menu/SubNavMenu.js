import React from "react";
import { NavLink } from "react-router-dom";

export default class SubNavMenu extends React.Component {
	render() {
		return (
			<div className="sub-service-nav-container">
				<div className="nav-container-innerCt">
					<NavLink to={"/" + this.props.menu.url}>
						<label className="sub-service-nav-link-label">
							{this.props.menu.display}
						</label>
					</NavLink>
				</div>
			</div>
		);
	}
}
