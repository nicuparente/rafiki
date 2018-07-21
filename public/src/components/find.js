import React, {Component, Fragment} from 'react';


export default class FindItPage extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      list: [1,2,3,4,5,6,7,8,9,10],
      bingo: null,
      isMatch: false,
    }
    this.resetNumbers();
  }
  resetNumbers = () => {
    let i = Math.floor(Math.random() * 11);
    let list = [1,2,3,4,5,6,7,8,9,10];
    this.state.bingo = list[i];
    this.state.isMatch = false;
  }

  handleClick = (symbol) => {
    this.Engine.isMatch(symbol);
    this.setState(this.Engine.getState());
  }

  

  render = () => {
    return <Fragment>
     
      <div>
        {this.state.list.map((symbol,i) => {
          return <button key={i} onClick={() => this.handleClick(symbol)}>{symbol}</button>
        })}
      </div>
    </Fragment>
  }
}