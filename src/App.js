import React from 'react';
import './App.css';
import FromToCalculate from './components/formToCalculate.js';
import binomialDistributionGraph from './binomial/graph.js'
import normalDistributionGraph from './normal/graph.js'

const App = () => {
	return (
		<>
			<FromToCalculate graph={binomialDistributionGraph} name="Binomialverteilung"></FromToCalculate>
			<FromToCalculate graph={normalDistributionGraph} name="Normalverteilung"></FromToCalculate>
		</>
	);
}

export default App;