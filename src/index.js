/*import { runWithAdal } from 'react-adal';
import { authContext } from './configurations/adalConfig';
 
const DO_NOT_LOGIN = false;
 
runWithAdal(authContext, () => {
    require('./indexApp.js');
},DO_NOT_LOGIN);*/

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./style/main.less";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/appStore";

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);