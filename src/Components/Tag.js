import React from 'react';

class Tag extends React.Component {
    constructor(props) {
        super(props);
        
    }
    
    render() {
        return (
            <span className="w3-margin-right w3-margin-bottom w3-tag w3-padding w3-round-large w3-blue-grey w3-text-white w3-center w3-small">
                {this.props.text}
            </span>
        );
    }
}

export default Tag;