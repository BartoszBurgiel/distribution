import createGraph from './createGraph.js'


export default function binomialDistributionGraph(p) {

	p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
		let nVal = parseInt(props.nVal)
		let pVal = parseFloat(props.pVal);

		createGraph(nVal, pVal, p)

		console.log(props)
	}
}