import React from 'react';
import {Container, Col, Row} from 'mdbreact';
import {Fa, Table, Badge, Button} from 'mdbreact';
import {Modal, ModalBody, ModalHeader, ModalFooter, Input} from 'mdbreact';
import {Switch, Route, HashRouter, Link} from 'react-router-dom';
import GuruUjianDetail from './guruUjianDetail';
import {getUjian, addUjian, deleteUjian, editUjian} from '../util/api';

class GuruUjian extends React.Component {
    render() {
        return (
            <HashRouter basename="guru/ujian">
            <div>
                <Route exact path="/" component={GuruUjianIndex} />
                <Route path="/:ujian_id" component={GuruUjianDetail} />
            </div>
            </HashRouter>
        );
    }
}

class GuruUjianIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modal_deleteUjian: false,
            modal_editUjian: false,
            tmp_delete: {},
            tmp_edit: {},
            ujianList: []
        };
        this.toggle = this.toggle.bind(this);
        this.toggle_deleteUjian = this.toggle_deleteUjian.bind(this);
        this.toggle_editUjian = this.toggle_editUjian.bind(this);
        this.addUjianHandler = this.addUjianHandler.bind(this);
    }

    componentDidMount() {
        getUjian().then(data => {
            this.setState({ujianList: data});
        })
    }

    addUjianHandler() {
        let desc = this.ujian_desc;
        if(!desc) {
            return;
        }
        addUjian(desc).then(data => {
            this.setState({
                ujianList: [...this.state.ujianList, data],
                modal: !this.state.modal
            });
        })
    }

    deleteUjianHandler() {
        let id_ujian = this.state.tmp_delete.id_ujian;
        deleteUjian(id_ujian).then(data => {
            this.setState({
                ujianList: this.state.ujianList.filter((data) => data.id_ujian !== id_ujian),
                modal_deleteUjian: !this.state.modal_deleteUjian
            });
        });
    }

    editUjianHandler() {
        console.log("Hello world");
        let ujian = this.state.tmp_edit;
        console.log(ujian);
        editUjian(ujian).then(data => {
            this.setState({
                ujianList: this.state.ujianList.map((data) => {
                    if(data.id_ujian === ujian.id_ujian) {
                        return Object.assign({}, data, ujian);
                    }
                    return data;
                }),
                modal_editUjian: !this.state.modal_editUjian
            })
        })
    }

    toggle_deleteUjian() {
        this.setState({modal_deleteUjian: !this.state.modal_deleteUjian});
    }

    toggle_editUjian() {
        this.setState({modal_editUjian: !this.state.modal_editUjian});
    }

    toggle() {
        this.setState({modal: !this.state.modal});
    }

    setTmpDeleteUjian(data_ujian) {
        this.setState({tmp_delete: Object.assign({}, data_ujian), modal_deleteUjian: !this.state.modal_deleteUjian});
    }

    setTmpEditUjian(data_ujian) {
        this.setState({tmp_edit: Object.assign({}, data_ujian), modal_editUjian: !this.state.modal_editUjian});
    }

    render() {
        return (
            <div className="text-dark">
                <h1>Your exams</h1>
                <Table>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Created At</th>
                            <th>Pelajaran</th>
                            <th>Status</th>
                            <th className="center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.ujianList.map((data, i) => {
                            let col = "danger";
                            let aktif = "Inactive";
                            if(data.is_aktif) {
                                col = "active";
                                aktif = "Active";
                            }
                            return (
                                <tr key={i}>
                                    <th><Link to={`/${data.id_ujian}`} className="blue-text">{data.deskripsi}</Link></th>
                                    <th>{data.created_at}</th>
                                    <th>{data.pelajaran}</th>
                                    <th><Badge color={col}>{aktif}</Badge></th>
                                    <th className="">
                                        <Button color="danger" size="sm" onClick={() => this.setTmpDeleteUjian(data)}>Delete</Button>
                                        <Button color="success" size="sm" onClick={() => this.setTmpEditUjian(data)}>Edit</Button>
                                    </th>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
                <Button color="success" size="sm" className="float-right align-middle" onClick={this.toggle}><Fa icon="plus" /> Add new Exam</Button>

                <Modal isOpen={this.state.modal} toggle={this.toggle} id="addUjian">
                    <ModalHeader toggle={this.toggle}>Add New Exam</ModalHeader>
                    <ModalBody>
                        <strong>Masukkan Deskripsi Ujian</strong> <Input label="Deskripsi Ujian" onChange={(e) => this.ujian_desc = e.target.value}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.toggle}>Cancel</Button>
                        <Button color="success" onClick={this.addUjianHandler}>Save</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modal_deleteUjian} toggle={this.toggle_deleteUjian} id="deleteUjian">
                    <ModalHeader toggle={this.toggle_deleteUjian}>Hapus Ujian</ModalHeader>
                    <ModalBody>
                        <strong>Apa anda yakin untuk menghapus ujian "{this.state.tmp_delete.deskripsi}"</strong>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.toggle_deleteUjian}>Cancel</Button>
                        <Button color="success" onClick={() => this.deleteUjianHandler()}>Delete</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modal_editUjian} toggle={this.toggle_editUjian} id="editUjian">
                    <ModalHeader toggle={this.toggle_editUjian}>Edit Ujian</ModalHeader>
                    <ModalBody>
                        <strong>Ganti Deskripsi Ujian</strong>
                        <Input label="Deskripsi Ujian" onChange={(e) => this.state.tmp_edit.deskripsi = e.target.value} value={this.state.tmp_edit.deskripsi}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.toggle_editUjian}>Cancel</Button>
                        <Button color="success" onClick={() => this.editUjianHandler()}>Save</Button>
                    </ModalFooter>
                </Modal>

            </div>
        );
    }
}

export default GuruUjian;
