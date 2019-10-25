import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './binomial/sketch';
import './App.css';

const App = () => {
	return (
		<>
			<h1>Binomialverteilung</h1>
			<P5Wrapper sketch={sketch}></P5Wrapper>
		</>
	);
}

export default App;