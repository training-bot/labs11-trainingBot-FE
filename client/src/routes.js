import React from 'react';
import { Redirect, Route, Router } from 'react-router-dom';
import App from './App';
import Home from './components/Dashboard/Dashboard';
// import Profile from './components/Profile/profile';
import Callback from './Callback/callback';
import Auth from './Auth/Auth';
import history from './history';
import ProfileView from './components/Profile/ProfileView';

const auth = new Auth();

const handleAuthentication = ({ location }) => {
	if (/access_token|id_token|error/.test(location.hash)) {
		auth.handleAuthentication();
	}
};
//Use this for rendering all of our components
export const makeMainRoutes = () => {
	return (
		<Router history={history}>
			<div>
				<Route exact path="/" render={props => <App auth={auth} {...props} />} />
				<Route path="/home" render={props => <Home auth={auth} {...props} />} />
				<Route
					path="/profile"
					render={props =>
						!auth.isAuthenticated() ? (
							<Redirect to="/home" />
						) : (
							<ProfileView auth={auth} {...props} />
						)
					}
				/>
				<Route
					path="/callback"
					render={props => {
						handleAuthentication(props);
						return <Callback {...props} />;
					}}
				/>
			</div>
		</Router>
	);
};
