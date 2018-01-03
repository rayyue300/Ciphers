import React from 'react';

class NumberInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: ''
        };
    }
    
    
    validateKey(evt) {
        const key = (evt.target.validity.valid) ? evt.target.value : this.state.key;
        this.setState({ key });
        this.props.onUpdate(key);
    }

    render() {
        if (this.props.binary) {
            return (
                <p>
                    <label>{this.props.title}</label>
                    <input className="w3-input" type="text" ref="input_key" pattern="[01]*" onInput={this.validateKey.bind(this)} value={this.state.key} />
                </p>
            );
        } else {
            return (
                <p>
                    <label>{this.props.title}</label>
                    <input className="w3-input" type="text" ref="input_key" pattern="[0-9]*" onInput={this.validateKey.bind(this)} value={this.state.key} />
                </p>
            );
        }
    }
}
NumberInput.defaultProps = {
    title: 'Input:'
}
class LetterInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            plaintext: ''
        };
    }
    
    validatePlaintext(evt) {
        if (this.props.uppercase) {
            var plaintext = (evt.target.validity.valid) ? evt.target.value.toUpperCase() : this.state.plaintext;
        } else {
            var plaintext = (evt.target.validity.valid) ? evt.target.value.toLowerCase() : this.state.plaintext;
        }
        this.setState({ plaintext });
        this.props.onUpdate(plaintext);
    }

    render() {
        if (this.props.nospace) {
            return (
                <p>
                    <label>{this.props.title}</label>
                    <input className="w3-input" type="text" ref="input_plaintext" pattern="[a-zA-Z]*" onInput={this.validatePlaintext.bind(this)} value={this.state.plaintext} />
                </p>
            )
        } else {
            return (
                <p>
                    <label>{this.props.title}</label>
                    <input className="w3-input" type="text" ref="input_plaintext" pattern="[a-zA-Z ]*" onInput={this.validatePlaintext.bind(this)} value={this.state.plaintext} />
                </p>
            );
        }
    }
}
LetterInput.defaultProps = {
    title: 'Input:'
}
export {NumberInput, LetterInput};