import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./App";
import NotFound from "./NotFound";
import { Redirect } from "react-router-dom";

function Routes() {
    return (
        <Router>
            <div className="App">
                <Route path="/app" component={App} />
                <Route path="/" render={props => <Redirect to={'/app'} />} />
                
                {/* <Route component={NotFound} /> */}
            </div>
        </Router>
    );
}

export default Routes;
