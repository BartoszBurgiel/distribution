import React from 'react';
import BinomialDistribution from './components/binom';
import './App.css';
import NormalDistribution from './components/normal';

const App = () => {
	return (
		<>
			<BinomialDistribution></BinomialDistribution>
			<br />
			<NormalDistribution></NormalDistribution>
		</>
	);
}

export default App;