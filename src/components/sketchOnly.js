import React from 'react';
import P5Wrapper from 'react-p5-wrapper';


export default class SketchOnly extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return <P5Wrapper sketch={this.props.sketch} nVal={120} pVal={0.4} kVal={30} slider={true} />
    }
}

