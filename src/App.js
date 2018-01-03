import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom'

import logo from './logo.svg';
import './App.css';

// Styling
import './w3.css';
import './w3-theme-cyan.css';
import 'font-awesome/css/font-awesome.min.css';

// Components
import Header from './Header';

// Pages
import Home from './Pages/Home';
import Caesar from './Ciphers/Caesar';
import Monoalphabetic from './Ciphers/Monoalphabetic';
import Multiplicative from './Ciphers/Multiplicative';
import Affine from './Ciphers/Affine';
import OneTimePad from './Ciphers/OneTimePad';
import Vigenere from './Ciphers/Vigenere';
import Playfair from './Ciphers/Playfair';
import Autokey from './Ciphers/Autokey';
import RailFence from './Ciphers/RailFence';
import RowTransposition from './Ciphers/RowTransposition';

const ROOT = '/Ciphers';
const pageList = [
  {
    path: '/',
    title: 'Home',
    comp: Home
  },
  {
    path: '/caesar-cipher',
    title: 'Caesar Cipher',
    comp: Caesar
  },
  {
    path: '/monoalphabetic-substitution-cipher',
    title: 'Monoalphabetic Substitution Cipher',
    comp: Monoalphabetic
  },
  {
    path: '/multiplicative-cipher',
    title: 'Multiplicative Cipher',
    comp: Multiplicative
  },
  {
    path: '/affine-cipher',
    title: 'Affine Cipher',
    comp: Affine
  },
  {
    path: '/one-time-pad',
    title: 'One-Time Pad',
    comp: OneTimePad
  },
  {
    path: '/vigenere-cipher',
    title: 'Vigenère Cipher',
    comp: Vigenere
  },
  {
    path: '/playfair-cipher',
    title: 'Playfair Cipher',
    comp: Playfair
  },
  {
    path: '/autokey-cipher',
    title: 'Autokey Cipher',
    comp: Autokey
  },
  {
    path: '/rail-fence-cipher',
    title: 'Rail Fence Cipher',
    comp: RailFence
  },
  {
    path: '/row-transposition-cipher',
    title: 'Row Transposition Cipher',
    comp: RowTransposition
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.menu_open = this.menu_open.bind(this);
    this.menu_close = this.menu_close.bind(this);
    this.currentPage = 1;
  }
  menu_open() {
    this.refs.menu.style.display = 'block';
  }
  menu_close() {
    this.refs.menu.style.display = 'none';
  }
  render() {
    var menuLinks = pageList.map(function(i){
      return (
        <a href={ROOT+i.path} className="w3-bar-item w3-button">{i.title}</a>
      );
    });
    var routes = pageList.map(function(i){
      if (i.path=='/') {
        return (
          <Route exact path={ROOT+i.path} component={i.comp}/>
        )
      } else {
        return (
          <Route path={ROOT+i.path} component={i.comp}/>
        )
      }
    });
    return (
      <Router className="App">
        <div>
          <div className="w3-sidebar w3-bar-block w3-collapse w3-card w3-animate-left" style={{width:'200px'}} ref={'menu'}>
              <span className="w3-bar-item w3-xlarge w3-hide-small w3-hide-medium">Menu</span>
              <a className="w3-bar-item w3-button w3-hide-large w3-large"
              onClick={this.menu_close}>Close &times;</a>
              {menuLinks}
          </div>
          <div className="w3-main" style={{marginLeft: '200px'}}>
            <Route render={(props) => {
              for (let i of pageList) {
                if (props.location.pathname==i.path) {
                  return (
                    <Header callbackParent={() => this.menu_open()} pageName={i.title.toUpperCase()} />
                  )
                }
              }
              return (
                <Header callbackParent={() => this.menu_open() } pageName={props.location.pathname.toString()}/>
              )
            }} />
            <Switch>
              {routes}
              <Route path="*" component={Home}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
