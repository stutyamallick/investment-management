import React from "react";
import cx from 'classnames';
import FormTableRow from "./FormTableRow";

export default function FormTableBody({
	isCollapse,
	editInitiated,
	data,
	onRowDataUpdate
}) {
	return (
		<>
			{data ? (
				<div className={cx(isCollapse ? "hideTableData" : "slideTableData")}>
					{data.map((data, i) => (
						<FormTableRow
							key={i}
							data={data}
							editInitiated={editInitiated}
							onRowDataUpdate={onRowDataUpdate}
						/>
					))}
				</div>
			) : null}
		</>
	);
}
