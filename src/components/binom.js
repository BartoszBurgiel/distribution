import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import binomialDistributionGraph from '../binomial/graph.js';

export default class BinomialDistribution extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h1>Binomialverteilung</h1>
                <P5Wrapper sketch={binomialDistributionGraph}></P5Wrapper>
            </div>
        )
    }
}