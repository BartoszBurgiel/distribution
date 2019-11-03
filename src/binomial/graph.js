import createGraph from './createGraph.js'


export default function binomialDistributionGraph(p) {

	p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
		let nVal = parseInt(props.nVal)
		let pVal = parseFloat(props.pVal)
		let kVal = parseInt(props.kVal)

		// Draw only if valid input
		if (pVal > 0 && nVal > 0 && kVal < nVal && kVal >= 0) {
			createGraph(nVal, pVal, kVal, p, false)
		}

		console.log(props)
	}
}