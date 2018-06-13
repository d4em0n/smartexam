import React from 'react';
import {Container, Row, Col, Input} from 'reactstrap';
import {checkLogin} from '../util/api';
import {setAuth} from '../actions/auth';
import {setProfile} from '../actions/profile';
import {store} from '../stores/store';

function InputForm(props) {
    return (
        <div className="input-group shadow-sm">
            <div className="input-group-prepend">
                <span className="input-group-text"><i className={"fa " + props.icon}></i></span>
            </div>
            <Input type="text" className="form-control" {...props}/>
        </div>
    );
};

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
            return this.setState({error: true});
        });
    }


    handleClick(e) {
        e.preventDefault();
        let username = this.username.value;
        let password = this.password.value;
        let data = {username, password};
        this.handleLogin(data);
    }

    render() {
        let errormsg = "";
        if(this.state.error) {
            errormsg = "Login error!";
        }
        return (
        <Container fluid={true} className="body">
            <Container>
                <Row>
                    <Col sm={{size: 4, offset: 4}} className="login center-screen text-center text-white rounded shadow bg-success">
                        <h3>Login Form</h3>
                        <Col sm="12" className="form-login bg-white text-dark">
                            <div className="status bg-danger text-white rounded">{errormsg}</div>
                            <form>
                                <div className="input-userpass">
                                    <InputForm icon="fa-user" placeholder="Username" innerRef={(input) => (this.username = input)}/>
                                    <InputForm icon="fa-lock" placeholder="Password" type="password" innerRef={(input) => (this.password = input)}/>
                                </div>
                                <div className="custom-control custom-checkbox text-left remember">
                                    <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                                    <label className="custom-control-label" htmlFor="customCheck1">Remember Me</label>
                                </div>
                                <div className="input-group">
                                    <button type="submit" onClick={this.handleClick} className="shadow-sm btn btn-block btn-primary">Login</button>
                                </div>
                            </form>
                        </Col>
                    </Col>
                </Row>
            </Container>
        </Container>
        );
    }
}

export default Login;
