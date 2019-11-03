import createGraph from './createGraph.js'


export default function binomialDistributionGraph(p) {

	p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
		let nVal = parseInt(props.nVal)
		let pVal = parseFloat(props.pVal);

		if (pVal > 0 && nVal > 0) {
			createGraph(nVal, pVal, p, false)
		}

		console.log(props)
	}
}