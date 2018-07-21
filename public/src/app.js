import React, {Component, Fragment} from 'react';
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom';
import ReactDOM from 'react-dom';
import FindItPage from './components/find';


class App extends Component {
  
  render() {
    
    return <BrowserRouter>
      <Fragment>
        <Route path="/" component={FindItPage} />
      </Fragment>
    </BrowserRouter>
  }
}
let root = document.getElementById('root');
ReactDOM.render(<App />, root);