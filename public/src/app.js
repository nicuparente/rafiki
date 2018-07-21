import React, {Component, Fragment} from 'react';
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom';
import ReactDOM from 'react-dom';
import FindItPage from './components/find';

console.log('fuc you parente')
class App extends Component {
  
  render() {
    console.log('wtf');
    return <BrowserRouter>
      <Fragment>
        <h1>My Find It App</h1>
        <Route path="/" component={FindItPage} />
      </Fragment>
    </BrowserRouter>
  }
}
let root = document.getElementById('root');
ReactDOM.render(<App />, root);