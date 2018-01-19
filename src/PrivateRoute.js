import React from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom';

const fakeAuth = {
    isAuthenticated: false,
    inLogin: false,
    authenticate (cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout (cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};
  
const PrivateRoute = ({ component: Component, ...rest }) => {
    console.log(Component);
    return (<Route {...rest} render={props => (
        fakeAuth.isAuthenticated ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }}/>
        )
    )}/>);
};

export default PrivateRoute;
