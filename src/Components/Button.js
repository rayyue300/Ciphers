import React from 'react';

class Button extends React.Component {
    constructor(props) {
        super(props);
        
    }
    
    render() {
        return (
            <p>
                <button className="w3-button w3-block w3-light-grey" onClick={this.props.onClick.bind(this)}>{this.props.text}</button>
            </p>
        );
    }
}

export default Button;