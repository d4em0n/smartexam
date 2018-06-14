import React from 'react';
import {Container, Row, Col, Input} from 'mdbreact';
import { ToastContainer, toast } from 'react-toastify';
import {checkLogin} from '../util/api';
import {setAuth} from '../actions/auth';
import {setProfile} from '../actions/profile';
import {store} from '../stores/store';
import '../css/main.css';
import 'font-awesome/css/font-awesome.min.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbootstrap/css/bootstrap.min.css';
import 'mdbootstrap/css/mdb.min.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {error: false};
    }
    login_or_redirect() {
        let status = store.getState().profile;
        let loc = "/guru";
        if(status) {
            if(status.is_siswa) {
                loc = "/siswa"
            }
            window.location.hash = loc;
        }
    }

    componentWillMount() {
        this.login_or_redirect();
    }

    handleLogin(data) {
        checkLogin(data.username, data.password).then(result => {
            return store.dispatch(setProfile(result))
        }).then(() => {
            return store.dispatch(setAuth(data));
        }).then(() => {
            return this.login_or_redirect();
        }).catch(err => {
            toast.error('Login error');
        });
    }


    handleClick(e) {
        e.preventDefault();
        let username = this.username;
        let password = this.password;
        let data = {username, password};
        this.handleLogin(data);
    }

    render() {
        return (
        <Container fluid={true} className="body">
            <Container>
                <Row>
                    <Col sm="4" className="login center-screen text-center text-white rounded shadow bg-info mx-auto">
                        <h3>Login Form</h3>
                        <Col sm="12" className="form-login bg-white text-dark text-left rounded">
                            <div className="status bg-danger text-white rounded">{}</div>
                            <form>
                                <Input label="Username" name="username" icon="user" onChange={(evt) => {this.username = evt.target.value}}/>
                                <Input label="Password" icon="lock" type="password" onChange={(evt) => {this.password = evt.target.value}}/>
                                <div className="input-group">
                                    <button type="submit" onClick={this.handleClick} className="shadow-sm btn btn-block btn-primary">Login</button>
                                </div>
                            </form>
                        </Col>
                    </Col>
                </Row>
                <ToastContainer
                    hideProgressBar={true}
                    newestOnTop={true}
                    autoClose={5000}
                    position="top-center"
                />
            </Container>
        </Container>
        );
    }
}

export default Login;
