import React from "react";
import Layout from "./views/layout/Layout";
import IdleTimer from "react-idle-timer";
import { authContext } from "./configurations/adalConfig";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.idleTimer = null;
	}

	_onAction = () => {
		// console.log('user did something', e)
	}

	_onActive = () => {
		// console.log('user is active', e)
		// console.log('time remaining', this.idleTimer.getRemainingTime())
	}

	_onIdle = () => {
		authContext.logOut();
		// console.log('last active', this.idleTimer.getLastActiveTime())
	}

	render() {
		return (
			<div>
				<IdleTimer
					ref={ref => {
						this.idleTimer = ref;
					}}
					element={document}
					onActive={this.onActive}
					onIdle={this.onIdle}
					onAction={this.onAction}
					debounce={250}
					timeout={59 * 59 * 1000}
				/>
				<Layout />
			</div>
		);
	}
}

export default App;
