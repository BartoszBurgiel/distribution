import React from 'react';

export default class MupadFormula extends React.Component {

    setupCommand = () => {
        let command = ""
        let functionName = ""

        // determine which function
        switch (this.props.eqType) {
            case 'binom':
                functionName = "P"
                command = `${functionName} := stats::binomialPF(${this.props.nVal},${this.props.pVal});\n${functionName}(${this.props.kVal}); \n`
                break
            case 'cBinom':
                functionName = "F"
                command = `${functionName} := stats::binomialCDF(${this.props.nVal},${this.props.pVal});\n${functionName}(${this.props.kVal}); \n`
                break
            default: 
                break
        }

        if (this.props.eqType !== 'normal') {
            command += `\ndaten := [${functionName}(k)$k=0..${this.props.nVal}];\nplot(plot::Bars2d(daten));`
        }

        return command
    }

    render () {
        return ( 
            <>
                <h2>Mupad - Befehl</h2>
                <textarea defaultValue={this.setupCommand()}></textarea>
            </>
        )
    }

}