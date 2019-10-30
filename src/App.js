import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import binomialDistributionGraph from './binomial/graph';
import './App.css';

const App = () => {
	return (
		<>
			<h1>Binomialverteilung</h1>
			<P5Wrapper sketch={binomialDistributionGraph}></P5Wrapper>
		</>
	);
}

export default App;