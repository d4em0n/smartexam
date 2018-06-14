import React from 'react';
import {Pagination, PageLink, PageItem} from 'mdbreact';
import {Fa, Button, Container, Row, Col} from 'mdbreact';

function InputRadio(props) {
    return (
        <div className="jawaban">
            <input type="radio"  {...props} />
            <label htmlFor={props.id}>
                <span></span>
                {props.label}
            </label>
        </div>
    )
}
function inRange(min, max, value) {
    if(value < min) {
        return min;
    } else if (value > max) {
        return max;
    } else {
        return value;
    }
}
class MulaiUjian extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'pertanyaan': "Berpakah nilai 1 + 1 sama dengan sama dengan sama dengan sama dengan sama dengan sama dengan aaaa bbbb bbbbbb baafd fdsafsadf sdf fsdaf sdaf sadf sadf sdaf asdf sadf sadf asd? fsdf sadf asdf asdf sadf sadf asdf asd  fsdf asdf sadf asdf asd",
            current_soal: 1,
            max_soal: 40,
            answered: [],
        }
    }
    setCurrentSoal(i) {
        this.setState({current_soal: i});
    }
    setCurrentSoalRelatif(relatif) {
        let current_soal = this.state.current_soal + relatif;
        current_soal = inRange(1, this.state.max_soal, current_soal)
        this.setCurrentSoal(current_soal);
    }
    renderItem(len, active=1, answered=[]) {
        var items = [];
        var range_list = [...Array(len).keys()].map(i => i+1);
        range_list.forEach((i) => {
            let apn = "";
            let is_active = false;
            if(i == active) {
                is_active = true;
            }
            if(!is_active && answered.includes(i)) {
                apn = "green text-white z-depth-1";
            }
            items.push(
                <PageItem key={i} active={is_active} onClick={() => this.setCurrentSoal(i)}>
                    <PageLink className={"page-link "+apn}>
                        {i}
                    </PageLink>
                </PageItem>
            );
        });
        return items;
    }
    renderPagination() {
        return (
            <Pagination className="pg-blue flex-wrap text-white">
                {this.renderItem(40, this.state.current_soal, [1, 2, 9])}
            </Pagination>
        )
    }
    render() {
        return (
            <Container fluid={true} className="ujian-body">
                <Container className="pt-3">
                    <Row className="">
                        <Col md="10" className="mx-auto px-0 py-0">
                            {this.renderPagination()}
                        </Col>
                        <Col md="10" className="mx-auto border status rounded z-depth-2">
                            <span>Ulangan Harian Bahasa Indoensia</span>
                            <span className="float-right">02.00</span>
                        </Col>
                        <Col md="10" className="pt-5 mx-auto soal rounded grey lighten-3 text-dark text-left z-depth-2">
                            <p className="pertanyaan text-center" style={{fontSize: (30 - this.state.pertanyaan.length/15)} }>{this.state.pertanyaan}</p>
                            <form className="answer pl-5 pt-4">
                                <Col sm="12" className="mx-auto answer pl-5">
                                    <Row className="pl-5">
                                        <Col sm="6" className="mb-3">
                                            <InputRadio id="radio01" name="radio" label="Use our position utilities to place navbars in non-static positions. Choose from fixed to the top, fixed to the bottom,"/>
                                        </Col>
                                        <Col sm="6">
                                            <InputRadio id="radio02" name="radio" label="Jawabannya 20"/>
                                        </Col>
                                        <Col sm="6">
                                            <InputRadio id="radio03" name="radio" label="Jawabannya 30"/>
                                        </Col>
                                        <Col sm="6">
                                            <InputRadio id="radio04" name="radio" label="Jawabannya 40"/>
                                        </Col>
                                    </Row>
                                </Col>
                            </form>
                        </Col>
                        <div className="direction mx-auto my-3 text-center arrow">
                            <Button size="lg" color="info" onClick={() => this.setCurrentSoalRelatif(-1)}><Fa icon="arrow-circle-left"/> Prev</Button>
                            <Button size="lg" color="info" onClick={() => this.setCurrentSoalRelatif(1)}>Next <Fa icon="arrow-circle-right"/></Button>
                        </div>
                    </Row>
                </Container>
            </Container>
        );
    }
}

export default MulaiUjian;
