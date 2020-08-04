import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./App";
import NotFound from "./NotFound";

function Routes() {
    return (
        <Router>
            <div className="App">
                <Route path="/app" component={App} />
                {/* <Route component={NotFound} /> */}
            </div>
        </Router>
    );
}

export default Routes;
