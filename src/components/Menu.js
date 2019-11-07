import React from 'react';
import "../assets/style/menu.css"

export default class Menu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            render: ''
        }
    }

    render() {
        return (
            <>
                <div className="container column">
                    <h1>{this.props.name}</h1>
                    <div className="container row">
                        {this.props.children}
                    </div>
                </div>
            </>
        )
    }
}