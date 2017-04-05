var my_war = new War('peter','diego')
$(document).ready(function () {
  var result = my_war.start()
  updateView(result)
  $('#play button').click(function () {
    var turnResult = my_war.playTurn()
    updateView(turnResult);
  })
  // $('war button').click(function () {
  //   var
  // })
})
function updateView(result) {
  console.log(result);
  if(result.players){
    $('#showcard1 .name').html(result.players[0].name);
    $('#showcard2 .name').html(result.players[1].name);
    $('#cards1').html(result.players[0].hand.length);
    $('#cards2').html(result.players[1].hand.length);
  };
  if(result.cardPlayerOne){
    $('#showcard1 .card').html(result.cardsPlayerOne[result.cardsPlayerOne.length-1].rank);
  }
  if(result.cardPlayerTwo){
    $('#showcard2 .card').html(result.cardsPlayerTwo[result.cardsPlayerTwo.length-1].rank);
  }
  // if(result.warCardOne){
  //   $('#showcard1 .card').html(result.warCardOne.rank);
  // }
  // if(result.warCardTwo){
  //   $('#showcard2 .card').html(result.warCardTwo.rank);
  // }
  if(result.whoWon){
    if (result.whoWon === 1 ) {
      console.log("who won1 "+result.whoWon)
      $('#showcard1 .card').css('background-color','red')
      $('#showcard2 .card').css('background-color','white')
    }else{
      console.log("who won2 "+result.whoWon)
      $('#showcard1 .card').css('background-color','white')
      $('#showcard2 .card').css('background-color','red')
    }
    // console.log('**************',result.warCardOne);
    // console.log('**************',result)
    // if(result.whoWon){
    //   if(result.whoWon === 1){
    //     $('#showcard1 .card').html(result.warCardOne[warCardOne.length-1].rank)
    //   }else{
    //     $('#showcard2 .card').html(result.warCardTwo[warCardTwo.length-1].rank)
    //   }
    // }
  }
  // if(result.wasWar){
  //   if(result.warCardOne){
  //     $('#showcard1 .card').html(result.warCardOne.rank)
  //   }else{
  //     $('#showcard2 .card').html(result.warCardTwo.rank)
  //   }
  // }
}
