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
                <div>
                    <div className="container row middle">
                        <h1 className="menu-header">{this.props.name}</h1>
                    </div>
                    <div className="container row">
                        {this.props.children}
                    </div>
                </div>
            </>
        )
    }
}