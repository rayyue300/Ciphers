import React from 'react';

class Modal extends React.Component {
    constructor(props) {
        super(props);
        
    }
    
    render() {
        return (
            <div ref="modal" className="w3-modal">
                <div className="w3-modal-content w3-card-4 w3-animate-zoom">
                <header className="w3-container w3-cyan w3-text-white"> 
                    <span onClick={()=>{this.refs.modal.style.display='none'}} 
                    className="w3-button w3-display-topright">&times;</span>
                    <h2>{this.props.title}</h2>
                </header>
                <div className="w3-container">
                    {this.props.msg}
                </div>
                </div>
            </div>
        );
    }
}

export default Modal;