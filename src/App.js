import React from 'react';
import './App.css';
import FromToCalculate from './components/formToCalculate.js';
import binomialDistributionGraph from './binomial/graph.js'
import normalDistributionGraph from './normal/graph.js'
import cumulatedBinomialDistributionGraph from './cBinomial/graph.js'

const App = () => {
	return (
		<>
			<FromToCalculate graph={binomialDistributionGraph} name="Binomialverteilung"></FromToCalculate>
			<FromToCalculate graph={normalDistributionGraph} name="Normalverteilung"></FromToCalculate>
			<FromToCalculate graph={cumulatedBinomialDistributionGraph} name="kumulierte Binomialverteilung"></FromToCalculate>
		</>
	);
}

export default App;