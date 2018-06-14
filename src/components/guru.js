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
        this.toggle = 0;
    }
    componentWillMount() {
        if(!this.profile || !this.profile.is_guru) {
            window.location.hash = "/";
        }
    }
    componentDidMount() {
        this.sidewidth = $("#sidebar").css("width");
        $("#guru-dashboard").css({"margin-left": this.sidewidth});
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
        this.toggle = !this.toggle;
        if(this.toggle) {
            $("#guru-dashboard").css({"margin-left": "0px"});
            $("#sidebar").css({"width": "0px"});
            $("#guru-dashboard").addClass("col-sm-12");
        } else {
            $("#sidebar").css({"width": this.sidewidth});
            $("#guru-dashboard").css({"margin-left": this.sidewidth});
            $("#guru-dashboard").removeClass("col-sm-12");
        }
    }
    render() {
        return (
            <Container fluid={true}>
                <Row>
                    <Col sm="2" id="sidebar" className="border grey lighten-4 z-depth-1 px-0">
                        <Navbar color="info-color-dark" dark className="px-0 pb-0">
                            <NavbarBrand className="text-white px-4">
                                <strong>SmartExam v0.1</strong>
                            </NavbarBrand>
                            <NavbarNav>
                                <NavItem active>
                                    <NavLink to="/" className="px-4"><Fa icon="home" className="mr-2"/>Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="/" className="px-4"><Fa icon="user" className="mr-2"/>Profile</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="/" className="px-4"><Fa icon="wrench" className="mr-2"/>Pengaturan</NavLink>
                                </NavItem>
                            </NavbarNav>
                        </Navbar>
                    </Col>
                    <Col sm="10" id="guru-dashboard" className="px-0">
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
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default GuruDashboard;
