import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import React from 'react';
import Distribution from '../math/distribution';


export default class MathFormula extends React.Component {
    constructor(props) {
        super(props)
    }
    
    assembleFormula = () => {

        // Create variables to clean up the templates
        let n = this.props.nVal
        let p = this.props.pVal
        let k = this.props.kVal

        let v = Math.round(n * p * (1 - p) * 10 ) / 10
        let eV = Math.round(n * p * 10 ) / 10


        // Check props
        switch (this.props.eqType) {
            case 'cBinom':
                return <BlockMath math={`P(X \\le K) = \\sum_{k=0}^{${n}} \\Big[\\binom{${n}}{k} * {${p}}^{k} * (1-{${p}})^{${n}-k}\\Big]`} />
            case 'binom':
                return <BlockMath math={`P(X = ${k}) = \\binom{${n}}{${k}} * {${p}}^{${k}} * (1-{${p}})^{${n}-${k}}`} />
            case 'normal':
                return <BlockMath math={`P(x) = \\frac{1}{\\sqrt{2\\pi ${v}}}e^{\\frac{-(x-${eV})}{2${v}}}`} />
        }
    }

    render() {
        return this.assembleFormula()
    }
}