import React from 'react'
import { Switch, Route } from 'react-router-dom'

import UserIndex from '../users/Index'
import UserCreate from '../users/Create'
import UserEdit from '../users/Edit'

const Index = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/dashboard/" component={UserIndex} />
                <Route exact path="/dashboard/create" component={UserCreate} />
                <Route exact path="/dashboard/user/:email" component={UserEdit} />
                <Route path="*">
                    <h1>Page not found</h1>
                </Route>
            </Switch>
        </div>
    );
}

export default Index;