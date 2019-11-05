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

	let [pgNormal, setPgNormal] = useState(Boolean)
	let [pgBinom, setPgBinom] = useState(Boolean)
	let [pgcBinom, setPgcBinom] = useState(Boolean)

	let [formNormal, setFormNormal] = useState(Boolean)
	let [formBinom, setFormBinom] = useState(Boolean)
	let [formcBinom, setFormcBinom] = useState(Boolean)

	const resetAllStateVariables = () => {
		setPgBinom(false)
		setPgNormal(false)
		setPgcBinom(false)

		setFormBinom(false)
		setFormNormal(false)
		setFormcBinom(false)
	}


	const handleOnclick = (compName) => {
		console.log(compName)

		switch (compName) {
			case 'pgNormal':
				resetAllStateVariables()
				setPgNormal(true)
				break
			case 'pgBinom':
				resetAllStateVariables()
				setPgBinom(true)
				break
			case 'pgCBinom':
				resetAllStateVariables()
				setPgcBinom(true)
				break

			case 'formNormal':
				resetAllStateVariables()
				setFormNormal(true)
				break
			case 'formBinom':
				resetAllStateVariables()
				setFormBinom(true)
				break
			case 'formCBinom':
				resetAllStateVariables()
				setFormcBinom(true)
				break
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


			{pgNormal && <SketchOnly sketch={normalDistributionGraph} eqType="normal" />}
			{pgBinom && <SketchOnly sketch={binomialDistributionGraph} eqType="binom" />}
			{pgcBinom && <SketchOnly sketch={cumulatedBinomialDistributionGraph} eqType="cBinom"/>}
		</>
	);
}

export default App;