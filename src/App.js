import React, { Component } from 'react';
import Login from './components/newlogin';
import SiswaDashboard from './components/siswa';
import GuruDashboard from './components/guru';
import store from './stores/store';
import {BrowserRouter as Router, Switch, Route, HashRouter} from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <HashRouter basename="/">
                <Switch>
                    <Route exact path="/" component={Login} />)} />
                    <Route path="/guru" component={GuruDashboard} />
                    <Route path="/siswa" component={SiswaDashboard} />
                </Switch>
            </HashRouter>
        );
    }
}

export default App;
