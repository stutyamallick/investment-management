import React from "react";
import "./layout.less";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import WorkSpace from "../workspace";

export default function Layout() {
	function handleDomClick(e) {
		const menu = document.getElementsByClassName("menu_checkbox")[0];
		if (menu.checked) {
			if (getParents(e.target).indexOf("menuToggle") === -1)
				menu.checked = false;
		}
	}

	function getParents(elem) {
		var parents = [];
		while (
			elem.parentNode &&
			elem.parentNode.nodeName.toLowerCase() != "body"
		) {
			elem = elem.parentNode;
			parents.push(elem.classList[0]);
		}
		return parents;
	}

	return (
		<div onClick={handleDomClick}>
			<div className="layout-header-container">
				<Header />
			</div>
			<div className="layout-selected-route-container">
				<WorkSpace />
			</div>
			<div className="layout-footer-container">
				<Footer />
			</div>
		</div>
	);
}
