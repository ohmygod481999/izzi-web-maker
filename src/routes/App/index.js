import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Sidenav from "../../layouts/Sidenav";
import Navbar from "../../layouts/Navbar";
import Footer from "../../layouts/Footer";
import SettingSidebar from "../../layouts/SettingSidebar";
import MainContent from "../../layouts/MainContent";
import Section from "../../layouts/Section";
import Test from "./Test";

function App({ match }) {
    return (
        <div className="App">
            <div id="app">
                <div className="main-wrapper main-wrapper-1">
                    <div className="navbar-bg" />
                    <Navbar />

                    <Sidenav />

                    {/* Main Content */}
                    <MainContent>
                        <Section>
                            <Route
                                path={`${match.path}/test`}
                                exact
                                component={Test}
                            />
                            <Route
                                path={`${match.path}/`}
                                exact
                                component={Dashboard}
                            />
                        </Section>
                        <SettingSidebar />
                    </MainContent>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default App;
