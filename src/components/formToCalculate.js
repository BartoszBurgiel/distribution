import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import MathFormula from './mathFormula.js';
import '../assets/style/form.css';


export default class FromToCalculate extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            nVal: 100,
            kVal: 50,
            pVal: 0.5,
            alphaVal: 0.05
        }
    }

    render() {
        return (
            <>
            <div className="main-funciton-display">
                <div className="container column">
                    <MathFormula eqType={this.props.eqType} nVal={this.state.nVal} pVal={this.state.pVal} kVal={this.state.kVal} />
                    <P5Wrapper sketch={this.props.sketch} nVal={this.state.nVal} pVal={this.state.pVal} kVal={this.state.kVal} alphaVal={this.state.alphaVal} slider={false} />
                </div>

                <div className="container row">
                    <div className="container-element">
                            <label>n: </label>
                            <input
                                type="number"
                                min="1"
                                onChange={e => {
                                    this.setState({
                                        nVal: e.target.value
                                    })
                                }}
                                placeholder={this.state.nVal}
                            />
                            </div>
                            <div className="container-element">
        
                            <label>k: </label>
                            <input
                                type="number"
                                name="kVal"
                                min="0"
                                max={this.state.nVal - 1}
                                onChange={e => {
                                    this.setState({
                                        kVal: e.target.value
                                    })
                                }}
                                placeholder={this.state.kVal}
                            />
                            </div>
                            <div className="container-element">

                            <label>p: </label>
                            <input
                                type="number"
                                step="0.01"
                                name="pVal"
                                min="0.01"
                                max="0.99"
                                onChange={e => {
                                    this.setState({
                                        pVal: e.target.value
                                    })
                                }}
                                placeholder={this.state.pVal}
                            />
                            </div>

                            {this.props.eqType === "cBinom" &&   
                                <div className="container-element">
                                    <label>α: </label>
                                    <input
                                        type="number"
                                        step="0.001"
                                        name="pVal"
                                        min="0.01"
                                        max="0.99"
                                        onChange={e => {
                                            this.setState({
                                                alphaVal: e.target.value
                                            })
                                        }}
                                        placeholder={this.state.alphaVal}
                                    />
                                </div>
                            }
                        </div>
                </div>
            </>
        )
    }
}


