import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import distribution from '../math/distribution';
import React from 'react';


export default class MathFormula extends React.Component {

    constructor(props) {
        super(props)
    }

    assembleFormula = () => {
        // Create variables to clean up the templates
        const n = this.props.nVal
        const p = this.props.pVal
        const k = this.props.kVal
        const sD = this.props.sDVal
        const eV = this.props.eVVal

        // Check props
        switch (this.props.eqType) {
            case 'cBinom':
                return <BlockMath math={`P(X \\le K) = \\sum_{k=0}^{${n}} \\Big[\\binom{${n}}{k} * {${p}}^{k} * (1-{${p}})^{${n}-k}\\Big]`} />
            case 'binom':
                return <BlockMath math={`P(X = ${k}) = \\binom{${n}}{${k}} * {${p}}^{${k}} * (1-{${p}})^{${n}-${k}}`} />

        }
    }

    render() {
        return this.assembleFormula()
    }
}