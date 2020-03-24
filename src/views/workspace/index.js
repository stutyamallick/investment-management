import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './style.less';
import Performance from '../../modules/performance/index';
import PropertyMaintenance from '../../modules/property-maintenance/index';
import LoanMaintenance from '../../modules/loan-maintenance/index';
import LenderMaintenance from '../../modules/lender-maintenance/index';
import PageNotFound from '../pageNotFound';
import PageUnderDevelopment from '../underDev';

export default function WorkSpace() {
        return (
            <Switch>
                <Route path='/performance/:name' component={Performance} />
                <Route path='/property-maintenance' component={PropertyMaintenance} />
                <Route path='/lender-maintenance' component={LenderMaintenance} />
                <Route path='/loan-maintenance' component={LoanMaintenance} />
                <Route path='/reports' component={PageUnderDevelopment} />
                <Redirect exact from="/" to="/performance/all-fund" />
                <Route component={PageNotFound} />
            </Switch>
        );
};
