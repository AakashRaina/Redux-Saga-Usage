import React, { Component } from 'react';
import './App.css';
import DataFetcherComponent from "./DataFetcherComponent";

class App extends Component {
	render() {
		return (
			<div className="App">
				<DataFetcherComponent />
			</div>
		);
	}
}

export default App;
