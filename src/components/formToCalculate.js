import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import binomialDistributionGraph from '../binomial/graph.js';

export default class FromToCalculate extends React.Component {

    constructor() {
        super()
        this.state = {
            nVal: 50,
            kVal: 20, 
            pVal: 0.5,
            graph: "normalDistributionGraph"
        }
    }

    render() {
        return (
            <div>
                <h1>Hey there</h1>
                <form>
                    <select
                        onChange={e => {
                            this.setState({
                                graph: e.target.value
                            })
                        }}
                    >
                        <option value="normalDistributionGraph">Normalverteilung</option>
                        <option value="binomialDistributionGraph">Binomialverteilung</option>
                        <option value="cumulatedBinomialDistributionGraph">kumulierte Binomialverteilung</option>
                    </select>
                    <br />

                    <label>N</label>
                    <input
                        type="number"
                        min="1"
                        onChange={e => {
                            this.setState({
                                nVal: e.target.value
                            })
                        }}
                    />
                    <br />

                    <label>K</label>
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
                    />
                    <br />

                    <label>P</label>
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
                    />

                </form>

                <p> N: {this.state.nVal}</p>
                <p> k: {this.state.kVal}</p>
                <p> p: {this.state.pVal}</p>
                <p> graph: {this.state.graph}</p>



                <P5Wrapper sketch={binomialDistributionGraph}></P5Wrapper>
            </div>
        )
    }
}


