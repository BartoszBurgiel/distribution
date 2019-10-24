import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './binomial/sketch';
import './App.css';

class App extends Component {
  constructor(){
    super();
  }

  render() {
    return (
      <div>
        <P5Wrapper sketch={sketch}></P5Wrapper>
      </div>
    );
  }
}

export default App;