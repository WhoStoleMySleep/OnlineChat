import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { graphql } from '@apollo/react-hoc';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.scss';
import store from './redux/store';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:3005/graphql',
});

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);
