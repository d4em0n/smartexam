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
import GuruUjian from './guruUjian';
import {Switch, Route, HashRouter, Link} from 'react-router-dom';
import $ from 'jquery';

const MenuItem = (props) => {
    return (
        <NavItem active={props.active}>
            <NavLink to={props.to} className="px-4">
                <Fa icon={props.icon} className="mr-2" fixed/>
                <span className="menu-title">{props.label}</span>
            </NavLink>
        </NavItem>
    );
}

class GuruDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.profile = store.getState().profile;
        this.toggleSidebar = this.toggleSidebar.bind(this);
        this.logout = this.logout.bind(this);
        this.menuList = [
            {
                label: 'Home',
                icon: 'home',
                to: '/',
                exact: true,
                comp: GuruDashboardMain
            },
            {
                label: 'Profil',
                icon: 'user',
                to: '/profile',
                comp: () => (<h2>Ini Profile</h2>)
            },
            {
                label: 'Pengaturan',
                icon: 'wrench',
                to: '/pengaturan',
                comp: () => (<h2>Ini Pengaturan</h2>)
            },
            {
                label: 'Ujian',
                icon: 'tasks',
                to: '/ujian',
                comp: GuruUjian
            }
        ];
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
            <HashRouter basename="guru">
                <div id="side-wrapper" className="side-on">
                    <div id="sidebar" className="grey lighten-4 z-depth-1 px-0">
                        <Navbar color="info-color-dark" dark className="px-0 pb-0">
                            <NavbarBrand className="text-white px-4">
                                <strong><span className="menu-title">SmartExam v0.1</span></strong>
                            </NavbarBrand>
                            <NavbarNav>
                                {this.menuList.map((menu, i) => {
                                    let active = false;
                                    if(`/${this.props.match.params.page}` == menu.to) {
                                        active = true;
                                    }
                                    if(menu.exact && !this.props.match.params.page) {
                                        active = true;
                                    }
                                    return (<MenuItem label={menu.label} icon={menu.icon} active={active} key={i} to={menu.to}/>)
                                })}
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
                        <Col sm="12" className="py-4 px-4 text-dark">
                            <Switch>
                                {this.menuList.map((menu, i) => {
                                    return (<Route exact={menu.exact} path={menu.to} key={i} component={menu.comp}/>);
                                })}
                            </Switch>
                        </Col>
                    </Container>
                </div>
            </HashRouter>
        );
    }
}


export default GuruDashboard;
