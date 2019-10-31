import React from 'react';
import './App.css';
import BinomialDistribution from './components/binom';
import NormalDistribution from './components/normal';
import CumulatedBinomialDistribution from './components/cBinom';

const App = () => {
	return (
		<>
			<BinomialDistribution></BinomialDistribution>
			<NormalDistribution></NormalDistribution>
			<CumulatedBinomialDistribution></CumulatedBinomialDistribution>
		</>
	);
}

export default App;