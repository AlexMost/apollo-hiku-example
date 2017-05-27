import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, ApolloClient, createNetworkInterface } from 'react-apollo';

import Home from '../components';

const client = new ApolloClient({
    networkInterface: createNetworkInterface({ uri: 'http://localhost:5000/graphql' }),
    initialState: window.__APOLLO_STATE__
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <Home/>
    </ApolloProvider>,
    document.getElementById('content')
);
