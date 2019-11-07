import React, { useState } from 'react';
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
			default: 
			resetAllStateVariables()
		}
	}

	return (
		<>

			<h1>Stochastik - Rechner</h1>

			{pgNormal && <SketchOnly sketch={normalDistributionGraph} nVal={120} kVal={70} pVal={0.4} />}
			{pgBinom && <SketchOnly sketch={binomialDistributionGraph} nVal={120} kVal={70} pVal={0.4} />}
			{pgcBinom && <SketchOnly sketch={cumulatedBinomialDistributionGraph} nVal={120} kVal={70} pVal={0.4} />}

			{formBinom && <FromToCalculate sketch={binomialDistributionGraph} eqType="binom" nVal={120} kVal={70} pVal={0.4} />}
			{formcBinom && <FromToCalculate sketch={cumulatedBinomialDistributionGraph} eqType="cBinom" nVal={120} kVal={70} pVal={0.4} />}
			{formNormal && <FromToCalculate sketch={normalDistributionGraph} eqType="normal" nVal={120} kVal={70} pVal={0.4} />}

			<Menu>
				<Menu name="Playground">
					<MenuElement onClick={handleOnclick.bind(this, 'pgNormal')}> Normalverteilung </MenuElement>
					<MenuElement onClick={handleOnclick.bind(this, 'pgBinom')}> Binomialverteilung </MenuElement>
					<MenuElement onClick={handleOnclick.bind(this, 'pgCBinom')}> kumulierte Binomialverteilung </MenuElement>
				</Menu>

				<Menu name="Berechnen">
					<MenuElement onClick={handleOnclick.bind(this, 'formNormal')}> Normalverteilung </MenuElement>
					<MenuElement onClick={handleOnclick.bind(this, 'formBinom')}> Binomialverteilung </MenuElement>
					<MenuElement onClick={handleOnclick.bind(this, 'formCBinom')}> kumulierte Binomialverteilung </MenuElement>
				</Menu>
			</Menu>
		</>
	);
}

export default App;