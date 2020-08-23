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
import * as serviceWorker from "./serviceWorker";

const httpLink = new HttpLink({
  uri: "https://be-best-markdown-editor-stage.herokuapp.com/cms",
});

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      token: "84e7d6e8-bb64-4bdc-bbb4-54859cb4ebe0",
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
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
