import React from 'react';
import {Container, Col, Row} from 'mdbreact';
import {Fa, Table, Badge, Button} from 'mdbreact';
import {Switch, Route, HashRouter, Link} from 'react-router-dom';
import GuruUjianDetail from './guruUjianDetail';

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
    render() {
        return (
            <div className="text-dark">
                <h1>Your exams</h1>
                <Table>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Created At</th>
                            <th>Questions</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th><Link to="/1" className="blue-text">Ulangan Harian Bahasa Indonesia</Link></th>
                            <th>2018-01-26 07:89</th>
                            <th>40 Questions</th>
                            <th><Badge color="success">Active</Badge></th>
                        </tr>
                        <tr>
                            <th><Link to="/2" className="blue-text">Ulangan Tengah Semester Bahasa Indonesia</Link></th>
                            <th>2018-01-26 07:89</th>
                            <th>50 Questions</th>
                            <th><Badge color="danger">Inactive</Badge></th>
                        </tr>
                    </tbody>
                </Table>
                <Button color="success" size="sm" className="float-right align-middle"><Fa icon="plus" /> Add new Exam</Button>
            </div>
        );
    }
}

export default GuruUjian;
