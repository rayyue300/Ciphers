import React from 'react';

import Tag from '../Components/Tag';
import List from '../Components/List';
import Card from '../Components/Card';
import Button from '../Components/Button';
import Modal from '../Components/Modal';
import {NumberInput, LetterInput} from '../Components/Input';

class Monoalphabetic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enc_plaintext: '',
            enc_key: '',
            enc_result: 'Please enter plaintext and key first',
            dec_ciphertext: '',
            dec_key: '',
            dec_result: 'Please enter ciphertext and key first'
        };
    }
    encrypt() {
        var p = this.state.enc_plaintext.toUpperCase();
        if (this.state.enc_key.length!=26) {
            this.setState({enc_key: 'abcdefghijklmnopqrstuvwxyz'});
        }
        var k = this.state.enc_key;
        var c = "";
        for (var i = 0, len = p.length; i < len; i++) {
            if (p.charAt(i)==' ') 
                c += ' ';
            else {
                var temp = p.charCodeAt(i)-'A'.charCodeAt(0);
                c += k.charAt(temp);
            }
        }
        this.setState({enc_result: c.toUpperCase()});
        this.refs.modal_encrypt.refs.modal.style.display = 'block';
    }
    enc_savePlaintext(p) {
        this.setState({enc_plaintext: p});
    }
    enc_saveKey(k) {
        this.setState({enc_key: k});
    }

    decrypt() {
        var c = this.state.dec_ciphertext.toLowerCase();
        if (this.state.dec_key.length!=26) {
            this.setState({dec_key: 'abcdefghijklmnopqrstuvwxyz'});
        }
        var k = this.state.dec_key;
        var p = "";
        for (var i = 0, len = c.length; i < len; i++) {
            if (c.charAt(i)==' ') {
                p += ' ';
            } else {
                for (var j = 0; j<26; j++) {
                    if (c.charAt(i)==k.charAt(j)) {
                        p += String.fromCharCode(j+'a'.charCodeAt(0));
                        break;
                    }
                }
            }
        }
        this.setState({dec_result: p});
        this.refs.modal_decrypt.refs.modal.style.display = 'block';
    }
    dec_savePlaintext(p) {
        this.setState({dec_ciphertext: p});
    }
    dec_saveKey(k) {
        this.setState({dec_key: k});
    }
    
    render() {
        return (
            <div className="w3-container w3-content w3-section">
                <Tag text="CLASSICAL CIPHER" />
                <Tag text="SUBSTITUTION CIPHER" />

                <List title="Overview" content={[
                    {
                        heading: 'Each plaintext letter maps to a different random ciphertext letter'
                    },
                    {
                        heading: 'Key is 26-letter long'
                    },
                    {
                        heading: 'Weakness:',
                        content: 'English texts contain letters with non-equal frequency of occurrence. Statistical cryptanalysis can be attempted to first locate frequently occured letters, biggrams and trigrams and find out possible plaintext-letter-to-ciphertext-letter mappings (the key).'
                    }
                ]} />

                <Card title="Encrypt" content={
                    <div>
                        <LetterInput title="Plaintext:" onUpdate={this.enc_savePlaintext.bind(this)} />
                        <LetterInput title="Key:" nospace onUpdate={this.enc_saveKey.bind(this)} />
                        <Button text="Encrypt" onClick={this.encrypt.bind(this)} />
                    </div>
                } />

                <Card title="Decrypt" content={
                    <div>
                        <LetterInput title="Ciphertext:" uppercase onUpdate={this.dec_savePlaintext.bind(this)} />
                        <LetterInput title="Key:" onUpdate={this.dec_saveKey.bind(this)} />
                        <Button text="Decrypt" onClick={this.decrypt.bind(this)} />
                    </div>
                } />

                <Modal ref="modal_encrypt" title="Result" msg={
                    <div>
                        <p>Plaintext: {this.state.enc_plaintext}</p>
                        <p>Key: {this.state.enc_key}</p>
                        <p>Ciphertext: {this.state.enc_result}</p>
                    </div>
                } />

                <Modal ref="modal_decrypt" title="Result" msg={
                    <div>
                        <p>Ciphertext: {this.state.dec_ciphertext}</p>
                        <p>Key: {this.state.dec_key}</p>
                        <p>Plaintext: {this.state.dec_result}</p>
                    </div>
                } />
            </div>
        );
    }
}
export default Monoalphabetic;