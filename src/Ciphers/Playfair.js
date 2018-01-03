import React from 'react';

import Tag from '../Components/Tag';
import List from '../Components/List';
import Card from '../Components/Card';
import Button from '../Components/Button';
import Modal from '../Components/Modal';
import {NumberInput, LetterInput} from '../Components/Input';
import Table from '../Components/Table';

class Playfair extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enc_plaintext: 'attackafterdawn',
            enc_realplaintext: '',
            enc_key: 'encryption',
            enc_keys: [],
            enc_result: 'Please enter plaintext and key first',
            dec_ciphertext: 'PJJPEMJHPNNGJZRV',
            dec_key: 'encryption',
            dec_keys: [],
            dec_result: 'Please enter ciphertext and key first'
        };
    }
    to2D(mat) {
        var output = [];
        for (var i=0; i<5; i++) {
            var temp = [];
            for (var j=0; j<5; j++) {
                temp.push(mat[i*5+j]);
            }
            output.push(temp);
        }
        return output;
    }

    encrypt() {
        var p = this.state.enc_plaintext.toUpperCase();
        var k = Array.from( this.state.enc_key.toUpperCase().replace("I","J") );
        var c = "";

        // Prepare the plaintext
        var pp = p.charAt(0);
        var index = 0;
        for (var i = 1; i < p.length; i++) {
            if (index%2 == 0) {
                if (p.charAt(i)==pp.charAt(index)) {
                    pp += 'X';
                    index++;
                    pp += p.charAt(i);
                    index++;
                } else {
                    pp += p.charAt(i);
                    index++;
                }
            } else {
                pp += p.charAt(i);
                index++;
            }
        }
        if (pp.length%2 == 1) {
            pp += 'X';
        }
        this.setState({enc_realplaintext: pp});

        // Prepare all letters for putting in the matrix
        var letters = [];
        for (var i='A'.charCodeAt(0); i<='Z'.charCodeAt(0); i++) {
          letters.push(String.fromCharCode(i));
        }
        letters.splice(letters.indexOf('I'), 1);
        
        // Remove repeated char in the key
        k = k.filter( function( item, index, inputArray ) {
            return inputArray.indexOf(item) == index;
        });

        // Fill in the matrix
        var matrix = [];
        for (var i=0; i<k.length; i++) {
            var thisChar = k[i];
            matrix.push(thisChar);
            // Remove from letters
            letters.splice(letters.indexOf(thisChar), 1);
        }
        for (var i=0; i<letters.length; i++) {
            matrix.push(letters[i]);
        }
        
        // Prepare the key matrix for output
        var keyMatrix = this.to2D(matrix);
        this.setState({enc_keys: keyMatrix});

        // Encrypt
        for (var index=0; index<pp.length; index+=2) {
            var c1 = pp.charAt(index);
            var c1i, c1j;
            var c2 = pp.charAt(index+1);
            var c2i, c2j;
            for (var i=0; i<5; i++) {
                for (var j=0; j<5; j++) {
                    if (keyMatrix[i][j]==c1) {
                        c1i = i; c1j = j;
                    } else if (keyMatrix[i][j]==c2) {
                        c2i = i; c2j = j;
                    }
                }
            }
            if (c1i==c2i) {             // Same row
                c1 = keyMatrix[c1i][(c1j+1)%5];
                c2 = keyMatrix[c2i][(c2j+1)%5];
            } else if (c1j==c2j) {      // Same col
                c1 = keyMatrix[(c1i+1)%5][c1j];
                c2 = keyMatrix[(c2i+1)%5][c2j];
            } else {                    // Not same row/col
                c1 = keyMatrix[c1i][c2j];
                c2 = keyMatrix[c2i][c1j];
            }
            c += c1+c2;
        }

        this.setState({enc_result: c});
        this.refs.modal_encrypt.refs.modal.style.display = 'block';
    }
    enc_savePlaintext(p) {
        this.setState({enc_plaintext: p});
    }
    enc_saveKey(k) {
        this.setState({enc_key: k});
    }

    decrypt() {
        var c = this.state.dec_ciphertext.toUpperCase();
        var k = Array.from( this.state.enc_key.toUpperCase().replace("I","J") );
        var p = "";
        
        // Prepare all letters for putting in the matrix
        var letters = [];
        for (var i='A'.charCodeAt(0); i<='Z'.charCodeAt(0); i++) {
          letters.push(String.fromCharCode(i));
        }
        letters.splice(letters.indexOf('I'), 1);
        
        // Remove repeated char in the key
        k = k.filter( function( item, index, inputArray ) {
            return inputArray.indexOf(item) == index;
        });

        // Fill in the matrix
        var matrix = [];
        for (var i=0; i<k.length; i++) {
            var thisChar = k[i];
            matrix.push(thisChar);
            // Remove from letters
            letters.splice(letters.indexOf(thisChar), 1);
        }
        for (var i=0; i<letters.length; i++) {
            matrix.push(letters[i]);
        }
        
        // Prepare the key matrix for output
        var keyMatrix = this.to2D(matrix);
        this.setState({dec_keys: keyMatrix});

        // Decrypt
        for (var index=0; index<c.length; index+=2) {
            var p1 = c.charAt(index);
            var p1i, p1j;
            var p2 = c.charAt(index+1);
            var p2i, p2j;
            for (var i=0; i<5; i++) {
                for (var j=0; j<5; j++) {
                    if (keyMatrix[i][j]==p1) {
                        p1i = i; p1j = j;
                    } else if (keyMatrix[i][j]==p2) {
                        p2i = i; p2j = j;
                    }
                }
            }
            if (p1i==p2i) {             // Same row
                p1 = keyMatrix[p1i][(p1j-1+5)%5];
                p2 = keyMatrix[p2i][(p2j-1+5)%5];
            } else if (p1j==p2j) {      // Same col
                p1 = keyMatrix[(p1i-1+5)%5][p1j];
                p2 = keyMatrix[(p2i-1+5)%5][p2j];
            } else {                    // Not same row/col
                p1 = keyMatrix[p1i][p2j];
                p2 = keyMatrix[p2i][p1j];
            }
            p += p1+p2;
        }

        p = p.toLowerCase();
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
                        heading: 'Plaintext is encrypted two letters at a time',
                        content: ''
                    },
                    {
                        heading: 'If a pair is a repeated letter, insert filler like X',
                        content: 'e.g.: balloon becomes ba lx lo on'
                    },
                    {
                        heading: 'Both letters on same row, replace each with letter to right',
                        content: '(wrapping back to start from end)'
                    },
                    {
                        heading: 'Both letters in same column, replace each with letter below',
                        content: '(wrapping to top from bottom)'
                    },
                    {
                        heading: 'Otherwise, replaced by the letter in the same row and in the column of the other letter of the pair'
                    }
                ]} />

                <Card title="Encrypt" content={
                    <div>
                        <LetterInput title="Plaintext:" onUpdate={this.enc_savePlaintext.bind(this)} />
                        <LetterInput title="Key:" onUpdate={this.enc_saveKey.bind(this)} />
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
                        <hr/>
                        <p>{this.state.enc_realplaintext}</p>
                        <p>5x5 Matrix of the Key:</p>
                        <Table content={this.state.enc_keys} className="w3-border"/>
                        <p>Ciphertext: {this.state.enc_result}</p>
                        
                    </div>
                } />

                <Modal ref="modal_decrypt" title="Result" msg={
                    <div>
                        <p>Ciphertext: {this.state.dec_ciphertext}</p>
                        <p>Key: {this.state.dec_key}</p>
                        <hr/>
                        <p>5x5 Matrix of the Key:</p>
                        <Table content={this.state.dec_keys} className="w3-border"/>
                        <p>Plaintext: {this.state.dec_result}</p>
                    </div>
                } />
            </div>
        );
    }
}
export default Playfair;