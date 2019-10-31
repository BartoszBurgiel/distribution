import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import cumulatedBinomialDistributionGraph from '../cBinomial/graph.js';

export default class CumulatedBinomialDistribution extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h1>kumulierte Binomialverteilung</h1>
                <P5Wrapper sketch={cumulatedBinomialDistributionGraph}></P5Wrapper>
            </div>
        )
    }
}