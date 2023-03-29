import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./App.css";
import cmc from "./bloodmeridian.jpeg";
import { CheckAnswer } from "./form-components/CheckAnswer";
import { GiveAttempts } from "./form-components/GiveAttempts";
import { EditMode } from "./form-components/EditMode";
import { MultipleChoiceQuestion } from "./form-components/MultipleChoiceQuestion";
import { ChangeColor } from "./form-components/ChangeColor";
import { CycleHoliday } from "./components/CycleHoliday";
import { RevealAnswer } from "./components/RevealAnswer";
import { TwoDice } from "./components/TwoDice";
import { ChangeType } from "./components/ChangeType";
import { Counter } from "./components/Counter";
import { ColoredBox } from "./bad-components/ColoredBox";
import { DoubleHalf } from "./bad-components/DoubleHalf";
import { ShoveBox } from "./bad-components/ShoveBox";

function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">My CISC275 Webpage</header>
            <h1>by Jonathan Ma</h1>
            <img className="Image" src={cmc} alt="Blood Meridian Fan Art" />
            <Container>
                <Row>
                    <Col>
                        <div className="Book-list">
                            My favorite books which I&apos;ve read this year:
                            <ol>
                                <li>
                                    <i>Blood Meridian</i>, Cormac McCarthy
                                </li>
                                <li>
                                    <i>Dune Messiah</i>, Frank Herbert
                                </li>
                                <li>
                                    <i>Neuromancer</i>, William Gibson
                                </li>
                                <li>
                                    <i>A Game of Thrones</i>, George R.R. Martin
                                </li>
                                <li>
                                    <i>
                                        For Whom the Bell Tolls, Ernest
                                        Hemingway
                                    </i>
                                </li>
                            </ol>
                        </div>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
            <ChangeType></ChangeType>
            <ColoredBox></ColoredBox>
            <DoubleHalf></DoubleHalf>
            <ShoveBox></ShoveBox>
            <Counter></Counter>
            <CycleHoliday></CycleHoliday>
            <RevealAnswer></RevealAnswer>
            <TwoDice></TwoDice>
            <hr></hr>
            <CheckAnswer expectedAnswer="42"></CheckAnswer>
            <hr></hr>
            <GiveAttempts></GiveAttempts>
            <hr></hr>
            <EditMode></EditMode>
            <hr></hr>
            <ChangeColor></ChangeColor>
            <hr></hr>
            <MultipleChoiceQuestion
                options={["a", "b", "c"]}
                expectedAnswer="b"
            ></MultipleChoiceQuestion>
        </div>
    );
}

export default App;
