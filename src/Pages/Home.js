import React from 'react';

import Header from '../Header'
import avatar from '../avatar.png';

import Card from '../Components/Card';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.welcome_close = this.welcome_close.bind(this);
    }
    welcome_close() {
        this.refs.welcome.style.display = 'none';
    }
    render() {
        return (
            <div className="w3-container w3-content w3-section">
                <Card title="Welcome" content={
                    <p>Choose a cipher from menu to start. :) </p>
                } />
            </div>
        );
    }
}

export default Home;