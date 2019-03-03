import * as React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Index from './components/Index';
import QueryEdit from './components/QueryEdit';
import QueryExecute from './components/QueryExecute';

const Routes: React.FunctionComponent = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/home" component={Index}/>
            <Route exact path="/add" component={QueryEdit}/>
            <Route exact path="/:id/edit" component={QueryEdit}/>
            <Route exact path="/:id/execute" component={QueryExecute}/>
        </Switch>
    </BrowserRouter>
);

export default Routes;