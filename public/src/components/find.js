import React, {Component, Fragment} from 'react';


function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export default class FindItPage extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      user: 'Alexa',
      foundations: ['Fisher House', 'Gates Foundation'],
      currentFoundation: {
        name: 'Fisher House',
        contributions: 34.78
      },
      list: shuffle([1,2,3,4,5,6,7,8,9,10]),
      bingo: Math.floor(Math.random() * 11),
      isMatch: false,
    }
    
  }
  resetNumbers = () => {
    console.log('reset')
    let i = Math.floor(Math.random() * 11);
    let list = [1,2,3,4,5,6,7,8,9,10];
    let newBingo = list[i];
    let newList = shuffle(list);
    let newState = this.state;
    newState.bingo = newBingo
    newState.list = newList
    this.setState(newState)
  }

  handleClick = (symbol) => {
    if(symbol ===  this.state.bingo){
      
      this.resetNumbers();
      // alert('Correct!!!');
    }
  }

  foundationSelect = (e) =>{
    console.log(e.target.value)
    let newState = this.state;
    let foundation = e.target.value
    newState.currentFoundation.name = foundation
    this.setState(newState)
    console.log('new foundation', this.state.currentFoundation)
  }
  

  render = () => {
    return <Fragment>
      <div id="user">
      <div className="item">USER: {this.state.user}</div>
      <div className="item">Foundation:
        <select onChange={this.foundationSelect}>
          {this.state.foundations.map((foundation, i) => {
            return <option value={foundation}>{foundation}</option>
          })}
        </select>
      </div>
      <div className="item">${this.state.currentFoundation.contributions}</div>
      </div>
      <div>Find The Number {this.state.bingo}</div>
      <div className="container">
        {this.state.list.map((symbol,i) => {
          return <div className="buttons" key={i} onClick={() => this.handleClick(symbol)}>{symbol}</div>
        })}
      </div>
    </Fragment>
  }
}