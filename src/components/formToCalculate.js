import React from 'react';
import P5Wrapper from 'react-p5-wrapper';


export default class FromToCalculate extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            nVal: 100,
            kVal: 50,
            pVal: 0.5,
        }
    }

    render() {
        return (
            <div>
                <h1>{this.props.name}</h1>
                <form>
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
                <P5Wrapper sketch={this.props.sketch} nVal={120} pVal={0.4} kVal={30} slider={false} />
            </div>
            

        )
    }
}


