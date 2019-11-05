import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import MathFormula from './mathFormula';


export default class SketchOnly extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                <MathFormula eqType="cBinom" nVal={120} pVal={0.4} />
                <P5Wrapper sketch={this.props.sketch} nVal={120} pVal={0.4} kVal={30} slider={true} />
            </>
        )
    }
}

