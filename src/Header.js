import React from 'react';

import Clock from './Components/Clock';
import Modal from './Components/Modal';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.menu_open = this.menu_open.bind(this);
        this.pageName = this.props.pageName;
    }

    menu_open() {
        this.props.callbackParent(true);
    }
    search() {
        this.refs.modal_about.refs.modal.style.display = 'block';
    }
    
    render() {
        return (
            <div>
                <div className="w3-container w3-padding-small w3-theme-d3">
                    <div className="w3-right">
                        <i className="fa fa-volume-up"></i>&nbsp;
                        <i className="fa fa-wifi"></i>&nbsp;
                        <i className="fa fa-battery-2"></i>&nbsp;
                        <Clock />
                    </div>
                </div>

                <div className="w3-bar w3-theme w3-large">
                    <a className="w3-bar-item w3-button w3-hide-large" onClick={this.menu_open}><i className="fa fa-bars"></i></a>
                    <span className="w3-bar-item">{this.pageName}</span>
                    <a className="w3-bar-item w3-button w3-right" onClick={this.search.bind(this)}><i className="fa fa-search"></i></a>
                </div>

                <Modal ref="modal_about" title="About" msg={
                    <div>
                        <h3>Are you looking for the lovely developer?</h3>
                        <p>Developed by Rayyue300</p>
                        <p>Information from COMP3334</p>
                        <p>Powered by React.js and W3.css</p>
                    </div>
                } />
            </div>
        );
    }
}

export default Header;