import React from 'react';

export default class MenuElement extends React.Component {
    render() {
        return (
            <button onClick={this.props.onClick}>{this.props.children}</button>
        )
    }

}