import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import '../assets/style/mupad.css';

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
            case 'normal':
                functionName = "P"
                command = `${functionName} := stats::normalPF(${this.props.muVal},${this.props.varVal});\n${functionName}(${this.props.kVal}); \n`
                break
            default: 
                break
        }

        if (this.props.eqType !== 'normal') {
            command += `\ndaten := [${functionName}(k)$k=0..${this.props.nVal}];\nplot(plot::Bars2d(daten));`
        } else {
            command += `\nplotfunc2d(${functionName}(x), x=0..${this.props.nVal}, YRange=0..1);`
        }

        return command
    }

    render () {
        return ( 
            <>
                <h2>Mupad - Befehl</h2>
                <div>
                    {this.setupCommand()}
                    <CopyToClipboard text={this.setupCommand()}>
                        <button>Kopieren</button>
                    </CopyToClipboard>
                </div> 
            </>
        )
    }

}