$(document).ready(function() {

  var sequence = []; // random moves list
  var playerSeq = []; // player moves list

  var rounds = 0;
  var index = 0;
  var gameOn = false;
  var strict = false;
  $('.game-btn').off('click',playerClick);
  $('.display').html("PRESS&nbsp;<i>START</i>&nbsp; TO BEGIN &nbsp;<i class='fa fa-arrow-down' aria-hidden='true'></i>");


// funkyStart();
  // start game
  $('.start-btn, .display').click(startGame);
  // reset game
  $('.reset-btn').click(resetGame);
  $('.reset-btn').click(function(){
    $('.display').html("PRESS&nbsp;<i>START</i>&nbsp; TO BEGIN &nbsp;<i class='fa fa-arrow-down' aria-hidden='true'></i>");

  });
  // toggle strict mode
  $('.strict-btn').click(toggleStrict);

  // on player click
  // $('.game-btn').click(playerClick);

  function playerClick() {
    var playerStep = $(this).data('num');
    playerSeq.push(playerStep);
    dispPlayerStep(playerStep);
    if (sequence[index] === playerSeq[index]) {
      index++;
    } else {
      playSound('wrong');
      if(strict){
        console.log(strict);
        resetGame();
        giveSteps();
        return;
      }
      playerSeq.length = 0;
      index = 0;
      dispSequence();
      return;
    }
    if (index === sequence.length) {
      rounds++;
      $('.display').html("ROUND:&nbsp;"+rounds);
      if (rounds === 5) {
        $('.display').html("YOU WIN!!");

        return;
      }
      index = 0;
      playerSeq.length = 0;
      giveSteps();
    }
  }

  // FUNCTIONS
  // get & display step sequence
  function giveSteps() {
    var step = getStep(1, 4.5);
    sequence.push(step);
    // present all steps to player
    dispSequence();
  };

  // display sequence
  function dispSequence() {
    $('.game-btn').off('click', playerClick);
    var counter = 0;
    var dispInterval = setInterval(function() {
      dispBtn(sequence[counter]);
      counter++;
      if (counter === sequence.length) {
        setTimeout(function() {
          clearInterval(dispInterval);
          $('.game-btn').on('click', playerClick);
        }, 450);
      }
    }, 900);
  }

  // highlight display button
  function dispBtn(s) {
    $('.game-btn#btn' + s).animate({
      opacity: '0.3'
    }, 450).animate({
      opacity: '1'
    }, 450);
    playSound(s);
  }

  function dispPlayerStep(s) {
    $('.game-btn#btn' + s).animate({
      opacity: '0.3'
    }, 200).animate({
      opacity: '1'
    }, 200);
    playSound(s);
  }
  // start game
  function startGame() {
    if (!gameOn) {
        $('.game-btn').on('click', playerClick);
      gameOn = true;
      $('.display').html("ROUND:&nbsp;"+rounds);
      giveSteps();
    }
  }
  // reset game
  function resetGame() {
    gameOn = false;
    sequence.length = 0;
    playerSeq.length = 0;
    rounds = 0;
    $('.display').html("ROUND:&nbsp;"+rounds);
    index = 0;
    $('.game-btn').off('click', playerClick);
  }
  // strict mode
  function toggleStrict() {
    strict = (strict === true) ? false : true;
    $('.strict-btn').toggleClass('strict-btn-on');
  }
  // get random step
  function getStep(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  // sound notification
  function playSound(ps) {
    var sound = $("#audio" + ps)[0]; //+ audio);
    sound.play();
  }

  // starting animation
  // highlight display button
  function funkyStart() {
    var i = 4;
    var inter = setInterval(function() {
      dis(i % 4 + 1);
      i++;
      if (i === 16) {
        clearInterval(inter);
      }
    }, 130);
  }

  function dis(x) {
    $('.game-btn#btn' + x).animate({
      opacity: '0.3'
    }, 150).animate({
      opacity: '1'
    }, 150);
  }
});
