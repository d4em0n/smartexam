import React from 'react';
import {Button} from 'mdbreact';
import {Container, Row, Col} from 'mdbreact';
import {Navbar, NavbarBrand, NavbarNav, NavItem, NavLink, Fa} from 'mdbreact';
import {ListGroup, ListGroupItem} from 'mdbreact';
import {store} from '../stores/store';
import {unsetProfile} from '../actions/profile';
import {unsetAuth} from '../actions/auth';
import $ from 'jquery';

class GuruDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.profile = store.getState().profile;
        this.toggleSidebar = this.toggleSidebar.bind(this);
        this.logout = this.logout.bind(this);
    }
    componentWillMount() {
        if(!this.profile || !this.profile.is_guru) {
            window.location.hash = "/";
        }
    }
    componentDidMount() {
    }
    gotoLogin() {
        window.location.hash = "/";
    }
    logout() {
        store.dispatch(unsetAuth());
        store.dispatch(unsetProfile());
        return this.gotoLogin();
    }
    toggleSidebar() {
        $("#side-wrapper").toggleClass("side-on");
    }
    render() {
        return (
            <div id="side-wrapper" className="side-on">
                    <div id="sidebar" className="grey lighten-4 z-depth-1 px-0">
                        <Navbar color="info-color-dark" dark className="px-0 pb-0">
                            <NavbarBrand className="text-white px-4">
                                <strong><span className="menu-title">SmartExam v0.1</span></strong>
                            </NavbarBrand>
                            <NavbarNav>
                                <NavItem active>
                                    <NavLink to="/" className="px-4">
                                        <Fa icon="home" className="mr-2" fixed/>
                                        <span className="menu-title">Home</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="/" className="px-4">
                                        <Fa icon="user" className="mr-2" fixed/>
                                        <span className="menu-title">Profile</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="/" className="px-4">
                                        <Fa icon="wrench" className="mr-2" fixed/>
                                        <span className="menu-title">Pengaturan</span>
                                    </NavLink>
                                </NavItem>
                            </NavbarNav>
                        </Navbar>
                    </div>
                    <Container fluid={true} id="guru-dashboard" className="px-0">
                        <Navbar color="info-color-dark" dark expand="md">
                            <NavbarBrand className="text-white" onClick={this.toggleSidebar}>
                                <strong><Fa icon="bars"/></strong>
                            </NavbarBrand>
                            <NavbarNav right>
                                <NavItem className="text-white" onClick={this.logout}>
                                    <a><strong>Logout</strong></a>
                                </NavItem>
                            </NavbarNav>
                        </Navbar>
                        <Col sm="12" id="guru-info" className="py-4 px-4 text-white">
                            <Row>
                                <Col sm="12" md="6" className="info-dashboard rounded hoverable border-success px-0 text-success">
                                    <Fa icon="group" className="info-icon" size="5x" />
                                    <div class="info-text">
                                        <h1><b>11</b></h1>
                                        <h2>Active</h2>
                                    </div>
                                </Col>
                                <Col sm="12" md="6" className="info-dashboard rounded hoverable border-danger px-0 text-danger">
                                    <Fa icon="laptop" className="info-icon" size="5x" />
                                    <div class="info-text">
                                        <h1><b>89</b></h1>
                                        <h2>Passed Test</h2>
                                    </div>
                                </Col>
                                <Col sm="12" md="6" className="info-dashboard rounded hoverable border-info px-0 text-info">
                                    <Fa icon="hourglass" className="info-icon" size="5x" />
                                    <div class="info-text">
                                        <h1><b>4</b></h1>
                                        <h2>On-going test</h2>
                                    </div>
                                </Col>
                                <Col sm="12" md="6" className="info-dashboard rounded hoverable border-warning px-0 text-warning">
                                    <Fa icon="gears" className="info-icon" size="5x" />
                                    <div class="info-text">
                                        <h1><b>0</b></h1>
                                        <h2>Inactive test</h2>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Container>
            </div>
        );
    }
}

export default GuruDashboard;
