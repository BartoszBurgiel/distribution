import React from 'react';
import './App.css';
import FromToCalculate from './components/formToCalculate.js';
import binomialDistributionGraph from './binomial/graph.js'

const App = () => {
	return (
		<>
			<FromToCalculate graph={binomialDistributionGraph} name="Binomialverteilung"></FromToCalculate>
		</>
	);
}

export default App;