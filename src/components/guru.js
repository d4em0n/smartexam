import React from 'react';
import 'typeface-roboto';
import {Button} from 'mdbreact';
import {store} from '../stores/store';
import {unsetProfile} from '../actions/profile';
import {unsetAuth} from '../actions/auth';

class GuruDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.profile = store.getState().profile;
    }
    componentWillMount() {
        if(!this.profile || !this.profile.is_guru) {
            window.location.hash = "/";
        }
    }
    gotoLogin() {
        window.location.hash = "/";
    }
    logout() {
        store.dispatch(unsetAuth());
        store.dispatch(unsetProfile());
        return this.gotoLogin();
    }
    render() {
        return (
        <div>
            <h2>Ini halaman guru</h2><br/>
            <Button onClick={this.logout.bind(this)} variant="contained" color="primary">
                Logout
            </Button>
        </div>
        );
    }
}

export default GuruDashboard;
