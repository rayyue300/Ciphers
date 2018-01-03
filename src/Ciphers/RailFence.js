import React from 'react';

import Tag from '../Components/Tag';
import List from '../Components/List';
import Card from '../Components/Card';
import Button from '../Components/Button';
import Modal from '../Components/Modal';
import {NumberInput, LetterInput} from '../Components/Input';
import Table from '../Components/Table';

class RailFence extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enc_plaintext: 'meet me after the toga party',
            enc_key: '2',
            enc_result: 'Please enter plaintext and key first',
            enc_rows: [],
            dec_ciphertext: 'MEMATRHTGPRYETEFETEOAAT',
            dec_key: '2',
            dec_result: 'Please enter ciphertext and key first',
            dec_rows: []
        };
    }
    encrypt() {
        var p = this.state.enc_plaintext.toUpperCase();
        var k = this.state.enc_key;
        var c = "";

        var rows = new Array(k);
        for (var i=0; i<k; i++) { rows[i] = []; }

        var current = 0;
        var direction = 1; // 1 for downward, -1 for upward

        for (var i = 0, len = p.length; i < len; i++) {
            if (p.charAt(i)!=' ') {
                // Table part
                for (var j = 0; j<k; j++) {
                    if (j!=current) {
                        rows[j].push(" ")
                    } else {
                        rows[j].push(p.charAt(i));
                    }
                }
                
                // Change direction
                if (current==0) {
                    direction = 1;
                } else if (current==(k-1)) {
                    direction = -1;
                }
                current += direction;
            }
        }
        // Encrypt part
        for (var j=0; j<k; j++) {
            for (var jj=0; jj<rows[j].length; jj++) {
                if (rows[j][jj]!=" ") {
                    c += rows[j][jj];
                }
            }
        }
        this.setState({enc_rows: rows});

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
        var c = this.state.dec_ciphertext.toLowerCase();
        var k = this.state.dec_key;
        var p = "";
        
        var rows = new Array(k);
        for (var i=0; i<k; i++) { rows[i] = []; }

        var current = 0;
        var direction = 1; // 1 for downward, -1 for upward

        for (var i = 0, len = c.length; i < len; i++) {
            if (p.charAt(i)!=' ') {
                // Table part
                for (var j = 0; j<k; j++) {
                    if (j!=current) {
                        rows[j].push(" ")
                    } else {
                        rows[j].push("-");
                    }
                }
                
                // Change direction
                if (current==0) {
                    direction = 1;
                } else if (current==(k-1)) {
                    direction = -1;
                }
                current += direction;
            }
        }
        // Table part
        var index = 0;
        for (var i=0; i<k; i++) {
            for (var j=0; j<rows[i].length; j++) {
                if (rows[i][j] == "-") {
                    rows[i][j] = c.charAt(index);
                    index++;
                }
            }
        }

        // Decrypt part
        for (var i=0; i<c.length; i++) {
            for (var j=0; j<k; j++) {
                if (rows[j][i] != " ") {
                    p += rows[j][i];
                    break;
                }
            }
        }

        this.setState({dec_rows: rows});

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
                <Tag text="TRANSPOSITION CIPHER" />

                <List title="Overview" content={[
                    {
                        heading: 'Write message letters out diagonally over a number of rows'
                    },
                    {
                        heading: 'Then, read off cipher row by row'
                    }
                ]} />

                <Card title="Encrypt" content={
                    <div>
                        <LetterInput title="Plaintext:" onUpdate={this.enc_savePlaintext.bind(this)} />
                        <NumberInput title="Key:" onUpdate={this.enc_saveKey.bind(this)} />
                        <Button text="Encrypt" onClick={this.encrypt.bind(this)} />
                    </div>
                } />

                <Card title="Decrypt" content={
                    <div>
                        <LetterInput title="Ciphertext:" uppercase onUpdate={this.dec_savePlaintext.bind(this)} />
                        <NumberInput title="Key:" onUpdate={this.dec_saveKey.bind(this)} />
                        <Button text="Decrypt" onClick={this.decrypt.bind(this)} />
                    </div>
                } />

                <Modal ref="modal_encrypt" title="Result" msg={
                    <div>
                        <p>Plaintext: {this.state.enc_plaintext}</p>
                        <p>Key: {this.state.enc_key}</p><hr/>
                        <p>Rows:</p>
                        <Table content={this.state.enc_rows} className="w3-border"/>
                        <p>Ciphertext: {this.state.enc_result}</p>
                    </div>
                } />

                <Modal ref="modal_decrypt" title="Result" msg={
                    <div>
                        <p>Ciphertext: {this.state.dec_ciphertext}</p>
                        <p>Key: {this.state.dec_key}</p><hr/>
                        <p>Rows:</p>
                        <Table content={this.state.dec_rows} className="w3-border"/>
                        <p>Plaintext: {this.state.dec_result}</p>
                    </div>
                } />
            </div>
        );
    }
}
export default RailFence;