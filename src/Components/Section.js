import React from 'react';

import Modal from '../Components/Modal';
import {NumberInput, LetterInput} from '../Components/Input';

class ContentSection extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var content = this.props.content;
        var contentList = content.map(function(i){
            return (
                <li className="w3-padding-16">
                    <span className="w3-large">
                        {i.heading}
                    </span>
                    <br />
                    <span>{i.content}</span>
                </li>
            );
        });
        return (
            <div>
                <p className="w3-opacity"><b>{this.props.title}</b></p>
                <ul className="w3-ul w3-card w3-white">
                    {contentList}
                </ul>
            </div>
        );
    }
}

class EncryptSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: '',
            plaintext: '',
            key: ''
        };
    }
    validatePlaintext(evt) {
        const plaintext = (evt.target.validity.valid) ? evt.target.value.toLowerCase() : this.state.plaintext;
        this.setState({ plaintext });
    }
    validateKey(evt) {
        const key = (evt.target.validity.valid) ? evt.target.value : this.state.key;
        this.setState({ key });
    }
    savePlaintext(p) {
        this.setState({plaintext: p});
    }
    saveKey(k) {
        this.setState({key: k});
    }
    render() {
        var msg_result = (
            <div>
                <p>Plaintext: {this.state.plaintext}</p>
                <p>Key: {this.state.key}</p>
                <p>Ciphertext: {this.state.result}</p>
            </div>
        );
        return (
            <div>
                <p className="w3-opacity"><b>Encrypt</b></p>
                <div className="w3-card w3-white">
                    <div className="w3-container">
                        <p>
                            <label>Plaintext</label>
                            <input className="w3-input" type="text" ref="input_plaintext" pattern="[a-zA-Z ]*" onInput={this.validatePlaintext.bind(this)} value={this.state.plaintext} />
                        </p>
                        <LetterInput title="Plaintext" onUpdate={this.savePlaintext.bind(this)} />
                        <NumberInput title="Key" onUpdate={this.saveKey.bind(this)} />
                        <p>
                            <label>Key</label>
                            <input className="w3-input" type="text" ref="input_key" pattern="[0-9]*" onInput={this.validateKey.bind(this)} value={this.state.key} />
                        </p>
                        <p>
                            <button className="w3-button w3-block w3-light-grey" onClick={this.props.action.bind(this)}>Encrypt</button>
                        </p>
                        <Modal ref="modal_result" title="Result" msg={msg_result} />
                    </div>
                </div>
            </div>
        );
    }
}

class DecryptSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: '',
            plaintext: '',
            key: ''
        };
    }
    validatePlaintext(evt) {
        const plaintext = (evt.target.validity.valid) ? evt.target.value.toUpperCase() : this.state.plaintext;
        this.setState({ plaintext });
    }
    validateKey(evt) {
        const key = (evt.target.validity.valid) ? evt.target.value : this.state.key;
        this.setState({ key });
    }
    render() {
        var msg_result = (
            <div>
                <p>Plaintext: {this.state.plaintext}</p>
                <p>Key: {this.state.key}</p>
                <p>Ciphertext: {this.state.result}</p>
            </div>
        );
        return (
            <div>
                <p className="w3-opacity"><b>Decrypt</b></p>
                <div className="w3-card w3-white">
                    <div className="w3-container">
                        <p>
                            <label>Ciphertext</label>
                            <input className="w3-input" type="text" ref="input_plaintext" pattern="[a-zA-Z ]*" onInput={this.validatePlaintext.bind(this)} value={this.state.plaintext} />
                        </p>
                        <p>
                            <label>Key</label>
                            <input className="w3-input" type="text" ref="input_key" pattern="[0-9]*" onInput={this.validateKey.bind(this)} value={this.state.key} />
                        </p>
                        <p>
                            <button className="w3-button w3-block w3-light-grey" onClick={this.props.action.bind(this)}>Decrypt</button>
                        </p>
                        <Modal ref="modal_result" title="Result" msg={msg_result} />
                    </div>
                </div>
            </div>
        );
    }
}

export {ContentSection, EncryptSection, DecryptSection};