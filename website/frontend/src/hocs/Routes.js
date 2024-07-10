import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../containers/Home";
import SearchForm from "../components/SearchForm";
import NotFound from "../containers/NotFound";
import Detail from "../containers/Detail";
import Listestate from "../components/Listestate";

const Routes = () => {
    return (
        <>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/listing/:id" component={Detail} />
                <Route exact path="/list-estate" component={Listestate} />
                <Route component={NotFound} />
            </Switch>
        </>
    );
};

export default Routes;
