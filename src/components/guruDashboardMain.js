import React from 'react';
import {Col, Row, Fa, Table, Button} from 'mdbreact';

class GuruDashboardMain extends React.Component {
    render() {
        return (
            <div>
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
                    <Row id="info-table" className="pt-5">
                        <Col sm="12" md="6" className="tbl-info text-dark">
                            <h2>Recent activity</h2>
                            <Table small>
                                <thead>
                                    <tr>
                                        <th>Time</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>2018-08-12 20:08</td>
                                        <td>Ujian bahasa indonesia is activated</td>
                                    </tr>
                                    <tr>
                                        <td>2018-08-11 20:08</td>
                                        <td>Setting ujian bahasa inggris status to inactive</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                        <Col sm="12" md="6" className="tbl-info text-dark">
                            <h2>Recent finished exams</h2>
                            <Table small>
                                <thead>
                                    <tr>
                                        <th>Time</th>
                                        <th>Description</th>
                                        <th>Result</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>2018-08-12 20:08</td>
                                        <td>Ari setiawan just finished exams.</td>
                                        <td><Button color="success" size="sm">See the report</Button></td>
                                    </tr>
                                    <tr>
                                        <td>2018-08-12 20:01</td>
                                        <td>Muhammad Aji Bintang Nugraha just finished exams.</td>
                                        <td><Button color="success" size="sm">See the report</Button></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row id="info-kelas" className="text-dark">
                        <Col sm="12">
                            <h1>Your Classes</h1>
                            <Row>
                                <Col md="3" className="kelas-detail rounded danger-color text-white text-center py-0 px-0">
                                    <div className="jumlah-siswa text-center pt-5">
                                        <h2><strong>40 Siswa</strong></h2>
                                    </div>
                                    <div className="kelas-detail-title mt-3">
                                        <h3>RPL 1</h3>
                                        <Fa icon="group" size="4x"/>
                                    </div>
                                </Col>
                                <Col md="3" className="kelas-detail rounded warning-color text-white text-center py-0 px-0">
                                    <div className="jumlah-siswa text-center pt-5">
                                        <h2><strong>37 Siswa</strong></h2>
                                    </div>
                                    <div className="kelas-detail-title mt-3">
                                        <h3>RPL 2</h3>
                                        <Fa icon="group" size="4x"/>
                                    </div>
                                </Col>
                                <Col md="3" className="kelas-detail rounded success-color text-white text-center py-0 px-0">
                                    <div className="jumlah-siswa text-center pt-5">
                                        <h2><strong>35 Siswa</strong></h2>
                                    </div>
                                    <div className="kelas-detail-title mt-3">
                                        <h3>TSM 1</h3>
                                        <Fa icon="group" size="4x"/>
                                    </div>
                                </Col>
                                <Col md="3" className="kelas-detail rounded info-color text-white text-center py-0 px-0">
                                    <div className="jumlah-siswa text-center pt-5">
                                        <h2><strong>42 Siswa</strong></h2>
                                    </div>
                                    <div className="kelas-detail-title mt-3">
                                        <h3>TSM 2</h3>
                                        <Fa icon="group" size="4x"/>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </div>
        )
    }
}

export default GuruDashboardMain;
