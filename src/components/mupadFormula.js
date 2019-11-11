import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import '../assets/style/mupad.css';

export default class MupadFormula extends React.Component {

    // get function name based on eqType prop
    getFunctionName = () => {
        switch(this.props.eqType) {
            case 'binom':
                return "P"
            case 'cBinom':
                return "F"
            case 'normal':
                return "P"
            default:
                return "F"    
        }
    }

    // Define a function based on eqType
    defineFunction = () => {
        
        // determine which function
        switch (this.props.eqType) {
            case 'binom':

                return (`${this.getFunctionName()} := stats::binomialPF(${this.props.nVal},${this.props.pVal});\n`)
            case 'cBinom':

                return(`${this.getFunctionName()} := stats::binomialCDF(${this.props.nVal},${this.props.pVal});\n`)
            case 'normal':

                return(`${this.getFunctionName()} := stats::normalPF(${this.props.muVal},${this.props.varVal});\n`)
            default: 
                break
        }
    }

    // Call defined function
    callFunction = () => {
        return(`${this.getFunctionName()}(${this.props.kVal});\n`)
    }

    // Assemble function generating the data for the function
    assembleData = () => {
        if (this.props.eqType !== 'normal') {
            return(`daten := [${this.getFunctionName()}(k)$k=0..${this.props.nVal}];\n`)
        } else {
            return ("")
        }
    }

    // Assemble plotting function
    plotFunction = () => {
        if (this.props.eqType !== 'normal') {
            return(`plot(plot::Bars2d(daten));\n`)
        } else {
            return(`plotfunc2d(${this.getFunctionName()}(x), x=0..${this.props.nVal}, YRange=0..1);\n`)
        }
    }


    setupCommand = () => {
        let command = ""

        command += this.defineFunction()
        command += this.callFunction()
        command += this.assembleData()
        command += this.plotFunction()

        return command
    }

    render () {
        return ( 
            <>
                <h2>Mupad - Befehl</h2>
                <div>
                    <code>
                        {this.defineFunction()}
                        <br />
                        {this.callFunction()}
                        <br />
                        {this.assembleData()}
                        <br />
                        {this.plotFunction()}
                        <br />   
                    </code>
                    <CopyToClipboard text={this.setupCommand()}>
                        <button>Kopieren</button>
                    </CopyToClipboard>
                </div> 
            </>
        )
    }

}