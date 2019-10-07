import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { authProvider } from './authProvider';
import { AzureAD, AuthenticationState } from 'react-aad-msal';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <AzureAD provider={authProvider} forceLogin={true}>
                {
                    ({ authenticationState, accountInfo }) => {
                        return (
                            <Layout>
                                {
                                    authenticationState === AuthenticationState.Authenticated &&
                                    <React.Fragment>
                                        <Route exact path='/' render={(props) =>
                                            <Home {...props} user={accountInfo} />} />
                                        <Route path='/counter' component={Counter} />
                                        <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
                                    </React.Fragment>
                                }
                            </Layout>
                        );
                    }
                }
            </AzureAD>
        );
    }
}
