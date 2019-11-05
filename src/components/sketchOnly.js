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
                <MathFormula eqType={this.props.eqType} nVal={this.props.nVal} pVal={this.props.pVal} kVal={this.props.kVal}/>
                <P5Wrapper sketch={this.props.sketch}  nVal={this.props.nVal} pVal={this.props.pVal} kVal={this.props.kVal} slider={true} />
            </>
        )
    }
}

