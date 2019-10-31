import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import normalDistributionGraph from '../normal/graph.js';

export default class NormalDistribution extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h1>Normalverteilung</h1>
                <P5Wrapper sketch={normalDistributionGraph}></P5Wrapper>
            </div>
        )
    }
}