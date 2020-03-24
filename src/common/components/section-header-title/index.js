import React from 'react';
import './index.less';

function SectionHeaderTitle(props) {
    return (
        <div className="heading-para-ct">
            <p className="heading-para">
                <span className="section_header_title_label">{props.title}</span>
            </p>
        </div>
    )
}
export default SectionHeaderTitle;
