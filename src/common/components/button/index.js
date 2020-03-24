import React from "react";
import './style.less';
import cx from "classnames";

export default function Button({ label = "Default", onClick, isSelected = false, isUpperCase }) {
	return (
			<button className={cx("simpleButton", isSelected && "selected", isUpperCase && "uppercase")} onClick={onClick}>
				{label}
			</button>
	);
}
