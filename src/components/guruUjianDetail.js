import React from 'react';
import {Container, Row, Col, Button, Table, Fa, Badge} from 'mdbreact';
import {ListGroup, ListGroupItem, Input, FormInline} from 'mdbreact';

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
    render() {
        return (
            <div className="text-dark">
                <Row>
                    <Col sm="6" className="tasks-detail d-inline-flex">
                        <div className="icon-tasks border p-4 z-depth-1">
                            <Fa icon="tasks" size="5x" />
                        </div>
                        <div className="tasks-detail-text pt-4 ml-3">
                            <strong>Description: </strong><span>Ulangan Harian Bahasa Indonesia</span><br/>
                            <strong>Created at: </strong><span>2018-02-12 09:12</span><br/>
                            <strong>Status: </strong><span><Badge color="success">Active</Badge></span><br/>
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
                            <ListGroupItem>
                                <strong>1. </strong>
                                Cras justo odio
                                <div className="float-right">
                                    <span>Edit</span> <span>Delete</span>
                                </div>
                                <ListGroup className="grup-jawaban mt-2">
                                    <ListGroupItem>
                                        <InputRadio id="radio01" name="radio" label="Use our position utilities to place"/>
                                        <div className="float-right">
                                            <span>Edit</span> <span>Delete</span>
                                        </div>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <InputRadio id="radio02" name="radio" label="Ini jawaban kedua"/>
                                        <div className="float-right">
                                            <span>Edit</span> <span>Delete</span>
                                        </div>
                                    </ListGroupItem>
                                    <ListGroupItem className="input-jawaban">
                                        <input placeholder="Tambah Jawaban" className="px-2"/>
                                        <Button size="sm" color="primary">Add</Button>
                                    </ListGroupItem>
                                </ListGroup>
                            </ListGroupItem>
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
