import React from 'react';
import './App.css';
import BinomialDistribution from './components/binom';
import NormalDistribution from './components/normal';
import CumulatedBinomialDistribution from './components/cBinom';
import FromToCalculate from './components/formToCalulate';

const App = () => {
	return (
		<>
			<FromToCalculate></FromToCalculate>
		</>
	);
}

export default App;