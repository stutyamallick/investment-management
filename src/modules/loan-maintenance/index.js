import React from 'react';
import '../../common/styles/maintenance-module-styles.less';
import './style.less';
import MaintenanceCard from '../../common/components/maintenance-card/index';
import * as appConstants from '../../configurations/appConstants';

class LoanMaintenance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="maintenance_card_main_container">
                <MaintenanceCard
                    headerTitle={appConstants.LOAN_MAINTENANCE_CARD_HEADER}
                >
                    <div className="loanTextAlign">This is Loan maintenance page.</div>
                </MaintenanceCard>
            </div>
        )
    }
}

export default LoanMaintenance;