import React from 'react';

export default class Menu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            render: ''
        }
    }



    handleClick() {

    }


    render() {
        return (
            <>
                <div>
                    <h1>{this.props.name}</h1>
                    {this.props.children}
                </div>
            </>
        )
    }
}