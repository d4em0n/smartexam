import React from 'react';
import {Button} from 'reactstrap';
import {store} from '../stores/store';
import {unsetProfile} from '../actions/profile';
import {unsetAuth} from '../actions/auth';

class SiswaDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.profile = store.getState().profile;
    }
    componentWillMount() {
        if(!this.profile || !this.profile.is_siswa) {
            this.gotoLogin();
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
            <h2>Ini halaman siswa</h2><br/>
            <Button onClick={this.logout.bind(this)}>Logout</Button>
        </div>
        );
    }
}

export default SiswaDashboard;
