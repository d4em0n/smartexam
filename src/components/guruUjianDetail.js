import React from 'react';
import {Container, Row, Col, Button, Table, Fa, Badge} from 'mdbreact';
import {ListGroup, ListGroupItem, Input, FormInline} from 'mdbreact';
import {getUjianDetail, getPertanyaanFull} from '../util/api';

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
            pertanyaan: []
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
                                            <span>Edit</span> <span>Delete</span>
                                        </div>
                                        <ListGroup className="grup-jawaban mt-2">
                                            {data.jawaban.map((data_jawaban, j) => {
                                                return (
                                                    <ListGroupItem key={j}>
                                                        <InputRadio id={`radio${data.id}${data_jawaban.id}`}
                                                            name={`radio${data.id}`}
                                                            label={data_jawaban.text}
                                                            checked={data_jawaban.is_benar}
                                                        />
                                                        <div className="float-right">
                                                            <span>Edit</span> <span>Delete</span>
                                                        </div>
                                                    </ListGroupItem>
                                                );
                                            })}
                                            <ListGroupItem className="input-jawaban">
                                                <input placeholder="Tambah Jawaban" className="px-2"/>
                                                <Button size="sm" color="primary">Add</Button>
                                            </ListGroupItem>
                                        </ListGroup>
                                    </ListGroupItem>
                                );
                            })}
                            <ListGroupItem className="input-soal">
                                <input placeholder="Tambah Pertanyaan" className="px-2"/>
                                <Button size="sm" color="primary">Add</Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default GuruUjianDetail;
