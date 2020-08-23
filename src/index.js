import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {
  ApolloProvider,
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import { AppWrapper } from "sriracha-ui";
import { BrowserRouter as Router } from "react-router-dom";

import "sriracha-ui/css/main.css";

import * as serviceWorker from "./serviceWorker";

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_API,
});

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      token: process.env.REACT_APP_TOKEN,
    },
  });
  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AppWrapper bg="#FAFAFA">
        <Router>
          <App />
        </Router>
      </AppWrapper>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
