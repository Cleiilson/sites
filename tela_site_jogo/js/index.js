var cost = 5;
var weeks = 0;
var myN = [];
var rounds = 9999;

var start = function start(state) {
  if (state) {
    $('.card').addClass('locked');
    $('.play').addClass('active').on('click', play);
  } else {
    $('.card').removeClass('locked');
    $('.play').removeClass('active').off('click');
  }
};

var reset = function reset() {
  weeks = 0;
  rounds = 9999;
  $('.results').html('');
  $('.stat--spending .value').html('$0');
  $('.stat--weeks .value').html(0);
};

var rollTheDice = function rollTheDice() {
  var newNum = [];

  while (newNum.length < 6) {
    var num = Math.floor(Math.random() * 49 + 1);

    if (!newNum.includes(num)) {
      newNum.push(num);
    }
  }

  newNum.sort(function (a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  });

  return newNum;
};

var play = function play() {
  reset();

  setTimeout(function () {


    myN.sort(function (a, b) {
      return a < b ? -1 : a > b ? 1 : 0;
    });
    var won = false;
    var spending = 0;
    var pastNums = [];

    while (!won && rounds > 0) {
      var newNum = JSON.stringify(rollTheDice());
      won = JSON.stringify(myN) === newNum;
      weeks++;
      rounds--;
      pastNums.push(newNum);
    }

    var spending = weeks * cost;

    pastNums.forEach(function (num) {
      $('.results').append('<div>' + num + '</div>');
    });

    $('.stat--spending .value').html('$' + spending);
    $('.stat--weeks .value').html(weeks);

    var $result = $('<strong>').addClass(won ? 'won' : 'loss').html(won ? 'Won' : 'Not won');

    $('.results').append('<div class="result">After ' + weeks + ' weeks and $' + spending + ' you have ' + $result.prop('outerHTML') + '.</div>');
    $('.results').scrollTop($('.result').offset().top);
  }, 100);
};

$('input[name="n"]').on('change', function () {
  var val = parseInt($(this).val());
  if ($(this).is(':checked')) {
    myN.push(val);
  } else {
    myN.splice(myN.indexOf(val), 1);
  }

  if (myN.length === 6) {
    start(true);
  } else {
    start(false);
  }
});