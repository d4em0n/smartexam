import React from 'react';
import {Button} from 'mdbreact';
import {Container, Row, Col} from 'mdbreact';
import {Navbar, NavbarBrand, NavbarNav, NavItem, NavLink, Fa} from 'mdbreact';
import {ListGroup, ListGroupItem} from 'mdbreact';
import {Table} from 'mdbreact';
import {store} from '../stores/store';
import {unsetProfile} from '../actions/profile';
import {unsetAuth} from '../actions/auth';
import GuruDashboardMain from './guruDashboardMain';
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
                        <GuruDashboardMain />
                    </Container>
            </div>
        );
    }
}


export default GuruDashboard;
