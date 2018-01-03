import React from 'react';

import Tag from '../Components/Tag';
import List from '../Components/List';
import Card from '../Components/Card';
import Button from '../Components/Button';
import Modal from '../Components/Modal';
import {NumberInput, LetterInput} from '../Components/Input';
import Table from '../Components/Table';

class RowTransposition extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enc_plaintext: 'attackpostponeduntiltwoam',
            enc_key: '4312567',
            enc_result: 'Please enter plaintext and key first',
            enc_rows: [],
            dec_ciphertext: 'TTNAAPTMTSUOAODWCOIXKNLXPETX',
            dec_key: '4312567',
            dec_result: 'Please enter ciphertext and key first',
            dec_rows: []
        };
    }
    encrypt() {
        var p = this.state.enc_plaintext.toUpperCase();
        var k = this.state.enc_key;
        var c = "";

        var noOfRows = Math.ceil(p.length/k.length)+1;
        var rows = new Array(noOfRows);
        for (var i=0; i<rows.length; i++) { rows[i] = []; }
        var keys = [];
        for (var i=0; i<k.length; i++) { keys.push(k.charAt(i)); }

        var pi = 0;

        // Table part
        for (var i=0; i<k.length; i++) {
            rows[0].push(k.charAt(i));
        }
        for (var i = 1; i < rows.length; i++) {
            for (var j = 0; j<k.length; j++) {
                var temp = p.charAt(pi);
                if (pi<p.length) {
                    rows[i].push(p.charAt(pi));
                } else {
                    rows[i].push('X');
                }
                pi++;
            }
        }
        // Encrypt part
        for (var i=1; i<=k.length; i++) {
            var col = keys.indexOf(i.toString());
            for (var j=1; j<noOfRows; j++) {
                c += rows[j][col];
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
        
        var noOfRows = Math.ceil(c.length/k.length)+1;
        var rows = new Array(noOfRows);
        for (var i=0; i<rows.length; i++) { rows[i] = []; }
        var keys = [];
        for (var i=0; i<k.length; i++) { keys.push(k.charAt(i)); }

        var ci = 0;

        // Table part
        for (var i=0; i<k.length; i++) {
            rows[0].push(k.charAt(i));
        }
        for (var i=1; i<=k.length; i++) {
            var col = keys.indexOf(i.toString());
            for (var j=1; j<noOfRows; j++) {
                rows[j][col] = c.charAt(ci);
                ci++;
            }
        }

        // Decrypt part
        for (var i=1; i<noOfRows; i++) {
            for (var j=0; j<k.length; j++) {
                p += rows[i][j];
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
                        <LetterInput title="Plaintext:" nospace onUpdate={this.enc_savePlaintext.bind(this)} />
                        <NumberInput title="Key:" onUpdate={this.enc_saveKey.bind(this)} />
                        <Button text="Encrypt" onClick={this.encrypt.bind(this)} />
                    </div>
                } />

                <Card title="Decrypt" content={
                    <div>
                        <LetterInput title="Ciphertext:" uppercase nospace onUpdate={this.dec_savePlaintext.bind(this)} />
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
export default RowTransposition;