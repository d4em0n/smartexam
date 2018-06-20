import React from 'react';
import {Container, Row, Col, Button, Table, Fa, Badge} from 'mdbreact';
import {ListGroup, ListGroupItem, Input, FormInline} from 'mdbreact';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'mdbreact';
import {getUjianDetail, getPertanyaanFull, SetJawabanBenar} from '../util/api';
import {addPertanyaan, deletePertanyaan, editPertanyaan, addJawaban, deleteJawaban, editJawaban} from '../util/api';

function InputRadio(props) {
    return (
        <div className="custom-radio size-sm inline">
            <input type="radio"  {...props} />
            <label htmlFor={props.id}>
                <span></span>
                {props.label}
            </label>
        </div>
    )
}

class GuruUjianDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ujian: {},
            pertanyaan: [],
            modal_editPertanyaan: false,
            modal_deletePertanyaan: false,
            modal_editJawaban: false,
            modal_deleteJawaban: false,
            tmp_pertanyaan: {},
            tmp_jawaban: {}
        };
    }

    componentDidMount() {
        let id_ujian = this.props.match.params.ujian_id;
        let ujian_detail = getUjianDetail(id_ujian);
        let pertanyaan_detail = getPertanyaanFull(id_ujian);
        Promise.all([ujian_detail, pertanyaan_detail]).then(([ujian, pertanyaan]) => {
            console.log(pertanyaan);
            this.setState({ujian, pertanyaan});
        });
    }

    toggle(modal_attr) {
        this.setState({[modal_attr]: !this.state[modal_attr]});
    }

    addPertanyaanHandler(evt) {
        evt.preventDefault();
        let el = this.refs.newPertanyaan;
        let pertanyaan = el.value;
        let id_ujian = this.state.ujian.id_ujian;
        addPertanyaan(id_ujian, pertanyaan).then(data => {
            console.log(data);
            this.setState({
                pertanyaan: [...this.state.pertanyaan, data],
            });
            el.value = "";
        });
    }

    addJawabanHandler(evt, id_pertanyaan) {
        evt.preventDefault();
        let el = this.refs[`newJawaban_${id_pertanyaan}`];
        let jawaban = el.value;
        let id_ujian = this.state.ujian.id_ujian;
        console.log(jawaban);
        addJawaban(id_ujian, id_pertanyaan, jawaban).then(data => {
            console.log(data);
            this.setState({
                pertanyaan: this.state.pertanyaan.map(pertanyaan => {
                    if(pertanyaan.id === id_pertanyaan) {
                        pertanyaan.jawaban = [...pertanyaan.jawaban, data];
                    }
                    return pertanyaan;
                })
            });
            el.value = "";
        });
    }

    deleteTmpPertanyaan() {
        let id_ujian = this.state.ujian.id_ujian;
        let id_pertanyaan = this.state.tmp_pertanyaan.id;
        deletePertanyaan(id_ujian, id_pertanyaan).then(data => {
            this.setState({
                pertanyaan: this.state.pertanyaan.filter((pertanyaan) => pertanyaan.id !== id_pertanyaan),
                modal_deletePertanyaan: false,
                tmp_pertanyaan: {}
            });
        })
    }

    deleteTmpJawaban() {
        let id_ujian = this.state.ujian.id_ujian;
        let id_pertanyaan = this.state.tmp_pertanyaan.id;
        let id_jawaban = this.state.tmp_jawaban.id;
        deleteJawaban(id_ujian, id_pertanyaan, id_jawaban).then(data => {
            this.setState({
                pertanyaan: this.state.pertanyaan.map(pertanyaan => {
                    if(pertanyaan.id === id_pertanyaan) {
                        pertanyaan.jawaban = pertanyaan.jawaban.filter(jawaban => jawaban.id !== id_jawaban);
                    }
                    return pertanyaan;
                }),
                modal_deleteJawaban: false,
                tmp_pertanyaan: {},
                tmp_jawaban: {}
            });
        });
    }

    editTmpPertanyaan() {
        let id_ujian = this.state.ujian.id_ujian;
        let id_pertanyaan = this.state.tmp_pertanyaan.id;
        let newtext = this.state.tmp_pertanyaan.text;
        editPertanyaan(id_ujian, id_pertanyaan, newtext).then(data => {
            this.setState({
                pertanyaan: this.state.pertanyaan.map((pertanyaan) => {
                    if(pertanyaan.id === data.id) {
                        return Object.assign({}, pertanyaan, data);
                    }
                    return pertanyaan;
                }),
                modal_editPertanyaan: false,
                tmp_pertanyaan: {}
            });
        });
    }

    editTmpJawaban() {
        let id_ujian = this.state.ujian.id_ujian;
        let id_pertanyaan = this.state.tmp_pertanyaan.id;
        let id_jawaban = this.state.tmp_jawaban.id;
        let jawaban = this.state.tmp_jawaban;
        editJawaban(id_ujian, id_pertanyaan, id_jawaban, jawaban).then(data => {
            this.setState({
                pertanyaan: this.state.pertanyaan.map(pertanyaan => {
                    if(pertanyaan.id === id_pertanyaan) {
                        pertanyaan.jawaban = pertanyaan.jawaban.map(jawaban => {
                            if(jawaban.id === id_jawaban) {
                                return Object.assign({}, jawaban, data);
                            }
                            return jawaban;
                        });
                    }
                    return pertanyaan;
                }),
                modal_editJawaban: false,
                tmp_pertanyaan: {},
                tmp_jawaban: {}
            });
        });
    }

    gantiJawaban(id_pertanyaan, id_jawaban) {
        SetJawabanBenar(this.state.ujian.id_ujian, id_pertanyaan, id_jawaban);
    }

    setTmpPertanyaanAndModal(pertanyaan, modal_name) {
        console.log(modal_name);
        this.setState({tmp_pertanyaan: pertanyaan, [modal_name]: !this.state[modal_name]});
    }

    setTmpJawabanAndModal(jawaban, modal_name, tmp_pertanyaan = {}) {
        this.setState({tmp_jawaban: jawaban, [modal_name]: !this.state[modal_name], tmp_pertanyaan});
    }

    render() {
        let status = "Inactive";
        let status_color = "danger";
        if(this.state.ujian.is_aktif) {
            status = "Active";
            status_color = "success";
        }
        return (
            <div className="text-dark">
                <Row>
                    <Col sm="6" className="tasks-detail d-inline-flex">
                        <div className="icon-tasks border p-4 z-depth-1">
                            <Fa icon="tasks" size="5x" />
                        </div>
                        <div className="tasks-detail-text pt-4 ml-3">
                            <strong>Description: </strong><span>{this.state.ujian.deskripsi}</span><br/>
                            <strong>Created at: </strong><span>{this.state.ujian.created_at}</span><br/>
                            <strong>Status: </strong><span><Badge color={status_color}>{status}</Badge></span><br/>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm="6" className="pt-5">
                        <h2>Recent Activity</h2>
                        <Table small>
                            <thead>
                                <tr>
                                    <th>Time</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2018-12-5 10:21</td>
                                    <td>Ulangan Harian Bahasa Indonesia Created</td>
                                </tr>
                                <tr>
                                    <td>2018-12-5 10:21</td>
                                    <td>Ari Setiawan just finished this exams</td>
                                </tr>
                                <tr>
                                    <td>2018-12-5 10:21</td>
                                    <td>Rudi just finished this exams</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12" className="pt-5">
                        <h2>Questions</h2>
                        <ListGroup>
                            {this.state.pertanyaan.map((data, i) => {
                                return (
                                    <ListGroupItem key={i}>
                                        <strong>{i+1}. </strong>
                                        {data.text}
                                        <div className="float-right">
                                            <span className="green-text like-link mr-1"
                                                onClick={() => this.setTmpPertanyaanAndModal(data, "modal_editPertanyaan")}>Edit</span>
                                            <span className="red-text like-link"
                                                onClick={() => this.setTmpPertanyaanAndModal(data, "modal_deletePertanyaan")}>Delete</span>
                                        </div>
                                        <ListGroup className="grup-jawaban mt-2">
                                            {data.jawaban.map((data_jawaban, j) => {
                                                return (
                                                    <ListGroupItem key={j}>
                                                        <InputRadio id={`radio${data.id}${data_jawaban.id}`}
                                                            name={`radio${data.id}`}
                                                            label={data_jawaban.text}
                                                            defaultChecked={data_jawaban.is_benar}
                                                            onChange={() => this.gantiJawaban(data.id, data_jawaban.id)}
                                                        />
                                                        <div className="float-right">
                                                            <span className="green-text like-link mr-1"
                                                                onClick={() => this.setTmpJawabanAndModal(data_jawaban, "modal_editJawaban", data)}>Edit</span>
                                                            <span className="red-text like-link"
                                                                onClick={() => this.setTmpJawabanAndModal(data_jawaban, "modal_deleteJawaban", data)}>Delete</span>
                                                        </div>
                                                    </ListGroupItem>
                                                );
                                            })}
                                            <ListGroupItem className="input-jawaban">
                                                <form onSubmit={(e) => this.addJawabanHandler(e, data.id)}>
                                                    <input placeholder="Tambah Jawaban" className="px-2" ref={`newJawaban_${data.id}`}/>
                                                    <Button size="sm" color="primary" type="submit">Add</Button>
                                                </form>
                                            </ListGroupItem>
                                        </ListGroup>
                                    </ListGroupItem>
                                );
                            })}
                            <ListGroupItem className="input-soal">
                                <form onSubmit={(e) => this.addPertanyaanHandler(e)}>
                                    <input placeholder="Tambah Pertanyaan" className="px-2" ref='newPertanyaan'/>
                                    <Button size="sm" color="primary" type="submit">Add</Button>
                                </form>
                            </ListGroupItem>
                        </ListGroup>

                        <Modal isOpen={this.state.modal_deleteJawaban} toggle={() => this.toggle('modal_deleteJawaban')} id="deleteUjian">
                            {/* Ini modal untuk menghapus jawaban */}
                            <ModalHeader toggle={() => this.toggle('modal_deleteJawaban')}>Hapus Jawaban</ModalHeader>
                            <ModalBody>
                                <strong>Apa anda yakin untuk menghapus jawaban "{this.state.tmp_jawaban.text}"</strong>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onClick={() => this.toggle('modal_deleteJawaban')}>Cancel</Button>
                                <Button color="success" onClick={() => this.deleteTmpJawaban()}>Delete</Button>
                            </ModalFooter>
                        </Modal>

                        <Modal isOpen={this.state.modal_deletePertanyaan} toggle={() => this.toggle('modal_deletePertanyaan')} id="deleteUjian">
                            <ModalHeader toggle={() => this.toggle('modal_deletePertanyaan')}>Hapus Pertanyaan</ModalHeader>
                            <ModalBody>
                                <strong>Apa anda yakin untuk menghapus pertanyaan "{this.state.tmp_pertanyaan.text}"</strong>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onClick={() => this.toggle('modal_deletePertanyaan')}>Cancel</Button>
                                <Button color="success" onClick={() => this.deleteTmpPertanyaan()}>Delete</Button>
                            </ModalFooter>
                        </Modal>

                        <Modal isOpen={this.state.modal_editJawaban} toggle={() => this.toggle('modal_editJawaban')} id="deleteUjian">
                            <ModalHeader toggle={() => this.toggle('modal_editJawaban')}>Hapus Ujian</ModalHeader>
                            <ModalBody>
                                <strong>Ganti Jawaban</strong>
                                <Input label="Jawaban"
                                    onChange={(e) => this.state.tmp_jawaban.text = e.target.value} value={this.state.tmp_jawaban.text}/>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onClick={() => this.toggle('modal_editJawaban')}>Cancel</Button>
                                <Button color="success" onClick={() => this.editTmpJawaban()}>Save</Button>
                            </ModalFooter>
                        </Modal>

                        <Modal isOpen={this.state.modal_editPertanyaan} toggle={() => this.toggle('modal_editPertanyaan')} id="deleteUjian">
                            <ModalHeader toggle={() => this.toggle('modal_editPertanyaan')}>Edit Pertanyaan</ModalHeader>
                            <ModalBody>
                                <strong>Ganti Pertanyaan</strong>
                                <Input label="Pertanyaan"
                                    onChange={(e) => this.state.tmp_pertanyaan.text = e.target.value} value={this.state.tmp_pertanyaan.text}/>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onClick={() => this.toggle('modal_editPertanyaan')}>Cancel</Button>
                                <Button color="success" onClick={() => this.editTmpPertanyaan()}>Save</Button>
                            </ModalFooter>
                        </Modal>

                    </Col>
                </Row>
            </div>
        );
    }
}

export default GuruUjianDetail;
