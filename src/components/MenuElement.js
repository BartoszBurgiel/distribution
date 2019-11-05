import React from 'react';

export default class MenuElement extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <button onClick={this.props.onClick}>{this.props.children}</button>
        )
    }

}