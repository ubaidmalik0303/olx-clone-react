import React from 'react';
import './components/bootstrap.min.css';
import './App.css';
import AppRouter from './config/route';
import firebase from './config/firebase'

class App extends React.Component {

  constructor() {
    super()
    this.state = {

    }
  }

  render() {
    return (
      <>
        <AppRouter />

      </>
    );
  }


}

export default App;
