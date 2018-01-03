import React from 'react';

import Tag from '../Components/Tag';
import List from '../Components/List';
import Card from '../Components/Card';
import Button from '../Components/Button';
import Modal from '../Components/Modal';
import {NumberInput, LetterInput} from '../Components/Input';

import Calculation from '../Calculation';

class OneTimePad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enc_plaintext: 'example',
            enc_key: 'onetime',
            enc_result: 'Please enter plaintext and key first',
            dec_ciphertext: 'SKEFXXI',
            dec_key: 'onetime',
            dec_result: 'Please enter ciphertext and key first',
            enc_plaintext_bin: '0101',
            enc_key_bin: '1111',
            enc_result_bin: 'Please enter plaintext and key first',
            dec_ciphertext_bin: '1010',
            dec_key_bin: '1111',
            dec_result_bin: 'Please enter ciphertext and key first'
        };
    }
    encrypt() {
        var p = this.state.enc_plaintext.toUpperCase();
        var k = this.state.enc_key.toUpperCase();
        var c = "";
        
        if (p.length==k.length) {
            for (var i = 0, len = p.length; i < len; i++) {
                var pi = p.charCodeAt(i)-'A'.charCodeAt(0);
                var ki = k.charCodeAt(i)-'A'.charCodeAt(0);
                var cCode = Calculation.mod( (pi+ki),26 )+'A'.charCodeAt(0);
                c += String.fromCharCode(cCode);
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
    enc_saveKey(k) {
        this.setState({enc_key: k});
    }

    decrypt() {
        var c = this.state.dec_ciphertext.toLowerCase();
        var k = this.state.dec_key.toLowerCase();
        var p = "";

        if (c.length==k.length) {
            for (var i = 0, len = c.length; i < len; i++) {
                var ci = c.charCodeAt(i)-'a'.charCodeAt(0);
                var ki = k.charCodeAt(i)-'a'.charCodeAt(0);
                var pCode = Calculation.mod( (ci-ki),26 )+'a'.charCodeAt(0);
                p += String.fromCharCode(pCode);
            }
            this.setState({dec_result: p});
            this.refs.modal_decrypt.refs.modal.style.display = 'block';
        } else {
            this.refs.modal_invaliddeckey.refs.modal.style.display = 'block';
        }
    }
    dec_saveCiphertext(p) {
        this.setState({dec_ciphertext: p});
    }
    dec_saveKey(k) {
        this.setState({dec_key: k});
    }

    encrypt_bin() {
        var p = this.state.enc_plaintext_bin;
        var k = this.state.enc_key_bin;
        var c = "";
        var zeros = new Array(k.length + 1).join('0');
        
        if (p.length==k.length) {
            var cDec = Calculation.b2d(p)^Calculation.b2d(k);
            var cBin = Calculation.d2b(cDec);
            c = zeros.substr(cBin.length)+cBin;
            this.setState({enc_result_bin: c});
            this.refs.modal_encrypt_bin.refs.modal.style.display = 'block';
        } else {
            this.refs.modal_invalidenckey.refs.modal.style.display = 'block';
        }
    }
    enc_savePlaintext_bin(p) {
        this.setState({enc_plaintext_bin: p});
    }
    enc_saveKey_bin(k) {
        this.setState({enc_key_bin: k});
    }
    decrypt_bin() {
        var c = this.state.dec_ciphertext_bin;
        var k = this.state.dec_key_bin;
        var p = "";
        var zeros = new Array(k.length + 1).join('0');
        
        if (c.length==k.length) {
            var pDec = Calculation.b2d(c)^Calculation.b2d(k);
            var pBin = Calculation.d2b(pDec);
            p = zeros.substr(pBin.length)+pBin;
            this.setState({dec_result_bin: p});
            this.refs.modal_decrypt_bin.refs.modal.style.display = 'block';
        } else {
            this.refs.modal_invaliddeckey.refs.modal.style.display = 'block';
        }
    }
    dec_saveCiphertext_bin(p) {
        this.setState({dec_ciphertext_bin: p});
    }
    dec_saveKey_bin(k) {
        this.setState({dec_key_bin: k});
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
                        heading: 'Key is as long as the message'
                    },
                    {
                        heading: 'Can only use the key once',
                        content: 'C1 XOR C2 = M1 XOR M2\nFormat of M1 and M2 can then be learnt.\n0s in M1 XOR M2 indicates matching bits while 1s indicates different bits.\nThere will be less possibilities so key can be guessed easily.'
                    },
                    {
                        heading: 'Encryption (Letter):',
                        content: 'E(p) = (p[i]+k[i]) mod 26, where p is plaintext and k is the key'
                    },
                    {
                        heading: 'Decryption (Letter):',
                        content: 'D(c) = (c[i]-k[i]) mod 26, where c is ciphertext and k is the key'
                    },
                    {
                        heading: 'Encryption (Binary):',
                        content: 'E(p) = p[i] XOR k[i], where p is plaintext and k is the key'
                    },
                    {
                        heading: 'Decryption (Binary):',
                        content: 'D(c) = c[i] XOR k[i], where c is ciphertext and k is the key'
                    },
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

                <Card title="Encrypt (Binary Bit)" content={
                    <div>
                        <NumberInput title="Plaintext:" binary onUpdate={this.enc_savePlaintext_bin.bind(this)} />
                        <NumberInput title="Key:" binary onUpdate={this.enc_saveKey_bin.bind(this)} />
                        <Button text="Encrypt" onClick={this.encrypt_bin.bind(this)} />
                    </div>
                } />

                <Card title="Decrypt (Binary Bit)" content={
                    <div>
                        <NumberInput title="Ciphertext:" uppercase nospace onUpdate={this.dec_saveCiphertext_bin.bind(this)} />
                        <NumberInput title="Key:" nospace onUpdate={this.dec_saveKey_bin.bind(this)} />
                        <Button text="Decrypt" onClick={this.decrypt_bin.bind(this)} />
                    </div>
                } />

                <Modal ref="modal_encrypt_bin" title="Result" msg={
                    <div>
                        <p>Plaintext: {this.state.enc_plaintext_bin}</p>
                        <p>Key: {this.state.enc_key_bin}</p>
                        <p>Ciphertext: {this.state.enc_result_bin}</p>
                    </div>
                } />

                <Modal ref="modal_decrypt_bin" title="Result" msg={
                    <div>
                        <p>Ciphertext: {this.state.dec_ciphertext_bin}</p>
                        <p>Key: {this.state.dec_key_bin}</p>
                        <p>Plaintext: {this.state.dec_result_bin}</p>
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
export default OneTimePad;