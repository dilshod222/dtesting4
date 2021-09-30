import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Roll} from "react-awesome-reveal"


class SolveQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: ["I have to understand this lesson",
                "I read a book",
                "bread and milk",
                "I have got a family"],
            answer1: ['Men,bu,darsni,tushunishim,kerak',
                "men,kitob,o'qidim",
                "non,va,sut",
                "meni,oilam,bor"],
            answer2: ['Men,tushunishim,kerak,bu,darsni', "kitob,o'qidim", "", ""],
            answer3: ["", "kitob,o'qidim,men", "", ""],
            options:
                [["Siz", 'Men', "tushunishim", "nima", "kerak", "hop", "bu", "do'stim", "darsni"],
                    ["men", "siz", "u", "kitob", "daftar", "o'qidim", "o'qidi"],
                    ["non", "va", "qoshiq", "qatiq", "qaymoq", "sut"],
                    ["meni", "seni", "aka", "bor", "hovli", "ko'cha", "oilam"]

                ],
            user_answer: [[], [], [], []],
            selected: 0,
            disabled: true
        }


    }


    render() {


        const next = () => {
            document.getElementById('progress').style.width = ((this.state.selected + 1) * 100) / (this.state.questions.length) + "%"


            if (this.state.selected + 1 === this.state.questions.length) {
                document.getElementById('true_answer').innerHTML = ""
                document.getElementById('nextButton').classList.add('d-none')
                document.getElementById('checking').classList.remove('bg-warning')
                document.getElementById('checking').classList.remove('bg-primary')
                document.getElementById('nextButton').classList.add('d-none')
                document.getElementById('checking').innerHTML =
                    "<div><h3>Uzuraa Savollarimiz tugab qoldida</h3></div>"

            } else {
                let a = this.state.selected
                this.setState({selected: a + 1})
                this.setState({disabled: true})
                document.getElementById('skip').classList.remove('d-none')
                document.getElementById('true_answer').innerHTML = ""
                document.getElementById('checking').classList.remove('bg-warning')
                document.getElementById('checking').classList.remove('bg-primary')
                document.getElementById('checkButton').classList.remove('d-none')
                document.getElementById('nextButton').classList.add('d-none')
            }

        }


        const add_user_options = (item, index) => {
            let arr = this.state.user_answer;
            arr[this.state.selected].push(item);
            this.setState({user_answer: arr})
            this.setState({disabled: false});
            let arr2 = this.state.options
            arr2[this.state.selected].splice(index, 1)
            this.setState({options: arr2})
        }

        const edit_user_answer = (item, index) => {
            this.state.user_answer[this.state.selected].splice(index, 1)
            this.setState({user_answer: this.state.user_answer})
            this.state.options[this.state.selected].push(item)
            this.setState({options: this.state.options})
            if (this.state.user_answer[this.state.selected].length === 0) {
                this.setState({disabled: true})
            }


        }
        const check = () => {

            if (((this.state.answer1[this.state.selected] === this.state.user_answer[this.state.selected].toString()) ||
                (this.state.answer2[this.state.selected] === this.state.user_answer[this.state.selected].toString()) ||
                (this.state.answer3[this.state.selected] === this.state.user_answer[this.state.selected].toString())) &&
                (this.state.user_answer[this.state.selected].length !== 0)) {

                document.getElementById('checking').classList.add('bg-primary')
                document.getElementById('checkButton').classList.add('d-none')
                document.getElementById('nextButton').classList.remove('d-none')
                document.getElementById('nextButton').onclick = function () {
                    next()

                }
                document.getElementById('skip').classList.add('d-none')
                document.getElementById('true_answer').innerHTML = this.state.answer1[this.state.selected].replace(/,/g, ' ')


            } else {
                document.getElementById('checking').classList.add('bg-warning')
                document.getElementById('checkButton').classList.add('d-none')
                document.getElementById('nextButton').classList.remove('d-none')
                document.getElementById('nextButton').onclick = function () {
                    next()
                }

                document.getElementById('skip').classList.add('d-none')
                document.getElementById('true_answer').innerHTML = this.state.answer1[this.state.selected].replace(/,/g, ' ')


            }

        }

        const skip = () => {
            check()

        }


        return (
            <div>
                <div className="container">
                    <div className="row mt-3">
                        <div className="col-8 offset-2">
                            <div className="progress">
                                <div className="progress-bar" id="progress"></div>
                            </div>
                            <div className="mt-5">
                                <h1>Write this in Uzbek </h1>
                                <div className="d-flex justify-content-center align-items-center">
                                    <h3 className="m-5">{this.state.questions[this.state.selected]}</h3>
                                </div>
                            </div>


                            <div className="border-top border-bottom mt-3 d-flex align-items-center"
                                 style={{"height": "100px"}}>
                                <Roll>
                                {this.state.user_answer[this.state.selected].map((item, index) =>

                                        <button type="button" className="btn m-2 btn-outline-success"
                                                onClick={() => edit_user_answer(item, index)}
                                                key={index}> {item} </button>

                                )}
                                </Roll>
                            </div>

                            <div className="options d-flex justify-content-center mt-3">

                                {this.state.options[this.state.selected].map((item, index) =>


                                        <button type="button" className="option btn m-2 btn-outline-primary "
                                                onClick={() => add_user_options(item, index)} >
                                            {item}
                                        </button>

                                )}


                            </div>

                            <div className="checking mt-5 d-flex align-items-center justify-content-between"
                                 id="checking">
                                <button type="button" className="btn btn-outline-danger m-5" id="skip"
                                        onClick={() => skip()}>SKIP
                                </button>
                                <h6 id="true_answer" className="true_answer text-white m-5"></h6>
                                <button type="button" className="btn btn-success m-5" disabled={this.state.disabled}
                                        onClick={() => check()}
                                        id="checkButton">Check
                                </button>
                                <button type="button" className="btn d-none btn-success m-5" id="nextButton">Next
                                </button>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default SolveQuestion;