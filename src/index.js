import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import Routes from "./routes/index";
import { ApolloProvider } from "@apollo/client";
import { client } from "./utils/apolo-client";

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <Routes />
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
