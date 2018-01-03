import React from 'react';

import Tag from '../Components/Tag';
import List from '../Components/List';
import Card from '../Components/Card';
import Button from '../Components/Button';
import Modal from '../Components/Modal';
import {NumberInput, LetterInput} from '../Components/Input';

import Calculation from '../Calculation';

class Affine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enc_plaintext: 'example',
            enc_key1: '3',
            enc_key2: '4',
            enc_result: 'Please enter plaintext and key first',
            dec_ciphertext: 'QVEOXLQ',
            dec_key1: '3',
            dec_key2: '4',
            dec_result: 'Please enter ciphertext and key first'
        };
    }
    encrypt() {
        var p = this.state.enc_plaintext.toUpperCase();
        var k1 = this.state.enc_key1;
        var k2 = this.state.enc_key2;
        var c = "";
        if (Calculation.xgcd(parseInt(k1),26)[2]==1) {
            for (var i = 0, len = p.length; i < len; i++) {
                if (p.charAt(i)==' ') 
                    c += ' ';
                else {
                    var temp = ((p.charCodeAt(i)-'A'.charCodeAt(0))*parseInt(k1)+parseInt(k2))%26+'A'.charCodeAt(0);
                    c += String.fromCharCode(temp);
                }
            }
            this.setState({enc_result: c});
            this.refs.modal_encrypt.refs.modal.style.display = 'block';
        } else {
            this.refs.modal_invalidenckey.refs.modal.style.display = 'block';
        }
    }
    enc_savePlaintext(p) {
        this.setState({enc_plaintext: p});
    }
    enc_saveKey1(k) {
        this.setState({enc_key1: k});
    }
    enc_saveKey2(k) {
        this.setState({enc_key2: k});
    }

    decrypt() {
        var c = this.state.dec_ciphertext.toLowerCase();
        var k1 = this.state.dec_key1;
        var k2 = this.state.dec_key2;
        var p = "";
        if (Calculation.xgcd(parseInt(k1),26)[2]==1) {
            for (var i = 0, len = c.length; i < len; i++) {
                if (c.charAt(i)==' ') 
                    p += ' ';
                else {
                    var k1Int = parseInt(k1);
                    var k1Inverse = Calculation.xgcd(k1Int,26)[0];
                    var k2Int = parseInt(k2);
                    var cInt = c.charCodeAt(i)-'a'.charCodeAt(0);

                    var temp = Calculation.mod((cInt-k2Int)*k1Inverse,26);
                    temp += 'a'.charCodeAt(0);

                    //var temp = (c.charCodeAt(i)-'a'.charCodeAt(0)+26)*Calculation.xgcd(parseInt(k),26)[0]%26+'a'.charCodeAt(0);
                    p += String.fromCharCode(temp);
                }
            }
            this.setState({dec_result: p});
            this.refs.modal_decrypt.refs.modal.style.display = 'block';
        } else {
            this.refs.modal_invaliddeckey.refs.modal.style.display = 'block';
        }
    }
    dec_savePlaintext(p) {
        this.setState({dec_ciphertext: p});
    }
    dec_saveKey1(k) {
        this.setState({dec_key1: k});
    }
    dec_saveKey2(k) {
        this.setState({dec_key2: k});
    }
    
    render() {
        return (
            <div className="w3-container w3-content w3-section">
                <Tag text="CLASSICAL CIPHER" />
                <Tag text="SUBSTITUTION CIPHER" />

                <List title="Overview" content={[
                    {
                        heading: 'Mathematically give each letter a number',
                        content: 'A=0, B=1, C=2, ... Z=25'
                    },
                    {
                        heading: 'Combined by additive and multiplicative cipher'
                    },
                    {
                        heading: 'Encryption:',
                        content: 'E(p) = (p*k1)+k2 mod 26, where p is plaintext and k1,k2 are the keys'
                    },
                    {
                        heading: 'Decryption:',
                        content: 'D(c) = (c-k2) * (k1^-1)) mod 26, where c is ciphertext and k1,k2 are the keys'
                    },
                    {
                        heading: 'Requried gcd(k1, 26) = 1'
                    }
                ]} />

                <Card title="Encrypt" content={
                    <div>
                        <LetterInput title="Plaintext:" onUpdate={this.enc_savePlaintext.bind(this)} />
                        <NumberInput title="Key 1:" onUpdate={this.enc_saveKey1.bind(this)} />
                        <NumberInput title="Key 2:" onUpdate={this.enc_saveKey2.bind(this)} />
                        <Button text="Encrypt" onClick={this.encrypt.bind(this)} />
                    </div>
                } />

                <Card title="Decrypt" content={
                    <div>
                        <LetterInput title="Ciphertext:" uppercase onUpdate={this.dec_savePlaintext.bind(this)} />
                        <NumberInput title="Key 1:" onUpdate={this.dec_saveKey1.bind(this)} />
                        <NumberInput title="Key 2:" onUpdate={this.dec_saveKey2.bind(this)} />
                        <Button text="Decrypt" onClick={this.decrypt.bind(this)} />
                    </div>
                } />

                <Modal ref="modal_encrypt" title="Result" msg={
                    <div>
                        <p>Plaintext: {this.state.enc_plaintext}</p>
                        <p>Key 1: {this.state.enc_key1}</p>
                        <p>Key 2: {this.state.enc_key2}</p>
                        <p>Ciphertext: {this.state.enc_result}</p>
                    </div>
                } />

                <Modal ref="modal_decrypt" title="Result" msg={
                    <div>
                        <p>Ciphertext: {this.state.dec_ciphertext}</p>
                        <p>Key 1: {this.state.dec_key1}</p>
                        <p>Key 2: {this.state.dec_key2}</p>
                        <p>Plaintext: {this.state.dec_result}</p>
                    </div>
                } />

                <Modal ref="modal_invalidenckey" title="Error" msg={
                    <div>
                        <p>Invalid key: {this.state.enc_key}</p>
                        <p>Requried gcd(k, 26) = 1</p>
                    </div>
                } />

                <Modal ref="modal_invaliddeckey" title="Error" msg={
                    <div>
                        <p>Invalid key: {this.state.dec_key}</p>
                        <p>Requried gcd(k, 26) = 1</p>
                    </div>
                } />
            </div>
        );
    }
}
export default Affine;