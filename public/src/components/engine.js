import {cards} from './cards.js';
console.log(cards)

export default class Engine {
  constructor() {
    this.resetTwoCards();
    
  }

  resetTwoCards = () => {
    let isSame = false
    
    let index1 = Math.floor(Math.random() * Math.floor(4));
    let index2 = Math.floor(Math.random() * Math.floor(4));
    if(index1 === index2){
      return this.resetTwoCards()
    }
    console.log(index1,index2)
    this.card1 = cards[index1];
    this.card2 = cards[index2];

  }

  getState = () => {
    return {
      card1: this.card1,
      card2: this.card2,
    }
  }

  isMatch = (symbol) => {
    const isInCard1 = this.card1.includes(symbol);
    const isInCard2 = this.card2.includes(symbol);
    const isMatch = isInCard1 && isInCard2;
    if (isMatch) {
      alert('CORRECT')
      this.resetTwoCards();
    }
    return isMatch;
  }
}