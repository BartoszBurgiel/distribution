import React from 'react';

export default class MenuElement extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ul onClick={this.props.handler}>
                <p>{this.props.children}</p>
            </ul>
        )
    }

}