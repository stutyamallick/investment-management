import React from 'react';
import './footer.less';
import moment from 'moment';

export default class Footer extends React.Component {
    render() {
        return (
            <React.Fragment>
                {/* <div className="footer-main-content-container Row_Flex">
                    <div className="footer-app-icon-container">
                        <div className="Vertical_Middle">
                            <img src={process.env.PUBLIC_URL + '/resources/images/logo-white.png'}
                                alt="Stream" className="footer-app-icon" />
                        </div>
                    </div>
                    <div className="footer-options-container">
                        <div className="Row_Flex Vertical_Middle">
                            <div className="Flex_1">
                                <div><label className="footer-option-label">Who We Are</label></div>
                                <div><label className="footer-option-label">Our People</label></div>
                                <div><label className="footer-option-label">Locations</label></div>
                                <div><label className="footer-option-label">Careers</label></div>
                            </div>
                            <div className="Flex_1">
                                <div><label className="footer-option-label">Services</label></div>
                                <div><label className="footer-option-label">Properties</label></div>
                                <div><label className="footer-option-label">Case Studies</label></div>
                                <div><label className="footer-option-label">In the News</label></div>
                            </div>
                            <div className="Flex_1">
                                <div><label className="footer-option-label">Tenant Portal</label></div>
                                <div><label className="footer-option-label">Contact</label></div>
                            </div>
                        </div>
                    </div>
                </div> */}
                {/* <div className="footer-horizontalLine"></div> */}
                <div className="footer-copyright-container Vertical_Middle">
                    <label>
                        &copy; {moment(new Date()).utc().year()} &nbsp;
                        Stream Realty Partner, LP
                        &nbsp;|&nbsp;
                        <a className="privacy_policy_link" href="https://streamrealty.com/privacy/" target="_blank">
                            Privacy Policy
                        </a>
                    </label>
                </div>
            </React.Fragment>
        )
    }
}