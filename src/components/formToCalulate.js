import React from 'react';

export default class FromToCalculate extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            nVal: 1,
            pVal: 0,
            kVal: 0, 
            graph: ""
        }
    }

    render() {
        return (
            <>
                <h1>Hey there</h1>
                <form>
                    <select 
                        onChange={e => {
                            this.setState({
                                graph: e.target.value
                            })
                        }}
                    >
                        <option>Normalverteilung</option>
                        <option>Binomialverteilung</option>
                        <option>kumulierte Binomialverteilung</option>
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
                        name="pVal"
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
            </>
        )
    }
}