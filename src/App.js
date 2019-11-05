import React, { useState } from 'react';
import './App.css';
import P5Wrapper from 'react-p5-wrapper'
import SketchOnly from './components/sketchOnly.js';
import FromToCalculate from './components/formToCalculate.js';
import binomialDistributionGraph from './binomial/graph.js'
import normalDistributionGraph from './normal/graph.js'
import cumulatedBinomialDistributionGraph from './cBinomial/graph.js'
import Menu from './components/Menu.js'
import MenuElement from './components/MenuElement';

const App = () => {

	let [graph, setGraph] = useState('')

	const handleOnclick = (compName) => {
		console.log(compName)
		setGraph(compName)
	}

	const showGraph = () => {
		switch(graph) {
			case 'pgNormal': return <SketchOnly sketch={normalDistributionGraph} />
			case 'pgBinom': return <SketchOnly sketch={binomialDistributionGraph} />
			case 'pgCBinom': return <SketchOnly sketch={cumulatedBinomialDistributionGraph} />
			
			case 'formNormal': return <SketchOnly sketch={cumulatedBinomialDistributionGraph} />
			case 'formBinom': return <SketchOnly sketch={cumulatedBinomialDistributionGraph} />
			case 'formCBinom': return <SketchOnly sketch={cumulatedBinomialDistributionGraph} />
		}
	}

	return (
		<>
			<Menu name="Stochastik - Rechner">
				<Menu name="Playground">
					<MenuElement onClick={handleOnclick.bind(this, 'pgNormal')}> Normalverteilung </MenuElement>
					<MenuElement onClick={handleOnclick.bind(this, 'pgBinom')}> Binomialverteilung </MenuElement>
				<MenuElement onClick={handleOnclick.bind(this, 'pgCBinom')}> kumulierte Binomialverteilung </MenuElement>
				</Menu>

				<Menu name="Berechnen">
					<MenuElement> Normalverteilung </MenuElement>
					<MenuElement> Binomialverteilung </MenuElement>
					<MenuElement> kumulierte Binomialverteilung </MenuElement>
				</Menu>
			</Menu>


			{showGraph()}
		</>
	);
}

export default App;