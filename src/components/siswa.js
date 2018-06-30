import React from 'react';
import {Button, Container, Row, Col} from 'mdbreact';
import {Navbar, NavbarBrand, NavbarNav, NavItem, NavLink, Fa} from 'mdbreact';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'mdbreact'
import {store} from '../stores/store';
import {unsetProfile} from '../actions/profile';
import {unsetAuth} from '../actions/auth';
import {Switch, Route, HashRouter, Link} from 'react-router-dom';
import {getUjian} from '../util/api';
import MulaiUjian from './mulaiUjian';

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
            <HashRouter basename="/siswa">
                <Container fluid={true} className="px-0">
                    <Navbar color="indigo" dark expand="md">
                        <NavbarBrand href="/">
                            <strong>SmartExam</strong>
                        </NavbarBrand>
                        <NavbarNav left>
                            <NavItem active>
                                <NavLink to="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="#">Settings</NavLink>
                            </NavItem>
                        </NavbarNav>
                        <NavbarNav right>
                            <NavItem>
                                <Button size="sm" color="indigo" onClick={() => this.logout()}><Fa icon="star" /> Logout</Button>
                            </NavItem>
                        </NavbarNav>
                    </Navbar>
                    <Switch>
                        <Route exact path="/" component={DaftarUjian} />)} />
                        <Route path="/ujian/:id_ujian" component={MulaiUjian} />
                    </Switch>
                </Container>
            </HashRouter>
        );
    }
}

class DaftarUjian extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggleUjianModal.bind(this);
        this.state = {
            modal: false,
            ujianModal: {},
            ujian: [],
        };
    }
    componentDidMount() {
        getUjian().then(data => {
            console.log(data);
            this.setState({ujian: data});
        });
    }
    toggleUjianModal(ujian) {
        this.setState({
            modal: !this.state.modal,
            ujianModal: ujian
        })
    }
    render() {
        return (
        <HashRouter basename="/siswa">
            <Container className="text-center pt-5">
                <h2 className="title">Ujian yang tersedia</h2>
                <Row className="mt-5">
                    {this.state.ujian.map((data, i) => {
                        return (
                            <Col key={i}
                                md="4"
                                sm="6"
                                onClick={() => this.toggleUjianModal(data)}
                                className="text-center white-text z-depth-2 box-border bg-primary">
                            <h5>{data.deskripsi}</h5>
                        </Col>
                        )
                    })}
                </Row>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Ulangan Bahasa Indonesia</ModalHeader>
                <ModalBody>
                    Apakah anda yakin untuk memulai "{this.state.ujianModal.deskripsi}" ini?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={() => this.toggleUjianModal("")}>Cancel</Button>{' '}
                    <Link to={`/ujian/${this.state.ujianModal.id_ujian}`}><Button color="success">Accept</Button></Link>
                </ModalFooter>
                </Modal>
            </Container>
        </HashRouter>
        );
    }
}
export default SiswaDashboard;
