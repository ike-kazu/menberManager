import React from 'react';
import {Switch, Route} from 'react-router';
import {Home, SignUp, SignIn, Reset, groupEdit, groupHome, GroupList, groupAdministrators} from './templates';
import Auth from './Auth';

const Router = () => {
    return (
        <Switch>
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/signin' component={SignIn} />
            <Route exact path='/signin/reset' component={Reset} />
            <Auth>
                <Route exact path='(/)?' component={Home} />
                <Route path='/group/edit(/:id)?' component={groupEdit} />
                <Route exact path='/group/home/:id' component={groupHome} />
                <Route exact path='/group/list' component={GroupList} />
                <Route exact path='/group/administrators/list/:id' component={groupAdministrators} />
            </Auth>
        </Switch>
    );
};

export default Router;