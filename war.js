function Card(suit,rank) {
  this.suit = suit;
  this.rank = rank;
  // this.name =`${rank} of ${suit}`;
  this.name = rank + ' of '+ suit;
}
// var my_card = new card ('spades',6)
// console.log(my_card.name);
function Deck() {
  this.deck = [];
  var suits =['clubs','diamond', 'spades', 'hearts']
  for(var rank = 2; rank <= 14;rank++){
    for(var suit =0; suit < suits.length;suit++){
      this.deck.push(new Card(suits[suit], rank))
    }
  }
  this.shuffle = function () {
    for(var i =0; i < this.deck.length; i++){
      var random = Math.floor(Math.random()*this.deck.length);
      var temp = this.deck[i];
      this.deck[i] = this.deck[random];
      this.deck[random] = temp;
    }
  }
  this.shuffle();
  this.draw = function () {
    if(this.deck.length > 0){
      return this.deck[0]
    }
  }
  this.dealAll = function () {
    if(this.deck.length > 0){
      var results = [this.deck.slice(0,Math.floor(this.deck.length/2)),this.deck.slice(Math.ceil(this.deck.length/2))]
      // console.log("deal all"+results)
      return results;
    }
  }
}

function Player(name) {
  this.name = name;
  this.hand = [];
  this.addCard = function (card) {
    this.hand.push(card);
  }
  this.addCards = function (cards) {
    for(var i = 0; i < cards.length; i++){
      this.hand.push(cards[i]);

    }
  }
  this.playcard = function () {
    return this.hand.shift();
  }
}
function War(name1, name2) {
  var deck;
  this.players = [new Player(name1), new Player(name2)]
  this.start = function () {
    // debugger;
    var results = {players: this.players}
    deck = new Deck();
    var dealt = deck.dealAll()
    console.log(this.players);
    this.players[0].addCards(dealt[0])
    this.players[1].addCards(dealt[1])
    return results
  }
  this.play = function () {
    while(this.players[0].hand.length > 0 && this.players[1].hand.length > 0  ){
      console.log(this.players[0].hand.length+'  '+this.players[1].hand.length);
      this.playTurn()
      // console.log('hehehehehehh');
      // console.log(this.players[1].hand.length);
    }
    if(this.players[0].hand.length > 0){
      console.log('player 1 wins game');
    }else{
      console.log('player 2 wins game');
    }
  }
  this.playTurn = function () {
    var results = {players: this.players}
    var cardOne = this.players[0].playcard();
    var cardTwo = this.players[1].playcard();
    results.cardsPlayerOne=[cardOne];
    results.cardsPlayerTwo=[cardTwo];
    console.log(cardOne.rank);
    console.log(cardTwo.rank);
    if(cardOne.rank > cardTwo.rank){
      this.players[0].addCards([cardOne,cardTwo]);
      results.whoWon = 1;
      results.whatWon = [cardOne,cardTwo];
      console.log('player 1 win a ' + cardTwo.rank + ' with a ' + cardOne.rank);
    }else if(cardOne.rank < cardTwo.rank){
      this.players[1].addCards([cardOne,cardTwo]);
      results.whoWon = 2;
      results.whatWon = [cardOne,cardTwo];
      console.log('player 2 wins a '+ cardOne.rank + ' with a ' + cardTwo.rank);
    }else{
      results.wasWar = true
      var player1cards = [cardOne];
      var player2cards = [cardTwo];
      var warring = true;
      while(warring){
        var counter = 0;
        while(this.players[0].hand.length > 0 && counter < 4 ){
          console.log('l1',this.players[0].hand.length);
          player1cards.push(this.players[0].playcard())
          counter ++;

        }
        counter = 0;
        while(this.players[1].hand.length > 0 && counter < 4 ){
          console.log('l2',this.players[1].hand.length);
          player2cards.push(this.players[1].playcard())
          counter ++;
        }
        // player1cards.push(this.players[0].playcard(),this.players[0].playcard(),this.players[0].playcard(),this.players[0].playcard());
        // player2cards.push(this.players[1].playcard(),this.players[1].playcard(),this.players[1].playcard(),this.players[1].playcard())
        results.cardsPlayerOne = player1cards;
        results.cardsPlayerTwo = player2cards;
        console.log('1', player1cards);
        console.log('2', player2cards);
        if(player1cards[player1cards.length - 1].rank > player2cards[player2cards.length - 1].rank) {
          results.whoWon = 1;
          results.whatWon = player1cards.concat(player2cards)


          this.players[0].addCards(player2cards)
          this.players[0].addCards(player1cards)
          warring = false;
          console.log('player 1 wins a ' + player2cards[player2cards.length - 1].rank + ' with a ' + player1cards[player1cards.length - 1].rank);

        }else if (player2cards[player2cards.length - 1].rank > player1cards[player1cards.length - 1].rank) {
          results.whoWon = 2;
          results.whatWon = player2cards.concat(player1cards)
          this.players[1].addCards(player2cards)
          this.players[1].addCards(player1cards)
          warring = false;
          console.log('player 2 wins a '+ player1cards[player1cards.length - 1].rank + ' with a ' + player2cards[player2cards.length - 1].rank);

        }else{
          console.log('warrrr');
        }
      }
    }
    return results
  }
}


// console.dir(my_war.players[0].hand);
// console.log(my_war.players);
// console.log(my_deck.draw());
