import React from 'react';

import Tag from '../Components/Tag';
import List from '../Components/List';
import Card from '../Components/Card';
import Button from '../Components/Button';
import Modal from '../Components/Modal';
import {NumberInput, LetterInput} from '../Components/Input';

import Calculation from '../Calculation';

class Vigenere extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enc_plaintext: 'wearediscoveredsaveyourself',
            enc_key: 'deceptive',
            enc_key_rep: 'deceptive',
            enc_result: 'Please enter plaintext and key first',
            dec_ciphertext: 'ZICVTWQNGRZGVTWAVZHCQYGLMGJ',
            dec_key: 'deceptive',
            dec_key_rep: 'deceptive',
            dec_result: 'Please enter ciphertext and key first'
        };
    }
    encrypt() {
        var p = this.state.enc_plaintext.toUpperCase();
        var k = this.state.enc_key.toUpperCase();
        var k_rep = "";
        var c = "";
        
        for (var i = 0, len = p.length; i < len; i++) {
            var pi = p.charCodeAt(i)-'A'.charCodeAt(0);
            var ii = Calculation.mod(i, k.length);
            var ki = k.charCodeAt(ii)-'A'.charCodeAt(0);
            k_rep += k[ii].toLowerCase();
            var cCode = Calculation.mod( (pi+ki),26 )+'A'.charCodeAt(0);
            c += String.fromCharCode(cCode);
        }
        this.setState({enc_result: c, enc_key_rep: k_rep});
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
        var k = this.state.dec_key.toLowerCase();
        var k_rep = "";
        var p = "";

        for (var i = 0, len = c.length; i < len; i++) {
            var ci = c.charCodeAt(i)-'a'.charCodeAt(0);
            var ii = Calculation.mod(i, k.length);
            var ki = k.charCodeAt(ii)-'a'.charCodeAt(0);
            k_rep += k[ii];
            var pCode = Calculation.mod( (ci-ki),26 )+'a'.charCodeAt(0);
            p += String.fromCharCode(pCode);
        }
        this.setState({dec_result: p, dec_key_rep: k_rep});
        this.refs.modal_decrypt.refs.modal.style.display = 'block';
    }
    dec_saveCiphertext(p) {
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
                        heading: 'Simplest polyalphabetic substitution cipher'
                    },
                    {
                        heading: 'Mathematically give each letter a number',
                        content: 'A=0, B=1, C=2, ... Z=25'
                    },
                    {
                        heading: 'Repeat the key so that it is as long as the message',
                        content: 'e.g.: plaintext = abcdefg, key = no, repeated key = nononon'
                    },
                    {
                        heading: 'Encryption:',
                        content: 'E(p) = (p[i]+k[i]) mod 26, where p is plaintext and k is the key'
                    },
                    {
                        heading: 'Decryption:',
                        content: 'D(c) = (c[i]-k[i]) mod 26, where c is ciphertext and k is the key'
                    }
                ]} />

                <Card title="Encrypt" content={
                    <div>
                        <LetterInput title="Plaintext:" nospace onUpdate={this.enc_savePlaintext.bind(this)} />
                        <LetterInput title="Key:" nospace onUpdate={this.enc_saveKey.bind(this)} />
                        <Button text="Encrypt" onClick={this.encrypt.bind(this)} />
                    </div>
                } />

                <Card title="Decrypt" content={
                    <div>
                        <LetterInput title="Ciphertext:" uppercase nospace onUpdate={this.dec_saveCiphertext.bind(this)} />
                        <LetterInput title="Key:" nospace onUpdate={this.dec_saveKey.bind(this)} />
                        <Button text="Decrypt" onClick={this.decrypt.bind(this)} />
                    </div>
                } />

                <Modal ref="modal_encrypt" title="Result" msg={
                    <div>
                        <p>Plaintext: {this.state.enc_plaintext}</p>
                        <p>Key: {this.state.enc_key}</p>
                        <p>Repeated Key: {this.state.enc_key_rep}</p>
                        <p>Ciphertext: {this.state.enc_result}</p>
                    </div>
                } />

                <Modal ref="modal_decrypt" title="Result" msg={
                    <div>
                        <p>Ciphertext: {this.state.dec_ciphertext}</p>
                        <p>Key: {this.state.dec_key}</p>
                        <p>Repeated Key: {this.state.dec_key_rep}</p>
                        <p>Plaintext: {this.state.dec_result}</p>
                    </div>
                } />

                <Modal ref="modal_invalidenckey" title="Error" msg={
                    <div>
                        <p>Invalid key: {this.state.enc_key}</p>
                        <p>Key must be as long as the plaintext</p>
                    </div>
                } />

                <Modal ref="modal_invaliddeckey" title="Error" msg={
                    <div>
                        <p>Invalid key: {this.state.dec_key}</p>
                        <p>Key must be as long as the ciphertext</p>
                    </div>
                } />
            </div>
        );
    }
}
export default Vigenere;