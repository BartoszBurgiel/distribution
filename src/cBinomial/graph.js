import createGraph from './createGraph.js'

export default function cumulatedBinomialDistributionGraph(p) {

	p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
		let nVal = parseInt(props.nVal)
		let pVal = parseFloat(props.pVal)
		let kVal = parseInt(props.kVal)
		let alphaVal = parseFloat(props.alphaVal)
		let slider = props.slider

		// Draw only if valid input
		if (pVal > 0 && pVal < 1 && nVal > 0 && kVal < nVal && kVal >= 0 && nVal <= 151 && alphaVal > 0 && alphaVal < 1) {
			createGraph(nVal, pVal, kVal, alphaVal,p, slider)
		}
	}
}