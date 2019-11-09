import React from 'react';
import P5Wrapper from 'react-p5-wrapper';

export default class SketchOnly extends React.Component {
    render() {
        return (
            <>
                <P5Wrapper sketch={this.props.sketch}  nVal={this.props.nVal} pVal={this.props.pVal} kVal={this.props.kVal} alphaVal={this.props.alphaVal} slider={true} />
            </>
        )
    }
}

