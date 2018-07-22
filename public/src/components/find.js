import React, {Component, Fragment} from 'react';
import { Button } from 'reactstrap';

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

const userID = '5b54d71cb32a2e0004e18b15'
const company = "Candy Crush";
const companyID = "5b54d71cb32a2e0004e18b1a"

export default class FindItPage extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      user: 'Alexa',
      foundations: ['Fisher House', 'St. Judes', 'Red Cross', 'Make A Wish', 'Americares'],
      currentFoundation: {
        name: 'Fisher House',
        contributions: 0,
        id: null
      },
      list: shuffle([1,2,3,4,5,6,7,8,9,10]),
      bingo: Math.floor(Math.random() * 11),
      isMatch: false,
      userData: null,
    }
  
  }
  componentDidMount(){
    console.log('did mount')
      fetch(`https://hedgehog-backend.herokuapp.com/api/user/${userID}`)
        .then(data => data.json())
        .then((data) => {

          let foundation = data.foundations.filter(obj => obj.foundationName === this.state.currentFoundation.name)
          let donations;
          if(foundation[0].foundationContribution){
            donations = foundation[0].foundationContribution;
          }else {
            donations = 0;
          }
          let id = foundation[0].foundationId
          console.log('id', id)
          console.log('donations', donations)

           let newUserData = data;
           let newState = this.state;
           newState.currentFoundation.contributions = donations
           newState.userData = newUserData;
           newState.currentFoundation.id = id
           this.setState(newState)
          console.log('state', this.state)
        }); 
    };
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
    console.log('state', this.state)
  }

  handleClick = (symbol,curState) => {
    console.log(curState);
    let finalState;
    if(symbol ===  this.state.bingo){
      this.resetNumbers();
      alert('Correct!!!');
      fetch(`https://hedgehog-backend.herokuapp.com/api/give`, {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          "userId": userID,
          "companyId": companyID,
          "foundationId": this.state.currentFoundation.id,
          "companyName": company,
          "foundationName": this.state.currentFoundation.name,
          "donated": 2
        })
      }).then(function(res) {
        return console.log('donation submitted')
      }).then(function() {
        fetch(`${process.env.BACKEP}/api/user/${userID}`)
        .then(data => data.json())
        .then((data) => {

          let foundation = data.foundations.filter(obj => obj.foundationName === curState.currentFoundation.name)
          let donations;
          if(foundation[0].foundationContribution){
            donations = foundation[0].foundationContribution;
          }else {
            donations = 0;
          }
          let id = foundation[0].foundationId
          console.log('id', id)
          console.log('donations', donations)

           let newUserData = data;
           let newState = curState;
           
           newState.currentFoundation.contributions = donations
           newState.userData = newUserData;
           newState.currentFoundation.id = id
            console.log(newState)
          finalState =  newState
         
        });
      })
      this.setState(finalState)
      console.log('stateeee', this.state)
    }
  }

  foundationSelect = (e) =>{
    console.log(e.target.value)
    let newState = this.state;
    let foundation = e.target.value
    newState.currentFoundation.name = foundation
    this.setState(newState)

    fetch(`https://hedgehog-backend.herokuapp.com/api/user/${userID}`)
        .then(data => data.json())
        .then((data) => {

          let foundation = data.foundations.filter(obj => obj.foundationName === this.state.currentFoundation.name)
          let donations = foundation[0].foundationContribution
          let id = foundation[0].foundationId
          console.log('donations', donations)

           let newUserData = data;
           let newState = this.state;
           newState.currentFoundation.contributions = donations
           newState.userData = newUserData;
           newState.currentFoundation.id = id
           this.setState(newState)
          console.log('user data', this.state)
        });
    console.log('state', this.state)
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
      <div className="item">Contribution To {this.state.currentFoundation.name} ${this.state.currentFoundation.contributions}</div>
      </div>
      <div id="bing">Find The Number {this.state.bingo}</div>
      <div className="container">
        {this.state.list.map((symbol,i) => {
          return <Button color="success" className="buttons" key={i} onClick={() => this.handleClick(symbol, this.state)}>{symbol}</Button>
        })}
      </div>
    </Fragment>
  }
}