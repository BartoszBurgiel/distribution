import {BlockMath} from 'react-katex';
import 'katex/dist/katex.min.css';
import distribution from '../math/distribution';
import React from 'react';


export default class MathFormula extends React.Component {

    constructor(props) {
        super(props)
    }

    assembleFormula = () => {

        // Check props
        switch (this.props.eqType) {
            case 'cBinom':
                // Create variables to clean up the templates
                const n = this.props.nVal
                const p = this.props.pVal

                return <BlockMath math={`\\sum_{k=0}^{${n}} = \\Big[\\binom{${n}}{k} * {${p}}^{k} * (1-{${p}})^{${n}-k}\\Big]`} />
        }
    } 

    render() {
        return this.assembleFormula()
    }
}