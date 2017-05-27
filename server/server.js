import React from 'react';
import express from 'express';
import bodyParser from 'body-parser';
import ReactDOM from 'react-dom/server';
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo';
import { renderToStringWithData } from "react-apollo"
import fetch from 'node-fetch';
import Home from '../components'
import WrapHTML from '../components/html-wrap';
import path from 'path';
global.fetch = fetch;

const app = express();

app.use(bodyParser.json());
app.use('/static', express.static(path.resolve(__dirname, '../static')));
app.get('/', (req, res) => {
    const client = new ApolloClient({
      ssrMode: true,
      networkInterface: createNetworkInterface({
        uri: 'http://example.com:5000/graphql',
        opts: {
          credentials: 'same-origin',
          headers: req.headers,
        },
      }),
    });

    const AppComponent = (
        <ApolloProvider client={client}>
            <Home/>
        </ApolloProvider>
    );

    renderToStringWithData(AppComponent).then((content) => {
        const initialState = {'apollo': client.getInitialState() };
        const html = <WrapHTML content={content} state={initialState} />;
        res.status(200);
        res.send(`<!doctype html>\n${ReactDOM.renderToStaticMarkup(html)}`);
        res.end();
    });
});

const port = 3000;

app.listen(port, () => {
    console.log(`SSR server is listening on port ${JSON.stringify(port)}`);
});
